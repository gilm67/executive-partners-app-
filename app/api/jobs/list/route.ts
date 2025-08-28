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
  // Require at least title + slug
  if (!raw.title || !raw.slug) return null;

  // Attach the redis key as id if missing
  const j: Job = {
    id: raw.id, // may be empty; we’ll set later from the key we used
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

export async function GET() {
  try {
    const redis = await getRedis();

    // 1) Try well-known sets of IDs (if you ever add them)
    const setKeys = ["jobs:ids", "jobs:index", "jobs:all"];
    for (const setKey of setKeys) {
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
          if (out.length) {
            return NextResponse.json({ ok: true, jobs: out });
          }
        }
      } catch {
        // ignore and try next
      }
    }

    // 2) Scan for actual job hashes.
    // Your created hashes look like "job:<timestamp>:<rand>" (no 's'), so scan "job:*"
    try {
      // @ts-ignore upstash supports scanIterator
      const it = redis.scanIterator({ match: "job:*" });
      const foundKeys: string[] = [];
      for await (const key of it as AsyncIterable<string>) {
        // Heuristic: only include hashes whose name starts with "job:" (already matched)
        // You can tighten further with: /^job:\d+:[a-z0-9]+$/i.test(key)
        foundKeys.push(key);
      }
      if (foundKeys.length) {
        const out: Job[] = [];
        for (const key of foundKeys) {
          const raw = await redis.hGetAll(key);
          const j = normalize(raw);
          if (j) {
            j.id = key;
            out.push(j);
          }
        }
        if (out.length) {
          return NextResponse.json({ ok: true, jobs: out });
        }
      }
    } catch {
      // ignore; fall through
    }

    // 3) Fallback via slug index: jobs:by-slug:* -> ID -> HGETALL
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

    return NextResponse.json({ ok: true, jobs: [] });
  } catch (err) {
    console.error("jobs/list error", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}