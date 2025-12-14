import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-server";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function SecurePrivateLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const sessionHash = cookieStore.get("ep_private")?.value;

  if (!sessionHash) {
    redirect("/private/auth/request");
  }

  const { data, error } = await supabaseAdmin
    .from("private_sessions")
    .select("email, role, expires_at, revoked_at")
    .eq("session_hash", sessionHash)
    .maybeSingle();

  if (error || !data) {
    redirect("/private/auth/request");
  }

  const expired = new Date(data.expires_at).getTime() < Date.now();
  const revoked = !!data.revoked_at;

  if (expired || revoked) {
    redirect("/private/auth/request");
  }

  // Nice-to-have: last seen (won’t break anything if it fails)
  await supabaseAdmin
    .from("private_sessions")
    .update({ last_seen_at: new Date().toISOString() })
    .eq("session_hash", sessionHash);

  return <>{children}</>;
}