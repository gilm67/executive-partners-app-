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

export async function GET() {
  try {
    const redis = await getRedis();

    // 1) Try known ID sets first (fast path)
    for (const key of ["jobs:ids", "jobs:index", "jobs:all"]) {
      try {
        const ids = await redis.sMembers(key);
        if (ids?.length) {
          const jobs: Job[] = [];
          for (const id of ids) {
            const j = (await redis.hGetAll(String(id))) as Job;
            const n = normalize(j);
            if (n) jobs.push(n);
          }
          if (jobs.length) return NextResponse.json({ ok: true, jobs });
        }
      } catch {
        /* ignore and continue */
      }
    }

    // 2) Scan for job hashes using scanIterator (Upstash supports this)
    const jobsFromHashes: Job[] = [];

    // @ts-ignore - upstash client provides scanIterator
    const it = redis.scanIterator({ match: "job:*", count: 200 });
    for await (const key of it as AsyncIterable<string>) {
      // Accept typical job hash keys: job:<ts>:<rand> or job:<id>
      if (/^job:/.test(key)) {
        const j = (await redis.hGetAll(key)) as Job;
        const n = normalize(j);
        if (n) jobsFromHashes.push(n);
      }
    }

    // Also support plural prefix "jobs:*" (some older writes used that)
    // @ts-ignore
    const it2 = redis.scanIterator({ match: "jobs:*", count: 200 });
    for await (const key of it2 as AsyncIterable<string>) {
      // Heuristic: include hashes that look like jobs:<number> or jobs:<ts>:<rand>
      if (/^jobs:\d+/.test(key) || /^jobs:\d+:/.test(key)) {
        const j = (await redis.hGetAll(key)) as Job;
        const n = normalize(j);
        if (n) jobsFromHashes.push(n);
      }
    }

    if (jobsFromHashes.length) {
      return NextResponse.json({ ok: true, jobs: jobsFromHashes });
    }

    // 3) Last resort: follow slug index -> id -> hash
    // @ts-ignore
    const slugIt = redis.scanIterator({ match: "jobs:by-slug:*", count: 200 });
    const viaSlug: Job[] = [];
    for await (const bySlugKey of slugIt as AsyncIterable<string>) {
      const id = await redis.get(bySlugKey);
      if (!id) continue;
      const j = (await redis.hGetAll(String(id))) as Job;
      const n = normalize(j);
      if (n) viaSlug.push(n);
    }

    return NextResponse.json({ ok: true, jobs: viaSlug });
  } catch (e) {
    // Never throw raw errors to client
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}