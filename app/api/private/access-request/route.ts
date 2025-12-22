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

    const request_type = normalizeRequestType(
      (body as any)?.request_type ?? (body as any)?.requestType
    );

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

    // Only enforce profile_id for profile requests
    if (request_type === "profile" && !profile_id) {
      return NextResponse.json(
        { ok: false, error: "missing_profile_id" },
        { status: 400, headers: noStoreHeaders }
      );
    }

    // 1) Read session cookie
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

    const nowIso = new Date().toISOString();
    const requesterEmail = String(session.email || "").trim().toLowerCase();
    const normalizedProfileId = request_type === "profile" ? profile_id : null;

    // ✅ Auto-approve BP + Portability (profiles remain manual)
    const autoApprove = request_type === "bp" || request_type === "portability";
    const desiredStatus = autoApprove ? "approved" : "pending";

    // ✅ Dedup:
    // - For BP/Portability: return existing approved OR pending (either means "don’t create more rows")
    // - For Profile: return existing pending only (so recruiter still reviews one request)
    const dedupStatuses = autoApprove ? ["approved", "pending"] : ["pending"];

    const baseDedupQuery = supabaseAdmin
      .from("private_profile_access_requests")
      .select("id, created_at, request_type, profile_id, status")
      .eq("requester_email", requesterEmail)
      .eq("request_type", request_type)
      .in("status", dedupStatuses as any);

    const { data: existing, error: dedupErr } = normalizedProfileId
      ? await baseDedupQuery.eq("profile_id", normalizedProfileId).maybeSingle()
      : await baseDedupQuery.is("profile_id", null).maybeSingle();

    if (!dedupErr && existing?.id) {
      return NextResponse.json(
        {
          ok: true,
          data: {
            id: existing.id,
            request_type,
            status: existing.status,
            deduped: true,
          },
        },
        { status: 200, headers: noStoreHeaders }
      );
    }

    // 4) Insert access request
    const insertPayload: any = {
      request_type,
      profile_id: normalizedProfileId,
      requester_email: requesterEmail,
      requester_org,
      message,
      status: desiredStatus,
      reviewed_at: autoApprove ? nowIso : null,
      reviewed_by: autoApprove ? "auto" : null,
    };

    const { data: inserted, error: insErr } = await supabaseAdmin
      .from("private_profile_access_requests")
      .insert(insertPayload)
      .select("id, created_at, request_type, profile_id, status")
      .maybeSingle();

    if (insErr || !inserted) {
      if (process.env.NODE_ENV !== "production") {
        console.error("access-request insert error:", insErr);
      }
      return NextResponse.json(
        { ok: false, error: "insert_failed" },
        { status: 500, headers: noStoreHeaders }
      );
    }

    // ✅ If auto-approved, DO NOT email recruiter
    if (autoApprove) {
      return NextResponse.json(
        { ok: true, data: { id: inserted.id, request_type, status: inserted.status } },
        { status: 200, headers: noStoreHeaders }
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

    // 6) Send internal notification email (NON-BLOCKING) — profiles only
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const appUrl = process.env.PRIVATE_APP_URL || new URL(req.url).origin;

    if (RESEND_API_KEY) {
      const resend = new Resend(RESEND_API_KEY);

      const subject = "🔒 Private profile access request — Executive Partners";

      const headline = profile?.headline || "Private Candidate Profile";
      const market = profile?.market ? String(profile.market).toUpperCase() : "—";
      const seniority = profile?.seniority || "—";
      const aum = profile?.aum_band || "—";
      const book = profile?.book_type || "—";

      const createdAt = inserted.created_at || nowIso;
      const safeMessage = message ? escapeHtml(message) : "—";
      const safeOrg = requester_org ? escapeHtml(requester_org) : "—";

      const profileBlock = inserted.profile_id
        ? `
          <div style="padding:12px 14px; border:1px solid #e5e7eb; border-radius:10px; margin-bottom:14px;">
            <div style="font-weight:700; margin-bottom:6px;">${escapeHtml(headline)}</div>
            <div style="color:#4b5563; font-size:14px;">
              ${escapeHtml(market)} · ${escapeHtml(seniority)} · AUM: ${escapeHtml(aum)} · Book: ${escapeHtml(book)}
            </div>
          </div>
        `
        : "";

      const profileIdLine = inserted.profile_id
        ? `<div><b>Profile ID:</b> <code>${escapeHtml(String(inserted.profile_id))}</code></div>`
        : "";

      const html = `
        <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;">
          <h2 style="margin:0 0 12px;">New access request (profile)</h2>

          ${profileBlock}

          <div style="font-size:14px; line-height:1.6;">
            <div><b>Requester:</b> ${escapeHtml(requesterEmail)}</div>
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
          tags: [{ name: "module", value: "access-profile" }],
        })
        .catch((e) => {
          if (process.env.NODE_ENV !== "production") {
            console.error("resend notify error:", e);
          }
        });
    } else if (process.env.NODE_ENV !== "production") {
      console.warn("Missing RESEND_API_KEY");
    }

    return NextResponse.json(
      { ok: true, data: { id: inserted.id, request_type, status: "pending" } },
      { status: 200, headers: noStoreHeaders }
    );
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.error("access-request exception:", e);
    }
    return NextResponse.json(
      { ok: false, error: "exception" },
      { status: 500, headers: noStoreHeaders }
    );
  }
}