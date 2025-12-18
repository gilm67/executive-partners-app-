import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CANONICAL = (process.env.NEXT_PUBLIC_CANONICAL_URL || "https://www.execpartners.ch").replace(
  /\/$/,
  ""
);

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const RESEND_FROM =
  process.env.RESEND_FROM || "Executive Partners <recruiter@execpartners.ch>";

function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function getBaseUrl(req: Request) {
  const origin = req.headers.get("origin");
  if (origin) return origin.replace(/\/$/, "");

  const host = req.headers.get("host");
  const proto = req.headers.get("x-forwarded-proto") ?? "http";
  if (host) return `${proto}://${host}`.replace(/\/$/, "");

  return CANONICAL;
}

/**
 * ✅ SAFE INTERNAL REDIRECTS ONLY
 * - internal only (no scheme)
 * - normalizes common paths to the correct localized routes
 * - strict allow-list to avoid “/private” being the accidental default
 */
function sanitizeNext(nextRaw: unknown): string | null {
  if (typeof nextRaw !== "string") return null;

  let next = nextRaw.trim();
  if (!next) return null;

  // internal-only
  if (!next.startsWith("/")) return null;
  if (next.startsWith("//")) return null;
  if (next.includes("://")) return null;

  // ✅ normalize common variants
  if (next === "/portability") next = "/en/portability";
  if (next === "/bp-simulator") next = "/en/bp-simulator";
  if (next === "/en/portability/") next = "/en/portability";
  if (next === "/en/bp-simulator/") next = "/en/bp-simulator";
  if (next === "/private/") next = "/private";

  // ✅ strict allow-list (exact paths + /private area)
  const ALLOWED = ["/en/portability", "/en/bp-simulator", "/private"];
  const isAllowed =
    ALLOWED.includes(next) || next.startsWith("/private/");

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

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const emailRaw = typeof body?.email === "string" ? body.email : "";
    const next = sanitizeNext(body?.next);

    // Anti-enumeration: always OK
    if (!emailRaw) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const email = emailRaw.trim().toLowerCase();

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
      if (process.env.NODE_ENV !== "production") {
        console.error("magic_links insert error:", insertErr);
      }
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const baseUrl = process.env.NODE_ENV === "production" ? CANONICAL : getBaseUrl(req);

    const url = new URL(`${baseUrl}/private/auth`);
    url.searchParams.set("token", token);
    if (next) url.searchParams.set("next", next);

    const link = url.toString();

    if (RESEND_API_KEY) {
      const resend = new Resend(RESEND_API_KEY);
      try {
        await resend.emails.send({
          from: RESEND_FROM,
          to: [email],
          subject: "Your secure access link — Executive Partners",
          html: buildEmailHtml(link),
        });
      } catch (e) {
        if (process.env.NODE_ENV !== "production") {
          console.error("Resend send error:", e);
          console.log("MAGIC LINK (fallback):", link);
        }
      }
    } else {
      if (process.env.NODE_ENV !== "production") {
        console.log("RESEND_API_KEY missing — MAGIC LINK:", link);
      }
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: true }, { status: 200 });
  }
}