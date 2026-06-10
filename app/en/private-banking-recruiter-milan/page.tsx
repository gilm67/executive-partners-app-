import type { Metadata } from "next";
import Link from "next/link";
const SITE = "https://www.execpartners.ch";
const PAGE_URL = `${SITE}/en/private-banking-recruiter-milan`;
export const metadata: Metadata = {
  title: { absolute: "Private Banking Recruiter Milan | Senior RMs & Team Heads – Executive Partners" },
  description: "Milan specialist executive search for private banking. Senior RMs, Team Heads and UHNW bankers placed across Milan and Italian wealth hubs. Confidential. Senior-level only.",
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "website", url: PAGE_URL, siteName: "Executive Partners", title: "Private Banking Recruiter in Milan – Executive Partners", description: "Milan executive search for senior Private Bankers and RMs serving Italian UHNW entrepreneurs." },
  robots: { index: true, follow: true },
};
export const revalidate = 1800;
const orgJsonLd = { "@context": "https://schema.org", "@type": ["ProfessionalService", "LocalBusiness"], name: "Executive Partners – Private Banking Recruiter in Milan", url: PAGE_URL, address: { "@type": "PostalAddress", streetAddress: "118 rue du Rhône", addressLocality: "Geneva", postalCode: "1204", addressCountry: "CH" }, areaServed: ["Milan", "Italy", "Europe"], industry: "Private Banking & Wealth Management Recruitment" };
export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <main className="relative min-h-screen bg-[#0B0F1A] text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(900px 360px at 15% -10%, rgba(201,161,74,.22) 0%, rgba(201,161,74,0) 55%)" }} />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-12">
          <header className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brandGoldSoft/90">Milan · Italy · Private Banking · Executive Search</p>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">Private Banking Recruiter in Milan</h1>
            <p className="mt-4 text-sm text-neutral-300 leading-relaxed">Executive Partners is a Switzerland-based boutique focused exclusively on <span className="font-semibold text-neutral-100">Private Banking &amp; Wealth Management</span>. In Milan, we place Senior RMs, Team Heads and Market Leaders with a focus on <span className="font-semibold text-neutral-100">Italian UHNW entrepreneur wealth and cross-border expertise between Italy and Swiss booking centres</span>.</p>
            <div className="mt-6 flex flex-wrap gap-3"><Link href="/contact" className="btn btn-primary btn-xl">Discuss a mandate or move</Link></div>
          </header>
          <section className="mt-12 grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)]">
            <div className="space-y-4 text-sm text-neutral-200 leading-relaxed">
              <h2 className="text-xl font-semibold text-white">Milan: Italy primary private banking hub</h2>
              <p>Milan hosts Mediobanca Private Banking, Fideuram, BNL BNP Paribas Private Banking, and the Italian operations of Julius Baer, UBS, and Credit Agricole.</p>
              <ul className="list-disc space-y-1 pl-5"><li>Senior RMs with <span className="font-semibold">Italian entrepreneur and industrial family coverage</span></li><li>Team Heads with EUR 200m+ portable AUM</li><li>Cross-border specialists between Italy and Geneva/Zurich</li></ul>
            </div>
            <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-base font-semibold text-white">How Executive Partners supports Milan hiring</h3>
              <ul className="mt-4 space-y-2 text-sm text-neutral-200"><li>• Senior RM, Team Head &amp; Market Leader search</li><li>• Italian AUM portability mapping</li><li>• Consob/Banca d'Italia compliance screening</li><li>• 12–24 month NNM projection and business plan support</li></ul>
              <div className="mt-5"><Link href="/apply" className="btn btn-secondary w-full text-sm font-medium">Senior RM? Submit your profile</Link></div>
            </aside>
          </section>
          <section className="mt-14 rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur md:p-8">
            <h2 className="text-xl font-semibold text-white">2025–2026 Milan compensation benchmarks</h2>
            <div className="mt-6 overflow-x-auto"><table className="min-w-full text-left text-sm text-neutral-100"><thead className="border-b border-white/10 text-xs uppercase tracking-wide text-neutral-400"><tr><th className="py-2 pr-4">Role</th><th className="py-2 pr-4">Base (EUR)</th><th className="py-2 pr-4">Bonus</th><th className="py-2 pr-4">Total</th></tr></thead><tbody className="divide-y divide-white/5"><tr><td className="py-2 pr-4">RM (5–10 years)</td><td className="py-2 pr-4">80k – 120k</td><td className="py-2 pr-4">20% – 50%</td><td className="py-2 pr-4">100k – 180k</td></tr><tr><td className="py-2 pr-4">Senior RM (10–20 years)</td><td className="py-2 pr-4">120k – 200k</td><td className="py-2 pr-4">40% – 100%</td><td className="py-2 pr-4">170k – 400k</td></tr><tr><td className="py-2 pr-4">Ultra UHNW RM</td><td className="py-2 pr-4">200k – 280k</td><td className="py-2 pr-4">80% – 180%</td><td className="py-2 pr-4">360k – 700k+</td></tr><tr><td className="py-2 pr-4">Team Head</td><td className="py-2 pr-4">250k – 350k</td><td className="py-2 pr-4">100% – 200%</td><td className="py-2 pr-4">500k – 1.0m+</td></tr></tbody></table></div>
            <p className="mt-4 text-xs text-neutral-500">Indicative gross figures. Italy applies IRPEF (top rate 43%).</p>
          </section>
          <section className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"><h3 className="text-base font-semibold text-white">Insights for Milan-based bankers</h3><ul className="mt-4 space-y-2 text-sm text-brandGoldSoft"><li><Link href="/en/insights/is-your-aum-portable" className="hover:underline">Is Your AUM Actually Portable?</Link></li><li><Link href="/en/insights/compliance-golden-handcuff" className="hover:underline">Compliance Is the New Golden Handcuff</Link></li></ul></div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"><h3 className="text-base font-semibold text-white">Work with Executive Partners in Milan</h3><div className="mt-4 flex flex-wrap gap-3"><Link href="/contact" className="btn btn-primary btn-sm">Talk to us about a mandate</Link><Link href="/apply" className="btn btn-ghost btn-sm">Submit your profile</Link></div></div>
          </section>
          <p className="mt-10 text-center text-sm text-neutral-400">Prefer to start with a discreet email? <a href="mailto:info@execpartners.ch" className="underline decoration-brandGold/70 underline-offset-4 hover:text-white">info@execpartners.ch</a></p>
        </div>
      </main>
    </>
  );
}