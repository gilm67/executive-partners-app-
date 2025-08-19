
// app/page.tsx
import Link from "next/link";
import { Suspense } from "react";
import { getJobs, jobSlug, type Job } from "@/lib/sheets";

export const revalidate = 60;

/** Small pill used on job cards */
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-neutral-700/60 bg-neutral-900/60 px-3 py-1 text-xs text-neutral-300">
      {children}
    </span>
  );
}

/** Prominent hero CTA with visible white frame and bold text */
function HeroButton({
  href,
  children,
  variant = "primary",
  minWidth,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  minWidth: number;
}) {
  const base =
    "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-base font-bold transition-colors " +
    // inner & outer white frame feel
    "ring-1 ring-white shadow-[0_0_0_1px_rgba(255,255,255,0.45)_inset,0_14px_30px_-12px_rgba(0,0,0,0.55)]";
  const sizes = `px-8 py-3.5 min-w-[${minWidth}px]`;

  const styles =
    variant === "primary"
      ? // brighter royal blue
        "bg-blue-500 hover:bg-blue-600 text-white"
      : variant === "secondary"
      ? "bg-neutral-900/80 hover:bg-neutral-800 text-white"
      : "bg-transparent hover:bg-white/5 text-white ring-white/60";

  return (
    <Link href={href} className={`${base} ${sizes} ${styles}`}>
      {children}
    </Link>
  );
}

/** Featured roles list */
async function FeaturedJobs() {
  const jobs = (await getJobs())
    .filter((j) => String(j.Active || "").toUpperCase() !== "FALSE")
    .slice(0, 6);

  if (jobs.length === 0) return null;

  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2">
      {jobs.map((job) => {
        const tags = [job.Location, job.Market, job.Seniority].filter(
          Boolean
        ) as string[];
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
            <h3 className="text-lg font-semibold text-neutral-100">
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
      {/* Top badge */}
      <div className="mx-auto max-w-5xl px-6 pt-16">
        <div className="mx-auto w-fit rounded-full border border-neutral-800/60 bg-neutral-900/60 px-4 py-1 text-xs text-neutral-300">
          International & Swiss Private Banking — HNW/UHNWI
        </div>
      </div>

      {/* Title + sub + CTAs */}
      <header className="mx-auto max-w-5xl px-6 pt-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Executive Partners
        </h1>
        <p className="mx-auto mt-3 max-w-3xl text-neutral-300">
          We connect top Private Bankers, Wealth Managers, and senior executives with
          leading banks, EAMs, and family offices worldwide.
        </p>

        {/* CTA row — brighter blue, white frame, bold text */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <HeroButton href="/candidates" minWidth={200}>
            I’m a Candidate
          </HeroButton>
          <HeroButton href="/hiring-managers" variant="secondary" minWidth={160}>
            I’m Hiring
          </HeroButton>
          <HeroButton href="/jobs" variant="ghost" minWidth={200}>
            View All Jobs
          </HeroButton>
        </div>
      </header>

      {/* Two-card section */}
      <section className="mx-auto mt-12 max-w-6xl px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Candidates card */}
          <div className="rounded-2xl border border-neutral-800/70 bg-neutral-900/40 p-6 shadow-sm">
            <p className="text-xs font-bold text-blue-400">For Candidates</p>
            <h3 className="mt-2 text-lg font-bold text-white">
              Confidential career moves
            </h3>
            <p className="mt-1 text-sm text-neutral-400">
              We work discreetly with UHNW/HNW talent. Explore live mandates or register
              to be matched with roles that fit your market, seniority, and portability.
            </p>
            <div className="mt-4 flex gap-2">
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center rounded-xl bg-blue-500 px-4 py-2 text-sm font-bold text-white ring-1 ring-white transition-colors hover:bg-blue-600"
              >
                Browse Jobs
              </Link>
              <Link
                href="/candidates"
                className="inline-flex items-center justify-center rounded-xl bg-neutral-900/80 px-4 py-2 text-sm font-bold text-white ring-1 ring-white/70 transition-colors hover:bg-neutral-800"
              >
                Candidate Hub
              </Link>
            </div>
          </div>

          {/* Hiring Managers card */}
          <div className="rounded-2xl border border-neutral-800/70 bg-neutral-900/40 p-6 shadow-sm">
            <p className="text-xs font-bold text-emerald-400">For Hiring Managers</p>
            <h3 className="mt-2 text-lg font-bold text-white">
              Targeted shortlists, fast
            </h3>
            <p className="mt-1 text-sm text-neutral-400">
              We map markets and deliver vetted shortlists with real portability. Post a
              new role or ask us to discreetly approach specific bankers.
            </p>
            <div className="mt-4 flex gap-2">
              <Link
                href="/hiring-managers"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-white ring-1 ring-white transition-colors hover:bg-emerald-600"
              >
                Hire Talent
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-neutral-900/80 px-4 py-2 text-sm font-bold text-white ring-1 ring-white/70 transition-colors hover:bg-neutral-800"
              >
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Roles header + list */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="mt-14 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white tracking-wide">Featured Roles</h2>
          <Link
            href="/jobs"
            className="text-sm text-neutral-300 underline-offset-4 hover:text-white hover:underline"
          >
            View all jobs
          </Link>
        </div>

        <Suspense>
          <FeaturedJobs />
        </Suspense>
      </section>
    </>
  );
}
