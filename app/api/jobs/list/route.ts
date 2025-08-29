// app/api/jobs/list/route.ts
import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

type Job = Record<string, string>;

export const runtime = "nodejs";

function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });
}

export async function GET() {
  try {
    const redis = await getRedis();

    const normalize = (raw: Job | null): Job | null => {
      if (!raw) return null;
      if (raw.active === "false") return null;  // hide deactivated
      if (!raw.title || !raw.slug) return null; // require basics
      return raw;
    };

    let jobs: Job[] = [];
    let ids: string[] = [];

    // Fast path: try the index set
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
      // Self-healing scan
      // @ts-ignore
      for await (const key of redis.scanIterator({ match: "job:*" }) as AsyncIterable<string>) {
        const j = await redis.hGetAll(key);
        const norm = normalize((j as unknown) as Job);
        if (norm) jobs.push(norm);
      }
      // @ts-ignore
      for await (const bySlug of redis.scanIterator({ match: "jobs:by-slug:*" }) as AsyncIterable<string>) {
        const id = await redis.get(bySlug);
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

      // Best-effort: repopulate jobs:index with actual IDs when available
      // Prefer the real stored ID if present; else fall back to the key-like fields we saw
      const idsToAdd: string[] = [];
      for (const j of jobs) {
        if (j.id) idsToAdd.push(String(j.id));
      }
      if (idsToAdd.length) {
        try {
          // @ts-ignore
          await redis.sAdd("jobs:index", ...idsToAdd);
        } catch {
          // ignore
        }
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