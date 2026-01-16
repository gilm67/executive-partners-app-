// app/api/private/admin/approve-access/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * ENV
 */
const ADMIN_KEY = (process.env.PRIVATE_ADMIN_KEY || "").trim();
const RESEND_API_KEY = (process.env.RESEND_API_KEY || "").trim();

const RESEND_FROM = (
  process.env.RESEND_FROM ||
  (process.env.NODE_ENV !== "production"
    ? "Executive Partners <onboarding@resend.dev>"
    : "Executive Partners <no-reply@auth.execpartners.ch>")
).trim();

const CANONICAL = (
  process.env.NEXT_PUBLIC_CANONICAL_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.execpartners.ch"
)
  .trim()
  .replace(/\/$/, "");

/**
 * DB tables
 */
const REQUESTS_TABLE = "private_profile_access_requests_v2";
const MAGIC_TABLE = "magic_links";

/**
 * Helpers
 */
function clean(v: unknown, max = 500) {
  const s = typeof v === "string" ? v.trim() : "";
  if (!s) return "";
  return s.replace(/\s+/g, " ").slice(0, max);
}
function cleanLower(v: unknown, max = 500) {
  return clean(v, max).toLowerCase();
}
function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function unauthorized() {
  return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
}
function badRequest(error = "BAD_REQUEST") {
  return NextResponse.json({ ok: false, error }, { status: 400 });
}

function looksLikeEmailFrom(from: string) {
  return (
    /<[^<>@\s]+@[^<>@\s]+\.[^<>@\s]+>/.test(from) ||
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(from)
  );
}

/**
 * SAFE INTERNAL REDIRECTS ONLY
 * Keep this in sync with your magic-link/request sanitizeNext allow list.
 */
function sanitizeNext(nextRaw: unknown): string | null {
  if (typeof nextRaw !== "string") return null;

  let next = nextRaw.trim();
  if (!next) return null;

  if (!next.startsWith("/")) return null;
  if (next.startsWith("//")) return null;
  if (next.includes("://")) return null;

  next = next.split("#")[0].split("?")[0];

  // Normalize common variants
  if (next === "/portability") next = "/en/portability";
  if (next === "/bp-simulator") next = "/en/bp-simulator";
  if (next === "/en/portability/") next = "/en/portability";
  if (next === "/en/bp-simulator/") next = "/en/bp-simulator";
  if (next === "/private/") next = "/private";
  if (next === "/private/bp-simulator" || next.startsWith("/private/bp-simulator")) {
    next = "/en/bp-simulator";
  }

  const ALLOWED_EXACT = ["/en/portability", "/en/bp-simulator", "/private"];
  const ALLOWED_PREFIXES = ["/en/portability/", "/en/bp-simulator/", "/private/"];

  const isAllowed =
    ALLOWED_EXACT.includes(next) || ALLOWED_PREFIXES.some((p) => next.startsWith(p));

  if (!isAllowed) return null;

  return next;
}

function defaultNextForType(type: "portability" | "bp" | "profile") {
  if (type === "portability") return "/en/portability/tool";
  if (type === "bp") return "/en/bp-simulator";
  return "/private";
}

function buildMagicEmailHtml(link: string) {
  return `
  <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height:1.5; color:#111;">
    <h2 style="margin:0 0 12px;">Your secure access link</h2>
    <p style="margin:0 0 12px;">Click the button below to continue securely.</p>
    <p style="margin:0 0 18px;">
      <a href="${link}" style="display:inline-block; padding:10px 14px; background:#111; color:#fff; text-decoration:none; border-radius:8px;">
        Continue
      </a>
    </p>
    <p style="margin:0 0 8px; color:#555;">This link expires in 20 minutes and can be used once.</p>
    <p style="margin:0; color:#555;">If you didn’t request this, you can ignore this email.</p>
  </div>`;
}

async function approveAndSend(args: {
  key: string;
  request_type: "portability" | "bp" | "profile";
  requester_email: string;
  profile_id: string | null;
  requester_org: string | null;
  next: string | null;
}) {
  const { key, request_type, requester_email, profile_id, requester_org } = args;

  if (!ADMIN_KEY || key !== ADMIN_KEY) return unauthorized();
  if (!request_type || !requester_email) return badRequest("MISSING_FIELDS");

  // For portability/bp, your schema expects profile_id NULL
  const effectiveProfileId =
    request_type === "profile" ? profile_id : null;

  const next =
    sanitizeNext(args.next) ?? defaultNextForType(request_type);

  const supabase = await getSupabaseAdmin();

  // 1) Find latest request row (optional), then approve it (or insert failsafe)
  const find = supabase
    .from(REQUESTS_TABLE)
    .select("id,status,created_at")
    .eq("request_type", request_type)
    .eq("requester_email", requester_email)
    .order("created_at", { ascending: false })
    .limit(1);

  const { data: latest, error: findErr } =
    request_type === "profile"
      ? await find.eq("profile_id", effectiveProfileId).maybeSingle()
      : await find.is("profile_id", null).maybeSingle();

  if (findErr) {
    console.error("[approve-access] find error:", findErr);
    return NextResponse.json({ ok: false, error: "FIND_FAILED" }, { status: 500 });
  }

  if (!latest?.id) {
    const { error: insErr } = await supabase.from(REQUESTS_TABLE).insert({
      request_type,
      profile_id: effectiveProfileId, // null for portability/bp
      requester_email,
      requester_org: requester_org || null,
      status: "approved",
      reviewed_at: new Date().toISOString(),
      reviewed_by: "admin",
    });

    if (insErr) {
      console.error("[approve-access] insert error:", insErr);
      return NextResponse.json({ ok: false, error: "INSERT_FAILED" }, { status: 500 });
    }
  } else {
    const { error: updErr } = await supabase
      .from(REQUESTS_TABLE)
      .update({
        status: "approved",
        reviewed_at: new Date().toISOString(),
        reviewed_by: "admin",
      })
      .eq("id", latest.id);

    if (updErr) {
      console.error("[approve-access] update error:", updErr);
      return NextResponse.json({ ok: false, error: "UPDATE_FAILED" }, { status: 500 });
    }
  }

  // 2) Create magic link token + insert into magic_links
  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = sha256(token);
  const expiresAt = new Date(Date.now() + 20 * 60 * 1000).toISOString();

  const { error: magicErr } = await supabase.from(MAGIC_TABLE).insert({
    email: requester_email,
    token_hash: tokenHash,
    expires_at: expiresAt,
  });

  if (magicErr) {
    console.error("[approve-access] magic insert error:", magicErr);
    return NextResponse.json({ ok: false, error: "MAGIC_INSERT_FAILED" }, { status: 500 });
  }

  // 3) Send email immediately
  const link = `${CANONICAL}/private/auth?token=${encodeURIComponent(
    token
  )}&next=${encodeURIComponent(next)}`;

  let sendStatus: "sent" | "skipped" | "error" = "skipped";
  let sendMeta: any = undefined;

  const fromOk = looksLikeEmailFrom(RESEND_FROM);

  if (!RESEND_API_KEY) {
    sendStatus = "skipped";
    sendMeta = { reason: "missing_RESEND_API_KEY" };
  } else if (!fromOk) {
    sendStatus = "skipped";
    sendMeta = { reason: "invalid_RESEND_FROM", from: RESEND_FROM };
  } else {
    try {
      const resend = new Resend(RESEND_API_KEY);
      const result = await resend.emails.send({
        from: RESEND_FROM,
        to: requester_email,
        subject: "Your secure access link — Executive Partners",
        html: buildMagicEmailHtml(link),
      });

      const maybeError = (result as any)?.error;
      if (maybeError) {
        sendStatus = "error";
        sendMeta = maybeError;
        console.error("[approve-access] Resend error:", maybeError);
      } else {
        sendStatus = "sent";
        sendMeta = (result as any)?.data ?? result;
      }
    } catch (e: any) {
      sendStatus = "error";
      sendMeta = { message: e?.message || String(e) };
      console.error("[approve-access] Resend threw:", e?.message || e);
    }
  }

  // Even if email fails, approval is done; return info to admin.
  return NextResponse.json(
    {
      ok: true,
      action: "approved_and_link_generated",
      approved: {
        request_type,
        profile_id: effectiveProfileId,
        requester_email,
        next,
      },
      magic: {
        sendStatus,
        sendMeta,
        // link is useful for admin debugging; remove if you don’t want it returned:
        link,
      },
    },
    { status: sendStatus === "error" ? 500 : 200 }
  );
}

/**
 * ✅ GET — used by the 1-click approve button in your admin email
 * /api/private/admin/approve-access?key=...&type=portability&email=...&next=/en/portability/tool
 */
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const key = clean(url.searchParams.get("key"));
    const requester_email = cleanLower(url.searchParams.get("email"));
    const request_type = cleanLower(url.searchParams.get("type")) as
      | "portability"
      | "bp"
      | "profile";

    const profile_id = clean(url.searchParams.get("profile_id"));
    const requester_org = clean(url.searchParams.get("org"));
    const next = clean(url.searchParams.get("next"));

    if (!key || !requester_email || !request_type) return badRequest("MISSING_QUERY");

    return approveAndSend({
      key,
      requester_email,
      request_type,
      profile_id: profile_id || null,
      requester_org: requester_org || null,
      next: next || null,
    });
  } catch (e: any) {
    console.error("[approve-access] GET unexpected:", e?.message || e);
    return NextResponse.json({ ok: false, error: "INTERNAL_ERROR" }, { status: 500 });
  }
}

/**
 * ✅ POST — for curl/admin tooling
 * Header: x-admin-key: <PRIVATE_ADMIN_KEY>
 * Body:
 * {
 *   "request_type": "portability" | "bp" | "profile",
 *   "requester_email": "...",
 *   "profile_id": "..." // only for profile
 *   "requester_org": "...",
 *   "next": "/en/portability/tool" | "/en/bp-simulator" | ...
 * }
 */
export async function POST(req: Request) {
  try {
    const key = clean(req.headers.get("x-admin-key"));

    const body = await req.json().catch(() => ({}));
    const request_type = cleanLower(body?.request_type) as "portability" | "bp" | "profile";
    const requester_email = cleanLower(body?.requester_email);
    const profile_id = clean(body?.profile_id);
    const requester_org = clean(body?.requester_org);
    const next = clean(body?.next);

    if (!key || !request_type || !requester_email) return badRequest("MISSING_FIELDS");

    return approveAndSend({
      key,
      requester_email,
      request_type,
      profile_id: profile_id || null,
      requester_org: requester_org || null,
      next: next || null,
    });
  } catch (e: any) {
    console.error("[approve-access] POST unexpected:", e?.message || e);
    return NextResponse.json({ ok: false, error: "INTERNAL_ERROR" }, { status: 500 });
  }
}