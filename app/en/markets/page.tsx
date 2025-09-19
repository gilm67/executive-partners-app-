import Link from "next/link";

export const metadata = {
  title: "Markets – Executive Partners",
  description: "Private Banking & Wealth Management markets we serve worldwide.",
};

type Market = {
  country: string;
  city: string;
  href: string;
};

export default function MarketsPage() {
  const markets: Market[] = [
    { country: "Switzerland",     city: "Geneva",     href: "/en/markets/geneva" },
    { country: "Switzerland",     city: "Zurich",     href: "/en/markets/zurich" },
    { country: "UAE",             city: "Dubai",      href: "/en/markets/dubai" },
    { country: "United Kingdom",  city: "London",     href: "/en/markets/london" },
    { country: "Singapore",       city: "Singapore",  href: "/en/markets/singapore" },
    { country: "Hong Kong",       city: "Hong Kong",  href: "/en/markets/hong-kong" },
    { country: "United States",   city: "New York",   href: "/en/markets/new-york" },
    { country: "United States",   city: "Miami",      href: "/en/markets/miami" },
  ];

  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white">
      {/* subtle background glow (same vibe as landing) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px_420px_at_18%_-10%,rgba(59,130,246,.12) 0%, rgba(59,130,246,0) 60%), radial-gradient(1000px_380px_at_110%_0%, rgba(16,185,129,.12) 0%, rgba(16,185,129,0) 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-24 pt-14">
        <h1 className="text-center text-4xl md:text-5xl font-extrabold tracking-tight">
          Markets We Serve
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-neutral-300">
          Geneva-based coverage of the world’s leading private banking hubs, with a focus on portability and cultural fit.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {markets.map((m) => (
            <Link
              key={`${m.country}-${m.city}`}
              href={m.href}
              className="group relative rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.03))] p-6 shadow-md hover:bg-white/5 transition"
            >
              {/* soft glow accent */}
              <div className="pointer-events-none absolute inset-0 opacity-[.18] group-hover:opacity-30 [background:radial-gradient(400px_120px_at_20%_0%,rgba(14,165,233,1),transparent_60%),radial-gradient(400px_120px_at_80%_0%,rgba(34,197,94,1),transparent_60%)]" />

              <div className="relative flex h-full flex-col">
                <div className="text-xs font-semibold text-[#6EE7B7]">{m.country}</div>
                <h2 className="mt-1 text-xl font-semibold">{m.city}</h2>
                <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                  View hiring pulse, regulatory notes, compensation &amp; ecosystem.
                </p>
                <span className="mt-auto pt-4 text-sm font-medium text-sky-400 group-hover:underline">
                  Explore market →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
