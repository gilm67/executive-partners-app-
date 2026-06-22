// app/en/nri-private-banking-recruiter-switzerland/page.tsx
import type { Metadata } from "next"
import Link from "next/link"

const SITE = "https://www.execpartners.ch"
const PAGE_URL = `${SITE}/en/nri-private-banking-recruiter-switzerland`

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Executive Partners | NRI Private Banking Recruiter Switzerland",
  url: PAGE_URL,
  description: "Specialist private banking recruiter in Switzerland for the NRI and South Asian market. Senior RMs covering Non-Resident Indian, South Asian entrepreneur and family wealth placed at Swiss private banks in Geneva and Zurich.",
  address: { "@type": "PostalAddress", addressLocality: "Geneva", addressCountry: "CH" },
  areaServed: ["Geneva", "Zurich", "Switzerland"],
  serviceType: "Private Banking Executive Search | NRI and South Asian Market",
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
  title: "NRI Private Banking Recruiter Switzerland | Senior RM Search",
  description: "NRI and South Asian private banking recruiter in Switzerland. Senior RMs covering Non-Resident Indian wealth placed at Swiss private banks in Geneva or Zurich.",
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
