import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-server";

const PRIVATE_COOKIE_NAME = "ep_private" as const;

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

function parseExpiryMs(expiresAt: unknown): number {
  const ms = new Date(String(expiresAt ?? "")).getTime();
  return Number.isFinite(ms) ? ms : NaN;
}

export async function requireAdmin() {
  // Next.js 15: cookies() must be awaited
  const cookieStore = await cookies();
  const sessionHash = cookieStore.get(PRIVATE_COOKIE_NAME)?.value;

  if (!sessionHash) redirect("/private/auth/request");

  const { data: session, error } = await supabaseAdmin
    .from("private_sessions")
    .select("email, role, expires_at, revoked_at")
    .eq("session_hash", sessionHash)
    .is("revoked_at", null)
    .maybeSingle();

  if (error || !session) redirect("/private/auth/request");

  const expiresMs = parseExpiryMs((session as any).expires_at);
  if (!Number.isFinite(expiresMs) || expiresMs < Date.now()) {
    redirect("/private/auth/request");
  }

  const email = String((session as any).email ?? "").trim().toLowerCase();
  if (!email) redirect("/private/auth/request");

  const admins = parseList(process.env.PRIVATE_ADMIN_EMAILS);

  // Allow either:
  // - role === 'admin' OR
  // - email is allowlisted via PRIVATE_ADMIN_EMAILS OR
  // - email matches PRIVATE_ADMIN_DOMAIN (optional)
  const role = String((session as any).role ?? "").toLowerCase();
  const isAdminByRole = role === "admin";
  const isAdminByEmail = admins.includes(email);
  const isAdminByDomain = isAllowedDomain(email);

  if (!isAdminByRole && !isAdminByEmail && !isAdminByDomain) {
    redirect("/private");
  }

  return session; // { email, role, expires_at, ... }
}