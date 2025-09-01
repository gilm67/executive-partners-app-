// app/jobs/page.tsx
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Job = {
  slug: string;
  title: string;
  location?: string;
  market?: string;
  seniority?: string;
  summary?: string;
};

async function loadJobs(): Promise<Job[]> {
  const base = process.env.NEXT_PUBLIC_JOBS_API_BASE || "";
  const url = `${base}/api/jobs/list`;
  const res = await fetch(url, { cache: "no-store", next: { revalidate: 0 } });
  if (!res.ok) return [];
  const data = await res.json();
  return data?.jobs ?? [];
}

export default async function JobsPage() {
  const jobs = await loadJobs();

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold">Open Roles</h1>
        <p className="mt-2 text-neutral-600">
          Discreet mandates in Swiss & International Private Banking.
        </p>
      </header>

      {jobs.length === 0 ? (
        <p className="text-neutral-500">No active roles at the moment.</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2">
          {jobs.map((job) => (
            <li
              key={job.slug}
              className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold">
                <Link href={`/jobs/${job.slug}`} className="hover:underline">
                  {job.title}
                </Link>
              </h2>
              <p className="mt-1 text-sm text-neutral-600">
                {[job.location, job.seniority, job.market].filter(Boolean).join(" • ")}
              </p>
              {job.summary && (
                <p className="mt-3 text-sm leading-6 text-neutral-700 line-clamp-3">
                  {job.summary}
                </p>
              )}
              <div className="mt-4">
                <Link
                  href={`/jobs/${job.slug}`}
                  className="inline-flex items-center rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-black"
                >
                  View role
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
