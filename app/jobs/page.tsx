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
 * Fetch all jobs from Redis with fallback strategies and support for both
 * singular (job:*) and plural (jobs:*) key namespaces:
 * 1) sets: *:ids / *:index / *:all
 * 2) scan for job(s):<id> hashes (skip helper/index keys)
 * 3) scan *:by-slug:* → resolve ID → HGETALL
 */
async function getAllJobs(): Promise<Job[]> {
  const redis = await getRedis();

  const normalize = (raw: Record<string, string>): Job | null => {
    if (!raw) return null;
    if (raw.active === "false") return null; // default active if missing
    if (!raw.title || !raw.slug) return null;
    return raw as unknown as Job;
  };

  // 1) Known ID sets (both singular & plural)
  for (const key of [
    "jobs:ids", "jobs:index", "jobs:all",
    "job:ids",  "job:index",  "job:all",
  ]) {
    try {
      const ids = await redis.sMembers(key);
      if (ids?.length) {
        const jobs: Job[] = [];
        for (const id of ids) {
          const j = await redis.hGetAll(String(id));
          const norm = normalize(j);
          if (norm) jobs.push(norm);
        }
        if (jobs.length) return jobs;
      }
    } catch {
      // ignore and try next
    }
  }

  // 2) Scan for job hashes under both namespaces
  try {
    const collected: Job[] = [];
    for (const pattern of ["job:*", "jobs:*"]) {
      // @ts-ignore Upstash client supports scanIterator
      const it = redis.scanIterator({ match: pattern });
      for await (const key of it as AsyncIterable<string>) {
        // Skip helper/index keys
        if (/(^|:)by-slug:/i.test(key)) continue;
        if (/(^|:)(ids|index|all)$/i.test(key)) continue;

        // Heuristic: likely a job hash
        if (/^jobs?:/i.test(key)) {
          const j = await redis.hGetAll(key);
          const norm = normalize(j);
          if (norm) collected.push(norm);
        }
      }
    }
    if (collected.length) return collected;
  } catch {
    // ignore and try next
  }

  // 3) Slug index fallback (both singular & plural)
  try {
    const jobs: Job[] = [];
    for (const pattern of ["job:by-slug:*", "jobs:by-slug:*"]) {
      // @ts-ignore
      const it = redis.scanIterator({ match: pattern });
      for await (const bySlugKey of it as AsyncIterable<string>) {
        const id = await redis.get(bySlugKey);
        if (!id) continue;
        const j = await redis.hGetAll(String(id));
        const norm = normalize(j);
        if (norm) jobs.push(norm);
      }
    }
    if (jobs.length) return jobs;
  } catch {
    // ignore
  }

  return [];
}

export default async function JobsPage() {
  const jobs = await getAllJobs();

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
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
                {job.location && (
                  <span className="rounded-md border border-neutral-800 px-2 py-0.5">
                    {job.location}
                  </span>
                )}
                {job.market && (
                  <span className="rounded-md border border-neutral-800 px-2 py-0.5">
                    {job.market}
                  </span>
                )}
              </div>

              {job.summary && (
                <p className="mt-3 line-clamp-3 text-neutral-300">{job.summary}</p>
              )}

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
    </main>
  );
}