// app/page.tsx
import Link from "next/link";
import { Suspense } from "react";
import { getJobs, jobSlug, idOrSlug, type Job } from "@/lib/sheets";

export const revalidate = 60; // ISR

export default function HomePage() {
  return (
    <>
      <section className="space-y-4">
        <h1 className="text-2xl font-bold">Featured roles</h1>
        <p className="text-neutral-300">
          A selection of current mandates. Ask us about a role or apply confidentially.
        </p>
      </section>

      <div className="mt-6">
        <Suspense fallback={<div className="text-neutral-400">Loading roles…</div>}>
          <FeaturedJobs />
        </Suspense>
      </div>
    </>
  );
}

async function FeaturedJobs() {
  const rows = await getJobs();

  // keep rows not explicitly FALSE
  const jobs = rows
    .filter((j) => String((j as any).active || "").toUpperCase() !== "FALSE")
    .slice(0, 6);

  if (jobs.length === 0) {
    return <p className="text-neutral-400">No active roles right now. Check back soon.</p>;
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <li key={job.id || jobSlug(job)}>
          <JobCard job={job} />
        </li>
      ))}
    </ul>
  );
}

function JobCard({ job }: { job: Job }) {
  const title = (job.title || job.role || "Untitled role").trim();
  const location = (job.location || "").trim();
  const market = (job.market || "").trim();
  const seniority = (job.seniority || "").trim();
  const summary = (job.summary || "").toString().trim();

  const slugOrId = idOrSlug(job);

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold leading-snug">
          <Link href={`/jobs/${slugOrId}`} className="hover:underline">
            {title}
          </Link>
        </h3>
      </div>

      <p className="text-sm text-neutral-400">
        {location || "—"}
        {market ? ` • ${market}` : ""}
        {seniority ? ` • ${seniority}` : ""}
      </p>

      {summary && (
        <p className="mt-3 line-clamp-4 text-neutral-200">{summary}</p>
      )}

      <div className="mt-4 flex gap-2">
        <Link
          href={`/jobs/${slugOrId}`}
          className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
        >
          View role
        </Link>
        <Link
          href={`/apply?role=${encodeURIComponent(title)}&market=${encodeURIComponent(
            market || location || ""
          )}&jobId=${encodeURIComponent(slugOrId)}`}
          className="rounded-lg border border-neutral-700 px-3 py-1.5 text-sm text-neutral-200 hover:bg-neutral-800"
        >
          Apply confidentially
        </Link>
        <Link
          href="/contact"
          className="rounded-lg border border-neutral-700 px-3 py-1.5 text-sm text-neutral-200 hover:bg-neutral-800"
        >
          Ask about this role
        </Link>
      </div>
    </div>
  );
}
