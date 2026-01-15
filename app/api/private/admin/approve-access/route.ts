import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Simple admin key to protect the endpoint (set in Vercel env)
const ADMIN_KEY = (process.env.PRIVATE_ADMIN_KEY || "").trim();

function bad() {
  return NextResponse.json({ ok: false }, { status: 401 });
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const key = (url.searchParams.get("key") || "").trim();
    const email = (url.searchParams.get("email") || "").trim().toLowerCase();
    const profileId = (url.searchParams.get("profile") || "").trim(); // "portability" | "bp-simulator"
    const org = (url.searchParams.get("org") || "").trim();

    if (!ADMIN_KEY || key !== ADMIN_KEY) return bad();
    if (!email || !profileId) return bad();

    const supabase = await getSupabaseAdmin();

    // Find latest request row for this email+profile (optional but neat)
    const { data: latest, error: findErr } = await supabase
      .from("private_profile_access_requests")
      .select("id, status, created_at")
      .eq("requester_email", email)
      .eq("profile_id", profileId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (findErr) {
      console.error("[approve-access] find error:", findErr);
      return NextResponse.json({ ok: false, error: "FIND_FAILED" }, { status: 500 });
    }

    // If no row exists yet, insert one approved (failsafe)
    if (!latest?.id) {
      const { error: insErr } = await supabase
        .from("private_profile_access_requests")
        .insert({
          profile_id: profileId,
          requester_email: email,
          requester_org: org || null,
          status: "approved",
          reviewed_at: new Date().toISOString(),
          reviewed_by: "admin",
        });

      if (insErr) {
        console.error("[approve-access] insert error:", insErr);
        return NextResponse.json({ ok: false, error: "INSERT_FAILED" }, { status: 500 });
      }

      return NextResponse.json({ ok: true, action: "inserted_approved" }, { status: 200 });
    }

    // Otherwise update latest row to approved
    const { error: updErr } = await supabase
      .from("private_profile_access_requests")
      .update({
        status: "approved",
        reviewed_at: new Date().toISOString(),
        reviewed_by: "admin",
      })
      .eq("id", latest.id);

    if (updErr) {
      console.error("[approve-access] update error:", updErr);
      return NextResponse.json({ ok: false, error: "UPDATE_FAILED" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, action: "updated_approved" }, { status: 200 });
  } catch (e: any) {
    console.error("[approve-access] unexpected:", e?.message || e);
    return NextResponse.json({ ok: false, error: "INTERNAL_ERROR" }, { status: 500 });
  }
}