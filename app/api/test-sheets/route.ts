// app/api/test-sheets/route.ts
import { NextResponse } from "next/server";
import { getSheetsClient } from "@/lib/sheets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { sheets, sheetId } = getSheetsClient();
    const meta = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
    const titles =
      meta.data.sheets?.map((s) => s.properties?.title).filter(Boolean) ?? [];

    return NextResponse.json({
      ok: true,
      title: meta.data.properties?.title,
      sheets: titles,
    });
  } catch (err: any) {
    console.error("❌ Error in test-sheets:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || String(err) },
      { status: 500 }
    );
  }
}

