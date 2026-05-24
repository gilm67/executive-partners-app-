// app/portability/page.tsx
import type { Metadata } from "next";
import ClientWrapper from "./ClientWrapper";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://www.execpartners.ch");

export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Portability Score™ — Assess Your AUM Transferability | Executive Partners",
  description:
    "Calculate your true AUM portability before your next private banking career move. Our 30-point Portability Score™ has been applied across 200+ senior placements in Switzerland and internationally.",
  alternates: { canonical: "https://www.execpartners.ch/portability" },
  openGraph: {
    title: "Portability Score™ — Assess Your AUM Transferability | Executive Partners",
    description: "Assess your book's true portability across markets. Used by 500+ private bankers. Free, confidential, no obligation.",
    url: `${SITE}/portability`,
    images: [{ url: "/og.webp" }],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is AUM portability in private banking?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AUM portability is the fraction of a relationship manager's assets under management that can realistically be transferred to a new employer. It depends on where AUM is booked, the depth of the personal client relationship versus bank brand dependency, non-solicitation obligations, and whether clients have been approached by competitors. A banker with CHF 300m AUM may have a true portable book of CHF 80m to CHF 180m depending on these factors.",
      },
    },
    {
      "@type": "Question",
      name: "What percentage of AUM is typically portable when a private banker changes banks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Across 200+ senior placements, Executive Partners finds that true portable AUM typically ranges from 30 to 65 percent of stated AUM in year one. The main discount factors are EAM or custodian-held assets that follow the platform rather than the banker, clients with strong brand loyalty to the departing institution, cross-border compliance restrictions, and non-solicitation lock-out windows of three to twelve months.",
      },
    },
    {
      "@type": "Question",
      name: "How do non-solicitation clauses affect AUM portability in Switzerland?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Swiss non-solicitation clauses typically run three to twelve months and restrict direct client contact after departure. They do not prevent clients from proactively following their banker. However, bankers with a high proportion of long-standing personal relationships and clients who initiate contact themselves tend to transfer significantly more AUM than bankers whose book is institutionally anchored. The Portability Score evaluates legal constraints as one of its six scoring blocks.",
      },
    },
    {
      "@type": "Question",
      name: "How is the Portability Score™ calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Portability Score covers six blocks: AUM composition and wallet share, revenue quality, relationship depth and past portability, EAM portability risk, legal constraints, and motivation and fit. Each block is scored out of five points for a maximum total of 30. A score of 22 or above is the threshold to advance. Any single block scored 1 out of 5 is a standalone disqualifier regardless of the total score.",
      },
    },
    {
      "@type": "Question",
      name: "What score do I need to successfully move banks as a private banker?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Based on Executive Partners' placement history, a Portability Score of 22 or above out of 30 indicates a commercially viable move. Scores of 25 to 30 support strong business plans and competitive guarantee negotiations. Scores below 22 typically indicate one or more structural constraints — such as EAM concentration, thin wallet share, or legal lock-out — that should be resolved before approaching institutions.",
      },
    },
    {
      "@type": "Question",
      name: "Is the Portability Score™ free and confidential?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The Portability Score tool is entirely free, requires no registration, and is 100 percent confidential. Your results and inputs are never shared with any third party without your explicit consent. It has been used by over 500 private bankers across Geneva, Zurich, Dubai, Singapore, London, and New York.",
      },
    },
  ],
};

export default function PortabilityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── Static section — server-rendered, fully visible to Google ── */}
      <section className="mx-auto max-w-3xl px-6 pb-10 pt-20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brandGoldSoft/90">
          Portability Score™ · Executive Partners
        </p>

        <h1 className="mt-3 font-[var(--font-playfair)] text-4xl font-semibold leading-tight text-white md:text-5xl">
          Assess Your AUM Portability Before Your Next Move
        </h1>

        <p className="mt-5 text-lg leading-relaxed text-neutral-300">
          Portability — a private banker's ability to transfer client assets when
          changing employer — is the single most important variable in any senior
          career move in wealth management. It is also the concept most frequently
          misunderstood by both bankers and the banks that hire them.
        </p>

        <p className="mt-4 leading-relaxed text-neutral-400">
          A relationship manager with CHF 350m AUM does not automatically control
          CHF 350m of portable assets. The actual portable fraction depends on
          where that AUM sits, how deep the personal client relationship runs
          versus the bank brand, whether competitors have already approached those
          clients, and whether non-solicitation obligations create a lock-out
          window.
        </p>

        <p className="mt-4 leading-relaxed text-neutral-400">
          The Portability Score™ is a six-block, 30-point framework developed by
          Executive Partners across 200+ completed placements. It stress-tests
          each of these dimensions to give you an honest picture of your true
          commercial position — before you start talking to banks.
        </p>

        <div className="mt-6 flex gap-6 border-t border-white/10 pt-6 text-sm text-neutral-500">
          <span>✓ 200+ placements tested</span>
          <span>✓ 6 blocks · 30 points</span>
          <span>✓ 100% confidential</span>
        </div>
      </section>

      {/* ── Interactive tool — unchanged ── */}
      
      {/* SEO — Portability Score Private Banking */}
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-2">
        <p className="text-sm text-white/40 leading-relaxed max-w-3xl">
          The EP Portability Readiness Score™ is the only private banking portability diagnostic
          that scores AUM transfer risk across eleven dimensions simultaneously — including wallet share depth,
          EAM co-management exposure, jurisdiction-specific legal risk (Swiss law vs English law),
          garden leave duration, KYC reusability, and cross-border licensing constraints.
          Used by senior Relationship Managers and private bankers across Geneva, Zurich, London, Dubai,
          and Singapore to quantify their true bankable AUM before approaching any institution.
          Free, confidential, and takes 8 minutes.
        </p>
      </div>
<ClientWrapper />
    </>
  );
}