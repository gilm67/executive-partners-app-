import Link from "next/link";

type City = { country: string; city: string; slug: string; desc: string };

const CITIES: City[] = [
  { country: "Switzerland",      city: "Switzerland", slug: "switzerland", desc: "View hiring pulse, regulatory notes, compensation & ecosystem." },
  { country: "Switzerland",      city: "Geneva",      slug: "geneva",      desc: "View hiring pulse, regulatory notes, compensation & ecosystem." },
  { country: "Switzerland",      city: "Zurich",      slug: "zurich",      desc: "View hiring pulse, regulatory notes, compensation & ecosystem." },
  { country: "UAE",              city: "Dubai",       slug: "dubai",       desc: "View hiring pulse, regulatory notes, compensation & ecosystem." },
  { country: "United Kingdom",   city: "London",      slug: "london",      desc: "View hiring pulse, regulatory notes, compensation & ecosystem." },
  { country: "Singapore",        city: "Singapore",   slug: "singapore",   desc: "View hiring pulse, regulatory notes, compensation & ecosystem." },
  { country: "Hong Kong",        city: "Hong Kong",   slug: "hong-kong",   desc: "View hiring pulse, regulatory notes, compensation & ecosystem." },
  { country: "United States",    city: "New York",    slug: "new-york",    desc: "View hiring pulse, regulatory notes, compensation & ecosystem." },
  { country: "United States",    city: "Miami",       slug: "miami",       desc: "View hiring pulse, regulatory notes, compensation & ecosystem." },
];

export const metadata = {
  title: "Markets | Executive Partners",
  description:
    "Private Banking & Wealth Management hotspots: hiring pulse, regulatory notes, compensation & ecosystem.",
};

export default function MarketsPage() {
  return (
    <main className="min-h-[70vh]">
      <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,.02))] p-6 sm:p-8 mb-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{ background:
            "radial-gradient(800px 240px at 5% 0%, rgba(59,130,246,.15), transparent 60%), radial-gradient(700px 220px at 120% 10%, rgba(16,185,129,.15), transparent 60%)"
          }}
        />
        <div className="relative">
          <span className="inline-block text-xs font-semibold text-white/70 rounded-full border border-white/10 bg-white/5 px-2 py-0.5">
            Market Insight
          </span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-white">Markets</h1>
          <p className="mt-3 max-w-3xl text-white/70">
            Private Banking &amp; Wealth Management hotspots where we actively place Senior RMs and leadership
            talent. Explore hiring pulse, regulatory must-haves, compensation bands, and ecosystem notes for each market.
          </p>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CITIES.map((m) => (
          <article
            key={m.slug}
            className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.03))] p-5 shadow-sm"
          >
            <div className="text-xs font-semibold text-white/60">{m.country}</div>
            <h3 className="mt-1 text-xl font-bold text-white">{m.city}</h3>
            <p className="mt-2 text-sm text-white/70">{m.desc}</p>

            <div className="mt-4 flex gap-3">
              <Link
                href={`/en/markets/${m.slug}`}
                className="rounded-lg bg-white/10 px-3 py-1.5 text-sm font-semibold text-white hover:bg-white/20"
              >
                Explore market →
              </Link>
              <Link
                href="/en/contact"
                className="rounded-lg border border-white/30 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/10"
              >
                Talk to us
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
