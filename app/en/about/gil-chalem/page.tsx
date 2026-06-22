import type { Metadata } from "next";
import Link from "next/link";

const SITE = "https://www.execpartners.ch";

export const metadata: Metadata = {
  title: { absolute: "Gil M. Chalem — Private Banking Recruiter Geneva | Executive Partners" },
  description:
    "Gil M. Chalem is Managing Partner of Executive Partners, a Geneva-based boutique specialised exclusively in private banking and wealth management executive search. 200+ placements. 17,000+ LinkedIn connections. Author of Private Wealth Pulse.",
  alternates: { canonical: `${SITE}/en/about/gil-chalem` },
  openGraph: {
    title: "Gil M. Chalem — Private Banking Recruiter Geneva",
    description: "Managing Partner, Executive Partners. Geneva-based private banking executive search. 200+ placements. Author of Private Wealth Pulse.",
    url: `${SITE}/en/about/gil-chalem`,
    images: [{ url: `${SITE}/og.webp` }],
    type: "profile",
  },
  robots: { index: true, follow: true },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE}/en/about/gil-chalem#person`,
  name: "Gil M. Chalem",
  givenName: "Gil",
  familyName: "Chalem",
  jobTitle: "Managing Partner",
  description:
    "Geneva-based executive recruiter specialising exclusively in private banking and wealth management. Founder of Executive Partners and author of Private Wealth Pulse. 200+ senior placements across 14 global wealth hubs with a 98% 12-month retention rate.",
  url: `${SITE}/en/about/gil-chalem`,
  image: `${SITE}/og.webp`,
  worksFor: {
    "@type": "Organization",
    name: "Executive Partners",
    url: SITE,
    sameAs: SITE,
  },
  sameAs: [
    "https://www.linkedin.com/in/gil-m-chalem-35281916b/",
    SITE,
    `${SITE}/en/about`,
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Geneva",
    addressCountry: "CH",
  },
  knowsAbout: [
    "Private Banking Recruitment",
    "Wealth Management Executive Search",
    "AUM Portability",
    "Senior Relationship Manager Placement",
    "Private Banking Compensation Benchmarks",
    "Swiss Private Banking",
    "UHNW Client Coverage",
    "Non-Producible Contribution (NPC)",
    "ISA Licence",
    "External Asset Managers",
  ],
  alumniOf: [],
  hasOccupation: {
    "@type": "Occupation",
    name: "Executive Recruiter — Private Banking & Wealth Management",
    occupationLocation: { "@type": "City", name: "Geneva" },
    skills: "Private banking executive search, AUM portability assessment, compensation negotiation, market mapping",
  },
  publishingPrinciples: `${SITE}/en/insights`,
  authorOf: [
    { "@type": "Article", name: "What Is AUM Portability in Private Banking?", url: `${SITE}/en/insights/what-is-aum-portability-private-banking` },
    { "@type": "Article", name: "Private Banking Salaries in Switzerland 2026", url: `${SITE}/en/insights/private-banking-salary-switzerland-2026` },
    { "@type": "Article", name: "What Is an ISA Licence and Why Does It Matter?", url: `${SITE}/en/insights/isa-licence-private-banking-switzerland` },
    { "@type": "Article", name: "The Zurich Freeze Is Ending", url: `${SITE}/en/insights/zurich-talent-unlock-2026` },
    { "@type": "Article", name: "The Crown Changes Hands", url: `${SITE}/en/insights/hong-kong-switzerland-offshore-wealth-crown` },
    { "@type": "Article", name: "The Geneva Paradox", url: `${SITE}/en/insights/the-geneva-paradox` },
    { "@type": "Article", name: "The Sandbox Talent Map", url: `${SITE}/en/insights/the-sandbox-talent-map` },
    { "@type": "Article", name: "Singapore vs Hong Kong: The Asia Talent War", url: `${SITE}/en/insights/singapore-hongkong-talent-war-2026` },
  ],
};

const articles = [
  { slug: "what-is-aum-portability-private-banking", title: "What Is AUM Portability in Private Banking?", date: "22 Jun 2026", tag: "Definitive Guide" },
  { slug: "private-banking-salary-switzerland-2026", title: "Private Banking Salaries in Switzerland 2026", date: "22 Jun 2026", tag: "Salary Data" },
  { slug: "isa-licence-private-banking-switzerland", title: "What Is an ISA Licence in Private Banking?", date: "22 Jun 2026", tag: "Regulatory" },
  { slug: "zurich-talent-unlock-2026", title: "The Zurich Freeze Is Ending", date: "18 Jun 2026", tag: "Market Intel" },
  { slug: "singapore-hongkong-talent-war-2026", title: "Singapore vs Hong Kong: The Asia Talent War", date: "14 Jun 2026", tag: "APAC" },
  { slug: "hong-kong-switzerland-offshore-wealth-crown", title: "The Crown Changes Hands", date: "29 May 2026", tag: "Wealth Rankings" },
  { slug: "wealth-migration-numbers-dont-agree", title: "The Migration Numbers Don’t Agree", date: "16 Jun 2026", tag: "Wealth Migration" },
  { slug: "the-sandbox-talent-map", title: "The Sandbox Talent Map", date: "Apr 2026", tag: "MEA" },
  { slug: "the-geneva-paradox", title: "The Geneva Paradox", date: "Mar 2026", tag: "Geneva" },
];

const expertise = [
  { area: "Swiss Private Banking", detail: "Geneva and Zurich mandates across onshore, cross-border, and international UHNW markets. FINMA framework, EAM ecosystem, NPC structuring." },
  { area: "AUM Portability Assessment", detail: "Proprietary Portability Score methodology used by 500+ private bankers. Structured six-dimension model covering client loyalty, wallet share, regulatory jurisdiction and legal constraints." },
  { area: "Compensation Benchmarking", detail: "Live market data across Geneva, Zurich, Dubai, Singapore, London and New York. Base, bonus and NPC structures at Director, ED and MD levels." },
  { area: "Middle East & Africa", detail: "GCC, Saudi onshore, Israeli market, and pan-African coverage. DFSA/ADGM licensing, Vision 2030 dynamics, ISA licence requirements." },
  { area: "APAC Private Banking", detail: "Singapore MAS and Hong Kong SFC frameworks. North Asia, Southeast Asia, and Australia cross-border coverage for international private banks." },
  { area: "LATAM & NRI Coverage", detail: "Brazilian, Argentine, and broader Latin American offshore wealth. NRI desk mandates for Indian market coverage from Geneva and Zurich." },
];

export default function GilChalemPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <main className="min-h-screen bg-[#0B0E13] text-white">

        {/* Hero */}
        <div className="border-b border-white/10 px-6 py-20 md:px-16">
          <div className="mx-auto max-w-4xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#C9A14A]">
              Managing Partner · Executive Partners · Geneva
            </p>
            <h1 className="mb-4 text-4xl font-light text-white md:text-5xl">
              Gil M. Chalem
            </h1>
            <p className="mb-6 max-w-2xl text-lg leading-relaxed text-white/70">
              Geneva-based executive recruiter specialising exclusively in private banking and wealth
              management. Founder of Executive Partners and author of Private Wealth Pulse.
              200+ senior placements across 14 global wealth hubs with a 98% 12-month retention rate.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.linkedin.com/in/gil-m-chalem-35281916b/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm text-white/70 hover:border-white/40 hover:text-white transition"
              >
                LinkedIn — 17,000+ connections
              </a>
              <Link
                href="/en/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#C9A14A] px-5 py-2.5 text-sm font-semibold text-black hover:opacity-90 transition"
              >
                Contact Gil directly
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="border-b border-white/10 px-6 py-12 md:px-16">
          <div className="mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              ["200+", "Senior placements"],
              ["98%", "12-month retention"],
              ["14+", "Global hubs covered"],
              ["2,300+", "Newsletter subscribers"],
            ].map(([val, lbl]) => (
              <div key={lbl} className="text-center">
                <p className="text-3xl font-light text-[#C9A14A]">{val}</p>
                <p className="mt-1 text-xs text-white/40 uppercase tracking-wider">{lbl}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Expertise */}
        <div className="border-b border-white/10 px-6 py-16 md:px-16">
          <div className="mx-auto max-w-4xl">
            <p className="mb-2 text-xs uppercase tracking-widest text-[#C9A14A]">Areas of expertise</p>
            <h2 className="mb-10 text-2xl font-light text-white">Market coverage and specialisations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {expertise.map(({ area, detail }) => (
                <div key={area} className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <p className="mb-2 text-sm font-semibold text-white">{area}</p>
                  <p className="text-xs leading-relaxed text-white/50">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Published articles */}
        <div className="border-b border-white/10 px-6 py-16 md:px-16">
          <div className="mx-auto max-w-4xl">
            <p className="mb-2 text-xs uppercase tracking-widest text-[#C9A14A]">Private Wealth Pulse</p>
            <h2 className="mb-2 text-2xl font-light text-white">Published analysis</h2>
            <p className="mb-10 text-sm text-white/40">
              Practitioner-led market intelligence on private banking strategy, talent and compensation.
            </p>
            <div className="space-y-3">
              {articles.map(({ slug, title, date, tag }) => (
                <Link
                  key={slug}
                  href={`/en/insights/${slug}`}
                  className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-4 hover:border-[#C9A14A]/30 hover:bg-white/8 transition group"
                >
                  <div>
                    <span className="inline-block mb-2 rounded-full bg-[#C9A14A]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#C9A14A]">
                      {tag}
                    </span>
                    <p className="text-sm font-medium text-white group-hover:text-[#C9A14A] transition">{title}</p>
                    <p className="mt-1 text-xs text-white/30">{date}</p>
                  </div>
                  <span className="text-white/20 group-hover:text-[#C9A14A] transition text-lg shrink-0">→</span>
                </Link>
              ))}
            </div>
            <div className="mt-6">
              <Link href="/en/insights" className="text-sm text-white/40 hover:text-white underline underline-offset-4 transition">
                View all Private Wealth Pulse articles →
              </Link>
            </div>
          </div>
        </div>

        {/* About EP */}
        <div className="px-6 py-16 md:px-16">
          <div className="mx-auto max-w-4xl">
            <p className="mb-2 text-xs uppercase tracking-widest text-[#C9A14A]">Executive Partners</p>
            <h2 className="mb-6 text-2xl font-light text-white">The firm</h2>
            <p className="text-white/60 leading-relaxed mb-4 max-w-2xl">
              Executive Partners is a Geneva-based boutique executive search firm operating exclusively
              in private banking and wealth management. Every mandate is handled personally by Gil M. Chalem.
              No juniors present candidates. No volume targets. One point of contact from first conversation
              to signed offer.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/en/about" className="text-sm text-white/40 hover:text-white underline underline-offset-4">About Executive Partners</Link>
              <Link href="/en/jobs" className="text-sm text-white/40 hover:text-white underline underline-offset-4">Active mandates</Link>
              <Link href="/en/candidates" className="text-sm text-white/40 hover:text-white underline underline-offset-4">For private bankers</Link>
              <Link href="/en/subscribe" className="text-sm text-white/40 hover:text-white underline underline-offset-4">Subscribe to Private Wealth Pulse</Link>
            </div>
          </div>
        </div>

      </main>
    </>
  );
}
