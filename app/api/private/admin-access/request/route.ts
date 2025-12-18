import { NextResponse } from "next/server";
import { requirePrivateSession } from "@/app/private/lib/require-session";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    // must be logged in
    const session = await requirePrivateSession(); // returns { email, role, ... }

    const email = String(session.email || "").toLowerCase().trim();
    if (!email) return NextResponse.json({ ok: false }, { status: 400 });

    const supabaseAdmin = await getSupabaseAdmin();

    // Insert (or keep existing pending)
    // If you have a UNIQUE constraint on (email,status) for pending, even better.
    const { error } = await supabaseAdmin.from("private_admin_requests").insert({
      email,
      status: "pending",
      org: null,
      reason: null,
      reviewed_at: null,
      reviewed_by: null,
    });

    // Don’t leak details
    if (error && process.env.NODE_ENV !== "production") {
      console.error("admin-access request insert error:", error);
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
}