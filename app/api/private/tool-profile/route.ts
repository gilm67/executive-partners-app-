import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import { getPrivateSessionEmail } from "@/app/private/lib/get-private-email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TABLE = "private_tool_profiles";

export async function GET() {
  const email = await getPrivateSessionEmail();
  if (!email) return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });

  const supabase = await getSupabaseAdmin();
  const { data, error } = await supabase
    .from(TABLE)
    .select("email, portability, bp, updated_at")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ ok: false, error: "DB_READ_FAILED" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, email, profile: data || null }, { status: 200 });
}

export async function POST(req: Request) {
  const email = await getPrivateSessionEmail();
  if (!email) return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const tool = String(body?.tool || "").trim(); // "bp" | "portability"
  const payload = body?.payload ?? null;

  if (!tool || !["bp", "portability"].includes(tool)) {
    return NextResponse.json({ ok: false, error: "INVALID_TOOL" }, { status: 400 });
  }

  const supabase = await getSupabaseAdmin();

  // Read existing so we can merge safely
  const { data: existing } = await supabase
    .from(TABLE)
    .select("portability, bp")
    .eq("email", email)
    .maybeSingle();

  const nextRow =
    tool === "bp"
      ? { email, bp: payload, portability: existing?.portability ?? null, updated_at: new Date().toISOString() }
      : { email, portability: payload, bp: existing?.bp ?? null, updated_at: new Date().toISOString() };

  // Upsert by unique(email)
  const { error: upErr } = await supabase
    .from(TABLE)
    .upsert(nextRow, { onConflict: "email" });

  if (upErr) {
    return NextResponse.json({ ok: false, error: "DB_WRITE_FAILED" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, email, saved: tool }, { status: 200 });
}