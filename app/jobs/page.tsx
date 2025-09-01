// app/jobs/page.tsx
import Link from "next/link";
import { listJobsPublic } from "@/lib/jobs-public";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function JobsPage() {
  const jobs = await listJobsPublic();

  return (
    <div>
      <h1 className="heading-hero">Open Roles</h1>
      <p className="mt-2 subtle">Discreet mandates in Swiss &amp; International Private Banking.</p>

      {(!jobs || jobs.length === 0) ? (
        <p className="mt-8">No open roles at the moment.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <article key={job.slug} className="card hover:shadow-md transition-shadow">
              <div className="card-pad">
                <h2 className="text-lg font-semibold text-neutral-900">
                  <Link href={`/jobs/${job.slug}`} className="hover:underline">
                    {job.title}
                  </Link>
                </h2>
                <p className="mt-1 text-sm text-neutral-700">
                  {[job.location, job.seniority, job.market].filter(Boolean).join(" • ")}
                </p>
                {job.summary && (
                  <p className="mt-3 text-neutral-800">{job.summary}</p>
                )}
                <div className="mt-4">
                  <Link href={`/jobs/${job.slug}`} className="link-btn text-sm">View role</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
