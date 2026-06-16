import type { Metadata } from "next";
import Link from "next/link";

const SITE = "https://www.execpartners.ch";
const PAGE_URL = `${SITE}/en/private-banker-jobs-zurich`;

export const metadata: Metadata = {
  title: {
    absolute: "Private Banker Jobs in Zurich | Senior RM Recruitment – Executive Partners",
  },
  description:
    "Zurich private banking recruitment. Senior RMs, Team Heads and Market Leaders covering Swiss onshore and DACH wealth. Confidential. Post-UBS-CS integration market insight.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "Executive Partners",
    title: "Private Banker Jobs in Zurich – Executive Partners",
    description: "Senior private banking roles in Zurich. Swiss onshore and DACH coverage. Confidential search.",
    images: [{ url: "/og.webp", width: 1200, height: 630, alt: "Executive Partners – Zurich Private Banking" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Banker Jobs in Zurich – Executive Partners",
    description: "Confidential Zurich private banking roles. Swiss onshore, DACH coverage. Compensation benchmarks included.",
    images: ["/og.webp"],
  },
  robots: { index: true, follow: true },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness"],
  name: "Executive Partners – Private Banking Recruitment Zurich",
  url: PAGE_URL,
  image: `${SITE}/og.webp`,
  areaServed: ["Zurich", "Switzerland", "DACH"],
  industry: "Private Banking & Wealth Management Recruitment",
  sameAs: ["https://www.linkedin.com/company/executive-partners", SITE],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Markets", item: `${SITE}/en/markets` },
    { "@type": "ListItem", position: 3, name: "Private Banker Jobs – Zurich", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="relative min-h-screen bg-[#0B0F1A] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 360px at 15% -10%, rgba(201,161,74,.22) 0%, rgba(201,161,74,0) 55%), radial-gradient(900px 360px at 110% 0%, rgba(245,231,192,.18) 0%, rgba(245,231,192,0) 60%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-12">
          <nav className="text-xs text-white/60 mb-8">
            <Link href="/en/markets" className="hover:text-[#D4AF37]">Markets</Link>
            <span className="mx-1">/</span>
            <span>Private Banker Jobs in Zurich</span>
          </nav>

          <header className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brandGoldSoft/90">
              Zurich · Switzerland · Executive Search
            </p>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
              Private Banker Jobs in Zurich
            </h1>
            <p className="mt-4 text-sm text-neutral-300 md:text-[0.95rem] leading-relaxed">
              Zurich is Switzerland's largest private banking market by AUM and headcount, home to{" "}
              <span className="font-semibold text-neutral-100">UBS, Julius Baer, Vontobel, Pictet and a dense network of boutique platforms</span>. Executive Partners advises Senior RMs, Team Heads and Market Leaders on confidential moves across Swiss onshore and DACH coverage.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/en/apply" className="btn btn-primary btn-xl">Apply confidentially</Link>
              <Link href="/en/jobs" className="btn btn-ghost">View live mandates</Link>
            </div>
          </header>

          <section className="mt-12 grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)]">
            <div className="space-y-4 text-sm text-neutral-200 md:text-[0.95rem] leading-relaxed">
              <h2 className="text-xl font-semibold text-white">The post-UBS-Credit Suisse hiring landscape</h2>
              <p>
                The UBS-Credit Suisse integration remains the single largest driver of senior banker movement in Zurich. UBS now employs roughly 8,500 people in Zurich following the merger, and the consolidation has pushed many experienced relationship managers with strong DACH and UHNW books to re-evaluate their platform. Julius Baer, Vontobel and Pictet have all been active in absorbing this talent, alongside a wave of boutique and EAM growth.
              </p>
              <p>Over the last 18 months, hiring demand has concentrated on:</p>
              <ul className="list-disc space-y-1 pl-5 text-neutral-200">
                <li>Senior RMs with <span className="font-semibold">genuinely portable Swiss onshore or DACH books</span></li>
                <li>Bankers displaced or unsettled by post-merger integration who bring proven, compliant client relationships</li>
                <li>Team Heads capable of absorbing or building desks at scale</li>
                <li>Strong Lombard and credit utilisation alongside advisory revenue</li>
              </ul>
              <p>
                Zurich hiring committees are notably more focused on onshore revenue quality and balance-sheet utilisation than headline AUM, which changes how a business case should be built compared to offshore-heavy markets.
              </p>
            </div>

            <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-base font-semibold text-white">How Executive Partners supports Zurich hiring</h3>
              <ul className="mt-4 space-y-2 text-sm text-neutral-200">
                <li>• Senior RM, Team Head &amp; Market Leader search</li>
                <li>• Swiss onshore / DACH portability mapping</li>
                <li>• Post-integration platform comparison and timing advice</li>
                <li>• Lombard and credit utilisation business case modelling</li>
                <li>• 12–24 month NNM projection and business plan support</li>
              </ul>
              <div className="mt-5">
                <Link href="/en/apply" className="btn btn-secondary w-full text-sm font-medium">
                  Senior RM? Submit your profile
                </Link>
              </div>
            </aside>
          </section>

          <section className="mt-14 rounded-3xl border border-white/10 bg-black/40 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.75)] backdrop-blur md:p-8">
            <h2 className="text-xl font-semibold text-white">2025–2026 Zurich compensation benchmarks</h2>
            <p className="mt-3 text-sm text-neutral-300 md:text-[0.95rem]">
              Ranges reflect typical packages observed across leading Zurich-based private banks. Exact levels depend on platform, onshore vs. cross-border mix, and proven portable AUM.
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm text-neutral-100">
                <thead className="border-b border-white/10 text-xs uppercase tracking-wide text-neutral-400">
                  <tr>
                    <th className="py-2 pr-4">Role</th>
                    <th className="py-2 pr-4">Base salary (CHF)</th>
                    <th className="py-2 pr-4">Bonus range</th>
                    <th className="py-2 pr-4">Typical total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-2 pr-4">RM (5–10 years)</td>
                    <td className="py-2 pr-4">150k – 190k</td>
                    <td className="py-2 pr-4">20% – 60%</td>
                    <td className="py-2 pr-4">180k – 300k</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Senior RM (10–20 years)</td>
                    <td className="py-2 pr-4">190k – 270k</td>
                    <td className="py-2 pr-4">40% – 120%</td>
                    <td className="py-2 pr-4">270k – 590k</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Ultra UHNW RM</td>
                    <td className="py-2 pr-4">260k – 340k</td>
                    <td className="py-2 pr-4">80% – 200%</td>
                    <td className="py-2 pr-4">470k – 950k+</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Team Head</td>
                    <td className="py-2 pr-4">270k – 380k</td>
                    <td className="py-2 pr-4">100% – 250%</td>
                    <td className="py-2 pr-4">580k – 1.2m+</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-neutral-500">
              These ranges are indicative and based on observed market levels in Zurich across 2025–2026. Individual offers depend on platform, seniority, compliance history and proven, portable AUM.
            </p>
          </section>

          <section className="mt-12 rounded-3xl border border-[#C9A14A]/20 bg-[#C9A14A]/5 p-6 md:p-7">
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#C9A14A] mb-1">Anonymised placement</div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🇨🇭</span>
              <span className="text-sm font-semibold text-white/80">DACH onshore desk · Zurich</span>
            </div>
            <p className="text-sm text-white/70">Senior Relationship Manager · CHF 240M portable book · Mandate to offer: 18 days · Still at the bank, 21 months</p>
          </section>

          <section className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-base font-semibold text-white">Deep-dive insights for Zurich-based bankers</h3>
              <p className="mt-2 text-sm text-neutral-300">Market commentary on the UBS-Credit Suisse integration and Zurich's evolving talent landscape.</p>
              <ul className="mt-4 space-y-2 text-sm text-brandGoldSoft">
                <li><Link href="/en/insights/zurich-private-banking-market-2026" className="hover:underline">The Zurich Talent Paradox →</Link></li>
                <li><Link href="/en/insights" className="hover:underline">Browse Private Wealth Pulse →</Link></li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-base font-semibold text-white">Work with Executive Partners</h3>
              <p className="mt-2 text-sm text-neutral-300">
                Whether you are a Zurich platform absorbing talent post-integration or a Senior RM evaluating your next move, we provide factual, confidential guidance.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/en/hiring-managers" className="btn btn-primary btn-sm">Brief a mandate</Link>
                <Link href="/en/apply" className="btn btn-ghost btn-sm">Submit your profile</Link>
              </div>
            </div>
          </section>

          <p className="mt-10 text-center text-sm text-neutral-400">
            Prefer to start with a discreet email?{" "}
            <a href="mailto:recruiter@execpartners.ch" className="underline decoration-brandGold/70 underline-offset-4 hover:text-white">
              recruiter@execpartners.ch
            </a>
          </p>
        </div>
      </main>
    </>
  );
}
