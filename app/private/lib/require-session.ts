import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-server";

export async function requirePrivateSession(requiredRole?: string) {
  // ✅ Next.js 15: cookies() must be awaited
  const cookieStore = await cookies();
  const sessionHash = cookieStore.get("ep_private")?.value;

  if (!sessionHash) {
    redirect("/private/auth/request");
  }

  const nowIso = new Date().toISOString();

  const { data: session, error } = await supabaseAdmin
    .from("private_sessions")
    .select("email, role, expires_at, revoked_at")
    .eq("session_hash", sessionHash)
    .is("revoked_at", null)
    .maybeSingle();

  if (error || !session) {
    redirect("/private/auth/request");
  }

  if (new Date(session.expires_at).getTime() < Date.now()) {
    redirect("/private/auth/request");
  }

  if (requiredRole && session.role !== requiredRole) {
    redirect("/private/auth/request");
  }

  // ✅ Optional: update last_seen_at (best-effort; never blocks)
  try {
    const { error: pingErr } = await supabaseAdmin
      .from("private_sessions")
      .update({ last_seen_at: nowIso })
      .eq("session_hash", sessionHash);

    // Intentionally ignore pingErr to keep auth flow robust
    void pingErr;
  } catch {
    // ignore on purpose
  }

  return session; // { email, role, expires_at, revoked_at }
}