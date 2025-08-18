// app/page.tsx
import HomepageHero from "./components/HomepageHero";
import Link from "next/link";
import { Suspense } from "react";
import { getJobs, jobSlug, type Job } from "@/lib/sheets";

export const revalidate = 60;

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-neutral-700/60 bg-neutral-900/60 px-3 py-1 text-xs text-neutral-300">
      {children}
    </span>
  );
}

async function FeaturedJobs() {
  const jobs: Job[] = await getJobs();
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h2 className="text-xl font-semibold mb-6 text-white">Featured Roles</h2>
      <div className="space-y-4">
        {jobs.map((job) => (
          <Link
            key={jobSlug(job)}
            href={`/jobs/${jobSlug(job)}`}
            className="block rounded-lg border border-neutral-800 bg-neutral-900/50 p-6 hover:bg-neutral-900 transition"
          >
            <h3 className="text-lg font-medium text-white">{job.Title}</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              <Pill>{job.Market}</Pill>
              <Pill>{job.Location}</Pill>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function HomePage() {
  return (
    <>
      {/* New hero section */}
      <HomepageHero />

      {/* Existing featured jobs section */}
      <Suspense fallback={<p className="text-neutral-400">Loading jobs...</p>}>
        <FeaturedJobs />
      </Suspense>
    </>
  );
}

