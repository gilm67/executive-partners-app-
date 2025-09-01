cat > app/page.tsx <<'TSX'
// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      {/* HERO PANEL */}
      <section className="mx-auto my-10 md:my-14 rounded-3xl bg-neutral-900/70 ring-1 ring-white/10 shadow-xl backdrop-blur px-6 py-10 md:px-14 md:py-14 text-center text-white">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
          International &amp; Swiss Private Banking — HNW/UHNW
        </div>

        <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          Executive Partners
        </h1>

        <p className="mx-auto mt-5 max-w-3xl text-base sm:text-lg text-white/80">
          We connect top Private Bankers, Wealth Managers, and senior executives with
          leading banks, EAMs, and family offices worldwide.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/candidates"
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
          >
            I’m a Candidate
          </Link>
          <Link
            href="/hiring-managers"
            className="inline-flex items-center rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20 ring-1 ring-white/20"
          >
            I’m Hiring
          </Link>
          <Link
            href="/jobs"
            className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow hover:bg-neutral-100"
          >
            View All Jobs
          </Link>
        </div>

        {/* CARDS ROW */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 md:p-7 text-left">
            <p className="text-xs font-semibold text-blue-300">For Candidates</p>
            <h3 className="mt-1 text-lg font-semibold text-white">
              Confidential career moves
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/80">
              We work discreetly with UHNWI/HNW talent. Explore live mandates or
              register to be matched with roles that fit your market, seniority, and portability.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/jobs"
                className="inline-flex items-center rounded-md bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Browse Jobs
              </Link>
              <Link
                href="/candidates"
                className="inline-flex items-center rounded-md bg-white/10 px-3.5 py-2 text-sm font-semibold text-white hover:bg-white/20 ring-1 ring-white/20"
              >
                Candidate Hub
              </Link>
            </div>
          </article>

          <article className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 md:p-7 text-left">
            <p className="text-xs font-semibold text-emerald-300">For Hiring Managers</p>
            <h3 className="mt-1 text-lg font-semibold text-white">
              Targeted shortlists, fast
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/80">
              We map markets and deliver vetted shortlists with real portability.
              Post a new role or ask us to discreetly approach specific bankers.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/hiring-managers"
                className="inline-flex items-center rounded-md bg-emerald-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Hire Talent
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-md bg-white/10 px-3.5 py-2 text-sm font-semibold text-white hover:bg-white/20 ring-1 ring-white/20"
              >
                Talk to Us
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* FEATURED / FOOTER SPACER */}
      <section className="mb-6 flex items-center justify-between text-sm text-white/70">
        <h4 className="font-semibold">Featured Roles</h4>
        <Link href="/jobs" className="hover:underline">
          View all jobs
        </Link>
      </section>

      {/* If there are no jobs, we leave the space clean. Your jobs list page still handles listings. */}
    </div>
  );
}
TSX