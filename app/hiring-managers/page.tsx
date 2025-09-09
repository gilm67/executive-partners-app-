// app/hiring-managers/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import HiringManagersForm from "./HiringManagersForm";

/** Resolve absolute site URL from env or fallback */
const SITE =
  (process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")) ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://www.execpartners.ch");

/* ---------------- Meta (SEO) ---------------- */
export const metadata: Metadata = {
  title: "Hire Private Bankers — Hiring Managers | Executive Partners",
  description:
    "Targeted shortlists of Senior Relationship Managers and Private Bankers with real portability. Switzerland-first (Geneva & Zurich), plus MEA, UK, US & APAC coverage.",
  alternates: { canonical: `${SITE}/hiring-managers` },
  openGraph: {
    title: "Hire Private Bankers — Executive Partners",
    description:
      "Executive search for Private Banking & Wealth Management. Vetted, portable talent for HNW/UHNW markets.",
    url: `${SITE}/hiring-managers`,
    type: "website",
    images: [{ url: "/og.png" }],
  },
  robots: { index: true, follow: true },
};

/* ---------------- Page ---------------- */
export default function HiringManagersPage() {
  // JSON-LD: Service (what you offer to employers)
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Private Banking Executive Search",
    provider: {
      "@type": "Organization",
      name: "Executive Partners",
      url: SITE,
      logo: `${SITE}/icon.png`,
    },
    areaServed: ["CH", "AE", "GB", "US", "SG", "HK"],
    serviceType: "Executive Search — Private Banking & Wealth Management",
    description:
      "Research-led market mapping and targeted shortlists of portable Private Bankers and Relationship Managers for HNW/UHNW coverage.",
    url: `${SITE}/hiring-managers`,
  };

  // JSON-LD: FAQ
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How fast can we see a shortlist?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Typically within 5–10 working days for well-scoped mandates, based on active pipelines and research-backed mapping.",
        },
      },
      {
        "@type": "Question",
        name: "Do you validate portability?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes—calibration includes coverage checks, cross-border constraints, and realistic wallet transfer potential before interviews.",
        },
      },
      {
        "@type": "Question",
        name: "Which markets do you cover?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Switzerland (Geneva & Zurich) as a priority, plus MEA, UK, US, Singapore and Hong Kong via cross-border teams.",
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
      { "@type": "ListItem", position: 2, name: "Hiring Managers", item: `${SITE}/hiring-managers` },
    ],
  };

  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white">
      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section className="mx-auto max-w-6xl px-4 py-12">
        {/* SEO header */}
        <header className="mb-8 text-center">
          <div className="mx-auto w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 shadow-sm backdrop-blur">
            For Hiring Managers — Private Banking
          </div>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
            Targeted Shortlists with Real Portability
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-neutral-300">
            Switzerland-first (Geneva &amp; Zurich), plus MEA, UK, US &amp; APAC.
            Research-led mapping, calibrated outreach, and shortlists you can act on.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
            <Link href="/contact" className="rounded-full border border-white/15 bg-white/5 px-3 py-1 hover:bg-white/10">
              Share a Brief
            </Link>
            <Link href="/jobs" className="rounded-full border border-white/15 bg-white/5 px-3 py-1 hover:bg-white/10">
              View Live Mandates
            </Link>
            <Link href="/about" className="rounded-full border border-white/15 bg-white/5 px-3 py-1 hover:bg-white/10">
              About Us
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
          {/* Left: form */}
          <section className="md:col-span-3">
            <div className="mb-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <h2 className="text-sm font-semibold text-neutral-200">Create a confidential role</h2>
              <p className="mt-1 text-sm text-neutral-400">
                Entries publish to your jobs board (or can stay unlisted). We’ll calibrate and begin discrete outreach.
              </p>
            </div>
            <HiringManagersForm />
          </section>

          {/* Right: value props + posting guidelines */}
          <aside className="md:col-span-2">
            <div className="sticky top-6 space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5">
              <h2 className="text-sm font-semibold text-neutral-200">Why Executive Partners</h2>
              <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-300">
                <li>Portability obsessed: coverage checks before interviews.</li>
                <li>Quiet approach work that protects brands & careers.</li>
                <li>Swiss execution (Geneva & Zurich), global booking centers.</li>
              </ul>

              <hr className="border-white/10" />

              <h3 className="text-sm font-semibold text-neutral-200">Posting Guidelines</h3>
              <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-400">
                <li>Be precise on market (CH Onshore, MEA, UK, APAC).</li>
                <li>Indicate expected AUM profile and booking centres.</li>
                <li>Mention product scope (public &amp; private markets).</li>
                <li>State regulatory must-haves (FINMA, DFSA, SFC, etc.).</li>
              </ul>
              <p className="text-xs text-neutral-500">
                Need help? <Link href="/contact" className="underline underline-offset-2">Contact us</Link> and we’ll draft the brief in minutes.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}