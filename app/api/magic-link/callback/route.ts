// app/api/magic-link/callback/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

/** must match request route allow-list */
function sanitizeNext(nextRaw: unknown): string | null {
  if (typeof nextRaw !== "string") return null;

  let next = nextRaw.trim();
  if (!next) return null;

  // internal only
  if (!next.startsWith("/")) return null;
  if (next.startsWith("//")) return null;
  if (next.includes("://")) return null;

  // defensive: strip query/hash if ever passed
  next = next.split("#")[0].split("?")[0];

  // normalize common variants
  if (next === "/bp-simulator") next = "/en/bp-simulator";
  if (next === "/portability") next = "/en/portability";
  if (next === "/en/bp-simulator/") next = "/en/bp-simulator";
  if (next === "/en/portability/") next = "/en/portability";
  if (next === "/private/") next = "/private";

  // critical: legacy private bp route -> public gated route
  if (next === "/private/bp-simulator" || next.startsWith("/private/bp-simulator")) {
    next = "/en/bp-simulator";
  }

  const ALLOWED_PREFIXES = ["/private", "/en/portability", "/en/bp-simulator"];
  if (!ALLOWED_PREFIXES.some((p) => next.startsWith(p))) return null;

  return next;
}

function baseUrlFromReq(req: Request) {
  // prefer explicit canonical if provided
  const configured =
    (process.env.NEXT_PUBLIC_CANONICAL_URL || "").trim() ||
    (process.env.NEXT_PUBLIC_SITE_URL || "").trim();
  if (configured) return configured.replace(/\/$/, "");

  const proto = req.headers.get("x-forwarded-proto") || "https";
  const host =
    req.headers.get("x-forwarded-host") ||
    req.headers.get("host") ||
    "www.execpartners.ch";

  const cleanHost = host.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return `${proto}://${cleanHost}`.replace(/\/$/, "");
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token") || "";
  const next = sanitizeNext(url.searchParams.get("next")) || "/en/bp-simulator";

  const redirectTo = new URL(next, baseUrlFromReq(req));

  // no token -> just redirect safely
  if (!token) return NextResponse.redirect(redirectTo, { status: 302 });

  try {
    const supabaseAdmin = await getSupabaseAdmin();
    const tokenHash = sha256(token);

    // 1) Fetch magic link row
    const { data, error } = await supabaseAdmin
      .from("magic_links")
      .select("id,email,expires_at,used_at")
      .eq("token_hash", tokenHash)
      .maybeSingle();

    if (error || !data) return NextResponse.redirect(redirectTo, { status: 302 });

    const expired = new Date(data.expires_at).getTime() < Date.now();
    const used = !!data.used_at;
    if (expired || used) return NextResponse.redirect(redirectTo, { status: 302 });

    // 2) Atomic single-use
    const nowIso = new Date().toISOString();
    const { data: usedRow, error: useErr } = await supabaseAdmin
      .from("magic_links")
      .update({ used_at: nowIso })
      .eq("id", data.id)
      .is("used_at", null)
      .select("id")
      .maybeSingle();

    if (useErr || !usedRow) return NextResponse.redirect(redirectTo, { status: 302 });

    const email = String(data.email || "").trim().toLowerCase();
    if (!email) return NextResponse.redirect(redirectTo, { status: 302 });

    // 3) Determine role (do not overwrite)
    let role = "candidate";
    const { data: existingUser } = await supabaseAdmin
      .from("private_users")
      .select("role")
      .eq("email", email)
      .maybeSingle();

    if (existingUser?.role) role = String(existingUser.role);

    // 4) Create session
    const sessionRaw = crypto.randomBytes(32).toString("hex");
    const sessionHash = sha256(sessionRaw);
    const expiresAtIso = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toISOString();

    // revoke any previous sessions
    await supabaseAdmin
      .from("private_sessions")
      .update({ revoked_at: nowIso })
      .eq("email", email)
      .is("revoked_at", null);

    const { error: sessErr } = await supabaseAdmin.from("private_sessions").insert({
      session_hash: sessionHash,
      email,
      role,
      expires_at: expiresAtIso,
      revoked_at: null,
      last_seen_at: nowIso,
      meta: { via: "magic_link_callback" },
    });

    if (sessErr) return NextResponse.redirect(redirectTo, { status: 302 });

    // 5) Redirect + set cookie
    const res = NextResponse.redirect(redirectTo, { status: 302 });

    const isProd = process.env.NODE_ENV === "production";
    res.cookies.set("ep_private", sessionHash, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      domain: isProd ? ".execpartners.ch" : undefined,
      maxAge: 60 * 60 * 24 * 7,
    });

    // debug headers (safe)
    res.headers.set("x-magic-link-callback", "ok");
    res.headers.set("x-magic-link-next", next);

    return res;
  } catch {
    return NextResponse.redirect(redirectTo, { status: 302 });
  }
}