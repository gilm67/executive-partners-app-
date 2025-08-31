// app/jobs/page.tsx
import Link from "next/link";
import { getAllJobsPublic } from "@/lib/jobs-public";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function JobsPage() {
  const jobs = await getAllJobsPublic();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold">Open Roles</h1>
        <p className="text-neutral-600 mt-2">
          Discreet mandates in Swiss & International Private Banking.
        </p>
      </header>

      {(!jobs || jobs.length === 0) ? (
        <p className="text-neutral-500">No open roles at the moment.</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((j) => (
            <li key={j.slug} className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm hover:shadow-md transition">
              <h2 className="text-lg font-medium">
                <Link href={`/jobs/${j.slug}`} className="hover:underline">
                  {j.title}
                </Link>
              </h2>
              <p className="text-sm text-neutral-600 mt-1">
                {[j.location, j.seniority, j.market].filter(Boolean).join(" • ")}
              </p>
              {j.summary && (
                <p className="text-sm text-neutral-700 mt-3 line-clamp-3">{j.summary}</p>
              )}
              <div className="mt-4">
                <Link
                  href={`/jobs/${j.slug}`}
                  className="inline-block rounded-md border px-3 py-1.5 text-sm hover:bg-neutral-50"
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
