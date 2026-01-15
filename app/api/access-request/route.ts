// app/api/access-request/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VERSION = "ar-2026-01-15-a"; // bump when changing logic

const RESEND_API_KEY = (process.env.RESEND_API_KEY || "").trim();

// ✅ Where YOU receive requests
const ADMIN_EMAIL = (
  process.env.ACCESS_REQUEST_EMAIL ||
  process.env.NEXT_PUBLIC_ACCESS_REQUEST_EMAIL ||
  "recruiter@execpartners.ch"
).trim();

// Sender:
// - Dev/Preview: onboarding@resend.dev works immediately
// - Prod: use your verified sender (auth.execpartners.ch) once confirmed
const RESEND_FROM = (
  process.env.RESEND_FROM ||
  (process.env.NODE_ENV !== "production"
    ? "Executive Partners <onboarding@resend.dev>"
    : "Executive Partners <no-reply@auth.execpartners.ch>")
).trim();

// ✅ Approval gate “profile” identifier (matches your table’s profile_id usage)
const PROFILE_ID = "portability";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clean(s: unknown, max = 2000) {
  const v = typeof s === "string" ? s.trim() : "";
  if (!v) return "";
  return v.replace(/\s+/g, " ").slice(0, max);
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildAdminEmail(payload: {
  name: string;
  role: string;
  market: string;
  linkedin: string;
  email: string;
  message: string;
}) {
  const items: Array<[string, string]> = [
    ["Name", payload.name],
    ["Role / Bank", payload.role],
    ["Market focus", payload.market],
    ["LinkedIn", payload.linkedin],
    ["Email", payload.email],
    ["Message", payload.message],
  ];

  const rows = items
    .map(([k, v]) => {
      const value = v
        ? escapeHtml(v).replaceAll("\n", "<br/>")
        : `<span style="color:#999;">(not provided)</span>`;

      return `
        <tr>
          <td style="padding:10px 12px; border-bottom:1px solid #eee; width:180px; color:#555;">
            <strong>${escapeHtml(k)}</strong>
          </td>
          <td style="padding:10px 12px; border-bottom:1px solid #eee; color:#111;">
            ${value}
          </td>
        </tr>
      `;
    })
    .join("");

  return `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height:1.5; color:#111;">
      <h2 style="margin:0 0 12px;">Portability tool — access request</h2>
      <p style="margin:0 0 16px; color:#555;">
        A new request was submitted via <strong>execpartners.ch</strong>.
      </p>

      <table style="border-collapse:collapse; width:100%; max-width:720px; background:#fff; border:1px solid #eee; border-radius:12px; overflow:hidden;">
        ${rows}
      </table>

      <p style="margin:16px 0 0; color:#777; font-size:12px;">
        Tip: reply directly to the requester to continue the conversation.
      </p>
    </div>
  `;
}

function buildRequesterConfirmationEmail(name: string) {
  const first = name ? `Hi ${escapeHtml(name)},` : "Hi,";
  return `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height:1.5; color:#111;">
      <h2 style="margin:0 0 12px;">We received your request</h2>
      <p style="margin:0 0 12px;">${first}</p>
      <p style="margin:0 0 12px; color:#555;">
        Thanks for requesting confidential access to the <strong>AUM Portability Score</strong>.
        Our team will review and reply shortly (typically within 24h on business days).
      </p>
      <p style="margin:0; color:#777; font-size:12px;">
        Executive Partners · Private Banking & Wealth Management Recruitment
      </p>
    </div>
  `;
}

export async function POST(req: Request) {
  const debug = new URL(req.url).searchParams.get("debug") === "1";

  try {
    if (!RESEND_API_KEY) {
      return NextResponse.json(
        { ok: false, error: "SERVER_NOT_CONFIGURED" },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));

    const name = clean(body?.name, 120);
    const role = clean(body?.role, 180); // used as requester_org
    const market = clean(body?.market, 120);
    const linkedin = clean(body?.linkedin, 300);
    const email = clean(body?.email, 160).toLowerCase();
    const message = clean(body?.message, 2000);

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "INVALID_EMAIL" },
        { status: 400 }
      );
    }

    // ✅ 1) Insert request row (approval workflow)
    const supabaseAdmin = await getSupabaseAdmin();

    const combinedMessage = [
      message ? `Message: ${message}` : null,
      market ? `Market: ${market}` : null,
      linkedin ? `LinkedIn: ${linkedin}` : null,
      name ? `Name: ${name}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const { error: insertErr } = await supabaseAdmin
      .from("private_profile_access_requests")
      .insert({
        profile_id: PROFILE_ID,
        requester_email: email,
        requester_org: role || null,
        message: combinedMessage || null,
        status: "pending",
        // reviewed_at / reviewed_by left null until you approve
      });

    if (insertErr) {
      console.error("[access-request] insert error:", insertErr);
      return NextResponse.json(
        { ok: false, error: "DB_INSERT_FAILED" },
        { status: 500 }
      );
    }

    const resend = new Resend(RESEND_API_KEY);

    // ✅ 2) Email to you (admin)
    await resend.emails.send({
      from: RESEND_FROM,
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `Access request — Portability Score (${name || email})`,
      html: buildAdminEmail({ name, role, market, linkedin, email, message }),
    });

    // ✅ 3) Confirmation email to requester
    await resend.emails.send({
      from: RESEND_FROM,
      to: email,
      subject: "We received your request — Executive Partners",
      html: buildRequesterConfirmationEmail(name),
    });

    const res = NextResponse.json({ ok: true }, { status: 200 });
    res.headers.set("x-access-request-version", VERSION);

    if (debug) {
      res.headers.set("x-access-request-admin", ADMIN_EMAIL);
      res.headers.set("x-access-request-profile", PROFILE_ID);
    }

    return res;
  } catch (e: any) {
    console.error("[access-request] error:", e?.message || e);
    const res = NextResponse.json(
      { ok: false, error: "INTERNAL_ERROR" },
      { status: 500 }
    );
    res.headers.set("x-access-request-version", VERSION);
    return res;
  }
}