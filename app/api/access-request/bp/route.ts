import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VERSION = "ar-bp-2026-01-16-a"; // bump when changing logic

const RESEND_API_KEY = (process.env.RESEND_API_KEY || "").trim();

// ✅ Where YOU receive requests
const ADMIN_EMAIL = (
  process.env.ACCESS_REQUEST_EMAIL ||
  process.env.NEXT_PUBLIC_ACCESS_REQUEST_EMAIL ||
  "recruiter@execpartners.ch"
).trim();

// Sender
const RESEND_FROM = (
  process.env.RESEND_FROM ||
  (process.env.NODE_ENV !== "production"
    ? "Executive Partners <onboarding@resend.dev>"
    : "Executive Partners <no-reply@auth.execpartners.ch>")
).trim();

// ✅ Production domain
const CANONICAL = (
  process.env.NEXT_PUBLIC_CANONICAL_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.execpartners.ch"
)
  .trim()
  .replace(/\/$/, "");

// ✅ Protect approve link
const PRIVATE_ADMIN_KEY = (process.env.PRIVATE_ADMIN_KEY || "").trim();

// ✅ Gate identifier (BP)
const REQUEST_TYPE = "bp" as const; // bp uses NULL profile_id in your schema
const PROFILE_ID: string | null = null;

// ✅ Where BP users should land after magic link
// Change this if your real page differs:
const DEFAULT_NEXT = "/en/bp-simulator";

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

function buildApproveUrl(params: {
  requester_email: string;
  requester_org?: string | null;
  next?: string;
}) {
  if (!PRIVATE_ADMIN_KEY) return null;

  const url = new URL(`${CANONICAL}/api/private/admin/approve-access`);
  url.searchParams.set("key", PRIVATE_ADMIN_KEY);
  url.searchParams.set("type", REQUEST_TYPE); // ✅ "bp"
  url.searchParams.set("email", params.requester_email);
  url.searchParams.set("next", params.next || DEFAULT_NEXT); // ✅ candidate lands on BP
  if (params.requester_org) url.searchParams.set("org", params.requester_org);

  return url.toString();
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

  const approveUrl = buildApproveUrl({
    requester_email: payload.email,
    requester_org: payload.role || null,
    next: DEFAULT_NEXT,
  });

  const ctaBlock = approveUrl
    ? `
      <div style="margin:18px 0 8px;">
        <a href="${approveUrl}"
           style="display:inline-block; padding:12px 16px; background:#C9A14A; color:#111; text-decoration:none; border-radius:10px; font-weight:700;">
          ✅ Approve BP access (1 click)
        </a>
      </div>
      <div style="margin:10px 0 0; font-size:12px; color:#888;">
        Candidate receives the secure link instantly after you approve.
      </div>
    `
    : `
      <div style="margin:18px 0 0; padding:12px 14px; border:1px solid #eee; border-radius:10px; background:#fafafa; color:#666; font-size:12px;">
        Approve button disabled because <strong>PRIVATE_ADMIN_KEY</strong> is not set in Vercel.
      </div>
    `;

  return `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height:1.5; color:#111;">
      <h2 style="margin:0 0 10px;">BP Simulator — access request</h2>
      <p style="margin:0 0 14px; color:#555;">
        A new request was submitted via <strong>execpartners.ch</strong>.
      </p>

      ${ctaBlock}

      <table style="margin-top:14px; border-collapse:collapse; width:100%; max-width:720px; background:#fff; border:1px solid #eee; border-radius:12px; overflow:hidden;">
        ${rows}
      </table>

      <p style="margin:14px 0 0; color:#777; font-size:12px;">
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
        Thanks for requesting confidential access to the <strong>BP Simulator</strong>.
        Our team will review and reply shortly.
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
    const body = await req.json().catch(() => ({}));

    const name = clean(body?.name, 120);
    const role = clean(body?.role, 180);
    const market = clean(body?.market, 120);
    const linkedin = clean(body?.linkedin, 300);
    const email = clean(body?.email, 160).toLowerCase();
    const message = clean(body?.message, 2000);

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "INVALID_EMAIL" }, { status: 400 });
    }

    const combinedMessage = [
      message ? `Message: ${message}` : null,
      market ? `Market: ${market}` : null,
      linkedin ? `LinkedIn: ${linkedin}` : null,
      name ? `Name: ${name}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const supabaseAdmin = await getSupabaseAdmin();

    // For NULL profile_id, UPSERT won't dedupe reliably -> insert a fresh pending row unless already approved
    const { data: latest, error: findErr } = await supabaseAdmin
      .from("private_profile_access_requests_v2")
      .select("id,status,created_at")
      .eq("request_type", REQUEST_TYPE)
      .eq("requester_email", email)
      .is("profile_id", null)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (findErr) {
      console.error("[access-request:bp] find error:", findErr);
      return NextResponse.json({ ok: false, error: "DB_FIND_FAILED" }, { status: 500 });
    }

    const latestStatus = String(latest?.status || "").trim().toLowerCase();

    if (!(latest?.id && latestStatus === "approved")) {
      const { error: insErr } = await supabaseAdmin
        .from("private_profile_access_requests_v2")
        .insert({
          request_type: REQUEST_TYPE,
          profile_id: PROFILE_ID, // null
          requester_email: email,
          requester_org: role || null,
          message: combinedMessage || null,
          status: "pending",
        });

      if (insErr) {
        console.error("[access-request:bp] insert error:", insErr);
        return NextResponse.json({ ok: false, error: "DB_INSERT_FAILED" }, { status: 500 });
      }
    }

    // Emails
    if (RESEND_API_KEY) {
      const resend = new Resend(RESEND_API_KEY);

      await resend.emails.send({
        from: RESEND_FROM,
        to: ADMIN_EMAIL,
        replyTo: email,
        subject: `Access request — BP Simulator (${name || email})`,
        html: buildAdminEmail({ name, role, market, linkedin, email, message }),
      });

      await resend.emails.send({
        from: RESEND_FROM,
        to: email,
        subject: "We received your request — Executive Partners",
        html: buildRequesterConfirmationEmail(name),
      });
    } else {
      console.warn("[access-request:bp] RESEND_API_KEY missing — emails skipped");
    }

    const resBody: any = { ok: true, status: "pending" };
    if (debug) {
      resBody.debug = {
        version: VERSION,
        canonical: CANONICAL,
        request_type: REQUEST_TYPE,
        profile_id: PROFILE_ID,
        default_next: DEFAULT_NEXT,
        adminEmail: ADMIN_EMAIL,
        resendFrom: RESEND_FROM,
        hasPrivateAdminKey: !!PRIVATE_ADMIN_KEY,
        emailSending: RESEND_API_KEY ? "enabled" : "skipped",
      };
    }

    const res = NextResponse.json(resBody, { status: 200 });
    res.headers.set("x-access-request-version", VERSION);
    return res;
  } catch (e: any) {
    console.error("[access-request:bp] error:", e?.message || e);
    const res = NextResponse.json({ ok: false, error: "INTERNAL_ERROR" }, { status: 500 });
    res.headers.set("x-access-request-version", VERSION);
    return res;
  }
}