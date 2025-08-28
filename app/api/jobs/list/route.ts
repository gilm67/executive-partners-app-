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

function normalize(raw: Record<string, string> | null): Job | null {
  if (!raw) return null;
  // Only list active jobs
  if (raw.active === "false") return null;
  // Require title & slug
  if (!raw.title || !raw.slug) return null;

  const j: Job = {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    location: raw.location,
    market: raw.market,
    seniority: raw.seniority,
    summary: raw.summary,
    description: raw.description,
    active: raw.active,
  };
  return j;
}

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

export async function GET(req: Request) {
  try {
    // 1) Prefer proxying to your dedicated jobs host, if configured and different from current host.
    const API_BASE = process.env.NEXT_PUBLIC_JOBS_API_BASE?.replace(/\/$/, "");
    if (API_BASE) {
      try {
        const targetHost = new URL(API_BASE).host.toLowerCase();
        const currentHost = new URL(req.url).host.toLowerCase();
        if (targetHost && targetHost !== currentHost) {
          const r = await fetch(`${API_BASE}/api/jobs/list`, { next: { revalidate: 10 } });
          const data = await r.json().catch(() => null);
          if (data) return NextResponse.json(data, { status: r.status });
        }
      } catch {
        // if proxy fails, fall through to Redis scan
      }
    }

    // 2) Direct Redis scan (works on jobs.execpartners.ch and as fallback)
    const redis = await getRedis();

    // 2a) If you ever populate sets, try them first (cheap)
    const sets = ["jobs:ids", "jobs:index", "jobs:all"];
    for (const setKey of sets) {
      try {
        const ids = await redis.sMembers(setKey);
        if (ids?.length) {
          const out: Job[] = [];
          for (const id of ids) {
            const raw = await redis.hGetAll(String(id));
            const j = normalize(raw);
            if (j) {
              j.id = String(id);
              out.push(j);
            }
          }
          if (out.length) return NextResponse.json({ ok: true, jobs: out });
        }
      } catch {
        // ignore
      }
    }

    // 2b) Your hashes are named "job:<timestamp>:<rand>" (no "s"), so scan "job:*"
    try {
      // @ts-ignore Upstash client supports scanIterator
      const it = redis.scanIterator({ match: "job:*" });
      const keys: string[] = [];
      for await (const key of it as AsyncIterable<string>) {
        // Optionally validate with a stricter pattern:
        // if (/^job:\d+:[a-z0-9]+$/i.test(key)) keys.push(key);
        keys.push(key);
      }
      if (keys.length) {
        const out: Job[] = [];
        for (const key of keys) {
          const raw = await redis.hGetAll(key);
          const j = normalize(raw);
          if (j) {
            j.id = key;
            out.push(j);
          }
        }
        if (out.length) return NextResponse.json({ ok: true, jobs: out });
      }
    } catch {
      // ignore
    }

    // 2c) Fallback: slug index -> ID -> hash
    try {
      // @ts-ignore
      const it = redis.scanIterator({ match: "jobs:by-slug:*" });
      const out: Job[] = [];
      for await (const bySlugKey of it as AsyncIterable<string>) {
        const id = await redis.get(bySlugKey);
        if (!id) continue;
        const raw = await redis.hGetAll(String(id));
        const j = normalize(raw);
        if (j) {
          j.id = String(id);
          out.push(j);
        }
      }
      return NextResponse.json({ ok: true, jobs: out });
    } catch {
      // ignore
    }

    // No jobs found
    return NextResponse.json({ ok: true, jobs: [] });
  } catch (err) {
    console.error("jobs/list error", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}