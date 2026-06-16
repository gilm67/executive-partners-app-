import type { Metadata } from "next";
import Link from "next/link";

const SITE = "https://www.execpartners.ch";
const PAGE_URL = `${SITE}/en/private-banking-recruiter-hong-kong`;

export const metadata: Metadata = {
  title: { absolute: "Private Banking Recruiter Hong Kong | Senior RMs & Team Heads – Executive Partners" },
  description: "Hong Kong specialist executive search for private banking. Senior Relationship Managers, Team Heads and UHNW bankers placed across Hong Kong and Asia-Pacific wealth hubs. SFC/HKMA-compliant. Confidential.",
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "website", url: PAGE_URL, siteName: "Executive Partners", title: "Private Banking Recruiter in Hong Kong – Executive Partners", description: "Hong Kong executive search boutique focused on senior Private Bankers, RMs and Team Heads with portable UHNW/HNW books across Greater China and Asia-Pacific." },
  twitter: { card: "summary_large_image", title: "Private Banking Recruiter in Hong Kong – Executive Partners", description: "Hong Kong specialist for private banking recruitment. Senior RMs placed across UBS, HSBC, Julius Baer, Bank of Singapore and boutique platforms. Confidential.", images: ["https://www.execpartners.ch/og.webp"] },
  robots: { index: true, follow: true },
};

export const revalidate = 1800;

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness"],
  name: "Executive Partners – Private Banking Recruiter in Hong Kong",
  url: PAGE_URL,
  image: `${SITE}/og.webp`,
  logo: `${SITE}/icon.png`,
  address: { "@type": "PostalAddress", streetAddress: "118 rue du Rhône", addressLocality: "Geneva", postalCode: "1204", addressCountry: "CH" },
  areaServed: ["Hong Kong", "Greater China", "Asia-Pacific"],
  industry: "Private Banking & Wealth Management Recruitment",
  sameAs: ["https://www.linkedin.com/company/executive-partners", SITE],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Markets", item: `${SITE}/markets` },
    { "@type": "ListItem", position: 3, name: "Private Banking Recruiter – Hong Kong", item: PAGE_URL },
  ],
};

export default function PrivateBankingRecruiterHongKongPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <main className="relative min-h-screen bg-[#0B0F1A] text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(900px 360px at 15% -10%, rgba(201,161,74,.22) 0%, rgba(201,161,74,0) 55%), radial-gradient(900px 360px at 110% 0%, rgba(245,231,192,.18) 0%, rgba(245,231,192,0) 60%)" }} />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-12">
          <header className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brandGoldSoft/90">Hong Kong · Greater China · Private Banking · Executive Search</p>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">Private Banking Recruiter in Hong Kong</h1>
            <p className="mt-4 text-sm text-neutral-300 md:text-[0.95rem] leading-relaxed">
              Executive Partners is a Switzerland-based boutique focused exclusively on <span className="font-semibold text-neutral-100">Private Banking &amp; Wealth Management</span>. In Hong Kong, we place Senior Relationship Managers, Team Heads and Market Leaders with a specific focus on <span className="font-semibold text-neutral-100">Greater China UHNW coverage, SFC/HKMA-compliant portability, and cross-border expertise across Mainland China, Taiwan and North Asia</span>.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary btn-xl">Discuss a mandate or move</Link>
              <Link href="/pdfs/private-banking-career-intelligence-2026.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Download Career Intelligence 2026 (PDF)</Link>
            </div>
          </header>

          <section className="mt-12 grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)]">
            <div className="space-y-4 text-sm text-neutral-200 md:text-[0.95rem] leading-relaxed">
              <h2 className="text-xl font-semibold text-white">Hong Kong: record AUM growth and aggressive hiring in 2025–2026</h2>
              <p>Hong Kong's private banking sector delivered its strongest performance in years in 2024 and 2025. Total AUM at the city's 46 private banks reached <span className="font-semibold">HK$35 trillion (USD 4.5 trillion) by end of 2024, a 13% year-on-year increase</span>, with the private banking segment specifically growing 15% with net inflows of HK$384 billion, according to the Securities and Futures Commission.</p>
              <p>Major private banks expanded their Hong Kong workforce by nearly 400 persons over the past two years, a 12% increase, while AUM grew a further 14% in H1 2025. Several banks have expanded office space by 35% to 50%. The HKMA has stated publicly that Hong Kong is forecast to become the world's largest wealth management centre in the coming years. Headcount growth at some institutions is projected at 10% to 100% over the next few years.</p>
              <p>Over the last 24 months, hiring demand in Hong Kong has concentrated on:</p>
              <ul className="list-disc space-y-1 pl-5 text-neutral-200">
                <li>Senior RMs with <span className="font-semibold">Greater China UHNW coverage and Mandarin capability</span></li>
                <li>Team Heads with HKD 2bn+ in portable, SFC/HKMA-compliant AUM</li>
                <li>Bankers with North Asia coverage spanning Taiwan, Korea and Japan</li>
                <li>Advisors with <span className="font-semibold">digital asset and alternative investment expertise</span></li>
              </ul>
              <p>Hong Kong hiring committees focus on <span className="font-semibold">SFC and HKMA documentation discipline, Greater China client relationships, and the ability to generate net new money from the region's UHNW growth engine</span>.</p>
            </div>
            <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-base font-semibold text-white">How Executive Partners supports Hong Kong hiring</h3>
              <ul className="mt-4 space-y-2 text-sm text-neutral-200">
                <li>• Senior RM, Team Head &amp; Market Leader search</li>
                <li>• Greater China AUM portability and booking-centre mapping</li>
                <li>• SFC/HKMA compliance and KYC documentation screening</li>
                <li>• Revenue &amp; ROA analysis by client segment</li>
                <li>• 12–24 month NNM projection and business plan support</li>
              </ul>
              <div className="mt-5"><Link href="/apply" className="btn btn-secondary w-full text-sm font-medium">Senior RM? Submit your profile</Link></div>
            </aside>
          </section>

          <section className="mt-14 rounded-3xl border border-white/10 bg-black/40 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.75)] backdrop-blur md:p-8">
            <h2 className="text-xl font-semibold text-white">2025–2026 Hong Kong compensation benchmarks</h2>
            <p className="mt-3 text-sm text-neutral-300 md:text-[0.95rem]">Hong Kong applies a low salaries tax (top marginal rate 17%), making it highly competitive versus other Asian financial centres.</p>
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
                  <tr><td className="py-2 pr-4">RM (5–10 years)</td><td className="py-2 pr-4">100k – 150k</td><td className="py-2 pr-4">20% – 60%</td><td className="py-2 pr-4">120k – 240k</td></tr>
                  <tr><td className="py-2 pr-4">Senior RM (10–20 years)</td><td className="py-2 pr-4">150k – 260k</td><td className="py-2 pr-4">40% – 120%</td><td className="py-2 pr-4">210k – 570k</td></tr>
                  <tr><td className="py-2 pr-4">Ultra UHNW RM</td><td className="py-2 pr-4">260k – 370k</td><td className="py-2 pr-4">80% – 200%</td><td className="py-2 pr-4">470k – 950k+</td></tr>
                  <tr><td className="py-2 pr-4">Team Head</td><td className="py-2 pr-4">320k – 450k</td><td className="py-2 pr-4">100% – 250%</td><td className="py-2 pr-4">640k – 1.3m+</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-neutral-500">These ranges are indicative. Individual offers depend on platform, AUM portability, SFC/HKMA compliance history and client mix.</p>
          </section>

          <section className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-base font-semibold text-white">Insights for Hong Kong-based bankers</h3>
              <p className="mt-2 text-sm text-neutral-300">Market commentary on Greater China private banking, UHNW flows and talent dynamics.</p>
              <ul className="mt-4 space-y-2 text-sm text-brandGoldSoft">
                <li><Link href="/en/insights/is-your-aum-portable" className="hover:underline">Is Your AUM Actually Portable? The Six Questions Every Banker Gets Wrong</Link></li>
                <li><Link href="/en/insights/compliance-golden-handcuff" className="hover:underline">Compliance Is the New Golden Handcuff</Link></li>
                <li><Link href="/en/insights/the-alpine-exit" className="hover:underline">The Alpine Exit: What Happens to Private Banking if UBS Leaves Switzerland</Link></li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-base font-semibold text-white">Work with Executive Partners in Hong Kong</h3>
              <p className="mt-2 text-sm text-neutral-300">Whether you are a Hong Kong-based bank or a Senior RM considering a move, we provide confidential guidance on platforms, compensation and portability.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-primary btn-sm">Talk to us about a mandate</Link>
                <Link href="/apply" className="btn btn-ghost btn-sm">Submit your profile</Link>
              </div>
            </div>
          </section>
          <p className="mt-10 text-center text-sm text-neutral-400">Prefer to start with a discreet email?{" "}<a href="mailto:recruiter@execpartners.ch" className="underline decoration-brandGold/70 underline-offset-4 hover:text-white">recruiter@execpartners.ch</a></p>
        </div>
      </main>
    </>
  );
}
