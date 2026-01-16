// app/components/CityRecruiterPage.tsx
import Link from "next/link";

type CompRow = {
  level: string;
  baseRange: string;
  bonusRange: string;
  totalRange: string;
};

type InsightLink = {
  label: string;
  href: string;
};

type RelatedCity = {
  label: string;
  href: string;
};

type CityRecruiterPageProps = {
  city: string;
  country: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroIntro: string;
  bulletPoints: string[];
  marketSummary: string;
  compCurrency: string;
  compRows: CompRow[];
  bookingCentres: string[];
  desksCovered: string[];
  pdfHref: string;
  insightsLinks: InsightLink[];
  relatedCities?: RelatedCity[];
};

export default function CityRecruiterPage(props: CityRecruiterPageProps) {
  const {
    city,
    country,
    heroEyebrow,
    heroTitle,
    heroSubtitle,
    heroIntro,
    bulletPoints,
    marketSummary,
    compCurrency,
    compRows,
    bookingCentres,
    desksCovered,
    pdfHref,
    insightsLinks,
    relatedCities,
  } = props;

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 text-white">
      {/* HERO */}
      <section className="mb-12 rounded-3xl border border-white/10 bg-black/40 p-8 shadow-[0_18px_50px_rgba(0,0,0,0.75)] backdrop-blur md:p-10">
        <p className="eyebrow text-[#F5D778]">{heroEyebrow}</p>
        <h1 className="mt-4 text-3xl font-semibold md:text-4xl">
          {heroTitle}
        </h1>
        <p className="mt-2 text-sm text-neutral-300 md:text-base">
          {heroSubtitle}
        </p>
        <p className="mt-4 text-sm text-neutral-300 md:text-[0.95rem] leading-relaxed">
          {heroIntro}
        </p>

        {/* bullets */}
        <ul className="mt-5 grid gap-2 text-sm text-neutral-200 md:grid-cols-2">
          {bulletPoints.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-[0.3rem] h-1.5 w-1.5 rounded-full bg-[#F5D778]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* GRID: market + comp table */}
      <section className="grid gap-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] mb-10">
        {/* Market summary */}
        <div className="rounded-3xl border border-white/10 bg-black/40 p-6 md:p-7">
          <h2 className="text-lg font-semibold text-neutral-50">
            Market snapshot – {city}, {country}
          </h2>
          <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
            {marketSummary}
          </p>

          <div className="mt-5 grid gap-4 text-sm text-neutral-200 md:grid-cols-2">
            <div>
              <h3 className="text-[13px] font-semibold text-neutral-100 uppercase tracking-wide">
                Main booking centres
              </h3>
              <ul className="mt-2 space-y-1.5 text-xs md:text-[13px]">
                {bookingCentres.map((bc) => (
                  <li key={bc}>• {bc}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[13px] font-semibold text-neutral-100 uppercase tracking-wide">
                Desks we cover
              </h3>
              <ul className="mt-2 space-y-1.5 text-xs md:text-[13px]">
                {desksCovered.map((desk) => (
                  <li key={desk}>• {desk}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Compensation table */}
        <div className="rounded-3xl border border-white/10 bg-black/40 p-6 md:p-7">
          <h2 className="text-lg font-semibold text-neutral-50">
            Indicative compensation – {city}
          </h2>
          <p className="mt-2 text-xs text-neutral-400">
            Ranges in {compCurrency}, based on recent mandates and offer
            letters. Exact packages depend on platform, role design and
            P&amp;L.
          </p>

          <div className="mt-4 space-y-3 text-xs md:text-[13px]">
            {compRows.map((row) => (
              <div
                key={row.level}
                className="rounded-2xl border border-white/10 bg-white/5 p-3"
              >
                <div className="font-semibold text-neutral-50">
                  {row.level}
                </div>
                <div className="mt-1 text-neutral-300">
                  Base: <span className="font-medium">{row.baseRange}</span>
                </div>
                <div className="text-neutral-300">
                  Bonus:{" "}
                  <span className="font-medium">{row.bonusRange}</span>
                </div>
                <div className="text-neutral-300">
                  Typical total:{" "}
                  <span className="font-medium">{row.totalRange}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-3 text-[11px] text-neutral-500">
            Source: Executive Partners market conversations with hiring
            managers, 2024–2025. Not a guarantee of future offers.
          </p>
        </div>
      </section>

      {/* RELATED ARTICLES + PDF + CTA ROW */}
      <section className="space-y-6">
        {/* Related + PDF in a 2-column grid, perfectly aligned */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Related insights */}
          <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-black/40 p-6 md:p-7">
            <h3 className="text-sm font-semibold text-neutral-50">
              Related Private Wealth Pulse articles
            </h3>
            <p className="mt-2 text-xs text-neutral-400">
              Explore recent analysis on UBS, Credit Suisse, AI cuts and
              global private banking talent flows.
            </p>
            <ul className="mt-4 space-y-1.5 text-sm">
              {insightsLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#F5D778] hover:text-[#FFE9A6] underline-offset-2 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {relatedCities && relatedCities.length > 0 && (
              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="text-xs font-semibold text-neutral-300">
                  Other key hubs we cover:
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  {relatedCities.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1 hover:bg-white/10"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Career Intelligence PDF */}
          <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-black/40 p-6 md:p-7">
            <h3 className="text-sm font-semibold text-neutral-50">
              Private Banking Career Intelligence 2026
            </h3>
            <p className="mt-2 text-xs text-neutral-400">
              Download our fact-checked 2025 benchmarks for senior
              Relationship Managers and Market Leaders across {city},{" "}
              Switzerland, the UK, US, Dubai, Singapore and Hong Kong.
            </p>

            <div className="mt-4">
              <a
                href={pdfHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-xl w-full sm:w-auto"
              >
                Download Career Intelligence 2026 (PDF)
              </a>
            </div>

            <p className="mt-3 text-[11px] text-neutral-500">
              Methodology based on verified mandates, offer letters and
              compensation discussions with hiring managers.
            </p>
          </div>
        </div>

        {/* CTA card – aligned with grid above */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="md:col-start-2 flex h-full flex-col rounded-3xl border border-white/10 bg-black/40 p-6 md:p-7">
            <h3 className="text-sm font-semibold text-neutral-50">
              Work with a specialist {city} recruiter
            </h3>
            <p className="mt-2 text-xs text-neutral-400">
              Executive Partners is an executive search boutique focused on
              Private Banking &amp; Wealth Management. From {city}, we
              support senior hires across onshore {country} and key booking
              centres worldwide.
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-neutral-300">
              <li>• Senior RMs, Desk Heads &amp; Market Leaders</li>
              <li>• Discreet outreach to target platforms</li>
              <li>• AUM portability &amp; booking-centre fit assessment</li>
              <li>• Compensation benchmarking for your next move</li>
            </ul>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/apply"
                className="btn btn-primary btn-xl w-full sm:w-auto"
              >
                Submit your profile
              </Link>
              <Link
                href="/contact"
                className="btn btn-ghost w-full text-sm sm:w-auto"
              >
                Speak with a specialist recruiter
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}