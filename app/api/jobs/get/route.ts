// app/api/jobs/get/route.ts
import { NextResponse } from "next/server";

const BASE = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function kvGet<T = any>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    cache: "no-store",
  });
  return res.json();
}

export async function GET(req: Request) {
  try {
    if (!BASE || !TOKEN) {
      return NextResponse.json({ ok: false, error: "KV not configured" }, { status: 500 });
    }

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug") || "";
    if (!slug) return NextResponse.json({ ok: false, error: "Missing slug" }, { status: 400 });

    const h = await kvGet<{ result: string[] }>(`/hgetall/job:${encodeURIComponent(slug)}`);
    const arr = Array.isArray(h?.result) ? h.result : [];
    if (!arr.length) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

    const obj: Record<string, string> = {};
    for (let i = 0; i < arr.length; i += 2) obj[arr[i]] = arr[i + 1];

    const job = {
      slug: obj.slug,
      title: obj.title,
      summary: obj.summary,
      location: obj.location,
      market: obj.market,
      seniority: obj.seniority,
      description: obj.description,
      active: obj.active === "true" || obj.active === "1" || obj.active === "yes",
    };

    return NextResponse.json({ ok: true, job });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "get failed" }, { status: 500 });
  }
}