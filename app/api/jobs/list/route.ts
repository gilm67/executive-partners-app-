import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // no static caching
export const revalidate = 0;

export async function GET() {
  try {
    const upstream = await fetch("https://jobs.execpartners.ch/api/jobs/list", {
      // always fresh
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!upstream.ok) {
      return NextResponse.json({ ok: false, jobs: [] }, { status: 200 });
    }

    const data = await upstream.json().catch(() => null);
    const jobs = Array.isArray(data?.jobs) ? data.jobs : [];
    return NextResponse.json({ ok: true, jobs }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ ok: false, jobs: [], error: err?.message }, { status: 200 });
  }
}
