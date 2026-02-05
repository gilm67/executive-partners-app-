import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export const runtime = "nodejs";

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

    const supabase = await getSupabaseAdmin();
    
    const { data, error } = await supabase
      .from("tool_leads")
      .insert([
        {
          email,
          tool_name,
          score,
          input_data,
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

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}