import { Metadata } from "next"
import Link from "next/link"


const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Executive Partners',
  description: 'Private banking recruitment company based in Geneva, Switzerland. Senior-only executive search for Relationship Managers, Team Heads and Investment Advisors across 14 global hubs.',
  url: 'https://www.execpartners.ch/en/private-banking-recruitment-company',
  telephone: '',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Geneva',
    addressCountry: 'CH',
  },
  areaServed: ['CH', 'GB', 'AE', 'SG', 'HK', 'US', 'FR', 'IT', 'IL', 'SA', 'ES', 'PT'],
  serviceType: 'Private Banking Executive Search',
  knowsAbout: ['Private Banking', 'Wealth Management', 'AUM Portability', 'Relationship Manager Placement'],
}


const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What does a private banking recruitment company do?', acceptedAnswer: { '@type': 'Answer', text: 'A private banking recruitment company sources and places senior front-office professionals, primarily Relationship Managers, Team Heads and Investment Advisors, at private banks, EAMs and family offices. A specialist firm like Executive Partners focuses exclusively on private banking and wealth management, with deep knowledge of AUM portability, compensation benchmarks and client-franchise dynamics.' } },
    { '@type': 'Question', name: 'How does Executive Partners differ from other private banking recruitment companies?', acceptedAnswer: { '@type': 'Answer', text: 'Executive Partners works exclusively on senior private banking mandates. Every candidate is assessed for AUM portability, revenue quality and compliance history before being presented. We operate on a retained or engaged basis, never contingency. Our 98% twelve-month retention rate across 200+ placements reflects that model.' } },
    { '@type': 'Question', name: 'Which markets does Executive Partners cover?', acceptedAnswer: { '@type': 'Answer', text: 'Executive Partners covers 14 global private banking hubs: Geneva, Zurich, London, Dubai, Singapore, Hong Kong, New York, Miami, Paris, Milan, Madrid, Lisbon, Riyadh and Tel Aviv.' } },
    { '@type': 'Question', name: 'Do you work with senior bankers who are not actively looking for a new role?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Most senior bankers who engage Executive Partners are not actively searching. They want to understand their AUM portability, assess their market value, and identify which platforms are the best strategic fit. All conversations are fully confidential and carry no obligation.' } },
  ],
}

export const metadata: Metadata = {
  title: "Private Banking Recruitment Company | Executive Partners Switzerland",
  description: "Executive Partners is a private banking recruitment company based in Geneva, Switzerland. Senior-only executive search for Relationship Managers, Team Heads and Investment Advisors across 14 global hubs. 200+ placements. 98% retention.",
  alternates: { canonical: "https://www.execpartners.ch/en/private-banking-recruitment-company" },
  openGraph: {
    title: "Private Banking Recruitment Company | Executive Partners Switzerland",
    description: "Geneva-based private banking recruitment company specialising in senior RM and Team Head search across Switzerland and major global wealth hubs.",
    url: "https://www.execpartners.ch/en/private-banking-recruitment-company",
    siteName: "Executive Partners", type: "website",
  },
}

const HUBS=["🇨🇭 Geneva","🇨🇭 Zurich","🇬🇧 London","🇦🇪 Dubai","🇸🇬 Singapore","🇭🇰 Hong Kong","🇺🇸 New York","🇺🇸 Miami","🇫🇷 Paris","🇮🇹 Milan","🇮🇱 Tel Aviv","🇸🇦 Riyadh","🇪🇸 Madrid","🇵🇹 Lisbon"]
const MANDATES=["Senior Relationship Managers with portable HNW or UHNW books","Team Heads with CHF 200m+ group mobility","Market Leaders for new desk launches (French, Italian, CIS/CEE, MEA, LATAM)","Investment Advisors with DPM and advisory mandate experience","EAM-facing bankers for independent asset managers"]

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main id="main" className="max-w-3xl mx-auto px-6 py-16">
      <p className="text-sm uppercase tracking-widest opacity-50 mb-4">Private Banking · Executive Search · Switzerland</p>
      <h1 className="text-4xl font-semibold leading-tight mb-6">Private Banking Recruitment Company</h1>
      <p className="text-lg opacity-80 leading-relaxed mb-8">Executive Partners is a Geneva-based private banking recruitment company focused exclusively on wealth management and private banking. We run senior-only mandates across Switzerland and 14 global hubs.</p>
      <div className="flex gap-4 flex-wrap mb-16">
        <Link href="/en/hiring-managers/brief" className="btn-primary">Brief a mandate</Link>
        <Link href="/en/apply" className="btn-secondary">Submit your profile</Link>
      </div>
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">What makes this recruitment company different</h2>
        <p className="opacity-70 leading-relaxed mb-4">Most private banking recruitment companies operate as generalist financial services agencies with a private banking desk on the side. Executive Partners does one thing only: senior private banker placement. Every search is at Director or Managing Director level, with validated AUM portability analysis before any candidate is presented to a bank.</p>
        <p className="opacity-70 leading-relaxed">This focus translates into a 98% twelve-month retention rate across 200+ placements. Banks work with us because we present one to three precisely matched candidates rather than a longlist of speculative profiles.</p>
      </section>
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Markets covered</h2>
        <div className="grid grid-cols-2 gap-2 text-sm opacity-70 mb-6">{HUBS.map(h=><span key={h}>{h}</span>)}</div>
        <Link href="/en/markets" className="text-sm underline underline-offset-2 opacity-60">View all market hubs</Link>
      </section>
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Mandates we run</h2>
        <ul className="opacity-70 leading-relaxed space-y-2">{MANDATES.map(m=><li key={m}>{m}</li>)}</ul>
      </section>
      <section className="mb-16 grid grid-cols-3 gap-6 text-center">
        {[["200+","Senior placements"],["98%","12-month retention"],["14","Global hubs"]].map(([n,l])=>(
          <div key={l}><p className="text-3xl font-semibold">{n}</p><p className="text-sm opacity-60 mt-1">{l}</p></div>
        ))}
      </section>
      <section className="border border-current border-opacity-10 rounded-xl p-8 mb-16">
        <h2 className="text-xl font-semibold mb-3">Work with a specialist private banking recruitment company</h2>
        <p className="opacity-60 text-sm leading-relaxed mb-6">Whether you are a bank, EAM, or family office looking to hire, or a senior banker considering a move, we respond the same business day.</p>
        <div className="flex gap-4 flex-wrap">
          <Link href="/en/hiring-managers/brief" className="btn-primary text-sm">Brief a mandate</Link>
          <Link href="/en/contact" className="btn-secondary text-sm">Get in touch</Link>
        </div>
        <p className="text-xs opacity-40 mt-4">Prefer email? <a href="mailto:recruiter@execpartners.ch" className="underline">recruiter@execpartners.ch</a></p>
      </section>
      <section className="mb-16 border-t border-current border-opacity-10 pt-12">
        <h2 className="text-xl font-semibold mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            { q: "What does a private banking recruitment company do?", a: "A private banking recruitment company sources and places senior front-office professionals, primarily Relationship Managers, Team Heads and Investment Advisors, at private banks, EAMs and family offices. A specialist firm like Executive Partners focuses exclusively on private banking and wealth management, with deep knowledge of AUM portability, compensation benchmarks and client-franchise dynamics." },
            { q: "How does Executive Partners differ from other private banking recruitment companies?", a: "Executive Partners works exclusively on senior private banking mandates. Every candidate is assessed for AUM portability, revenue quality and compliance history before being presented. We operate on a retained or engaged basis, never contingency. Our 98% twelve-month retention rate across 200+ placements reflects that model." },
            { q: "Which markets does Executive Partners cover?", a: "Executive Partners covers 14 global private banking hubs: Geneva, Zurich, London, Dubai, Singapore, Hong Kong, New York, Miami, Paris, Milan, Madrid, Lisbon, Riyadh and Tel Aviv." },
            { q: "Do you work with senior bankers who are not actively looking?", a: "Yes. Most senior bankers who engage Executive Partners are not actively searching. They want to understand their AUM portability, assess their market value, and identify which platforms are the best strategic fit. All conversations are fully confidential and carry no obligation." },
          ].map(({q, a}) => (
            <div key={q} className="border-b border-current border-opacity-10 pb-6 last:border-0">
              <h3 className="font-medium mb-2">{q}</h3>
              <p className="text-sm opacity-60 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>
            <section>
        <h2 className="text-lg font-semibold mb-4">Related</h2>
        <ul className="space-y-2 text-sm opacity-60">
          <li><Link href="/en/private-banking-recruiter-geneva" className="underline underline-offset-2">Private banking recruiter Geneva</Link></li>
          <li><Link href="/en/private-banking-recruiter-switzerland" className="underline underline-offset-2">Private banking recruiter Switzerland</Link></li>
          <li><Link href="/en/latam-private-banking-recruiter-geneva" className="underline underline-offset-2">LATAM private banking recruiter Geneva</Link></li>
          <li><Link href="/en/mea-private-banking-recruiter-geneva" className="underline underline-offset-2">MEA private banking recruiter Geneva</Link></li>
          <li><Link href="/en/nri-private-banking-recruiter-switzerland" className="underline underline-offset-2">NRI private banking recruiter Switzerland</Link></li>
          <li><Link href="/en/israeli-market-private-banking-switzerland" className="underline underline-offset-2">Israeli market private banking Switzerland</Link></li>
          <li><Link href="/en/hiring-managers" className="underline underline-offset-2">For hiring managers: brief a mandate</Link></li>
          <li><Link href="/en/markets" className="underline underline-offset-2">All market hubs</Link></li>
          <li><Link href="/en/private-banking-recruitment-agency" className="underline underline-offset-2">Private banking recruitment agency</Link></li>
        </ul>
      </section>
    </main>
    </>
  )
}
