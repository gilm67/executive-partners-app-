/* app/private-banking-jobs-london/page.tsx */
import Link from "next/link";
import type { Metadata } from "next";

/* ---------- helpers ---------- */
function siteBase() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL ||
    "https://www.execpartners.ch";
  const url = raw.startsWith("http") ? raw : `https://${raw}`;
  return url.replace(/\/$/, "");
}
const SITE = siteBase();
const PAGE_PATH = "/private-banking-jobs-london";
const PAGE_URL = `${SITE}${PAGE_PATH}`;

type Job = {
  title: string;
  slug: string;
  location?: string;
  market?: string;
  summary?: string;
  active?: boolean;
};

/* London/UK filter (expanded) */
const LONDON_WORDS =
  /(london|mayfair|canary wharf|city of london|westminster|kensington|chelsea|marylebone|knightsbridge|belgravia|soho|the square mile|uk|united kingdom|great britain|\bgb\b|england)/i;

async function fetchLondonJobs(): Promise<Job[]> {
  const qs = new URLSearchParams({ active: "true", limit: "12" }).toString();
  const tries = [`${SITE}/api/jobs?${qs}`, `/api/jobs?${qs}`];

  for (const url of tries) {
    try {
      const r = await fetch(url, { cache: "no-store" });
      if (!r.ok) continue;
      const data = await r.json();
      const list = Array.isArray(data)
        ? data
        : Array.isArray((data as any)?.jobs)
        ? (data as any).jobs
        : [];
      const filtered = (list as Job[])
        .filter((j) => j?.active !== false)
        .filter((j) => LONDON_WORDS.test(`${j.location ?? ""} ${j.market ?? ""}`));
      if (filtered.length) return filtered.slice(0, 9);
    } catch {
      /* ignore */
    }
  }
  return [];
}

/* ---------- SEO metadata ---------- */
export const metadata: Metadata = {
  title: { absolute: "Private Banking Jobs in London | Executive Partners" },
  description:
    "Explore Private Banking & Wealth Management jobs in London. UK & cross-border mandates for Relationship Managers, Team Heads and Market Leaders serving UHNW/HNW clients.",
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: "website",
    url: PAGE_PATH,
    title: "Private Banking Jobs in London | Executive Partners",
    description:
      "Live London/UK mandates. Discreet search for HNW/UHNW Relationship Managers and senior leaders with UK onshore and international cross-border coverage.",
    images: [{ url: "/og.png" }],
    siteName: "Executive Partners",
  },
  robots: { index: true, follow: true },
};

export const revalidate = 3600;

/* ---------- page ---------- */
export default async function LondonLandingPage() {
  const jobs = await fetchLondonJobs();

  /* JSON-LD: FAQ tuned to London/UK */
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which client segments are most in demand in London?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Banks in London focus on UHNW/HNW UK onshore clients, non-dom residents, entrepreneurs, family offices and select cross-border segments (EU, Middle East, LatAm, Asia) booked via UK or international centres.",
        },
      },
      {
        "@type": "Question",
        name: "What regulatory expectations apply in the UK?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Roles require strong conduct under FCA/PRA frameworks. Clean files, robust KYC/AML, and evidence of treating customers fairly are essential. Cross-border governance is closely scrutinised.",
        },
      },
      {
        "@type": "Question",
        name: "Which languages are valued in London private banking?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "English is essential. Depending on desk focus, French, Italian, Spanish, Arabic, Russian or Mandarin can be advantageous for international coverage.",
        },
      },
      {
        "@type": "Question",
        name: "What signals of portability matter most?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Referenceable client tenure, recurring advisory or DPM revenue, clear wallet-share narrative, and a realistic transition plan that aligns with UK product shelf and documentation standards.",
        },
      },
    ],
  };

  /* JSON-LD: CollectionPage + Breadcrumb + ItemList (if we have jobs) */
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Private Banking Jobs in London",
    url: PAGE_URL,
    description:
      "Curated mandates for Private Banking & Wealth Management across London and the UK.",
    about: ["Private Banking", "Wealth Management", "Relationship Managers", "Team Heads", "UHNW", "HNW"],
    isPartOf: { "@type": "WebSite", name: "Executive Partners", url: SITE },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Jobs", item: `${SITE}/jobs` },
      { "@type": "ListItem", position: 2, name: "London", item: PAGE_URL },
    ],
  };

  const itemListJsonLd =
    jobs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: jobs.map((j, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            url: `${SITE}/jobs/${j.slug}`,
            name: j.title,
          })),
        }
      : undefined;

  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {itemListJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      ) : null}

      {/* soft background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 420px at 18% -10%, rgba(59,130,246,.16) 0%, rgba(59,130,246,0) 60%), radial-gradient(1000px 380px at 110% 0%, rgba(16,185,129,.15) 0%, rgba(16,185,129,0) 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-12">
        {/* Eyebrow */}
        <div className="mx-auto w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 shadow-sm backdrop-blur">
          London — UK Onshore &amp; Cross-Border Private Banking
        </div>

        {/* H1 */}
        <h1 className="mt-3 text-center text-4xl font-extrabold tracking-tight md:text-5xl">
          Private Banking Jobs in London
        </h1>

        {/* Intent-rich copy */}
        <section className="mx-auto mt-4 max-w-3xl space-y-4 text-sm leading-6 text-neutral-300">
          <p>
            Executive Partners supports leading banks, EAMs and family offices in{" "}
            <strong>London</strong>, one of the world’s deepest hubs for{" "}
            <strong>Private Banking &amp; Wealth Management</strong>. The UK market blends
            onshore UHNW/HNW needs with international flows from Europe, the Middle East,
            the Americas and Asia, creating high demand for seasoned Relationship Managers,
            Team Heads and Market Leaders.
          </p>
          <p>
            Strong London profiles demonstrate credible <em>portability</em>, disciplined
            compliance under <strong>FCA</strong> standards, and a thoughtful plan for
            client transition that aligns with UK booking and product realities. Desks
            value balanced revenue—discretionary mandates and recurring advisory income—
            as well as a measured approach to growth that preserves client trust.
          </p>

          <h2 className="mt-4 text-lg font-semibold text-white">
            What makes a strong London RM profile?
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Proven UHNW/HNW coverage (UK onshore, non-dom, international families) with
              referenceable tenure and stable revenue.
            </li>
            <li>
              <strong>Portability</strong>: realistic wallet share, retention track record,
              and a transition plan compatible with UK product shelf and governance.
            </li>
            <li>
              <strong>Multi-product</strong> experience: DPM/advisory, Lombard and property
              lending, structured products, and access to private markets.
            </li>
            <li>
              <strong>Compliance excellence</strong>: FCA conduct, rigorous KYC/AML, and
              clean documentation—no corners cut.
            </li>
            <li>
              Language capability (where relevant): French, Italian, Spanish, Arabic,
              Russian or Mandarin for international desks.
            </li>
          </ul>

          <h2 className="mt-4 text-lg font-semibold text-white">
            Hiring themes in London
          </h2>
          <p>
            Demand is consistent for UK onshore specialists with resilient, multi-year
            books; EU cross-border coverage with robust governance; and leaders capable
            of stabilising and scaling multi-market teams. Firms increasingly prize
            low-noise market behaviour, strong client outcomes, and ethical, sustainable growth.
          </p>

          <h2 className="mt-4 text-lg font-semibold text-white">
            Relocating to London
          </h2>
          <p>
            London attracts senior bankers from Europe, the Middle East and beyond.
            Packages typically include competitive base/bonus with long-term incentive
            potential. We advise on relocation, regulatory onboarding, and realistic
            ramp timelines, aligning expectations between candidate and hiring teams.
          </p>

          <h2 className="mt-4 text-lg font-semibold text-white">How we work</h2>
          <p>
            We map the market discreetly, validate portability, and present actionable
            shortlists. Candidates move only with consent; clients receive calibrated,
            compliance-checked profiles aligned to strategy. Our Swiss base and London
            coverage provide a clear vantage point on cross-border hiring dynamics.
          </p>
        </section>

        {/* Visible FAQ (mirrors JSON-LD) */}
        <section className="mt-12 max-w-3xl mx-auto text-neutral-300">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-white">
                Which client segments are most in demand in London?
              </h3>
              <p className="mt-1 text-sm">
                UHNW/HNW UK onshore, non-dom residents, entrepreneurs, family offices, and select international cross-border desks.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">
                What regulatory expectations apply in the UK?
              </h3>
              <p className="mt-1 text-sm">
                FCA/PRA conduct with robust KYC/AML and documented suitability. Cross-border governance is scrutinised.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">
                Which languages help in London private banking?
              </h3>
              <p className="mt-1 text-sm">
                English is essential; French, Italian, Spanish, Arabic, Russian or Mandarin can add value on international desks.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">
                What signals of portability matter most?
              </h3>
              <p className="mt-1 text-sm">
                Referenceable tenure, recurring advisory/DPM revenue, clear wallet-share narrative, and a compliant transition plan.
              </p>
            </div>
          </div>
        </section>

        {/* Live London roles */}
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Featured London Roles</h2>
            <Link href="/jobs" className="text-sm hover:underline">
              View all jobs →
            </Link>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {jobs.length > 0 ? (
              jobs.map((j) => (
                <article key={j.slug} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <h3 className="font-semibold">{j.title}</h3>
                  <p className="mt-1 text-xs text-white/70">
                    {j.location || "London"} {j.market ? `• ${j.market}` : ""}
                  </p>
                  {j.summary ? (
                    <p className="mt-2 line-clamp-3 text-sm text-neutral-300">{j.summary}</p>
                  ) : null}
                  <Link
                    href={`/jobs/${j.slug}`}
                    className="mt-3 inline-block rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
                  >
                    View details
                  </Link>
                </article>
              ))
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-neutral-300">
                We’re curating London roles now.{" "}
                <Link href="/apply" className="underline underline-offset-4">
                  Submit your profile
                </Link>{" "}
                to be notified first.
              </div>
            )}
          </div>
        </section>

        {/* CTAs */}
        <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-neutral-300">Ready to discuss a London mandate or a move?</p>
            <div className="flex gap-3">
              <Link
                href="/apply"
                className="rounded-xl bg-[#1D4ED8] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1E40AF]"
              >
                Candidates — Apply
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                Talk to us
              </Link>
            </div>
          </div>
        </section>

        {/* Explore other hubs */}
        <section className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-bold">Explore Other Hubs</h2>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <Link href="/private-banking-jobs-switzerland" className="underline hover:text-white">
              Switzerland
            </Link>
            <Link href="/private-banking-jobs-dubai" className="underline hover:text-white">
              Dubai
            </Link>
            <Link href="/private-banking-jobs-singapore" className="underline hover:text-white">
              Singapore
            </Link>
            <Link href="/private-banking-jobs-new-york" className="underline hover:text-white">
              New York
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}