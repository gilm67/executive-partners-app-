// app/jobs/page.tsx
import Link from "next/link";
import { getJobs, idOrSlug, jobSlug, type Job } from "@/lib/sheets";

export const revalidate = 60;

export default async function JobsPage() {
  const jobs = await getJobs();

  // Filter only active jobs (case-insensitive)
  const activeJobs = jobs.filter(
    (j) => String(j.active || "").toUpperCase() === "TRUE"
  );

  if (!activeJobs.length) {
    return (
      <section className="space-y-6">
        <h1 className="text-2xl font-semibold text-white">Open Roles</h1>
        <p className="text-neutral-400">No active roles available at this time.</p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">Open Roles</h1>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {activeJobs.map((job) => {
          const title = (job.title || job.role || "").trim() || "Untitled Role";
          const location = (job.location || "").trim();
          const market = (job.market || "").trim();
          const seniority = (job.seniority || "").trim();
          const summary = (job.summary || "").trim();
          const href = `/jobs/${idOrSlug(job)}`;

          return (
            <li
              key={job.id}
              className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-neutral-200 hover:border-blue-600 transition"
            >
              <Link href={href}>
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="text-sm text-neutral-400">
                  {location || "—"}
                  {market ? ` • ${market}` : ""}
                  {seniority ? ` • ${seniority}` : ""}
                </p>
                {summary && (
                  <p className="mt-2 text-sm text-neutral-300 line-clamp-3">{summary}</p>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
