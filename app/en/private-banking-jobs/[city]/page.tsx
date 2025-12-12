// app/en/private-banking-jobs/[city]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { jobsList } from "@/data/jobs";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://www.execpartners.ch");

type CityKey =
  | "zurich"
  | "dubai"
  | "singapore"
  | "london"
  | "new-york"
  | "miami"
  | "madrid"
  | "paris"
  | "lisbon"
  | "milan";

type CityConfig = {
  key: CityKey;
  label: string;              // for H1
  locationMatch: RegExp;      // filter jobsList.location
  marketSlug?: string;        // /en/markets/{slug} if exists
  intro: {
    p1: string;
    p2: string;
    bullets: string[];
    p3: string;
  };
};

const CITY: Record<CityKey, CityConfig> = {
  zurich: {
    key: "zurich",
    label: "Zurich",
    locationMatch: /\bzurich\b/i,
    marketSlug: "zurich",
    intro: {
      p1:
        "Zurich is Switzerland’s core onshore wealth hub, anchored by a dense base of Swiss-domiciled entrepreneurs, executives and multi-banking UHNW families. For senior Relationship Managers, Zurich offers proximity to decision-makers, credit committees and corporate balance sheets—often with stronger onshore dynamics than purely international booking-centre models.",
      p2:
        "Hiring in Zurich typically rewards well-documented franchises (revenue quality, sustainable advisory fees, disciplined lending usage) and clean, transparent coverage frameworks. Platforms value bankers who can combine local credibility with institutional standards across suitability, investment governance and risk.",
      bullets: [
        "Onshore relevance: Swiss-resident and DACH client depth, clearly documented.",
        "Balance-sheet usage: Lombard, mortgages and structured lending alongside investments.",
        "High governance: predictable approvals and scrutiny on portability assumptions.",
        "Lifestyle: stable, high-income city with strong infrastructure and schooling.",
      ],
      p3:
        "Executive Partners runs both public and off-market mandates in Zurich. If you prefer discretion, share your profile via the Candidates hub or speak directly with our team before a formal application.",
    },
  },

  dubai: {
    key: "dubai",
    label: "Dubai",
    locationMatch: /\bdubai\b/i,
    marketSlug: "dubai",
    intro: {
      p1:
        "Dubai has become one of the most visible wealth hubs for GCC, wider Middle East and internationally mobile families. Senior private bankers base themselves here to be closer to decision-makers while still coordinating with global booking centres (Switzerland, Singapore, and other offshore locations depending on platform architecture).",
      p2:
        "Strong platforms in the UAE emphasise robust KYC, source-of-wealth documentation and disciplined cross-border practices, particularly within DIFC/ADGM regulatory expectations. Hiring decisions tend to focus on relationship durability, revenue quality and how portable assets can be migrated within a compliant framework.",
      bullets: [
        "Regional proximity: access to GCC and broader Middle East client flows.",
        "Multi-centre options: allocation across UAE/CH/SG/offshore structures (platform-dependent).",
        "Growth environment: continuing wealth inflows and family-asset structuring needs.",
        "International lifestyle: attractive base for globally mobile bankers and families.",
      ],
      p3:
        "If you are considering a move, model assumptions first (revenue, ROA, portability) and then speak with us confidentially—many mandates are not advertised publicly.",
    },
  },

  singapore: {
    key: "singapore",
    label: "Singapore",
    locationMatch: /\bsingapore\b/i,
    marketSlug: "singapore",
    intro: {
      p1:
        "Singapore is a leading wealth hub for ASEAN and a key pillar in many banks’ Asia strategies, often paired with Hong Kong in a dual-centre model. Senior RMs relocate here to consolidate regional coverage under a stable legal environment with deep wealth-management infrastructure.",
      p2:
        "Hiring in Singapore tends to favour bankers with disciplined advisory processes, clear client segmentation by domicile and booking needs, and the ability to work with family governance, structuring and succession planning. Platforms value long-term franchise building, not only activity-driven flows.",
      bullets: [
        "Regional gateway: ASEAN coverage plus connectivity to North Asia models.",
        "Strong ecosystem: lawyers, trustees, family-office and structuring capabilities.",
        "Stable operating base: efficient, predictable environment for families and bankers.",
        "Institutional approach: emphasis on governance, documentation and suitability.",
      ],
      p3:
        "We share both visible and confidential searches for Singapore. If you want a discreet discussion first, use the Candidates hub or contact us directly.",
    },
  },

  london: {
    key: "london",
    label: "London",
    locationMatch: /\blondon\b/i,
    marketSlug: "london",
    intro: {
      p1:
        "London remains a major hub for onshore UK wealth management and international private banking, supported by a deep professional-services network and strong connectivity to capital markets and alternatives. It is particularly relevant for UK-resident clients, internationally mobile families with UK ties, and planning-led advisory models.",
      p2:
        "FCA-regulated environments reward documented suitability, consistent advice processes and sustainable, fee-based revenue. Hiring committees often assess governance discipline, client servicing standards and how the banker’s franchise aligns with platform segmentation and risk appetite.",
      bullets: [
        "Planning-led franchises: advisory, discretionary and recurring fee models.",
        "Capital-markets depth: institutional ideas, alternatives and structured solutions.",
        "Dense ecosystem: lawyers, accountants, corporate finance and trustees.",
        "Platform variety: universal banks, UK private banks, boutiques and MFOs.",
      ],
      p3:
        "We can discuss London opportunities confidentially and help translate your track record into an approvals-ready business case before you engage with a platform.",
    },
  },

  "new-york": {
    key: "new-york",
    label: "New York",
    locationMatch: /\bnew york\b|\bnyc\b/i,
    marketSlug: "new-york",
    intro: {
      p1:
        "New York is a core hub for US-taxable wealth and complex household-level planning, with close access to capital markets, product specialists and a dense network of legal and tax advisers. Senior advisers relocate here to build planning-led, multi-generational relationships supported by institutional-grade resources.",
      p2:
        "US platforms place strong emphasis on documented advisory processes, supervision and suitability frameworks. Hiring decisions typically focus on the durability of household relationships, planning depth and revenue sustainability rather than purely transactional production.",
      bullets: [
        "Planning depth: household balance sheets, estate and trust planning coordination.",
        "Institutional resources: product, alternatives, credit and capital markets access.",
        "Governance: strong supervision and documentation expectations.",
        "Scale: large addressable market with high concentration of wealthy households.",
      ],
      p3:
        "If you are considering a move, we can help frame your business case and portability assumptions before you speak with a hiring committee.",
    },
  },

  miami: {
    key: "miami",
    label: "Miami",
    locationMatch: /\bmiami\b/i,
    marketSlug: "miami",
    intro: {
      p1:
        "Miami is a strategic wealth hub with strong connectivity to Latin America and internationally mobile families, often combining US platforms with cross-border advisory needs. Senior bankers relocate here to sit closer to LatAm decision-makers while maintaining access to deep US product shelves and credit solutions.",
      p2:
        "Hiring committees typically scrutinise client segmentation (US-taxable vs international), booking frameworks, governance discipline and revenue resilience through market cycles. Strong franchises show durable relationships, transparent structures and documented advisory processes.",
      bullets: [
        "LatAm connectivity: proximity to key families and entrepreneurs.",
        "Hybrid models: US wealth + international cross-border frameworks (platform-dependent).",
        "Credit & solutions: strong lending and structured capabilities in many firms.",
        "Lifestyle hub: attractive base for internationally mobile families.",
      ],
      p3:
        "Many Miami searches remain discreet. Share your profile confidentially or speak with us before applying to live mandates.",
    },
  },

  madrid: {
    key: "madrid",
    label: "Madrid",
    locationMatch: /\bmadrid\b/i,
    marketSlug: "madrid",
    intro: {
      p1:
        "Madrid is a key wealth-management hub for Spain, supported by family-owned businesses, executives and internationally connected entrepreneurs. Senior bankers move to Madrid for proximity to business owners, family governance discussions and a strong domestic market with increasing international structuring needs.",
      p2:
        "Platforms often look for bankers who can combine local credibility with disciplined advisory processes, transparent suitability and a broad solutions toolkit (investments, lending, and wealth planning). Hiring decisions tend to focus on relationship durability and documented production quality.",
      bullets: [
        "Entrepreneurial wealth: strong link to operating businesses and liquidity events.",
        "Advisory focus: disciplined planning and suitability-led client servicing.",
        "International connectivity: cross-border wealth structuring demand increasing.",
        "Quality-of-life: strong lifestyle and connectivity within Europe.",
      ],
      p3:
        "If you want to explore Madrid opportunities discreetly, start with a confidential conversation rather than a formal application.",
    },
  },

  paris: {
    key: "paris",
    label: "Paris",
    locationMatch: /\bparis\b/i,
    marketSlug: "paris",
    intro: {
      p1:
        "Paris is a major hub for French-resident wealth, including entrepreneurs, executives and multi-generational family groups—often with complex tax, legal and structuring constraints. Senior private bankers move to Paris to sit closer to decision-makers and deepen planning-led relationships.",
      p2:
        "Hiring typically rewards bankers who can document advisory processes and navigate suitability expectations with discipline. Platforms value strong coordination with lawyers, tax advisers and structuring partners, and clear client segmentation by residency and wealth complexity.",
      bullets: [
        "French-resident wealth: entrepreneurs, corporate owners and family groups.",
        "Planning & structuring: strong coordination with tax/legal/insurance partners.",
        "Advisory discipline: documented suitability and consistent client governance.",
        "Cross-border angle: links to CH/LU structures where relevant and compliant.",
      ],
      p3:
        "We support discreet Paris searches and can help structure your business case before you engage with a platform.",
    },
  },

  lisbon: {
    key: "lisbon",
    label: "Lisbon",
    locationMatch: /\blisbon\b/i,
    marketSlug: "lisbon",
    intro: {
      p1:
        "Lisbon has become increasingly relevant for internationally mobile families and entrepreneurs, combining local European access with cross-border structuring needs. Senior bankers move to Lisbon to serve clients with relocation, residency and multi-jurisdictional asset structures.",
      p2:
        "Hiring decisions often focus on the clarity of client residency/tax profiles, the quality of planning relationships and how portable assets can realistically move under a compliant framework. Strong franchises are planning-led and anchored in durable adviser networks.",
      bullets: [
        "International mobility: clients with relocation and cross-border structuring needs.",
        "Planning-led relationships: tax/legal/real estate adviser connectivity.",
        "Transparent portability: realistic migration assumptions and documented revenue.",
        "Lifestyle hub: attractive base for families within Europe.",
      ],
      p3:
        "If you are considering Lisbon, we can pressure-test your portability assumptions and help position your move with the right platform fit.",
    },
  },

  milan: {
    key: "milan",
    label: "Milano",
    locationMatch: /\bmilan\b|\bmilano\b/i,
    marketSlug: "milan",
    intro: {
      p1:
        "Milano is Italy’s financial centre and a major hub for private banking relationships tied to family-owned industrial and services businesses. Senior bankers move to Milano to sit close to business owners, governance discussions and liquidity events that drive long-term wealth needs.",
      p2:
        "Platforms typically value bankers who can document both personal and business-linked wealth dynamics, and who can deliver advisory processes with strong governance. Hiring often emphasises relationship durability, wallet-share capture and disciplined suitability standards.",
      bullets: [
        "Entrepreneurial wealth: family businesses, succession and liquidity events.",
        "Integrated needs: investment advisory plus credit and corporate-linked solutions.",
        "Governance discipline: documented advice and suitability consistency.",
        "Strong ecosystem: lawyers, accountants, corporate advisers and family offices.",
      ],
      p3:
        "We run Milano searches discreetly and can discuss the best platform fit before a formal application.",
    },
  },
};

export async function generateStaticParams() {
  const keys = Object.keys(CITY) as CityKey[];
  return keys.map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const key = city as CityKey;
  const cfg = CITY[key];
  if (!cfg) return { robots: { index: false, follow: true } };

  const canonical = `${SITE}/en/private-banking-jobs/${cfg.key}`;

  return {
    title: `Private Banking Jobs in ${cfg.label} | Executive Partners`,
    description: `Explore confidential Private Banking jobs in ${cfg.label}. Senior Relationship Manager, Team Head and leadership mandates via Executive Partners.`,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: `Private Banking Jobs in ${cfg.label} | Executive Partners`,
      description: `Confidential private banking and wealth management mandates in ${cfg.label}.`,
      siteName: "Executive Partners",
    },
    robots: { index: true, follow: true },
  };
}

export default async function CityJobsHubPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const key = city as CityKey;
  const cfg = CITY[key];

  if (!cfg) notFound();

  const cityJobs = jobsList
    .filter((j) => j.active !== false)
    .filter((j) => cfg.locationMatch.test(j.location || ""));

  const jobsFilteredHref = (() => {
    const sp = new URLSearchParams();
    sp.set("location", cfg.label);
    return `/jobs?${sp.toString()}`;
  })();

  const marketHref = cfg.marketSlug ? `/en/markets/${cfg.marketSlug}` : "/en/markets";

  return (
    <main className="min-h-screen bg-[#0B0E13] text-white">
      <section className="mx-auto max-w-6xl px-6 py-14">
        {/* HERO */}
        <header className="mb-10 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] text-brandGoldSoft">
            Private Banking · {cfg.label}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
            Private Banking Jobs in {cfg.label}
          </h1>

          {/* Quick internal links (SEO + UX) */}
          <div className="mt-5 flex flex-wrap gap-2 text-sm">
            <Link
              href={jobsFilteredHref}
              className="rounded-full border border-brandGold/40 bg-black/30 px-3 py-1 text-xs font-semibold text-brandGoldPale hover:bg-brandGold/12 hover:text-white"
            >
              View all Jobs ({cfg.label})
            </Link>
            <Link
              href={marketHref}
              className="rounded-full border border-brandGold/40 bg-black/30 px-3 py-1 text-xs font-semibold text-brandGoldPale hover:bg-brandGold/12 hover:text-white"
            >
              {cfg.label} Market Overview
            </Link>
            <Link
              href="/en/candidates"
              className="rounded-full border border-brandGold/40 bg-black/30 px-3 py-1 text-xs font-semibold text-brandGoldPale hover:bg-brandGold/12 hover:text-white"
            >
              Candidates
            </Link>
            <Link
              href="/en/contact"
              className="rounded-full border border-brandGold/40 bg-black/30 px-3 py-1 text-xs font-semibold text-brandGoldPale hover:bg-brandGold/12 hover:text-white"
            >
              Contact
            </Link>
            <Link
              href={`/bp-simulator?src=${cfg.key}_jobs_hub`}
              className="rounded-full border border-brandGold/40 bg-black/30 px-3 py-1 text-xs font-semibold text-brandGoldPale hover:bg-brandGold/12 hover:text-white"
            >
              BP Simulator
            </Link>
          </div>
        </header>

        {/* SEO CONTENT */}
        <article className="max-w-3xl space-y-4 text-neutral-200">
          <p>{cfg.intro.p1}</p>
          <p>{cfg.intro.p2}</p>
          <ul className="space-y-2 pt-1 text-neutral-100">
            {cfg.intro.bullets.map((b) => (
              <li key={b}>• {b}</li>
            ))}
          </ul>
          <p className="pt-1">{cfg.intro.p3}</p>

          <p className="pt-2 text-neutral-300">
            If you want to start discreetly, submit via{" "}
            <Link href="/en/candidates" className="text-brandGold underline underline-offset-2">
              the Candidates hub
            </Link>{" "}
            or{" "}
            <Link href="/en/contact" className="text-brandGold underline underline-offset-2">
              contact Executive Partners
            </Link>
            . You can also model a move via{" "}
            <Link
              href={`/bp-simulator?src=${cfg.key}_jobs_body`}
              className="text-brandGold underline underline-offset-2"
            >
              the Business Plan Simulator
            </Link>
            .
          </p>
        </article>

        {/* JOB LIST */}
        <section className="mt-14">
          <h2 className="mb-6 text-2xl font-semibold">Current Opportunities</h2>

          {cityJobs.length === 0 ? (
            <p className="text-neutral-300">
              No roles are publicly listed for {cfg.label} at the moment. Many mandates are
              handled confidentially—speak with us directly.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {cityJobs.map((job) => (
                <Link
                  key={job.slug}
                  href={`/jobs/${job.slug}`}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-brandGold/50"
                >
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <p className="mt-1 text-sm text-neutral-300">
                    {job.location} · {job.market}
                  </p>
                  <p className="mt-2 text-sm text-neutral-400 line-clamp-2">
                    {job.summary}
                  </p>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-6">
            <Link
              href={jobsFilteredHref}
              className="inline-flex items-center rounded-xl border border-brandGold/40 bg-black/30 px-4 py-2 text-sm font-semibold text-brandGoldPale hover:bg-brandGold/15 hover:text-white"
            >
              Browse all jobs filtered for {cfg.label} →
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center">
          <h3 className="text-xl font-semibold">
            Explore {cfg.label} Opportunities Confidentially
          </h3>
          <p className="mt-3 text-neutral-300">
            Many senior mandates are not published. Share your profile discreetly or speak to us first.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-4">
            <Link
              href="/en/candidates"
              className="rounded-full bg-brandGold px-6 py-3 text-sm font-semibold text-black"
            >
              Submit your profile
            </Link>
            <Link
              href="/en/contact"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:border-brandGold"
            >
              Contact us
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}