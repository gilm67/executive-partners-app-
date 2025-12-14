import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/private/lib/require-admin";
import { supabaseAdmin } from "@/lib/supabase-server";

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  await requireAdmin();

  const { id } = await ctx.params;

  const form = await req.formData().catch(() => null);
  const status = String(form?.get("status") || "");

  if (!id || (status !== "approved" && status !== "denied")) {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("private_profile_access_requests")
    .update({
      status,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ ok: false, error: "update_failed" }, { status: 500 });
  }

  // Simple UX: bounce back to admin list
  return NextResponse.redirect(new URL("/private/dashboard/requests", req.url), 303);
}