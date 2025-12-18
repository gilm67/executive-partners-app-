import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase-server";

const PRIVATE_COOKIE_NAME = "ep_private" as const;

export async function requirePrivateSession(requiredRole?: string) {
  // ✅ Next.js 15: cookies() must be awaited
  const cookieStore = await cookies();
  const sessionHash = cookieStore.get(PRIVATE_COOKIE_NAME)?.value;

  if (!sessionHash) {
    redirect("/private/auth");
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
    redirect("/private/auth");
  }

  // Optional role gate
  if (requiredRole && session.role !== requiredRole) {
    redirect("/private");
  }

  // Optional best-effort last_seen update (do not break auth if it fails)
  try {
    await supabaseAdmin
      .from("private_sessions")
      .update({ last_seen_at: nowIso })
      .eq("id", session.id);
  } catch {
    // ignore (never block auth)
  }

  return session;
}