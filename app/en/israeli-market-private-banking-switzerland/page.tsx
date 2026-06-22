// app/en/israeli-market-private-banking-switzerland/page.tsx
import type { Metadata } from "next"
import Link from "next/link"

const SITE = "https://www.execpartners.ch"
const PAGE_URL = `${SITE}/en/israeli-market-private-banking-switzerland`

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Executive Partners | Israeli Market Private Banking Switzerland",
  url: PAGE_URL,
  description: "Specialist recruiter for Israeli market private banking in Switzerland. Senior RMs and Israeli desk heads covering Israeli UHNW and tech-entrepreneur wealth, based in Geneva or Zurich and placed at leading Swiss private banks.",
  address: { "@type": "PostalAddress", addressLocality: "Geneva", addressCountry: "CH" },
  areaServed: ["Geneva", "Zurich", "Switzerland"],
  serviceType: "Private Banking Executive Search | Israeli Market",
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
        text: "An ISA (Israel Securities Authority) investment advisory licence is required for client-facing advisory activity conducted in Israel. Swiss-based bankers serving Israeli clients through Geneva or Zurich platforms typically operate under FINMA supervision. However, some mandates at banks with Tel Aviv representative offices, or roles involving direct interaction with clients in Israel, require ISA licensing. The specific requirement depends on the role and the bank's operational model in Israel.",
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
  title: "Israeli Market Private Banking Switzerland | Senior RM Search",
  description: "Israeli market private banking recruiter, Switzerland. Senior RMs and desk heads with Israeli UHNW books in Geneva and Zurich. ISA licence. Confidential mandates.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Israeli Market Private Banking Switzerland | Senior RM Search Geneva Zurich",
    description: "Specialist private banking recruiter for the Israeli market in Switzerland. Senior RMs and Israeli desk heads with Hebrew-speaking, UHNW cross-border books placed at leading Swiss platforms.",
    url: PAGE_URL,
    type: "website",
    siteName: "Executive Partners",
    images: [{ url: `${SITE}/og-articles/og-israeli-market-private-banking-switzerland.jpg`, width: 1200, height: 630 }],
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
              { q: "Does an Israeli market private banker in Switzerland need an ISA licence?", a: "An ISA licence is required for client-facing advisory activity conducted in Israel. Swiss-based bankers serving Israeli clients through Geneva or Zurich platforms operate under FINMA supervision. However, some mandates at banks with Tel Aviv representative offices, or roles involving direct interaction with clients in Israel, require ISA licensing. The specific requirement depends on the role and the bank's operational model." },
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
