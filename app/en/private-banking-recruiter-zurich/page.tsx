// app/en/private-banking-recruiter-zurich/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

const SITE = "https://www.execpartners.ch";
const PAGE_URL = `${SITE}/en/private-banking-recruiter-zurich`;

export const metadata: Metadata = {
  title: {
    absolute: "Private Banking Recruiter Zurich | Senior RMs & Team Heads – Executive Partners",
  },
  description:
    "Zurich specialist executive search for private banking. Senior Relationship Managers, Team Heads and UHNW bankers placed across Zurich and global wealth hubs. Confidential. Senior-level only.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "Executive Partners",
    title: "Private Banking Recruiter in Zurich – Executive Partners",
    description:
      "Zurich-active executive search boutique focused on senior Private Bankers, RMs and Team Heads with portable UHNW/HNW books.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Banking Recruiter in Zurich – Executive Partners",
    description: "Zurich specialist for private banking recruitment. Senior RMs with CHF 75m–2bn+ AUM, Team Heads and Investment Advisors placed across UBS, Julius Baer, Pictet and boutique platforms. Confidential.",
    images: ["https://www.execpartners.ch/og.webp"],
  },
  robots: { index: true, follow: true },
};

export const revalidate = 1800;

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness"],
  name: "Executive Partners – Private Banking Recruiter in Zurich",
  url: PAGE_URL,
  image: `${SITE}/og.webp`,
  logo: `${SITE}/icon.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "118 rue du Rhône",
    addressLocality: "Geneva",
    postalCode: "1204",
    addressCountry: "CH",
  },
  areaServed: ["Zurich", "Switzerland", "DACH", "Europe"],
  industry: "Private Banking & Wealth Management Recruitment",
  sameAs: [
    "https://www.linkedin.com/company/executive-partners",
    SITE,
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Markets", item: `${SITE}/markets` },
    { "@type": "ListItem", position: 3, name: "Private Banking Recruiter – Zurich", item: PAGE_URL },
  ],
};

export default function PrivateBankingRecruiterZurichPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

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

          {/* Hero */}
          <header className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brandGoldSoft/90">
              Zurich · Private Banking · Executive Search
            </p>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
              Private Banking Recruiter in Zurich
            </h1>
            <p className="mt-4 text-sm text-neutral-300 md:text-[0.95rem] leading-relaxed">
              Executive Partners is a Switzerland-based boutique focused exclusively on{" "}
              <span className="font-semibold text-neutral-100">
                Private Banking &amp; Wealth Management
              </span>
              . In Zurich, we place Senior Relationship Managers, Team Heads and Market Leaders
              with a specific focus on{" "}
              <span className="font-semibold text-neutral-100">
                Swiss onshore expertise, DACH client coverage, validated AUM portability and FINMA-grade compliance
              </span>
              .
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary btn-xl">
                Discuss a mandate or move
              </Link>
              <Link
                href="/pdfs/private-banking-career-intelligence-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Download Career Intelligence 2026 (PDF)
              </Link>
            </div>
          </header>

          {/* Why Zurich */}
          <section className="mt-12 grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)]">
            <div className="space-y-4 text-sm text-neutral-200 md:text-[0.95rem] leading-relaxed">
              <h2 className="text-xl font-semibold text-white">
                Why Zurich remains Switzerland's largest private banking hub
              </h2>
              <p>
                Zurich is Switzerland's financial capital and the largest private banking market
                in the country by AUM and number of institutions. The city hosts the headquarters
                of UBS, Julius Baer, Vontobel, Lombard Odier and dozens of boutique platforms,
                alongside a dense network of EAMs and family offices serving{" "}
                <span className="font-semibold">DACH entrepreneurs, institutional clients and international UHNW families</span>.
              </p>
              <p>Over the last 24 months, hiring demand in Zurich has concentrated on:</p>
              <ul className="list-disc space-y-1 pl-5 text-neutral-200">
                <li>
                  Senior RMs with{" "}
                  <span className="font-semibold">Swiss onshore books and proven DACH coverage</span>
                </li>
                <li>
                  Team Heads managing CHF 500m+ in portable, compliant AUM
                </li>
                <li>
                  Cross-border specialists (German, Austrian, Eastern European markets)
                </li>
                <li>
                  Advisors with strong{" "}
                  <span className="font-semibold">balance sheet utilisation and lending expertise</span>
                </li>
              </ul>
              <p>
                Zurich hiring committees focus on{" "}
                <span className="font-semibold">
                  onshore revenue quality, Lombard and credit utilisation, and German-language client coverage
                </span>
                {" "}rather than offshore AUM volume alone.
              </p>
            </div>

            {/* Side card */}
            <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-base font-semibold text-white">
                How Executive Partners supports Zurich hiring
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-neutral-200">
                <li>• Senior RM, Team Head &amp; Market Leader search</li>
                <li>• Swiss onshore AUM portability and booking-centre mapping</li>
                <li>• Revenue &amp; ROA analysis by client segment</li>
                <li>• FINMA compliance and KYC documentation screening</li>
                <li>• 12–24 month NNM projection and business plan support</li>
              </ul>
              <div className="mt-5">
                <Link
                  href="/apply"
                  className="btn btn-secondary w-full text-sm font-medium"
                >
                  Senior RM? Submit your profile
                </Link>
              </div>
            </aside>
          </section>

          {/* Compensation table */}
          <section className="mt-14 rounded-3xl border border-white/10 bg-black/40 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.75)] backdrop-blur md:p-8">
            <h2 className="text-xl font-semibold text-white">
              2025–2026 Zurich compensation benchmarks
            </h2>
            <p className="mt-3 text-sm text-neutral-300 md:text-[0.95rem]">
              The ranges below reflect typical packages observed across leading Zurich-based private banks.
              Exact levels depend on platform, onshore vs cross-border mix, product penetration and individual performance.
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm text-neutral-100">
                <thead className="border-b border-white/10 text-xs uppercase tracking-wide text-neutral-400">
                  <tr>
                    <th className="py-2 pr-4">Role</th>
                    <th className="py-2 pr-4">Base salary (CHF)</th>
                    <th className="py-2 pr-4">Bonus range</th>
                    <th className="py-2 pr-4">Typical total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-2 pr-4">RM (5–10 years)</td>
                    <td className="py-2 pr-4">150k – 190k</td>
                    <td className="py-2 pr-4">20% – 60%</td>
                    <td className="py-2 pr-4">180k – 300k</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Senior RM (10–20 years)</td>
                    <td className="py-2 pr-4">190k – 270k</td>
                    <td className="py-2 pr-4">40% – 120%</td>
                    <td className="py-2 pr-4">270k – 590k</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Ultra UHNW RM</td>
                    <td className="py-2 pr-4">260k – 340k</td>
                    <td className="py-2 pr-4">80% – 200%</td>
                    <td className="py-2 pr-4">470k – 950k+</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Team Head</td>
                    <td className="py-2 pr-4">270k – 380k</td>
                    <td className="py-2 pr-4">100% – 250%</td>
                    <td className="py-2 pr-4">580k – 1.2m+</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-neutral-500">
              These ranges are indicative and based on observed market levels in Zurich across 2025–2026.
              Individual offers depend on platform, seniority, compliance history and proven, portable AUM.
            </p>
          </section>

          {/* Internal links */}
          <section className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-base font-semibold text-white">
                Deep-dive insights for Zurich-based bankers
              </h3>
              <p className="mt-2 text-sm text-neutral-300">
                Market commentary on Swiss private banking, consolidation dynamics and talent flows.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-brandGoldSoft">
                <li>
                  <Link href="/en/insights/zurich-private-banking-market-2026" className="hover:underline">
                    The Zurich Talent Paradox: Why the Biggest Market Is the Hardest Move
                  </Link>
                </li>
                <li>
                  <Link href="/en/insights/is-your-aum-portable" className="hover:underline">
                    Is Your AUM Actually Portable? The Six Questions Every Banker Gets Wrong
                  </Link>
                </li>
                <li>
                  <Link href="/en/insights/switzerland-running-out-banks" className="hover:underline">
                    Switzerland Is Running Out of Banks
                  </Link>
                </li>
                <li>
                  <Link href="/en/insights/the-alpine-exit" className="hover:underline">
                    The Alpine Exit: What Happens to Private Banking if UBS Leaves Switzerland
                  </Link>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-base font-semibold text-white">
                Work with Executive Partners in Zurich
              </h3>
              <p className="mt-2 text-sm text-neutral-300">
                Whether you are a Zurich-based bank or a Senior RM considering a
                move, we provide confidential guidance on platforms, compensation and portability.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-primary btn-sm">
                  Talk to us about a mandate
                </Link>
                <Link href="/apply" className="btn btn-ghost btn-sm">
                  Submit your profile
                </Link>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <p className="mt-10 text-center text-sm text-neutral-400">
            Prefer to start with a discreet email?{" "}
<a href="mailto:info@execpartners.ch" className="underline decoration-brandGold/70 underline-offset-4 hover:text-white">info@execpartners.ch</a>
          </p>

        </div>
      </main>
    </>
  );
}
