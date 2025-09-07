import { listJobsFromStore, type Job } from "@/lib/jobs-store";

export const runtime = "nodejs";
// Make it bulletproof first. Once you see jobs, you can swap to ISR if you want.
// export const revalidate = 60;  // (enable later for ISR)
export const dynamic = "force-dynamic";

export default async function JobsPage() {
  const jobs = await listJobsFromStore();

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-white">Open Roles</h1>
        <p className="mt-2 text-sm text-neutral-400">
          Confidential mandates in Private Banking &amp; Wealth Management.
        </p>
      </header>

      {jobs.length === 0 ? (
        <p className="text-neutral-400">No jobs available right now. Check back soon.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4"
            >
              <h2 className="text-lg font-semibold text-white">
                {job.title ?? "Untitled Role"}
              </h2>
              <p className="text-sm text-neutral-400">
                {[job.market, job.location, job.seniority].filter(Boolean).join(" — ")}
              </p>
              {job.summary && (
                <p className="mt-1 text-sm text-neutral-300">{job.summary}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
