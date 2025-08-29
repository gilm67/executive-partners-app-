export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

type JobItem = {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  location?: string;
  market?: string;
  seniority?: string;
  active?: string;
};

export async function GET() {
  try {
    const redis = await getRedis();

    // Try the set index first for speed.
    let ids: string[] = [];
    try {
      const s = await redis.smembers("jobs:index");
      if (Array.isArray(s) && s.length) ids = s;
    } catch {}

    // Fallback: SCAN Redis keys if the index is missing/empty.
    if (!ids.length) {
      let cursor = "0";
      const found: string[] = [];
      do {
        const [next, keys] = await (redis as any).scan(cursor, { match: "job:*", count: 200 });
        cursor = next || "0";
        if (Array.isArray(keys) && keys.length) {
          for (const k of keys) if (typeof k === "string" && k.startsWith("job:")) found.push(k);
        }
      } while (cursor !== "0");
      ids = found;
    }

    const jobs: JobItem[] = [];
    for (const id of ids) {
      try {
        const h = await redis.hgetall(id);
        if (!h || !h.slug || !h.title) continue;
        jobs.push({
          id,
          slug: h.slug,
          title: h.title,
          summary: h.summary,
          location: h.location,
          market: h.market,
          seniority: h.seniority,
          active: h.active,
        });
      } catch {}
    }

    // Sort newest first by ID timestamp if present
    jobs.sort((a, b) => (a.id > b.id ? -1 : 1));

    return NextResponse.json({ ok: true, jobs });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Server error" }, { status: 500 });
  }
}