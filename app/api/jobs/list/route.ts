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

function normalize(raw: Record<string, string> | null, key?: string): Job | null {
  if (!raw) return null;
  if (raw.active === "false") return null; // show only active (or missing)
  if (!raw.title || !raw.slug) return null;
  return {
    id: raw.id ?? key,
    slug: raw.slug,
    title: raw.title,
    location: raw.location,
    market: raw.market,
    seniority: raw.seniority,
    summary: raw.summary,
    description: raw.description,
    active: raw.active,
  };
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
    // 1) Try proxying to the dedicated jobs host if configured and different from current host
    try {
      const apiBase = process.env.NEXT_PUBLIC_JOBS_API_BASE?.replace(/\/$/, "");
      if (apiBase) {
        const targetHost = new URL(apiBase).host.toLowerCase();
        const currentHost = new URL(req.url).host.toLowerCase();
        if (targetHost && targetHost !== currentHost) {
          const r = await fetch(`${apiBase}/api/jobs/list`, { cache: "no-store" });
          const data = await r.json().catch(() => null);
          if (data) return NextResponse.json(data, { status: r.status });
        }
      }
    } catch {
      // fall through to Redis scan
    }

    // 2) Direct Redis lookup
    const redis = await getRedis();

    // 2a) Try known sets first
    for (const setKey of ["jobs:ids", "jobs:index", "jobs:all"]) {
      try {
        const ids = await redis.sMembers(setKey);
        if (ids?.length) {
          const out: Job[] = [];
          for (const id of ids) {
            const raw = await redis.hGetAll(String(id));
            const j = normalize(raw, String(id));
            if (j) out.push(j);
          }
          if (out.length) return NextResponse.json({ ok: true, jobs: out });
        }
      } catch {}
    }

    // 2b) SCAN loop over job:* (your keys look like job:TIMESTAMP:RAND)
    const outScan: Job[] = [];
    try {
      let cursor = "0";
      do {
        const res = await redis.scan(cursor, { match: "job:*", count: 1000 } as any);
        // Upstash returns [nextCursor, keys[]]
        // @ts-ignore
        cursor = res[0] ?? "0";
        // @ts-ignore
        const keys: string[] = res[1] ?? [];
        for (const key of keys) {
          const raw = await redis.hGetAll(key);
          const j = normalize(raw, key);
          if (j) outScan.push(j);
        }
      } while (cursor !== "0");

      if (outScan.length) return NextResponse.json({ ok: true, jobs: outScan });
    } catch {
      // continue
    }

    // 2c) Fallback: slug index
    try {
      let cursor = "0";
      const slugMatches: string[] = [];
      do {
        const res = await redis.scan(cursor, { match: "jobs:by-slug:*", count: 1000 } as any);
        // @ts-ignore
        cursor = res[0] ?? "0";
        // @ts-ignore
        const keys: string[] = res[1] ?? [];
        slugMatches.push(...keys);
      } while (cursor !== "0");

      const outFromSlug: Job[] = [];
      for (const bySlugKey of slugMatches) {
        const id = await redis.get(bySlugKey);
        if (!id) continue;
        const raw = await redis.hGetAll(String(id));
        const j = normalize(raw, String(id));
        if (j) outFromSlug.push(j);
      }
      return NextResponse.json({ ok: true, jobs: outFromSlug });
    } catch {}

    // Nothing found
    return NextResponse.json({ ok: true, jobs: [] });
  } catch (err) {
    console.error("jobs/list error", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}