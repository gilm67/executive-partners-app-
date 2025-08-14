// app/api/test-sheets/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { google } from "googleapis";
import { getSheetsAuth, getCandidates, getJobs } from "@/lib/sheets";

export async function GET() {
  try {
    const sheetId = process.env.GOOGLE_SHEET_ID || "";
    if (!sheetId) {
      return NextResponse.json({ ok: false, error: "GOOGLE_SHEET_ID missing" }, { status: 500 });
    }

    const auth = getSheetsAuth();
    const sheets = google.sheets({ version: "v4", auth });
    const meta = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
    const tabs =
      meta.data.sheets?.map((s) => s.properties?.title || "(untitled)") ?? [];

    const sampleCandidates = (await getCandidates()).slice(0, 1);
    const sampleJobs = (await getJobs()).slice(0, 1);

    return NextResponse.json({
      ok: true,
      tabs,
      sampleCandidates,
      sampleJobs,
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || String(err) },
      { status: 500 }
    );
  }
}

