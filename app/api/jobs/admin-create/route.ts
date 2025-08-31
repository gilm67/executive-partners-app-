// app/api/jobs/admin-create/route.ts
import { NextRequest, NextResponse } from "next/server";

const KV_URL = process.env.KV_REST_API_URL!;
const KV_TOKEN = process.env.KV_REST_API_TOKEN!;
const ADMIN_TOKEN = process.env.JOBS_ADMIN_TOKEN!;

export async function POST(req: NextRequest) {
  try {
    const auth = req.headers.get("x-admin-token");
    if (auth !== ADMIN_TOKEN) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { slug, title, summary, description, location, market, seniority } = body;

    if (!slug || !title) {
      return NextResponse.json({ ok: false, error: "Missing slug or title" }, { status: 400 });
    }

    // helper for encoding
    const enc = (s: string) => encodeURIComponent(s);

    // 1) Write job hash to Upstash
    const hsetUrl = `${KV_URL}/hset/job:${slug}/slug/${slug}/title/${enc(
      title
    )}/summary/${enc(summary || "")}/description/${enc(
      description || ""
    )}/location/${enc(location || "")}/market/${enc(market || "")}/seniority/${enc(
      seniority || ""
    )}/active/true`;

    await fetch(hsetUrl, {
      method: "POST",
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
    });

    // 2) Add slug to active jobs set
    const saddUrl = `${KV_URL}/sadd/jobs:active/${slug}`;
    await fetch(saddUrl, {
      method: "POST",
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
    });

    return NextResponse.json({ ok: true, job: body });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}