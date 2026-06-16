import type { Metadata } from "next";
import Link from "next/link";

const SITE = "https://www.execpartners.ch";
const PAGE_URL = `${SITE}/en/private-banker-jobs-lisbon`;

export const metadata: Metadata = {
  title: { absolute: "Private Banker Jobs in Lisbon | Senior RM Recruitment – Executive Partners" },
  description:
    "Lisbon private banking recruitment. Senior RMs covering Portuguese, Brazilian and cross-border wealth. Confidential. Compensation benchmarks included.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website", url: PAGE_URL, siteName: "Executive Partners",
    title: "Private Banker Jobs in Lisbon – Executive Partners",
    description: "Senior private banking roles in Lisbon. Portuguese, Brazilian, cross-border coverage. Confidential search.",
    images: [{ url: "/og.webp", width: 1200, height: 630, alt: "Executive Partners – Lisbon Private Banking" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Banker Jobs in Lisbon – Executive Partners",
    description: "Confidential Lisbon private banking roles. Portuguese, Brazilian, cross-border coverage. Compensation benchmarks included.",
    images: ["/og.webp"],
  },
  robots: { index: true, follow: true },
};

const orgJsonLd = {
  "@context": "https://schema.org", "@type": ["ProfessionalService", "LocalBusiness"],
  name: "Executive Partners – Private Banking Recruitment Lisbon", url: PAGE_URL, image: `${SITE}/og.webp`,
  areaServed: ["Lisbon", "Portugal", "Brazil"], industry: "Private Banking & Wealth Management Recruitment",
  sameAs: ["https://www.linkedin.com/company/executive-partners", SITE],
};
const breadcrumbJsonLd = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Markets", item: `${SITE}/en/markets` },
    { "@type": "ListItem", position: 3, name: "Private Banker Jobs – Lisbon", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <main className="relative min-h-screen bg-[#0B0F1A] text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(900px 360px at 15% -10%, rgba(201,161,74,.22) 0%, rgba(201,161,74,0) 55%), radial-gradient(900px 360px at 110% 0%, rgba(245,231,192,.18) 0%, rgba(245,231,192,0) 60%)" }} />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-12">
          <nav className="text-xs text-white/60 mb-8">
            <Link href="/en/markets" className="hover:text-[#D4AF37]">Markets</Link>
            <span className="mx-1">/</span><span>Private Banker Jobs in Lisbon</span>
          </nav>
          <header className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brandGoldSoft/90">Lisbon · Portugal · Executive Search</p>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">Private Banker Jobs in Lisbon</h1>
            <p className="mt-4 text-sm text-neutral-300 md:text-[0.95rem] leading-relaxed">
              Lisbon has grown into a meaningful booking centre for{" "}
              <span className="font-semibold text-neutral-100">Portuguese, Brazilian and broader Lusophone wealth</span>, helped by Portugal's NHR-successor tax regimes and a wave of relocating entrepreneurs. Executive Partners advises Senior RMs on confidential moves across Iberian and cross-border platforms.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/en/apply" className="btn btn-primary btn-xl">Apply confidentially</Link>
              <Link href="/en/jobs" className="btn btn-ghost">View live mandates</Link>
            </div>
          </header>
          <section className="mt-12 grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)]">
            <div className="space-y-4 text-sm text-neutral-200 md:text-[0.95rem] leading-relaxed">
              <h2 className="text-xl font-semibold text-white">Lisbon's growing role in Lusophone wealth</h2>
              <p>
                Portugal's tax reforms and Lisbon's rising profile as a relocation destination for European and Brazilian entrepreneurs have created genuine demand for bankers who can bridge Portuguese onshore coverage with Brazilian and broader Lusophone offshore relationships.
              </p>
              <p>Over the last 18 months, hiring demand has concentrated on:</p>
              <ul className="list-disc space-y-1 pl-5 text-neutral-200">
                <li>RMs with <span className="font-semibold">genuinely portable Portuguese or Brazilian books</span></li>
                <li>Portuguese-fluent bankers with cross-border compliance depth</li>
                <li>Specialists bridging Lisbon with Geneva and Zurich booking centres</li>
                <li>Entrepreneur and family-office focused advisory coverage</li>
              </ul>
            </div>
            <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-base font-semibold text-white">How Executive Partners supports Lisbon hiring</h3>
              <ul className="mt-4 space-y-2 text-sm text-neutral-200">
                <li>• Senior RM search across Iberian platforms</li>
                <li>• Portuguese / Brazilian portability mapping</li>
                <li>• Cross-border tax and compliance pre-screening</li>
                <li>• Lisbon vs. Swiss booking-centre comparison</li>
                <li>• 12–24 month NNM projection and business plan support</li>
              </ul>
              <div className="mt-5"><Link href="/en/apply" className="btn btn-secondary w-full text-sm font-medium">Senior RM? Submit your profile</Link></div>
            </aside>
          </section>
          <section className="mt-14 rounded-3xl border border-white/10 bg-black/40 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.75)] backdrop-blur md:p-8">
            <h2 className="text-xl font-semibold text-white">2025–2026 Lisbon compensation benchmarks</h2>
            <p className="mt-3 text-sm text-neutral-300 md:text-[0.95rem]">Ranges reflect typical packages observed across Lisbon-based private banks and wealth managers.</p>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm text-neutral-100">
                <thead className="border-b border-white/10 text-xs uppercase tracking-wide text-neutral-400">
                  <tr><th className="py-2 pr-4">Role</th><th className="py-2 pr-4">Base salary (EUR)</th><th className="py-2 pr-4">Bonus range</th><th className="py-2 pr-4">Typical total</th></tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr><td className="py-2 pr-4">RM (5–10 years)</td><td className="py-2 pr-4">70k – 95k</td><td className="py-2 pr-4">20% – 50%</td><td className="py-2 pr-4">85k – 145k</td></tr>
                  <tr><td className="py-2 pr-4">Senior RM (10–20 years)</td><td className="py-2 pr-4">95k – 135k</td><td className="py-2 pr-4">40% – 100%</td><td className="py-2 pr-4">135k – 270k</td></tr>
                  <tr><td className="py-2 pr-4">Ultra UHNW RM</td><td className="py-2 pr-4">135k – 170k</td><td className="py-2 pr-4">70% – 160%</td><td className="py-2 pr-4">230k – 440k</td></tr>
                  <tr><td className="py-2 pr-4">Team Head</td><td className="py-2 pr-4">150k – 200k</td><td className="py-2 pr-4">90% – 200%</td><td className="py-2 pr-4">285k – 600k</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-neutral-500">These ranges are indicative and based on observed market levels in Lisbon across 2025–2026.</p>
          </section>
          <section className="mt-12 rounded-3xl border border-[#C9A14A]/20 bg-[#C9A14A]/5 p-6 md:p-7">
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#C9A14A] mb-1">Anonymised placement</div>
            <div className="flex items-center gap-2 mb-2"><span className="text-lg">🇵🇹</span><span className="text-sm font-semibold text-white/80">Portuguese/Brazilian desk · Lisbon</span></div>
            <p className="text-sm text-white/70">Senior Relationship Manager · EUR 95M portable book · Mandate to offer: 27 days · Still at the bank, 15 months</p>
          </section>
          <section className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-base font-semibold text-white">Deep-dive insights for Lisbon-based bankers</h3>
              <p className="mt-2 text-sm text-neutral-300">Market commentary on Portuguese tax reform and Lusophone wealth flows.</p>
              <ul className="mt-4 space-y-2 text-sm text-brandGoldSoft"><li><Link href="/en/insights" className="hover:underline">Browse Private Wealth Pulse →</Link></li></ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-base font-semibold text-white">Work with Executive Partners</h3>
              <p className="mt-2 text-sm text-neutral-300">Whether you are a Lisbon platform or a Senior RM evaluating Iberian opportunities, we provide factual, confidential guidance.</p>
              <div className="mt-4 flex flex-wrap gap-3"><Link href="/en/hiring-managers" className="btn btn-primary btn-sm">Brief a mandate</Link><Link href="/en/apply" className="btn btn-ghost btn-sm">Submit your profile</Link></div>
            </div>
          </section>
          <p className="mt-10 text-center text-sm text-neutral-400">Prefer to start with a discreet email?{" "}<a href="mailto:recruiter@execpartners.ch" className="underline decoration-brandGold/70 underline-offset-4 hover:text-white">recruiter@execpartners.ch</a></p>
        </div>
      </main>
    </>
  );
}
