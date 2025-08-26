import Link from "next/link";
import { getRedis } from "@/lib/redis";

type JobRow = {
  id: string;
  title: string;
  location?: string;
  summary?: string;
  slug: string;
  createdAt?: string;
  active?: string;
};

async function getJobs() {
  const redis = await getRedis();
  const ids = await redis.zRange("jobs:index", 0, 50, { REV: true });
  const rows = await Promise.all(ids.map((id) => redis.hGetAll(id)));
  return rows
    .filter((j) => j && j.active !== "false")
    .map((j) => ({
      id: String(j.id),
      title: String(j.title),
      location: j.location ? String(j.location) : "",
      summary: j.summary ? String(j.summary) : "",
      slug: String(j.slug),
      createdAt: j.createdAt ? String(j.createdAt) : "",
    })) as JobRow[];
}

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-6">Open Roles</h1>

      {jobs.length === 0 ? (
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 text-neutral-300">
          No roles posted yet. Please check back soon.
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {jobs.map((job) => (
            <li key={job.id}>
              <Link
                href={`/jobs/${job.slug}`}
                className="block rounded-xl border border-neutral-800 bg-neutral-900 p-5 hover:border-neutral-700 transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-lg font-medium text-white">{job.title}</h2>
                  {job.location ? (
                    <span className="shrink-0 text-xs px-2 py-1 rounded-md border border-neutral-800 text-neutral-300">
                      {job.location}
                    </span>
                  ) : null}
                </div>
                {job.summary ? (
                  <p className="mt-2 text-sm text-neutral-300 line-clamp-3">
                    {job.summary}
                  </p>
                ) : null}
                <div className="mt-3 text-xs text-neutral-400">View details →</div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
