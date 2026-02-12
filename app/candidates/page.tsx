// app/candidates/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";
import CandidateFAQ from "@/components/CandidateFAQ";
import { BreadcrumbSchema, ServiceSchema } from "@/components/StructuredData";

export const revalidate = 60;

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://www.execpartners.ch");

export const metadata: Metadata = {
  title: {
    absolute:
      "Private Banking & Wealth Management Career Moves — Candidates | Executive Partners",
  },
  description:
    "Confidential executive search support for Senior Private Bankers, Relationship Managers and Team Heads. Benchmark compensation, assess portability and submit your CV securely across global wealth hubs.",
  alternates: { canonical: "/candidates" },
  openGraph: {
    title:
      "Private Banking & Wealth Management Career Moves — Candidates | Executive Partners",
    description:
      "Discreet executive search for HNW/UHNW Private Banking talent. Geneva- and Zurich-led with mandates across London, Dubai, Singapore, Hong Kong, New York and Miami.",
    url: `${SITE}/candidates`,
    siteName: "Executive Partners",
    images: [{ url: "/og.webp" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Private Banking & Wealth Management Career Moves — Candidates | Executive Partners",
    description:
      "Geneva-based boutique advising Senior Private Bankers, RMs and Team Heads on confidential career moves across major private banking hubs.",
  },
  robots: { index: true, follow: true },
};

export default function CandidatesPage() {
  // JSON-LD: FAQ (rich results) — keep top 3 questions aligned with on-page teaser
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is my application confidential?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. We operate quiet, invitation-only processes and never share your CV or details without your explicit permission.",
        },
      },
      {
        "@type": "Question",
        name: "Which markets do you cover?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Geneva and Zurich as a priority, plus Dubai, Singapore, London, New York and Hong Kong for cross-border Private Banking.",
        },
      },
      {
        "@type": "Question",
        name: "What seniorities do you place?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Senior Relationship Managers (Director/ED/MD), Team Heads, Market/Desk Leads and select leadership roles.",
        },
      },
    ],
  };

  // JSON-LD: WebPage / audience for candidates
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name:
      "Private Banking & Wealth Management Career Moves for Candidates | Executive Partners",
    url: `${SITE}/candidates`,
    description:
      "Confidential advisory and executive search support for Senior Private Bankers, Relationship Managers and Team Heads across leading global wealth hubs.",
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      name: "Executive Partners",
      url: SITE,
    },
    about: [
      "Private Banking recruitment",
      "Wealth Management executive search",
      "Senior Relationship Managers",
      "Team Heads and Market Leaders",
    ],
    audience: {
      "@type": "Audience",
      audienceType: [
        "Senior Private Banker",
        "Senior Relationship Manager",
        "Team Head",
        "Market Leader",
      ],
    },
  };

  return (
    <>
      {/* Breadcrumb Schema (using component) */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE },
          { name: "For Private Bankers", url: `${SITE}/candidates` },
        ]}
      />

      {/* Service Schema (using component) */}
      <ServiceSchema
        name="Private Banking Career Guidance"
        description="Confidential executive search support for Senior Private Bankers, Relationship Managers and Team Heads. Benchmark compensation, assess portability and submit your CV securely across global wealth hubs including Geneva, Zurich, Dubai, Singapore, London, New York and Hong Kong."
      />

      <main className="relative min-h-screen bg-[#0B0E13] text-white">
        {/* Structured data - FAQ and WebPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
        />

        {/* ambient background glow – gold themed */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 420px at 18% -10%, rgba(201,161,74,.22) 0%, rgba(201,161,74,0) 55%), radial-gradient(1000px 380px at 110% 0%, rgba(245,231,192,.20) 0%, rgba(245,231,192,0) 60%)",
          }}
        />

        <section className="relative mx-auto max-w-6xl px-4 pb-20 pt-14">
          {/* SEO H1 */}
          <header className="mx-auto max-w-5xl space-y-3 text-center">
            <p className="mx-auto text-[11px] font-semibold uppercase tracking-[0.28em] text-brandGoldSoft/90">
              For Candidates · Private Banking Careers
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              Confidential Moves for Private Bankers
            </h1>
            <p className="mx-auto max-w-3xl text-neutral-300">
              Geneva &amp; Zurich first—plus Dubai, Singapore, London and New
              York. Share your profile in confidence and we'll contact you when
              there's a strong fit.
            </p>

            {/* helpful internal links */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm">
              <Link
                href="/jobs"
                className="rounded-full border border-brandGold/40 bg-black/30 px-3 py-1 text-xs font-semibold text-brandGoldPale hover:bg-brandGold/12 hover:text-white"
              >
                View Private Banking Jobs
              </Link>
              <Link
                href="/apply"
                className="rounded-full border border-brandGold/40 bg-black/30 px-3 py-1 text-xs font-semibold text-brandGoldPale hover:bg-brandGold/12 hover:text-white"
              >
                Submit CV
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-brandGold/40 bg-black/30 px-3 py-1 text-xs font-semibold text-brandGoldPale hover:bg-brandGold/12 hover:text-white"
              >
                Contact a Recruiter
              </Link>
            </div>
          </header>

          {/* Content */}
          <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2">
            {/* Left: quick explanation */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <h2 className="mb-2 text-lg font-bold text-white">How it works</h2>
              <ul className="list-disc space-y-2 pl-5 text-neutral-300">
                <li>
                  Your details are stored securely and never shared without
                  consent.
                </li>
                <li>
                  We match you to current &amp; upcoming mandates that fit your
                  market and seniority.
                </li>
                <li>
                  You can also apply directly to any role on the Jobs page.
                </li>
              </ul>
              <p className="mt-4 text-sm text-neutral-400">
                Tip: include preferred market(s), AUM portability, and mobility.
              </p>
            </div>

            {/* Right: actions */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <h2 className="mb-4 text-lg font-bold text-white">Get started</h2>
              <div className="space-y-3">
                <PrimaryButton href="/apply" className="w-full">
                  Submit my profile (confidential)
                </PrimaryButton>

                <SecondaryButton href="/jobs" className="w-full">
                  View current opportunities
                </SecondaryButton>

                <SecondaryButton
                  href="/bp-simulator?src=candidates_cta"
                  className="w-full"
                >
                  For RMs: BP Simulator / Tools
                </SecondaryButton>
              </div>
            </div>
          </div>

          {/* Top questions teaser + link to full FAQ */}
          <section className="mx-auto mt-10 max-w-5xl rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold">Top questions</h2>

              {/* ✅ This is the link you were clicking */}
              <Link
                href="/candidates#faqs"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brandGoldPale hover:underline"
              >
                View all FAQs →
              </Link>
            </div>

            <div className="mt-4 space-y-4 text-sm text-neutral-300">
              <div>
                <div className="font-semibold text-white">
                  Is my application confidential?
                </div>
                <p className="mt-1">
                  Yes. We operate quiet processes and never share your CV without
                  explicit permission.
                </p>
              </div>
              <div>
                <div className="font-semibold text-white">
                  Which markets do you cover?
                </div>
                <p className="mt-1">
                  Geneva and Zurich as a priority, plus Dubai, Singapore, London,
                  New York and Hong Kong.
                </p>
              </div>
              <div>
                <div className="font-semibold text-white">
                  What seniorities do you place?
                </div>
                <p className="mt-1">
                  Senior Relationship Managers (Director/ED/MD), Team Heads,
                  Market/Desk Leads and leadership.
                </p>
              </div>
            </div>
          </section>
        </section>

        {/* ✅ FULL FAQ SECTION (anchor target for /candidates#faqs) */}
        <CandidateFAQ compact={false} anchorId="faqs" />
      </main>
    </>
  );
}