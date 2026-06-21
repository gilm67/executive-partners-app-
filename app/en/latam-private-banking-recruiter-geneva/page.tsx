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
  description: "Executive Partners is Geneva's specialist recruiter for the Latin American private banking market. Senior RMs covering Brazil, Mexico, Colombia, Argentina and LATAM cross-border wealth placed at Swiss private banks. Confidential mandates, portability analysis.",
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
