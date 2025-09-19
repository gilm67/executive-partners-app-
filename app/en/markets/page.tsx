import Link from "next/link";

type City = { country: string; city: string; slug: string };

const CITIES: City[] = [
  { country: "Switzerland",     city: "Geneva",     slug: "geneva" },
  { country: "Switzerland",     city: "Zurich",     slug: "zurich" },
  { country: "UAE",             city: "Dubai",      slug: "dubai" },
  { country: "United Kingdom",  city: "London",     slug: "london" },
  { country: "Singapore",       city: "Singapore",  slug: "singapore" },
  { country: "Hong Kong",       city: "Hong Kong",  slug: "hong-kong" },
  { country: "United States",   city: "New York",   slug: "new-york" },
  { country: "United States",   city: "Miami",      slug: "miami" },
];

export const metadata = {
  title: "Markets | Executive Partners",
  description:
    "Private Banking & Wealth Management hotspots: hiring pulse, regulatory notes, compensation & ecosystem.",
};

export default function MarketsPage() {
  return (
    <main className="min-h-[70vh]">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02))] px-6 py-10 sm:px-8 sm:py-12">
        {/* soft background glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(900px 280px at 10% 0%, rgba(59,130,246,.20), transparent 60%), radial-gradient(700px 270px at 100% 0%, rgba(16,185,129,.18), transparent 60%)",
          }}
        />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 shadow-sm backdrop-blur">
            Market Insight
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight">Markets</h1>
          <p className="mt-3 max-w-3xl text-white/70">
            Private Banking &amp; Wealth Management hotspots where we actively place Senior RMs and
            leadership talent. Explore hiring pulse, regulatory must-haves, compensation bands, and
            ecosystem notes for each market.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CITIES.map((m) => (
          <MarketCard key={m.slug} {...m} />
        ))}
      </section>
    </main>
  );
}

function MarketCard({ country, city, slug }: City) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.03))] p-5 shadow-[0_1px_3px_rgba(0,0,0,.25)]">
      {/* decorative inner orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[.18]"
        style={{
          background:
            "radial-gradient(420px 140px at 12% 0%, rgba(14,165,233,1), transparent 60%), radial-gradient(420px 140px at 100% 0%, rgba(34,197,94,1), transparent 60%)",
        }}
      />
      <div className="relative">
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-semibold text-white/80">
          {country}
        </span>
        <h3 className="mt-2 text-xl font-bold">{city}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          View hiring pulse, regulatory notes, compensation &amp; ecosystem.
        </p>

        <div className="mt-4">
          <Link
            href={`/en/markets/${slug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-white/8 px-3 py-2 text-sm font-semibold text-white
                       hover:bg-white/12 hover:shadow-[0_10px_30px_rgba(59,130,246,.25)]
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 transition"
          >
            Explore market →
          </Link>
        </div>
      </div>
    </article>
  );
}
