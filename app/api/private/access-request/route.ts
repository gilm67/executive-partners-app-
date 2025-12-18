// app/api/private/access-request/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import { Resend } from "resend";
import { MAIL_FROM, RECRUITER_MAILBOX } from "@/app/private/config/mail";

type RequestType = "profile" | "bp" | "portability";

function escapeHtml(input: string) {
  return String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalizeRequestType(v: unknown): RequestType {
  const s = String(v || "").toLowerCase();
  if (s === "bp") return "bp";
  if (s === "portability") return "portability";
  return "profile";
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const noStoreHeaders = {
  "Cache-Control": "no-store, max-age=0",
  Pragma: "no-cache",
};

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    // ✅ support snake_case + camelCase
    const request_type = normalizeRequestType(
      (body as any)?.request_type ?? (body as any)?.requestType
    );

    // profile_id is ONLY required for request_type === "profile"
    const profile_id =
      (typeof (body as any)?.profile_id === "string" && (body as any).profile_id) ||
      (typeof (body as any)?.profileId === "string" && (body as any).profileId) ||
      "";

    const message =
      typeof (body as any)?.message === "string"
        ? (body as any).message.trim().slice(0, 2000)
        : null;

    const requester_org =
      typeof (body as any)?.requester_org === "string"
        ? (body as any).requester_org.trim().slice(0, 200)
        : typeof (body as any)?.requesterOrg === "string"
        ? (body as any).requesterOrg.trim().slice(0, 200)
        : null;

    // ✅ FIX: only enforce profile_id for profile requests
    if (request_type === "profile" && !profile_id) {
      return NextResponse.json(
        { ok: false, error: "missing_profile_id" },
        { status: 400, headers: noStoreHeaders }
      );
    }

    // 1) Read session cookie (Next.js 15 requires await)
    const sessionHash = (await cookies()).get("ep_private")?.value ?? null;
    if (!sessionHash) {
      return NextResponse.json(
        { ok: false, error: "no_session" },
        { status: 401, headers: noStoreHeaders }
      );
    }

    // 2) Supabase admin client
    const supabaseAdmin = await getSupabaseAdmin();

    // 3) Validate session
    const { data: session, error: sessErr } = await supabaseAdmin
      .from("private_sessions")
      .select("email, role, expires_at, revoked_at")
      .eq("session_hash", sessionHash)
      .is("revoked_at", null)
      .maybeSingle();

    if (sessErr || !session) {
      return NextResponse.json(
        { ok: false, error: "invalid_session" },
        { status: 401, headers: noStoreHeaders }
      );
    }

    if (new Date(session.expires_at).getTime() < Date.now()) {
      return NextResponse.json(
        { ok: false, error: "session_expired" },
        { status: 401, headers: noStoreHeaders }
      );
    }

    // 4) Insert access request
    // ✅ profile_id must be nullable in DB for bp/portability
    const insertPayload = {
      request_type,
      profile_id: request_type === "profile" ? profile_id : null,
      requester_email: session.email,
      requester_org,
      message,
      status: "pending",
    };

    const { data: inserted, error: insErr } = await supabaseAdmin
      .from("private_profile_access_requests")
      .insert(insertPayload)
      .select("id, created_at, request_type, profile_id")
      .maybeSingle();

    if (insErr || !inserted) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error("access-request insert error:", insErr);
      }
      return NextResponse.json(
        { ok: false, error: "insert_failed" },
        { status: 500, headers: noStoreHeaders }
      );
    }

    // 5) Fetch profile details (only if profile_id exists)
    let profile:
      | {
          headline?: string | null;
          market?: string | null;
          seniority?: string | null;
          aum_band?: string | null;
          book_type?: string | null;
        }
      | null = null;

    if (inserted.profile_id) {
      const { data } = await supabaseAdmin
        .from("private_profiles")
        .select("headline, market, seniority, aum_band, book_type")
        .eq("id", inserted.profile_id)
        .maybeSingle();

      profile = data ?? null;
    }

    // 6) Send internal notification email (NON-BLOCKING)
    // ✅ Only recruiter@execpartners.ch is ever used for from/to/replyTo.
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    const appUrl = process.env.PRIVATE_APP_URL || new URL(req.url).origin;

    if (RESEND_API_KEY) {
      const resend = new Resend(RESEND_API_KEY);

      const subject =
        request_type === "bp"
          ? "🔒 Business Plan access request — Executive Partners"
          : request_type === "portability"
          ? "🔒 Portability access request — Executive Partners"
          : "🔒 Private profile access request — Executive Partners";

      const headline =
        request_type === "profile"
          ? profile?.headline || "Private Candidate Profile"
          : request_type === "bp"
          ? "Business Plan Simulator"
          : "Portability Readiness Score™";

      const market = profile?.market ? String(profile.market).toUpperCase() : "—";
      const seniority = profile?.seniority || "—";
      const aum = profile?.aum_band || "—";
      const book = profile?.book_type || "—";

      const createdAt = inserted.created_at || new Date().toISOString();
      const safeMessage = message ? escapeHtml(message) : "—";
      const safeOrg = requester_org ? escapeHtml(requester_org) : "—";

      const profileBlock =
        request_type === "profile" && inserted.profile_id
          ? `
            <div style="padding:12px 14px; border:1px solid #e5e7eb; border-radius:10px; margin-bottom:14px;">
              <div style="font-weight:700; margin-bottom:6px;">${escapeHtml(headline)}</div>
              <div style="color:#4b5563; font-size:14px;">
                ${escapeHtml(market)} · ${escapeHtml(seniority)} · AUM: ${escapeHtml(aum)} · Book: ${escapeHtml(book)}
              </div>
            </div>
          `
          : `
            <div style="padding:12px 14px; border:1px solid #e5e7eb; border-radius:10px; margin-bottom:14px;">
              <div style="font-weight:700; margin-bottom:6px;">${escapeHtml(headline)}</div>
              <div style="color:#4b5563; font-size:14px;">
                Tool access request (${escapeHtml(request_type)})
              </div>
            </div>
          `;

      const profileIdLine =
        inserted.profile_id
          ? `<div><b>Profile ID:</b> <code>${escapeHtml(String(inserted.profile_id))}</code></div>`
          : "";

      const html = `
        <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;">
          <h2 style="margin:0 0 12px;">New access request (${escapeHtml(request_type)})</h2>

          ${profileBlock}

          <div style="font-size:14px; line-height:1.6;">
            <div><b>Requester:</b> ${escapeHtml(session.email)}</div>
            <div><b>Organisation:</b> ${safeOrg}</div>
            <div><b>Message:</b> ${safeMessage}</div>
            <div><b>Status:</b> pending</div>
            <div><b>Created:</b> ${escapeHtml(createdAt)}</div>
            <div><b>Request ID:</b> <code>${escapeHtml(inserted.id)}</code></div>
            ${profileIdLine}
          </div>

          <div style="margin-top:16px; font-size:12px; color:#6b7280;">
            Admin: <a href="${appUrl}/private/dashboard/requests" target="_blank" rel="noreferrer">
              ${appUrl}/private/dashboard/requests
            </a>
          </div>
        </div>
      `;

      void resend.emails
        .send({
          from: MAIL_FROM,
          to: [RECRUITER_MAILBOX],
          replyTo: RECRUITER_MAILBOX,
          subject,
          html,
          tags: [{ name: "module", value: `access-${request_type}` }],
        })
        .catch((e) => {
          if (process.env.NODE_ENV !== "production") {
            // eslint-disable-next-line no-console
            console.error("resend notify error:", e);
          }
        });
    } else if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn("Missing RESEND_API_KEY");
    }

    return NextResponse.json(
      { ok: true, data: { id: inserted.id, request_type } },
      { status: 200, headers: noStoreHeaders }
    );
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("access-request exception:", e);
    }
    return NextResponse.json(
      { ok: false, error: "exception" },
      { status: 500, headers: noStoreHeaders }
    );
  }
}