// app/page.tsx
import Link from "next/link";
import { Suspense } from "react";
import HomepageHero from "@/app/components/HomepageHero";
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
  const jobs = (await getJobs())
    // keep only jobs that aren’t explicitly marked false/inactive
    .filter((j) => String(j.Active || "").toLowerCase() !== "false")
    .slice(0, 6);

  if (jobs.length === 0) {
    return (
      <p className="text-neutral-400">
        No featured roles available right now.
      </p>
    );
  }

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {jobs.map((j) => {
        const title = j.Title || j.Role || "Role";
        const loc = j.Location || "";
        const market = j.Market || "";
        const seniority = j.Seniority || "";
        const href = `/jobs/${jobSlug(j)}`;

        return (
          <Link
            key={`${j.ID || title}-${loc}-${market}`}
            href={href}
            className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 hover:border-neutral-700 hover:bg-neutral-900/60 transition"
          >
            <div className="mb-3 flex flex-wrap gap-2">
              {seniority ? <Pill>{seniority}</Pill> : null}
              {market ? <Pill>{market}</Pill> : null}
              {loc ? <Pill>{loc}</Pill> : null}
            </div>
            <h3 className="text-white font-semibold">{title}</h3>
            {j.Summary ? (
              <p className="mt-1 text-sm text-neutral-400 line-clamp-2">
                {j.Summary}
              </p>
            ) : null}
          </Link>
        );
      })}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="bg-black text-white">
      {/* HERO (exactly like the version you prefer) */}
      <HomepageHero />

      {/* Two feature cards */}
      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Candidates card */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
            <p className="text-xs font-semibold text-blue-300">For Candidates</p>
            <h3 className="mt-2 text-xl font-semibold text-white">
              Confidential career moves
            </h3>
            <p className="mt-2 text-neutral-400">
              We work discreetly with UHNW/HNW talent. Explore live mandates or
              register to be matched with roles that fit your market, seniority,
              and portability.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/jobs"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-700"
              >
                Browse Jobs
              </Link>
              <Link
                href="/candidates/register"
                className="rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm font-medium hover:bg-neutral-800"
              >
                Candidate Hub
              </Link>
            </div>
          </div>

          {/* Hiring Managers card */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
            <p className="text-xs font-semibold text-emerald-300">
              For Hiring Managers
            </p>
            <h3 className="mt-2 text-xl font-semibold text-white">
              Targeted shortlists, fast
            </h3>
            <p className="mt-2 text-neutral-400">
              We map markets and deliver vetted shortlists with real
              portability. Post a new role or ask us to discreetly approach
              specific bankers.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/hiring-managers"
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium hover:bg-emerald-700"
              >
                Hire Talent
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm font-medium hover:bg-neutral-800"
              >
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured roles */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-white">Featured Roles</h2>
          <Link
            href="/jobs"
            className="text-sm text-neutral-400 underline-offset-4 hover:text-neutral-300 hover:underline"
          >
            View all jobs
          </Link>
        </div>
        <Suspense fallback={<p className="text-neutral-400">Loading…</p>}>
          {/* @ts-expect-error Async Server Component */}
          <FeaturedJobs />
        </Suspense>
      </section>
    </main>
  );
}

