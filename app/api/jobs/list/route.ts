// app/api/jobs/list/route.ts
import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

type Job = Record<string, string>;

function normalize(raw: Job | null): Job | null {
  if (!raw) return null;
  if (raw.active === "false") return null;
  if (!raw.title || !raw.slug) return null;
  return raw;
}

async function scanKeys(redis: ReturnType<typeof getRedis> extends Promise<infer T> ? T : never, pattern: string) {
  // Upstash supports SCAN. We'll iterate cursor until 0.
  let cursor = 0;
  const keys: string[] = [];
  do {
    // @ts-ignore upstash returns [cursor, keys]
    const [next, batch] = await redis.scan(cursor, { match: pattern, count: 200 });
    cursor = Number(next);
    if (Array.isArray(batch)) keys.push(...batch);
  } while (cursor !== 0);
  return keys;
}

export async function GET() {
  try {
    const redis = await getRedis();

    // 1) Known sets first
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
          if (jobs.length) return NextResponse.json({ ok: true, jobs });
        }
      } catch {}
    }

    // 2) Scan hash keys jobs:<id>
    try {
      const keys = await scanKeys(redis, "jobs:*");
      const jobs: Job[] = [];
      for (const k of keys) {
        // only bare hashes like jobs:<timestamp>:<rand> or jobs:<number>
        if (/^jobs:(\d|[0-9]{4,})/.test(k)) {
          const j = await redis.hGetAll(k);
          const n = normalize(j as Job);
          if (n) jobs.push(n);
        }
      }
      if (jobs.length) return NextResponse.json({ ok: true, jobs });
    } catch {}

    // 3) Follow slug indexes jobs:by-slug:*
    try {
      const bySlug = await scanKeys(redis, "jobs:by-slug:*");
      const jobs: Job[] = [];
      for (const idxKey of bySlug) {
        const id = await redis.get(idxKey);
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