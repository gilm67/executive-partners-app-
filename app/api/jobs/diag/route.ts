import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const r = await fetch("https://jobs.execpartners.ch/api/jobs/list", {
      cache: "no-store",
      next: { revalidate: 0 },
    });
    const upstreamOk = r.ok;
    return NextResponse.json({ ok: true, msg: "jobs diag alive", upstreamOk }, { status: 200 });
  } catch {
    // still return ok:true so this endpoint never blocks the pages
    return NextResponse.json({ ok: true, msg: "jobs diag alive", upstreamOk: false }, { status: 200 });
  }
}
