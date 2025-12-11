// app/en/markets/[slug]/page.tsx
import type { Metadata } from "next";
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

  // Geneva gets a richer, fully custom SEO treatment
  if (slug === "geneva") {
    return {
      title:
        "Geneva Private Banking Market | Compensation, Licensing & Hiring Trends",
      description:
        "Comprehensive market insights for Private Bankers in Geneva: compensation benchmarks, licensing rules, hiring trends, key banks and why senior RMs move their books to Switzerland’s most established wealth hub.",
      alternates: {
        canonical: "/en/markets/geneva",
      },
      openGraph: {
        type: "article",
        url: "/en/markets/geneva",
        title: "Geneva Private Banking Market | Executive Partners",
        description:
          "Geneva’s private banking ecosystem explained: UHNW flows, hiring trends, compensation ranges, market expectations and cross-border rules.",
        siteName: "Executive Partners",
      },
      robots: { index: true, follow: true },
    };
  }

  const m = getMarket(slug);
  if (!m) {
    return {
      title: "Private Banking Markets | Executive Partners",
      description:
        "Directional compensation benchmarks, licensing frameworks, hiring pulse and ecosystem snapshots for leading private banking hubs.",
      alternates: {
        canonical: "/en/markets",
      },
      robots: { index: false, follow: true },
    };
  }

  return {
    title: `${m.city} — Private Banking Market | Executive Partners`,
    description: `${m.city}: compensation benchmarks, licensing, client base, relocation & tax, hiring pulse, ecosystem and book portability for Private Banking / Wealth Management.`,
    alternates: {
      canonical: `/en/markets/${slug}`,
    },
    openGraph: {
      type: "article",
      url: `/en/markets/${slug}`,
      title: `${m.city} — Private Banking Market | Executive Partners`,
      description: m.summary,
      images: [{ url: m.heroImage }],
      siteName: "Executive Partners",
    },
    robots: { index: true, follow: true },
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

          {/* ======= WHY PRIVATE BANKERS MOVE TO {CITY} (PER CITY SEO BLOCK) ======= */}
          <WhyMoveBlock slug={slug} city={m.city} />

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
                  <Link
                    href={`/bp-simulator?src=${slug}_market`}
                    className="inline-flex items-center rounded-full border border-[#D4AF37]/60 px-5 py-2.5 text-sm font-medium text-[#F4D270] transition hover:bg-[#D4AF37]/10"
                  >
                    Run Business Plan Simulator
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

/* ========= CITY-SPECIFIC “WHY MOVE” SEO BLOCK ========= */

function WhyMoveBlock({ slug, city }: { slug: string; city: string }) {
  switch (slug) {
    case "geneva":
      return (
        <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 shadow-xl md:p-8">
          <header className="mb-4">
            <h2 className="text-xl font-semibold md:text-2xl">
              Why Private Bankers Move to Geneva
            </h2>
          </header>
          <p className="max-w-3xl text-sm text-neutral-300 md:text-base">
            Geneva remains one of the most established wealth hubs globally: a
            AAA-rated country, a predictable regulatory framework and a deep
            pool of international UHNW families who still value Switzerland for
            stability, discretion and booking flexibility. Senior Relationship
            Managers who move here typically want a stronger platform for
            complex cross-border clients and a safer home for large
            multi-jurisdictional books.
          </p>
          <p className="mt-3 max-w-3xl text-sm text-neutral-300 md:text-base">
            The most attractive platforms in Geneva combine a recognised brand,
            open-architecture investment offering, strong lending capacity and
            the ability to coordinate with external lawyers, trustees and tax
            advisers. For many senior RMs, that translates into better client
            outcomes and higher probability that key households will follow
            them.
          </p>
          <ul className="mt-4 max-w-3xl space-y-2 text-sm text-neutral-100 md:text-base">
            <li>
              • <strong>Deep, diverse client base:</strong> Swiss-domiciled
              families, international entrepreneurs, LatAm, Middle East and
              European wealth all booking assets in Switzerland.
            </li>
            <li>
              • <strong>Multi-booking-centre reach:</strong> ability to combine
              Geneva booking with Zurich, Dubai, Singapore or offshore centres
              within one platform.
            </li>
            <li>
              • <strong>Career longevity:</strong> Geneva market heads and
              platform leaders tend to think in 5–10 year horizons, which suits
              bankers building long-term franchises.
            </li>
            <li>
              • <strong>Lifestyle &amp; family set-up:</strong> safe city,
              international schools and proximity to the Alps make Geneva
              attractive for families relocating from London, Paris or emerging
              markets.
            </li>
          </ul>
          <p className="mt-4 max-w-3xl text-sm text-neutral-300 md:text-base">
            If you want to explore{" "}
            <Link
              href="/en/private-banker-jobs/geneva"
              className="text-[#F4D270] underline underline-offset-2"
            >
              current Geneva private banker jobs
            </Link>
            , you can start with a high-level conversation rather than a formal
            application. You can also share your profile via the{" "}
            <Link
              href="/en/candidates"
              className="text-[#F4D270] underline underline-offset-2"
            >
              candidates hub
            </Link>{" "}
            or{" "}
            <Link
              href="/en/contact"
              className="text-[#F4D270] underline underline-offset-2"
            >
              speak directly to a Geneva-based recruiter
            </Link>
            . Before you engage with a platform, you can also model a move using
            our{" "}
            <Link
              href="/bp-simulator?src=geneva_market"
              className="text-[#F4D270] underline underline-offset-2"
            >
              Business Plan Simulator
            </Link>{" "}
            to test revenue, ROA and portability assumptions.
          </p>
        </article>
      );

    case "zurich":
      return (
        <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 shadow-xl md:p-8">
          <header className="mb-4">
            <h2 className="text-xl font-semibold md:text-2xl">
              Why Private Bankers Move to Zurich
            </h2>
          </header>
          <p className="max-w-3xl text-sm text-neutral-300 md:text-base">
            Zurich is the core Swiss onshore hub, with a strong concentration of
            Swiss-domiciled entrepreneurs, executives and multi-banking UHNW
            clients. For many senior RMs, Zurich offers closer proximity to
            decision-makers, corporate balance sheets and lending committees,
            especially in DACH and broader EMEA.
          </p>
          <p className="mt-3 max-w-3xl text-sm text-neutral-300 md:text-base">
            Platforms in Zurich typically combine robust Swiss onshore coverage
            with access to international booking centres, structured lending and
            institutional-grade investment capabilities. That combination makes
            it easier to capture a larger share of the client wallet and support
            both private and corporate banking needs from one hub.
          </p>
          <ul className="mt-4 max-w-3xl space-y-2 text-sm text-neutral-100 md:text-base">
            <li>
              • <strong>Onshore growth focus:</strong> Swiss-resident and DACH
              clients are prioritised, with clear visibility on tax and
              regulatory status.
            </li>
            <li>
              • <strong>Corporate connectivity:</strong> strong links between
              private banking and corporate / investment banking arms for
              entrepreneurs and business owners.
            </li>
            <li>
              • <strong>High governance standards:</strong> committees focus on
              well-documented advisory processes and prudent lending usage.
            </li>
            <li>
              • <strong>Quality of life:</strong> a stable, high-income city
              with strong infrastructure and international schooling options.
            </li>
          </ul>
          <p className="mt-4 max-w-3xl text-sm text-neutral-300 md:text-base">
            To explore{" "}
            <Link
              href="/en/private-banker-jobs/zurich"
              className="text-[#F4D270] underline underline-offset-2"
            >
              Zurich private banker jobs
            </Link>
            , you can either apply to a live mandate or{" "}
            <Link
              href="/en/candidates"
              className="text-[#F4D270] underline underline-offset-2"
            >
              submit your profile confidentially
            </Link>
            . If you prefer a direct discussion,{" "}
            <Link
              href="/en/contact"
              className="text-[#F4D270] underline underline-offset-2"
            >
              contact a Zurich-focused recruiter
            </Link>{" "}
            or run first numbers in the{" "}
            <Link
              href="/bp-simulator?src=zurich_market"
              className="text-[#F4D270] underline underline-offset-2"
            >
              Business Plan Simulator
            </Link>
            .
          </p>
        </article>
      );

    case "dubai":
      return (
        <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 shadow-xl md:p-8">
          <header className="mb-4">
            <h2 className="text-xl font-semibold md:text-2xl">
              Why Private Bankers Move to Dubai
            </h2>
          </header>
          <p className="max-w-3xl text-sm text-neutral-300 md:text-base">
            Dubai has become the most visible private banking hub for GCC,
            wider Middle East and select NRI clients. Senior bankers base
            themselves here to be physically closer to decision-makers while
            still plugging into international booking centres in Switzerland,
            Singapore or other offshore locations.
          </p>
          <p className="mt-3 max-w-3xl text-sm text-neutral-300 md:text-base">
            Serious platforms in Dubai operate under DFSA or ADGM frameworks and
            emphasise robust KYC, source-of-wealth documentation and sustainable
            advisory revenues. For many RMs, the appeal lies in combining
            regional proximity with a broad product shelf and the ability to
            allocate assets across multiple booking centres.
          </p>
          <ul className="mt-4 max-w-3xl space-y-2 text-sm text-neutral-100 md:text-base">
            <li>
              • <strong>Regional proximity:</strong> easy access to GCC,
              broader Middle East and South Asia clients.
            </li>
            <li>
              • <strong>Multi-centre architecture:</strong> Dubai desks often
              coordinate with Swiss, Asian and offshore booking locations.
            </li>
            <li>
              • <strong>Tax &amp; lifestyle:</strong> attractive personal tax
              environment and a lifestyle that works for internationally mobile
              families.
            </li>
            <li>
              • <strong>Growth dynamics:</strong> strong pipeline of
              entrepreneur wealth, real estate and family group restructurings.
            </li>
          </ul>
          <p className="mt-4 max-w-3xl text-sm text-neutral-300 md:text-base">
            You can review{" "}
            <Link
              href="/en/private-banker-jobs/dubai"
              className="text-[#F4D270] underline underline-offset-2"
            >
              current Dubai private banker roles
            </Link>{" "}
            or{" "}
            <Link
              href="/en/candidates"
              className="text-[#F4D270] underline underline-offset-2"
            >
              share your profile confidentially
            </Link>{" "}
            for upcoming mandates. For a deeper discussion,{" "}
            <Link
              href="/en/contact"
              className="text-[#F4D270] underline underline-offset-2"
            >
              contact Executive Partners
            </Link>{" "}
            and use the{" "}
            <Link
              href="/bp-simulator?src=dubai_market"
              className="text-[#F4D270] underline underline-offset-2"
            >
              Business Plan Simulator
            </Link>{" "}
            to stress-test portability and revenue scenarios.
          </p>
        </article>
      );

    case "singapore":
      return (
        <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 shadow-xl md:p-8">
          <header className="mb-4">
            <h2 className="text-xl font-semibold md:text-2xl">
              Why Private Bankers Move to Singapore
            </h2>
          </header>
          <p className="max-w-3xl text-sm text-neutral-300 md:text-base">
            Singapore is the primary wealth hub for ASEAN and part of a
            dual-centre strategy with Hong Kong for North Asia. Senior bankers
            relocate here to consolidate regional client books under MAS rules,
            with flexible access to global markets and strong legal certainty.
          </p>
          <p className="mt-3 max-w-3xl text-sm text-neutral-300 md:text-base">
            The city offers a combination of political stability, robust
            regulation and deep wealth-management infrastructure. Many platforms
            position Singapore as a base for long-term family governance,
            succession planning and multi-jurisdictional structuring rather than
            purely trading-focused business.
          </p>
          <ul className="mt-4 max-w-3xl space-y-2 text-sm text-neutral-100 md:text-base">
            <li>
              • <strong>Asia hub:</strong> gateway for ASEAN and part of the
              North Asia coverage model.
            </li>
            <li>
              • <strong>Regulatory clarity:</strong> MAS-led framework with high
              standards of investor protection.
            </li>
            <li>
              • <strong>Family governance focus:</strong> strong ecosystem of
              lawyers, trustees and family-office specialists.
            </li>
            <li>
              • <strong>Quality-of-life platform:</strong> safe, efficient and
              attractive for families relocating from Europe or within Asia.
            </li>
          </ul>
          <p className="mt-4 max-w-3xl text-sm text-neutral-300 md:text-base">
            You can explore{" "}
            <Link
              href="/en/private-banker-jobs/singapore"
              className="text-[#F4D270] underline underline-offset-2"
            >
              Singapore-based roles
            </Link>{" "}
            or register via the{" "}
            <Link
              href="/en/candidates"
              className="text-[#F4D270] underline underline-offset-2"
            >
              candidates hub
            </Link>{" "}
            for future searches. If you want to model a move before speaking
            with a platform, try the{" "}
            <Link
              href="/bp-simulator?src=singapore_market"
              className="text-[#F4D270] underline underline-offset-2"
            >
              Business Plan Simulator
            </Link>{" "}
            and then{" "}
            <Link
              href="/en/contact"
              className="text-[#F4D270] underline underline-offset-2"
            >
              contact us
            </Link>{" "}
            to discuss the results.
          </p>
        </article>
      );

    case "london":
      return (
        <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 shadow-xl md:p-8">
          <header className="mb-4">
            <h2 className="text-xl font-semibold md:text-2xl">
              Why Private Bankers Move to London
            </h2>
          </header>
          <p className="max-w-3xl text-sm text-neutral-300 md:text-base">
            London is still one of the most sophisticated hubs for onshore
            private banking and wealth management, particularly for UK
            residents, non-doms and international families with UK ties. It
            offers deep capital markets, a dense professional-services
            ecosystem and access to institutional-grade investment ideas.
          </p>
          <p className="mt-3 max-w-3xl text-sm text-neutral-300 md:text-base">
            FCA-regulated platforms place strong emphasis on documented advice,
            suitability and fee-based revenue. For senior RMs, London can be a
            compelling place to build a planning-led franchise with close links
            to investment banking, capital markets and alternatives providers.
          </p>
          <ul className="mt-4 max-w-3xl space-y-2 text-sm text-neutral-100 md:text-base">
            <li>
              • <strong>Onshore advisory hub:</strong> UK-resident (&amp;
              non-dom) clients who value planning, not just execution.
            </li>
            <li>
              • <strong>Capital-markets access:</strong> strong link between
              wealth management and institutional product manufacturing.
            </li>
            <li>
              • <strong>Professional network:</strong> ecosystem of lawyers,
              accountants and corporate-finance advisers.
            </li>
            <li>
              • <strong>Career depth:</strong> multiple platform types:
              universal banks, UK private banks, boutiques and multi-family
              offices.
            </li>
          </ul>
          <p className="mt-4 max-w-3xl text-sm text-neutral-300 md:text-base">
            To review{" "}
            <Link
              href="/en/private-banker-jobs/london"
              className="text-[#F4D270] underline underline-offset-2"
            >
              London roles
            </Link>
            , browse the jobs page or{" "}
            <Link
              href="/en/candidates"
              className="text-[#F4D270] underline underline-offset-2"
            >
              submit your CV
            </Link>{" "}
            for confidential consideration. You can also{" "}
            <Link
              href="/en/contact"
              className="text-[#F4D270] underline underline-offset-2"
            >
              speak directly with us
            </Link>{" "}
            and run indicative numbers through the{" "}
            <Link
              href="/bp-simulator?src=london_market"
              className="text-[#F4D270] underline underline-offset-2"
            >
              Business Plan Simulator
            </Link>
            .
          </p>
        </article>
      );

    case "hong-kong":
      return (
        <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 shadow-xl md:p-8">
          <header className="mb-4">
            <h2 className="text-xl font-semibold md:text-2xl">
              Why Private Bankers Move to Hong Kong
            </h2>
          </header>
          <p className="max-w-3xl text-sm text-neutral-300 md:text-base">
            Hong Kong remains a key hub for North Asia, particularly Greater
            China and regional entrepreneurs. Many senior RMs move here because
            they want to be closer to decision-makers in the region while
            keeping access to international product platforms and multi-centre
            booking options.
          </p>
          <p className="mt-3 max-w-3xl text-sm text-neutral-300 md:text-base">
            The market is more activity-driven than some other centres, but the
            strongest franchises balance structured products and trading with
            long-term advisory and planning. SFC supervision and cross-border
            rules mean platforms value bankers who can combine strong revenue
            with disciplined governance.
          </p>
          <ul className="mt-4 max-w-3xl space-y-2 text-sm text-neutral-100 md:text-base">
            <li>
              • <strong>North Asia proximity:</strong> closer access to Chinese
              and regional UHNW families.
            </li>
            <li>
              • <strong>Trading &amp; solutions:</strong> deep product shelves
              for structured products, leverage and IPO-related flows.
            </li>
            <li>
              • <strong>Cross-centre strategy:</strong> Hong Kong books often
              link to Singapore and offshore booking locations.
            </li>
            <li>
              • <strong>Dynamic revenue:</strong> mix of recurring and
              event-driven income for high-activity clients.
            </li>
          </ul>
          <p className="mt-4 max-w-3xl text-sm text-neutral-300 md:text-base">
            You can explore{" "}
            <Link
              href="/en/private-banker-jobs/hong-kong"
              className="text-[#F4D270] underline underline-offset-2"
            >
              Hong Kong mandates
            </Link>{" "}
            or register via the{" "}
            <Link
              href="/en/candidates"
              className="text-[#F4D270] underline underline-offset-2"
            >
              candidates page
            </Link>
            . For an initial discussion on how your book might travel,{" "}
            <Link
              href="/en/contact"
              className="text-[#F4D270] underline underline-offset-2"
            >
              contact us
            </Link>{" "}
            and pre-test assumptions with the{" "}
            <Link
              href="/bp-simulator?src=hong-kong_market"
              className="text-[#F4D270] underline underline-offset-2"
            >
              Business Plan Simulator
            </Link>
            .
          </p>
        </article>
      );

    case "new-york":
      return (
        <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 shadow-xl md:p-8">
          <header className="mb-4">
            <h2 className="text-xl font-semibold md:text-2xl">
              Why Private Bankers Move to New York
            </h2>
          </header>
          <p className="max-w-3xl text-sm text-neutral-300 md:text-base">
            New York is the core hub for US-taxable wealth and complex
            household-level planning. Senior advisers base themselves here to
            sit close to capital markets desks, product specialists and a dense
            ecosystem of lawyers, accountants and estate-planning experts.
          </p>
          <p className="mt-3 max-w-3xl text-sm text-neutral-300 md:text-base">
            SEC/FINRA-supervised platforms look for advisers who can build
            long-term, planning-led relationships rather than purely
            transaction-driven business. The upside for senior bankers is the
            ability to anchor themselves at the centre of sophisticated,
            multi-generational balance sheets across the US and wider Americas.
          </p>
          <ul className="mt-4 max-w-3xl space-y-2 text-sm text-neutral-100 md:text-base">
            <li>
              • <strong>Household-centric model:</strong> multi-entity,
              multi-account relationships built on planning and advice.
            </li>
            <li>
              • <strong>Capital markets proximity:</strong> daily interaction
              with product, research and deal specialists.
            </li>
            <li>
              • <strong>Complex tax environment:</strong> opportunity to work
              with high-quality tax and legal advisers on advanced structures.
            </li>
            <li>
              • <strong>LatAm &amp; global links:</strong> many New York desks
              connect US clients with international family members and assets.
            </li>
          </ul>
          <p className="mt-4 max-w-3xl text-sm text-neutral-300 md:text-base">
            You can review{" "}
            <Link
              href="/en/private-banker-jobs/new-york"
              className="text-[#F4D270] underline underline-offset-2"
            >
              New York private banker roles
            </Link>{" "}
            or{" "}
            <Link
              href="/en/candidates"
              className="text-[#F4D270] underline underline-offset-2"
            >
              submit your profile confidentially
            </Link>{" "}
            for upcoming mandates. For a more detailed conversation,{" "}
            <Link
              href="/en/contact"
              className="text-[#F4D270] underline underline-offset-2"
            >
              contact us
            </Link>{" "}
            and use the{" "}
            <Link
              href="/bp-simulator?src=new-york_market"
              className="text-[#F4D270] underline underline-offset-2"
            >
              Business Plan Simulator
            </Link>{" "}
            to test revenue and portability assumptions into the US platform.
          </p>
        </article>
      );

    case "miami":
      return (
        <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 shadow-xl md:p-8">
          <header className="mb-4">
            <h2 className="text-xl font-semibold md:text-2xl">
              Why Private Bankers Move to Miami
            </h2>
          </header>
          <p className="max-w-3xl text-sm text-neutral-300 md:text-base">
            Miami is a hybrid hub where US-taxable wealth sits alongside
            sophisticated LatAm and international books. Senior bankers relocate
            here to remain close to Latin American families, while leveraging
            US platforms, custody and governance standards.
          </p>
          <p className="mt-3 max-w-3xl text-sm text-neutral-300 md:text-base">
            The strongest Miami franchises emphasise rigorous jurisdictional
            mapping, clean cross-border frameworks and stable, fee-based
            revenue. For bankers with diversified LatAm &amp; US relationships,
            Miami offers a unique mix of proximity, lifestyle and platform
            depth.
          </p>
          <ul className="mt-4 max-w-3xl space-y-2 text-sm text-neutral-100 md:text-base">
            <li>
              • <strong>LatAm proximity:</strong> easy connectivity to key Latin
              American markets and family groups.
            </li>
            <li>
              • <strong>US platform access:</strong> ability to combine US
              custody, governance and product with Latin American client demand.
            </li>
            <li>
              • <strong>Hybrid booking model:</strong> mix of US-booked and
              offshore assets, when compliant and appropriate.
            </li>
            <li>
              • <strong>Lifestyle &amp; networks:</strong> growing ecosystem of
              entrepreneurs, family offices and regional decision-makers.
            </li>
          </ul>
          <p className="mt-4 max-w-3xl text-sm text-neutral-300 md:text-base">
            You can check{" "}
            <Link
              href="/en/private-banker-jobs/miami"
              className="text-[#F4D270] underline underline-offset-2"
            >
              Miami private banker jobs
            </Link>{" "}
            or{" "}
            <Link
              href="/en/candidates"
              className="text-[#F4D270] underline underline-offset-2"
            >
              register confidentially
            </Link>{" "}
            to be considered for future mandates. For a deeper discussion of
            your LatAm &amp; US mix,{" "}
            <Link
              href="/en/contact"
              className="text-[#F4D270] underline underline-offset-2"
            >
              contact our team
            </Link>{" "}
            and run an initial scenario through the{" "}
            <Link
              href="/bp-simulator?src=miami_market"
              className="text-[#F4D270] underline underline-offset-2"
            >
              Business Plan Simulator
            </Link>
            .
          </p>
        </article>
      );

    case "paris":
      return (
        <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 shadow-xl md:p-8">
          <header className="mb-4">
            <h2 className="text-xl font-semibold md:text-2xl">
              Why Private Bankers Move to Paris
            </h2>
          </header>
          <p className="max-w-3xl text-sm text-neutral-300 md:text-base">
            Paris is the main hub for French-resident entrepreneurs, executives
            and multi-generational families, often with sophisticated tax and
            legal constraints. Senior bankers move here to work closer to local
            decision-makers and to build long-term franchises under a strong
            MiFID II and French regulatory framework.
          </p>
          <p className="mt-3 max-w-3xl text-sm text-neutral-300 md:text-base">
            Leading platforms in Paris combine domestic expertise with access to
            Luxembourg, Switzerland and other EU booking centres. For many RMs,
            this allows them to manage both local wealth and cross-border
            structures from one primary city.
          </p>
          <ul className="mt-4 max-w-3xl space-y-2 text-sm text-neutral-100 md:text-base">
            <li>
              • <strong>Local depth:</strong> strong focus on French residents
              and corporate owners with complex wealth situations.
            </li>
            <li>
              • <strong>Tax &amp; legal sophistication:</strong> intensive work
              with local lawyers, notaries and tax advisers.
            </li>
            <li>
              • <strong>Cross-border options:</strong> ability to connect Paris
              clients with Swiss or Luxembourg booking centres.
            </li>
            <li>
              • <strong>Long-term relationships:</strong> emphasis on planning,
              mandates and succession rather than trading-only activity.
            </li>
          </ul>
          <p className="mt-4 max-w-3xl text-sm text-neutral-300 md:text-base">
            Review{" "}
            <Link
              href="/en/private-banker-jobs/paris"
              className="text-[#F4D270] underline underline-offset-2"
            >
              Paris private banking roles
            </Link>{" "}
            or{" "}
            <Link
              href="/en/candidates"
              className="text-[#F4D270] underline underline-offset-2"
            >
              submit your profile
            </Link>{" "}
            to be considered across leading French and European platforms. For a
            more detailed calibration of your business case,{" "}
            <Link
              href="/en/contact"
              className="text-[#F4D270] underline underline-offset-2"
            >
              contact Executive Partners
            </Link>{" "}
            and pre-test your assumptions in the{" "}
            <Link
              href="/bp-simulator?src=paris_market"
              className="text-[#F4D270] underline underline-offset-2"
            >
              Business Plan Simulator
            </Link>
            .
          </p>
        </article>
      );

    case "madrid":
      return (
        <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 shadow-xl md:p-8">
          <header className="mb-4">
            <h2 className="text-xl font-semibold md:text-2xl">
              Why Private Bankers Move to Madrid
            </h2>
          </header>
          <p className="max-w-3xl text-sm text-neutral-300 md:text-base">
            Madrid is a key hub for Iberian entrepreneurs, executives and family
            groups, with growing links to LatAm and broader European wealth.
            Senior private bankers move here to access local decision-makers,
            Spanish onshore wealth and Latin-linked structures under a familiar
            language and legal environment.
          </p>
          <p className="mt-3 max-w-3xl text-sm text-neutral-300 md:text-base">
            The most compelling platforms in Madrid combine domestic coverage
            with access to Luxembourg, Switzerland or other EU booking centres.
            This allows bankers to support both local and international
            structuring while maintaining a strong on-the-ground presence.
          </p>
          <ul className="mt-4 max-w-3xl space-y-2 text-sm text-neutral-100 md:text-base">
            <li>
              • <strong>Iberian focus:</strong> high concentration of
              Spain-based entrepreneurs, executives and family groups.
            </li>
            <li>
              • <strong>LatAm connectivity:</strong> historical and business
              links with Latin American wealth.
            </li>
            <li>
              • <strong>EU platform access:</strong> ability to tap into wider
              European booking centres and product ranges.
            </li>
            <li>
              • <strong>Lifestyle &amp; talent magnet:</strong> attractive city
              for returning Spanish bankers and international hires.
            </li>
          </ul>
          <p className="mt-4 max-w-3xl text-sm text-neutral-300 md:text-base">
            Explore{" "}
            <Link
              href="/en/private-banker-jobs/madrid"
              className="text-[#F4D270] underline underline-offset-2"
            >
              Madrid private banker jobs
            </Link>{" "}
            or{" "}
            <Link
              href="/en/candidates"
              className="text-[#F4D270] underline underline-offset-2"
            >
              share your profile
            </Link>{" "}
            for future Iberian and LatAm-linked mandates. You can also{" "}
            <Link
              href="/en/contact"
              className="text-[#F4D270] underline underline-offset-2"
            >
              contact us
            </Link>{" "}
            to discuss a potential move and run scenarios in the{" "}
            <Link
              href="/bp-simulator?src=madrid_market"
              className="text-[#F4D270] underline underline-offset-2"
            >
              Business Plan Simulator
            </Link>
            .
          </p>
        </article>
      );

    case "lisbon":
      return (
        <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 shadow-xl md:p-8">
          <header className="mb-4">
            <h2 className="text-xl font-semibold md:text-2xl">
              Why Private Bankers Move to Lisbon
            </h2>
          </header>
          <p className="max-w-3xl text-sm text-neutral-300 md:text-base">
            Lisbon has evolved into a hub for entrepreneurs, tech founders and
            internationally mobile families, many of whom arrived via residency
            or relocation programmes. Senior private bankers move here to serve
            this mix of local and international wealth while leveraging EU
            stability and a growing financial-services ecosystem.
          </p>
          <p className="mt-3 max-w-3xl text-sm text-neutral-300 md:text-base">
            Platforms in Lisbon often combine domestic banking with access to
            broader European booking centres. For the right banker, this means
            the ability to manage local cash flows, real estate and business
            interests while structuring long-term wealth in other EU hubs.
          </p>
          <ul className="mt-4 max-w-3xl space-y-2 text-sm text-neutral-100 md:text-base">
            <li>
              • <strong>Relocation-driven client base:</strong> mix of local
              families, expats and relocated entrepreneurs.
            </li>
            <li>
              • <strong>EU stability:</strong> euro-zone jurisdiction with
              access to wider European financial infrastructure.
            </li>
            <li>
              • <strong>International flavour:</strong> English widely spoken,
              strong tech and start-up presence, global outlook.
            </li>
            <li>
              • <strong>Lifestyle appeal:</strong> quality of life that attracts
              mobile UHNW and next-gen clients.
            </li>
          </ul>
          <p className="mt-4 max-w-3xl text-sm text-neutral-300 md:text-base">
            Check{" "}
            <Link
              href="/en/private-banker-jobs/lisbon"
              className="text-[#F4D270] underline underline-offset-2"
            >
              Lisbon private banking opportunities
            </Link>{" "}
            or{" "}
            <Link
              href="/en/candidates"
              className="text-[#F4D270] underline underline-offset-2"
            >
              register confidentially
            </Link>{" "}
            to be considered across key platforms. For a more detailed view on
            how your current book might travel,{" "}
            <Link
              href="/en/contact"
              className="text-[#F4D270] underline underline-offset-2"
            >
              contact us
            </Link>{" "}
            and run initial numbers through the{" "}
            <Link
              href="/bp-simulator?src=lisbon_market"
              className="text-[#F4D270] underline underline-offset-2"
            >
              Business Plan Simulator
            </Link>
            .
          </p>
        </article>
      );

    default:
      return (
        <article className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 shadow-xl md:p-8">
          <header className="mb-4">
            <h2 className="text-xl font-semibold md:text-2xl">
              Why Private Bankers Consider {city}
            </h2>
          </header>
          <p className="max-w-3xl text-sm text-neutral-300 md:text-base">
            {city} is a relevant hub for Private Banking and Wealth Management,
            combining local client depth with access to regional or global
            booking centres. Senior Relationship Managers typically consider a
            move when their existing platform no longer matches the needs of
            their clients, or when they see a stronger long-term fit in terms of
            product, governance and growth.
          </p>
          <p className="mt-3 max-w-3xl text-sm text-neutral-300 md:text-base">
            The right platform in {city} will usually offer a credible brand,
            robust regulatory set-up and the ability to service your core client
            segments over the next decade. That often includes better credit
            support, a broader investment shelf or more flexible booking
            options.
          </p>
          <p className="mt-4 max-w-3xl text-sm text-neutral-300 md:text-base">
            To explore options, you can review relevant roles on the{" "}
            <Link
              href="/jobs"
              className="text-[#F4D270] underline underline-offset-2"
            >
              jobs page
            </Link>
            , register via the{" "}
            <Link
              href="/en/candidates"
              className="text-[#F4D270] underline underline-offset-2"
            >
              candidates hub
            </Link>
            , or{" "}
            <Link
              href="/en/contact"
              className="text-[#F4D270] underline underline-offset-2"
            >
              contact us
            </Link>{" "}
            for a confidential discussion. You can also pre-test a move using
            the{" "}
            <Link
              href="/bp-simulator?src=market_generic"
              className="text-[#F4D270] underline underline-offset-2"
            >
              Business Plan Simulator
            </Link>
            .
          </p>
        </article>
      );
  }
}