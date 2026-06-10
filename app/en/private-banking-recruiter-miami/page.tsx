import type { Metadata } from "next";
import Link from "next/link";
const SITE = "https://www.execpartners.ch";
const PAGE_URL = `${SITE}/en/private-banking-recruiter-miami`;
export const metadata: Metadata = {
  title: { absolute: "Private Banking Recruiter Miami | Senior RMs & Team Heads – Executive Partners" },
  description: "Miami specialist executive search for private banking. Senior RMs, Team Heads and UHNW bankers placed across Miami and US wealth hubs. LATAM cross-border expertise. Confidential. Senior-level only.",
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "website", url: PAGE_URL, siteName: "Executive Partners", title: "Private Banking Recruiter in Miami – Executive Partners", description: "Miami executive search for senior Private Bankers and RMs serving LATAM UHNW clients and US onshore wealth." },
  robots: { index: true, follow: true },
};
export const revalidate = 1800;
const orgJsonLd = { "@context": "https://schema.org", "@type": ["ProfessionalService", "LocalBusiness"], name: "Executive Partners – Private Banking Recruiter in Miami", url: PAGE_URL, address: { "@type": "PostalAddress", streetAddress: "118 rue du Rhône", addressLocality: "Geneva", postalCode: "1204", addressCountry: "CH" }, areaServed: ["Miami", "United States", "Latin America"], industry: "Private Banking & Wealth Management Recruitment" };
export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <main className="relative min-h-screen bg-[#0B0F1A] text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(900px 360px at 15% -10%, rgba(201,161,74,.22) 0%, rgba(201,161,74,0) 55%)" }} />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-12">
          <header className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brandGoldSoft/90">Miami · United States · Private Banking · Executive Search</p>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">Private Banking Recruiter in Miami</h1>
            <p className="mt-4 text-sm text-neutral-300 leading-relaxed">Executive Partners is a Switzerland-based boutique focused exclusively on <span className="font-semibold text-neutral-100">Private Banking &amp; Wealth Management</span>. In Miami, we place Senior RMs, Team Heads and Market Leaders with a focus on <span className="font-semibold text-neutral-100">Latin American UHNW cross-border coverage, US onshore wealth, and SEC/FINRA-compliant portability</span>.</p>
            <div className="mt-6 flex flex-wrap gap-3"><Link href="/contact" className="btn btn-primary btn-xl">Discuss a mandate or move</Link></div>
          </header>
          <section className="mt-12 grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)]">
            <div className="space-y-4 text-sm text-neutral-200 leading-relaxed">
              <h2 className="text-xl font-semibold text-white">Miami: the capital of Latin American private banking in the US</h2>
              <p>Miami is the primary US booking centre for Latin American UHNW wealth, hosting the LATAM private banking desks of HSBC, Santander Private Banking, BTG Pactual, Itau Private Bank, and dozens of boutique platforms serving Brazilian, Colombian, Mexican, Argentine and Venezuelan UHNW families.</p>
              <p>Miami unique positioning combines US regulatory sophistication with deep Spanish and Portuguese-language client coverage, making it the most internationally diverse private banking market in North America.</p>
              <ul className="list-disc space-y-1 pl-5"><li>Senior RMs with <span className="font-semibold">LATAM UHNW cross-border coverage and Spanish/Portuguese fluency</span></li><li>Team Heads with USD 300m+ portable AUM from Brazil, Colombia, Mexico</li><li>Advisors with SEC/FINRA compliance and international tax structuring expertise</li><li>Bankers bridging LATAM flows between Miami and Geneva booking centres</li></ul>
            </div>
            <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-base font-semibold text-white">How Executive Partners supports Miami hiring</h3>
              <ul className="mt-4 space-y-2 text-sm text-neutral-200"><li>• Senior RM, Team Head &amp; Market Leader search</li><li>• LATAM AUM portability and booking-centre mapping</li><li>• SEC/FINRA compliance and KYC screening</li><li>• Revenue &amp; ROA analysis by client segment</li><li>• 12–24 month NNM projection and business plan support</li></ul>
              <div className="mt-5"><Link href="/apply" className="btn btn-secondary w-full text-sm font-medium">Senior RM? Submit your profile</Link></div>
            </aside>
          </section>
          <section className="mt-14 rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur md:p-8">
            <h2 className="text-xl font-semibold text-white">2025–2026 Miami compensation benchmarks</h2>
            <p className="mt-3 text-sm text-neutral-300">Gross pre-tax figures in USD. Florida has no state income tax, making Miami particularly competitive versus New York.</p>
            <div className="mt-6 overflow-x-auto"><table className="min-w-full text-left text-sm text-neutral-100"><thead className="border-b border-white/10 text-xs uppercase tracking-wide text-neutral-400"><tr><th className="py-2 pr-4">Role</th><th className="py-2 pr-4">Base (USD)</th><th className="py-2 pr-4">Bonus</th><th className="py-2 pr-4">Total</th></tr></thead><tbody className="divide-y divide-white/5"><tr><td className="py-2 pr-4">RM (5–10 years)</td><td className="py-2 pr-4">110k – 160k</td><td className="py-2 pr-4">20% – 60%</td><td className="py-2 pr-4">132k – 256k</td></tr><tr><td className="py-2 pr-4">Senior RM (10–20 years)</td><td className="py-2 pr-4">160k – 270k</td><td className="py-2 pr-4">40% – 150%</td><td className="py-2 pr-4">224k – 675k</td></tr><tr><td className="py-2 pr-4">Ultra UHNW RM</td><td className="py-2 pr-4">270k – 450k</td><td className="py-2 pr-4">100% – 300%</td><td className="py-2 pr-4">540k – 1.8m+</td></tr><tr><td className="py-2 pr-4">Team Head</td><td className="py-2 pr-4">320k – 500k</td><td className="py-2 pr-4">100% – 250%</td><td className="py-2 pr-4">640k – 1.75m+</td></tr></tbody></table></div>
            <p className="mt-4 text-xs text-neutral-500">Indicative gross figures. No Florida state income tax. Federal tax applies.</p>
          </section>
          <section className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"><h3 className="text-base font-semibold text-white">Insights for Miami-based bankers</h3><ul className="mt-4 space-y-2 text-sm text-brandGoldSoft"><li><Link href="/en/insights/is-your-aum-portable" className="hover:underline">Is Your AUM Actually Portable?</Link></li><li><Link href="/en/insights/compliance-golden-handcuff" className="hover:underline">Compliance Is the New Golden Handcuff</Link></li></ul></div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"><h3 className="text-base font-semibold text-white">Work with Executive Partners in Miami</h3><div className="mt-4 flex flex-wrap gap-3"><Link href="/contact" className="btn btn-primary btn-sm">Talk to us about a mandate</Link><Link href="/apply" className="btn btn-ghost btn-sm">Submit your profile</Link></div></div>
          </section>
          <p className="mt-10 text-center text-sm text-neutral-400">Prefer to start with a discreet email? <a href="mailto:info@execpartners.ch" className="underline decoration-brandGold/70 underline-offset-4 hover:text-white">info@execpartners.ch</a></p>
        </div>
      </main>
    </>
  );
}