// app/api/magic-link/request/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CANONICAL = (
  process.env.NEXT_PUBLIC_CANONICAL_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.execpartners.ch"
).replace(/\/$/, "");

const RESEND_API_KEY = (process.env.RESEND_API_KEY || "").trim();
const RESEND_FROM = (
  process.env.RESEND_FROM || "Executive Partners <recruiter@execpartners.ch>"
).trim();

/** hash helper */
function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

/**
 * Prefer canonical/public URL in prod.
 * In dev/preview, derive from headers, but DO NOT rely on Origin.
 */
function getBaseUrl(req: Request) {
  // 1) If explicitly configured, always prefer it
  const configured =
    (process.env.NEXT_PUBLIC_SITE_URL || "").trim() ||
    (process.env.NEXT_PUBLIC_CANONICAL_URL || "").trim();
  if (configured) return configured.replace(/\/$/, "");

  // 2) Vercel headers
  const proto = req.headers.get("x-forwarded-proto") || "https";
  const host =
    req.headers.get("x-forwarded-host") ||
    req.headers.get("host") ||
    req.headers.get("x-vercel-deployment-url");

  if (host) {
    const cleanHost = host.replace(/^https?:\/\//, "").replace(/\/$/, "");
    return `${proto}://${cleanHost}`.replace(/\/$/, "");
  }

  // 3) Fallback
  return CANONICAL;
}

/**
 * ✅ SAFE INTERNAL REDIRECTS ONLY
 * - internal only (no scheme)
 * - normalizes common paths to the correct localized routes
 * - strict allow-list
 */
function sanitizeNext(nextRaw: unknown): string | null {
  if (typeof nextRaw !== "string") return null;

  let next = nextRaw.trim();
  if (!next) return null;

  // internal-only
  if (!next.startsWith("/")) return null;
  if (next.startsWith("//")) return null;
  if (next.includes("://")) return null;

  // normalize common variants
  if (next === "/portability") next = "/en/portability";
  if (next === "/bp-simulator") next = "/en/bp-simulator";
  if (next === "/en/portability/") next = "/en/portability";
  if (next === "/en/bp-simulator/") next = "/en/bp-simulator";
  if (next === "/private/") next = "/private";

  const ALLOWED = ["/en/portability", "/en/bp-simulator", "/private"];
  const isAllowed = ALLOWED.includes(next) || next.startsWith("/private/");
  if (!isAllowed) return null;

  return next;
}

function buildEmailHtml(link: string) {
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

/**
 * Minimal validation to catch common Resend “from” mistakes.
 * Resend requires a verified sender/domain; invalid FROM often leads to non-delivery.
 */
function looksLikeEmailFrom(from: string) {
  return (
    /<[^<>@\s]+@[^<>@\s]+\.[^<>@\s]+>/.test(from) ||
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(from)
  );
}

export async function POST(req: Request) {
  // ✅ FIX: Request has no nextUrl — parse from req.url
  const debug = new URL(req.url).searchParams.get("debug") === "1";

  try {
    const body = await req.json().catch(() => ({}));
    const emailRaw = typeof body?.email === "string" ? body.email : "";
    const next = sanitizeNext(body?.next);

    // Anti-enumeration: always OK
    if (!emailRaw) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const email = emailRaw.trim().toLowerCase();

    // Generate token + store hash
    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = sha256(token);
    const expiresAt = new Date(Date.now() + 20 * 60 * 1000).toISOString();

    const supabaseAdmin = await getSupabaseAdmin();

    const { error: insertErr } = await supabaseAdmin.from("magic_links").insert({
      email,
      token_hash: tokenHash,
      expires_at: expiresAt,
    });

    // Still anti-enumeration, but don’t send a link if insert failed
    if (insertErr) {
      console.error("[magic-link] insert error:", insertErr);
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const baseUrl =
      process.env.NODE_ENV === "production" ? CANONICAL : getBaseUrl(req);

    const url = new URL(`${baseUrl}/private/auth`);
    url.searchParams.set("token", token);
    if (next) url.searchParams.set("next", next);

    const link = url.toString();

    // ---- Sending ----
    const hasKey = !!RESEND_API_KEY;
    const fromOk = looksLikeEmailFrom(RESEND_FROM);

    // Operational logs (safe)
    if (!hasKey)
      console.error("[magic-link] RESEND_API_KEY missing (prod will not send)");
    if (!fromOk)
      console.error("[magic-link] RESEND_FROM looks invalid:", RESEND_FROM);

    let sendStatus: "sent" | "skipped" | "error" = "skipped";
    let sendMeta: any = undefined;

    if (hasKey && fromOk) {
      try {
        const resend = new Resend(RESEND_API_KEY);

        const result = await resend.emails.send({
          from: RESEND_FROM,
          to: email, // string is most reliable
          subject: "Your secure access link — Executive Partners",
          html: buildEmailHtml(link),
        });

        const maybeError = (result as any)?.error;
        if (maybeError) {
          sendStatus = "error";
          sendMeta = maybeError;
          console.error("[magic-link] Resend error:", maybeError);
        } else {
          sendStatus = "sent";
          sendMeta = (result as any)?.data ?? result;
          console.log("[magic-link] Resend sent:", sendMeta);
        }
      } catch (e: any) {
        sendStatus = "error";
        sendMeta = { message: e?.message || String(e) };
        console.error("[magic-link] Resend threw:", e?.message || e);
      }
    }

    // Response remains anti-enumeration by default.
    // With debug=1, you can see operational status (useful while testing).
    const resBody: any = { ok: true };
    if (debug) {
      resBody.debug = {
        sendStatus,
        hasKey,
        from: RESEND_FROM,
        baseUrl,
        next,
        // link is sensitive; only expose in debug
        link,
        sendMeta,
      };
    }

    const res = NextResponse.json(resBody, { status: 200 });
    res.headers.set("x-magic-link-send", sendStatus);
    return res;
  } catch (e: any) {
    console.error("[magic-link] unexpected error:", e?.message || e);
    return NextResponse.json({ ok: true }, { status: 200 });
  }
}