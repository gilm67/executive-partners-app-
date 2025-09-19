import Link from "next/link";

type City = {
  country: string;
  city: string;
  slug: string;
};

const CITIES: City[] = [
  { country: "Switzerland",     city: "Geneva",    slug: "geneva" },
  { country: "Switzerland",     city: "Zurich",    slug: "zurich" },
  { country: "UAE",             city: "Dubai",     slug: "dubai" },
  { country: "United Kingdom",  city: "London",    slug: "london" },
  { country: "Singapore",       city: "Singapore", slug: "singapore" },
  { country: "Hong Kong",       city: "Hong Kong", slug: "hong-kong" },
  { country: "United States",   city: "New York",  slug: "new-york" },
  { country: "United States",   city: "Miami",     slug: "miami" },
];

export const metadata = {
  title: "Markets | Executive Partners",
  description:
    "Private Banking & Wealth Management markets overview: hiring pulse, regulatory notes, compensation & ecosystem.",
};

export default function MarketsPage() {
  return (
    <main className="min-h-[70vh]">
      {/* Header block */}
      <section className="mb-8">
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">Markets</h1>
        <p className="mt-3 text-white/70 max-w-2xl">
          View hiring pulse, regulatory notes, compensation & ecosystem in leading Private Banking hubs.
        </p>
      </section>

      {/* Grid of market cards */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CITIES.map((m) => (
          <MarketCard key={m.slug} {...m} />
        ))}
      </section>
    </main>
  );
}

function MarketCard({ country, city, slug }: City) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.03))] p-5 shadow-sm">
      {/* soft corner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-8 -right-8 h-36 w-36 rounded-full bg-gradient-to-br from-sky-500/30 to-emerald-400/30 blur-2xl opacity-40"
      />
      <div className="relative">
        <div className="text-xs font-semibold text-emerald-300/80">{country}</div>
        <h3 className="mt-2 text-xl font-bold">{city}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          View hiring pulse, regulatory notes, compensation & ecosystem.
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
