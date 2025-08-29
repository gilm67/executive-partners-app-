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
  active?: string; // "true"/"false"
};

export async function GET() {
  try {
    const redis = await getRedis();

    // 1) Try the fast set-based index first
    let ids: string[] = [];
    try {
      const members = await redis.smembers("jobs:index");
      if (Array.isArray(members)) ids = members;
    } catch {
      ids = [];
    }

    // 2) Fallback: SCAN Redis for stored job hashes
    if (!ids.length) {
      const found: string[] = [];
      let cursor = "0";
      do {
        // IMPORTANT: scan returns a tuple: [nextCursor, keys[]]
        const [next, keys] = (await redis.scan(cursor, {
          match: "job:*",
          count: 200,
        })) as unknown as [string, string[]];

        cursor = next || "0";
        if (Array.isArray(keys) && keys.length) found.push(...keys);
      } while (cursor !== "0");

      ids = found;
    }

    // 3) Read each job hash and build output
    const out: JobOut[] = [];
    for (const id of ids) {
      try {
        const h = (await redis.hgetall(id)) as Record<string, string> | null;
        if (!h) continue;

        // Skip if explicitly inactive
        if (h.active === "false") continue;

        // Require minimum fields to show on list
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
        // ignore a single bad hash
      }
    }

    // Optional: sort newest-first if you encode a timestamp in the id
    out.sort((a, b) => (a.id > b.id ? -1 : 1));

    return NextResponse.json({ ok: true, jobs: out });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}