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
  alternates: { canonical: "/portability" },
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
        text: "Portability is the fraction of a banker's assets under management that can realistically be transferred to a new employer. It depends on where AUM sits, relationship depth, non-solicitation clauses, and whether clients have been approached by competitors.",
      },
    },
    {
      "@type": "Question",
      name: "How is the Portability Score™ calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The score covers six blocks: AUM composition and wallet share, revenue quality, relationship depth, EAM portability risk, legal constraints, and motivation and fit. Maximum score is 30 points. A score of 22 or above is required to advance. Any single block scored 1 out of 5 is a standalone disqualifier.",
      },
    },
    {
      "@type": "Question",
      name: "Is the Portability Score™ free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The tool is entirely free and confidential. No registration is required and your results are never shared without your consent.",
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
      <ClientWrapper />
    </>
  );
}