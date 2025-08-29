// app/jobs/page.tsx
import Link from "next/link";
import { fetchJobs } from "@/lib/jobs-public";

export default async function JobsPage() {
  const jobs = await fetchJobs();

  if (!jobs.length) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Open Positions</h1>
        <p className="mt-4 text-neutral-600">
          No jobs available at the moment. Please check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Open Positions</h1>
      <ul className="space-y-2">
        {jobs.map((job) => (
          <li key={job.slug} className="border p-4 rounded-md hover:shadow">
            <Link href={`/jobs/${job.slug}`}>
              <div className="font-semibold">{job.title}</div>
              <div className="text-sm text-neutral-600">
                {job.location} • {job.seniority}
              </div>
              <p className="mt-1 text-neutral-700">{job.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
