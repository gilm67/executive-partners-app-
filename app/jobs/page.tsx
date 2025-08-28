// app/jobs/page.tsx
import Link from "next/link";
import { getRedis } from "@/lib/redis";

export const dynamic = "force-dynamic";

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

/**
 * Attempts to fetch all jobs from Redis using a few common layouts:
 * 1) A set of IDs in jobs:ids / jobs:index / jobs:all  -> then HGETALL per id
 * 2) SCAN keys that look like jobs:<id> hashes          -> HGETALL each
 * 3) As a last resort, follow slug index jobs:by-slug:* -> resolve ID, then HGETALL
 */
async function getAllJobs(): Promise<Job[]> {
  const redis = await getRedis();

  // Helper to filter & normalize a job hash
  const normalize = (raw: Record<string, string>): Job | null => {
    if (!raw) return null;
    // Only include active (default true if field missing)
    if (raw.active === "false") return null;
    // Require at least a title & slug to show on the list
    if (!raw.title || !raw.slug) return null;
    return raw as unknown as Job;
  };

  // 1) Try known ID sets
  for (const key of ["jobs:ids", "jobs:index", "jobs:all"]) {
    try {
      const ids = await redis.sMembers(key);
      if (ids && ids.length) {
        const jobs: Job[] = [];
        for (const id of ids) {
          const j = await redis.hGetAll(String(id));
          const norm = normalize(j);
          if (norm) jobs.push(norm);
        }
        if (jobs.length) return jobs;
      }
    } catch {
      /* ignore and try next strategy */
    }
  }

  // 2) Try scanning for hash keys that look like "jobs:<id>"
  try {
    // @ts-ignore Upstash client supports scanIterator
    const it = redis.scanIterator({ match: "jobs:*" });
    const keys: string[] = [];
    for await (const key of it as AsyncIterable<string>) {
      // Heuristic: include bare "jobs:<id>" hashes (skip helper keys e.g. jobs:by-slug:*)
      if (/^jobs:\d+$/i.test(key)) keys.push(key);
    }
    if (keys.length) {
      const jobs: Job[] = [];
      for (const key of keys) {
        const j = await redis.hGetAll(key);
        const norm = normalize(j);
        if (norm) jobs.push(norm);
      }
      if (jobs.length) return jobs;
    }
  } catch {
    /* ignore and try next strategy */
  }

  // 3) Last resort: follow slug index "jobs:by-slug:*" -> resolve to ID -> HGETALL
  try {
    // @ts-ignore
    const it = redis.scanIterator({ match: "jobs:by-slug:*" });
    const jobs: Job[] = [];
    for await (const bySlugKey of it as AsyncIterable<string>) {
      const id = await redis.get(bySlugKey);
      if (!id) continue;
      const j = await redis.hGetAll(String(id));
      const norm = normalize(j);
      if (norm) jobs.push(norm);
    }
    if (jobs.length) return jobs;
  } catch {
    /* ignore */
  }

  return [];
}

export default async function Page() {
  const jobs = await getAllJobs();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold text-white">Explore Jobs</h1>
      <p className="mt-2 text-neutral-300">
        Private Banking &amp; Wealth Management roles curated by Executive Partners.
      </p>

      {jobs.length === 0 ? (
        <div className="mt-10 rounded-lg border border-neutral-800 p-6 text-neutral-300">
          No jobs found yet. Please check back soon.
        </div>
      ) : (
        <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {jobs.map((job) => (
            <li
              key={job.id ?? job.slug}
              className="group rounded-xl border border-neutral-800 bg-neutral-900/40 p-5 hover:border-neutral-700 hover:bg-neutral-900/60 transition"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-lg font-medium text-white">
                  <Link
                    href={`/jobs/${job.slug}`}
                    className="hover:underline underline-offset-4"
                  >
                    {job.title}
                  </Link>
                </h2>
                {job.seniority ? (
                  <span className="shrink-0 rounded-md border border-neutral-800 px-2 py-0.5 text-xs text-neutral-300">
                    {job.seniority}
                  </span>
                ) : null}
              </div>

              <div className="mt-2 flex flex-wrap gap-2 text-sm text-neutral-300">
                {job.location ? (
                  <span className="rounded-md border border-neutral-800 px-2 py-0.5">
                    {job.location}
                  </span>
                ) : null}
                {job.market ? (
                  <span className="rounded-md border border-neutral-800 px-2 py-0.5">
                    {job.market}
                  </span>
                ) : null}
              </div>

              {job.summary ? (
                <p className="mt-3 line-clamp-3 text-neutral-300">{job.summary}</p>
              ) : null}

              <div className="mt-4">
                <Link
                  href={`/jobs/${job.slug}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 px-3 py-1.5 text-sm text-neutral-200 hover:bg-neutral-800"
                >
                  View role
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}