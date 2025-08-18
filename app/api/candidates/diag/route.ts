import { NextResponse } from "next/server";
import { getCandidates } from "@/lib/sheets"; // adjust if not using path aliases

export const runtime = "nodejs";

export async function GET() {
  try {
    const candidates = await getCandidates();
    return NextResponse.json({
      ok: true,
      count: candidates.length,
      sample: candidates[0] || null,
    });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err.message || err) });
  }
}