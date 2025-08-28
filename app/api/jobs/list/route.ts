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
  createdAt?: string;
};

function normalize(raw: Record<string, string>): Job | null {
  if (!raw) return null;
  // only list active
  if (raw.active === "false") return null;
  if (!raw.title || !raw.slug) return null;
  return raw as unknown as Job;
}

async function loadAllJobs(redis: ReturnType<typeof getRedis> extends Promise<infer R> ? R : never): Promise<Job[]> {
  // Strategy 1: known ID sets
  for (const key of ["jobs:ids", "jobs:index", "jobs:all"]) {
    try {
      const ids = await redis.sMembers(key);
      if (ids?.length) {
        const out: Job[] = [];
        for (const id of ids) {
          const j = await redis.hGetAll(String(id));
          const norm = normalize(j);
          if (norm) out.push(norm);
        }
        if (out.length) return out;
      }
    } catch {}
  }

  // Strategy 2: SCAN jobs:<id> hashes
  try {
    // @ts-ignore upstash has scanIterator
    const it = redis.scanIterator({ match: "jobs:*" });
    const out: Job[] = [];
    for await (const key of it as AsyncIterable<string>) {
      if (/^jobs:\d+/.test(key)) {
        const j = await redis.hGetAll(key);
        const norm = normalize(j);
        if (norm) out.push(norm);
      }
    }
    if (out.length) return out;
  } catch {}

  // Strategy 3: follow slug index → ID → HGETALL
  try {
    // @ts-ignore
    const it = redis.scanIterator({ match: "jobs:by-slug:*" });
    const out: Job[] = [];
    for await (const bySlug of it as AsyncIterable<string>) {
      const id = await redis.get(bySlug);
      if (!id) continue;
      const j = await redis.hGetAll(String(id));
      const norm = normalize(j);
      if (norm) out.push(norm);
    }
    if (out.length) return out;
  } catch {}

  return [];
}

export async function GET() {
  try {
    const redis = await getRedis();
    const jobs = await loadAllJobs(redis);

    // sort newest first if createdAt exists; otherwise by slug
    jobs.sort((a, b) => {
      const ad = a.createdAt ? Date.parse(a.createdAt) : 0;
      const bd = b.createdAt ? Date.parse(b.createdAt) : 0;
      if (ad !== bd) return bd - ad;
      return (a.slug || "").localeCompare(b.slug || "");
    });

    // Only expose safe fields
    const safe = jobs.map((j) => ({
      id: j.id,
      slug: j.slug,
      title: j.title,
      location: j.location,
      market: j.market,
      seniority: j.seniority,
      summary: j.summary,
      active: j.active,
    }));

    return NextResponse.json({ ok: true, jobs: safe });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}