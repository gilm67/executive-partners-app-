// app/candidates/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 60;

const SITE =
  (process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")) ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://www.execpartners.ch");

export const metadata: Metadata = {
  title: "Private Banking Careers — Candidates | Executive Partners",
  description:
    "Confidential moves for Private Bankers and Senior Relationship Managers. Geneva & Zurich first, plus Dubai, Singapore, London and New York. Submit your CV securely.",
  alternates: { canonical: `${SITE}/candidates` },
  openGraph: {
    title: "Private Banking Careers — Candidates | Executive Partners",
    description:
      "Discreet executive search for HNW/UHNW Private Banking. Switzerland-focused with global reach.",
    url: `${SITE}/candidates`,
    images: [{ url: "/og.png" }],
  },
};

export default function CandidatesPage() {
  // JSON-LD: FAQ (rich results)
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

  // JSON-LD: Breadcrumbs
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Candidates", item: `${SITE}/candidates` },
    ],
  };

  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white">
      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* ambient background glow (matches site) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 420px at 18% -10%, rgba(59,130,246,.16) 0%, rgba(59,130,246,0) 60%), radial-gradient(1000px 380px at 110% 0%, rgba(16,185,129,.15) 0%, rgba(16,185,129,0) 60%)",
        }}
      />

      <section className="relative mx-auto max-w-6xl px-4 pb-20 pt-14">
        {/* SEO H1 */}
        <header className="mx-auto max-w-5xl space-y-2 text-center">
          <div className="mx-auto w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 shadow-sm backdrop-blur">
            For Candidates — Private Banking Careers
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Confidential Moves for Private Bankers
          </h1>
          <p className="mx-auto max-w-3xl text-neutral-300">
            Geneva &amp; Zurich first—plus Dubai, Singapore, London and New York. Share your profile in confidence and we’ll contact you when there’s a strong fit.
          </p>
          {/* helpful internal links */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm">
            <Link href="/jobs" className="rounded-full border border-white/15 bg-white/5 px-3 py-1 hover:bg-white/10">View Private Banking Jobs</Link>
            <Link href="/apply" className="rounded-full border border-white/15 bg-white/5 px-3 py-1 hover:bg-white/10">Submit CV</Link>
            <Link href="/contact" className="rounded-full border border-white/15 bg-white/5 px-3 py-1 hover:bg-white/10">Contact a Recruiter</Link>
          </div>
        </header>

        {/* Your original content, polished */}
        <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2">
          {/* Left: quick explanation */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="mb-2 text-lg font-bold text-white">How it works</h2>
            <ul className="list-disc space-y-2 pl-5 text-neutral-300">
              <li>Your details are stored securely and never shared without consent.</li>
              <li>We match you to current &amp; upcoming mandates that fit your market and seniority.</li>
              <li>You can also apply directly to any role on the Jobs page.</li>
            </ul>
            <p className="mt-4 text-sm text-neutral-400">
              Tip: include preferred market(s), AUM portability, and mobility.
            </p>
          </div>

          {/* Right: actions */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="mb-4 text-lg font-bold text-white">Get started</h2>
            <div className="space-y-3">
              <Link
                href="/apply"
                className="inline-flex w-full items-center justify-center rounded-xl bg-[#1D4ED8] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1E40AF]"
              >
                Submit my profile (confidential)
              </Link>
              <Link
                href="/jobs"
                className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View current opportunities
              </Link>
              <Link
                href="/bp-simulator?src=candidates_cta"
                className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                For RMs: BP Simulator / Tools
              </Link>
            </div>
          </div>
        </div>

        {/* Small FAQ section matching JSON-LD */}
        <section className="mx-auto mt-10 max-w-5xl rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-bold">FAQs</h2>
          <div className="mt-4 space-y-4 text-sm text-neutral-300">
            <div>
              <div className="font-semibold text-white">Is my application confidential?</div>
              <p className="mt-1">Yes. We operate quiet processes and never share your CV without explicit permission.</p>
            </div>
            <div>
              <div className="font-semibold text-white">Which markets do you cover?</div>
              <p className="mt-1">Geneva and Zurich as a priority, plus Dubai, Singapore, London, New York and Hong Kong.</p>
            </div>
            <div>
              <div className="font-semibold text-white">What seniorities do you place?</div>
              <p className="mt-1">Senior Relationship Managers (Director/ED/MD), Team Heads, Market/Desk Leads and leadership.</p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}