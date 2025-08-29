// app/api/jobs/list/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
  active?: string; // "true"/"false"
};

export async function GET() {
  try {
    const redis = await getRedis();

    // Prefer index set
    let ids: string[] = [];
    try {
      const members = await redis.smembers("jobs:index");
      if (Array.isArray(members)) ids = members;
    } catch {
      ids = [];
    }

    // Fallback: SCAN job:* keys
    if (!ids.length) {
      const found: string[] = [];
      let cursor = "0";
      do {
        const [next, keys] = (await redis.scan(cursor, {
          match: "job:*",
          count: 200,
        })) as unknown as [string, string[]];

        cursor = next || "0";
        if (Array.isArray(keys) && keys.length) found.push(...keys);
      } while (cursor !== "0");
      ids = found;
    }

    const out: JobOut[] = [];
    for (const id of ids) {
      try {
        const h = (await redis.hgetall(id)) as Record<string, string> | null;
        if (!h) continue;
        if (h.active === "false") continue;
        if (!h.slug || !h.title) continue;

        out.push({
          id,
          slug: h.slug,
          title: h.title,
          summary: h.summary,
          location: h.location,
          market: h.market,
          seniority: h.seniority,
          active: h.active,
        });
      } catch {
        // skip bad hash
      }
    }

    out.sort((a, b) => (a.id > b.id ? -1 : 1));
    return NextResponse.json({ ok: true, jobs: out });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}