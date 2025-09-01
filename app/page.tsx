// app/page.tsx
export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Top badge */}
      <div className="mt-6 flex justify-center">
        <span className="inline-flex items-center rounded-full bg-neutral-900/5 px-3 py-1 text-xs font-medium text-neutral-600 ring-1 ring-inset ring-neutral-900/10 dark:bg-white/5 dark:text-neutral-300 dark:ring-white/10">
          International & Swiss Private Banking — HNW/UHNW
        </span>
      </div>

      {/* Hero */}
      <header className="text-center pt-10 pb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Executive Partners
        </h1>
        <p className="mt-4 text-base sm:text-lg text-neutral-600">
          We connect top Private Bankers, Wealth Managers, and senior executives with
          leading banks, EAMs, and family offices worldwide.
        </p>

        {/* Primary CTAs */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/candidates"
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            I’m a Candidate
          </a>
          <a
            href="/hiring-managers"
            className="inline-flex items-center rounded-md bg-neutral-800 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-900"
          >
            I’m Hiring
          </a>
          <a
            href="/jobs"
            className="inline-flex items-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
          >
            View All Jobs
          </a>
        </div>
      </header>

      {/* Two feature cards */}
      <section className="grid gap-6 sm:grid-cols-2">
        {/* Candidates card */}
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <div className="p-5">
            <div className="text-xs font-semibold text-blue-700">For Candidates</div>
            <h3 className="mt-2 text-lg font-semibold">
              Confidential career moves
            </h3>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              We work discreetly with UHNW/HNW talent. Explore live mandates or
              register to be matched with roles that fit your market, seniority, and
              portability.
            </p>

            <div className="mt-4 flex gap-3">
              <a
                href="/jobs"
                className="inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                Browse Jobs
              </a>
              <a
                href="/candidates"
                className="inline-flex items-center rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-800 hover:bg-neutral-50"
              >
                Candidate Hub
              </a>
            </div>
          </div>
        </div>

        {/* Hiring managers card */}
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <div className="p-5">
            <div className="text-xs font-semibold text-emerald-700">
              For Hiring Managers
            </div>
            <h3 className="mt-2 text-lg font-semibold">Targeted shortlists, fast</h3>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              We map markets and deliver vetted shortlists with real portability.
              Post a new role or ask us to discreetly approach specific bankers.
            </p>

            <div className="mt-4 flex gap-3">
              <a
                href="/hiring-managers"
                className="inline-flex items-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-700"
              >
                Hire Talent
              </a>
              <a
                href="/contact"
                className="inline-flex items-center rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-800 hover:bg-neutral-50"
              >
                Talk to Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Roles header row */}
      <section className="mt-10 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Featured Roles</h2>
        <a
          href="/jobs"
          className="text-sm font-medium text-neutral-600 hover:text-neutral-900"
        >
          View all jobs
        </a>
      </section>

      {/* If you later want featured cards, insert a grid here */}
      <div className="mt-2 text-sm text-neutral-500">
        No active roles available at this time.
      </div>

      {/* Footer spacer like your screenshot */}
      <div className="h-16" />
      <footer className="py-6 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} Executive Partners. All rights reserved.
      </footer>
    </div>
  );
}