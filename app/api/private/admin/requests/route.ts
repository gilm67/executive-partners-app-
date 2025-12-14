import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/private/lib/require-admin";
import { supabaseAdmin } from "@/lib/supabase-server";

export async function GET() {
  // Gate
  await requireAdmin();

  // Pull latest requests + join basic profile info
  const { data, error } = await supabaseAdmin
    .from("private_profile_access_requests")
    .select(`
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
    `)
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    return NextResponse.json({ ok: false, error: "fetch_failed" }, { status: 500 });
  }

  const rows =
    (data || []).map((r: any) => ({
      ...r,
      profile: r.private_profiles ?? null,
    })) ?? [];

  return NextResponse.json({ ok: true, rows }, { status: 200 });
}