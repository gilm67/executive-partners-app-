// app/page.tsx
import Link from "next/link";
import { Suspense } from "react";
import { getJobs, jobSlug, type Job } from "@/lib/sheets";

export const revalidate = 60;

/* Small tag/pill */
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-neutral-700/60 bg-neutral-900/60 px-3 py-1 text-xs text-neutral-300">
      {children}
    </span>
  );
}

/* Featured roles list */
async function FeaturedJobs() {
  const jobs = (await getJobs())
    .filter((j) => String(j.Active || "").toUpperCase() !== "FALSE")
    .slice(0, 6);

  if (jobs.length === 0) return null;

  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2">
      {jobs.map((job) => {
        const tags = [job.Location, job.Market, job.Seniority].filter(Boolean) as string[];
        const href = `/jobs/${jobSlug(job)}`;

        return (
          <Link
            key={job.ID || job.Title}
            href={href}
            className="rounded-2xl border border-neutral-800/70 bg-neutral-900/40 p-5 shadow-sm transition-colors hover:border-neutral-700 hover:bg-neutral-900/60"
          >
            <div className="mb-3 flex flex-wrap gap-2">
              {tags.map((t) => (
                <Pill key={t}>{t}</Pill>
              ))}
            </div>
            <h3 className="text-[17px] font-semibold text-neutral-100">
              {job.Title || job.Role || "Role"}
            </h3>
            {job.Summary && (
              <p className="mt-1 text-sm text-neutral-400">{job.Summary}</p>
            )}
          </Link>
        );
      })}
    </div>
  );
}

export default async function HomePage() {
  return (
    <>
      {/* TOP BADGE + TITLE + CTAs */}
      <header className="mx-auto max-w-5xl px-6 pt-16 text-center">
        {/* slightly bigger badge */}
        <div className="mx-auto w-fit rounded-full border border-neutral-800/60 bg-neutral-900/60 px-5 py-1.5 text-[13px] font-medium text-neutral-300">
          International &amp; Swiss Private Banking — HNW/UHNWI
        </div>

        {/* bigger heading like your screenshot */}
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Executive Partners
        </h1>

        {/* one-line tagline, slightly brighter and tighter width */}
        <p className="mx-auto mt-3 max-w-3xl text-[15.5px] text-neutral-300">
          We connect top Private Bankers, Wealth Managers, and senior executives with
          leading banks, EAMs, and family offices worldwide.
        </p>

        {/* BIGGER / BRIGHTER CTAs (match screenshot proportions) */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/candidates"
            className="rounded-xl bg-[#2563eb] px-5 py-2.5 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-[#1d4ed8]"
          >
            I’m a Candidate
          </Link>

          <Link
            href="/hiring-managers"
            className="rounded-xl border border-neutral-700 bg-neutral-900 px-5 py-2.5 text-[15px] font-semibold text-neutral-200 transition-colors hover:bg-neutral-800"
          >
            I’m Hiring
          </Link>

          <Link
            href="/jobs"
            className="rounded-xl border border-neutral-700 bg-neutral-900 px-5 py-2.5 text-[15px] font-semibold text-neutral-200 transition-colors hover:bg-neutral-800"
          >
            View All Jobs
          </Link>
        </div>
      </header>

      {/* TWO CARDS (left Candidates, right Hiring Managers) */}
      <section className="mx-auto mt-10 max-w-6xl px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Candidates card */}
          <div className="rounded-2xl border border-neutral-800/70 bg-neutral-900/40 p-6 shadow-sm">
            <p className="text-xs font-medium text-neutral-400">For Candidates</p>
            <h3 className="mt-2 text-[18px] font-semibold text-neutral-100">
              Confidential career moves
            </h3>
            <p className="mt-1 text-sm text-neutral-400">
              We work discreetly with UHNW/HNW talent. Explore live mandates or register
              to be matched with roles that fit your market, seniority, and portability.
            </p>

            <div className="mt-4 flex gap-2">
              <Link
                href="/jobs"
                className="rounded-xl bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1d4ed8]"
              >
                Browse Jobs
              </Link>
              <Link
                href="/candidates"
                className="rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-200 transition-colors hover:bg-neutral-800"
              >
                Candidate Hub
              </Link>
            </div>
          </div>

          {/* Hiring Managers card */}
          <div className="rounded-2xl border border-neutral-800/70 bg-neutral-900/40 p-6 shadow-sm">
            <p className="text-xs font-medium text-emerald-400">For Hiring Managers</p>
            <h3 className="mt-2 text-[18px] font-semibold text-neutral-100">
              Targeted shortlists, fast
            </h3>
            <p className="mt-1 text-sm text-neutral-400">
              We map markets and deliver vetted shortlists with real portability. Post a
              new role or ask us to discreetly approach specific bankers.
            </p>

            <div className="mt-4 flex gap-2">
              <Link
                href="/hiring-managers"
                className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
              >
                Hire Talent
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-200 transition-colors hover:bg-neutral-800"
              >
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED ROLES */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="mt-12 flex items-center justify-between">
          <h2 className="text-[17px] font-semibold text-neutral-200">Featured Roles</h2>
          <Link
            href="/jobs"
            className="text-sm text-neutral-400 underline-offset-4 hover:text-neutral-200 hover:underline"
          >
            View all jobs
          </Link>
        </div>

        <Suspense>
          {/* @ts-expect-error Async Server Component */}
          <FeaturedJobs />
        </Suspense>
      </section>
    </>
  );
}
