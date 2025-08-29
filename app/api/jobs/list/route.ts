import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

type JobHash = {
  id?: string;
  slug?: string;
  title?: string;
  summary?: string;
  description?: string;
  location?: string;
  market?: string;
  seniority?: string;
  active?: string; // "true"/"false"
};

export async function GET() {
  try {
    const redis = await getRedis();

    // Main index of job IDs; if empty, we still return ok:true with [].
    const ids = await redis.smembers("jobs:index");

    const jobs = [] as Array<{
      id: string;
      slug?: string;
      title?: string;
      summary?: string;
      location?: string;
      market?: string;
      seniority?: string;
      active: "true" | "false";
    }>;

    if (ids && ids.length) {
      // Fetch hashes in parallel (in chunks to be safe)
      const chunk = 50;
      for (let i = 0; i < ids.length; i += chunk) {
        const slice = ids.slice(i, i + chunk);
        const results = await Promise.all(slice.map((id) => redis.hgetall(id)));
        results.forEach((h, idx) => {
          const id = slice[idx];
          const hh = h as unknown as JobHash;
          if (hh && hh.title) {
            jobs.push({
              id,
              slug: hh.slug,
              title: hh.title,
              summary: hh.summary,
              location: hh.location,
              market: hh.market,
              seniority: hh.seniority,
              active: hh.active === "true" ? "true" : "false",
            });
          }
        });
      }
    }

    // (Optional) Only return active jobs on the public list:
    const activeOnly = true;
    const list = activeOnly ? jobs.filter((j) => j.active === "true") : jobs;

    return NextResponse.json({ ok: true, jobs: list });
  } catch (e) {
    console.error("GET /api/jobs/list error:", e);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}