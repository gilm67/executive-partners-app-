import Link from "next/link";

export const metadata = {
  title: "Markets – Executive Partners",
  description:
    "We cover Switzerland and key international hubs for private banking: Geneva, Zurich, Dubai, Singapore, London, and New York.",
};

const HUBS = [
  { city: "Switzerland", note: "Core onshore market" },
  { city: "Geneva", note: "UHNW/HNW booking centre" },
  { city: "Zurich", note: "Brazil, LatAm, Iberia, CH Onshore" },
  { city: "Dubai", note: "MEA coverage; cross-border expertise" },
  { city: "Singapore", note: "SEA & Asia coverage" },
  { city: "London", note: "International booking; UK res non-dom" },
  { city: "New York", note: "UHNWI/family office connectivity" },
];

export default function MarketsPage() {
  return (
    <div className="min-h-[70vh]">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Markets we serve
        </h1>
        <p className="mt-3 max-w-3xl text-white/70">
          We specialise in Private Banking &amp; Wealth Management across
          Switzerland and key international hubs. We focus on Relationship
          Managers with real portability and senior hires across front-office.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {HUBS.map((h) => (
          <article
            key={h.city}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.03))] p-5 shadow-[0_1px_3px_rgba(0,0,0,.25)]"
          >
            <div className="pointer-events-none absolute inset-0 opacity-[.16] [background:radial-gradient(450px_100px_at_10%_0%,rgba(14,165,233,1),transparent_60%),radial-gradient(450px_100px_at_100%_0%,rgba(34,197,94,1),transparent_60%)]" />
            <div className="relative">
              <h3 className="text-xl font-semibold">{h.city}</h3>
              <p className="mt-1 text-sm text-white/70">{h.note}</p>
              <div className="mt-4 flex gap-3">
                <Link
                  href={`/jobs?market=${encodeURIComponent(h.city.toLowerCase())}`}
                  className="inline-flex items-center rounded-xl bg-white/8 px-3 py-2 text-sm font-semibold text-white hover:bg-white/12"
                >
                  View roles
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Talk to us
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      <div className="mt-10 text-sm text-white/70">
        Can’t see your market?{" "}
        <Link href="/contact" className="underline hover:text-white">
          Contact us
        </Link>{" "}
        for a confidential discussion.
      </div>
    </div>
  );
}
