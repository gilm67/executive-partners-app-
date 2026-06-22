// app/en/apac-private-banking-recruiter-switzerland/page.tsx
import type { Metadata } from "next"
import Link from "next/link"

const SITE = "https://www.execpartners.ch"
const PAGE_URL = `${SITE}/en/apac-private-banking-recruiter-switzerland`

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Executive Partners | APAC Private Banking Recruiter Switzerland",
  url: PAGE_URL,
  description: "Specialist private banking recruiter for the Asia-Pacific market. Senior RMs covering Greater China, SEA, Japan and APAC cross-border wealth placed at Swiss and Singapore-based private banks.",
  address: { "@type": "PostalAddress", addressLocality: "Geneva", addressCountry: "CH" },
  areaServed: ["Geneva", "Switzerland", "Singapore", "Hong Kong", "Asia-Pacific"],
  serviceType: "Private Banking Executive Search | APAC Market",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is an APAC private banking desk in Switzerland?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An APAC private banking desk in Switzerland serves Asian clients whose assets are booked through Swiss or Singapore platforms. Bankers typically cover UHNW and HNW families from Greater China, Southeast Asia, Japan and Korea, advising on cross-border portfolios, offshore structures and intergenerational wealth transfer.",
      },
    },
    {
      "@type": "Question",
      name: "What languages are required for an APAC private banker in Switzerland?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mandarin is essential for Greater China coverage. Cantonese is a strong advantage for Hong Kong and Mainland China clients. English is required for internal communication and Swiss regulatory compliance. Additional language skills in Bahasa, Thai or Japanese are valued for broader SEA coverage.",
      },
    },
    {
      "@type": "Question",
      name: "How portable are APAC private banking books between Switzerland and Singapore?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "APAC books are among the most complex to port across booking centres. Client relationships often span Geneva, Singapore and Hong Kong simultaneously. CRS reporting, MAS regulatory requirements and Swiss cross-border frameworks all apply. Books with genuine advisory depth, multi-product penetration and well-documented KYC transfer at higher rates than pure custody mandates.",
      },
    },
    {
      "@type": "Question",
      name: "Which platforms are most active in APAC private banking hiring in Switzerland?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Platforms with established APAC desks in Geneva and Zurich include Julius Baer, UBS, Pictet, Lombard Odier, EFG International and Union Bancaire Privee. Singapore-based platforms including DBS Private Bank, Bank of Singapore and OCBC are also active in building cross-border coverage teams.",
      },
    },
  ],
}

export const metadata: Metadata = {
  title: "APAC Private Banking Recruiter Switzerland | Senior RM Search",
  description: "Specialist private banking recruiter for APAC. Senior RMs covering Greater China, SEA and Japan placed at Swiss and Singapore private banks in Geneva and Zurich.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "APAC Private Banking Recruiter Switzerland | Senior RM Search",
    description: "Specialist private banking recruiter for Asia-Pacific. Senior RMs with Greater China, SEA and APAC cross-border books placed at leading Swiss and Singapore platforms.",
    url: PAGE_URL,
    type: "website",
    siteName: "Executive Partners",
    images: [{ url: `${SITE}/og-articles/og-apac-private-banking-recruiter-switzerland.jpg`, width: 1200, height: 630 }],
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
            Geneva · Switzerland · Asia-Pacific Private Banking
          </p>

          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            APAC Private Banking Recruiter in Switzerland
          </h1>

          <p className="text-white/80 text-lg leading-relaxed">
            Executive Partners is a Geneva-based private banking recruiter specialising in the placement of Senior Relationship Managers covering the Asia-Pacific market. We place bankers with portable APAC books at leading Swiss private banks in Geneva and Zurich, and at Singapore-based platforms building cross-border coverage teams.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/en/apply" className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold bg-[#C9A14A] text-black hover:opacity-90 transition">
              Submit your profile
            </Link>
            <Link href="/en/hiring-managers/brief" className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold border border-white/20 text-white hover:bg-white/10 transition">
              Brief an APAC mandate
            </Link>
          </div>

          <hr className="border-white/10" />

          <h2 className="text-2xl font-semibold">What Makes APAC Private Banking Distinct</h2>
          <p className="text-white/70 leading-relaxed">
            Asian private wealth is the fastest-growing segment in global private banking. Switzerland and Singapore are the two primary booking centres for APAC cross-border assets, and the flow of talent between the two hubs has intensified. Senior RMs covering Greater China, Southeast Asia and Japan increasingly hold relationships that span both jurisdictions, requiring recruiters with genuine knowledge of both markets.
          </p>
          <p className="text-white/70 leading-relaxed">
            The APAC private banking talent market differs materially from European segments. Mandarin fluency is often a hard requirement for Greater China coverage. MAS licensing adds a regulatory layer for Singapore-based roles. And client relationships in Asian wealth management often run through family networks and multi-generational structures that require both cultural fluency and deep relationship management skills from the banker covering them.
          </p>

          <h2 className="text-2xl font-semibold">Roles We Place for the APAC Market</h2>
          <p className="text-white/70 leading-relaxed">
            Our APAC mandates across Geneva, Zurich and Singapore typically cover Senior Relationship Manager roles with CHF 150M to CHF 1B+ in Greater China, SEA or broader APAC cross-border AUM, Desk Head positions for platforms building or expanding their Asian coverage teams, and Investment Advisor roles servicing APAC UHNW clients with complex structured product and alternative investment needs.
          </p>
          <ul className="text-white/60 text-sm space-y-2 list-disc list-inside">
            <li>Senior Relationship Manager | Greater China (Geneva or Zurich based)</li>
            <li>Senior Relationship Manager | Southeast Asia Coverage</li>
            <li>APAC Desk Head | Cross-Border Switzerland to Singapore</li>
            <li>Investment Advisor | APAC UHNW</li>
            <li>Market Leader | Asia-Pacific Coverage Build-Out</li>
          </ul>

          <h2 className="text-2xl font-semibold">Switzerland and Singapore: The Dual-Hub Dynamic</h2>
          <p className="text-white/70 leading-relaxed">
            The most senior APAC bankers in Geneva increasingly hold relationships that are dual-booked across Switzerland and Singapore. This creates a specific recruiting challenge: the candidate pool is smaller, the regulatory requirements are layered, and the compensation benchmarks are set by both Swiss and Singapore norms. Executive Partners tracks both markets and advises on cross-border move structures, garden leave implications and client migration strategy before any approach is made.
          </p>

          <h2 className="text-2xl font-semibold">AUM Portability for APAC Books</h2>
          <p className="text-white/70 leading-relaxed">
            APAC books are among the most complex to assess for portability. Client relationships often run through family holding structures across multiple jurisdictions. CRS reporting, beneficial ownership documentation and Swiss cross-border frameworks all apply. Use our{" "}
            <Link href="/en/portability" className="text-[#C9A14A] hover:underline">AUM Portability Score</Link>
            {" "}to benchmark your transfer potential, or run a{" "}
            <Link href="/en/bp-simulator" className="text-[#C9A14A] hover:underline">Business Plan Simulation</Link>
            {" "}before approaching a new platform.
          </p>

          <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {[
              { q: "What is an APAC private banking desk in Switzerland?", a: "An APAC private banking desk in Switzerland serves Asian clients whose assets are booked through Swiss or Singapore platforms. Bankers cover UHNW and HNW families from Greater China, Southeast Asia, Japan and Korea, advising on cross-border portfolios, offshore structures and intergenerational wealth transfer." },
              { q: "What languages are required for an APAC private banker in Switzerland?", a: "Mandarin is essential for Greater China coverage. Cantonese is a strong advantage for Hong Kong and Mainland China clients. English is required for internal communication and Swiss regulatory compliance. Additional language skills in Bahasa, Thai or Japanese are valued for broader SEA coverage." },
              { q: "How portable are APAC private banking books between Switzerland and Singapore?", a: "APAC books are among the most complex to port across booking centres. Client relationships often span Geneva, Singapore and Hong Kong simultaneously. CRS reporting, MAS regulatory requirements and Swiss cross-border frameworks all apply. Books with genuine advisory depth and well-documented KYC transfer at higher rates than pure custody mandates." },
              { q: "Which platforms are most active in APAC private banking hiring in Switzerland?", a: "Platforms with established APAC desks in Geneva and Zurich include Julius Baer, UBS, Pictet, Lombard Odier, EFG International and Union Bancaire Privee. Singapore-based platforms including DBS Private Bank, Bank of Singapore and OCBC are also active in building cross-border coverage teams." },
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
              <li><Link href="/en/markets/singapore" className="hover:text-white transition">Singapore private banking market hub</Link></li>
              <li><Link href="/en/markets/hong-kong" className="hover:text-white transition">Hong Kong private banking market hub</Link></li>
              <li><Link href="/en/private-banking-recruiter-singapore" className="hover:text-white transition">Private banking recruiter Singapore</Link></li>
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
