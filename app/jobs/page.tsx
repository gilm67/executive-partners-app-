// app/jobs/page.tsx
import Link from "next/link";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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

async function fetchJobsViaApi(): Promise<Job[]> {
  // Build absolute URL so it works on any domain/preview
  const h = await headers(); // <-- await is the fix
  const hostHeader =
    h.get("x-forwarded-host") || h.get("host") || process.env.VERCEL_URL || "";
  const protoHeader = (h.get("x-forwarded-proto") || "https").split(",")[0].trim();

  // Allow explicit override if you ever want it:
  const base =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (hostHeader ? `${protoHeader}://${hostHeader}` : "");

  try {
    const res = await fetch(`${base}/api/jobs/list`, {
      cache: "no-store",
      headers: { "x-requested-from": "jobs-page" },
      next: { revalidate: 0 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (data?.ok && Array.isArray(data.jobs)) return data.jobs as Job[];
    return [];
  } catch {
    return [];
  }
}

export default async function JobsPage() {
  const jobs = await fetchJobsViaApi();

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