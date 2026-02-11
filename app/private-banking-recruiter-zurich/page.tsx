// app/private-banking-recruiter-zurich/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

/* ---------- helpers for absolute URLs ---------- */
function siteBase() {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL ||
    "https://www.execpartners.ch";
  const url = fromEnv.startsWith("http") ? fromEnv : `https://${fromEnv}`;
  return url.replace(/\/$/, "");
}

const SITE = siteBase();
const PAGE_URL = `${SITE}/private-banking-recruiter-zurich`;

/* ---------- metadata ---------- */
export const metadata: Metadata = {
  title: {
    absolute: "Private Banking Recruiter in Zurich – Executive Partners",
  },
  description:
    "Executive search for senior Private Bankers, Relationship Managers and Team Heads in Zurich. Compensation benchmarks, portability assessment and confidential career guidance.",
  alternates: {
    canonical: "/private-banking-recruiter-zurich",
  },
  openGraph: {
    type: "website",
    url: "/private-banking-recruiter-zurich",
    siteName: "Executive Partners",
    title: "Private Banking Recruiter in Zurich – Executive Partners",
    description:
      "Zurich-focused executive search boutique for Private Banking & Wealth Management: senior RMs, Team Heads and Market Leaders with portable UHNW/HNW books.",
  },
  robots: { index: true, follow: true },
};

export const revalidate = 1800;

export default function PrivateBankingRecruiterZurichPage() {
  // ---------- Structured Data (JSON-LD) ----------
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
    areaServed: ["CH", "DE", "AT", "EU"],
    sameAs: [SITE],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Private Banking Recruiter in Zurich",
        item: PAGE_URL,
      },
    ],
  };

  return (
    <main className="relative min-h-screen bg-[#0B0F1A] text-white">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Gold ambient glow */}
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
            From our base in Switzerland, Executive Partners supports{" "}
            <span className="font-semibold text-neutral-100">
              Zurich-based private banks, international platforms and EAMs
            </span>{" "}
            with senior hiring across Relationship Managers, Team Heads and
            Market Leaders. Our work is centred on{" "}
            <span className="font-semibold text-neutral-100">
              factual AUM portability, booking-centre fit and sustainable P&amp;L
              contribution
            </span>{" "}
            across Swiss onshore, Germany, Austria, CEE, Nordics and global
            offshore hubs.
          </p>

          {/* Hero CTAs */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary btn-xl">
              Discuss a Zurich mandate
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

        {/* Section: Why Zurich */}
        <section className="mt-12 grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)]">
          <div className="space-y-4 text-sm text-neutral-200 md:text-[0.95rem] leading-relaxed">
            <h2 className="text-xl font-semibold text-white">
              Zurich: the core Swiss booking centre
            </h2>
            <p>
              Zurich remains the{" "}
              <span className="font-semibold">
                largest Swiss private banking hub
              </span>{" "}
              by booked assets, with strong franchise depth across Swiss
              onshore, Germany/Austria, CEE, Nordics and global UHNW clients.
              Competition for high-performing Senior RMs is intense, but so is
              scrutiny on real profitability.
            </p>
            <p>
              For Zurich mandates, hiring managers are increasingly focused on:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-neutral-200">
              <li>
                Senior RMs with{" "}
                <span className="font-semibold">
                  stable, multi-jurisdictional books
                </span>{" "}
                that pass cross-border tests
              </li>
              <li>
                Clean compliance files and documented{" "}
                <span className="font-semibold">KYC / suitability</span> history
              </li>
              <li>
                Strong{" "}
                <span className="font-semibold">
                  advisory/DPM penetration and ROA discipline
                </span>
              </li>
              <li>
                Team Heads able to attract &amp; retain top RMs in a
                consolidating market
              </li>
            </ul>
            <p>
              Our role is to provide banks and candidates with{" "}
              <span className="font-semibold">
                realistic views on portability, pricing grids, deferrals and
                long-term platform fit
              </span>{" "}
              before any move is initiated.
            </p>
          </div>

          {/* Side card: What we do */}
          <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="text-base font-semibold text-white">
              How we support Zurich hiring
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-200">
              <li>• Senior RM &amp; Team Head mandates across key desks</li>
              <li>• AUM portability and cross-border mapping for Zurich</li>
              <li>• NNM, ROA and margin analysis on proposed books</li>
              <li>• Market intel on compensation, guarantees and lock-ins</li>
              <li>• Discreet approaches to targeted candidates or platforms</li>
            </ul>
            <div className="mt-5">
              <Link
                href="/apply"
                className="btn btn-secondary w-full text-sm font-medium"
              >
                Senior RM in Zurich? Submit your profile
              </Link>
            </div>
          </aside>
        </section>

        {/* Section: Compensation table */}
        <section className="mt-14 rounded-3xl border border-white/10 bg-black/40 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.75)] backdrop-blur md:p-8">
          <h2 className="text-xl font-semibold text-white">
            2024–2025 Zurich compensation benchmarks
          </h2>
          <p className="mt-3 text-sm text-neutral-300 md:text-[0.95rem]">
            The ranges below summarise typical packages we observe for Zurich
            private banks. They are indicative only and vary by platform,
            jurisdiction mix, product penetration and performance.
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
                  <td className="py-2 pr-4">25% – 70%</td>
                  <td className="py-2 pr-4">185k – 320k</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Senior RM (10–20 years)</td>
                  <td className="py-2 pr-4">190k – 260k</td>
                  <td className="py-2 pr-4">50% – 130%</td>
                  <td className="py-2 pr-4">285k – 600k</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Ultra UHNW RM</td>
                  <td className="py-2 pr-4">260k – 340k</td>
                  <td className="py-2 pr-4">90% – 220%</td>
                  <td className="py-2 pr-4">500k – 950k+</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Team Head</td>
                  <td className="py-2 pr-4">270k – 360k</td>
                  <td className="py-2 pr-4">110% – 260%</td>
                  <td className="py-2 pr-4">575k – 1.15m+</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-neutral-500">
            Ranges indicative only, based on Zurich market observations for
            2024–2025. Actual offers depend on platform, seniority, cross-border
            risk, revenue mix and proven, portable AUM.
          </p>
        </section>

        {/* Section: Internal links & insights */}
        <section className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-base font-semibold text-white">
              Related insights for Zurich bankers
            </h3>
            <p className="mt-2 text-sm text-neutral-300">
              These articles provide additional context on Swiss private
              banking, UBS, AI-driven restructuring and global hiring dynamics.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-brandGoldSoft">
              <li>
                <Link href="/insights" className="hover:underline">
                  UBS’s Silent Earthquake: 10,000 Jobs Set to Disappear by 2027
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:underline">
                  The AI Reckoning: How 5,200 Job Cuts Are Reshaping Private
                  Banking Talent
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:underline">
                  The Swiss Private Banking Talent Revolution
                </Link>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-base font-semibold text-white">
              Work with Executive Partners
            </h3>
            <p className="mt-2 text-sm text-neutral-300">
              If you lead a Zurich desk or are a Senior RM considering your next
              move, we provide discrete, fact-based guidance on platforms,
              guarantees, and long-term career positioning.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary btn-sm">
                Talk to us about Zurich hiring
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
          <a
            href="mailto:info@execpartners.ch"
            className="underline decoration-brandGold/70 underline-offset-4 hover:text-white"
          >
            info@execpartners.ch
          </a>
        </p>
      </div>
    </main>
  );
}