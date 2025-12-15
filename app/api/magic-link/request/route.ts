import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase-server";

const CANONICAL = (
  process.env.NEXT_PUBLIC_CANONICAL_URL || "https://www.execpartners.ch"
).replace(/\/$/, "");

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const RESEND_FROM =
  process.env.RESEND_FROM ||
  "Executive Partners <recruiter@execpartners.ch>";

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
 * Only allow internal redirects.
 * - Must start with "/"
 * - Must NOT start with "//"
 * - Must NOT contain "http" etc.
 */
function sanitizeNext(nextRaw: unknown): string | null {
  if (typeof nextRaw !== "string") return null;
  const next = nextRaw.trim();
  if (!next) return null;
  if (!next.startsWith("/")) return null;
  if (next.startsWith("//")) return null;
  if (next.includes("://")) return null;
  // Optional: keep it inside private area only
  if (!next.startsWith("/private")) return null;
  return next;
}

function buildEmailHtml(link: string) {
  return `
  <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height:1.5; color:#111;">
    <h2 style="margin:0 0 12px;">Your secure access link</h2>
    <p style="margin:0 0 12px;">Click the button below to access the private candidate profiles.</p>
    <p style="margin:0 0 18px;">
      <a href="${link}" style="display:inline-block; padding:10px 14px; background:#111; color:#fff; text-decoration:none; border-radius:8px;">
        Access private profiles
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

    // Always return ok to avoid email enumeration
    if (!emailRaw) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const email = emailRaw.trim().toLowerCase();

    // token + hash
    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = sha256(token);

    // 20 minutes expiry
    const expiresAt = new Date(Date.now() + 20 * 60 * 1000).toISOString();

    const { error } = await supabaseAdmin.from("magic_links").insert({
      email,
      token_hash: tokenHash,
      expires_at: expiresAt,
    });

    // Even on error, don't reveal anything
    if (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error("magic-link insert error:", error);
      }
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // Build link
    const baseUrl =
      process.env.NODE_ENV === "production" ? CANONICAL : getBaseUrl(req);

    const url = new URL(`${baseUrl}/private/auth`);
    url.searchParams.set("token", token);
    if (next) url.searchParams.set("next", next);

    const link = url.toString();

    // Send email (if configured)
    if (RESEND_API_KEY) {
      const resend = new Resend(RESEND_API_KEY);

      try {
        await resend.emails.send({
          from: RESEND_FROM,
          to: [email],
          subject: "Your secure access link — Executive Partners",
          html: buildEmailHtml(link),
        });

        if (process.env.NODE_ENV !== "production") {
          console.log("Resend: magic link email sent to", email);
        }
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