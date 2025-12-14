// lib/audit.ts
import { supabaseAdmin } from "@/lib/supabase-server";

type AuditAction =
  | "magic_link_requested"
  | "magic_link_sent"
  | "magic_link_verify_ok"
  | "magic_link_verify_failed";

export async function auditLog(params: {
  action: AuditAction;
  email?: string | null;
  ip?: string | null;
  userAgent?: string | null;
  meta?: Record<string, any>;
}) {
  try {
    const { action, email, ip, userAgent, meta } = params;

    await supabaseAdmin.from("private_audit_log").insert({
      action,
      email: email ?? null,
      ip: ip ?? null,
      user_agent: userAgent ?? null,
      meta: meta ?? null,
    });
  } catch {
    // Never block auth flow if logging fails
  }
}