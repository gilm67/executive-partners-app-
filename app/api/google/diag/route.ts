// app/api/google/diag/route.ts
import { NextResponse } from "next/server";
import { getSheetsClient, googleEnvHealth } from "@/lib/google";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const env = googleEnvHealth();
  try {
    const { sheets, sheetId } = getSheetsClient();
    const r = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "A1:A1", // read first cell of the first sheet
    });
    return NextResponse.json({ ok: true, env, sheetId, a1: r.data.values || [] });
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        env,
        error: err?.message || String(err),
        stack: err?.stack || null,
      },
      { status: 500 }
    );
  }
}
