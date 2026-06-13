import type { Metadata } from "next";
import Link from "next/link";

const SITE = "https://www.execpartners.ch";
const PAGE_URL = `${SITE}/en/private-banking-recruiter-riyadh`;

export const metadata: Metadata = {
  title: { absolute: "Private Banking Recruiter Riyadh | Senior RMs & Saudi Onshore Coverage – Executive Partners" },
  description: "Riyadh specialist executive search for private banking. Executive Partners places Senior RMs, Team Heads and Saudi onshore coverage bankers under Vision 2030. Saudization guidance, SAMA/CMA licensing and live mandates.",
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "website", url: PAGE_URL, siteName: "Executive Partners", title: "Private Banking Recruiter in Riyadh – Executive Partners", description: "Saudi Arabia executive search boutique focused on senior Private Bankers, RMs and Team Heads covering onshore UHNW, family offices and Vision 2030-linked wealth." },
  twitter: { card: "summary_large_image", title: "Private Banking Recruiter in Riyadh – Executive Partners", description: "Riyadh specialist for private banking recruitment. Senior RM and Team Head mandates across Saudi onshore platforms and Gulf-hub coverage roles. Confidential.", images: ["https://www.execpartners.ch/og.webp"] },
  robots: { index: true, follow: true },
};

export const revalidate = 1800;

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness"],
  name: "Executive Partners – Private Banking Recruiter in Riyadh",
  url: PAGE_URL,
  image: `${SITE}/og.webp`,
  logo: `${SITE}/icon.png`,
  address: { "@type": "PostalAddress", streetAddress: "118 rue du Rhône", addressLocality: "Geneva", postalCode: "1204", addressCountry: "CH" },
  areaServed: ["Riyadh", "Saudi Arabia", "MEA", "GCC"],
  industry: "Private Banking & Wealth Management Recruitment",
  sameAs: ["https://www.linkedin.com/company/executive-partners", SITE],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Markets", item: `${SITE}/markets` },
    { "@type": "ListItem", position: 3, name: "Private Banking Recruiter – Riyadh", item: PAGE_URL },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Do I need to be a Saudi national to work in private banking in Riyadh?", acceptedAnswer: { "@type": "Answer", text: "Not always, but Saudization rules mean Director-level and above private banking roles are increasingly reserved for Saudi nationals. International candidates without a Saudi passport are more often placed in Gulf-hub coverage roles based in Dubai, Geneva or Zurich, serving Saudi clients from offshore booking centres." } },
    { "@type": "Question", name: "What is the average salary for a private banker in Riyadh?", acceptedAnswer: { "@type": "Answer", text: "Senior Relationship Managers in Riyadh typically earn SAR 450,000 to 700,000 in base salary plus bonus, with Team Lead and Market Head roles ranging from SAR 650,000 to over SAR 1 million. International hires often receive relocation, housing and schooling allowances on top of base." } },
    { "@type": "Question", name: "Which regulator licenses private bankers in Saudi Arabia?", acceptedAnswer: { "@type": "Answer", text: "Banking is regulated by the Saudi Central Bank (SAMA). Asset managers, advisers and brokers fall under the Capital Market Authority (CMA) as Capital Market Institutions (CMIs). Foreign banks typically enter via a SAMA-licensed branch or a CMA-licensed CMI." } },
    { "@type": "Question", name: "What client segments are driving private banking hiring in Riyadh?", acceptedAnswer: { "@type": "Answer", text: "Demand is concentrated on Saudi onshore UHNW and HNW families, entrepreneurs and family offices linked to Vision 2030 sectors, as well as cross-border coverage of Saudi clients booking assets offshore through Dubai, Geneva or Zurich. Arabic-speaking bankers with genuine Saudi relationships are in particularly short supply." } },
  ],
};

export default function PrivateBankingRecruiterRiyadhPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="relative min-h-screen bg-[#0B0F1A] text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(900px 360px at 15% -10%, rgba(201,161,74,.22) 0%, rgba(201,161,74,0) 55%), radial-gradient(900px 360px at 110% 0%, rgba(245,231,192,.18) 0%, rgba(245,231,192,0) 60%)" }} />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-12">
          <header className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brandGoldSoft/90">Riyadh · Saudi Arabia · Private Banking · Executive Search</p>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">Private Banking Recruiter in Riyadh</h1>
            <p className="mt-4 text-sm text-neutral-300 md:text-[0.95rem] leading-relaxed">Executive Partners is a Switzerland-based boutique focused exclusively on <span className="font-semibold text-neutral-100">Private Banking &amp; Wealth Management</span>. In Saudi Arabia, we place Senior Relationship Managers, Team Heads and coverage specialists for <span className="font-semibold text-neutral-100">Saudi onshore UHNW and HNW families, family offices, and Vision 2030-linked wealth</span>, whether based in Riyadh or covering the Saudi market from Dubai, Geneva or Zurich.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary btn-xl">Discuss a mandate or move</Link>
              <Link href="/pdfs/private-banking-career-intelligence-2026.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Download Career Intelligence 2026 (PDF)</Link>
            </div>
          </header>
          <section className="mt-12 grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)]">
            <div className="space-y-4 text-sm text-neutral-200 md:text-[0.95rem] leading-relaxed">
              <h2 className="text-xl font-semibold text-white">Riyadh: the centre of Saudi Arabia's onshore wealth build-out</h2>
              <p>Riyadh is at the centre of Saudi Arabia's economic diversification under Vision 2030, with rapid growth in domestic HNW and UHNW wealth and a fast-expanding base of CMA-licensed Capital Market Institutions. International private banks and EAMs are establishing or expanding local and regional coverage. Union Bancaire Privee opened a dedicated Riyadh office in late 2025, appointing a Saudi national as CEO and Head of Advising, a pattern that is becoming the norm for international entrants.</p>
              <p>Saudi Awwal Bank's private banking division grew deposits 14 percent in the first nine months of last year, with almost 80 percent of clients investing through its in-house platform, evidence that local infrastructure and Saudi relationship managers are now driving growth. The ecosystem also includes Riyad Bank, Saudi National Bank Private Banking, J. Safra Sarasin, J.P. Morgan, Deutsche Bank, and the legacy Credit Suisse book now within UBS, alongside a growing pool of CMA-licensed CMIs.</p>
              <p>Saudization is the defining factor for senior hiring in the Kingdom. Director-level and above private banking roles are increasingly reserved for Saudi nationals, so international candidates are no longer competing on merit alone, they are competing against a quota. Bankers without a Saudi passport are more likely to find roles covering the Saudi market from Gulf hubs such as Dubai, or from Geneva and Zurich.</p>
              <p>Over the last 12 months, hiring demand linked to Saudi Arabia has concentrated on:</p>
              <ul className="list-disc space-y-1 pl-5 text-neutral-200">
                <li>Senior RMs and Team Leads with <span className="font-semibold">personally owned Saudi or wider GCC UHNW/HNW relationships</span></li>
                <li>Coverage specialists managing Saudi clients from <span className="font-semibold">Dubai, Geneva or Zurich</span> booking centres</li>
                <li>Bankers fluent in <span className="font-semibold">Shariah-compliant structures</span> as a baseline client expectation, not a niche request</li>
                <li>Advisors who can speak credibly about <span className="font-semibold">succession and family business governance</span>, given how much Saudi HNW wealth sits inside operating family businesses</li>
              </ul>
              <p>Onshore clients consistently expect their banker to understand Vision 2030 and where the Kingdom is going, not just where the oil price is today. Hiring committees focus on SAMA/CMA compliance, Arabic-language capability for onshore roles, and documented portability for cross-border books.</p>
            </div>
            <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-base font-semibold text-white">How Executive Partners supports Saudi Arabia hiring</h3>
              <ul className="mt-4 space-y-2 text-sm text-neutral-200">
                <li>• Senior RM, Team Head &amp; Market Leader search, Riyadh and Gulf-hub coverage</li>
                <li>• Saudization-aware mapping: onshore vs Gulf-hub coverage roles</li>
                <li>• SAMA/CMA licensing and onboarding guidance</li>
                <li>• Shariah-compliant product and succession-planning fluency screening</li>
                <li>• 12–24 month NNM projection and business plan support</li>
              </ul>
              <div className="mt-5"><Link href="/apply" className="btn btn-secondary w-full text-sm font-medium">Senior RM? Submit your profile</Link></div>
            </aside>
          </section>
          <section className="mt-14 rounded-3xl border border-white/10 bg-black/40 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.75)] backdrop-blur md:p-8">
            <h2 className="text-xl font-semibold text-white">2025–2026 Riyadh compensation benchmarks</h2>
            <p className="mt-3 text-sm text-neutral-300">Salary is generally not personally taxed in Saudi Arabia, though GOSI social insurance contributions apply to Saudi and resident employees. Figures below are gross annual base compensation in SAR.</p>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm text-neutral-100">
                <thead className="border-b border-white/10 text-xs uppercase tracking-wide text-neutral-400"><tr><th className="py-2 pr-4">Role</th><th className="py-2 pr-4">Base (SAR)</th><th className="py-2 pr-4">Bonus</th><th className="py-2 pr-4">Notes</th></tr></thead>
                <tbody className="divide-y divide-white/5">
                  <tr><td className="py-2 pr-4">RM / Senior Advisor</td><td className="py-2 pr-4">300k – 480k</td><td className="py-2 pr-4">20% – 60%</td><td className="py-2 pr-4">Onshore coverage, CMA/SAMA onboarding</td></tr>
                  <tr><td className="py-2 pr-4">Senior RM / Director</td><td className="py-2 pr-4">450k – 700k</td><td className="py-2 pr-4">30% – 80%</td><td className="py-2 pr-4">International banks often add relocation, housing &amp; schooling</td></tr>
                  <tr><td className="py-2 pr-4">Team Lead / Market Head</td><td className="py-2 pr-4">650k – 1.0m+</td><td className="py-2 pr-4">40% – 100%</td><td className="py-2 pr-4">Director-level and above increasingly Saudization-driven</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-neutral-500">Indicative gross figures based on observed market levels 2025–2026. Individual offers depend on platform, nationality, AUM portability and compliance history.</p>
          </section>
          <section className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-base font-semibold text-white">Insights on Saudi Arabia and the Gulf</h3>
              <p className="mt-2 text-sm text-neutral-300">Market commentary on Saudization, Vision 2030, and private banking talent dynamics across the Gulf.</p>
              <ul className="mt-4 space-y-2 text-sm text-brandGoldSoft">
                <li><Link href="/en/insights/the-sandbox-talent-map" className="hover:underline">The Sandbox Talent Map</Link></li>
                <li><Link href="/en/insights/is-your-aum-portable" className="hover:underline">Is Your AUM Actually Portable? The Six Questions Every Banker Gets Wrong</Link></li>
                <li><Link href="/en/insights/compliance-golden-handcuff" className="hover:underline">Compliance Is the New Golden Handcuff</Link></li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-base font-semibold text-white">Work with Executive Partners on Saudi mandates</h3>
              <p className="mt-2 text-sm text-neutral-300">Whether you are a Riyadh-based platform or a Senior RM considering a move into Saudi or Gulf-hub coverage, we provide confidential guidance on Saudization fit, platforms, compensation and portability.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-primary btn-sm">Talk to us about a mandate</Link>
                <Link href="/apply" className="btn btn-ghost btn-sm">Submit your profile</Link>
              </div>
            </div>
          </section>
          <p className="mt-10 text-center text-sm text-neutral-400">Prefer to start with a discreet email? <a href="mailto:info@execpartners.ch" className="underline decoration-brandGold/70 underline-offset-4 hover:text-white">info@execpartners.ch</a></p>
        </div>
      </main>
    </>
  );
}
