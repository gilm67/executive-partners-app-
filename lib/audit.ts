// lib/audit.ts
import { getSupabaseAdmin } from "@/lib/supabase-server";

type AuditAction =
  | "magic_link_requested"
  | "magic_link_verify_ok"
  | "magic_link_verify_failed"
  | "magic_link_verify_revoke_failed"
  | "access_request_created"
  | "admin_request_status_changed";

type AuditMeta = Record<string, unknown> | null;

export async function audit(
  req: Request,
  action: AuditAction,
  email?: string,
  meta?: AuditMeta
) {
  try {
    const supabaseAdmin = await getSupabaseAdmin();

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      null;

    const user_agent = req.headers.get("user-agent") ?? null;

    await supabaseAdmin.from("private_audit_log").insert({
      action,
      email: email ?? null,
      ip,
      user_agent,
      meta: meta ?? null,
    });
  } catch {
    // Audit must NEVER break the main flow
  }
}