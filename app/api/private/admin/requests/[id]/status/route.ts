import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/private/lib/require-admin";
import { supabaseAdmin } from "@/lib/supabase-server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  await requireAdmin();

  const id = params?.id;
  const form = await req.formData().catch(() => null);
  const status = String(form?.get("status") || "").toLowerCase();

  if (!id || (status !== "approved" && status !== "denied")) {
    return NextResponse.json(
      { ok: false, error: "bad_request" },
      { status: 400 }
    );
  }

  const reviewedAt = new Date().toISOString();

  const { error } = await supabaseAdmin
    .from("private_profile_access_requests")
    .update({ status, reviewed_at: reviewedAt })
    .eq("id", id);

  if (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("request status update failed:", error);
    }
    return NextResponse.json(
      { ok: false, error: "update_failed" },
      { status: 500 }
    );
  }

  // Bounce back to admin list
  return NextResponse.redirect(
    new URL("/private/dashboard/requests", req.url),
    303
  );
}