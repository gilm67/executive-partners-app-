// app/api/jobs/list/route.ts
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

export async function GET() {
  try {
    if (!BASE || !TOKEN) {
      return NextResponse.json({ ok: false, error: "KV not configured" }, { status: 500 });
    }

    // 1) read the active set
    const members = await kvGet<{ result: string[] }>("/smembers/jobs:active");
    const slugs = Array.isArray(members?.result) ? members.result : [];

    if (!slugs.length) return NextResponse.json({ ok: true, jobs: [] });

    // 2) fetch each job hash
    const jobs = await Promise.all(
      slugs.map(async (slug) => {
        const h = await kvGet<{ result: string[] }>(`/hgetall/job:${encodeURIComponent(slug)}`);
        // Upstash REST returns flat array: [field, value, field, value...]
        const arr = Array.isArray(h?.result) ? h.result : [];
        const obj: Record<string, string> = {};
        for (let i = 0; i < arr.length; i += 2) obj[arr[i]] = arr[i + 1];
        // coerce fields
        return {
          slug: obj.slug,
          title: obj.title,
          summary: obj.summary,
          location: obj.location,
          market: obj.market,
          seniority: obj.seniority,
          description: obj.description,
          active: obj.active === "true" || obj.active === "1" || obj.active === "yes",
        };
      })
    );

    // Filter out any malformed entries
    const cleaned = jobs.filter((j) => j && j.slug && j.title);
    return NextResponse.json({ ok: true, jobs: cleaned });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "list failed" }, { status: 500 });
  }
}