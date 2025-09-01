// app/jobs/page.tsx
import Link from "next/link";
import { getAllJobsPublic } from "@/lib/jobs-public";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function JobsPage() {
  const jobs = await getAllJobsPublic();

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-0 py-8 md:py-12">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        Open Roles
      </h1>
      <p className="mt-2 text-base text-neutral-600 dark:text-neutral-300">
        Discreet mandates in Swiss & International Private Banking.
      </p>

      {/* Empty state */}
      {(!jobs || jobs.length === 0) && (
        <div className="mt-10 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 text-neutral-700 dark:text-neutral-200">
          No open roles at the moment.
        </div>
      )}

      {/* Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {jobs?.map((j) => {
          const href = `/jobs/${j.slug}`;
          return (
            <Link
              key={j.slug}
              href={href}
              className="group block rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-neutral-100 group-hover:underline underline-offset-4">
                {j.title}
              </h2>

              <div className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                {[j.location, j.seniority, j.market].filter(Boolean).join(" • ")}
              </div>

              {j.summary && (
                <p className="mt-4 text-sm md:text-[0.98rem] leading-6 text-neutral-700 dark:text-neutral-200">
                  {j.summary}
                </p>
              )}

              <span className="mt-5 inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm group-hover:bg-blue-700">
                View role
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
