// app/api/jobs/list/route.ts
import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

type Job = Record<string, string>;

export const runtime = "nodejs";

function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });
}

async function scanAll(redis: any, pattern: string, count = 500): Promise<string[]> {
  const keys: string[] = [];
  let cursor: string = "0";
  try {
    do {
      const res = await redis.scan(cursor, { match: pattern, count });
      const next = Array.isArray(res) ? String(res[0]) : "0";
      const batch = Array.isArray(res) ? (res[1] as string[]) : [];
      keys.push(...batch);
      cursor = next;
    } while (cursor !== "0");
  } catch (e) {
    console.error("scanAll error for", pattern, e);
  }
  return keys;
}

export async function GET() {
  try {
    const redis = await getRedis();

    const normalize = (raw: Job | null): Job | null => {
      if (!raw) return null;
      if (raw.active === "false") return null;
      if (!raw.title || !raw.slug) return null;
      return raw;
    };

    let jobs: Job[] = [];

    // Try index set first
    let ids: string[] = [];
    try {
      ids = await redis.sMembers("jobs:index");
    } catch {
      ids = [];
    }

    if (ids?.length) {
      for (const id of ids) {
        const j = await redis.hGetAll(id);
        const norm = normalize((j as unknown) as Job);
        if (norm) jobs.push(norm);
      }
    } else {
      // Fallback: scan job:* and jobs:by-slug:*
      const jobKeys = await scanAll(redis, "job:*");
      for (const key of jobKeys) {
        const j = await redis.hGetAll(key);
        const norm = normalize((j as unknown) as Job);
        if (norm) jobs.push(norm);
      }

      const slugKeys = await scanAll(redis, "jobs:by-slug:*");
      for (const bySlugKey of slugKeys) {
        const id = await redis.get(bySlugKey);
        if (!id) continue;
        const j = await redis.hGetAll(String(id));
        const norm = normalize((j as unknown) as Job);
        if (norm) jobs.push(norm);
      }

      // De-dupe by slug
      const seen = new Set<string>();
      jobs = jobs.filter((j) => {
        const s = j.slug;
        if (!s || seen.has(s)) return false;
        seen.add(s);
        return true;
      });

      // Best-effort: repopulate jobs:index with IDs we know
      const idsToAdd: string[] = [];
      for (const j of jobs) {
        if (j.id) idsToAdd.push(String(j.id));
      }
      if (idsToAdd.length) {
        try {
          await redis.sAdd("jobs:index", ...idsToAdd);
        } catch {}
      }
    }

    const list = jobs.map((j) => ({
      id: j.id ?? "",
      slug: j.slug ?? "",
      title: j.title ?? "",
      location: j.location ?? "",
      market: j.market ?? "",
      seniority: j.seniority ?? "",
      summary: j.summary ?? "",
      active: j.active ?? "true",
    }));

    return json({ ok: true, jobs: list });
  } catch (err) {
    console.error("jobs/list fatal:", err);
    return json({ ok: false, error: "Server error" }, 500);
  }
}