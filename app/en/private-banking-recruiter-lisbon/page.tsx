import type { Metadata } from "next";
import Link from "next/link";
const SITE = "https://www.execpartners.ch";
const PAGE_URL = `${SITE}/en/private-banking-recruiter-lisbon`;
export const metadata: Metadata = {
  title: { absolute: "Private Banking Recruiter Lisbon | Senior RMs & Team Heads – Executive Partners" },
  description: "Lisbon specialist executive search for private banking. Senior RMs, Team Heads and UHNW bankers placed across Lisbon and Portuguese wealth hubs. Confidential. Senior-level only.",
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "website", url: PAGE_URL, siteName: "Executive Partners", title: "Private Banking Recruiter in Lisbon – Executive Partners", description: "Lisbon executive search for senior Private Bankers and RMs serving Portuguese UHNW families and internationally mobile wealth." },
  robots: { index: true, follow: true },
};
export const revalidate = 1800;
const orgJsonLd = { "@context": "https://schema.org", "@type": ["ProfessionalService", "LocalBusiness"], name: "Executive Partners – Private Banking Recruiter in Lisbon", url: PAGE_URL, address: { "@type": "PostalAddress", streetAddress: "118 rue du Rhône", addressLocality: "Geneva", postalCode: "1204", addressCountry: "CH" }, areaServed: ["Lisbon", "Portugal", "Europe", "Latin America"], industry: "Private Banking & Wealth Management Recruitment" };
export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <main className="relative min-h-screen bg-[#0B0F1A] text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(900px 360px at 15% -10%, rgba(201,161,74,.22) 0%, rgba(201,161,74,0) 55%)" }} />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-12">
          <header className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brandGoldSoft/90">Lisbon · Portugal · Private Banking · Executive Search</p>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">Private Banking Recruiter in Lisbon</h1>
            <p className="mt-4 text-sm text-neutral-300 leading-relaxed">Executive Partners is a Switzerland-based boutique focused exclusively on <span className="font-semibold text-neutral-100">Private Banking &amp; Wealth Management</span>. In Lisbon, we place Senior RMs, Team Heads and Market Leaders with a focus on <span className="font-semibold text-neutral-100">Portuguese UHNW family wealth, Brazilian cross-border expertise, and internationally mobile wealth attracted by Portugal NHR tax regime</span>.</p>
            <div className="mt-6 flex flex-wrap gap-3"><Link href="/contact" className="btn btn-primary btn-xl">Discuss a mandate or move</Link></div>
          </header>
          <section className="mt-12 grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)]">
            <div className="space-y-4 text-sm text-neutral-200 leading-relaxed">
              <h2 className="text-xl font-semibold text-white">Lisbon: Portugal emerging private banking hub</h2>
              <p>Lisbon hosts Millennium BCP Private Banking, Novobanco Private, and Portuguese operations of BNP Paribas and Santander, serving Portuguese UHNW wealth and Brazilian cross-border flows.</p>
              <ul className="list-disc space-y-1 pl-5"><li>Senior RMs with <span className="font-semibold">Portuguese UHNW and Brazilian cross-border coverage</span></li><li>Advisors with NHR tax planning and international relocation expertise</li><li>Team Heads with EUR 150m+ portable AUM</li></ul>
            </div>
            <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-base font-semibold text-white">How Executive Partners supports Lisbon hiring</h3>
              <ul className="mt-4 space-y-2 text-sm text-neutral-200"><li>• Senior RM, Team Head &amp; Market Leader search</li><li>• Portuguese and Brazilian AUM portability mapping</li><li>• Banco de Portugal compliance screening</li><li>• 12–24 month NNM projection and business plan support</li></ul>
              <div className="mt-5"><Link href="/apply" className="btn btn-secondary w-full text-sm font-medium">Senior RM? Submit your profile</Link></div>
            </aside>
          </section>
          <section className="mt-14 rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur md:p-8">
            <h2 className="text-xl font-semibold text-white">2025–2026 Lisbon compensation benchmarks</h2>
            <div className="mt-6 overflow-x-auto"><table className="min-w-full text-left text-sm text-neutral-100"><thead className="border-b border-white/10 text-xs uppercase tracking-wide text-neutral-400"><tr><th className="py-2 pr-4">Role</th><th className="py-2 pr-4">Base (EUR)</th><th className="py-2 pr-4">Bonus</th><th className="py-2 pr-4">Total</th></tr></thead><tbody className="divide-y divide-white/5"><tr><td className="py-2 pr-4">RM (5–10 years)</td><td className="py-2 pr-4">60k – 90k</td><td className="py-2 pr-4">20% – 40%</td><td className="py-2 pr-4">72k – 126k</td></tr><tr><td className="py-2 pr-4">Senior RM (10–20 years)</td><td className="py-2 pr-4">90k – 150k</td><td className="py-2 pr-4">40% – 80%</td><td className="py-2 pr-4">126k – 270k</td></tr><tr><td className="py-2 pr-4">Ultra UHNW RM</td><td className="py-2 pr-4">150k – 220k</td><td className="py-2 pr-4">80% – 150%</td><td className="py-2 pr-4">270k – 550k+</td></tr><tr><td className="py-2 pr-4">Team Head</td><td className="py-2 pr-4">200k – 280k</td><td className="py-2 pr-4">100% – 180%</td><td className="py-2 pr-4">400k – 784k+</td></tr></tbody></table></div>
            <p className="mt-4 text-xs text-neutral-500">Indicative gross figures. Portugal applies IRS (top rate 48%).</p>
          </section>
          <section className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"><h3 className="text-base font-semibold text-white">Insights for Lisbon-based bankers</h3><ul className="mt-4 space-y-2 text-sm text-brandGoldSoft"><li><Link href="/en/insights/is-your-aum-portable" className="hover:underline">Is Your AUM Actually Portable?</Link></li><li><Link href="/en/insights/compliance-golden-handcuff" className="hover:underline">Compliance Is the New Golden Handcuff</Link></li></ul></div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"><h3 className="text-base font-semibold text-white">Work with Executive Partners in Lisbon</h3><div className="mt-4 flex flex-wrap gap-3"><Link href="/contact" className="btn btn-primary btn-sm">Talk to us about a mandate</Link><Link href="/apply" className="btn btn-ghost btn-sm">Submit your profile</Link></div></div>
          </section>
          <p className="mt-10 text-center text-sm text-neutral-400">Prefer to start with a discreet email? <a href="mailto:info@execpartners.ch" className="underline decoration-brandGold/70 underline-offset-4 hover:text-white">info@execpartners.ch</a></p>
        </div>
      </main>
    </>
  );
}