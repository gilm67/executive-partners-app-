// app/page.tsx — hero + 2 cards on rounded black panel (the “good” layout)
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Centered black panel */}
      <section className="mx-auto w-full rounded-3xl bg-neutral-950 ring-1 ring-white/10 px-6 sm:px-10 py-10 sm:py-14">
        {/* Eyebrow */}
        <div className="mx-auto w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
          International & Swiss Private Banking — HNW/UHNW
        </div>

        {/* Hero title */}
        <h1 className="mt-6 text-center text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Executive Partners
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm sm:text-base text-neutral-300">
          We connect top Private Bankers, Wealth Managers, and senior executives with
          leading banks, EAMs, and family offices worldwide.
        </p>

        {/* Hero CTA buttons */}
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
            className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-neutral-800"
          >
            View All Jobs
          </Link>
        </div>

        {/* Two feature cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Candidates card */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/90 shadow-lg">
            <div className="text-xs font-medium text-blue-200/80">For Candidates</div>
            <h3 className="mt-2 text-lg font-semibold text-white">Confidential career moves</h3>
            <p className="mt-2 text-sm text-neutral-300">
              We work discreetly with UHNWI/HNW talent. Explore live mandates
              or register to be matched with roles that fit your market, seniority,
              and portability.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/jobs"
                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Browse Jobs
              </Link>
              <Link
                href="/candidates"
                className="rounded-md bg-neutral-900 px-3 py-2 text-sm font-medium text-white ring-1 ring-white/10 hover:bg-neutral-800"
              >
                Candidate Hub
              </Link>
            </div>
          </div>

          {/* Hiring managers card */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/90 shadow-lg">
            <div className="text-xs font-medium text-emerald-200/80">For Hiring Managers</div>
            <h3 className="mt-2 text-lg font-semibold text-white">Targeted shortlists, fast</h3>
            <p className="mt-2 text-sm text-neutral-300">
              We map markets and deliver vetted shortlists with real portability. Post
              a new role or ask us to discreetly approach specific bankers.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/hiring-managers"
                className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
              >
                Hire Talent
              </Link>
              <Link
                href="/contact"
                className="rounded-md bg-neutral-900 px-3 py-2 text-sm font-medium text-white ring-1 ring-white/10 hover:bg-neutral-800"
              >
                Talk to Us
              </Link>
            </div>
          </div>
        </div>

        {/* Featured roles footer row */}
        <div className="mt-8 flex items-center justify-between text-sm">
          <div className="text-white/90 font-semibold">Featured Roles</div>
          <Link
            href="/jobs"
            className="text-neutral-300 hover:text-white underline decoration-white/20 underline-offset-4"
          >
            View all jobs
          </Link>
        </div>

        {/* Quiet footer line inside the panel */}
        <p className="mt-10 text-center text-xs text-neutral-400">
          © 2025 Executive Partners. All rights reserved.
        </p>
      </section>
    </div>
  );
}
