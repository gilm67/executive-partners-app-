// app/api/jobs/list/route.ts
import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

/**
 * Returns active jobs by trying 3 strategies:
 *  1) sets: jobs:ids / jobs:index / jobs:all
 *  2) SCAN jobs:<id> hashes
 *  3) SCAN jobs:by-slug:* -> resolve id -> HGETALL
 */
type Job = Record<string, string>;

function normalize(raw: Job | null): Job | null {
  if (!raw) return null;
  if (raw.active === "false") return null;
  if (!raw.title || !raw.slug) return null;
  return raw;
}

export async function GET() {
  try {
    const redis = await getRedis();

    // 1) Known sets
    for (const key of ["jobs:ids", "jobs:index", "jobs:all"]) {
      try {
        const ids = await redis.sMembers(key);
        if (ids?.length) {
          const jobs: Job[] = [];
          for (const id of ids) {
            const j = await redis.hGetAll(String(id));
            const n = normalize(j as Job);
            if (n) jobs.push(n);
          }
          if (jobs.length) {
            return NextResponse.json({ ok: true, jobs });
          }
        }
      } catch {}
    }

    // 2) Scan jobs:<id>
    try {
      // @ts-ignore upstash supports scanIterator
      const it = redis.scanIterator({ match: "jobs:*" });
      const jobs: Job[] = [];
      for await (const key of it as AsyncIterable<string>) {
        if (/^jobs:\d+/.test(key)) {
          const j = await redis.hGetAll(key);
          const n = normalize(j as Job);
          if (n) jobs.push(n);
        }
      }
      if (jobs.length) {
        return NextResponse.json({ ok: true, jobs });
      }
    } catch {}

    // 3) Follow slug indexes
    try {
      // @ts-ignore
      const it = redis.scanIterator({ match: "jobs:by-slug:*" });
      const jobs: Job[] = [];
      for await (const bySlug of it as AsyncIterable<string>) {
        const id = await redis.get(bySlug);
        if (!id) continue;
        const j = await redis.hGetAll(String(id));
        const n = normalize(j as Job);
        if (n) jobs.push(n);
      }
      return NextResponse.json({ ok: true, jobs });
    } catch {}

    return NextResponse.json({ ok: true, jobs: [] });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}