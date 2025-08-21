/* app/api/test-sheets/route.ts */
import { NextResponse } from "next/server";
import { getSheetsClient } from "@/lib/google";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { sheets, sheetId } = getSheetsClient();
    const r = await sheets.spreadsheets.get({ spreadsheetId: sheetId });

    return NextResponse.json({
      ok: true,
      title: r.data.properties?.title,
      sheets: (r.data.sheets || []).map(s => s.properties?.title),
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message, stack: err.stack },
      { status: 500 }
    );
  }
}
