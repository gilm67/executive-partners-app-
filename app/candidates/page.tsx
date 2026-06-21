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
  alternates: { canonical: "https://www.execpartners.ch/en/candidates" },
  openGraph: {
    title:
      "Private Banking & Wealth Management Career Moves — Candidates ",
    description:
      "Discreet executive search for HNW/UHNW Private Banking talent. Geneva- and Zurich-led with mandates across London, Dubai, Singapore, Hong Kong, New York and Miami.",
    url: `${SITE}/en/candidates`,
    siteName: "Executive Partners",
    images: [{ url: "/og.webp" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Private Banking & Wealth Management Career Moves — Candidates ",
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
    url: `${SITE}/en/candidates`,
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
          { name: "For Private Bankers", url: `${SITE}/en/candidates` },
        ]}
      />

      {/* Service Schema (using component) */}
      <ServiceSchema
        name="Private Banking Career Guidance"
        description="Confidential executive search support for Senior Private Bankers, Relationship Managers and Team Heads. Benchmark compensation, assess portability and submit your CV securely across global wealth hubs including Geneva, Zurich, Dubai, Singapore, London, New York and Hong Kong."
      />

      <main className="relative min-h-screen text-white">
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
              Private Banking Jobs Switzerland — Confidential Career Guidance
            </h1>
            <p className="mx-auto max-w-3xl text-neutral-300">
              Geneva &amp; Zurich first—plus Dubai, Singapore, London and New
              York. Share your profile in confidence and we'll contact you when
              there's a strong fit.
            </p>

            {/* helpful internal links */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm">
              <Link
                href="/en/jobs"
                className="rounded-full border border-brandGold/40 bg-black/30 px-3 py-1 text-xs font-semibold text-brandGoldPale hover:bg-brandGold/12 hover:text-white"
              >
                View Private Banking Jobs
              </Link>
              <Link
                href="/en/apply"
                className="rounded-full border border-brandGold/40 bg-black/30 px-3 py-1 text-xs font-semibold text-brandGoldPale hover:bg-brandGold/12 hover:text-white"
              >
                Submit CV
              </Link>
              <Link
                href="/en/contact"
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
                <PrimaryButton href="/en/apply" className="w-full">
                  Submit my profile (confidential)
                </PrimaryButton>

                <SecondaryButton href="/en/jobs" className="w-full">
                  View current opportunities
                </SecondaryButton>

                <SecondaryButton
                  href="/en/bp-simulator?src=candidates_cta"
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
                href="/en/candidates#faqs"
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
        
      {/* ── WINNING DOSSIER ── */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="rounded-3xl border border-[#C9A14A]/20 bg-gradient-to-br from-[#C9A14A]/8 via-white/[0.02] to-white/[0.02] px-6 py-8 md:px-10 md:py-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C9A14A]">
            The EP Process
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
            How we turn your book into a winning business case
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/60 max-w-2xl">
            A raw AUM figure is not a business case. A senior RM walking into a hiring conversation with a number — even a large one — is in a weaker position than one who arrives with a documented portability rationale, a three-year revenue model, and a pre-cleared compliance picture. Here is exactly what EP builds before your name goes anywhere.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Portability mapping",
                benefit: "You know your real number before any bank does.",
                desc: "We run the full Portability Score framework with you — AUM composition, wallet share by client tier, non-solicit clause analysis, and cross-border compliance status. Most bankers discover their true portable fraction is different from their assumption. You find out in a private conversation with us, not in a hiring meeting.",
              },
              {
                step: "02",
                title: "Business case construction",
                benefit: "A document a hiring committee can approve, not a number they have to verify.",
                desc: "We build a three-year revenue model: conservative year-one transfer estimate, base case by year two, target by year three. Break-even AUM. NPC buyout recommendation. The banks that move fastest on offers are working from documentation, not verbal AUM claims. We give you that documentation.",
              },
              {
                step: "03",
                title: "Compliance pre-check",
                benefit: "Clients that would have stalled on onboarding are resolved before you resign.",
                desc: "We map your cross-border client relationships against current KYC and AML standards at the target institution. Any documentation gaps are identified and addressed before the introduction. No surprises during onboarding. No clients rejected after you have already moved.",
              },
              {
                step: "04",
                title: "Selective introduction",
                benefit: "One institution. One decision-maker. Full dossier attached.",
                desc: "We introduce you to one institution at a time with the complete package attached. No simultaneous approaches. No market noise. No CV circulating without your knowledge. Average mandate-to-offer across EP placements: 17 days.",
              },
            ].map((item) => (
              <div key={item.step} className="rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col">
                <p className="text-2xl font-light text-[#C9A14A]/50 mb-3">{item.step}</p>
                <h3 className="text-sm font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-xs font-medium text-[#C9A14A] mb-2 leading-snug">{item.benefit}</p>
                <p className="text-xs leading-relaxed text-white/45 flex-1">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/en/portability"
              className="inline-flex items-center rounded-xl bg-[#C9A14A] px-5 py-2.5 text-sm font-semibold text-black hover:opacity-90 transition"
            >
              Start with your Portability Score →
            </a>
            <a
              href="/en/bp-simulator"
              className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              Build your business case
            </a>
          </div>
        </div>
      </section>

      <CandidateFAQ compact={false} anchorId="faqs" />

      {/* Specialist market desks */}
      <section className="px-4 py-10 border-t border-white/10 max-w-5xl mx-auto w-full">
        <p className="text-xs uppercase tracking-widest text-white/30 mb-5">Specialist Market Desks</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          {[
            { href: "/en/latam-private-banking-recruiter-geneva", label: "LATAM private banking — Geneva" },
            { href: "/en/mea-private-banking-recruiter-geneva", label: "MEA private banking — Geneva" },
            { href: "/en/nri-private-banking-recruiter-switzerland", label: "NRI private banking — Switzerland" },
            { href: "/en/israeli-market-private-banking-switzerland", label: "Israeli market — Switzerland" },
          ].map(({ href, label }) => (
            <a key={href} href={href} className="text-white/50 hover:text-white transition border border-white/10 rounded px-3 py-2">
              {label}
            </a>
          ))}
        </div>
      </section>
      </main>
    </>
  );
}