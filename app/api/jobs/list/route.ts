// app/api/jobs/list/route.ts
import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

type Job = {
  id?: string;
  slug?: string;
  title?: string;
  location?: string;
  market?: string;
  seniority?: string;
  summary?: string;
  description?: string;
  active?: string; // "true" | "false"
};

function normalize(raw: Record<string, string>): Job | null {
  if (!raw) return null;
  // only show active jobs
  if (raw.active === "false") return null;
  // require basics
  if (!raw.title || !raw.slug) return null;
  // return small public shape
  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    location: raw.location,
    market: raw.market,
    seniority: raw.seniority,
    summary: raw.summary,
    active: raw.active,
  };
}

export async function GET() {
  try {
    const redis = await getRedis();

    // Strategy 1: Known ID sets
    for (const key of ["jobs:ids", "jobs:index", "jobs:all"]) {
      try {
        const ids = await redis.sMembers(key);
        if (ids?.length) {
          const jobs: Job[] = [];
          for (const id of ids) {
            const h = await redis.hGetAll(String(id));
            const norm = normalize(h);
            if (norm) jobs.push(norm);
          }
          if (jobs.length) {
            return NextResponse.json({ ok: true, jobs });
          }
        }
      } catch {
        // ignore and fall through
      }
    }

    // Strategy 2: Scan for hash keys like jobs:<id>
    try {
      // @ts-ignore upstash has scanIterator
      const it = redis.scanIterator({ match: "jobs:*" });
      const jobs: Job[] = [];
      for await (const key of it as AsyncIterable<string>) {
        if (/^jobs:\d+/.test(key)) {
          const h = await redis.hGetAll(key);
          const norm = normalize(h);
          if (norm) jobs.push(norm);
        }
      }
      if (jobs.length) {
        return NextResponse.json({ ok: true, jobs });
      }
    } catch {
      // ignore
    }

    // Strategy 3: Follow slug index jobs:by-slug:*
    try {
      // @ts-ignore
      const it = redis.scanIterator({ match: "jobs:by-slug:*" });
      const jobs: Job[] = [];
      for await (const bySlugKey of it as AsyncIterable<string>) {
        const id = await redis.get(bySlugKey);
        if (!id) continue;
        const h = await redis.hGetAll(String(id));
        const norm = normalize(h);
        if (norm) jobs.push(norm);
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
    console.error("jobs/list error", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}