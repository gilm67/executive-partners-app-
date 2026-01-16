import { cookies } from "next/headers";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export async function getPrivateSessionEmail(): Promise<string | null> {
  const cookieStore = await cookies();
  const sessionHash = cookieStore.get("ep_private")?.value || null;
  if (!sessionHash) return null;

  const supabase = await getSupabaseAdmin();
  const nowIso = new Date().toISOString();

  const { data: session } = await supabase
    .from("private_sessions")
    .select("email, expires_at, revoked_at")
    .eq("session_hash", sessionHash)
    .is("revoked_at", null)
    .gt("expires_at", nowIso)
    .maybeSingle();

  const email = String(session?.email || "").trim().toLowerCase();
  return email || null;
}