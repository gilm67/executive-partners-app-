#!/usr/bin/env python3
"""
execpartners SEO — Part 2
Creates 4 new market-segment pages targeting specific market × city keyword combinations:

  /en/latam-private-banking-recruiter-geneva
  /en/mea-private-banking-recruiter-geneva
  /en/nri-private-banking-recruiter-switzerland
  /en/israeli-market-private-banking-switzerland

Run from anywhere:
    python3 fix_seo_part2.py
"""
import os

BASE = os.path.expanduser("~/Desktop/execpartners-fresh")

def create_page(rel, content, label):
    full = os.path.join(BASE, rel)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    if os.path.exists(full):
        print(f"  [skip]  {label}  —  already exists at {rel}")
        return
    with open(full, "w") as f:
        f.write(content)
    print(f"  [new]   {label}")


# =============================================================================
# PAGE 1 — LATAM
# Primary keyword: "LATAM private banker Geneva" / "Latin American private banking Switzerland"
# =============================================================================

LATAM_PAGE = '''\
// app/en/latam-private-banking-recruiter-geneva/page.tsx
import type { Metadata } from "next"
import Link from "next/link"

const SITE = "https://www.execpartners.ch"
const PAGE_URL = `${SITE}/en/latam-private-banking-recruiter-geneva`

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Executive Partners — LATAM Private Banking Recruiter Geneva",
  url: PAGE_URL,
  description: "Specialist private banking recruiter in Geneva for the Latin American market. Senior RMs covering Brazil, Mexico, Colombia, Argentina and LATAM cross-border wealth placed at Swiss private banks.",
  address: { "@type": "PostalAddress", addressLocality: "Geneva", addressCountry: "CH" },
  areaServed: ["Geneva", "Switzerland", "Latin America"],
  serviceType: "Private Banking Executive Search — LATAM Market",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a LATAM private banking desk in Geneva?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A LATAM private banking desk in Geneva serves Latin American clients whose assets are booked through Swiss platforms. Bankers typically cover UHNW and HNW families from Brazil, Mexico, Colombia, Argentina and Chile, advising on cross-border portfolios, offshore structures and wealth planning solutions.",
      },
    },
    {
      "@type": "Question",
      name: "What languages are required for a LATAM private banker in Geneva?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Spanish is essential for most LATAM mandates in Geneva. Portuguese is required for Brazilian market coverage. English is necessary for internal communication and compliance. French is a practical advantage in day-to-day Swiss banking.",
      },
    },
    {
      "@type": "Question",
      name: "How portable are LATAM private banking books in Geneva?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LATAM books in Geneva tend to be complex to port. Client relationships are often multi-banked and service-sensitive. Compliance around beneficial ownership, cross-border frameworks and AML documentation has tightened significantly. Books that are well-documented, cleanly structured and show a genuine advisory relationship transfer at higher rates than deposit-driven portfolios.",
      },
    },
    {
      "@type": "Question",
      name: "Which Swiss banks are most active in LATAM private banking hiring?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Activity is strongest at platforms with established LATAM desks: UBS, Julius Baer, Union Bancaire Privee, Pictet and EFG International. Several boutiques and EAMs also cover LATAM from Geneva on a specialist basis.",
      },
    },
  ],
}

export const metadata: Metadata = {
  title: "LATAM Private Banking Recruiter Geneva | Latin American Banker Jobs Switzerland",
  description: "Executive Partners is Geneva\'s specialist recruiter for the Latin American private banking market. Senior RMs covering Brazil, Mexico, Colombia, Argentina and LATAM cross-border wealth placed at Swiss private banks. Confidential mandates, portability analysis.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "LATAM Private Banking Recruiter Geneva | Latin American Senior RM Jobs",
    description: "Specialist private banking recruiter in Geneva for LATAM. Senior RMs with Brazilian, Mexican and Latin American cross-border books placed at leading Swiss platforms.",
    url: PAGE_URL,
    type: "website",
    siteName: "Executive Partners",
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
            Geneva · Switzerland · Latin American Private Banking
          </p>

          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            LATAM Private Banking Recruiter in Geneva
          </h1>

          <p className="text-white/80 text-lg leading-relaxed">
            Executive Partners is a Geneva-based private banking recruiter specialising in the placement of Senior Relationship Managers covering the Latin American market. We place bankers with portable LATAM books at leading Swiss private banks in Geneva and Zurich.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/en/apply" className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold bg-[#C9A14A] text-black hover:opacity-90 transition">
              Submit your profile
            </Link>
            <Link href="/en/hiring-managers/brief" className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold border border-white/20 text-white hover:bg-white/10 transition">
              Brief a LATAM mandate
            </Link>
          </div>

          <hr className="border-white/10" />

          <h2 className="text-2xl font-semibold">What Makes LATAM Private Banking Distinct in Geneva</h2>
          <p className="text-white/70 leading-relaxed">
            Latin American wealth in Geneva is primarily cross-border. Clients are UHNW and HNW families from Brazil, Mexico, Colombia, Argentina, Chile and Peru booking assets through Swiss platforms. The regulatory environment is demanding: EU-AML, FATCA, CRS and Swiss cross-border frameworks apply, and compliance expectations have tightened materially over the last decade.
          </p>
          <p className="text-white/70 leading-relaxed">
            Spanish fluency is essential for most mandates. Portuguese is required for Brazilian coverage. Books with a genuine advisory relationship, well-documented KYC and multi-product penetration transfer at higher rates than deposit-only portfolios.
          </p>

          <h2 className="text-2xl font-semibold">Roles We Place for the LATAM Market</h2>
          <p className="text-white/70 leading-relaxed">
            Our LATAM mandates in Geneva and Zurich typically cover Senior Relationship Manager roles with CHF 100M to CHF 500M in Latin American cross-border AUM, Desk Head positions for platforms expanding their LATAM coverage, and EAM-facing bankers advising LATAM family offices through the independent asset manager channel.
          </p>

          <h2 className="text-2xl font-semibold">AUM Portability for LATAM Books</h2>
          <p className="text-white/70 leading-relaxed">
            LATAM books in Geneva require careful portability assessment. Wallet share analysis, beneficial ownership documentation quality and cross-border compliance history are all evaluated before any introduction is made to a hiring institution. Use our{" "}
            <Link href="/en/portability" className="text-[#C9A14A] hover:underline">AUM Portability Score</Link>
            {" "}to benchmark your transfer potential, or run a{" "}
            <Link href="/en/bp-simulator" className="text-[#C9A14A] hover:underline">Business Plan Simulation</Link>
            {" "}before approaching a new platform.
          </p>

          <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {[
              { q: "What is a LATAM private banking desk in Geneva?", a: "A LATAM private banking desk in Geneva serves Latin American clients whose assets are booked through Swiss platforms. Bankers cover UHNW and HNW families from Brazil, Mexico, Colombia, Argentina and Chile, advising on cross-border portfolios, offshore structures and wealth planning solutions." },
              { q: "What languages are required for a LATAM private banker in Geneva?", a: "Spanish is essential for most LATAM mandates in Geneva. Portuguese is required for Brazilian market coverage. English is necessary for internal communication and compliance. French is a practical advantage in day-to-day Swiss banking." },
              { q: "How portable are LATAM private banking books in Geneva?", a: "LATAM books tend to be complex to port. Compliance around beneficial ownership, cross-border frameworks and AML documentation has tightened significantly. Books that are well-documented, cleanly structured and show a genuine advisory relationship transfer at higher rates than deposit-driven portfolios." },
              { q: "Which Swiss banks are most active in LATAM private banking hiring?", a: "Activity is strongest at platforms with established LATAM desks: UBS, Julius Baer, Union Bancaire Privee, Pictet and EFG International. Several boutiques and EAMs also cover LATAM from Geneva on a specialist basis." },
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
              <li><Link href="/en/private-banking-recruiter-geneva" className="hover:text-white transition">Private banking recruiter Geneva</Link></li>
              <li><Link href="/en/mea-private-banking-recruiter-geneva" className="hover:text-white transition">MEA private banking recruiter Geneva</Link></li>
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
'''

# =============================================================================
# PAGE 2 — MEA
# Primary keyword: "MEA private banker Geneva" / "Middle East Africa private banking Switzerland"
# =============================================================================

MEA_PAGE = '''\
// app/en/mea-private-banking-recruiter-geneva/page.tsx
import type { Metadata } from "next"
import Link from "next/link"

const SITE = "https://www.execpartners.ch"
const PAGE_URL = `${SITE}/en/mea-private-banking-recruiter-geneva`

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Executive Partners — MEA Private Banking Recruiter Geneva",
  url: PAGE_URL,
  description: "Specialist private banking recruiter in Geneva for the Middle East and Africa market. Senior RMs covering GCC, Francophone Africa, Sub-Saharan Africa and MEA cross-border wealth placed at Swiss private banks.",
  address: { "@type": "PostalAddress", addressLocality: "Geneva", addressCountry: "CH" },
  areaServed: ["Geneva", "Switzerland", "Middle East", "Africa"],
  serviceType: "Private Banking Executive Search — MEA Market",
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
  title: "MEA Private Banking Recruiter Geneva | Middle East Africa Banker Jobs Switzerland",
  description: "Executive Partners is Geneva\'s specialist recruiter for MEA private banking. Senior RMs covering GCC, Francophone Africa and Sub-Saharan Africa cross-border wealth placed at Swiss private banks. Confidential mandates, portability analysis.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "MEA Private Banking Recruiter Geneva | Middle East Africa Senior RM Jobs",
    description: "Specialist private banking recruiter in Geneva for MEA. Senior RMs with GCC, Francophone African and Sub-Saharan African cross-border books placed at leading Swiss platforms.",
    url: PAGE_URL,
    type: "website",
    siteName: "Executive Partners",
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
'''

# =============================================================================
# PAGE 3 — NRI
# Primary keyword: "NRI private banking recruiter Switzerland" / "NRI banker jobs Geneva Zurich"
# =============================================================================

NRI_PAGE = '''\
// app/en/nri-private-banking-recruiter-switzerland/page.tsx
import type { Metadata } from "next"
import Link from "next/link"

const SITE = "https://www.execpartners.ch"
const PAGE_URL = `${SITE}/en/nri-private-banking-recruiter-switzerland`

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Executive Partners — NRI Private Banking Recruiter Switzerland",
  url: PAGE_URL,
  description: "Specialist private banking recruiter in Switzerland for the NRI and South Asian market. Senior RMs covering Non-Resident Indian, South Asian entrepreneur and family wealth placed at Swiss private banks in Geneva and Zurich.",
  address: { "@type": "PostalAddress", addressLocality: "Geneva", addressCountry: "CH" },
  areaServed: ["Geneva", "Zurich", "Switzerland"],
  serviceType: "Private Banking Executive Search — NRI and South Asian Market",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is NRI private banking in Switzerland?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "NRI private banking in Switzerland covers wealth management services for Non-Resident Indians and South Asian clients booking assets through Swiss platforms, primarily in Geneva and Zurich. NRI clients tend to be UHNW and HNW entrepreneurs, business founders and family office principals with significant cross-border wealth. The South Asian market includes Indian, Pakistani and Sri Lankan client segments.",
      },
    },
    {
      "@type": "Question",
      name: "Is NRI private banking in Switzerland primarily based in Geneva or Zurich?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both. Geneva has historically hosted significant NRI books from the Indian subcontinent, while Zurich platforms also cover South Asian clients through their international private banking desks. Dubai is the other primary hub for NRI wealth management, and bankers often cover both the Swiss and Gulf markets from a single platform.",
      },
    },
    {
      "@type": "Question",
      name: "What language skills are important for NRI private banking?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "English is the primary working language for NRI client relationships in Switzerland. Hindi, Gujarati and Urdu are valued differentiators for specific client segments. Mandarin is not relevant for this market segment. French is useful for day-to-day Swiss banking but not required for client coverage.",
      },
    },
    {
      "@type": "Question",
      name: "What AUM characteristics are typical for NRI books in Switzerland?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "NRI books in Switzerland tend to be multi-banked, with moderate to high credit and Lombard lending penetration. AUM per client is typically in the USD 5M to USD 50M range for HNW relationships, with UHNW entrepreneur and family office relationships significantly higher. Product penetration in alternatives and discretionary mandates is growing but variable.",
      },
    },
  ],
}

export const metadata: Metadata = {
  title: "NRI Private Banking Recruiter Switzerland | Non-Resident Indian Banker Jobs Geneva Zurich",
  description: "Executive Partners is Switzerland\'s specialist recruiter for NRI and South Asian private banking. Senior RMs covering Non-Resident Indian and South Asian entrepreneur wealth placed at Swiss private banks in Geneva and Zurich. Confidential mandates.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "NRI Private Banking Recruiter Switzerland | Non-Resident Indian Senior RM Jobs",
    description: "Specialist private banking recruiter in Switzerland for NRI and South Asian wealth. Senior RMs with Non-Resident Indian and South Asian client books placed at leading Swiss platforms in Geneva and Zurich.",
    url: PAGE_URL,
    type: "website",
    siteName: "Executive Partners",
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
            Geneva · Zurich · Switzerland · NRI and South Asian Private Banking
          </p>

          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            NRI Private Banking Recruiter in Switzerland
          </h1>

          <p className="text-white/80 text-lg leading-relaxed">
            Executive Partners is a Geneva-based private banking recruiter specialising in the placement of Senior Relationship Managers covering Non-Resident Indian and South Asian wealth. We place bankers with portable NRI books at leading Swiss private banks in Geneva and Zurich.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/en/apply" className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold bg-[#C9A14A] text-black hover:opacity-90 transition">
              Submit your profile
            </Link>
            <Link href="/en/hiring-managers/brief" className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold border border-white/20 text-white hover:bg-white/10 transition">
              Brief an NRI mandate
            </Link>
          </div>

          <hr className="border-white/10" />

          <h2 className="text-2xl font-semibold">NRI Private Banking in Geneva and Zurich</h2>
          <p className="text-white/70 leading-relaxed">
            Switzerland hosts a substantial population of Non-Resident Indian and South Asian private banking clients. NRI wealth in Geneva and Zurich typically comprises UHNW and HNW entrepreneurs, technology founders, corporate executives and family principals from India, Pakistan and Sri Lanka. Books are characterised by moderate to high credit and Lombard lending penetration, multi-banking across Swiss and other international platforms, and growing interest in alternatives and discretionary mandates.
          </p>
          <p className="text-white/70 leading-relaxed">
            English is the primary client relationship language. Hindi, Gujarati and Urdu are differentiators for specific segments. Candidates with both Swiss platform knowledge and genuine South Asian client relationships are in consistent demand across Geneva and Zurich-based private banking desks.
          </p>

          <h2 className="text-2xl font-semibold">Roles We Place for the NRI Market</h2>
          <p className="text-white/70 leading-relaxed">
            Our NRI mandates in Switzerland cover Senior Relationship Manager roles with South Asian cross-border books booked in Geneva or Zurich, Desk Head positions for platforms building or expanding their NRI coverage, and bankers transitioning from Dubai-based NRI roles to Swiss platforms. We also work with EAMs and family offices serving South Asian clients through the independent asset manager channel.
          </p>

          <h2 className="text-2xl font-semibold">AUM Portability for NRI Books</h2>
          <p className="text-white/70 leading-relaxed">
            NRI books in Switzerland are often multi-banked, which means portability assessment needs to account for wallet share rather than total AUM. Client concentration, credit dependency, product breadth and relationship tenure are all evaluated before any introduction is made to a hiring institution. Use our{" "}
            <Link href="/en/portability" className="text-[#C9A14A] hover:underline">AUM Portability Score</Link>
            {" "}to benchmark your transfer potential, or run a{" "}
            <Link href="/en/bp-simulator" className="text-[#C9A14A] hover:underline">Business Plan Simulation</Link>
            {" "}before approaching a new platform.
          </p>

          <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {[
              { q: "What is NRI private banking in Switzerland?", a: "NRI private banking in Switzerland covers wealth management services for Non-Resident Indians and South Asian clients booking assets through Swiss platforms in Geneva and Zurich. NRI clients tend to be UHNW and HNW entrepreneurs, business founders and family office principals with significant cross-border wealth." },
              { q: "Is NRI private banking primarily based in Geneva or Zurich?", a: "Both. Geneva has historically hosted significant NRI books, while Zurich platforms also cover South Asian clients through their international private banking desks. Dubai is the other primary hub, and bankers often cover both the Swiss and Gulf markets from a single platform." },
              { q: "What language skills are important for NRI private banking?", a: "English is the primary working language for NRI client relationships in Switzerland. Hindi, Gujarati and Urdu are valued differentiators for specific client segments. French is useful for day-to-day Swiss banking but not required for client coverage." },
              { q: "What AUM characteristics are typical for NRI books in Switzerland?", a: "NRI books in Switzerland tend to be multi-banked, with moderate to high credit and Lombard lending penetration. AUM per client is typically in the USD 5M to USD 50M range for HNW relationships, with UHNW entrepreneur relationships significantly higher. Product penetration in alternatives and discretionary mandates is growing." },
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
              <li><Link href="/en/markets/zurich" className="hover:text-white transition">Zurich private banking market hub</Link></li>
              <li><Link href="/en/markets/dubai" className="hover:text-white transition">Dubai private banking market hub</Link></li>
              <li><Link href="/en/mea-private-banking-recruiter-geneva" className="hover:text-white transition">MEA private banking recruiter Geneva</Link></li>
              <li><Link href="/en/latam-private-banking-recruiter-geneva" className="hover:text-white transition">LATAM private banking recruiter Geneva</Link></li>
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
'''

# =============================================================================
# PAGE 4 — Israeli Market
# Primary keyword: "Israeli market private banking Switzerland" / "Israeli private banker Geneva Zurich"
# Distinct from /en/markets/tel-aviv and /en/private-banking-recruiter-tel-aviv:
# those are about working IN Tel Aviv; this is about Swiss-based bankers covering Israeli clients
# =============================================================================

ISRAEL_PAGE = '''\
// app/en/israeli-market-private-banking-switzerland/page.tsx
import type { Metadata } from "next"
import Link from "next/link"

const SITE = "https://www.execpartners.ch"
const PAGE_URL = `${SITE}/en/israeli-market-private-banking-switzerland`

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Executive Partners — Israeli Market Private Banking Switzerland",
  url: PAGE_URL,
  description: "Specialist recruiter for Israeli market private banking in Switzerland. Senior RMs and Israeli desk heads covering Israeli UHNW and tech-entrepreneur wealth, based in Geneva or Zurich and placed at leading Swiss private banks.",
  address: { "@type": "PostalAddress", addressLocality: "Geneva", addressCountry: "CH" },
  areaServed: ["Geneva", "Zurich", "Switzerland"],
  serviceType: "Private Banking Executive Search — Israeli Market",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Israeli market private banking in Switzerland?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Israeli market private banking in Switzerland refers to Swiss-based relationship managers and desk heads who cover Israeli clients booking assets through Geneva or Zurich platforms. The client base centres on Israeli UHNW and HNW families, tech founders with liquidity events from Israeli unicorn exits, and multi-generational Israeli family offices. Most mandates are based in Geneva or Zurich, not Tel Aviv.",
      },
    },
    {
      "@type": "Question",
      name: "Does an Israeli market private banker in Switzerland need an ISA licence?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An ISA (Israel Securities Authority) investment advisory licence is required for client-facing advisory activity conducted in Israel. Swiss-based bankers serving Israeli clients through Geneva or Zurich platforms typically operate under FINMA supervision. However, some mandates at banks with Tel Aviv representative offices, or roles involving direct interaction with clients in Israel, require ISA licensing. The specific requirement depends on the role and the bank\'s operational model in Israel.",
      },
    },
    {
      "@type": "Question",
      name: "What kind of Israeli wealth is booked through Swiss private banks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Swiss private banks serve a diverse Israeli client base: UHNW families with multi-generational wealth, technology entrepreneurs with liquidity events from Israeli unicorn and scale-up exits, real estate and industrial holding families, and diaspora investors who have maintained Swiss banking relationships for decades. The tech-exit segment has grown significantly over the past five years.",
      },
    },
    {
      "@type": "Question",
      name: "Which Swiss banks are active in the Israeli private banking market?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Several leading Swiss private banks have established representative offices or advisory presences in Israel, including UBS, Julius Baer, Lombard Odier, EFG International and Dreyfus Bank. Union Bancaire Privee and Rothschild also maintain Israeli market coverage. Demand for experienced Israeli-market bankers based in Geneva and Zurich is growing as these platforms expand their Israeli desk capacity.",
      },
    },
  ],
}

export const metadata: Metadata = {
  title: "Israeli Market Private Banking Switzerland | Senior RM and Desk Head Search Geneva Zurich",
  description: "Executive Partners recruits Israeli market private bankers in Switzerland. Senior RMs and Israeli desk heads covering Israeli UHNW and tech-entrepreneur wealth, based in Geneva or Zurich. ISA licence guidance. Confidential mandates.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Israeli Market Private Banking Switzerland | Senior RM Search Geneva Zurich",
    description: "Specialist private banking recruiter for the Israeli market in Switzerland. Senior RMs and Israeli desk heads with Hebrew-speaking, UHNW cross-border books placed at leading Swiss platforms.",
    url: PAGE_URL,
    type: "website",
    siteName: "Executive Partners",
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
            Geneva · Zurich · Switzerland · Israeli Market Private Banking
          </p>

          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Israeli Market Private Banking in Switzerland
          </h1>

          <p className="text-white/80 text-lg leading-relaxed">
            Executive Partners recruits Senior Relationship Managers and Israeli desk heads covering Israeli UHNW and tech-entrepreneur wealth, based in Geneva or Zurich and placed at leading Swiss private banks. We run active mandates for this market and provide ISA licensing guidance alongside every search.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/en/apply" className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold bg-[#C9A14A] text-black hover:opacity-90 transition">
              Submit your profile
            </Link>
            <Link href="/en/hiring-managers/brief" className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold border border-white/20 text-white hover:bg-white/10 transition">
              Brief an Israeli market mandate
            </Link>
          </div>

          <hr className="border-white/10" />

          <h2 className="text-2xl font-semibold">Israeli Market Private Banking from Geneva and Zurich</h2>
          <p className="text-white/70 leading-relaxed">
            Swiss private banking for the Israeli market is primarily a Geneva and Zurich desk activity. Clients are Israeli UHNW and HNW families, technology entrepreneurs with liquidity events from Israeli unicorn exits, multi-generational family offices, and diaspora investors who have maintained Swiss booking arrangements for decades. The tech-exit segment has expanded sharply: Israeli technology exits produced significant new UHNW wealth over 2023 to 2025, creating strong demand for bankers who can advise on complex liquidity event structuring and cross-border portfolio construction.
          </p>
          <p className="text-white/70 leading-relaxed">
            Hebrew fluency is a strong differentiator and often a requirement for senior Israeli desk roles. English is the working language for internal communication and for clients comfortable with international banking. ISA investment advisory licensing is required for any client-facing advisory activity conducted in Israel, and is valued by Swiss banks that operate through Tel Aviv representative offices.
          </p>

          <h2 className="text-2xl font-semibold">Roles We Place for the Israeli Market</h2>
          <p className="text-white/70 leading-relaxed">
            Our Israeli market mandates in Switzerland cover Senior Relationship Manager positions on established Israeli desks in Geneva and Zurich, Israeli Desk Head roles for platforms expanding or restructuring their Israeli market coverage, and Private Banker positions focused on the tech-entrepreneur and family office segments. We also advise on ISA licensing timelines and requirements as part of every Israeli market search.
          </p>

          <h2 className="text-2xl font-semibold">ISA Licence and Regulatory Context</h2>
          <p className="text-white/70 leading-relaxed">
            Swiss private banks with Tel Aviv representative offices typically require Senior RMs to hold or obtain an ISA investment advisory or investment marketing licence, which governs client-facing activity in Israel. Bankers based in Geneva or Zurich who do not interact with clients in Israel operate under FINMA supervision and do not require ISA licensing for their Swiss activity. The ISA Investment Codex enacted in September 2025 introduced updates to the licensing framework. Executive Partners provides candidates with clear guidance on the specific licensing requirements for each mandate. For further context, see our{" "}
            <Link href="/en/markets/tel-aviv" className="text-[#C9A14A] hover:underline">Tel Aviv private banking market hub</Link>.
          </p>

          <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {[
              { q: "What is Israeli market private banking in Switzerland?", a: "Israeli market private banking in Switzerland refers to Swiss-based relationship managers and desk heads who cover Israeli clients booking assets through Geneva or Zurich platforms. The client base centres on Israeli UHNW families, tech founders with unicorn exit liquidity events, and multi-generational Israeli family offices. Most mandates are based in Geneva or Zurich, not Tel Aviv." },
              { q: "Does an Israeli market private banker in Switzerland need an ISA licence?", a: "An ISA licence is required for client-facing advisory activity conducted in Israel. Swiss-based bankers serving Israeli clients through Geneva or Zurich platforms operate under FINMA supervision. However, some mandates at banks with Tel Aviv representative offices, or roles involving direct interaction with clients in Israel, require ISA licensing. The specific requirement depends on the role and the bank\'s operational model." },
              { q: "What kind of Israeli wealth is booked through Swiss private banks?", a: "Swiss private banks serve Israeli UHNW families with multi-generational wealth, technology entrepreneurs with liquidity events from Israeli unicorn and scale-up exits, real estate and industrial holding families, and diaspora investors with long-standing Swiss banking relationships. The tech-exit segment has grown significantly over the past five years." },
              { q: "Which Swiss banks are active in the Israeli private banking market?", a: "Several leading Swiss private banks have established representative offices or advisory presences in Israel, including UBS, Julius Baer, Lombard Odier, EFG International and Dreyfus Bank. Union Bancaire Privee and Rothschild also maintain Israeli market coverage. Demand for experienced Israeli-market bankers based in Geneva and Zurich is growing as these platforms expand their Israeli desk capacity." },
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
              <li><Link href="/en/markets/tel-aviv" className="hover:text-white transition">Tel Aviv private banking market hub</Link></li>
              <li><Link href="/en/private-banking-recruiter-tel-aviv" className="hover:text-white transition">Private banking recruiter Tel Aviv</Link></li>
              <li><Link href="/en/markets/geneva" className="hover:text-white transition">Geneva private banking market hub</Link></li>
              <li><Link href="/en/markets/zurich" className="hover:text-white transition">Zurich private banking market hub</Link></li>
              <li><Link href="/en/mea-private-banking-recruiter-geneva" className="hover:text-white transition">MEA private banking recruiter Geneva</Link></li>
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
'''

# =============================================================================
# CREATE ALL PAGES
# =============================================================================
print("\n── Creating market-segment pages ────────────────────────────────────────")

create_page(
    "app/en/latam-private-banking-recruiter-geneva/page.tsx",
    LATAM_PAGE,
    "LATAM private banking recruiter Geneva"
)

create_page(
    "app/en/mea-private-banking-recruiter-geneva/page.tsx",
    MEA_PAGE,
    "MEA private banking recruiter Geneva"
)

create_page(
    "app/en/nri-private-banking-recruiter-switzerland/page.tsx",
    NRI_PAGE,
    "NRI private banking recruiter Switzerland"
)

create_page(
    "app/en/israeli-market-private-banking-switzerland/page.tsx",
    ISRAEL_PAGE,
    "Israeli market private banking Switzerland"
)

print("\n✅ Part 2 complete.")
print("   Now build and deploy:")
print("   cd ~/Desktop/execpartners-fresh")
print("   npx next build")
print("   git add -A && git commit -m 'SEO: cannibalization fixes, FAQ schema, 4 market-segment pages' && git push")
print()
print("   After deploy, submit these 4 URLs in Google Search Console:")
print("   /en/latam-private-banking-recruiter-geneva")
print("   /en/mea-private-banking-recruiter-geneva")
print("   /en/nri-private-banking-recruiter-switzerland")
print("   /en/israeli-market-private-banking-switzerland")
print()
print("   MacBook Air sync:")
print("   cd ~/Desktop/execpartners-fresh && git pull origin main")
