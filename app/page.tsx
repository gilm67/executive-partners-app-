// app/page.tsx
import Link from "next/link";
import { Suspense } from "react";
import { getJobs, jobSlug, type Job } from "@/lib/sheets";

export const revalidate = 60;

/* ---------- small UI bits ---------- */
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-neutral-700/60 bg-neutral-900/60 px-2.5 py-1 text-[11px] text-neutral-300">
      {children}
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-semibold text-neutral-100">{children}</h2>
  );
}

/* ---------- async Featured Jobs ---------- */
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

function JobsSkeleton() {
  const Card = () => (
    <div className="animate-pulse rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
      <div className="mb-3 flex gap-2">
        <div className="h-5 w-16 rounded-full bg-neutral-800" />
        <div className="h-5 w-20 rounded-full bg-neutral-800" />
      </div>
      <div className="h-5 w-3/4 rounded bg-neutral-800" />
      <div className="mt-2 h-4 w-5/6 rounded bg-neutral-800" />
    </div>
  );
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card /> <Card /> <Card /> <Card /> <Card /> <Card />
    </div>
  );
}

/* ---------- page ---------- */
export default async function HomePage() {
  return (
    <main className="space-y-16">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.15),transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-900/40 bg-blue-900/20 px-3 py-1 text-[11px] text-blue-200">
            International & Swiss Private Banking — HNW/UHNWI
          </div>

          <h1 className="mt-5 text-4xl font-bold leading-tight text-neutral-100 sm:text-5xl">
            Executive Partners
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-300">
            We connect top Private Bankers, Wealth Managers, and senior
            executives with leading banks, EAMs, and family offices worldwide.
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
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 md:grid-cols-3">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
          <div className="mb-2 text-sm font-semibold text-blue-300">
            For Candidates
          </div>
          <SectionTitle>Confidential career moves</SectionTitle>
          <p className="mt-2 text-neutral-300">
            We work discreetly with UHNW/HNW talent. Explore live mandates or
            register to be matched with roles that fit your market and
            portability.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/jobs"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Browse Jobs
            </Link>
            <Link
              href="/candidates/register"
              className="rounded-lg border border-neutral-700 px-4 py-2 text-neutral-100 hover:bg-neutral-800"
            >
              Register Interest
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
          <div className="mb-2 text-sm font-semibold text-emerald-300">
            For Hiring Managers
          </div>
          <SectionTitle>Targeted shortlists, fast</SectionTitle>
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

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
          <div className="mb-2 text-sm font-semibold text-violet-300">
            Our Edge
          </div>
          <SectionTitle>Discretion + data</SectionTitle>
          <p className="mt-2 text-neutral-300">
            Boutique confidentiality with modern tooling: structured market
            maps, transparent process, and clean candidate data for smarter
            hiring decisions.
          </p>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-neutral-300">
            <li>Portable book assessment</li>
            <li>Cross-border coverage (CH, UK, GCC, APAC)</li>
            <li>Fast shortlist delivery</li>
          </ul>
        </div>
      </section>

      {/* FEATURED ROLES */}
      <section className="mx-auto max-w-6xl px-4">
        <div className="mb-3 flex items-center justify-between">
          <SectionTitle>Featured Roles</SectionTitle>
          <Link
            href="/jobs"
            className="text-sm text-neutral-300 underline hover:text-neutral-100"
          >
            View all jobs
          </Link>
        </div>

        <Suspense fallback={<JobsSkeleton />}>
          <FeaturedJobs />
        </Suspense>
      </section>

      {/* TRUST / LOGOS */}
      <section className="mx-auto max-w-6xl px-4">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
          <p className="mb-4 text-center text-sm uppercase tracking-wide text-neutral-400">
            Trusted by leaders across private banking & wealth management
          </p>
          <div className="grid grid-cols-2 gap-6 text-neutral-400 sm:grid-cols-4">
            <div className="rounded-lg border border-neutral-800 p-4 text-center">
              Tier-1 Banks
            </div>
            <div className="rounded-lg border border-neutral-800 p-4 text-center">
              EAMs & Family Offices
            </div>
            <div className="rounded-lg border border-neutral-800 p-4 text-center">
              Asset Managers
            </div>
            <div className="rounded-lg border border-neutral-800 p-4 text-center">
              Boutiques
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CARD */}
      <section className="mx-auto max-w-6xl px-4">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 text-center text-neutral-400">
          © {new Date().getFullYear()} Executive Partners — Geneva
        </div>
      </section>
    </main>
  );
}
