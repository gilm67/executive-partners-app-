import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export const metadata = {
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function PrivateSecureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ Next.js 15: cookies() is async in your setup
  const cookieStore = await cookies();
  const sessionHash = cookieStore.get("ep_private")?.value;

  if (!sessionHash) {
    redirect("/private/auth");
  }

  const supabaseAdmin = await getSupabaseAdmin();

  const nowIso = new Date().toISOString();

  // ✅ Validate session
  const { data: session } = await supabaseAdmin
    .from("private_sessions")
    .select("id, email, role, expires_at, revoked_at")
    .eq("session_hash", sessionHash)
    .is("revoked_at", null)
    .gt("expires_at", nowIso)
    .maybeSingle();

  if (!session) {
    redirect("/private/auth");
  }

  // ✅ Best-effort last_seen update (don’t break layout if it fails)
  try {
    await supabaseAdmin
      .from("private_sessions")
      .update({ last_seen_at: nowIso })
      .eq("id", session.id);
  } catch {}

  return <>{children}</>;
}