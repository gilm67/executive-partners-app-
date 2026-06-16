import type { Metadata } from "next";
import Link from "next/link";

const SITE = "https://www.execpartners.ch";
const PAGE_URL = `${SITE}/en/private-banker-jobs-dubai`;

export const metadata: Metadata = {
  title: {
    absolute: "Private Banker Jobs in Dubai | DIFC Recruitment – Executive Partners",
  },
  description:
    "Dubai DIFC private banking recruitment. Senior RMs, Team Heads and Market Leaders covering GCC, NRI, MENA and offshore wealth. Confidential. Compensation benchmarks included.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "Executive Partners",
    title: "Private Banker Jobs in Dubai – Executive Partners",
    description:
      "Senior private banking roles in Dubai DIFC. GCC, NRI, MENA coverage. Confidential search by Executive Partners.",
    images: [{ url: "/og.webp", width: 1200, height: 630, alt: "Executive Partners – Dubai Private Banking" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Banker Jobs in Dubai – Executive Partners",
    description: "Confidential Dubai DIFC private banking roles. GCC, NRI, MENA coverage. Compensation benchmarks included.",
    images: ["/og.webp"],
  },
  robots: { index: true, follow: true },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness"],
  name: "Executive Partners – Private Banking Recruitment Dubai",
  url: PAGE_URL,
  image: `${SITE}/og.webp`,
  areaServed: ["Dubai", "UAE", "GCC", "MENA"],
  industry: "Private Banking & Wealth Management Recruitment",
  sameAs: ["https://www.linkedin.com/company/executive-partners", SITE],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Markets", item: `${SITE}/en/markets` },
    { "@type": "ListItem", position: 3, name: "Private Banker Jobs – Dubai", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="relative min-h-screen bg-[#0B0F1A] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 360px at 15% -10%, rgba(201,161,74,.22) 0%, rgba(201,161,74,0) 55%), radial-gradient(900px 360px at 110% 0%, rgba(245,231,192,.18) 0%, rgba(245,231,192,0) 60%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-12">
          <nav className="text-xs text-white/60 mb-8">
            <Link href="/en/markets" className="hover:text-[#D4AF37]">Markets</Link>
            <span className="mx-1">/</span>
            <span>Private Banker Jobs in Dubai</span>
          </nav>

          {/* Hero */}
          <header className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brandGoldSoft/90">
              Dubai · DIFC · Executive Search
            </p>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
              Private Banker Jobs in Dubai
            </h1>
            <p className="mt-4 text-sm text-neutral-300 md:text-[0.95rem] leading-relaxed">
              Dubai DIFC has become the booking centre of choice for{" "}
              <span className="font-semibold text-neutral-100">GCC, NRI, MENA and African UHNW wealth</span>{" "}
              migrating from traditional offshore centres. Executive Partners works with global private banks, regional champions and EAM platforms in the DIFC on senior RM, Team Head and Market Leader mandates.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/en/apply" className="btn btn-primary btn-xl">Apply confidentially</Link>
              <Link href="/en/jobs" className="btn btn-ghost">View live mandates</Link>
            </div>
          </header>

          {/* Why Dubai + side card */}
          <section className="mt-12 grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)]">
            <div className="space-y-4 text-sm text-neutral-200 md:text-[0.95rem] leading-relaxed">
              <h2 className="text-xl font-semibold text-white">Why Dubai is structurally different from 2022</h2>
              <p>
                The post-2022 wave of UHNW relocation into the UAE was driven by Russian, CIS and South Asian capital. That wave has matured. Dubai DIFC now hosts over 60 licensed private banks and wealth managers, and the hiring bar has risen accordingly — banks are no longer staffing up to capture inbound flow, they are competing for the relationship managers who already own that flow.
              </p>
              <p>Over the last 18 months, hiring demand has concentrated on:</p>
              <ul className="list-disc space-y-1 pl-5 text-neutral-200">
                <li>Senior RMs with <span className="font-semibold">genuinely portable GCC, NRI or MENA books</span>, not team-shared coverage</li>
                <li>Bankers fluent in <span className="font-semibold">Arabic, Hindi or Mandarin</span> for specific desk coverage</li>
                <li>Team Heads capable of building a DIFC desk from a partial existing infrastructure</li>
                <li>Senior hires tied to new licence approvals and booking-centre build-outs</li>
              </ul>
              <p>
                Compensation in Dubai is tax-free, which materially changes the net comparison against Geneva or Zurich packages — a useful point of leverage we factor into every business case.
              </p>
            </div>

            <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-base font-semibold text-white">How Executive Partners supports Dubai hiring</h3>
              <ul className="mt-4 space-y-2 text-sm text-neutral-200">
                <li>• Senior RM, Team Head &amp; Market Leader search</li>
                <li>• GCC / NRI / MENA portability mapping</li>
                <li>• DIFC licensing and compliance pre-screening</li>
                <li>• Tax-free compensation modelling vs. Swiss net comp</li>
                <li>• 12–24 month NNM projection and business plan support</li>
              </ul>
              <div className="mt-5">
                <Link href="/en/apply" className="btn btn-secondary w-full text-sm font-medium">
                  Senior RM? Submit your profile
                </Link>
              </div>
            </aside>
          </section>

          {/* Compensation table */}
          <section className="mt-14 rounded-3xl border border-white/10 bg-black/40 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.75)] backdrop-blur md:p-8">
            <h2 className="text-xl font-semibold text-white">2025–2026 Dubai DIFC compensation benchmarks</h2>
            <p className="mt-3 text-sm text-neutral-300 md:text-[0.95rem]">
              All figures tax-free under UAE personal income tax rules. Ranges reflect typical packages observed across DIFC-licensed private banks and wealth managers.
            </p>
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
                  <tr>
                    <td className="py-2 pr-4">RM (5–10 years)</td>
                    <td className="py-2 pr-4">120k – 160k</td>
                    <td className="py-2 pr-4">20% – 60%</td>
                    <td className="py-2 pr-4">150k – 260k</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Senior RM (10–20 years)</td>
                    <td className="py-2 pr-4">160k – 220k</td>
                    <td className="py-2 pr-4">40% – 110%</td>
                    <td className="py-2 pr-4">220k – 460k</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Ultra UHNW RM (GCC/NRI)</td>
                    <td className="py-2 pr-4">220k – 280k</td>
                    <td className="py-2 pr-4">80% – 180%</td>
                    <td className="py-2 pr-4">400k – 780k+</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Team Head / Market Leader</td>
                    <td className="py-2 pr-4">250k – 320k</td>
                    <td className="py-2 pr-4">100% – 220%</td>
                    <td className="py-2 pr-4">500k – 1m+</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-neutral-500">
              These ranges are indicative and based on observed market levels across DIFC platforms in 2025–2026. Individual offers depend on book composition, licence requirements and proven portable AUM.
            </p>
          </section>

          {/* Anonymised case study */}
          <section className="mt-12 rounded-3xl border border-[#C9A14A]/20 bg-[#C9A14A]/5 p-6 md:p-7">
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#C9A14A] mb-1">Anonymised placement</div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🇦🇪</span>
              <span className="text-sm font-semibold text-white/80">MEA desk · Dubai DIFC</span>
            </div>
            <p className="text-sm text-white/70">Senior Relationship Manager · USD 185M portable book · Mandate to offer: 19 days · Still at the bank, 16 months</p>
          </section>

          {/* Internal links + CTA strip */}
          <section className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-base font-semibold text-white">Deep-dive insights for Dubai-based bankers</h3>
              <p className="mt-2 text-sm text-neutral-300">Market commentary on Gulf wealth flows, Saudization and DIFC hiring dynamics.</p>
              <ul className="mt-4 space-y-2 text-sm text-brandGoldSoft">
                <li><Link href="/en/insights" className="hover:underline">Browse Private Wealth Pulse →</Link></li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-base font-semibold text-white">Work with Executive Partners</h3>
              <p className="mt-2 text-sm text-neutral-300">
                Whether you are a DIFC platform or a Senior RM considering a move, we provide factual, confidential guidance on portability and compensation.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/en/hiring-managers" className="btn btn-primary btn-sm">Brief a mandate</Link>
                <Link href="/en/apply" className="btn btn-ghost btn-sm">Submit your profile</Link>
              </div>
            </div>
          </section>

          <p className="mt-10 text-center text-sm text-neutral-400">
            Prefer to start with a discreet email?{" "}
            <a href="mailto:recruiter@execpartners.ch" className="underline decoration-brandGold/70 underline-offset-4 hover:text-white">
              recruiter@execpartners.ch
            </a>
          </p>
        </div>
      </main>
    </>
  );
}
