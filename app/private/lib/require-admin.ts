import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-server";

function parseAdminEmails(): string[] {
  const raw = process.env.PRIVATE_ADMIN_EMAILS || "";
  return raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export async function requireAdmin() {
  // Next.js 15: cookies() must be awaited
  const cookieStore = await cookies();
  const sessionHash = cookieStore.get("ep_private")?.value;

  if (!sessionHash) {
    redirect("/private/auth/request");
  }

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

  const admins = parseAdminEmails();
  const email = String(session.email || "").toLowerCase();

  // Allow either:
  // - role === 'admin' OR
  // - email is allowlisted via PRIVATE_ADMIN_EMAILS
  const isAdminByRole = session.role === "admin";
  const isAdminByEmail = admins.length > 0 && admins.includes(email);

  if (!isAdminByRole && !isAdminByEmail) {
    redirect("/private");
  }

  return session; // { email, role, ... }
}