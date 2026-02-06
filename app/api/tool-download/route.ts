import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export const runtime = "nodejs";

type Body = {
  email: string | null;
  tool_name: "portability" | "bp";
  download_type: "full" | "anon";
  score?: number | null;
  market?: string | null;
  total_aum_m?: number | null;
  self_acquired_pct?: number | null;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;

    if (!body?.tool_name || !body?.download_type) {
      return NextResponse.json(
        { ok: false, error: "tool_name and download_type are required" },
        { status: 400 }
      );
    }

    const supabase = await getSupabaseAdmin();

    const { error } = await supabase.from("tool_leads").insert({
      event_type: "pdf_downloaded",
      email: body.email,
      tool_name: body.tool_name,
      download_type: body.download_type,
      score: body.score ?? null,
      market: body.market ?? null,
      total_aum_m: body.total_aum_m ?? null,
      self_acquired_pct: body.self_acquired_pct ?? null,
      pdf_generated: true,
      input_data: null, // keep empty for download event (optional)
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("tool-download error:", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}