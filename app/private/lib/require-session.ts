import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase-server";

const PRIVATE_COOKIE_NAME = "ep_private" as const;

// Only internal paths
function safeNext(nextRaw?: string) {
  if (!nextRaw) return null;
  const next = String(nextRaw).trim();
  if (!next) return null;
  if (!next.startsWith("/")) return null;
  if (next.startsWith("//")) return null;
  if (next.includes("://")) return null;
  return next;
}

export async function requirePrivateSession(requiredRole?: string, nextPath?: string) {
  const cookieStore = await cookies();
  const sessionHash = cookieStore.get(PRIVATE_COOKIE_NAME)?.value;

  const nextSafe = safeNext(nextPath);

  if (!sessionHash) {
    // ✅ preserve where user came from
    redirect(nextSafe ? `/private/auth?next=${encodeURIComponent(nextSafe)}` : "/private/auth");
  }

  const supabaseAdmin = await getSupabaseAdmin();
  const nowIso = new Date().toISOString();

  const { data: session, error } = await supabaseAdmin
    .from("private_sessions")
    .select("id, email, role, expires_at, revoked_at")
    .eq("session_hash", sessionHash!)
    .is("revoked_at", null)
    .gt("expires_at", nowIso)
    .maybeSingle();

  if (error || !session) {
    redirect(nextSafe ? `/private/auth?next=${encodeURIComponent(nextSafe)}` : "/private/auth");
  }

  if (requiredRole && session.role !== requiredRole) {
    redirect("/private");
  }

  try {
    await supabaseAdmin.from("private_sessions").update({ last_seen_at: nowIso }).eq("id", session.id);
  } catch {
    // ignore
  }

  return session;
}