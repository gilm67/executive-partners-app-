// app/en/private-banking-recruiter-london/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

const SITE = "https://www.execpartners.ch";
const PAGE_URL = `${SITE}/en/private-banking-recruiter-london`;

export const metadata: Metadata = {
  title: {
    absolute: "Private Banking Recruiter London | Senior RMs & Team Heads – Executive Partners",
  },
  description:
    "London specialist executive search for private banking. Senior Relationship Managers, Team Heads and UHNW bankers placed across London and global wealth hubs. FCA-compliant. Confidential. Senior-level only.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "Executive Partners",
    title: "Private Banking Recruiter in London – Executive Partners",
    description:
      "London-active executive search boutique focused on senior Private Bankers, RMs and Team Heads with portable UHNW/HNW books. FCA-compliant. Confidential.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Banking Recruiter in London – Executive Partners",
    description: "London specialist for private banking recruitment. Senior RMs with £50m–2bn+ AUM, Team Heads and Investment Advisors placed across HSBC, Julius Baer, Pictet, Rothschild and boutique platforms. Confidential.",
    images: ["https://www.execpartners.ch/og.webp"],
  },
  robots: { index: true, follow: true },
};

export const revalidate = 1800;

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness"],
  name: "Executive Partners – Private Banking Recruiter in London",
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
  areaServed: ["London", "United Kingdom", "Europe", "MEA"],
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
    { "@type": "ListItem", position: 3, name: "Private Banking Recruiter – London", item: PAGE_URL },
  ],
};

export default function PrivateBankingRecruiterLondonPage() {
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
              London · Private Banking · Executive Search
            </p>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
              Private Banking Recruiter in London
            </h1>
            <p className="mt-4 text-sm text-neutral-300 md:text-[0.95rem] leading-relaxed">
              Executive Partners is a Switzerland-based boutique focused exclusively on{" "}
              <span className="font-semibold text-neutral-100">
                Private Banking &amp; Wealth Management
              </span>
              . In London, we place Senior Relationship Managers, Team Heads and Market Leaders
              with a specific focus on{" "}
              <span className="font-semibold text-neutral-100">
                UHNW and HNW client coverage, FCA-compliant portability, and cross-border expertise
                across European, MEA and international markets
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

          {/* Why London */}
          <section className="mt-12 grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)]">
            <div className="space-y-4 text-sm text-neutral-200 md:text-[0.95rem] leading-relaxed">
              <h2 className="text-xl font-semibold text-white">
                London private banking in 2026: opportunity in a market under pressure
              </h2>
              <p>
                London remains one of the world's deepest private banking hubs, hosting the
                UK operations of HSBC Private Bank, Julius Baer, Pictet, Rothschild &amp; Co,
                Lombard Odier, EFG International, and dozens of boutique platforms and EAMs.
                The city's unique strength is its{" "}
                <span className="font-semibold">
                  combination of onshore UK wealth and international client flows
                </span>
                {" "}from Europe, MEA, the Americas and Asia.
              </p>
              <p>
                The abolition of the UK's non-domicile tax regime from April 2025 has created
                significant structural pressure on the London private banking market.{" "}
                <span className="font-semibold">
                  A net 10,800 millionaires left the UK in 2024 alone
                </span>
                , with 78 centi-millionaires and 12 billionaires among those departing, primarily
                to Switzerland, Italy, and the UAE. This is reshaping which client profiles
                London desks can realistically serve and book.
              </p>
              <p>Over the last 24 months, hiring demand in London has concentrated on:</p>
              <ul className="list-disc space-y-1 pl-5 text-neutral-200">
                <li>
                  Senior RMs with{" "}
                  <span className="font-semibold">
                    proven UHNW/HNW books and FCA-compliant transition plans
                  </span>
                </li>
                <li>
                  Bankers with cross-border expertise covering MEA, European and
                  international family flows
                </li>
                <li>
                  Tax and structuring specialists with{" "}
                  <span className="font-semibold">post-non-dom advisory capability</span>
                </li>
                <li>
                  Team Heads managing £200m+ in portable, compliantly documented AUM
                </li>
              </ul>
              <p>
                London hiring committees are increasingly focused on{" "}
                <span className="font-semibold">
                  revenue quality, FCA documentation discipline, and the ability to
                  service internationally mobile clients in a post-non-dom environment
                </span>
                {" "}rather than headline AUM alone.
              </p>
            </div>

            {/* Side card */}
            <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-base font-semibold text-white">
                How Executive Partners supports London hiring
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-neutral-200">
                <li>• Senior RM, Team Head &amp; Market Leader search</li>
                <li>• UHNW/HNW AUM portability and booking-centre mapping</li>
                <li>• FCA compliance and KYC documentation screening</li>
                <li>• Revenue &amp; ROA analysis by client segment</li>
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
              2025–2026 London compensation benchmarks
            </h2>
            <p className="mt-3 text-sm text-neutral-300 md:text-[0.95rem]">
              The ranges below reflect typical packages observed across leading London-based
              private banks. Exact levels depend on platform, client mix, product penetration
              and individual performance.
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm text-neutral-100">
                <thead className="border-b border-white/10 text-xs uppercase tracking-wide text-neutral-400">
                  <tr>
                    <th className="py-2 pr-4">Role</th>
                    <th className="py-2 pr-4">Base salary (GBP)</th>
                    <th className="py-2 pr-4">Bonus range</th>
                    <th className="py-2 pr-4">Typical total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-2 pr-4">RM (5–10 years)</td>
                    <td className="py-2 pr-4">100k – 140k</td>
                    <td className="py-2 pr-4">20% – 60%</td>
                    <td className="py-2 pr-4">120k – 220k</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Senior RM (10–20 years)</td>
                    <td className="py-2 pr-4">140k – 220k</td>
                    <td className="py-2 pr-4">40% – 120%</td>
                    <td className="py-2 pr-4">200k – 480k</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Ultra UHNW RM</td>
                    <td className="py-2 pr-4">220k – 300k</td>
                    <td className="py-2 pr-4">80% – 200%</td>
                    <td className="py-2 pr-4">400k – 800k+</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Team Head</td>
                    <td className="py-2 pr-4">250k – 350k</td>
                    <td className="py-2 pr-4">100% – 250%</td>
                    <td className="py-2 pr-4">500k – 1.1m+</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-neutral-500">
              These ranges are indicative and based on observed market levels in London across
              2025–2026. Individual offers depend on platform, seniority, FCA compliance history
              and proven, portable AUM.
            </p>
          </section>

          {/* Internal links */}
          <section className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-base font-semibold text-white">
                Deep-dive insights for London-based bankers
              </h3>
              <p className="mt-2 text-sm text-neutral-300">
                Market commentary on UK private banking, non-dom changes, and talent flows.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-brandGoldSoft">
                <li>
                  <Link href="/en/insights/is-your-aum-portable" className="hover:underline">
                    Is Your AUM Actually Portable? The Six Questions Every Banker Gets Wrong
                  </Link>
                </li>
                <li>
                  <Link href="/en/insights/compliance-golden-handcuff" className="hover:underline">
                    Compliance Is the New Golden Handcuff
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
                Work with Executive Partners in London
              </h3>
              <p className="mt-2 text-sm text-neutral-300">
                Whether you are a London-based bank or a Senior RM considering a move, we provide
                confidential guidance on platforms, compensation and portability.
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
<a href="mailto:recruiter@execpartners.ch" className="underline decoration-brandGold/70 underline-offset-4 hover:text-white">recruiter@execpartners.ch</a>
          </p>

        </div>
      </main>
    </>
  );
}
