import type { Metadata } from "next";
import Link from "next/link";
const SITE = "https://www.execpartners.ch";
const PAGE_URL = `${SITE}/en/private-banking-recruiter-paris`;
export const metadata: Metadata = {
  title: { absolute: "Private Banking Recruiter Paris | Senior RMs & Frontalier Bankers – Executive Partners" },
  description: "Paris specialist executive search for private banking. Senior RMs, Team Heads and frontalier bankers placed across Paris and French wealth hubs. Confidential. Senior-level only.",
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "website", url: PAGE_URL, siteName: "Executive Partners", title: "Private Banking Recruiter in Paris – Executive Partners", description: "Paris executive search for senior Private Bankers and RMs serving French UHNW entrepreneurs, family offices and frontalier clients booked in Switzerland." },
  robots: { index: true, follow: true },
};
export const revalidate = 1800;
const orgJsonLd = { "@context": "https://schema.org", "@type": ["ProfessionalService", "LocalBusiness"], name: "Executive Partners – Private Banking Recruiter in Paris", url: PAGE_URL, address: { "@type": "PostalAddress", streetAddress: "118 rue du Rhône", addressLocality: "Geneva", postalCode: "1204", addressCountry: "CH" }, areaServed: ["Paris", "France", "Europe"], industry: "Private Banking & Wealth Management Recruitment" };
const breadcrumbJsonLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Markets", item: `${SITE}/markets` }, { "@type": "ListItem", position: 3, name: "Private Banking Recruiter – Paris", item: PAGE_URL }] };
export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <main className="relative min-h-screen bg-[#0B0F1A] text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(900px 360px at 15% -10%, rgba(201,161,74,.22) 0%, rgba(201,161,74,0) 55%), radial-gradient(900px 360px at 110% 0%, rgba(245,231,192,.18) 0%, rgba(245,231,192,0) 60%)" }} />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-12">
          <header className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brandGoldSoft/90">Paris · France · Private Banking · Executive Search</p>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">Private Banking Recruiter in Paris</h1>
            <p className="mt-4 text-sm text-neutral-300 md:text-[0.95rem] leading-relaxed">Executive Partners is a Switzerland-based boutique focused exclusively on <span className="font-semibold text-neutral-100">Private Banking &amp; Wealth Management</span>. In Paris, we place Senior Relationship Managers, Team Heads and Market Leaders with a specific focus on <span className="font-semibold text-neutral-100">French UHNW entrepreneur and family wealth, frontalier coverage between France and Swiss booking centres, and cross-border portability between the two largest French-language financial markets in the world</span>.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary btn-xl">Discuss a mandate or move</Link>
              <Link href="/pdfs/private-banking-career-intelligence-2026.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Download Career Intelligence 2026 (PDF)</Link>
            </div>
          </header>
          <section className="mt-12 grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)]">
            <div className="space-y-4 text-sm text-neutral-200 md:text-[0.95rem] leading-relaxed">
              <h2 className="text-xl font-semibold text-white">Paris: France primary private banking market and Geneva frontalier corridor</h2>
              <p>Paris is France largest and most concentrated private banking market, hosting BNP Paribas Wealth Management, the largest private bank in the Eurozone, alongside Société Générale Private Banking, which manages EUR 135 billion in assets under management as of September 2025, and Crédit Agricole Banque Privée. The French operations of Swiss platforms including Pictet, Lombard Odier, and Julius Baer are also established in Paris, creating a competitive market that combines domestic French institutions with international booking capabilities.</p>
              <p>The Paris-Geneva corridor is one of the most active frontalier banking markets in Europe. Senior RMs who manage French UHNW clients booked in Switzerland operate across two regulatory frameworks, AMF on the French side and FINMA on the Swiss side, and require deep knowledge of French cross-border compliance requirements, which have tightened materially since 2022 following FINMA enforcement actions on undeclared French assets.</p>
              <p>The departure of Société Générale from Swiss private banking, after selling Société Générale Private Banking Suisse to Union Bancaire Privée in 2024, has created a specific displacement dynamic: French clients previously booked in Geneva through SG are now being actively courted by remaining platforms. Senior RMs who managed these relationships are in demand.</p>
              <p>Over the last 24 months, hiring demand in Paris has concentrated on:</p>
              <ul className="list-disc space-y-1 pl-5 text-neutral-200">
                <li>Senior RMs with <span className="font-semibold">French UHNW entrepreneur and family office coverage</span></li>
                <li>Frontalier specialists managing French clients booked in <span className="font-semibold">Geneva or Zurich</span></li>
                <li>Team Heads with EUR 200m+ portable AUM including cross-border documented relationships</li>
                <li>Advisors with AMF compliance and French tax structuring expertise, particularly IFI and succession planning</li>
              </ul>
              <p>Paris hiring committees focus on AMF certification, French cross-border compliance documentation, IFI planning expertise, and the ability to navigate both French and Swiss regulatory frameworks.</p>
            </div>
            <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-base font-semibold text-white">How Executive Partners supports Paris hiring</h3>
              <ul className="mt-4 space-y-2 text-sm text-neutral-200">
                <li>• Senior RM, Team Head &amp; Market Leader search</li>
                <li>• French AUM portability and frontalier mapping</li>
                <li>• AMF compliance and cross-border KYC screening</li>
                <li>• Revenue &amp; ROA analysis by client segment</li>
                <li>• 12–24 month NNM projection and business plan support</li>
              </ul>
              <div className="mt-5"><Link href="/apply" className="btn btn-secondary w-full text-sm font-medium">Senior RM? Submit your profile</Link></div>
            </aside>
          </section>
          <section className="mt-14 rounded-3xl border border-white/10 bg-black/40 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.75)] backdrop-blur md:p-8">
            <h2 className="text-xl font-semibold text-white">2025–2026 Paris compensation benchmarks</h2>
            <p className="mt-3 text-sm text-neutral-300">France applies progressive income tax (top rate 45%) plus social charges. Effective rates at senior levels can exceed 55% of gross compensation.</p>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm text-neutral-100">
                <thead className="border-b border-white/10 text-xs uppercase tracking-wide text-neutral-400"><tr><th className="py-2 pr-4">Role</th><th className="py-2 pr-4">Base (EUR)</th><th className="py-2 pr-4">Bonus</th><th className="py-2 pr-4">Total</th></tr></thead>
                <tbody className="divide-y divide-white/5">
                  <tr><td className="py-2 pr-4">RM (5–10 years)</td><td className="py-2 pr-4">75k – 115k</td><td className="py-2 pr-4">20% – 50%</td><td className="py-2 pr-4">90k – 173k</td></tr>
                  <tr><td className="py-2 pr-4">Senior RM (10–20 years)</td><td className="py-2 pr-4">115k – 190k</td><td className="py-2 pr-4">40% – 100%</td><td className="py-2 pr-4">161k – 380k</td></tr>
                  <tr><td className="py-2 pr-4">Ultra UHNW RM</td><td className="py-2 pr-4">190k – 270k</td><td className="py-2 pr-4">80% – 180%</td><td className="py-2 pr-4">342k – 756k+</td></tr>
                  <tr><td className="py-2 pr-4">Team Head</td><td className="py-2 pr-4">240k – 340k</td><td className="py-2 pr-4">100% – 200%</td><td className="py-2 pr-4">480k – 1.0m+</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-neutral-500">Indicative gross figures based on observed market levels 2025–2026. France applies income tax (top rate 45%) plus social charges. Individual offers depend on platform, portability and compliance history.</p>
          </section>
          <section className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-base font-semibold text-white">Insights for Paris-based bankers</h3>
              <p className="mt-2 text-sm text-neutral-300">Market commentary on French private banking, frontalier dynamics and cross-border compliance.</p>
              <ul className="mt-4 space-y-2 text-sm text-brandGoldSoft">
                <li><Link href="/en/insights/is-your-aum-portable" className="hover:underline">Is Your AUM Actually Portable? The Six Questions Every Banker Gets Wrong</Link></li>
                <li><Link href="/en/insights/compliance-golden-handcuff" className="hover:underline">Compliance Is the New Golden Handcuff</Link></li>
                <li><Link href="/en/insights/the-platform-illusion" className="hover:underline">The Platform Illusion: Why the Pitch That Wins Mandates Never Transfers AUM</Link></li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-base font-semibold text-white">Work with Executive Partners in Paris</h3>
              <p className="mt-2 text-sm text-neutral-300">Whether you are a Paris-based bank or a Senior RM considering a move, we provide confidential guidance on platforms, compensation and portability.</p>
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