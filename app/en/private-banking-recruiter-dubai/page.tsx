import type { Metadata } from "next";
import Link from "next/link";

const SITE = "https://www.execpartners.ch";
const PAGE_URL = `${SITE}/en/private-banking-recruiter-dubai`;

export const metadata: Metadata = {
  title: { absolute: "Private Banking Recruiter Dubai | Senior RMs & Team Heads – Executive Partners" },
  description: "Dubai DIFC specialist executive search for private banking. Senior Relationship Managers, Team Heads and UHNW bankers placed across Dubai and global wealth hubs. DFSA-compliant. Confidential.",
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "website", url: PAGE_URL, siteName: "Executive Partners", title: "Private Banking Recruiter in Dubai – Executive Partners", description: "Dubai DIFC executive search boutique focused on senior Private Bankers, RMs and Team Heads with portable UHNW/HNW books." },
  twitter: { card: "summary_large_image", title: "Private Banking Recruiter in Dubai – Executive Partners", description: "Dubai DIFC specialist for private banking recruitment. Senior RMs placed across Julius Baer, UBS, Bank of Singapore, HSBC and boutique platforms. Confidential.", images: ["https://www.execpartners.ch/og.webp"] },
  robots: { index: true, follow: true },
};

export const revalidate = 1800;

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness"],
  name: "Executive Partners – Private Banking Recruiter in Dubai",
  url: PAGE_URL,
  image: `${SITE}/og.webp`,
  logo: `${SITE}/icon.png`,
  address: { "@type": "PostalAddress", streetAddress: "118 rue du Rhône", addressLocality: "Geneva", postalCode: "1204", addressCountry: "CH" },
  areaServed: ["Dubai", "UAE", "MEA", "GCC"],
  industry: "Private Banking & Wealth Management Recruitment",
  sameAs: ["https://www.linkedin.com/company/executive-partners", SITE],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Markets", item: `${SITE}/markets` },
    { "@type": "ListItem", position: 3, name: "Private Banking Recruiter – Dubai", item: PAGE_URL },
  ],
};

export default function PrivateBankingRecruiterDubaiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <main className="relative min-h-screen bg-[#0B0F1A] text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(900px 360px at 15% -10%, rgba(201,161,74,.22) 0%, rgba(201,161,74,0) 55%), radial-gradient(900px 360px at 110% 0%, rgba(245,231,192,.18) 0%, rgba(245,231,192,0) 60%)" }} />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-12">
          <header className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brandGoldSoft/90">Dubai · DIFC · Private Banking · Executive Search</p>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">Private Banking Recruiter in Dubai</h1>
            <p className="mt-4 text-sm text-neutral-300 md:text-[0.95rem] leading-relaxed">
              Executive Partners is a Switzerland-based boutique focused exclusively on <span className="font-semibold text-neutral-100">Private Banking &amp; Wealth Management</span>. In Dubai, we place Senior Relationship Managers, Team Heads and Market Leaders operating out of the <span className="font-semibold text-neutral-100">DIFC, with a focus on MEA, GCC, South Asian and international UHNW client coverage</span>.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/en/contact" className="btn btn-primary btn-xl">Discuss a mandate or move</Link>
              <Link href="/pdfs/private-banking-career-intelligence-2026.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Download Career Intelligence 2026 (PDF)</Link>
            </div>
          </header>

          <section className="mt-12 grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)]">
            <div className="space-y-4 text-sm text-neutral-200 md:text-[0.95rem] leading-relaxed">
              <h2 className="text-xl font-semibold text-white">Dubai DIFC: the fastest-growing private banking hub in the world</h2>
              <p>Dubai's DIFC has established itself as the primary private banking hub for the MEA region and a key booking centre for South Asian, Russian, and internationally mobile UHNW wealth. Julius Baer, UBS, HSBC Private Bank, Bank of Singapore, Pictet, and dozens of boutique platforms operate from the DIFC, competing aggressively for senior talent with <span className="font-semibold">tax-free compensation packages that consistently exceed Western equivalents</span>.</p>
              <p>A senior relationship manager in Dubai managing USD 80M in AUM earns a base salary of AED 600,000 to 900,000 (USD 163,000 to 245,000) entirely tax-free, plus performance bonuses that can reach 50% of base. Bank of Singapore, which ranks third among private banks in Dubai behind Julius Baer and UBS, has confirmed Dubai as a strategic priority and is targeting 20% of group AUM from the market by 2027.</p>
              <p>Over the last 24 months, hiring demand in Dubai has concentrated on:</p>
              <ul className="list-disc space-y-1 pl-5 text-neutral-200">
                <li>Senior RMs with <span className="font-semibold">MEA, GCC and South Asian UHNW client coverage</span></li>
                <li>Bankers with Russian/CIS, Turkish, and LATAM cross-border books booked in DIFC</li>
                <li>Team Heads with USD 300m+ in portable, DFSA-compliant AUM</li>
                <li>Advisors with <span className="font-semibold">alternative investment and private markets expertise</span></li>
              </ul>
              <p>Dubai hiring committees focus on <span className="font-semibold">DFSA compliance, client onboarding quality, and the ability to generate net new money in a competitive market</span> where every major global private bank now has a presence.</p>
            </div>
            <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-base font-semibold text-white">How Executive Partners supports Dubai hiring</h3>
              <ul className="mt-4 space-y-2 text-sm text-neutral-200">
                <li>• Senior RM, Team Head &amp; Market Leader search</li>
                <li>• MEA/GCC AUM portability and booking-centre mapping</li>
                <li>• DFSA compliance and KYC documentation screening</li>
                <li>• Revenue &amp; ROA analysis by client segment</li>
                <li>• 12–24 month NNM projection and business plan support</li>
              </ul>
              <div className="mt-5"><Link href="/en/apply" className="btn btn-secondary w-full text-sm font-medium">Senior RM? Submit your profile</Link></div>
            </aside>
          </section>

          <section className="mt-14 rounded-3xl border border-white/10 bg-black/40 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.75)] backdrop-blur md:p-8">
            <h2 className="text-xl font-semibold text-white">2025–2026 Dubai compensation benchmarks</h2>
            <p className="mt-3 text-sm text-neutral-300 md:text-[0.95rem]">All figures are tax-free. Packages typically include housing allowance, school fees, and health insurance on top of base salary.</p>
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
                  <tr><td className="py-2 pr-4">RM (5–10 years)</td><td className="py-2 pr-4">120k – 160k</td><td className="py-2 pr-4">20% – 50%</td><td className="py-2 pr-4">145k – 240k</td></tr>
                  <tr><td className="py-2 pr-4">Senior RM (10–20 years)</td><td className="py-2 pr-4">163k – 245k</td><td className="py-2 pr-4">40% – 100%</td><td className="py-2 pr-4">230k – 490k</td></tr>
                  <tr><td className="py-2 pr-4">Ultra UHNW RM</td><td className="py-2 pr-4">245k – 340k</td><td className="py-2 pr-4">80% – 180%</td><td className="py-2 pr-4">440k – 850k+</td></tr>
                  <tr><td className="py-2 pr-4">Team Head</td><td className="py-2 pr-4">300k – 420k</td><td className="py-2 pr-4">100% – 220%</td><td className="py-2 pr-4">600k – 1.2m+</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-neutral-500">All figures tax-free. Individual offers depend on platform, AUM portability, DFSA compliance history and client mix.</p>
          </section>

          <section className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-base font-semibold text-white">Insights for Dubai-based bankers</h3>
              <p className="mt-2 text-sm text-neutral-300">Market commentary on MEA private banking, DIFC dynamics and talent flows.</p>
              <ul className="mt-4 space-y-2 text-sm text-brandGoldSoft">
                <li><Link href="/en/insights/is-your-aum-portable" className="hover:underline">Is Your AUM Actually Portable? The Six Questions Every Banker Gets Wrong</Link></li>
                <li><Link href="/en/insights/compliance-golden-handcuff" className="hover:underline">Compliance Is the New Golden Handcuff</Link></li>
                <li><Link href="/en/insights/the-alpine-exit" className="hover:underline">The Alpine Exit: What Happens to Private Banking if UBS Leaves Switzerland</Link></li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-base font-semibold text-white">Work with Executive Partners in Dubai</h3>
              <p className="mt-2 text-sm text-neutral-300">Whether you are a DIFC-based bank or a Senior RM considering a move, we provide confidential guidance on platforms, compensation and portability.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/en/contact" className="btn btn-primary btn-sm">Talk to us about a mandate</Link>
                <Link href="/en/apply" className="btn btn-ghost btn-sm">Submit your profile</Link>
              </div>
            </div>
          </section>
          <p className="mt-10 text-center text-sm text-neutral-400">Prefer to start with a discreet email?{" "}<a href="mailto:recruiter@execpartners.ch" className="underline decoration-brandGold/70 underline-offset-4 hover:text-white">recruiter@execpartners.ch</a></p>
        </div>
      </main>
    </>
  );
}
