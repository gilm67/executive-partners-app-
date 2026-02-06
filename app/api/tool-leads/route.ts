import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export const runtime = "nodejs";

/**
 * Convert a numeric score into an actionable bucket
 */
function getScoreBucket(score: number) {
  if (score >= 75) return "A+ (Immediate move)";
  if (score >= 60) return "A (Strong portability)";
  if (score >= 40) return "B (Conditional portability)";
  return "C (Weak portability)";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, tool_name, score, input_data } = body;

    if (!email || !tool_name) {
      return NextResponse.json(
        { error: "Email and tool_name are required" },
        { status: 400 }
      );
    }

    const numericScore = Number(score || 0);
    const scoreBucket = getScoreBucket(numericScore);
    const market = input_data?.current_market || "N/A";

    const supabase = await getSupabaseAdmin();

    const { data, error } = await supabase
      .from("tool_leads")
      .insert([
        {
          email,
          tool_name,              // e.g. "portability"
          tool: tool_name,        // explicit duplication for analytics
          score: numericScore,
          score_bucket: scoreBucket,
          market,
          input_data,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to save lead" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}