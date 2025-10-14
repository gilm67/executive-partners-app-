import type { Metadata } from "next";
import Link from "next/link";

/* =========================================================
   Minimal inline icons (no external libs)
   ========================================================= */
function IconCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path
        d="M7.5 13.2 4.8 10.5a1.1 1.1 0 1 0-1.6 1.6l3.8 3.8a1.1 1.1 0 0 0 1.6 0l8.8-8.8a1.1 1.1 0 0 0-1.6-1.6L7.5 13.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconArrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M13.172 12 8.222 7.05l1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" fill="currentColor" />
    </svg>
  );
}

/* =========================================================
   Data model
   ========================================================= */
type Band = { title: string; base: string; bonus: string; notes?: string };
type Market = {
  title: string;
  intro: string;
  currency: string; // display only
  hiringPulse: string[];
  comp: Band[];
  compNote?: string;
  ecosystem: {
    global?: string[];
    champions?: string[]; // Swiss champions (for CH) or Local champions (elsewhere)
    boutiques?: string[];
  };
  trends?: string[];
};

const mk = (m: Market) => m;

/* =========================================================
   Market dataset (indicative 2025 ranges)
   ========================================================= */
const MARKETS: Record<string, Market> = {
  // ——— Switzerland ———
  geneva: mk({
    title: "Geneva",
    intro:
      "Geneva remains a strategic UHNW hub with cross-border coverage across LatAm, MEA, and Western Europe.",
    currency: "CHF",
    hiringPulse: [
      "Demand for senior RMs with portable AUM (LatAm, MEA, FR/IT/ES/PT).",
      "Hot skills: LSFin/MiFID II, digital onboarding, family office advisory.",
      "Team lifts in UHNW and private markets advisory.",
    ],
    comp: [
      { title: "Associate / VP", base: "120k–180k", bonus: "20–40%" },
      { title: "Director", base: "200k–280k", bonus: "30–100%" },
      { title: "Managing Director / Team Head", base: "300k–500k", bonus: "Performance-driven" },
    ],
    compNote: "Upper ranges typically tied to portable AUM > CHF 200m and strong ROA.",
    ecosystem: {
      global: ["UBS", "JPM", "Citi"],
      champions: [
        "Pictet",
        "Lombard Odier",
        "Julius Baer",
        "Mirabaud",
        "EFG",
        "Vontobel",
        "J. Safra Sarasin",
        "UBP",
        "CBH",
        "Syz",
        "Bordier",
      ],
      boutiques: ["Family offices"],
    },
    trends: ["Consolidation", "Sustainability focus", "AI-enabled servicing"],
  }),

  zurich: mk({
    title: "Zürich",
    intro:
      "Switzerland’s largest booking centre with strong onshore UHNW and cross-border DACH/EU flows.",
    currency: "CHF",
    hiringPulse: [
      "Selective growth for UHNW pods; emphasis on documented portability.",
      "Strength in credit solutions, advisory mandates, and PE/Alternatives.",
      "Risk/compliance senior hires due to regulatory uplift.",
    ],
    comp: [
      { title: "Associate / VP", base: "130k–190k", bonus: "20–40%" },
      { title: "Director", base: "210k–300k", bonus: "30–100%" },
      { title: "Managing Director / Desk Head", base: "320k–520k", bonus: "Performance-driven" },
    ],
    compNote: "Upper bands linked to portable AUM > CHF 250m and high ROA.",
    ecosystem: {
      global: ["UBS", "JPM", "Citi"],
      champions: [
        "Julius Baer",
        "Pictet",
        "Lombard Odier",
        "Vontobel",
        "EFG",
        "J. Safra Sarasin",
        "UBP",
        "CBH",
        "Bordier",
      ],
      boutiques: ["Private banks & multi-FOs"],
    },
    trends: ["Platform differentiation", "Wealth + IB connectivity", "Cost discipline"],
  }),

  // ——— Europe (non-CH) ———
  paris: mk({
    title: "Paris",
    intro:
      "A major EU onshore market serving domestic UHNW families and international ties to FR-Africa and the Middle East.",
    currency: "EUR",
    hiringPulse: [
      "Demand for onshore RMs with regulated advisory and DPM track record.",
      "Origination in entrepreneurs, tech liquidity, and real-assets families.",
      "Senior compliance and COO profiles to scale platforms.",
    ],
    comp: [
      { title: "Associate / VP", base: "90k–140k", bonus: "20–40%" },
      { title: "Director", base: "150k–230k", bonus: "30–80%" },
      { title: "Managing Director / Team Head", base: "230k–380k", bonus: "Performance-driven" },
    ],
    compNote: "Top bands linked to portable AUM > €150m and high NNA/NMR.",
    ecosystem: {
      global: ["UBS", "Julius Baer", "Pictet", "Lombard Odier", "JPM", "Citi"],
      champions: ["BNP Paribas WM", "Rothschild & Co", "Société Générale PB"],
      boutiques: ["FOs and merchant banks"],
    },
    trends: ["Succession/liquidity events", "Lux structuring", "ESG demand"],
  }),

  milano: mk({
    title: "Milano",
    intro:
      "Italy’s financial centre with deep entrepreneur and industrial-family wealth; active cross-border to CH/LU.",
    currency: "EUR",
    hiringPulse: [
      "Hiring for onshore UHNW coverage and succession planning.",
      "Credit & lending specialists valued (mortgage, Lombard).",
      "COO/IT uplift for digitisation and MiFID processes.",
    ],
    comp: [
      { title: "Associate / VP", base: "80k–120k", bonus: "20–35%" },
      { title: "Director", base: "130k–200k", bonus: "30–70%" },
      { title: "Managing Director / Team Head", base: "200k–330k", bonus: "Performance-driven" },
    ],
    compNote: "Upper bands often require portable AUM > €120m.",
    ecosystem: {
      global: ["UBS", "Julius Baer", "Pictet", "Lombard Odier"],
      champions: ["Mediobanca PB", "Intesa Sanpaolo PB", "Banca Generali", "Fideuram ISPB"],
      boutiques: ["Single/Multi-family offices"],
    },
    trends: ["Onshore shift", "Alternatives uptake", "Private markets access"],
  }),

  madrid: mk({
    title: "Madrid",
    intro:
      "Growing Iberian hub with links to family offices and LATAM entrepreneurs; mix of onshore and cross-border.",
    currency: "EUR",
    hiringPulse: [
      "Senior RMs with Iberian UHNW books and LATAM connectivity.",
      "Investment advisory and DPM specialists in demand.",
      "Compliance leadership to support growth.",
    ],
    comp: [
      { title: "Associate / VP", base: "70k–110k", bonus: "15–35%" },
      { title: "Director", base: "120k–180k", bonus: "25–60%" },
      { title: "Managing Director / Team Head", base: "180k–300k", bonus: "Performance-driven" },
    ],
    compNote: "Top end tied to €100m+ portable AUM and strong fee mix.",
    ecosystem: {
      global: ["UBS", "Julius Baer", "Pictet"],
      champions: ["Santander PB", "BBVA PB", "CaixaBank PB"],
      boutiques: ["Independent FOs"],
    },
    trends: ["LATAM inflows", "Onshore advisory", "Wealth tech adoption"],
  }),

  lisbon: mk({
    title: "Lisbon",
    intro:
      "Niche EU hub attracting relocating HNW/UHNW (EU & LATAM) with favourable residency/tax regimes.",
    currency: "EUR",
    hiringPulse: [
      "Selective hires for international desks and onshore advisory.",
      "Demand in COO/Compliance to scale platforms.",
      "IT & digital onboarding improvements.",
    ],
    comp: [
      { title: "Associate / VP", base: "60k–90k", bonus: "15–30%" },
      { title: "Director", base: "90k–140k", bonus: "20–50%" },
      { title: "Managing Director / Team Head", base: "140k–240k", bonus: "Performance-driven" },
    ],
    compNote: "Upper bands linked to €60m+ portable AUM and sticky fee income.",
    ecosystem: {
      global: ["UBS", "Julius Baer", "Pictet"],
      champions: ["Millennium BCP", "NOVO Banco (PB)"],
      boutiques: ["FOs, independent wealth managers"],
    },
    trends: ["Relocation inflows", "Tax-residency advisory", "Digitisation"],
  }),

  // ——— UK / Middle East / Asia / US ———
  london: mk({
    title: "London",
    intro:
      "EMEA gateway covering UK onshore and global non-resident books; strong product and markets connectivity.",
    currency: "GBP",
    hiringPulse: [
      "Senior RMs with UK onshore permissions and documented portability.",
      "Alternatives & structured solutions specialists.",
      "COO/Compliance leaders for Consumer Duty & SMCR.",
    ],
    comp: [
      { title: "Associate / VP", base: "90k–140k", bonus: "20–50%" },
      { title: "Director", base: "150k–250k", bonus: "30–100%" },
      { title: "Managing Director / Team Head", base: "250k–400k", bonus: "Performance-driven" },
    ],
    compNote: "Upper bands linked to £150m+ portable AUM and strong economics.",
    ecosystem: {
      global: ["UBS", "Julius Baer", "Pictet", "Lombard Odier", "JPM", "Citi", "Credit Suisse (UBS)"],
      champions: ["Coutts", "Rothschild & Co"],
      boutiques: ["Merchant banks & FOs"],
    },
    trends: ["Regulatory uplift", "Alts access", "Wealth/IB integration"],
  }),

  dubai: mk({
    title: "Dubai",
    intro:
      "MEA hub with strong cross-border UHNW flows from GCC, India, Africa, and CIS; rapid platform build-out.",
    currency: "AED",
    hiringPulse: [
      "Hiring for GCC/India/Africa books with portable NNA.",
      "Credit/lending and investment specialists prized.",
      "COO/Compliance uplift under DFSA rules.",
    ],
    comp: [
      { title: "Associate / VP", base: "450k–800k", bonus: "20–60%" },
      { title: "Director", base: "800k–1.4m", bonus: "30–100%" },
      { title: "Managing Director / Team Head", base: "1.4m–2.5m", bonus: "Performance-driven" },
    ],
    compNote: "Packages may include housing/schooling; top end tied to AUM > AED 500m.",
    ecosystem: {
      global: ["UBS", "Julius Baer", "Pictet", "Lombard Odier", "HSBC", "Citi"],
      champions: ["First Abu Dhabi Bank (FAB)", "Mashreq Private Banking", "Emirates NBD Private Banking"],
      boutiques: ["FOs & IAMs"],
    },
    trends: ["Relocation to UAE", "Booking shifts", "FX/credit solutions"],
  }),

  singapore: mk({
    title: "Singapore",
    intro:
      "Asia wealth hub serving SEA and global families; robust booking and advisory platform under MAS.",
    currency: "SGD",
    hiringPulse: [
      "Senior RMs with SEA books; IAM/EO license experience valued.",
      "Lombard lending and alts distribution in demand.",
      "Compliance/COO leadership for VCC/IAM platforms.",
    ],
    comp: [
      { title: "Associate / VP", base: "160k–240k", bonus: "20–50%" },
      { title: "Director", base: "240k–380k", bonus: "30–100%" },
      { title: "Managing Director / Team Head", base: "380k–650k", bonus: "Performance-driven" },
    ],
    compNote: "Upper bands linked to > SGD 250m portable AUM with strong fee mix.",
    ecosystem: {
      global: ["UBS", "Julius Baer", "Pictet", "Lombard Odier", "HSBC GPB"],
      champions: ["DBS Treasures Private Client", "OCBC Premier", "UOB Private Bank"],
      boutiques: ["IAMs/FOs, VCC managers"],
    },
    trends: ["VCC adoption", "IAM growth", "Regional family offices"],
  }),

  "hong-kong": mk({
    title: "Hong Kong",
    intro:
      "North Asia gateway for UHNW and entrepreneurs; China connectivity with international product access.",
    currency: "HKD",
    hiringPulse: [
      "Mandarin/Cantonese RMs with North Asia UHNW books.",
      "Credit solutions, IPO/PE connectivity, and alts access.",
      "Compliance uplift under SFC regimes.",
    ],
    comp: [
      { title: "Associate / VP", base: "700k–1.2m", bonus: "20–60%" },
      { title: "Director", base: "1.2m–2.2m", bonus: "30–120%" },
      { title: "Managing Director / Team Head", base: "2.2m–4.0m", bonus: "Performance-driven" },
    ],
    compNote: "Top bands tied to > HKD 800m portable AUM and strong ROA.",
    ecosystem: {
      global: ["UBS", "Julius Baer", "Pictet", "Lombard Odier", "HSBC"],
      champions: ["BOC Private Bank", "Hang Seng Private Banking"],
      boutiques: ["FOs/IAMs"],
    },
    trends: ["North Asia flows", "China connect", "Booking diversification"],
  }),

  "new-york": mk({
    title: "New York",
    intro:
      "US wealth capital with strong banker ecosystems and multi-office connectivity across the Americas.",
    currency: "USD",
    hiringPulse: [
      "Senior RMs with UHNW/HF/PE principals and portability.",
      "Alts syndication and bespoke credit in demand.",
      "Controls leadership (CCO/COO) for scale-ups.",
    ],
    comp: [
      { title: "Associate / VP", base: "150k–225k", bonus: "20–50%" },
      { title: "Director", base: "225k–350k", bonus: "30–120%" },
      { title: "Managing Director / Team Head", base: "350k–600k", bonus: "Performance-driven" },
    ],
    compNote: "Upper bands linked to > USD 300m portable AUM and strong unit economics.",
    ecosystem: {
      global: ["UBS", "JPM PB", "MS PWM", "GS PWM"],
      champions: ["Citi Private Bank", "Northern Trust Wealth Management"],
      boutiques: ["Multi-FOs & RIAs"],
    },
    trends: ["Direct/co-invest", "Tax/estate integration", "Platform M&A"],
  }),

  miami: mk({
    title: "Miami",
    intro:
      "US–LATAM bridge with fast-growing UHNW segment; strong inflows from hedge fund, tech, and LATAM families.",
    currency: "USD",
    hiringPulse: [
      "Bilingual RMs (EN/ES/PR) with portable UHNW from LATAM/US.",
      "Cross-border structuring and credit solutions prized.",
      "COO/Compliance for rapid platform scaling.",
    ],
    comp: [
      { title: "Associate / VP", base: "140k–210k", bonus: "20–45%" },
      { title: "Director", base: "210k–320k", bonus: "30–100%" },
      { title: "Managing Director / Team Head", base: "320k–500k", bonus: "Performance-driven" },
    ],
    compNote: "Upper bands linked to > USD 250m portable AUM; strong NNA.",
    ecosystem: {
      global: ["UBS", "JPM PB", "MS PWM", "GS PWM"],
      champions: ["BNY Mellon Wealth Management", "Northern Trust Wealth Management"],
      boutiques: ["FOs & RIAs", "International private banks"],
    },
    trends: ["LATAM inflows", "Tax migration to FL", "Family office build-outs"],
  }),
};

/* =========================================================
   Next.js plumbing
   ========================================================= */
export const dynamicParams = false;

export async function generateStaticParams() {
  return Object.keys(MARKETS).map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const info = MARKETS[city];
  if (!info) return { title: "Market — Executive Partners" };
  return {
    title: `${info.title} — Private Banking Market`,
    description: info.intro,
  };
}

/* =========================================================
   Helpers
   ========================================================= */
function championsHeading(city: string) {
  return city === "geneva" || city === "zurich" ? "Swiss champions" : "Local champions";
}
function dedupe(list?: string[]) {
  return Array.from(new Set(list ?? []));
}

/* =========================================================
   Page (stunning layout)
   ========================================================= */
export default async function MarketPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const data = MARKETS[city];

  if (!data) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-2xl font-semibold text-white">Market not found</h1>
        <p className="mt-4 text-white/70">Please return to the markets overview.</p>
        <div className="mt-6">
          <Link href="/markets" className="inline-block rounded-lg bg-white/10 px-4 py-2 text-sm hover:bg-white/15">
            View all markets
          </Link>
        </div>
      </main>
    );
  }

  const global = dedupe(data.ecosystem.global);
  const champions = dedupe(data.ecosystem.champions)?.filter((n) => !global.includes(n));
  const boutiques = dedupe(data.ecosystem.boutiques);

  return (
    <main className="relative">
      {/* Hero with subtle animated radial/linear gradient */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_-10%,rgba(16,185,129,0.25),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_80%_20%,rgba(6,182,212,0.18),transparent_60%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />
        </div>

        <div className="mx-auto max-w-6xl px-6 pt-12 md:pt-16">
          {/* Breadcrumbs */}
          <nav className="text-xs text-white/60">
            <Link href="/" className="hover:text-white/80">Home</Link>
            <span className="mx-1.5">/</span>
            <Link href="/markets" className="hover:text-white/80">Markets</Link>
            <span className="mx-1.5">/</span>
            <span className="text-white/80">{data.title}</span>
          </nav>

          <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">{data.title}</h1>
              <p className="mt-3 max-w-3xl text-base md:text-lg text-white/80">{data.intro}</p>
              {/* Trend pills if present */}
              {data.trends && data.trends.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {data.trends.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* City / currency chip group */}
            <div className="flex flex-col items-start md:items-end gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/90 ring-1 ring-inset ring-white/15">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                Active market
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs text-white/70 ring-1 ring-inset ring-white/10">
                Currency: <strong className="text-white/90">{data.currency}</strong>
              </span>
            </div>
          </div>

          {/* Quick CTAs */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400"
            >
              Apply Confidentially <IconArrow className="h-4 w-4" />
            </Link>
            <Link
              href="/hiring-managers"
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
            >
              Hire Talent <IconArrow className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Divider shimmer */}
        <div className="mx-auto mt-10 max-w-6xl px-6">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </section>

      {/* 3-column content grid */}
      <section className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Left column: Hiring pulse */}
          <div className="md:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/5 backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-white">Hiring pulse</h2>
            <ul className="mt-4 space-y-2">
              {data.hiringPulse.map((line, i) => (
                <li key={i} className="flex gap-3 text-white/85">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-300">
                    <IconCheck className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-white/80">{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right column: compact stats card */}
          <aside className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.03] p-6 ring-1 ring-white/5">
            <h3 className="text-sm font-semibold text-white/90">At a glance</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-white/60">Currency</span>
                <span className="rounded-md bg-white/10 px-2 py-1 text-white/85">{data.currency}</span>
              </div>
              {data.compNote && (
                <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-white/70">
                  {data.compNote}
                </div>
              )}
              <Link
                href="/jobs"
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs hover:bg-white/15"
              >
                View Jobs <IconArrow className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>

        {/* Compensation */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-white">
              Compensation <span className="text-white/60">(currency: {data.currency})</span>
            </h2>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {data.comp.map((b, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-5 ring-1 ring-white/5"
              >
                <div className="absolute inset-x-0 -top-24 h-32 bg-gradient-to-b from-emerald-400/10 to-transparent blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-0" />
                <div className="text-white/95 font-medium">{b.title}</div>
                <dl className="mt-3 space-y-1 text-sm">
                  <div className="flex justify-between text-white/80">
                    <dt>Base</dt>
                    <dd>{b.base}</dd>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <dt>Bonus</dt>
                    <dd>{b.bonus}</dd>
                  </div>
                </dl>
                {b.notes && (
                  <p className="mt-3 text-xs text-white/60">
                    {b.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Banking ecosystem */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/5">
          <h2 className="text-lg font-semibold text-white">Banking Ecosystem ({data.title})</h2>
          <div className="mt-5 grid gap-6 md:grid-cols-3">
            {global && global.length > 0 && (
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="text-sm font-medium text-white/90">Global</div>
                <ul className="mt-3 space-y-2 text-white/80">
                  {global.map((n) => (
                    <li key={n} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {champions && champions.length > 0 && (
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="text-sm font-medium text-white/90">{championsHeading(city)}</div>
                <ul className="mt-3 space-y-2 text-white/80">
                  {champions.map((n) => (
                    <li key={n} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {boutiques && boutiques.length > 0 && (
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="text-sm font-medium text-white/90">Boutiques &amp; FOs</div>
                <ul className="mt-3 space-y-2 text-white/80">
                  {boutiques.map((n) => (
                    <li key={n} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/70" />
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Inline trends (secondary) */}
          {data.trends && data.trends.length > 0 && (
            <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white/80">
              <span className="font-medium text-white/90">Trends: </span>
              {data.trends.join(" • ")}
            </div>
          )}
        </div>

        {/* Final CTAs */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/jobs" className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm hover:bg-white/15">
            View Jobs <IconArrow className="h-4 w-4" />
          </Link>
          <Link
            href="/hiring-managers"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400"
          >
            Hire Talent <IconArrow className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}