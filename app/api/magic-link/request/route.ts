// app/api/magic-link/request/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VERSION = "ml-2026-01-15-c"; // ✅ bump

const CANONICAL = (
  process.env.NEXT_PUBLIC_CANONICAL_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.execpartners.ch"
)
  .trim()
  .replace(/\/$/, "");

const RESEND_API_KEY = (process.env.RESEND_API_KEY || "").trim();

// DEV/Preview safe fallback sender (works immediately)
const RESEND_FROM = (
  process.env.RESEND_FROM ||
  (process.env.NODE_ENV !== "production"
    ? "Executive Partners <onboarding@resend.dev>"
    : "Executive Partners <no-reply@auth.execpartners.ch>")
).trim();

function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function getBaseUrl(req: Request) {
  const configured =
    (process.env.NEXT_PUBLIC_SITE_URL || "").trim() ||
    (process.env.NEXT_PUBLIC_CANONICAL_URL || "").trim();
  if (configured) return configured.replace(/\/$/, "");

  const proto = (req.headers.get("x-forwarded-proto") || "https").trim();
  const host =
    (req.headers.get("x-forwarded-host") ||
      req.headers.get("host") ||
      req.headers.get("x-vercel-deployment-url") ||
      "")
      .trim();

  if (host) {
    const cleanHost = host.replace(/^https?:\/\//, "").replace(/\/$/, "");
    return `${proto}://${cleanHost}`.replace(/\/$/, "");
  }

  return CANONICAL;
}

/**
 * SAFE INTERNAL REDIRECTS ONLY
 */
function sanitizeNext(nextRaw: unknown): string | null {
  if (typeof nextRaw !== "string") return null;

  let next = nextRaw.trim();
  if (!next) return null;

  if (!next.startsWith("/")) return null;
  if (next.startsWith("//")) return null;
  if (next.includes("://")) return null;

  next = next.split("#")[0].split("?")[0];

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

/**
 * ✅ ENFORCEMENT:
 * - request_type = 'portability' OR 'bp'
 * - profile_id IS NULL
 * - requester_email = email
 * - latest status must be 'approved'
 *
 * ✅ Compatibility:
 * checks BOTH tables:
 * - private_profile_access_requests_v2
 * - private_profile_access_requests
 */
async function isApprovedEmail(
  email: string,
  next: string
): Promise<{ approved: boolean; debug?: any }> {
  const requestType = next.startsWith("/en/portability")
    ? "portability"
    : next.startsWith("/en/bp-simulator")
      ? "bp"
      : null;

  if (!requestType) return { approved: true, debug: { reason: "NOT_GATED" } };

  const supabaseAdmin = await getSupabaseAdmin();

  const tables = ["private_profile_access_requests_v2", "private_profile_access_requests"];

  for (const table of tables) {
    const { data, error } = await supabaseAdmin
      .from(table as any)
      .select("status, reviewed_at, created_at, request_type, profile_id")
      .eq("request_type", requestType)
      .eq("requester_email", email)
      .is("profile_id", null)
      .order("reviewed_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error(`[magic-link] approval check error (${table}):`, error);
      continue;
    }

    const status = String(data?.status || "").trim().toLowerCase();

    if (status === "approved") {
      return {
        approved: true,
        debug: { table, found: data, normalizedStatus: status },
      };
    }

    // If a row exists but not approved, return debug and keep checking the other table (just in case)
    if (data) {
      const maybe = {
        table,
        found: data,
        normalizedStatus: status,
      };
      // keep looping; we might find approved in the other table
      // but preserve "maybe" in case nothing else matches
      var lastSeen = maybe;
    }
  }

  return {
    approved: false,
    debug: { reason: "NOT_APPROVED", requestType, lastSeen: (globalThis as any).lastSeen ?? undefined },
  };
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

function looksLikeEmailFrom(from: string) {
  return (
    /<[^<>@\s]+@[^<>@\s]+\.[^<>@\s]+>/.test(from) ||
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(from)
  );
}

export async function POST(req: Request) {
  const debug = new URL(req.url).searchParams.get("debug") === "1";

  try {
    const body = await req.json().catch(() => ({}));
    const emailRaw = typeof body?.email === "string" ? body.email : "";
    const next = sanitizeNext(body?.next) ?? "/en/bp-simulator";

    // Anti-enumeration
    if (!emailRaw) {
      const res = NextResponse.json({ ok: true }, { status: 200 });
      res.headers.set("x-magic-link-version", VERSION);
      res.headers.set("x-magic-link-next", next ?? "null");
      return res;
    }

    const email = emailRaw.trim().toLowerCase();

    // ✅ ENFORCE APPROVAL BEFORE token creation + sending
    const check = await isApprovedEmail(email, next);

    if (!check.approved) {
      const resBody: any = { ok: true };
      if (debug) {
        resBody.debug = {
          sendStatus: "skipped",
          reason: "NOT_APPROVED",
          email,
          next,
          version: VERSION,
          approvalDebug: check.debug,
        };
      }
      const res = NextResponse.json(resBody, { status: 200 });
      res.headers.set("x-magic-link-send", "skipped");
      res.headers.set("x-magic-link-version", VERSION);
      res.headers.set("x-magic-link-next", next ?? "null");
      return res;
    }

    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = sha256(token);
    const expiresAt = new Date(Date.now() + 20 * 60 * 1000).toISOString();

    const supabaseAdmin = await getSupabaseAdmin();
    const { error: insertErr } = await supabaseAdmin.from("magic_links").insert({
      email,
      token_hash: tokenHash,
      expires_at: expiresAt,
    });

    if (insertErr) {
      console.error("[magic-link] insert error:", insertErr);
      const res = NextResponse.json({ ok: true }, { status: 200 });
      res.headers.set("x-magic-link-version", VERSION);
      res.headers.set("x-magic-link-next", next ?? "null");
      return res;
    }

    const baseUrl =
      process.env.NODE_ENV === "production" ? CANONICAL : getBaseUrl(req);

    const url = new URL(`${String(baseUrl).trim()}/private/auth`);
    url.searchParams.set("token", token);
    if (next) url.searchParams.set("next", next);

    const link = url.toString();

    const hasKey = !!RESEND_API_KEY;
    const fromOk = looksLikeEmailFrom(RESEND_FROM);

    let sendStatus: "sent" | "skipped" | "error" = "skipped";
    let sendMeta: any = undefined;

    if (hasKey && fromOk) {
      try {
        const resend = new Resend(RESEND_API_KEY);
        const result = await resend.emails.send({
          from: RESEND_FROM,
          to: email,
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
        }
      } catch (e: any) {
        sendStatus = "error";
        sendMeta = { message: e?.message || String(e) };
        console.error("[magic-link] Resend threw:", e?.message || e);
      }
    } else {
      if (!hasKey) sendMeta = { reason: "missing_RESEND_API_KEY" };
      else if (!fromOk) sendMeta = { reason: "invalid_RESEND_FROM", from: RESEND_FROM };
    }

    if (sendStatus === "error") {
      const resBody: any = { ok: false, error: "EMAIL_DELIVERY_FAILED" };
      if (debug) {
        resBody.debug = {
          sendStatus,
          from: RESEND_FROM,
          baseUrl,
          next,
          link,
          sendMeta,
          version: VERSION,
          approvalDebug: check.debug,
        };
      }
      const res = NextResponse.json(resBody, { status: 500 });
      res.headers.set("x-magic-link-send", sendStatus);
      res.headers.set("x-magic-link-version", VERSION);
      res.headers.set("x-magic-link-next", next ?? "null");
      return res;
    }

    const resBody: any = { ok: true };
    if (debug) {
      resBody.debug = {
        sendStatus,
        from: RESEND_FROM,
        baseUrl,
        next,
        link,
        sendMeta,
        version: VERSION,
        approvalDebug: check.debug,
      };
    }

    const res = NextResponse.json(resBody, { status: 200 });
    res.headers.set("x-magic-link-send", sendStatus);
    res.headers.set("x-magic-link-version", VERSION);
    res.headers.set("x-magic-link-next", next ?? "null");
    return res;
  } catch (e: any) {
    console.error("[magic-link] unexpected error:", e?.message || e);
    const res = NextResponse.json({ ok: true }, { status: 200 });
    res.headers.set("x-magic-link-version", VERSION);
    res.headers.set("x-magic-link-next", "null");
    return res;
  }
}