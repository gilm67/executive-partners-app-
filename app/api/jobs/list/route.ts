// app/api/jobs/list/route.ts
import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

type JobOut = {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  location?: string;
  market?: string;
  seniority?: string;
  active?: string; // "true" | "false"
};

export async function GET() {
  try {
    const redis = await getRedis();

    // Prefer the curated index if it exists
    let ids: string[] = [];
    try {
      ids = await redis.smembers("jobs:index");
    } catch {
      ids = [];
    }

    // If no index, scan keys as a fallback (non-fatal)
    if (!ids.length) {
      try {
        let cursor = "0";
        const found: string[] = [];
        do {
          const res = await redis.scan(cursor, { match: "job:*", count: 200 });
          cursor = res.cursor;
          if (Array.isArray(res.keys)) found.push(...res.keys);
        } while (cursor !== "0");
        ids = found;
      } catch {
        // ignore scan failure; we’ll just return []
      }
    }

    const jobs: JobOut[] = [];
    for (const id of ids) {
      try {
        const h = await redis.hgetall(id);
        if (!h || !h.slug || !h.title) continue;
        // keep inactive out of the public list
        if (h.active === "false") continue;

        jobs.push({
          id,
          slug: String(h.slug),
          title: String(h.title),
          summary: h.summary ? String(h.summary) : undefined,
          location: h.location ? String(h.location) : undefined,
          market: h.market ? String(h.market) : undefined,
          seniority: h.seniority ? String(h.seniority) : undefined,
          active: h.active ? String(h.active) : undefined,
        });
      } catch {
        // skip bad hash
      }
    }

    return NextResponse.json({ ok: true, jobs });
  } catch (err: any) {
    // Never 500 — return a clean, empty list
    return NextResponse.json({ ok: true, jobs: [], note: "list fallback", detail: err?.message ?? "" });
  }
}