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

function normalize(raw: Record<string, string> | null): Job | null {
  if (!raw) return null;
  // Skip hard-deactivated roles
  if (raw.active === "false") return null;
  // Require minimum fields to list
  if (!raw.slug || !raw.title) return null;
  return raw as unknown as Job;
}

async function fetchAllJobs(): Promise<Job[]> {
  const redis = await getRedis();

  // Strategy 1: known ID sets
  for (const key of ["jobs:index", "jobs:ids", "jobs:all"]) {
    try {
      const ids = await redis.sMembers(key);
      if (ids?.length) {
        const jobs: Job[] = [];
        for (const id of ids) {
          const j = await redis.hGetAll(String(id));
          const n = normalize(j);
          if (n) {
            if (!n.id) n.id = String(id);
            jobs.push(n);
          }
        }
        if (jobs.length) return jobs;
      }
    } catch {
      // continue
    }
  }

  // Strategy 2: scan for jobs:<id> hashes
  try {
    // @ts-ignore upstash supports scanIterator
    const it = (await getRedis()).scanIterator({ match: "jobs:*" });
    const jobs: Job[] = [];
    for await (const key of it as AsyncIterable<string>) {
      if (/^jobs:\d+/.test(key)) {
        const j = await redis.hGetAll(key);
        const n = normalize(j);
        if (n) {
          if (!n.id) n.id = key;
          jobs.push(n);
        }
      }
    }
    if (jobs.length) return jobs;
  } catch {
    // continue
  }

  // Strategy 3: slug index -> id -> HGETALL
  try {
    // @ts-ignore
    const it = (await getRedis()).scanIterator({ match: "jobs:by-slug:*" });
    const jobs: Job[] = [];
    for await (const bySlug of it as AsyncIterable<string>) {
      const id = await redis.get(bySlug);
      if (!id) continue;
      const j = await redis.hGetAll(String(id));
      const n = normalize(j);
      if (n) {
        if (!n.id) n.id = String(id);
        jobs.push(n);
      }
    }
    if (jobs.length) return jobs;
  } catch {
    // continue
  }

  return [];
}

export async function GET() {
  try {
    const jobs = await fetchAllJobs();

    // Optional: stable ordering (newest first if createdAt present; then by title)
    jobs.sort((a, b) => {
      const at = a.createdAt ? Date.parse(a.createdAt) : 0;
      const bt = b.createdAt ? Date.parse(b.createdAt) : 0;
      if (bt !== at) return bt - at;
      return (a.title || "").localeCompare(b.title || "");
    });

    return NextResponse.json({
      ok: true,
      jobs: jobs.map((j) => ({
        id: j.id,
        slug: j.slug,
        title: j.title,
        location: j.location,
        market: j.market,
        seniority: j.seniority,
        summary: j.summary,
        active: j.active, // will be "true" or undefined if never set
      })),
    });
  } catch (err) {
    console.error("jobs/list error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

// CORS preflight (public endpoint)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      Allow: "GET, HEAD, OPTIONS",
      "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}