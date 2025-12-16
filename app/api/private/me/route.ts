// app/api/private/me/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const noStoreHeaders = {
  "Cache-Control": "no-store, max-age=0",
  Pragma: "no-cache",
};

// Small helper to read a cookie value from a raw Cookie header
function getCookieValue(cookieHeader: string, name: string): string | null {
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  if (!match) return null;
  const raw = match[1] ?? "";
  const val = decodeURIComponent(raw).trim();
  return val || null;
}

export async function GET(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";

  // ✅ REAL cookie name (from app/api/magic-link/verify/route.ts)
  const sessionHash = getCookieValue(cookieHeader, "ep_private");

  // basic sanity (avoid "1", "true", empty)
  const hasCookie =
    typeof sessionHash === "string" &&
    sessionHash.length >= 24 &&
    !["null", "undefined"].includes(sessionHash.toLowerCase());

  if (!hasCookie) {
    return NextResponse.json(
      { ok: false, authenticated: false },
      { status: 401, headers: noStoreHeaders }
    );
  }

  // ✅ Server envs (must be in Vercel)
  const supabaseUrl = process.env.SUPABASE_URL || "";
  const serviceRole =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE ||
    process.env.SUPABASE_SERVICE_KEY ||
    "";

  if (!supabaseUrl || !serviceRole) {
    return NextResponse.json(
      { ok: false, authenticated: false, error: "server_misconfigured" },
      { status: 401, headers: noStoreHeaders }
    );
  }

  // ✅ IMPORTANT: dynamic import to avoid Next/Vercel build ESM wrapper issue
  const { createClient } = await import("@supabase/supabase-js");

  const supabaseAdmin = createClient(supabaseUrl, serviceRole, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const nowIso = new Date().toISOString();

  // 🔧 Table name assumed: private_sessions
  const { data: session, error } = await supabaseAdmin
    .from("private_sessions")
    .select("id, email, role, expires_at, revoked_at")
    .eq("session_hash", sessionHash)
    .is("revoked_at", null)
    .gt("expires_at", nowIso)
    .maybeSingle();

  if (error || !session) {
    return NextResponse.json(
      { ok: false, authenticated: false },
      { status: 401, headers: noStoreHeaders }
    );
  }

  // Optional: update last_seen_at (don’t fail auth if this update fails)
  try {
    await supabaseAdmin
      .from("private_sessions")
      .update({ last_seen_at: nowIso })
      .eq("id", session.id);
  } catch {
    // ignore
  }

  return NextResponse.json(
    {
      ok: true,
      authenticated: true,
      user: { email: session.email, role: session.role },
    },
    { status: 200, headers: noStoreHeaders }
  );
}