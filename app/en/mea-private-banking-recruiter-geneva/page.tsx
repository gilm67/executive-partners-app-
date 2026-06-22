// app/en/mea-private-banking-recruiter-geneva/page.tsx
import type { Metadata } from "next"
import Link from "next/link"

const SITE = "https://www.execpartners.ch"
const PAGE_URL = `${SITE}/en/mea-private-banking-recruiter-geneva`

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Executive Partners | MEA Private Banking Recruiter Geneva",
  url: PAGE_URL,
  description: "Specialist private banking recruiter in Geneva for the Middle East and Africa market. Senior RMs covering GCC, Francophone Africa, Sub-Saharan Africa and MEA cross-border wealth placed at Swiss private banks.",
  address: { "@type": "PostalAddress", addressLocality: "Geneva", addressCountry: "CH" },
  areaServed: ["Geneva", "Switzerland", "Middle East", "Africa"],
  serviceType: "Private Banking Executive Search | MEA Market",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a MEA private banking desk in Geneva?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A MEA private banking desk in Geneva covers Middle Eastern and African clients whose assets are booked through Swiss platforms. This typically includes GCC families, Francophone African UHNW wealth and Sub-Saharan African family offices. Geneva has historically been the primary booking centre for Francophone African wealth in particular.",
      },
    },
    {
      "@type": "Question",
      name: "What languages are required for MEA private banking in Geneva?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Arabic is essential for GCC market coverage. French is highly valued for Francophone African clients, where Geneva has a long-standing advantage. English is required across all MEA sub-markets. Specific languages such as Amharic or Swahili are occasional differentiators for East African coverage.",
      },
    },
    {
      "@type": "Question",
      name: "Which MEA sub-markets are most active in Geneva private banking hiring?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GCC coverage, particularly Saudi Arabia and the UAE, has seen the strongest hiring growth from Geneva platforms over 2024 and 2025. Francophone West and Central Africa remain a core Geneva specialty. Sub-Saharan Africa and East Africa represent emerging mandates for platforms building out their MEA desk.",
      },
    },
    {
      "@type": "Question",
      name: "What compliance requirements apply to MEA private banking in Switzerland?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MEA books at Swiss private banks are subject to strict cross-border framework compliance, enhanced PEP due diligence, CRS and FATCA reporting obligations, and sector-specific KYC requirements for clients from high-risk jurisdictions. Banks expect candidates to demonstrate a clean compliance history and well-documented client files.",
      },
    },
  ],
}

export const metadata: Metadata = {
  title: "MEA Private Banking Recruiter Geneva | Middle East & Africa",
  description: "Specialist private banking recruiter for MEA. Senior RMs covering GCC, Francophone Africa and Sub-Saharan Africa placed at Swiss private banks in Geneva.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "MEA Private Banking Recruiter Geneva | Middle East Africa Senior RM Jobs",
    description: "Specialist private banking recruiter in Geneva for MEA. Senior RMs with GCC, Francophone African and Sub-Saharan African cross-border books placed at leading Swiss platforms.",
    url: PAGE_URL,
    type: "website",
    siteName: "Executive Partners",
    images: [{ url: `${SITE}/og-articles/og-mea-private-banking-recruiter-geneva.jpg`, width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="min-h-screen bg-[#0B0E13] text-white py-20 px-4">
        <div className="mx-auto max-w-3xl space-y-8">

          <p className="text-sm font-semibold uppercase tracking-widest text-[#C9A14A]">
            Geneva · Switzerland · Middle East and Africa Private Banking
          </p>

          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            MEA Private Banking Recruiter in Geneva
          </h1>

          <p className="text-white/80 text-lg leading-relaxed">
            Executive Partners is a Geneva-based private banking recruiter specialising in the placement of Senior Relationship Managers covering the Middle East and Africa market. We place bankers with portable MEA books at leading Swiss private banks in Geneva and Zurich.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/en/apply" className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold bg-[#C9A14A] text-black hover:opacity-90 transition">
              Submit your profile
            </Link>
            <Link href="/en/hiring-managers/brief" className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold border border-white/20 text-white hover:bg-white/10 transition">
              Brief a MEA mandate
            </Link>
          </div>

          <hr className="border-white/10" />

          <h2 className="text-2xl font-semibold">What Makes MEA Private Banking Distinct in Geneva</h2>
          <p className="text-white/70 leading-relaxed">
            Geneva has been the primary booking centre for Middle Eastern and African private wealth for decades. The MEA desk at a Swiss private bank typically covers three distinct sub-markets: GCC families booking offshore assets, Francophone West and Central African UHNW wealth, and Sub-Saharan African family offices and entrepreneurs. Each sub-market has distinct language requirements, compliance profiles and AUM characteristics.
          </p>
          <p className="text-white/70 leading-relaxed">
            Arabic is essential for GCC coverage. French is highly valued for Francophone African clients. Compliance requirements are among the most demanding in Swiss private banking: enhanced PEP due diligence, CRS reporting and cross-border framework adherence are scrutinised closely at every major platform.
          </p>

          <h2 className="text-2xl font-semibold">Roles We Place for the MEA Market</h2>
          <p className="text-white/70 leading-relaxed">
            Our MEA mandates in Geneva and Zurich cover Senior Relationship Manager roles across the GCC, Francophone Africa and Sub-Saharan Africa sub-markets, Team Head positions for platforms expanding their MEA desk coverage, and transition mandates for bankers moving from Dubai or Riyadh-based roles to Swiss booking platforms.
          </p>

          <h2 className="text-2xl font-semibold">AUM Portability for MEA Books</h2>
          <p className="text-white/70 leading-relaxed">
            MEA portability assessments require particular attention to compliance history, PEP exposure and cross-border framework documentation. Client relationships in the GCC and Africa tend to be highly personal and relationship-driven, which can support portability if the banker has a genuine, well-documented advisory relationship. Use our{" "}
            <Link href="/en/portability" className="text-[#C9A14A] hover:underline">AUM Portability Score</Link>
            {" "}to benchmark your transfer potential, or run a{" "}
            <Link href="/en/bp-simulator" className="text-[#C9A14A] hover:underline">Business Plan Simulation</Link>
            {" "}before approaching a new platform.
          </p>

          <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {[
              { q: "What is a MEA private banking desk in Geneva?", a: "A MEA private banking desk in Geneva covers Middle Eastern and African clients whose assets are booked through Swiss platforms. This includes GCC families, Francophone African UHNW wealth and Sub-Saharan African family offices. Geneva has historically been the primary booking centre for Francophone African wealth in particular." },
              { q: "What languages are required for MEA private banking in Geneva?", a: "Arabic is essential for GCC market coverage. French is highly valued for Francophone African clients, where Geneva has a long-standing advantage. English is required across all MEA sub-markets." },
              { q: "Which MEA sub-markets are most active in Geneva hiring?", a: "GCC coverage, particularly Saudi Arabia and the UAE, has seen the strongest hiring growth from Geneva platforms over 2024 and 2025. Francophone West and Central Africa remain a core Geneva specialty. Sub-Saharan Africa represents emerging mandates for platforms building out their MEA desk." },
              { q: "What compliance requirements apply to MEA private banking in Switzerland?", a: "MEA books are subject to strict cross-border framework compliance, enhanced PEP due diligence, CRS and FATCA reporting, and sector-specific KYC requirements for clients from high-risk jurisdictions. Banks expect candidates to demonstrate a clean compliance history and well-documented client files." },
            ].map(({ q, a }) => (
              <div key={q} className="border-t border-white/10 pt-5 pb-2">
                <h3 className="text-white font-medium mb-2">{q}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>

          <hr className="border-white/10" />

          <section>
            <p className="text-xs uppercase tracking-widest text-white/30 mb-4">Related</p>
            <ul className="space-y-2 text-sm text-white/50">
              <li><Link href="/en/markets/geneva" className="hover:text-white transition">Geneva private banking market hub</Link></li>
              <li><Link href="/en/markets/dubai" className="hover:text-white transition">Dubai private banking market hub</Link></li>
              <li><Link href="/en/private-banking-recruiter-dubai" className="hover:text-white transition">Private banking recruiter Dubai</Link></li>
              <li><Link href="/en/latam-private-banking-recruiter-geneva" className="hover:text-white transition">LATAM private banking recruiter Geneva</Link></li>
              <li><Link href="/en/nri-private-banking-recruiter-switzerland" className="hover:text-white transition">NRI private banking recruiter Switzerland</Link></li>
              <li><Link href="/en/private-banking-recruitment-company" className="hover:text-white transition">About Executive Partners</Link></li>
              <li><Link href="/en/portability" className="hover:text-white transition">AUM Portability Score</Link></li>
              <li><Link href="/en/bp-simulator" className="hover:text-white transition">Business Plan Simulator</Link></li>
            </ul>
          </section>

        </div>
      </main>
    </>
  )
}
