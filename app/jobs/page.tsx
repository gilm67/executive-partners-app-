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

// extract timestamp from id like: job:1756191730595:abc
function getMsFromId(id?: string) {
  if (!id) return 0;
  const m = id.match(/^job:(\d{13})/);
  return m ? Number(m[1]) : 0;
}

function isFresh(id?: string, now = Date.now()) {
  const ts = getMsFromId(id);
  if (!ts) return false;
  // “just now” = created within last 3 minutes
  return now - ts < 3 * 60 * 1000;
}

/**
 * Fetch jobs from Redis (same strategy), then sort newest first.
 */
async function getAllJobs(): Promise<Job[]> {
  const redis = await getRedis();

  const normalize = (raw: Record<string, string>): Job | null => {
    if (!raw) return null;
    if (raw.active === "false") return null;
    if (!raw.title || !raw.slug) return null;
    return raw as unknown as Job;
  };

  // 1) sets
  for (const key of ["jobs:ids", "jobs:index", "jobs:all"]) {
    try {
      const ids = await redis.sMembers(key);
      if (ids?.length) {
        const jobs: Job[] = [];
        for (const id of ids) {
          const j = await redis.hGetAll(String(id));
          const norm = normalize(j);
          if (norm) jobs.push(norm);
        }
        if (jobs.length) {
          return jobs.sort((a, b) => getMsFromId(b.id) - getMsFromId(a.id));
        }
      }
    } catch {}
  }

  // 2) scan jobs:<id>
  try {
    // @ts-ignore upstash supports scanIterator
    const it = redis.scanIterator({ match: "jobs:*" });
    const jobs: Job[] = [];
    for await (const key of it as AsyncIterable<string>) {
      if (/^jobs:\d+$/i.test(key)) {
        const j = await redis.hGetAll(key);
        const norm = normalize(j);
        if (norm) jobs.push(norm);
      }
    }
    if (jobs.length) {
      return jobs.sort((a, b) => getMsFromId(b.id) - getMsFromId(a.id));
    }
  } catch {}

  // 3) by-slug
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
    if (jobs.length) {
      return jobs.sort((a, b) => getMsFromId(b.id) - getMsFromId(a.id));
    }
  } catch {}

  return [];
}

export default async function JobsPage() {
  const jobs = await getAllJobs();
  const now = Date.now();

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
          {jobs.map((job) => {
            const fresh = isFresh(job.id, now);
            return (
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

                  <div className="flex items-center gap-2">
                    {fresh && (
                      <span className="shrink-0 rounded-md border border-emerald-700 bg-emerald-900/30 px-2 py-0.5 text-xs text-emerald-300">
                        Created just now
                      </span>
                    )}
                    {job.seniority ? (
                      <span className="shrink-0 rounded-md border border-neutral-800 px-2 py-0.5 text-xs text-neutral-300">
                        {job.seniority}
                      </span>
                    ) : null}
                  </div>
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
            );
          })}
        </ul>
      )}
    </main>
  );
}