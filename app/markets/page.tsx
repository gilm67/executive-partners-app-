// app/markets/page.tsx
import Link from "next/link";

const CITIES = [
  { slug: "geneva",    city: "Geneva",    country: "Switzerland" },
  { slug: "zurich",    city: "Zurich",    country: "Switzerland" },
  { slug: "dubai",     city: "Dubai",     country: "UAE" },
  { slug: "london",    city: "London",    country: "United Kingdom" },
  { slug: "singapore", city: "Singapore", country: "Singapore" },
  { slug: "hong-kong", city: "Hong Kong", country: "Hong Kong" },
  { slug: "new-york",  city: "New York",  country: "United States" },
  { slug: "miami",     city: "Miami",     country: "United States" },
  // NEW
  { slug: "paris",     city: "Paris",     country: "France" },
  { slug: "milano",    city: "Milano",    country: "Italy" },
  { slug: "madrid",    city: "Madrid",    country: "Spain" },
  { slug: "lisbon",    city: "Lisbon",    country: "Portugal" },
];

export default function MarketsIndex() {
  return (
    <div className="relative">
      {/* soft page glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px 320px at 15% -8%, rgba(59,130,246,.14) 0%, rgba(59,130,246,0) 60%), radial-gradient(800px 300px at 110% 0%, rgba(16,185,129,.10) 0%, rgba(16,185,129,0) 60%)",
        }}
      />

      {/* Title – match home/insights scale */}
      <header className="mb-8">
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
          Market Insight
        </span>
        <h1 className="mt-4 text-5xl font-extrabold tracking-tight md:text-6xl">Markets</h1>
        <p className="mt-3 max-w-3xl text-white/80">
          Private Banking & Wealth Management hotspots where we actively place Senior RMs and leadership talent.
          Explore hiring pulse, regulatory must-haves, compensation bands, and ecosystem notes for each market.
        </p>
      </header>

      {/* Grid of city cards – blue accent, no green */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CITIES.map((m) => (
          <Link
            key={m.slug}
            href={`/markets/${m.slug}`}
            className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-5 shadow-[0_1px_3px_rgba(0,0,0,.25)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(59,130,246,.24)]"
          >
            {/* corner glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-sky-500/25 blur-3xl opacity-40"
            />
            <div className="relative">
              <span className="inline-flex items-center rounded-full border border-sky-400/30 bg-sky-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-sky-300">
                {m.country}
              </span>
              <h3 className="mt-3 text-xl font-bold tracking-tight">{m.city}</h3>
              <p className="mt-1 text-sm text-white/70">
                View hiring pulse, regulatory notes, compensation & ecosystem.
              </p>
              <div className="mt-4 text-sm font-semibold text-sky-300 group-hover:text-sky-200">
                Explore market →
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}