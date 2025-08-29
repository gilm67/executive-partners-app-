import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") || "";

  if (!slug) {
    return NextResponse.json({ ok: false, error: "Missing slug" }, { status: 400 });
    }
  try {
    const upstream = await fetch(
      `https://jobs.execpartners.ch/api/jobs/get?slug=${encodeURIComponent(slug)}`,
      { cache: "no-store", next: { revalidate: 0 } }
    );

    if (!upstream.ok) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }

    const data = await upstream.json().catch(() => null);
    if (data?.ok && data?.job) {
      return NextResponse.json({ ok: true, job: data.job }, { status: 200 });
    }
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message }, { status: 500 });
  }
}
