import type { Metadata } from "next";
import Link from "next/link";
const SITE = "https://www.execpartners.ch";
const PAGE_URL = `${SITE}/en/private-banking-recruiter-milan`;
export const metadata: Metadata = {
  title: { absolute: "Private Banking Recruiter Milan | Senior RMs & Team Heads – Executive Partners" },
  description: "Milan specialist executive search for private banking. Senior RMs, Team Heads and UHNW bankers placed across Milan and Italian wealth hubs. Confidential. Senior-level only.",
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "website", url: PAGE_URL, siteName: "Executive Partners", title: "Private Banking Recruiter in Milan – Executive Partners", description: "Milan executive search for senior Private Bankers and RMs serving Italian UHNW entrepreneurs and family offices." },
  robots: { index: true, follow: true },
};
export const revalidate = 1800;
const orgJsonLd = { "@context": "https://schema.org", "@type": ["ProfessionalService", "LocalBusiness"], name: "Executive Partners – Private Banking Recruiter in Milan", url: PAGE_URL, address: { "@type": "PostalAddress", streetAddress: "118 rue du Rhône", addressLocality: "Geneva", postalCode: "1204", addressCountry: "CH" }, areaServed: ["Milan", "Italy", "Europe"], industry: "Private Banking & Wealth Management Recruitment" };
const breadcrumbJsonLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Markets", item: `${SITE}/markets` }, { "@type": "ListItem", position: 3, name: "Private Banking Recruiter – Milan", item: PAGE_URL }] };
export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <main className="relative min-h-screen bg-[#0B0F1A] text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(900px 360px at 15% -10%, rgba(201,161,74,.22) 0%, rgba(201,161,74,0) 55%), radial-gradient(900px 360px at 110% 0%, rgba(245,231,192,.18) 0%, rgba(245,231,192,0) 60%)" }} />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-12">
          <header className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brandGoldSoft/90">Milan · Italy · Private Banking · Executive Search</p>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">Private Banking Recruiter in Milan</h1>
            <p className="mt-4 text-sm text-neutral-300 md:text-[0.95rem] leading-relaxed">Executive Partners is a Switzerland-based boutique focused exclusively on <span className="font-semibold text-neutral-100">Private Banking &amp; Wealth Management</span>. In Milan, we place Senior Relationship Managers, Team Heads and Market Leaders with a specific focus on <span className="font-semibold text-neutral-100">Italian UHNW entrepreneur wealth, family office coverage, and cross-border expertise between Italy and Swiss booking centres</span>.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/en/contact" className="btn btn-primary btn-xl">Discuss a mandate or move</Link>
              <Link href="/pdfs/private-banking-career-intelligence-2026.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Download Career Intelligence 2026 (PDF)</Link>
            </div>
          </header>
          <section className="mt-12 grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)]">
            <div className="space-y-4 text-sm text-neutral-200 md:text-[0.95rem] leading-relaxed">
              <h2 className="text-xl font-semibold text-white">Milan: Italy primary private banking and wealth management hub</h2>
              <p>Milan is the financial capital of Italy and the primary booking centre for Italian UHNW and HNW wealth. Italian private banking assets under management are projected to exceed EUR 1.4 trillion in 2026, with annual growth of approximately six percent, well above the national average. The sector is driven by a structural expansion in sophisticated investment solutions for UHNW and HNWI families, particularly in alternatives, cross-border structuring, and succession planning.</p>
              <p>The city hosts Mediobanca Private Banking, Fideuram, BNL BNP Paribas Private Banking, and the Italian operations of Julius Baer, UBS, Credit Agricole and Pictet, alongside a growing ecosystem of EAMs and multi-family offices serving Italian entrepreneurs, industrial families, and internationally mobile UHNW clients.</p>
              <p>Milan is Italy financial capital commanding the highest average banking salaries in the country at approximately EUR 80,000, with a stock market that surged over 20 percent year-over-year into early 2026. Senior professionals in private banking rarely appear on job boards, making retained search the dominant model for senior hires.</p>
              <p>Over the last 24 months, hiring demand in Milan has concentrated on:</p>
              <ul className="list-disc space-y-1 pl-5 text-neutral-200">
                <li>Senior RMs with <span className="font-semibold">Italian entrepreneur and industrial family coverage</span></li>
                <li>Team Heads with EUR 200m+ in portable, compliantly documented AUM</li>
                <li>Cross-border specialists managing Italian clients booked in <span className="font-semibold">Geneva or Zurich</span></li>
                <li>Advisors with structured products, Lombard lending, and alternatives expertise for Italian UHNW profiles</li>
              </ul>
              <p>Milan hiring committees focus on Consob and Banca d'Italia compliance, documented client portability, and cross-border booking capability between Italy and Switzerland.</p>
            </div>
            <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-base font-semibold text-white">How Executive Partners supports Milan hiring</h3>
              <ul className="mt-4 space-y-2 text-sm text-neutral-200">
                <li>• Senior RM, Team Head &amp; Market Leader search</li>
                <li>• Italian AUM portability and booking-centre mapping</li>
                <li>• Consob/Banca d'Italia compliance screening</li>
                <li>• Revenue &amp; ROA analysis by client segment</li>
                <li>• 12–24 month NNM projection and business plan support</li>
              </ul>
              <div className="mt-5"><Link href="/en/apply" className="btn btn-secondary w-full text-sm font-medium">Senior RM? Submit your profile</Link></div>
            </aside>
          </section>
          <section className="mt-14 rounded-3xl border border-white/10 bg-black/40 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.75)] backdrop-blur md:p-8">
            <h2 className="text-xl font-semibold text-white">2025–2026 Milan compensation benchmarks</h2>
            <p className="mt-3 text-sm text-neutral-300">Italy applies progressive income tax (IRPEF, top rate 43%). Figures below are gross pre-tax compensation in EUR.</p>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm text-neutral-100">
                <thead className="border-b border-white/10 text-xs uppercase tracking-wide text-neutral-400"><tr><th className="py-2 pr-4">Role</th><th className="py-2 pr-4">Base (EUR)</th><th className="py-2 pr-4">Bonus</th><th className="py-2 pr-4">Total</th></tr></thead>
                <tbody className="divide-y divide-white/5">
                  <tr><td className="py-2 pr-4">RM (5–10 years)</td><td className="py-2 pr-4">80k – 120k</td><td className="py-2 pr-4">20% – 50%</td><td className="py-2 pr-4">100k – 180k</td></tr>
                  <tr><td className="py-2 pr-4">Senior RM (10–20 years)</td><td className="py-2 pr-4">120k – 200k</td><td className="py-2 pr-4">40% – 100%</td><td className="py-2 pr-4">170k – 400k</td></tr>
                  <tr><td className="py-2 pr-4">Ultra UHNW RM</td><td className="py-2 pr-4">200k – 280k</td><td className="py-2 pr-4">80% – 180%</td><td className="py-2 pr-4">360k – 700k+</td></tr>
                  <tr><td className="py-2 pr-4">Team Head</td><td className="py-2 pr-4">250k – 350k</td><td className="py-2 pr-4">100% – 200%</td><td className="py-2 pr-4">500k – 1.0m+</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-neutral-500">Indicative gross figures based on observed market levels 2025–2026. Individual offers depend on platform, AUM portability and compliance history.</p>
          </section>
          <section className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-base font-semibold text-white">Insights for Milan-based bankers</h3>
              <p className="mt-2 text-sm text-neutral-300">Market commentary on Italian private banking, cross-border flows and talent dynamics.</p>
              <ul className="mt-4 space-y-2 text-sm text-brandGoldSoft">
                <li><Link href="/en/insights/is-your-aum-portable" className="hover:underline">Is Your AUM Actually Portable? The Six Questions Every Banker Gets Wrong</Link></li>
                <li><Link href="/en/insights/compliance-golden-handcuff" className="hover:underline">Compliance Is the New Golden Handcuff</Link></li>
                <li><Link href="/en/insights/private-banking-business-plan-switzerland" className="hover:underline">The Private Banking Business Plan: What a Hiring Committee Actually Looks For</Link></li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-base font-semibold text-white">Work with Executive Partners in Milan</h3>
              <p className="mt-2 text-sm text-neutral-300">Whether you are a Milan-based bank or a Senior RM considering a move, we provide confidential guidance on platforms, compensation and portability.</p>
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