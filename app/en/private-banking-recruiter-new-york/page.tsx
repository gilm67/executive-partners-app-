import type { Metadata } from "next";
import Link from "next/link";

const SITE = "https://www.execpartners.ch";
const PAGE_URL = `${SITE}/en/private-banking-recruiter-new-york`;

export const metadata: Metadata = {
  title: { absolute: "Private Banking Recruiter New York | Senior RMs & Team Heads – Executive Partners" },
  description: "New York specialist executive search for private banking. Senior Relationship Managers, Team Heads and UHNW bankers placed across New York and US wealth hubs. SEC/FINRA-compliant. Confidential.",
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "website", url: PAGE_URL, siteName: "Executive Partners", title: "Private Banking Recruiter in New York – Executive Partners", description: "New York executive search boutique focused on senior Private Bankers, RMs and Team Heads with portable UHNW/HNW books across the US and international markets." },
  twitter: { card: "summary_large_image", title: "Private Banking Recruiter in New York – Executive Partners", description: "New York specialist for private banking recruitment. Senior RMs placed across JPMorgan, Goldman Sachs, UBS, Citi Private Bank and boutique platforms. Confidential.", images: ["https://www.execpartners.ch/og.webp"] },
  robots: { index: true, follow: true },
};

export const revalidate = 1800;

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness"],
  name: "Executive Partners – Private Banking Recruiter in New York",
  url: PAGE_URL,
  image: `${SITE}/og.webp`,
  logo: `${SITE}/icon.png`,
  address: { "@type": "PostalAddress", streetAddress: "118 rue du Rhône", addressLocality: "Geneva", postalCode: "1204", addressCountry: "CH" },
  areaServed: ["New York", "United States", "Americas"],
  industry: "Private Banking & Wealth Management Recruitment",
  sameAs: ["https://www.linkedin.com/company/executive-partners", SITE],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Markets", item: `${SITE}/markets` },
    { "@type": "ListItem", position: 3, name: "Private Banking Recruiter – New York", item: PAGE_URL },
  ],
};

export default function PrivateBankingRecruiterNewYorkPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <main className="relative min-h-screen bg-[#0B0F1A] text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(900px 360px at 15% -10%, rgba(201,161,74,.22) 0%, rgba(201,161,74,0) 55%), radial-gradient(900px 360px at 110% 0%, rgba(245,231,192,.18) 0%, rgba(245,231,192,0) 60%)" }} />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-12">
          <header className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brandGoldSoft/90">New York · United States · Private Banking · Executive Search</p>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">Private Banking Recruiter in New York</h1>
            <p className="mt-4 text-sm text-neutral-300 md:text-[0.95rem] leading-relaxed">
              Executive Partners is a Switzerland-based boutique focused exclusively on <span className="font-semibold text-neutral-100">Private Banking &amp; Wealth Management</span>. In New York, we place Senior Relationship Managers, Team Heads and Market Leaders with a specific focus on <span className="font-semibold text-neutral-100">US onshore UHNW coverage, SEC/FINRA-compliant portability, and international cross-border desks serving LATAM, European and globally mobile families</span>.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary btn-xl">Discuss a mandate or move</Link>
              <Link href="/pdfs/private-banking-career-intelligence-2026.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Download Career Intelligence 2026 (PDF)</Link>
            </div>
          </header>

          <section className="mt-12 grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)]">
            <div className="space-y-4 text-sm text-neutral-200 md:text-[0.95rem] leading-relaxed">
              <h2 className="text-xl font-semibold text-white">New York: the world's largest concentration of UHNW private banking talent</h2>
              <p>New York is the largest private banking market in the world by total client assets, hosting the US headquarters of JPMorgan Private Bank, Goldman Sachs Private Wealth Management, Citi Private Bank, UBS Wealth Management Americas, Morgan Stanley Private Wealth, and every major Swiss and European private banking platform with a US presence. <span className="font-semibold">North America drove the strongest HNWI wealth growth in 2024, with global HNWI wealth reaching USD 90.5 trillion</span>, according to the Capgemini World Wealth Report 2025.</p>
              <p>The New York market is characterised by its combination of domestic US onshore wealth, internationally mobile UHNW families with US nexus, and cross-border desks serving LATAM, European and Middle Eastern clients through SEC and FINRA-regulated frameworks. JPMorgan's Asset &amp; Wealth Management division generated a 23% increase in net income to USD 1.7 billion in Q3 2025, with AUM reaching USD 4.6 trillion.</p>
              <p>Over the last 24 months, hiring demand in New York has concentrated on:</p>
              <ul className="list-disc space-y-1 pl-5 text-neutral-200">
                <li>Senior RMs with <span className="font-semibold">US onshore UHNW books and referenceable multi-year tenure</span></li>
                <li>LATAM specialists with Brazilian, Mexican and Argentine cross-border coverage</li>
                <li>Team Heads with USD 500m+ in portable, SEC/FINRA-compliant AUM</li>
                <li>Advisors with <span className="font-semibold">alternative investment, private equity and lending expertise</span></li>
              </ul>
              <p>New York hiring committees focus on <span className="font-semibold">SEC and FINRA compliance, Reg BI suitability documentation, recurring revenue quality, and the ability to retain and grow multi-generational UHNW relationships</span>.</p>
            </div>
            <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-base font-semibold text-white">How Executive Partners supports New York hiring</h3>
              <ul className="mt-4 space-y-2 text-sm text-neutral-200">
                <li>• Senior RM, Team Head &amp; Market Leader search</li>
                <li>• US onshore AUM portability and booking-centre mapping</li>
                <li>• SEC/FINRA compliance and KYC documentation screening</li>
                <li>• Revenue &amp; ROA analysis by client segment</li>
                <li>• 12–24 month NNM projection and business plan support</li>
              </ul>
              <div className="mt-5"><Link href="/apply" className="btn btn-secondary w-full text-sm font-medium">Senior RM? Submit your profile</Link></div>
            </aside>
          </section>

          <section className="mt-14 rounded-3xl border border-white/10 bg-black/40 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.75)] backdrop-blur md:p-8">
            <h2 className="text-xl font-semibold text-white">2025–2026 New York compensation benchmarks</h2>
            <p className="mt-3 text-sm text-neutral-300 md:text-[0.95rem]">New York applies federal and state income tax. Figures below are gross pre-tax compensation.</p>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm text-neutral-100">
                <thead className="border-b border-white/10 text-xs uppercase tracking-wide text-neutral-400">
                  <tr>
                    <th className="py-2 pr-4">Role</th>
                    <th className="py-2 pr-4">Base salary (USD)</th>
                    <th className="py-2 pr-4">Bonus range</th>
                    <th className="py-2 pr-4">Typical total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr><td className="py-2 pr-4">RM (5–10 years)</td><td className="py-2 pr-4">120k – 180k</td><td className="py-2 pr-4">20% – 60%</td><td className="py-2 pr-4">145k – 290k</td></tr>
                  <tr><td className="py-2 pr-4">Senior RM (10–20 years)</td><td className="py-2 pr-4">180k – 300k</td><td className="py-2 pr-4">40% – 150%</td><td className="py-2 pr-4">250k – 750k</td></tr>
                  <tr><td className="py-2 pr-4">Ultra UHNW RM</td><td className="py-2 pr-4">300k – 500k</td><td className="py-2 pr-4">100% – 300%</td><td className="py-2 pr-4">600k – 2m+</td></tr>
                  <tr><td className="py-2 pr-4">Team Head</td><td className="py-2 pr-4">350k – 550k</td><td className="py-2 pr-4">100% – 300%</td><td className="py-2 pr-4">700k – 2.5m+</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-neutral-500">These ranges are indicative gross figures. Individual offers depend on platform, AUM portability, compliance history and client mix.</p>
          </section>

          <section className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-base font-semibold text-white">Insights for New York-based bankers</h3>
              <p className="mt-2 text-sm text-neutral-300">Market commentary on US private banking, UHNW dynamics and cross-border talent flows.</p>
              <ul className="mt-4 space-y-2 text-sm text-brandGoldSoft">
                <li><Link href="/en/insights/is-your-aum-portable" className="hover:underline">Is Your AUM Actually Portable? The Six Questions Every Banker Gets Wrong</Link></li>
                <li><Link href="/en/insights/compliance-golden-handcuff" className="hover:underline">Compliance Is the New Golden Handcuff</Link></li>
                <li><Link href="/en/insights/the-alpine-exit" className="hover:underline">The Alpine Exit: What Happens to Private Banking if UBS Leaves Switzerland</Link></li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-base font-semibold text-white">Work with Executive Partners in New York</h3>
              <p className="mt-2 text-sm text-neutral-300">Whether you are a New York-based bank or a Senior RM considering a move, we provide confidential guidance on platforms, compensation and portability.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-primary btn-sm">Talk to us about a mandate</Link>
                <Link href="/apply" className="btn btn-ghost btn-sm">Submit your profile</Link>
              </div>
            </div>
          </section>
          <p className="mt-10 text-center text-sm text-neutral-400">Prefer to start with a discreet email?{" "}<a href="mailto:info@execpartners.ch" className="underline decoration-brandGold/70 underline-offset-4 hover:text-white">info@execpartners.ch</a></p>
        </div>
      </main>
    </>
  );
}
