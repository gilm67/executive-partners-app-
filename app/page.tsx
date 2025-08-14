// app/page.tsx
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
  const jobs = await getJobs();
  const featured = jobs.slice(0, 6);

  if (!featured.length) {
    return (
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 text-neutral-400">
        No open roles yet. Check back soon or{" "}
        <Link href="/candidates/register" className="underline">
          register your interest
        </Link>
        .
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {featured.map((j: Job, idx: number) => {
        const idOrSlug = (j.ID && String(j.ID)) || jobSlug(j);
        const href = `/jobs/${idOrSlug}`;
        return (
          <Link
            key={`${idOrSlug}-${idx}`}
            href={href}
            className="group rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 hover:border-neutral-600 hover:bg-neutral-900/60 transition-colors"
          >
            <div className="mb-2 flex flex-wrap gap-2">
              {j.Location && <Pill>{j.Location}</Pill>}
              {j.Market && <Pill>{j.Market}</Pill>}
              {j.Seniority && <Pill>{j.Seniority}</Pill>}
            </div>
            <h3 className="text-base font-semibold text-neutral-100 group-hover:underline">
              {j.Title || j.Role || "Untitled Role"}
            </h3>
            {j.Summary && (
              <p className="mt-2 line-clamp-2 text-sm text-neutral-300">
                {j.Summary}
              </p>
            )}
          </Link>
        );
      })}
    </div>
  );
}

function JobsFallback() {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 text-neutral-400">
      Loading featured roles…
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="space-y-16">
      {/* HERO */}
      <section className="mx-auto max-w-5xl pt-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-900/40 bg-blue-900/20 px-3 py-1 text-xs text-blue-200">
          Swiss Private Banking & UHNW Talent
        </div>

        <h1 className="mt-5 text-3xl font-bold leading-tight text-neutral-100 sm:text-4xl">
          Executive Partners
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-neutral-300">
          We connect top Private Bankers, Wealth Managers, and senior executives
          with leading banks, EAMs, and family offices worldwide.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/candidates"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
          >
            I’m a Candidate
          </Link>
          <Link
            href="/hiring-managers"
            className="rounded-lg border border-neutral-700 bg-neutral-900 px-5 py-2.5 text-neutral-100 hover:bg-neutral-800"
          >
            I’m Hiring
          </Link>
          <Link
            href="/jobs"
            className="rounded-lg border border-neutral-700 bg-neutral-900 px-5 py-2.5 text-neutral-100 hover:bg-neutral-800"
          >
            View All Jobs
          </Link>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
          <div className="mb-2 text-sm font-semibold text-blue-300">
            For Candidates
          </div>
          <h2 className="text-lg font-semibold text-neutral-100">
            Confidential career moves
          </h2>
          <p className="mt-2 text-neutral-300">
            We work discreetly with UHNW/HNW talent. Explore live mandates or
            register to be matched with roles that fit your market, seniority,
            and portability.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/jobs"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Browse Jobs
            </Link>
            <Link
              href="/candidates"
              className="rounded-lg border border-neutral-700 px-4 py-2 text-neutral-100 hover:bg-neutral-800"
            >
              Candidate Hub
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
          <div className="mb-2 text-sm font-semibold text-emerald-300">
            For Hiring Managers
          </div>
          <h2 className="text-lg font-semibold text-neutral-100">
            Targeted shortlists, fast
          </h2>
          <p className="mt-2 text-neutral-300">
            We map markets and deliver vetted shortlists with real portability.
            Post a new role or ask us to discreetly approach specific bankers.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/hiring-managers"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
            >
              Hire Talent
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-neutral-700 px-4 py-2 text-neutral-100 hover:bg-neutral-800"
            >
              Talk to Us
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED ROLES */}
      <section className="mx-auto max-w-5xl">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-100">
            Featured Roles
          </h2>
          <Link
            href="/jobs"
            className="text-sm text-neutral-300 underline hover:text-neutral-100"
          >
            View all jobs
          </Link>
        </div>

        <Suspense fallback={<JobsFallback />}>
          {/* async Server Component */}
          <FeaturedJobs />
        </Suspense>
      </section>

      {/* TRUST BAR / FOOTNOTE */}
      <section className="mx-auto max-w-5xl">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 text-center text-neutral-400">
          © {new Date().getFullYear()} Executive Partners — Geneva
        </div>
      </section>
    </main>
  );
}
