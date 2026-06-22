import type { Metadata } from "next"
import Link from "next/link"

const SITE = "https://www.execpartners.ch"
const PAGE_URL = `${SITE}/en/private-banking-headhunter-geneva`

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Executive Partners | Private Banking Headhunter Geneva",
  url: PAGE_URL,
  description: "Geneva-based private banking headhunter reaching senior bankers who are not actively in the market. Confidential direct search for Senior RMs, Desk Heads and Team Leaders at Swiss and international banks.",
  address: { "@type": "PostalAddress", addressLocality: "Geneva", addressCountry: "CH" },
  areaServed: ["Geneva", "Zurich", "Switzerland"],
  serviceType: "Private Banking Executive Search | Direct Headhunt",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What does a private banking headhunter in Geneva do?", acceptedAnswer: { "@type": "Answer", text: "A private banking headhunter in Geneva identifies and approaches senior bankers who are not actively looking for a new role. Rather than posting jobs and waiting for applications, a headhunter maps the market, reaches out directly and confidentially, and presents qualified candidates to hiring institutions. Executive Partners focuses exclusively on senior front-office private banking mandates." } },
    { "@type": "Question", name: "How is a headhunter different from a recruiter?", acceptedAnswer: { "@type": "Answer", text: "A recruiter typically works with active candidates who have applied or registered. A headhunter proactively identifies and approaches individuals who are performing well in their current role and not actively searching. Most of the senior bankers Executive Partners places were not in the market when first contacted." } },
    { "@type": "Question", name: "Is the headhunt process confidential?", acceptedAnswer: { "@type": "Answer", text: "Yes. Executive Partners never shares a banker's profile or approaches their institution without explicit prior consent. Initial conversations carry no obligation and are fully confidential. Your current employer is never contacted or informed." } },
    { "@type": "Question", name: "What seniority level does Executive Partners target for headhunting in Geneva?", acceptedAnswer: { "@type": "Answer", text: "Executive Partners focuses exclusively on senior front-office roles: Senior Relationship Managers with established AUM, Desk Heads, Team Leaders and Market Heads. We do not work junior or mid-level placements. Every mandate is senior-level and confidential." } },
  ],
}

export const metadata: Metadata = {
  title: "Private Banking Headhunter Geneva | Senior RM Direct Search",
  description: "Geneva private banking headhunter. Direct search for Senior RMs and Desk Heads at Swiss and international banks not actively on the market.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Private Banking Headhunter Geneva | Senior RM Search",
    description: "Geneva-based private banking headhunter. Senior RMs, Team Heads and Market Leaders placed across Switzerland and global wealth hubs. Confidential. Senior-level only.",
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
            Geneva · Switzerland · Direct Executive Search
          </p>

          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Private Banking Headhunter in Geneva: Reaching Senior Bankers Who Are Not in the Market
          </h1>

          <p className="text-white/80 text-lg leading-relaxed">
            Executive Partners is a Geneva-based private banking headhunter specialising in confidential direct search. We reach Senior Relationship Managers, Desk Heads and Team Leaders who are performing well in their current role and not actively looking. 200+ placements. 98% twelve-month retention.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/en/apply" className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold bg-[#C9A14A] text-black hover:opacity-90 transition">
              Submit your profile
            </Link>
            <Link href="/en/hiring-managers/brief" className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold border border-white/20 text-white hover:bg-white/10 transition">
              Brief a headhunt mandate
            </Link>
          </div>

          <hr className="border-white/10" />

          <h2 className="text-2xl font-semibold">What Makes Headhunting Different in Private Banking</h2>
          <p className="text-white/70 leading-relaxed">
            The best private bankers are rarely available. Senior RMs with portable UHNW books, clean compliance records and established client relationships are not browsing job boards. Reaching them requires direct approach, market knowledge and the credibility to have a candid conversation about their career and AUM portability before any formal process begins.
          </p>
          <p className="text-white/70 leading-relaxed">
            Executive Partners operates exclusively at the senior end of the private banking market. Every conversation is confidential, every approach is calibrated to the individual, and no profile is ever shared with a hiring institution without explicit consent.
          </p>

          <h2 className="text-2xl font-semibold">Discreet Executive Search Across Swiss and Global Banks</h2>
          <p className="text-white/70 leading-relaxed">
            Our headhunting mandates in Geneva and Zurich cover Senior Relationship Managers with CHF 100M to CHF 800M in AUM, Desk Head positions for platforms building or restructuring their front-office coverage, and Team Leader roles at Swiss pure-play banks, global institutions, boutiques and EAM platforms. We also cover relocations across our 14 global hubs including London, Dubai, Singapore, Hong Kong and New York.
          </p>

          <h2 className="text-2xl font-semibold">How Executive Partners Approaches a Headhunt</h2>
          <p className="text-white/70 leading-relaxed">
            Every headhunt begins with a market map of the relevant population: bankers with the right market coverage, client profile, AUM range and seniority. We assess portability, revenue quality and compliance history before making any approach. Candidates who are not a strong fit for the specific mandate are not approached. This discipline protects both parties and produces calibrated shortlists.
          </p>

          <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {[
              { q: "What does a private banking headhunter in Geneva do?", a: "A private banking headhunter in Geneva identifies and approaches senior bankers who are not actively looking for a new role. Rather than posting jobs and waiting for applications, a headhunter maps the market, reaches out directly and confidentially, and presents qualified candidates to hiring institutions. Executive Partners focuses exclusively on senior front-office private banking mandates." },
              { q: "How is a headhunter different from a recruiter?", a: "A recruiter typically works with active candidates who have applied or registered. A headhunter proactively identifies and approaches individuals who are performing well in their current role and not actively searching. Most of the senior bankers Executive Partners places were not in the market when first contacted." },
              { q: "Is the headhunt process confidential?", a: "Yes. Executive Partners never shares a banker's profile or approaches their institution without explicit prior consent. Initial conversations carry no obligation and are fully confidential. Your current employer is never contacted or informed." },
              { q: "What seniority level does Executive Partners target for headhunting in Geneva?", a: "Executive Partners focuses exclusively on senior front-office roles: Senior Relationship Managers with established AUM, Desk Heads, Team Leaders and Market Heads. We do not work junior or mid-level placements. Every mandate is senior-level and confidential." },
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
              <li><Link href="/en/private-banking-recruiter-geneva" className="hover:text-white transition">Private banking recruiter Geneva</Link></li>
              <li><Link href="/en/private-banking-recruiter-switzerland" className="hover:text-white transition">Private banking recruiter Switzerland</Link></li>
              <li><Link href="/en/private-banking-recruitment-agency" className="hover:text-white transition">Private banking recruitment agency Switzerland</Link></li>
              <li><Link href="/en/markets/geneva" className="hover:text-white transition">Geneva private banking market hub</Link></li>
              <li><Link href="/en/portability" className="hover:text-white transition">AUM Portability Score</Link></li>
              <li><Link href="/en/bp-simulator" className="hover:text-white transition">Business Plan Simulator</Link></li>
            </ul>
          </section>

        </div>
      </main>
    </>
  )
}
