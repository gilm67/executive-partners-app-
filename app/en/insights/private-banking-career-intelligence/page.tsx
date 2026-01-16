import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/StructuredData";

/**
 * ✅ Cache bust (MANDATORY)
 * This prevents Vercel Edge from serving an old, statically-cached HTML version.
 */
export const dynamic = "force-dynamic";
export const revalidate = 0;

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://www.execpartners.ch");

const PAGE_PATH = "/en/insights/private-banking-career-intelligence";
const PAGE_URL = `${SITE}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Private Banking Career Intelligence 2026 | Executive Partners",
  description:
    "Comprehensive career intelligence for private banking professionals. Market trends, compensation benchmarks, and strategic insights for RMs and wealth managers.",
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: "Private Banking Career Intelligence 2026 | Executive Partners",
    description:
      "Market insights, compensation data, and career strategies for senior private banking professionals.",
    url: PAGE_PATH,
    siteName: "Executive Partners",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Banking Career Intelligence 2026",
    description:
      "Strategic career insights for private banking and wealth management professionals.",
  },
  robots: { index: true, follow: true },
};

export default function CareerIntelligencePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE },
          { name: "Insights", url: `${SITE}/en/insights` },
          { name: "Career Intelligence 2026", url: PAGE_URL },
        ]}
      />

      <main className="relative min-h-screen bg-[#0B0E13] text-white">
        {/* Background glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 420px at 20% -10%, rgba(255,215,130,0.10) 0%, rgba(0,0,0,0) 60%), radial-gradient(1200px 420px at 90% 0%, rgba(158,203,255,0.08) 0%, rgba(0,0,0,0) 60%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-5xl px-4 pb-20 pt-12">
          {/* Header */}
          <div className="mx-auto w-fit rounded-full border border-brandGold/30 bg-brandGold/10 px-3 py-1 text-xs font-semibold text-brandGoldSoft shadow-sm backdrop-blur">
            2026 Career Intelligence Report
          </div>

          <h1 className="mt-3 text-center text-4xl font-extrabold tracking-tight md:text-5xl">
            Private Banking Career Intelligence 2026
          </h1>

          <p className="mx-auto mt-3 max-w-3xl text-center text-neutral-300">
            Strategic insights, market trends, and compensation benchmarks for
            senior private banking professionals navigating their next move.
          </p>

          {/* Market Overview */}
          <section className="mt-10 rounded-2xl border border-brandGold/20 bg-white/[0.05] p-6">
            <h2 className="text-2xl font-bold text-brandGoldSoft">
              Market Overview 2026
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-neutral-300">
              <p>
                The private banking landscape continues to evolve with
                increasing focus on <strong>AUM portability</strong>,
                <strong> cross-border capabilities</strong>, and{" "}
                <strong>digital transformation</strong>. Senior RMs and Team
                Heads are seeing unprecedented demand across key hubs including
                Geneva, Zurich, Dubai, Singapore, and London.
              </p>
              <p>
                Key drivers for 2026 include wealth migration to Switzerland and
                UAE, regulatory changes in EU markets, and continued
                consolidation among mid-tier private banks.
              </p>
            </div>
          </section>

          {/* Compensation Trends */}
          <section className="mt-8 rounded-2xl border border-brandGold/20 bg-white/[0.04] p-6">
            <h2 className="text-2xl font-bold text-brandGoldSoft">
              Compensation Trends
            </h2>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              {/* Switzerland */}
              <div className="rounded-xl border border-brandGold/20 bg-neutral-900/40 p-4">
                <h3 className="font-semibold text-brandGold">
                  Switzerland (Geneva/Zurich)
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-neutral-300">
                  <li>
                    • <strong>Senior RM (CHF 100-300M AUM):</strong> CHF 180-350K
                    base + 50-150% bonus
                  </li>
                  <li>
                    • <strong>Team Head (CHF 500M+ AUM):</strong> CHF 280-450K
                    base + 80-200% bonus
                  </li>
                  <li>
                    • <strong>Market Head:</strong> CHF 350-600K+ base +
                    significant carry/equity
                  </li>
                </ul>
              </div>

              {/* Dubai */}
              <div className="rounded-xl border border-brandGold/20 bg-neutral-900/40 p-4">
                <h3 className="font-semibold text-brandGold">Dubai (DIFC)</h3>
                <ul className="mt-3 space-y-2 text-sm text-neutral-300">
                  <li>
                    • <strong>Senior RM (USD 150-400M AUM):</strong> USD 200-400K
                    base + 60-180% bonus
                  </li>
                  <li>
                    • <strong>Team Head (USD 800M+ AUM):</strong> USD 350-550K
                    base + 100-250% bonus
                  </li>
                  <li>• Tax advantages make total comp significantly higher</li>
                </ul>
              </div>

              {/* Singapore */}
              <div className="rounded-xl border border-brandGold/20 bg-neutral-900/40 p-4">
                <h3 className="font-semibold text-brandGold">Singapore</h3>
                <ul className="mt-3 space-y-2 text-sm text-neutral-300">
                  <li>
                    • <strong>Senior RM (SGD 200-500M AUM):</strong> SGD 220-420K
                    base + 60-150% bonus
                  </li>
                  <li>
                    • <strong>Team Head (SGD 1B+ AUM):</strong> SGD 400-650K base
                    + 100-200% bonus
                  </li>
                  <li>• Strong demand for China/SEA connectivity</li>
                </ul>
              </div>

              {/* London */}
              <div className="rounded-xl border border-brandGold/20 bg-neutral-900/40 p-4">
                <h3 className="font-semibold text-brandGold">London</h3>
                <ul className="mt-3 space-y-2 text-sm text-neutral-300">
                  <li>
                    • <strong>Senior RM (GBP 100-250M AUM):</strong> GBP 150-300K
                    base + 40-120% bonus
                  </li>
                  <li>
                    • <strong>Team Head (GBP 500M+ AUM):</strong> GBP 250-450K
                    base + 80-180% bonus
                  </li>
                  <li>• Post-Brexit adjustments stabilizing</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Portability Insights */}
          <section className="mt-8 rounded-2xl border border-brandGold/20 bg-white/[0.05] p-6">
            <h2 className="text-2xl font-bold text-brandGoldSoft">
              AUM Portability Insights
            </h2>
            <div className="mt-4 space-y-4">
              <div className="rounded-xl border border-brandGold/20 bg-neutral-900/40 p-4">
                <h3 className="font-semibold text-white">
                  Average Transfer Rates by Segment
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-neutral-300">
                  <li>
                    • <strong>UHNW (USD 50M+):</strong> 45-65% typically portable
                    within 12 months
                  </li>
                  <li>
                    • <strong>HNW (USD 5-50M):</strong> 60-75% portable, faster
                    transfers
                  </li>
                  <li>
                    • <strong>Institutional/Corporate:</strong> 20-40%, slower
                    due to committee decisions
                  </li>
                  <li>
                    • <strong>Family Office AUM:</strong> 70-85% if RM owns
                    relationship
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-brandGold/20 bg-neutral-900/40 p-4">
                <h3 className="font-semibold text-white">
                  Key Portability Factors
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-neutral-300">
                  <li>
                    • <strong>Relationship depth:</strong> 10+ year relationships
                    = higher portability
                  </li>
                  <li>
                    • <strong>Product complexity:</strong> DPM/advisory = more
                    portable than execution-only
                  </li>
                  <li>
                    • <strong>Cross-border constraints:</strong> EU clients face
                    increased friction
                  </li>
                  <li>
                    • <strong>Platform capabilities:</strong> Credit/Lombard
                    requirements affect decisions
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Hot Markets 2026 */}
          <section className="mt-8 rounded-2xl border border-brandGold/20 bg-white/[0.04] p-6">
            <h2 className="text-2xl font-bold text-brandGoldSoft">
              Hot Markets &amp; Hiring Trends
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {[
                {
                  market: "Switzerland",
                  trend:
                    "High demand for UHNW entrepreneurs, family office coverage. Focus on alternatives/structured products.",
                  demand: "Very High",
                },
                {
                  market: "Dubai",
                  trend:
                    "Explosive growth in wealth migration. Need for Russian, CIS, and India coverage. Tax-driven moves.",
                  demand: "Extremely High",
                },
                {
                  market: "Singapore",
                  trend:
                    "China family wealth, SEA entrepreneurs. Strong demand for Mandarin speakers with mainland networks.",
                  demand: "High",
                },
              ].map((item) => (
                <div
                  key={item.market}
                  className="rounded-xl border border-brandGold/20 bg-neutral-900/40 p-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-brandGold">{item.market}</h3>
                    <span className="rounded-full bg-brandGold/20 px-2 py-0.5 text-xs text-brandGoldSoft">
                      {item.demand}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-neutral-300">{item.trend}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Strategic Advice */}
          <section className="mt-8 rounded-2xl border border-brandGold/20 bg-white/[0.05] p-6">
            <h2 className="text-2xl font-bold text-brandGoldSoft">
              Strategic Career Moves
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-300">
              <p>
                <strong>For RMs considering a move:</strong> Focus on platforms
                that match your client base&apos;s cross-border needs, product
                complexity, and credit appetite. Verify the bank&apos;s appetite
                for your specific client segment before committing.
              </p>
              <p>
                <strong>For Team Heads:</strong> Evaluate the bank&apos;s
                investment in technology, compliance infrastructure, and
                willingness to support team moves. Ensure revenue-sharing models
                are transparent and competitive.
              </p>
              <p>
                <strong>Timing considerations:</strong> Q1 2026 remains strong
                for moves. Bonus season creates natural transition points, but
                be prepared for 3-6 month garden leave clauses.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="mt-10 rounded-2xl border border-brandGold/20 bg-gradient-to-br from-brandGold/10 to-transparent p-6 text-center">
            <h3 className="text-xl font-bold text-white">
              Ready to explore your next move?
            </h3>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-neutral-300">
              Get confidential career advice, portability assessment, and market
              intelligence tailored to your situation.
            </p>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/portability"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brandGold to-brandGoldSoft px-6 py-3 text-sm font-semibold text-black shadow-lg transition hover:brightness-110"
              >
                Calculate Your Portability Score
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                Schedule Confidential Call
              </Link>
            </div>
          </section>

          {/* Quick link to the new PDF (optional but useful) */}
          <section className="mt-8 text-center">
            <a
              href="/pdfs/private-banking-career-intelligence-2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-brandGold/30 bg-brandGold/10 px-5 py-2 text-sm font-semibold text-brandGoldSoft hover:bg-brandGold/15"
            >
              Open the 2026 PDF guide
            </a>
          </section>

          {/* Disclaimer */}
          <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center text-xs text-neutral-400">
            <p>
              Data compiled from Executive Partners placements, market research,
              and confidential compensation surveys (2024-2026). Figures are
              indicative and vary based on AUM quality, portability, and
              individual performance.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}