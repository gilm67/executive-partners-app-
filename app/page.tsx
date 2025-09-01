// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Badge */}
      <div className="mx-auto w-fit rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium text-white/80">
        International & Swiss Private Banking — HNW/UHNW
      </div>

      {/* Title */}
      <h1 className="mt-6 text-center text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
        Executive Partners
      </h1>

      {/* Sub */}
      <p className="mx-auto mt-3 max-w-3xl text-center text-base leading-relaxed text-neutral-300">
        We connect top Private Bankers, Wealth Managers, and senior executives with leading
        banks, EAMs, and family offices worldwide.
      </p>

      {/* CTAs */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/candidates"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
        >
          I’m a Candidate
        </Link>
        <Link
          href="/hiring-managers"
          className="rounded-md bg-neutral-800 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-neutral-700"
        >
          I’m Hiring
        </Link>
        <Link
          href="/jobs"
          className="rounded-md bg-neutral-800 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-neutral-700"
        >
          View All Jobs
        </Link>
      </div>

      {/* Two feature cards */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {/* Candidates */}
        <section className="rounded-2xl bg-white/5 p-6 shadow-lg ring-1 ring-white/10">
          <p className="text-xs font-semibold text-blue-300/90">For Candidates</p>
          <h2 className="mt-2 text-lg font-semibold text-white">Confidential career moves</h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-300">
            We work discreetly with UHNW/HNW talent. Explore live mandates or register to be matched
            with roles that fit your market, seniority, and portability.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/jobs"
              className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              Browse Jobs
            </Link>
            <Link
              href="/candidates"
              className="rounded-md bg-neutral-800 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/10 hover:bg-neutral-700"
            >
              Candidate Hub
            </Link>
          </div>
        </section>

        {/* Hiring managers */}
        <section className="rounded-2xl bg-white/5 p-6 shadow-lg ring-1 ring-white/10">
          <p className="text-xs font-semibold text-emerald-300/90">For Hiring Managers</p>
          <h2 className="mt-2 text-lg font-semibold text-white">Targeted shortlists, fast</h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-300">
            We map markets and deliver vetted shortlists with real portability. Post a new role or
            ask us to discreetly approach specific bankers.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/hiring-managers"
              className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-700"
            >
              Hire Talent
            </Link>
            <Link
              href="/contact"
              className="rounded-md bg-neutral-800 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/10 hover:bg-neutral-700"
            >
              Talk to Us
            </Link>
          </div>
        </section>
      </div>

      {/* Featured roles */}
      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Featured Roles</h3>
          <Link
            href="/jobs"
            className="text-sm font-medium text-neutral-300 underline decoration-white/20 underline-offset-4 hover:text-white"
          >
            View all jobs
          </Link>
        </div>
        <p className="mt-2 text-sm text-neutral-400">
          No active roles available at this time.
        </p>
      </section>

      {/* Footer */}
      <p className="mt-12 text-center text-xs text-neutral-400">
        © {new Date().getFullYear()} Executive Partners. All rights reserved.
      </p>
    </div>
  );
}
