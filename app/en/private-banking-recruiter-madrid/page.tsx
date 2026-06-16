import type { Metadata } from "next";
import Link from "next/link";
const SITE = "https://www.execpartners.ch";
const PAGE_URL = `${SITE}/en/private-banking-recruiter-madrid`;
export const metadata: Metadata = {
  title: { absolute: "Private Banking Recruiter Madrid | Senior RMs & Team Heads – Executive Partners" },
  description: "Madrid specialist executive search for private banking. Senior RMs, Team Heads and UHNW bankers placed across Madrid and Spanish wealth hubs. LATAM cross-border expertise. Confidential.",
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "website", url: PAGE_URL, siteName: "Executive Partners", title: "Private Banking Recruiter in Madrid – Executive Partners", description: "Madrid executive search for senior Private Bankers and RMs serving Spanish UHNW entrepreneurs and LATAM cross-border clients." },
  robots: { index: true, follow: true },
};
export const revalidate = 1800;
const orgJsonLd = { "@context": "https://schema.org", "@type": ["ProfessionalService", "LocalBusiness"], name: "Executive Partners – Private Banking Recruiter in Madrid", url: PAGE_URL, address: { "@type": "PostalAddress", streetAddress: "118 rue du Rhône", addressLocality: "Geneva", postalCode: "1204", addressCountry: "CH" }, areaServed: ["Madrid", "Spain", "Latin America"], industry: "Private Banking & Wealth Management Recruitment" };
const breadcrumbJsonLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Markets", item: `${SITE}/markets` }, { "@type": "ListItem", position: 3, name: "Private Banking Recruiter – Madrid", item: PAGE_URL }] };
export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <main className="relative min-h-screen bg-[#0B0F1A] text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(900px 360px at 15% -10%, rgba(201,161,74,.22) 0%, rgba(201,161,74,0) 55%), radial-gradient(900px 360px at 110% 0%, rgba(245,231,192,.18) 0%, rgba(245,231,192,0) 60%)" }} />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-12">
          <header className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brandGoldSoft/90">Madrid · Spain · Private Banking · Executive Search</p>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">Private Banking Recruiter in Madrid</h1>
            <p className="mt-4 text-sm text-neutral-300 md:text-[0.95rem] leading-relaxed">Executive Partners is a Switzerland-based boutique focused exclusively on <span className="font-semibold text-neutral-100">Private Banking &amp; Wealth Management</span>. In Madrid, we place Senior Relationship Managers, Team Heads and Market Leaders with a specific focus on <span className="font-semibold text-neutral-100">Spanish UHNW entrepreneur coverage, Latin American cross-border expertise, and private banking mandates between Spain and Swiss booking centres</span>.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/en/contact" className="btn btn-primary btn-xl">Discuss a mandate or move</Link>
              <Link href="/pdfs/private-banking-career-intelligence-2026.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Download Career Intelligence 2026 (PDF)</Link>
            </div>
          </header>
          <section className="mt-12 grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)]">
            <div className="space-y-4 text-sm text-neutral-200 md:text-[0.95rem] leading-relaxed">
              <h2 className="text-xl font-semibold text-white">Madrid: Spain gateway to Latin American private wealth</h2>
              <p>Madrid is Spain financial capital and the primary hub for managing Spanish UHNW wealth and Latin American cross-border flows into Europe. The city hosts Santander Private Banking, BBVA Banca Privada, CaixaBank Private Banking, and the Spanish operations of Julius Baer, UBS, Mirabaud and several EAMs serving Spanish entrepreneurs, real estate families, and Latin American UHNW clients with European nexus.</p>
              <p>CaixaBank Private Banking ended 2025 with 1,170 relationship managers, after incorporating 30 new professionals during the year, with AUM growing 14 percent in 2025. CaixaBank was named Best Private Bank in Spain for the third consecutive year at the Global Private Banking Awards by Euromoney. This is a clear signal of a market that is hiring actively and selectively, with a deliberate focus on LATAM client coverage and specialist international segments.</p>
              <p>Madrid unique positioning as the cultural and linguistic bridge between Europe and Latin America makes it a strategic market for banks building LATAM coverage out of a regulated European booking centre, with frequent cross-border interplay with Luxembourg and Switzerland platforms.</p>
              <p>Over the last 24 months, hiring demand in Madrid has concentrated on:</p>
              <ul className="list-disc space-y-1 pl-5 text-neutral-200">
                <li>Senior RMs with <span className="font-semibold">Spanish onshore UHNW and LATAM cross-border coverage</span></li>
                <li>Team Heads with EUR 200m+ in portable AUM including LATAM flows</li>
                <li>Advisors with <span className="font-semibold">Mexican, Colombian, Argentine and Brazilian client expertise</span></li>
                <li>Bankers managing Spanish real estate and entrepreneur family wealth</li>
              </ul>
              <p>Madrid hiring committees focus on CNMV compliance, Spanish tax regulations, documented LATAM portability, and cross-border booking capability between Spain and Switzerland.</p>
            </div>
            <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-base font-semibold text-white">How Executive Partners supports Madrid hiring</h3>
              <ul className="mt-4 space-y-2 text-sm text-neutral-200">
                <li>• Senior RM, Team Head &amp; Market Leader search</li>
                <li>• Spanish and LATAM AUM portability mapping</li>
                <li>• CNMV compliance and KYC documentation screening</li>
                <li>• Revenue &amp; ROA analysis by client segment</li>
                <li>• 12–24 month NNM projection and business plan support</li>
              </ul>
              <div className="mt-5"><Link href="/en/apply" className="btn btn-secondary w-full text-sm font-medium">Senior RM? Submit your profile</Link></div>
            </aside>
          </section>
          <section className="mt-14 rounded-3xl border border-white/10 bg-black/40 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.75)] backdrop-blur md:p-8">
            <h2 className="text-xl font-semibold text-white">2025–2026 Madrid compensation benchmarks</h2>
            <p className="mt-3 text-sm text-neutral-300">Spain applies progressive income tax (IRPF, top rate 47%). Figures below are gross pre-tax compensation in EUR.</p>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm text-neutral-100">
                <thead className="border-b border-white/10 text-xs uppercase tracking-wide text-neutral-400"><tr><th className="py-2 pr-4">Role</th><th className="py-2 pr-4">Base (EUR)</th><th className="py-2 pr-4">Bonus</th><th className="py-2 pr-4">Total</th></tr></thead>
                <tbody className="divide-y divide-white/5">
                  <tr><td className="py-2 pr-4">RM (5–10 years)</td><td className="py-2 pr-4">70k – 110k</td><td className="py-2 pr-4">20% – 50%</td><td className="py-2 pr-4">85k – 165k</td></tr>
                  <tr><td className="py-2 pr-4">Senior RM (10–20 years)</td><td className="py-2 pr-4">110k – 180k</td><td className="py-2 pr-4">40% – 100%</td><td className="py-2 pr-4">155k – 360k</td></tr>
                  <tr><td className="py-2 pr-4">Ultra UHNW RM</td><td className="py-2 pr-4">180k – 260k</td><td className="py-2 pr-4">80% – 180%</td><td className="py-2 pr-4">325k – 650k+</td></tr>
                  <tr><td className="py-2 pr-4">Team Head</td><td className="py-2 pr-4">220k – 320k</td><td className="py-2 pr-4">100% – 200%</td><td className="py-2 pr-4">440k – 960k+</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-neutral-500">Indicative gross figures based on observed market levels 2025–2026. Individual offers depend on platform, AUM portability and compliance history.</p>
          </section>
          <section className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-base font-semibold text-white">Insights for Madrid-based bankers</h3>
              <p className="mt-2 text-sm text-neutral-300">Market commentary on Spanish private banking, LATAM flows and talent dynamics.</p>
              <ul className="mt-4 space-y-2 text-sm text-brandGoldSoft">
                <li><Link href="/en/insights/is-your-aum-portable" className="hover:underline">Is Your AUM Actually Portable? The Six Questions Every Banker Gets Wrong</Link></li>
                <li><Link href="/en/insights/compliance-golden-handcuff" className="hover:underline">Compliance Is the New Golden Handcuff</Link></li>
                <li><Link href="/en/insights/private-banking-business-plan-switzerland" className="hover:underline">The Private Banking Business Plan: What a Hiring Committee Actually Looks For</Link></li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-base font-semibold text-white">Work with Executive Partners in Madrid</h3>
              <p className="mt-2 text-sm text-neutral-300">Whether you are a Madrid-based bank or a Senior RM considering a move, we provide confidential guidance on platforms, compensation and portability.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/en/contact" className="btn btn-primary btn-sm">Talk to us about a mandate</Link>
                <Link href="/en/apply" className="btn btn-ghost btn-sm">Submit your profile</Link>
              </div>
            </div>
          </section>
          <p className="mt-10 text-center text-sm text-neutral-400">Prefer to start with a discreet email? <a href="mailto:recruiter@execpartners.ch" className="underline decoration-brandGold/70 underline-offset-4 hover:text-white">recruiter@execpartners.ch</a></p>
        </div>
      </main>
    </>
  );
}