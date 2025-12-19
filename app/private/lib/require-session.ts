// app/private/lib/require-session.ts
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase-server";

const PRIVATE_COOKIE_NAME = "ep_private" as const;

/**
 * ✅ SAFE INTERNAL REDIRECTS ONLY (explicit allow list)
 * Allows:
 *  - /private...
 *  - /en/portability...
 *  - /en/bp-simulator...
 *  - /en/... (optional; keep if you want generic EN routing)
 */
function safeNext(nextRaw?: string | null): string | null {
  if (!nextRaw) return null;

  const next = String(nextRaw).trim();
  if (!next) return null;

  // must be internal path
  if (!next.startsWith("/")) return null;
  if (next.startsWith("//")) return null;
  if (next.includes("://")) return null;

  const ALLOWED_PREFIXES = [
    "/private",
    "/en/portability",
    "/en/bp-simulator",
    "/en",
  ];

  const ok =
    ALLOWED_PREFIXES.some((p) => next === p || next.startsWith(p + "/"));

  return ok ? next : null;
}

function authUrl(nextSafe: string | null) {
  return nextSafe
    ? `/private/auth?next=${encodeURIComponent(nextSafe)}`
    : "/private/auth";
}

function privateHomeUrl(nextSafe: string | null) {
  // if role mismatch, keep where user wanted to go (optional)
  return nextSafe
    ? `/private?next=${encodeURIComponent(nextSafe)}`
    : "/private";
}

export async function requirePrivateSession(
  requiredRole?: string,
  nextPath?: string
) {
  const nextSafe = safeNext(nextPath);

  // ✅ Next.js 15: cookies() must be awaited
  const cookieStore = await cookies();
  const sessionHash = cookieStore.get(PRIVATE_COOKIE_NAME)?.value ?? null;

  if (!sessionHash) {
    redirect(authUrl(nextSafe));
  }

  const supabaseAdmin = await getSupabaseAdmin();
  const nowIso = new Date().toISOString();

  const { data: session, error } = await supabaseAdmin
    .from("private_sessions")
    .select("id, email, role, expires_at, revoked_at")
    .eq("session_hash", sessionHash)
    .is("revoked_at", null)
    .gt("expires_at", nowIso)
    .maybeSingle();

  // invalid / expired session -> re-auth with same next
  if (error || !session) {
    redirect(authUrl(nextSafe));
  }

  // role gate (keep context)
  if (requiredRole && session.role !== requiredRole) {
    redirect(privateHomeUrl(nextSafe));
  }

  // best-effort last_seen update
  try {
    await supabaseAdmin
      .from("private_sessions")
      .update({ last_seen_at: nowIso })
      .eq("id", session.id);
  } catch {
    // ignore
  }

  return session;
}