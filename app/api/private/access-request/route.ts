import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase-server";
import { Resend } from "resend";

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    // Accept both snake_case and camelCase
    const profile_id =
      (typeof body?.profile_id === "string" && body.profile_id) ||
      (typeof body?.profileId === "string" && body.profileId) ||
      "";

    const message =
      typeof body?.message === "string" ? body.message.trim() : null;

    const requester_org =
      typeof body?.requester_org === "string"
        ? body.requester_org.trim()
        : typeof body?.requesterOrg === "string"
        ? body.requesterOrg.trim()
        : null;

    if (!profile_id) {
      return NextResponse.json(
        { ok: false, error: "missing_profile_id" },
        { status: 400 }
      );
    }

    // 1) Read session cookie (Next.js 15 requires await)
    const sessionHash = (await cookies()).get("ep_private")?.value;
    if (!sessionHash) {
      return NextResponse.json(
        { ok: false, error: "no_session" },
        { status: 401 }
      );
    }

    // 2) Validate session in DB
    const { data: session, error: sessErr } = await supabaseAdmin
      .from("private_sessions")
      .select("email, role, expires_at, revoked_at")
      .eq("session_hash", sessionHash)
      .is("revoked_at", null)
      .maybeSingle();

    if (sessErr || !session) {
      return NextResponse.json(
        { ok: false, error: "invalid_session" },
        { status: 401 }
      );
    }

    if (new Date(session.expires_at).getTime() < Date.now()) {
      return NextResponse.json(
        { ok: false, error: "session_expired" },
        { status: 401 }
      );
    }

    // 3) Insert access request (DB is source of truth)
    const { data: inserted, error: insErr } = await supabaseAdmin
      .from("private_profile_access_requests")
      .insert({
        profile_id,
        requester_email: session.email,
        requester_org,
        message,
        status: "pending",
      })
      .select("id, created_at")
      .maybeSingle();

    if (insErr) {
      if (process.env.NODE_ENV !== "production") {
        console.error("access-request insert error:", insErr);
      }
      return NextResponse.json(
        { ok: false, error: "insert_failed" },
        { status: 500 }
      );
    }

    // 4) Fetch profile details for the email (best effort)
    const { data: profile } = await supabaseAdmin
      .from("private_profiles")
      .select("headline, market, seniority, aum_band, book_type")
      .eq("id", profile_id)
      .maybeSingle();

    // 5) Send Resend email (NON-BLOCKING)
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const RESEND_FROM = process.env.RESEND_FROM;
    const PRIVATE_NOTIF_TO = process.env.PRIVATE_NOTIF_TO;

    // ✅ Stable base URL (dev fallback) — set PRIVATE_APP_URL in prod
    const appUrl = process.env.PRIVATE_APP_URL || "http://localhost:3000";

    if (RESEND_API_KEY && RESEND_FROM && PRIVATE_NOTIF_TO) {
      const resend = new Resend(RESEND_API_KEY);

      const subject = "🔒 Private profile access request — Executive Partners";

      const headline = profile?.headline || "Private Candidate Profile";
      const market = profile?.market ? String(profile.market).toUpperCase() : "—";
      const seniority = profile?.seniority || "—";
      const aum = profile?.aum_band || "—";
      const book = profile?.book_type || "—";

      const createdAt = inserted?.created_at || new Date().toISOString();

      const safeMessage = message ? escapeHtml(message) : "—";
      const safeOrg = requester_org ? escapeHtml(requester_org) : "—";

      const html = `
        <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;">
          <h2 style="margin:0 0 12px;">New private profile access request</h2>

          <div style="padding:12px 14px; border:1px solid #e5e7eb; border-radius:10px; margin-bottom:14px;">
            <div style="font-weight:700; margin-bottom:6px;">${escapeHtml(headline)}</div>
            <div style="color:#4b5563; font-size:14px;">
              ${escapeHtml(market)} · ${escapeHtml(seniority)} · AUM: ${escapeHtml(aum)} · Book: ${escapeHtml(book)}
            </div>
          </div>

          <div style="font-size:14px; line-height:1.6;">
            <div><b>Requester:</b> ${escapeHtml(session.email)}</div>
            <div><b>Organisation:</b> ${safeOrg}</div>
            <div><b>Message:</b> ${safeMessage}</div>
            <div><b>Status:</b> pending</div>
            <div><b>Created:</b> ${escapeHtml(createdAt)}</div>
          </div>

          <div style="margin-top:16px; font-size:12px; color:#6b7280;">
            Project: Executive Partners · Source:
            <a href="${appUrl}" target="_blank" rel="noreferrer">${appUrl}</a>
          </div>
        </div>
      `;

      // Do not block the request if email fails
      resend.emails
        .send({
          from: RESEND_FROM,
          to: PRIVATE_NOTIF_TO.split(",").map((s) => s.trim()).filter(Boolean),
          subject,
          html,
        })
        .catch((e) => {
          if (process.env.NODE_ENV !== "production") {
            console.error("resend notify error:", e);
          }
        });
    } else {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "Resend env vars missing: RESEND_API_KEY / RESEND_FROM / PRIVATE_NOTIF_TO"
        );
      }
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.error("access-request exception:", e);
    }
    return NextResponse.json(
      { ok: false, error: "exception" },
      { status: 500 }
    );
  }
}