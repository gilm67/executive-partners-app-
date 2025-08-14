export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// app/api/test-sheets/route.ts
import { NextResponse } from "next/server";
import { google } from "googleapis";
import { getSheetsAuth, getCandidates, getJobs } from "@/lib/sheets";

export const runtime = "nodejs";

export async function GET() {
  try {
    // Check env presence first
    const sheetId = process.env.GOOGLE_SHEET_ID || "";
    if (!sheetId) throw new Error("GOOGLE_SHEET_ID missing");

    // 1) List tabs to confirm access works
    const auth = getSheetsAuth();
    const sheets = google.sheets({ version: "v4", auth });
    const meta = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
    const tabs =
      meta.data.sheets?.map(s => s.properties?.title || "(untitled)") || [];

    // 2) Try reading your helpers (counts are a nice sanity check)
    const [candidates, jobs] = await Promise.all([
      getCandidates().catch(() => []),
      getJobs().catch(() => []),
    ]);

    return NextResponse.json({
      ok: true,
      sheetIdSet: !!sheetId,
      tabs,
      counts: { candidates: candidates.length, jobs: jobs.length },
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || String(err) },
      { status: 500 }
    );
  }
}


