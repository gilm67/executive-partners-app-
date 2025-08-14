import { NextResponse } from "next/server";
import { getJobs, getJobByIdOrSlug } from "@/lib/sheets";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const job = await getJobByIdOrSlug(id);
      return NextResponse.json({ ok: true, by: "id", id, job });
    } else {
      const jobs = await getJobs();
      return NextResponse.json({ ok: true, count: jobs.length, first: jobs[0] ?? null });
    }
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
