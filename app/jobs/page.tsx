// app/jobs/page.tsx
import Link from "next/link";

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
  active?: string;
};

async function fetchJobs(): Promise<Job[]> {
  try {
    // Relative URL so it always hits the current origin
    const res = await fetch("/api/jobs/list", { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json().catch(() => null as any);
    if (!data || data.ok !== true || !Array.isArray(data.jobs)) return [];
    return data.jobs as Job[];
  } catch {
    return [];
  }
}

export default async function JobsPage() {
  const jobs = await fetchJobs();

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
                  <Link href={`/jobs/${job.slug}`} className="hover:underline underline-offset-4">
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