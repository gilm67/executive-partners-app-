// app/api/jobs/list/route.ts
import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

type RawJob = Record<string, string>;

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

function isActive(v: string | undefined) {
  // default to true if missing, but respect explicit "false"
  return v !== "false";
}

function normalize(id: string, raw: RawJob): Job | null {
  if (!raw) return null;
  if (!isActive(raw.active)) return null;
  if (!raw.title || !raw.slug) return null;
  return { id, ...(raw as unknown as Job) };
}

async function fetchFromIdSets(redis: any): Promise<Job[] | null> {
  for (const key of ["jobs:ids", "jobs:index", "jobs:all"]) {
    try {
      const ids: string[] = await redis.sMembers(key);
      if (ids && ids.length) {
        const out: Job[] = [];
        for (const id of ids) {
          const raw = await redis.hGetAll(String(id));
          const j = normalize(String(id), raw);
          if (j) out.push(j);
        }
        if (out.length) return out;
      }
    } catch {
      // try next strategy
    }
  }
  return null;
}

async function fetchByScan(redis: any): Promise<Job[] | null> {
  try {
    // Upstash supports scanIterator
    // We look for *singular* job:* because your IDs look like "job:1756386694812:siwf4f"
    // (not "jobs:*")
    // @ts-ignore
    const it = redis.scanIterator({ match: "job:*" });
    const out: Job[] = [];
    for await (const key of it as AsyncIterable<string>) {
      // Loose check: any key starting with "job:" is treated as a job hash
      if (!key.toLowerCase().startsWith("job:")) continue;
      const raw = await redis.hGetAll(key);
      const j = normalize(key, raw);
      if (j) out.push(j);
    }
    return out.length ? out : null;
  } catch {
    return null;
  }
}

async function fetchViaSlugIndex(redis: any): Promise<Job[] | null> {
  try {
    // @ts-ignore
    const it = redis.scanIterator({ match: "jobs:by-slug:*" });
    const out: Job[] = [];
    for await (const bySlugKey of it as AsyncIterable<string>) {
      const id = await redis.get(bySlugKey);
      if (!id) continue;
      const raw = await redis.hGetAll(String(id));
      const j = normalize(String(id), raw);
      if (j) out.push(j);
    }
    return out.length ? out : null;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const redis = await getRedis();

    // 1) Try known ID sets
    const fromSets = await fetchFromIdSets(redis);
    if (fromSets && fromSets.length) {
      return NextResponse.json({ ok: true, jobs: fromSets });
    }

    // 2) Scan for job:* hashes
    const fromScan = await fetchByScan(redis);
    if (fromScan && fromScan.length) {
      return NextResponse.json({ ok: true, jobs: fromScan });
    }

    // 3) Fallback via slug index
    const fromSlugIdx = await fetchViaSlugIndex(redis);
    return NextResponse.json({ ok: true, jobs: fromSlugIdx ?? [] });
  } catch (err) {
    console.error("jobs/list error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}