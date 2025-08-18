// app/components/HomepageHero.tsx
export default function HomepageHero() {
  return (
    <section className="relative bg-gradient-to-b from-[#FF7A00] via-[#FF8C1A] to-[#FF9E42] text-white">
      <div className="mx-auto max-w-5xl px-6 py-20 text-center">
        {/* Tagline */}
        <span className="mb-4 inline-block rounded-full bg-black/30 px-4 py-1 text-sm font-medium text-white shadow-sm">
          International & Swiss Private Banking — HNW/UHNW
        </span>

        {/* Title */}
        <h1 className="text-5xl font-bold drop-shadow-lg">Executive Partners</h1>

        {/* Subtitle */}
        <p className="mt-4 text-lg text-white/95 max-w-2xl mx-auto drop-shadow">
          We connect top Private Bankers, Wealth Managers, and senior executives
          with leading banks, EAMs, and family offices worldwide.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <button className="rounded-lg bg-blue-600 px-6 py-3 font-medium hover:bg-blue-700 shadow-md">
            I’m a Candidate
          </button>
          <button className="rounded-lg bg-black/60 px-6 py-3 font-medium hover:bg-black/80 shadow-md">
            I’m Hiring
          </button>
          <button className="rounded-lg bg-black/60 px-6 py-3 font-medium hover:bg-black/80 shadow-md">
            View All Jobs
          </button>
        </div>
      </div>
    </section>
  );
}

