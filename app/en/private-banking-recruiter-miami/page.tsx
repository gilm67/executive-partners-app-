import type { Metadata } from "next";
import Link from "next/link";
const SITE = "https://www.execpartners.ch";
const PAGE_URL = `${SITE}/en/private-banking-recruiter-miami`;
export const metadata: Metadata = {
  title: { absolute: "Private Banking Recruiter Miami | LATAM Private Banking & Senior RMs – Executive Partners" },
  description: "Miami specialist executive search for private banking. Senior RMs, Team Heads and UHNW bankers placed across Miami LATAM desks. Bilingual Spanish/Portuguese. Confidential. Senior-level only.",
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "website", url: PAGE_URL, siteName: "Executive Partners", title: "Private Banking Recruiter in Miami – Executive Partners", description: "Miami executive search for senior Private Bankers and RMs serving Latin American UHNW clients. Bilingual coverage, SEC/FINRA compliance." },
  robots: { index: true, follow: true },
};
export const revalidate = 1800;
const orgJsonLd = { "@context": "https://schema.org", "@type": ["ProfessionalService", "LocalBusiness"], name: "Executive Partners – Private Banking Recruiter in Miami", url: PAGE_URL, address: { "@type": "PostalAddress", streetAddress: "118 rue du Rhône", addressLocality: "Geneva", postalCode: "1204", addressCountry: "CH" }, areaServed: ["Miami", "United States", "Latin America"], industry: "Private Banking & Wealth Management Recruitment" };
const breadcrumbJsonLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Markets", item: `${SITE}/markets` }, { "@type": "ListItem", position: 3, name: "Private Banking Recruiter – Miami", item: PAGE_URL }] };
export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <main className="relative min-h-screen bg-[#0B0F1A] text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(900px 360px at 15% -10%, rgba(201,161,74,.22) 0%, rgba(201,161,74,0) 55%), radial-gradient(900px 360px at 110% 0%, rgba(245,231,192,.18) 0%, rgba(245,231,192,0) 60%)" }} />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-12">
          <header className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brandGoldSoft/90">Miami · United States · Private Banking · Executive Search</p>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">Private Banking Recruiter in Miami</h1>
            <p className="mt-4 text-sm text-neutral-300 md:text-[0.95rem] leading-relaxed">Executive Partners is a Switzerland-based boutique focused exclusively on <span className="font-semibold text-neutral-100">Private Banking &amp; Wealth Management</span>. In Miami, we place Senior Relationship Managers, Team Heads and Market Leaders with a specific focus on <span className="font-semibold text-neutral-100">Latin American UHNW cross-border coverage, US onshore wealth, bilingual Spanish and Portuguese client expertise, and SEC/FINRA-compliant portability</span>.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary btn-xl">Discuss a mandate or move</Link>
              <Link href="/pdfs/private-banking-career-intelligence-2026.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Download Career Intelligence 2026 (PDF)</Link>
            </div>
          </header>
          <section className="mt-12 grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)]">
            <div className="space-y-4 text-sm text-neutral-200 md:text-[0.95rem] leading-relaxed">
              <h2 className="text-xl font-semibold text-white">Miami: the capital of Latin American private banking in the United States</h2>
              <p>The Brickell Financial District is the de facto regional headquarters for Latin American private wealth management in the United States, targeting USD 3.2 trillion in Latin American investable assets. Itaú Private Bank, Banco Santander International, and Banco de Crédito del Perú collectively occupy over 400,000 square feet in Brickell, alongside HSBC Private Banking, BTG Pactual, and the Miami operations of UBS and Morgan Stanley Private Wealth Management.</p>
              <p>Miami unique competitive dynamic is that the most critical role in this ecosystem, the bilingual private wealth advisor with Series 7 and Series 66 certifications and established relationships with Latin American UHNW families, takes an average of 142 days to fill. The equivalent monolingual role fills in 68 days. That gap is the talent market. Banks that can identify and move on the right bilingual senior RM profiles faster than competitors win the mandate.</p>
              <p>Santander Private Banking International is actively hiring Brazil coverage bankers in Miami as of June 2026, with a mandate focused on UHNW and HNW individuals with nexus to Latin America. Florida has no state income tax, making Miami compensation packages significantly more competitive on a net basis versus New York for senior talent.</p>
              <p>Over the last 24 months, hiring demand in Miami has concentrated on:</p>
              <ul className="list-disc space-y-1 pl-5 text-neutral-200">
                <li>Senior RMs with <span className="font-semibold">LATAM UHNW cross-border coverage and native Spanish or Portuguese fluency</span></li>
                <li>Team Heads with USD 300m+ portable AUM from Brazil, Colombia, Mexico or Argentina</li>
                <li>Advisors with Series 7/66 certification and international tax structuring expertise</li>
                <li>Bankers bridging LATAM flows between Miami and Geneva or Zurich booking centres</li>
              </ul>
              <p>Miami hiring committees focus on SEC/FINRA compliance, documented LATAM portability, language capability, and the ability to originate new relationships within the existing Latin American diaspora network.</p>
            </div>
            <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-base font-semibold text-white">How Executive Partners supports Miami hiring</h3>
              <ul className="mt-4 space-y-2 text-sm text-neutral-200">
                <li>• Senior RM, Team Head &amp; Market Leader search</li>
                <li>• LATAM AUM portability and booking-centre mapping</li>
                <li>• SEC/FINRA compliance and KYC screening</li>
                <li>• Revenue &amp; ROA analysis by client segment</li>
                <li>• 12–24 month NNM projection and business plan support</li>
              </ul>
              <div className="mt-5"><Link href="/apply" className="btn btn-secondary w-full text-sm font-medium">Senior RM? Submit your profile</Link></div>
            </aside>
          </section>
          <section className="mt-14 rounded-3xl border border-white/10 bg-black/40 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.75)] backdrop-blur md:p-8">
            <h2 className="text-xl font-semibold text-white">2025–2026 Miami compensation benchmarks</h2>
            <p className="mt-3 text-sm text-neutral-300">Gross pre-tax figures in USD. Florida has no state income tax, making Miami packages more competitive on a net basis than equivalent New York roles.</p>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm text-neutral-100">
                <thead className="border-b border-white/10 text-xs uppercase tracking-wide text-neutral-400"><tr><th className="py-2 pr-4">Role</th><th className="py-2 pr-4">Base (USD)</th><th className="py-2 pr-4">Bonus</th><th className="py-2 pr-4">Total</th></tr></thead>
                <tbody className="divide-y divide-white/5">
                  <tr><td className="py-2 pr-4">RM (5–10 years)</td><td className="py-2 pr-4">110k – 160k</td><td className="py-2 pr-4">20% – 60%</td><td className="py-2 pr-4">132k – 256k</td></tr>
                  <tr><td className="py-2 pr-4">Senior RM (10–20 years)</td><td className="py-2 pr-4">160k – 270k</td><td className="py-2 pr-4">40% – 150%</td><td className="py-2 pr-4">224k – 675k</td></tr>
                  <tr><td className="py-2 pr-4">Ultra UHNW RM</td><td className="py-2 pr-4">270k – 450k</td><td className="py-2 pr-4">100% – 300%</td><td className="py-2 pr-4">540k – 1.8m+</td></tr>
                  <tr><td className="py-2 pr-4">Team Head</td><td className="py-2 pr-4">320k – 500k</td><td className="py-2 pr-4">100% – 250%</td><td className="py-2 pr-4">640k – 1.75m+</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-neutral-500">Indicative gross figures. No Florida state income tax. Federal income tax applies. Individual offers depend on platform, bilingual capability, LATAM portability and compliance history.</p>
          </section>
          <section className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-base font-semibold text-white">Insights for Miami-based bankers</h3>
              <p className="mt-2 text-sm text-neutral-300">Market commentary on LATAM private banking, cross-border flows and talent dynamics.</p>
              <ul className="mt-4 space-y-2 text-sm text-brandGoldSoft">
                <li><Link href="/en/insights/is-your-aum-portable" className="hover:underline">Is Your AUM Actually Portable? The Six Questions Every Banker Gets Wrong</Link></li>
                <li><Link href="/en/insights/compliance-golden-handcuff" className="hover:underline">Compliance Is the New Golden Handcuff</Link></li>
                <li><Link href="/en/insights/the-platform-illusion" className="hover:underline">The Platform Illusion: Why the Pitch That Wins Mandates Never Transfers AUM</Link></li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-base font-semibold text-white">Work with Executive Partners in Miami</h3>
              <p className="mt-2 text-sm text-neutral-300">Whether you are a Miami-based bank or a Senior RM considering a move, we provide confidential guidance on platforms, compensation and portability.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-primary btn-sm">Talk to us about a mandate</Link>
                <Link href="/apply" className="btn btn-ghost btn-sm">Submit your profile</Link>
              </div>
            </div>
          </section>
          <p className="mt-10 text-center text-sm text-neutral-400">Prefer to start with a discreet email? <a href="mailto:recruiter@execpartners.ch" className="underline decoration-brandGold/70 underline-offset-4 hover:text-white">recruiter@execpartners.ch</a></p>
        </div>
      </main>
    </>
  );
}