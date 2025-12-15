import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/private/lib/require-admin";
import { supabaseAdmin } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export async function GET() {
  // Gate
  await requireAdmin();

  // Pull latest requests + join basic profile info
  const { data, error } = await supabaseAdmin
    .from("private_profile_access_requests")
    .select(
      `
      id,
      created_at,
      status,
      requester_email,
      requester_org,
      message,
      profile_id,
      private_profiles:profile_id (
        headline,
        market,
        seniority,
        aum_band,
        book_type
      )
    `
    )
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("admin requests GET error:", error);
    }
    // Keep UI stable
    return NextResponse.json({ ok: false, rows: [] }, { status: 200 });
  }

  const rows = (data ?? []).map((r: any) => ({
    id: r.id,
    created_at: r.created_at,
    status: r.status,
    requester_email: r.requester_email,
    requester_org: r.requester_org,
    message: r.message,
    profile_id: r.profile_id,
    profile: r.private_profiles ?? null,
  }));

  return NextResponse.json({ ok: true, rows }, { status: 200 });
}