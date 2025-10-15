// components/HubsGrid.tsx
import Image from "next/image";
import Link from "next/link";
import { getAllMarkets } from "@/lib/markets/data";

type HubMeta = {
  slug: string;
  badge: string;          // short label
  highlights: string[];   // 2–3 bullets
};

// Curated messaging per hub (tight, PB/WM-specific)
const HUBS: Record<string, HubMeta> = {
  geneva: {
    slug: "geneva",
    badge: "CH Onshore + Cross-Border",
    highlights: ["EAM ecosystem", "Strong Alts & Lombard", "EU/MEA coverage"],
  },
  zurich: {
    slug: "zurich",
    badge: "CH-Germanic Platform Depth",
    highlights: ["Institutional scale", "DPM depth", "Entrepreneur wealth"],
  },
  london: {
    slug: "london",
    badge: "Global Booking Centre",
    highlights: ["Post-cap upside", "PE/Tech founders", "MFO collaboration"],
  },
  dubai: {
    slug: "dubai",
    badge: "MEA Gateway",
    highlights: ["Tax-advantaged", "DFSA/ADGM", "NRI/GCC flows"],
  },
  singapore: {
    slug: "singapore",
    badge: "APAC Hub",
    highlights: ["MAS governance", "ASEAN cross-border", "Digital adoption"],
  },
  "hong-kong": {
    slug: "hong-kong",
    badge: "China Access",
    highlights: ["Mainland flows", "SFC licensing", "Structured product demand"],
  },
  "new-york": {
    slug: "new-york",
    badge: "US Premier Centre",
    highlights: ["Wirehouse/PB/MFO", "Alts & credit", "Hedge/PE principals"],
  },
  miami: {
    slug: "miami",
    badge: "US–LatAm",
    highlights: ["Offshore gateway", "Bilingual edge", "Cross-border booking"],
  },
  paris: {
    slug: "paris",
    badge: "EU Onshore",
    highlights: ["Domestic UHNW", "FO growth", "Insurance wrappers"],
  },
  milan: {
    slug: "milan",
    badge: "Entrepreneur Wealth",
    highlights: ["Onshore depth", "CH proximity", "Structured solutions"],
  },
  lisbon: {
    slug: "lisbon",
    badge: "Emerging EU Node",
    highlights: ["Expat inflows", "Tech migrants", "LU/IE wrappers"],
  },
};

export default function HubsGrid() {
  // Pull from your single source of truth
  const markets = getAllMarkets()
    // ensure the order you want to show
    .sort((a, b) =>
      ["geneva","zurich","london","dubai","singapore","hong-kong","new-york","miami","paris","milan","lisbon"]
        .indexOf(a.slug) -
      ["geneva","zurich","london","dubai","singapore","hong-kong","new-york","miami","paris","milan","lisbon"]
        .indexOf(b.slug)
    );

  return (
    <section className="container-max py-10 md:py-14">
      <div className="mb-6 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">Global hubs we serve</h2>
          <p className="mt-1 text-white/70 text-sm">
            Direct access to hiring committees across Switzerland, the UK, US, MENA, and APAC.
          </p>
        </div>
        <Link href="/en/markets" className="btn-ghost">View all markets</Link>
      </div>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {markets.map((m) => {
          const meta = HUBS[m.slug] ?? { slug: m.slug, badge: m.country, highlights: [] as string[] };
          return (
            <li key={m.slug} className="group rounded-2xl border border-white/10 bg-neutral-900/40 overflow-hidden ring-1 ring-white/10 hover:ring-white/20 transition">
              <Link href={`/en/markets/${m.slug}`} className="block">
                <div className="relative h-40 w-full">
                  <Image
                    src={m.heroImage}
                    alt={`${m.city} market`}
                    fill
                    sizes="(max-width:1024px) 100vw, 33vw"
                    className="object-cover"
                    priority={m.slug === "geneva"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="inline-flex items-center rounded-md bg-white/10 px-2 py-1 text-xs ring-1 ring-white/20">
                      {meta.badge}
                    </div>
                    <h3 className="mt-2 text-lg font-semibold">{m.city}</h3>
                  </div>
                </div>

                <div className="p-4">
                  <ul className="text-sm text-white/80 space-y-1">
                    {(meta.highlights.length ? meta.highlights : [m.summary]).slice(0,3).map((h) => (
                      <li key={h} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/60" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex items-center gap-2 text-sm text-emerald-300 group-hover:text-emerald-200">
                    Explore benchmarks <span aria-hidden>→</span>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}