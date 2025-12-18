import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase-server";

const PRIVATE_COOKIE_NAME = "ep_private" as const;

export async function requireAdmin() {
  const cookieStore = await cookies();
  const sessionHash = cookieStore.get(PRIVATE_COOKIE_NAME)?.value;

  if (!sessionHash) {
    redirect("/private/auth");
  }

  const supabaseAdmin = await getSupabaseAdmin();

  const nowIso = new Date().toISOString();

  const { data: session, error } = await supabaseAdmin
    .from("private_sessions")
    .select("email, role, expires_at, revoked_at")
    .eq("session_hash", sessionHash!)
    .is("revoked_at", null)
    .gt("expires_at", nowIso)
    .maybeSingle();

  if (error || !session) {
    redirect("/private/auth");
  }

  if (session.role !== "admin") {
    redirect("/private");
  }

  // return session if you want to use it elsewhere
  return session;
}