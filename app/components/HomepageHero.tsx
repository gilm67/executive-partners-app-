// app/components/HomepageHero.tsx
export default function HomepageHero() {
  return (
    <section className="relative bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-20 text-center">
        {/* Tagline */}
        <span className="mb-4 inline-block rounded-full border border-neutral-700/60 bg-neutral-900/60 px-4 py-1 text-sm font-medium text-neutral-300">
          International & Swiss Private Banking — HNW/UHNW
        </span>

        {/* Title */}
        <h1 className="text-5xl font-bold">Executive Partners</h1>

        {/* Subtitle */}
        <p className="mt-4 text-lg text-neutral-300 max-w-2xl mx-auto">
          We connect top Private Bankers, Wealth Managers, and senior executives
          with leading banks, EAMs, and family offices worldwide.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <button className="rounded-lg bg-blue-600 px-6 py-3 font-medium hover:bg-blue-700">
            I’m a Candidate
          </button>
          <button className="rounded-lg bg-neutral-800 px-6 py-3 font-medium hover:bg-neutral-700">
            I’m Hiring
          </button>
          <button className="rounded-lg bg-neutral-800 px-6 py-3 font-medium hover:bg-neutral-700">
            View All Jobs
          </button>
        </div>
      </div>
    </section>
  );
}

