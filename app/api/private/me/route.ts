// app/api/private/me/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Small helper to read a cookie value from a raw Cookie header
function getCookieValue(cookieHeader: string, name: string): string | null {
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  if (!match) return null;

  const raw = match[1] ?? "";
  const val = decodeURIComponent(raw).trim();
  return val || null;
}

function noStoreJson(body: any, status: number) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      Pragma: "no-cache",
    },
  });
}

export async function GET(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";

  // ✅ Read the REAL cookie used by your magic-link route
  const sessionHash = getCookieValue(cookieHeader, "ep_private");

  // Minimal sanity (still not enough alone — DB validation below is the real proof)
  const hasSessionCookie =
    typeof sessionHash === "string" &&
    sessionHash.length >= 16 &&
    !["null", "undefined"].includes(sessionHash.toLowerCase());

  // Optional bearer support (keep it, but still validate server-side if you use it)
  const auth = req.headers.get("authorization") || "";
  const bearer = auth.toLowerCase().startsWith("bearer ")
    ? auth.trim().slice("bearer ".length).trim()
    : "";
  const hasBearer = bearer.length > 20;

  // ✅ secure-by-default: no proof => 401
  if (!hasSessionCookie && !hasBearer) {
    return noStoreJson({ ok: false, authenticated: false }, 401);
  }

  // ✅ DB validation (Supabase service role)
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceRole =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || "";

  if (!supabaseUrl || !serviceRole) {
    // Security stance: if we cannot validate, we do NOT claim authenticated
    return noStoreJson(
      {
        ok: false,
        authenticated: false,
        error:
          "Missing SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY. Cannot validate private session securely.",
      },
      500
    );
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRole, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // Validate that the session exists, is not revoked, and not expired.
  // NOTE: adjust column names if yours differ.
  const { data: session, error } = await supabaseAdmin
    .from("private_sessions")
    .select("email, role, expires_at, revoked_at")
    .eq("session_hash", sessionHash)
    .is("revoked_at", null)
    .single();

  if (error || !session) {
    return noStoreJson({ ok: false, authenticated: false }, 401);
  }

  const expiresAt = session.expires_at ? new Date(session.expires_at).getTime() : 0;
  const isExpired = !expiresAt || expiresAt < Date.now();

  if (isExpired) {
    return noStoreJson({ ok: false, authenticated: false }, 401);
  }

  return noStoreJson(
    {
      ok: true,
      authenticated: true,
      user: {
        email: session.email ?? null,
        role: session.role ?? null,
      },
    },
    200
  );
}