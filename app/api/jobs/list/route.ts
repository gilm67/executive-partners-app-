// app/api/jobs/list/route.ts
import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

// Normalize a Redis hash into a Job-like object and filter inactive/malformed ones
function normalize(raw: Record<string, string> | null) {
  if (!raw) return null;
  // only include active (default true if missing)
  if (raw.active === "false") return null;
  // require slug + title for listing
  if (!raw.slug || !raw.title) return null;

  return {
    id: raw.id ?? undefined,
    slug: raw.slug,
    title: raw.title,
    location: raw.location ?? undefined,
    market: raw.market ?? undefined,
    seniority: raw.seniority ?? undefined,
    summary: raw.summary ?? undefined,
    active: raw.active ?? "true",
  };
}

export async function GET() {
  try {
    const redis = await getRedis();

    // Strategy 1: known sets of IDs
    for (const key of ["jobs:ids", "jobs:index", "jobs:all"]) {
      try {
        const ids = await redis.sMembers(key);
        if (ids && ids.length) {
          const out: any[] = [];
          for (const id of ids) {
            const h = await redis.hGetAll(String(id));
            const n = normalize(h);
            if (n) out.push(n);
          }
          if (out.length) {
            return NextResponse.json({ ok: true, jobs: out });
          }
        }
      } catch {
        // ignore and try the next strategy
      }
    }

    // Strategy 2: scan for job hashes like "jobs:<timestamp>:<rand>" OR numeric ids
    try {
      // @ts-ignore upstash supports scanIterator
      const it = redis.scanIterator({ match: "job:*" }); // your create endpoint seems to store hashes with id "job:<...>"
      const jobs: any[] = [];
      for await (const key of it as AsyncIterable<string>) {
        // Heuristic: only fetch hashes, skip by-slug/index keys
        if (key.startsWith("jobs:by-slug:")) continue;
        const h = await redis.hGetAll(key);
        const n = normalize(h);
        if (n) jobs.push(n);
      }
      if (jobs.length) {
        return NextResponse.json({ ok: true, jobs });
      }
    } catch {
      // continue to next
    }

    // Strategy 3: follow slug index → resolve id → HGETALL
    try {
      // @ts-ignore
      const it = redis.scanIterator({ match: "jobs:by-slug:*" });
      const jobs: any[] = [];
      for await (const bySlug of it as AsyncIterable<string>) {
        const id = await redis.get(bySlug);
        if (!id) continue;
        const h = await redis.hGetAll(String(id));
        const n = normalize(h);
        if (n) jobs.push(n);
      }
      if (jobs.length) {
        return NextResponse.json({ ok: true, jobs });
      }
    } catch {
      // ignore
    }

    // Nothing found
    return NextResponse.json({ ok: true, jobs: [] });
  } catch (err) {
    console.error("jobs/list error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
