// app/api/test-sheets/route.ts
import { NextResponse } from "next/server";
import { getSheetsClient } from "@/lib/google";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { sheets, sheetId } = getSheetsClient();
    const r = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "Candidates!A1:A1",
    });
    return NextResponse.json({
      ok: true,
      sheetId,
      a1: r.data.values || [],
    });
  } catch (err: any) {
    console.error("test-sheets error:", err?.message || err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
