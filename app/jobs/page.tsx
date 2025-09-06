// app/jobs/page.tsx
export const runtime = "nodejs";
export const revalidate = 60;

type Job = {
  id: string;
  title?: string;
  role?: string;
  market?: string;
  location?: string;
  seniority?: string;
  summary?: string;
  slug?: string;
};

async function getJobs(): Promise<Job[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/jobs/list`, {
      // allow ISR caching
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.jobs) ? data.jobs : [];
  } catch {
    return [];
  }
}

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-2xl font-semibold text-white">Open Roles</h1>
      <p className="mt-2 text-sm text-neutral-400">
        Confidential mandates in Private Banking &amp; Wealth Management.
      </p>

      {jobs.length === 0 ? (
        <p className="mt-8 text-neutral-400">No jobs available right now. Check back soon.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4"
            >
              <h2 className="text-lg font-semibold text-white">{job.title}</h2>
              <p className="text-sm text-neutral-400">
                {[job.market, job.location, job.seniority].filter(Boolean).join(" — ")}
              </p>
              {job.summary && <p className="mt-1 text-sm text-neutral-300">{job.summary}</p>}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}