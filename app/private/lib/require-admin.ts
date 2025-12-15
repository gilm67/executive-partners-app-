import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-server";

function parseList(raw?: string | null): string[] {
  return (raw ?? "")
    // support comma / semicolon / newlines just in case
    .split(/[,;\n\r]+/g)
    .map((s) => s.trim())
    // remove wrapping quotes if someone pasted them in env
    .map((s) => s.replace(/^"+|"+$/g, "").replace(/^'+|'+$/g, ""))
    .map((s) => s.toLowerCase())
    .filter(Boolean);
}

function isAllowedDomain(email: string): boolean {
  const domain = (process.env.PRIVATE_ADMIN_DOMAIN ?? "").trim().toLowerCase();
  if (!domain) return false;
  return email.endsWith(`@${domain}`);
}

export async function requireAdmin() {
  // Next.js 15: cookies() must be awaited
  const cookieStore = await cookies();

  // ✅ must match the cookie you actually set in your app
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

  const expires = new Date(session.expires_at as any).getTime();
  if (!Number.isFinite(expires) || expires < Date.now()) {
    redirect("/private/auth/request");
  }

  const email = String(session.email ?? "").trim().toLowerCase();
  const admins = parseList(process.env.PRIVATE_ADMIN_EMAILS);

  // Allow either:
  // - role === 'admin' OR
  // - email is allowlisted via PRIVATE_ADMIN_EMAILS OR
  // - email matches PRIVATE_ADMIN_DOMAIN (optional)
  const isAdminByRole = session.role === "admin";
  const isAdminByEmail = admins.length > 0 && admins.includes(email);
  const isAdminByDomain = !!email && isAllowedDomain(email);

  if (!isAdminByRole && !isAdminByEmail && !isAdminByDomain) {
    redirect("/private");
  }

  return session; // { email, role, ... }
}