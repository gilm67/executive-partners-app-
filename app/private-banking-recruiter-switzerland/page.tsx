// app/private-banking-recruiter-switzerland/page.tsx
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
const PAGE_URL = `${SITE}/private-banking-recruiter-switzerland`;

/* ---------- metadata ---------- */
export const metadata: Metadata = {
  title: {
    absolute: "Private Banking Recruiter Switzerland – Executive Partners",
  },
  description:
    "Switzerland's specialist recruiter for private banking and wealth management. Senior placements across Geneva and Zurich, with mandates in Dubai, Singapore, London and Hong Kong. 200+ completed placements, 98% retention rate.",
  alternates: {
    canonical: "/private-banking-recruiter-switzerland",
  },
  openGraph: {
    type: "website",
    url: "/private-banking-recruiter-switzerland",
    siteName: "Executive Partners",
    title: "Private Banking Recruiter Switzerland – Executive Partners",
    description:
      "Switzerland's specialist executive search boutique for Private Banking & Wealth Management: senior RMs, Investment Advisors and Team Heads across Geneva, Zurich and global wealth hubs.",
  },
  robots: { index: true, follow: true },
};

export const revalidate = 1800;

export default function PrivateBankingRecruiterSwitzerlandPage() {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    name: "Executive Partners – Private Banking Recruiter Switzerland",
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
    areaServed: ["CH", "GB", "AE", "SG", "HK"],
    sameAs: [SITE],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      {
        "@type": "ListItem",
        position: 2,
        name: "Private Banking Recruiter Switzerland",
        item: PAGE_URL,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I find a private banking recruiter in Switzerland?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Executive Partners is Switzerland's specialist recruiter exclusively focused on private banking and wealth management. Based in Geneva, we cover all major Swiss banking centres — Geneva, Zurich, Lugano — and international hubs including Dubai, Singapore, London and Hong Kong.",
        },
      },
      {
        "@type": "Question",
        name: "What AUM level do I need to be considered for a placement?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We work with relationship managers and investment advisors carrying between CHF 75m and CHF 2bn+ in AUM. The key variable is not the headline figure but the genuinely portable fraction, which our Portability Score™ assesses at the outset.",
        },
      },
      {
        "@type": "Question",
        name: "What is banker portability and why does it matter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Portability is the fraction of a banker's AUM that can realistically be transferred to a new employer. It determines the commercial value of any move and is often lower than the headline AUM figure suggests. Executive Partners assesses portability rigorously before any bank is approached.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a fee for candidates?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Never. Executive Partners operates exclusively on a success-fee model paid by the hiring institution. Our service to candidates — including portability assessment and interview preparation — is entirely free of charge.",
        },
      },
    ],
  };

  return (
    <main className="relative min-h-screen bg-[#0B0F1A] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
            Switzerland · Private Banking · Executive Search
          </p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
            Private Banking Recruiter in Switzerland
          </h1>
          <p className="mt-4 text-sm text-neutral-300 md:text-[0.95rem] leading-relaxed">
            Executive Partners is Switzerland's specialist executive search firm
            working{" "}
            <span className="font-semibold text-neutral-100">
              exclusively in private banking and wealth management
            </span>
            . Based in Geneva, we place senior relationship managers, investment
            advisors and team heads across{" "}
            <span className="font-semibold text-neutral-100">
              Geneva, Zurich and eight international hubs
            </span>
            . Every placement is assessed on factual AUM portability, revenue
            quality and long-term platform fit — before any bank is approached.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary btn-xl">
              Discuss a Switzerland mandate
            </Link>
            <Link
              href="/pdfs/private-banking-career-intelligence-2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            &gt;
              Download Career Intelligence 2026 (PDF)
            </Link>
          </div>
        </header>

        {/* Why EP */}
        <section className="mt-12 grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)]">
          <div className="space-y-4 text-sm text-neutral-200 md:text-[0.95rem] leading-relaxed">
            <h2 className="text-xl font-semibold text-white">
              Why Switzerland remains the world's leading private banking centre
            </h2>
            <p>
              Switzerland books approximately{" "}
              <span className="font-semibold">
                25% of all global cross-border private wealth
              </span>
              , split between Geneva's international and emerging market focus
              and Zurich's DACH, CEE and global UHNW franchise. Despite
              consolidation following the UBS-Credit Suisse merger, demand for
              senior front-office talent has not diminished — it has become more
              selective.
            </p>
            <p>
              Hiring banks in Switzerland today are focused on candidates who bring:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-neutral-200">
              <li>
                <span className="font-semibold">Genuinely portable AUM</span> —
                not headline figures that dissolve under a non-solicitation clause
              </li>
              <li>
                Revenue quality with{" "}
                <span className="font-semibold">
                  advisory or DPM penetration above 40%
                </span>{" "}
                and documented ROA
              </li>
              <li>
                Clean compliance profiles with no unresolved cross-border or
                suitability issues
              </li>
              <li>
                Client relationships that are{" "}
                <span className="font-semibold">personal, not institutional</span>{" "}
                — clients who follow the banker, not the brand
              </li>
            </ul>
            <p>
              Our proprietary{" "}
              <Link href="/portability" className="underline decoration-brandGold/60 underline-offset-4 hover:text-white">
                Portability Score™
              </Link>{" "}
              — a six-block, 30-point framework developed across 200+ completed
              placements — stress-tests each of these dimensions before any
              introduction is made.
            </p>
          </div>

          {/* Side card */}
          <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="text-base font-semibold text-white">
              How we support Swiss mandates
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-200">
              <li>• Senior RM & Investment Advisor placements, Geneva & Zurich</li>
              <li>• AUM portability assessment before any approach</li>
              <li>• CIS, MENA, LATAM, APAC and DACH client segment coverage</li>
              <li>• Compensation benchmarks across all Swiss booking centres</li>
              <li>• EAM sector mapping for independent asset managers</li>
              <li>• Discreet approaches to targeted candidates or platforms</li>
            </ul>
            <div className="mt-5">
              <Link
                href="/apply"
                className="btn btn-secondary w-full text-sm font-medium"
              &gt;
                Senior RM in Switzerland? Submit your profile
              </Link>
            </div>
          </aside>
        </section>

        {/* Compensation table */}
        <section className="mt-14 rounded-3xl border border-white/10 bg-black/40 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.75)] backdrop-blur md:p-8">
          <h2 className="text-xl font-semibold text-white">
            2025–2026 Switzerland compensation benchmarks
          </h2>
          <p className="mt-3 text-sm text-neutral-300 md:text-[0.95rem]">
            Indicative ranges across Geneva and Zurich private banks. Actual
            offers depend on platform, seniority, portable AUM, revenue mix and
            cross-border risk profile.
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
                  <td className="py-2 pr-4">140k – 190k</td>
                  <td className="py-2 pr-4">25% – 70%</td>
                  <td className="py-2 pr-4">175k – 320k</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Senior RM (10–20 years)</td>
                  <td className="py-2 pr-4">190k – 270k</td>
                  <td className="py-2 pr-4">50% – 140%</td>
                  <td className="py-2 pr-4">285k – 650k</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Investment Advisor</td>
                  <td className="py-2 pr-4">180k – 260k</td>
                  <td className="py-2 pr-4">40% – 120%</td>
                  <td className="py-2 pr-4">250k – 570k</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Ultra UHNW RM</td>
                  <td className="py-2 pr-4">260k – 360k</td>
                  <td className="py-2 pr-4">90% – 230%</td>
                  <td className="py-2 pr-4">510k – 1.0m+</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Team Head</td>
                  <td className="py-2 pr-4">280k – 380k</td>
                  <td className="py-2 pr-4">110% – 270%</td>
                  <td className="py-2 pr-4">590k – 1.25m+</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-neutral-500">
            Ranges indicative only, based on Switzerland market observations for
            2025–2026. Source: Executive Partners placement data.
          </p>
        </section>

        {/* FAQ section */}
        <section className="mt-14">
          <h2 className="text-xl font-semibold text-white">
            Frequently asked questions
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {[
              {
                q: "How do I find a private banking recruiter in Switzerland?",
                a: "Executive Partners is Switzerland's specialist recruiter exclusively focused on private banking and wealth management. Contact Gil M. Chalem directly at gil.chalem@execpartners.ch for a confidential discussion.",
              },
              {
                q: "What AUM level do I need to be considered?",
                a: "We work with RMs and investment advisors carrying between CHF 75m and CHF 2bn+ in AUM. The key variable is not the headline figure but the genuinely portable fraction, assessed by our Portability Score™ at the outset.",
              },
              {
                q: "Is there a fee for candidates?",
                a: "Never. We operate on a success-fee model paid by the hiring institution. Our service to candidates — portability assessment, mandate matching, interview preparation — is entirely free.",
              },
              {
                q: "Which banks do you work with in Switzerland?",
                a: "We work across the full spectrum: UBS, Julius Baer, UBP, EFG, Pictet, Lombard Odier, Mirabaud and boutique private banks and EAMs. Current active mandates are listed on our Jobs page.",
              },
            ].map(({ q, a }) => (
              <div
                key={q}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              &gt;
                <h3 className="text-sm font-semibold text-white">{q}</h3>
                <p className="mt-2 text-sm text-neutral-300 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal links */}
        <section className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-base font-semibold text-white">
              Related insights for Swiss private bankers
            </h3>
            <p className="mt-2 text-sm text-neutral-300">
              Market intelligence on Swiss private banking, compensation trends
              and career strategy from Private Wealth Pulse.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-brandGoldSoft">
              <li>
                <Link href="/insights" className="hover:underline">
                  UBS's Silent Earthquake: 10,000 Jobs Set to Disappear by 2027
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:underline">
                  The AI Reckoning: How 5,200 Job Cuts Are Reshaping Private Banking
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:underline">
                  Swiss Private Banking Compensation: Geneva vs Zurich vs Dubai
                </Link>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-base font-semibold text-white">
              Work with Executive Partners
            </h3>
            <p className="mt-2 text-sm text-neutral-300">
              Whether you are a bank with an active mandate or a senior banker
              considering your next move, the conversation starts with a direct,
              confidential call with Gil M. Chalem.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary btn-sm">
                Discuss a Switzerland mandate
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
          
            href="mailto:gil.chalem@execpartners.ch"
            className="underline decoration-brandGold/70 underline-offset-4 hover:text-white"
          >
            gil.chalem@execpartners.ch
          </a>
        </p>
      </div>
    </main>
  );
}
