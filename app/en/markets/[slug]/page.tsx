// app/en/markets/[slug]/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { getMarket, MARKET_SLUGS, fmt } from "@/lib/markets/data";

// Next 15: params is async in server components
type Params = Promise<{ slug: string }>;
type Props = { params: Params };

export async function generateStaticParams() {
  return MARKET_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const m = getMarket(slug);
  if (!m) return { title: "Markets — Executive Partners" };
  return {
    title: `${m.city} — Private Banking Market | Executive Partners`,
    description: `${m.city}: compensation benchmarks, licensing, client base, relocation & tax, hiring pulse, ecosystem and book portability for Private Banking / Wealth Management.`,
    openGraph: {
      title: `${m.city} — Private Banking Market | Executive Partners`,
      description: m.summary,
      images: [{ url: m.heroImage }],
    },
  };
}

export default async function MarketPage({ params }: Props) {
  const { slug } = await params;
  const m = getMarket(slug);

  if (!m) {
    return (
      <main className="min-h-screen bg-[#0B0E13] text-white">
        <section className="mx-auto max-w-5xl px-6 py-16">
          <h1 className="text-2xl font-semibold">Market not found</h1>
          <p className="mt-4 text-neutral-300">
            The market you’re looking for doesn’t exist.{" "}
            <Link href="/en/markets" className="underline">
              See all markets
            </Link>
            .
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0E13] text-white">
      {/* ================= HERO ================= */}
      <section className="relative h-[44vh] min-h-[320px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${m.heroImage})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-[radial-gradient(900px_320px_at_10%_-10%,rgba(0,0,0,0.7),transparent_60%),linear-gradient(to_bottom,rgba(0,0,0,0.6),rgba(0,0,0,0.85))]" />
        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-end px-6 pb-10">
          <div className="max-w-3xl rounded-2xl bg-black/45 p-6 shadow-xl ring-1 ring-white/15 backdrop-blur-md md:p-8">
            <p className="mb-2 text-[11px] uppercase tracking-[0.25em] text-white/60">
              PRIVATE BANKING · {m.city.toUpperCase()}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Move your book to{" "}
              <span className="text-white/90">{m.city}</span> with confidence.
            </h1>
            <p className="mt-3 max-w-3xl text-sm text-neutral-200 md:text-base">
              {m.summary}
            </p>
          </div>
        </div>
      </section>

      {/* =============== CONTENT GRID =============== */}
      <section className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          {/* HIRING PULSE */}
          {m.hiringPulse && (
            <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 shadow-xl md:p-8">
              <header className="mb-5">
                <h2 className="text-xl font-semibold md:text-2xl">
                  Hiring Pulse
                </h2>
                {m.hiringPulse.notes && (
                  <p className="mt-2 text-sm text-neutral-300 md:text-base">
                    {m.hiringPulse.notes}
                  </p>
                )}
              </header>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-xl bg-black/30 p-4 ring-1 ring-white/10">
                  <div className="text-sm uppercase tracking-wide text-neutral-400">
                    Hot roles
                  </div>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {m.hiringPulse.hotRoles.map((r) => (
                      <li
                        key={r}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs md:text-sm"
                      >
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl bg-black/30 p-4 ring-1 ring-white/10">
                  <div className="text-sm uppercase tracking-wide text-neutral-400">
                    Hot skills
                  </div>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {m.hiringPulse.hotSkills.map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs md:text-sm"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          )}

          {/* AT A GLANCE */}
          {!!m.atAGlance?.length && (
            <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 shadow-xl md:p-8">
              <header className="mb-5">
                <h2 className="text-xl font-semibold md:text-2xl">
                  At a Glance
                </h2>
                <p className="mt-2 text-sm text-neutral-300 md:text-base">
                  High-signal facts to orient quickly in the {m.city} private
                  banking market.
                </p>
              </header>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {m.atAGlance.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl bg-black/30 p-4 ring-1 ring-white/10"
                  >
                    <div className="text-xs uppercase tracking-wide text-neutral-400">
                      {stat.label}
                    </div>
                    <div className="mt-1 text-lg font-semibold">
                      {stat.value}
                    </div>
                    {stat.hint && (
                      <div className="mt-1 text-xs text-neutral-400">
                        {stat.hint}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </article>
          )}

          {/* COMPENSATION TABLE */}
          <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 shadow-xl md:p-8">
            <header className="mb-5">
              <h2 className="text-xl font-semibold md:text-2xl">
                Compensation &amp; Bonus Benchmarks
              </h2>
              <p className="mt-2 text-sm text-neutral-300 md:text-base">
                Directional ranges for mid-senior Relationship Managers through
                team leadership. Actual offers vary by portable book, ROA,
                product mix and firm performance.
              </p>
            </header>
            <div className="overflow-x-auto rounded-xl ring-1 ring-white/10">
              <table className="min-w-full text-sm">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Role</th>
                    <th className="px-4 py-3 text-left font-medium">
                      Base (low)
                    </th>
                    <th className="px-4 py-3 text-left font-medium">
                      Base (high)
                    </th>
                    <th className="px-4 py-3 text-left font-medium">
                      Typical bonus
                    </th>
                    <th className="px-4 py-3 text-left font-medium">
                      Top-quartile note
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {m.compensation.map((row) => (
                    <tr key={row.role} className="hover:bg-white/5">
                      <td className="px-4 py-3">{row.role}</td>
                      <td className="px-4 py-3">{fmt(row.baseMin, m)}</td>
                      <td className="px-4 py-3">{fmt(row.baseMax, m)}</td>
                      <td className="px-4 py-3">{row.bonusPct}</td>
                      <td className="px-4 py-3 text-neutral-300">
                        {row.topQuartileNote ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          {/* LICENSING & COMPLIANCE */}
          <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 shadow-xl md:p-8">
            <header className="mb-4">
              <h2 className="text-xl font-semibold md:text-2xl">
                Licensing &amp; Compliance
              </h2>
              <p className="mt-2 text-sm text-neutral-300 md:text-base">
                Regulator, certifications and key compliance expectations for
                private bankers in {m.city}.
              </p>
            </header>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-xl bg-black/40 p-4 ring-1 ring-white/10">
                <div className="text-sm uppercase tracking-wide text-neutral-400">
                  Regulator
                </div>
                <div className="mt-1 text-base">{m.licensing.regulator}</div>
              </div>
              <div className="rounded-xl bg-black/40 p-4 ring-1 ring-white/10">
                <div className="text-sm uppercase tracking-wide text-neutral-400">
                  Must-have certifications
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-4">
                  {m.licensing.mustHaveCerts.map((c) => (
                    <li key={c} className="text-base">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {m.licensing.notes && (
              <p className="mt-4 text-sm text-neutral-300 md:text-base">
                {m.licensing.notes}
              </p>
            )}
          </article>

          {/* CLIENT BASE & SOURCING */}
          <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 shadow-xl md:p-8">
            <header className="mb-4">
              <h2 className="text-xl font-semibold md:text-2xl">
                Client Base &amp; Sourcing
              </h2>
              <p className="mt-2 text-sm text-neutral-300 md:text-base">
                Where growth typically comes from and what matters on the ground
                in {m.city}.
              </p>
            </header>
            <ul className="list-disc space-y-2 pl-5 text-base text-neutral-100">
              {m.clientBase.sourcing.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </article>

          {/* ================= PORTABILITY BY CITY ================= */}
          {slug === "geneva" && (
            <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 shadow-xl md:p-8">
              <header className="mb-4">
                <h2 className="text-xl font-semibold md:text-2xl">
                  Portability &amp; Book Characteristics in Geneva
                </h2>
              </header>
              <p className="max-w-3xl text-sm text-neutral-300 md:text-base">
                In Geneva, hiring committees are less impressed by headline AUM
                and more interested in the depth, quality and regulatory
                robustness of your relationships. Business cases that get
                approved usually combine demonstrable revenue with a credible
                new-money story and realistic ROA uplift.
              </p>
              <ul className="mt-4 max-w-3xl space-y-2 text-sm text-neutral-100 md:text-base">
                <li>
                  • <strong>Documented franchise:</strong> multi-year revenue
                  history, clear split by client and visibility on key
                  decision-makers (patriarch, next generation, trustees,
                  external advisors).
                </li>
                <li>
                  • <strong>Regulatory fit:</strong> a client base that can be
                  booked onshore in Switzerland or under a robust cross-border
                  model without grey-zone practices.
                </li>
                <li>
                  • <strong>Diversified wallet:</strong> mix of discretionary,
                  advisory, lending and structured solutions rather than purely
                  execution-only, price-driven books.
                </li>
                <li>
                  • <strong>Clear value-add at the new platform:</strong> better
                  product architecture, lending capacity, booking flexibility or
                  succession planning support that you can articulate client by
                  client.
                </li>
              </ul>
              <p className="mt-4 max-w-3xl text-sm text-neutral-300 md:text-base">
                We pressure-test portability assumptions before you meet a
                Geneva hiring panel so that the business case is realistic,
                defensible and aligned with the platform&apos;s risk appetite.
              </p>
            </article>
          )}

          {slug === "zurich" && (
            <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 shadow-xl md:p-8">
              <header className="mb-4">
                <h2 className="text-xl font-semibold md:text-2xl">
                  Portability &amp; Book Characteristics in Zurich
                </h2>
              </header>
              <p className="max-w-3xl text-sm text-neutral-300 md:text-base">
                In Zurich, platforms typically look for onshore, Swiss-domiciled
                or clearly booked DACH/EMEA books with transparent revenue and
                strong balance-sheet usage. Committees focus on the resilience
                of the franchise and how it fits the Swiss onshore growth
                strategy.
              </p>
              <ul className="mt-4 max-w-3xl space-y-2 text-sm text-neutral-100 md:text-base">
                <li>
                  • <strong>Onshore relevance:</strong> a material share of
                  clients that can be booked in Switzerland or serviced from
                  Zurich under a clean cross-border framework.
                </li>
                <li>
                  • <strong>Entrepreneur &amp; corporate owners:</strong> clear
                  links to operating businesses, holding structures and
                  succession planning rather than purely financial wealth.
                </li>
                <li>
                  • <strong>Balanced use of the balance sheet:</strong> Lombard,
                  mortgages and structured lending alongside investments, not
                  purely custody-only relationships.
                </li>
                <li>
                  • <strong>Fee and ROA quality:</strong> stable recurring
                  revenue, limited single-line concentration and realistic ROA
                  once pricing is aligned to the new platform.
                </li>
              </ul>
              <p className="mt-4 max-w-3xl text-sm text-neutral-300 md:text-base">
                We build Zurich business cases around documented revenue,
                lending usage and a concrete migration plan, so that internal
                risk and credit teams can support the move.
              </p>
            </article>
          )}

          {slug === "dubai" && (
            <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 shadow-xl md:p-8">
              <header className="mb-4">
                <h2 className="text-xl font-semibold md:text-2xl">
                  Portability &amp; Book Characteristics in Dubai
                </h2>
              </header>
              <p className="max-w-3xl text-sm text-neutral-300 md:text-base">
                In Dubai, serious private banking franchises are built around
                clean, well-documented GCC, wider Middle East and NRI wealth
                that can be booked in the DIFC or ADGM, or in established
                offshore centres linked to the region. Committees look for
                robust source-of-wealth files and long-term relationships, not
                purely transactional flows.
              </p>
              <ul className="mt-4 max-w-3xl space-y-2 text-sm text-neutral-100 md:text-base">
                <li>
                  • <strong>Regulatory clarity:</strong> clients that fit within
                  DFSA/FSRA frameworks with up-to-date KYC, CRS/FATCA status and
                  clean booking structures.
                </li>
                <li>
                  • <strong>Entrepreneur &amp; real-asset links:</strong> clear
                  ties to operating businesses, real estate and family holdings,
                  with visibility on controllers and beneficiaries.
                </li>
                <li>
                  • <strong>Multi-booking capability:</strong> ability to
                  allocate assets between UAE, Switzerland, Singapore or other
                  centres depending on product, leverage and tax considerations.
                </li>
                <li>
                  • <strong>Sticky, advisory-led revenue:</strong> recurring
                  fees from mandates, lending and solutions rather than purely
                  structured-product churn.
                </li>
              </ul>
              <p className="mt-4 max-w-3xl text-sm text-neutral-300 md:text-base">
                We help position Dubai books to show how they travel across
                booking centres while remaining fully aligned with regional
                regulatory expectations.
              </p>
            </article>
          )}

          {slug === "singapore" && (
            <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 shadow-xl md:p-8">
              <header className="mb-4">
                <h2 className="text-xl font-semibold md:text-2xl">
                  Portability &amp; Book Characteristics in Singapore
                </h2>
              </header>
              <p className="max-w-3xl text-sm text-neutral-300 md:text-base">
                In Singapore, platforms focus on clearly segmented ASEAN and
                North Asia books that can be booked under MAS rules or paired
                with Hong Kong and offshore centres. Committees scrutinise the
                substance of client ties and how the relationship would survive
                a change of platform.
              </p>
              <ul className="mt-4 max-w-3xl space-y-2 text-sm text-neutral-100 md:text-base">
                <li>
                  • <strong>Residency &amp; tax profile:</strong> clear view on
                  client domicile, tax residency and preferred booking location
                  (Singapore, Hong Kong, Switzerland or offshore).
                </li>
                <li>
                  • <strong>Family and corporate structures:</strong> links
                  between operating businesses, holding companies and family
                  governance are mapped and understood.
                </li>
                <li>
                  • <strong>Diversified currency &amp; product mix:</strong>{" "}
                  meaningful allocation across currencies, mandates, deposits,
                  lending and structured solutions rather than single-theme
                  portfolios.
                </li>
                <li>
                  • <strong>Succession &amp; next-gen angle:</strong> ability to
                  demonstrate why a new Singapore platform is better placed to
                  support cross-border family dynamics over the next 5–10 years.
                </li>
              </ul>
              <p className="mt-4 max-w-3xl text-sm text-neutral-300 md:text-base">
                We translate Asia-focused books into business cases that
                resonate with Singapore investment, risk and compliance
                committees.
              </p>
            </article>
          )}

          {slug === "london" && (
            <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 shadow-xl md:p-8">
              <header className="mb-4">
                <h2 className="text-xl font-semibold md:text-2xl">
                  Portability &amp; Book Characteristics in London
                </h2>
              </header>
              <p className="max-w-3xl text-sm text-neutral-300 md:text-base">
                In London, private banking franchises are judged on the depth of
                their UK-resident and international client base, the quality of
                advice under FCA rules and the sustainability of fee income.
                Committees expect a clear articulation of suitability standards
                and how those will map to the new platform.
              </p>
              <ul className="mt-4 max-w-3xl space-y-2 text-sm text-neutral-100 md:text-base">
                <li>
                  • <strong>Advisory track record:</strong> documented
                  recommendations, portfolio reviews and suitability files that
                  can withstand regulatory scrutiny.
                </li>
                <li>
                  • <strong>UK and international split:</strong> transparent
                  view on which clients are UK-domiciled, UK-resident but
                  non-dom, or fully international, and how they are currently
                  booked.
                </li>
                <li>
                  • <strong>Fee-based revenue:</strong> mandates and advice fees
                  that continue post-transfer, not only one-off transactions.
                </li>
                <li>
                  • <strong>Institutional-grade process:</strong> evidence of
                  investment committee usage, model portfolios and risk
                  management rather than purely bespoke, undocumented deals.
                </li>
              </ul>
              <p className="mt-4 max-w-3xl text-sm text-neutral-300 md:text-base">
                We frame London moves around advice quality, recurring revenue
                and a clear compliance narrative, which is what FCA-supervised
                platforms expect.
              </p>
            </article>
          )}

          {slug === "hong-kong" && (
            <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 shadow-xl md:p-8">
              <header className="mb-4">
                <h2 className="text-xl font-semibold md:text-2xl">
                  Portability &amp; Book Characteristics in Hong Kong
                </h2>
              </header>
              <p className="max-w-3xl text-sm text-neutral-300 md:text-base">
                In Hong Kong, books are often more trading-oriented with strong
                North Asia exposure. Platforms look for evidence that revenue is
                not purely event-driven but anchored in durable relationships
                and a robust SFC-compliant advisory process.
              </p>
              <ul className="mt-4 max-w-3xl space-y-2 text-sm text-neutral-100 md:text-base">
                <li>
                  • <strong>Cross-border framework:</strong> clear view on how
                  Mainland China and regional clients are covered under
                  cross-border and outbound investment rules.
                </li>
                <li>
                  • <strong>Product governance:</strong> documented processes
                  around structured products, IPO allocations and leveraged
                  trades.
                </li>
                <li>
                  • <strong>Resilient revenue mix:</strong> blend of recurring
                  fees and activity-based income, rather than fully
                  transaction-only books.
                </li>
                <li>
                  • <strong>Booking flexibility:</strong> ability to park assets
                  across Hong Kong, Singapore and offshore depending on client
                  profile and regulatory requirements.
                </li>
              </ul>
              <p className="mt-4 max-w-3xl text-sm text-neutral-300 md:text-base">
                We help articulate Hong Kong books in terms of durable client
                franchises, not just recent trading P&amp;L.
              </p>
            </article>
          )}

          {slug === "new-york" && (
            <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 shadow-xl md:p-8">
              <header className="mb-4">
                <h2 className="text-xl font-semibold md:text-2xl">
                  Portability &amp; Book Characteristics in New York
                </h2>
              </header>
              <p className="max-w-3xl text-sm text-neutral-300 md:text-base">
                In New York, wealth franchises are evaluated primarily on their
                US-taxable client base, adherence to SEC/FINRA requirements and
                the depth of planning relationships. Committees want to see
                clear documentation of advisory processes and household-level
                balance sheets.
              </p>
              <ul className="mt-4 max-w-3xl space-y-2 text-sm text-neutral-100 md:text-base">
                <li>
                  • <strong>Household view:</strong> consolidated picture of
                  assets, liabilities and entities across the family tree, not
                  only single accounts.
                </li>
                <li>
                  • <strong>Planning-led revenue:</strong> fee-based advisory
                  and managed accounts that will follow the banker to the new
                  platform.
                </li>
                <li>
                  • <strong>Compliance history:</strong> clean U4/U5 record and
                  evidence of strong supervision and documentation.
                </li>
                <li>
                  • <strong>LatAm and global links:</strong> where relevant, a
                  clear framework for cross-border coverage of non-US family
                  members and structures.
                </li>
              </ul>
              <p className="mt-4 max-w-3xl text-sm text-neutral-300 md:text-base">
                We present New York moves in a language that resonates with US
                market heads, risk and legal.
              </p>
            </article>
          )}

          {slug === "miami" && (
            <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 shadow-xl md:p-8">
              <header className="mb-4">
                <h2 className="text-xl font-semibold md:text-2xl">
                  Portability &amp; Book Characteristics in Miami
                </h2>
              </header>
              <p className="max-w-3xl text-sm text-neutral-300 md:text-base">
                Miami is a hybrid hub: US-taxable wealth sits alongside
                LatAm-focused international books. Hiring committees examine how
                well structured the LatAm relationships are and whether revenue
                is resilient through cycles and political regimes.
              </p>
              <ul className="mt-4 max-w-3xl space-y-2 text-sm text-neutral-100 md:text-base">
                <li>
                  • <strong>Jurisdiction mapping:</strong> clear breakdown of
                  clients by country, residency and booking centre, with an
                  honest view on political and FX risk.
                </li>
                <li>
                  • <strong>Onshore/offshore balance:</strong> transparent split
                  between US-booked assets and international bookings (Caribbean,
                  Switzerland, elsewhere).
                </li>
                <li>
                  • <strong>Family-controlled corporate wealth:</strong> links
                  to operating companies, trade flows and local banking
                  relationships.
                </li>
                <li>
                  • <strong>Regulatory discipline:</strong> evidence that
                  cross-border marketing rules and anti-corruption policies are
                  embedded in day-to-day practice.
                </li>
              </ul>
              <p className="mt-4 max-w-3xl text-sm text-neutral-300 md:text-base">
                We help LatAm &amp; US books out of Miami tell a credible,
                risk-aware story that stands up to North American governance
                standards.
              </p>
            </article>
          )}

          {slug === "paris" && (
            <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 shadow-xl md:p-8">
              <header className="mb-4">
                <h2 className="text-xl font-semibold md:text-2xl">
                  Portability &amp; Book Characteristics in Paris
                </h2>
              </header>
              <p className="max-w-3xl text-sm text-neutral-300 md:text-base">
                In Paris, books are typically anchored in French-resident
                entrepreneurs, executives and family groups, often with complex
                tax and legal constraints. Platforms assess how portable those
                relationships are in a MiFID II and French tax environment.
              </p>
              <ul className="mt-4 max-w-3xl space-y-2 text-sm text-neutral-100 md:text-base">
                <li>
                  • <strong>Alignment with local tax rules:</strong> clear view
                  on wealth-tax exposure, holding-company structures and life
                  insurance usage.
                </li>
                <li>
                  • <strong>Corporate links:</strong> strong ties to operating
                  businesses, listed shareholdings and private equity positions.
                </li>
                <li>
                  • <strong>Discretionary &amp; advisory mandates:</strong>{" "}
                  documented investment processes compatible with MiFID II
                  requirements.
                </li>
                <li>
                  • <strong>Cross-border angle:</strong> ability to service
                  French families with assets or residency ties in Switzerland,
                  Luxembourg or other EU hubs.
                </li>
              </ul>
              <p className="mt-4 max-w-3xl text-sm text-neutral-300 md:text-base">
                We structure Paris business cases around documented advice and
                tight coordination with local tax, legal and insurance partners.
              </p>
            </article>
          )}

          {slug === "milan" && (
            <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 shadow-xl md:p-8">
              <header className="mb-4">
                <h2 className="text-xl font-semibold md:text-2xl">
                  Portability &amp; Book Characteristics in Milan
                </h2>
              </header>
              <p className="max-w-3xl text-sm text-neutral-300 md:text-base">
                In Milan, many private banking relationships are tied to
                family-owned industrial and services businesses. Committees look
                for bankers who sit close to decision-makers and can document
                both personal and corporate wallet share.
              </p>
              <ul className="mt-4 max-w-3xl space-y-2 text-sm text-neutral-100 md:text-base">
                <li>
                  • <strong>Entrepreneurial ownership:</strong> clear mapping of
                  shareholdings, governance structures and succession plans.
                </li>
                <li>
                  • <strong>Integrated banking:</strong> evidence that the
                  banker influences both private and corporate banking
                  relationships (FX, trade, lending).
                </li>
                <li>
                  • <strong>Mandates &amp; bancassurance:</strong> recurring
                  fees from mandates, insurance wrappers and retirement
                  solutions.
                </li>
                <li>
                  • <strong>Cross-border optionality:</strong> ability to link
                  Italian wealth to Swiss or Luxembourg booking centres where
                  appropriate and compliant.
                </li>
              </ul>
              <p className="mt-4 max-w-3xl text-sm text-neutral-300 md:text-base">
                We position Milan books by quantifying both private and
                corporate potential, which is how Italian platforms think.
              </p>
            </article>
          )}

          {slug === "lisbon" && (
            <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 shadow-xl md:p-8">
              <header className="mb-4">
                <h2 className="text-xl font-semibold md:text-2xl">
                  Portability &amp; Book Characteristics in Lisbon
                </h2>
              </header>
              <p className="max-w-3xl text-sm text-neutral-300 md:text-base">
                Lisbon has grown as a hub for entrepreneurs, expats and
                relocated families, often combining local structures with
                international holdings. Committees want clarity on residency,
                tax status and how much of the wealth can genuinely move with
                the banker.
              </p>
              <ul className="mt-4 max-w-3xl space-y-2 text-sm text-neutral-100 md:text-base">
                <li>
                  • <strong>Residency programmes:</strong> clear mapping of
                  clients who arrived via golden-visa or other residency
                  schemes, and how their structures evolved.
                </li>
                <li>
                  • <strong>Local vs. international assets:</strong> split
                  between Portuguese banked assets and those held in other EU or
                  offshore centres.
                </li>
                <li>
                  • <strong>Planning relationships:</strong> links to tax,
                  legal and real-estate advisers that make the relationship
                  sticky.
                </li>
                <li>
                  • <strong>Succession &amp; relocation angle:</strong> ability
                  to support further moves (for example back to core EU or
                  Switzerland) while keeping the wallet.
                </li>
              </ul>
              <p className="mt-4 max-w-3xl text-sm text-neutral-300 md:text-base">
                We position Lisbon books as long-term European wealth planning
                franchises, not just one-off relocation stories.
              </p>
            </article>
          )}

          {/* Generic fallback if none of the specific cities above matched */}
          {![
            "geneva",
            "zurich",
            "dubai",
            "singapore",
            "london",
            "hong-kong",
            "new-york",
            "miami",
            "paris",
            "milan",
            "lisbon",
          ].includes(slug) && (
            <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 shadow-xl md:p-8">
              <header className="mb-4">
                <h2 className="text-xl font-semibold md:text-2xl">
                  Portability &amp; Book Characteristics
                </h2>
              </header>
              <p className="max-w-3xl text-sm text-neutral-300 md:text-base">
                Portability into {m.city} depends less on headline AUM and more
                on the depth, quality and regulatory fit of your client
                relationships. Platforms tend to prioritise books that combine
                stable revenue with a credible growth story.
              </p>
              <ul className="mt-4 max-w-3xl space-y-2 text-sm text-neutral-100 md:text-base">
                <li>
                  • <strong>Well documented:</strong> clear revenue history,
                  stable contact network and transparency on decision-makers.
                </li>
                <li>
                  • <strong>Regulatory fit:</strong> clients that can be booked
                  locally or via a compliant cross-border framework.
                </li>
                <li>
                  • <strong>Diversified wallets:</strong> mix of discretionary,
                  advisory, lending and solutions rather than single-product,
                  price-only relationships.
                </li>
                <li>
                  • <strong>Value-add story:</strong> situations where the
                  target platform demonstrably improves product access, credit,
                  execution or succession planning for your clients.
                </li>
              </ul>
              <p className="mt-4 max-w-3xl text-sm text-neutral-300 md:text-base">
                Our role is to refine these assumptions with you so the business
                case stands up in approvals and reflects how your book would
                behave under a realistic transition scenario.
              </p>
            </article>
          )}

          {/* BANKING ECOSYSTEM – TOP PLATFORMS, BOOKING CENTRES, EAMs */}
          {m.ecosystem && (
            <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 shadow-xl md:p-8">
              <header className="mb-4">
                <h2 className="text-xl font-semibold md:text-2xl">
                  Banking Ecosystem in {m.city}
                </h2>
                <p className="mt-2 text-sm text-neutral-300 md:text-base">
                  Key booking centres, leading private banking platforms and the
                  independent wealth ecosystem you will interact with if you
                  move your book to {m.city}.
                </p>
              </header>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-xl bg-black/30 p-4 ring-1 ring-white/10">
                  <div className="text-sm uppercase tracking-wide text-neutral-400">
                    Booking / execution
                  </div>
                  <ul className="mt-2 space-y-1 text-sm md:text-base">
                    {m.ecosystem.bookingCentres.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl bg-black/30 p-4 ring-1 ring-white/10">
                  <div className="text-sm uppercase tracking-wide text-neutral-400">
                    Key private banking platforms
                  </div>
                  <ul className="mt-2 space-y-1 text-sm md:text-base">
                    {m.ecosystem.keyBanks.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl bg-black/30 p-4 ring-1 ring-white/10">
                  <div className="text-sm uppercase tracking-wide text-neutral-400">
                    EAMs &amp; family offices
                  </div>
                  <ul className="mt-2 space-y-1 text-sm md:text-base">
                    {m.ecosystem.eamsAndFOs.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                  <div className="mt-4 text-xs text-neutral-400 md:text-sm">
                    Regulators: {m.ecosystem.regulators.join(" • ")}
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* RELOCATION & TAX */}
          <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 shadow-xl md:p-8">
            <header className="mb-4">
              <h2 className="text-xl font-semibold md:text-2xl">
                Relocation &amp; Tax
              </h2>
            </header>
            <p className="max-w-3xl text-base text-neutral-200">
              {m.relocation.oneParagraph}
            </p>
            <div className="mt-4">
              <a
                href={m.relocation.officialLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm ring-1 ring-white/20 transition hover:bg-white/20"
              >
                {m.relocation.officialLinkLabel} ↗
              </a>
            </div>
          </article>

          {/* CTAS – CANDIDATES & HIRING MANAGERS */}
          <article className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#1b1b1f] via-[#1b222b] to-[#111317] p-6 shadow-2xl ring-1 ring-white/10 md:p-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold md:text-xl">
                  For Private Bankers in {m.city}
                </h3>
                <p className="text-sm text-neutral-200 md:text-base">
                  Share a high-level overview of your book, ROA and target
                  platform profile. We only approach institutions where your
                  franchise is genuinely strategic.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/en/private-banker-jobs/${slug}`}
                    className="inline-flex items-center rounded-full bg-[#D4AF37] px-5 py-2.5 text-sm font-medium text-black transition hover:bg-[#f5d778]"
                  >
                    View {m.city} Private Banker jobs
                  </Link>
                  <Link
                    href="/en/apply"
                    className="inline-flex items-center rounded-full border border-white/40 px-5 py-2.5 text-sm font-medium text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  >
                    Apply confidentially
                  </Link>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold md:text-xl">
                  For Hiring Managers
                </h3>
                <p className="text-sm text-neutral-200 md:text-base">
                  We provide calibrated market mapping, vetted shortlists with
                  real portability and structured business cases that stand up
                  in internal approvals.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/en/hiring-managers"
                    className="inline-flex items-center rounded-full border border-white/40 px-5 py-2.5 text-sm font-medium text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  >
                    Brief a mandate
                  </Link>
                  <Link
                    href="/en/contact"
                    className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium text-white/80 transition hover:text-[#D4AF37]"
                  >
                    Contact Executive Partners
                  </Link>
                </div>
              </div>
            </div>
          </article>

          {/* LEGAL DISCLAIMER */}
          {m.legalDisclaimer && (
            <p className="rounded-2xl border border-white/10 bg-black/30 p-4 text-xs text-neutral-400">
              {m.legalDisclaimer}
            </p>
          )}

          {/* BACK LINK */}
          <div className="pt-2">
            <Link
              href="/en/markets"
              className="text-sm text-neutral-300 underline hover:text-white"
            >
              ← All markets
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}