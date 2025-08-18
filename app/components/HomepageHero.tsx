// app/components/HomepageHero.tsx
export default function HomepageHero() {
  return (
    <section className="relative bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-20 text-center">
        {/* Badge */}
        <span className="mb-6 inline-block rounded-full border border-neutral-700/60 bg-neutral-900/60 px-4 py-1 text-sm font-medium text-neutral-300">
          International & Swiss Private Banking — HNW/UHNW
        </span>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold">Executive Partners</h1>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto">
          We connect top Private Bankers, Wealth Managers, and senior executives
          with leading banks, EAMs, and family offices worldwide.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/jobs"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium hover:bg-blue-700"
          >
            I’m a Candidate
          </a>
          <a
            href="/hiring-managers"
            className="rounded-lg bg-neutral-800 px-6 py-3 font-medium hover:bg-neutral-700"
          >
            I’m Hiring
          </a>
          <a
            href="/jobs"
            className="rounded-lg bg-neutral-800 px-6 py-3 font-medium hover:bg-neutral-700"
          >
            View All Jobs
          </a>
        </div>
      </div>
    </section>
  );
}

