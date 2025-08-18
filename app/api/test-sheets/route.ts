import { NextResponse } from "next/server";
import { client } from "@/lib/sheets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const meta = await client.spreadsheets.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    });

    return NextResponse.json({
      ok: true,
      title: meta.data.properties?.title,
    });
  } catch (err: any) {
    console.error("❌ Error in test-sheets:", err);
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}
