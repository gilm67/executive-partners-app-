/* app/private-banking-jobs-singapore/page.tsx */
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
const PAGE_PATH = "/private-banking-jobs-singapore";
const PAGE_URL = `${SITE}${PAGE_PATH}`;

type Job = {
  title: string;
  slug: string;
  location?: string;
  market?: string;
  summary?: string;
  active?: boolean;
};

/* Singapore / APAC matcher */
const SINGAPORE_WORDS =
  /(singapore|\bsg\b|marina bay|raffles place|orchard|asia pacific|apac|asean|sea|south( |-)?east asia)/i;

async function fetchSingaporeJobs(): Promise<Job[]> {
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
        .filter((j) => SINGAPORE_WORDS.test(`${j.location ?? ""} ${j.market ?? ""}`));
      if (filtered.length) return filtered.slice(0, 9);
    } catch {
      /* ignore */
    }
  }
  return [];
}

/* ---------- SEO metadata ---------- */
export const metadata: Metadata = {
  title: { absolute: "Private Banking Jobs in Singapore | Executive Partners" },
  description:
    "Explore Private Banking & Wealth Management jobs in Singapore. APAC/ASEAN mandates for Relationship Managers, Team Heads and Market Leaders serving UHNW/HNW clients.",
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: "website",
    url: PAGE_PATH,
    title: "Private Banking Jobs in Singapore | Executive Partners",
    description:
      "Live Singapore/APAC mandates. Discreet search for HNW/UHNW Relationship Managers and senior leaders with onshore and cross-border coverage.",
    images: [{ url: "/og.png" }],
    siteName: "Executive Partners",
  },
  robots: { index: true, follow: true },
};

export const revalidate = 3600;

/* ---------- page ---------- */
export default async function SingaporeLandingPage() {
  const jobs = await fetchSingaporeJobs();

  /* JSON-LD: FAQ tuned to Singapore */
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which client segments are most in demand in Singapore?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Banks in Singapore focus on UHNW/HNW clients across ASEAN, Greater China, South Asia and global families booking via Singapore. Portable, referenceable revenue is prioritised.",
        },
      },
      {
        "@type": "Question",
        name: "What regulatory expectations apply in Singapore?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Strong conduct under MAS standards with rigorous KYC/AML, suitability and cross-border governance. Documentation discipline and product appropriateness are essential.",
        },
      },
      {
        "@type": "Question",
        name: "Which languages are valued for Singapore private banking roles?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "English is standard. Mandarin is frequently valued; Bahasa Indonesia/Melayu, Hindi/Tamil and Thai/Vietnamese can help depending on desk coverage.",
        },
      },
      {
        "@type": "Question",
        name: "What signals of portability matter most?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Referenceable tenure, recurring advisory/DPM revenue, clear wallet-share narrative and a realistic transition plan aligned to Singapore booking and cross-border rules.",
        },
      },
    ],
  };

  /* JSON-LD: CollectionPage + Breadcrumb + ItemList (if jobs) */
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Private Banking Jobs in Singapore",
    url: PAGE_URL,
    description:
      "Curated mandates for Private Banking & Wealth Management across Singapore and APAC.",
    about: ["Private Banking", "Wealth Management", "Relationship Managers", "Team Heads", "UHNW", "HNW", "APAC", "ASEAN"],
    isPartOf: { "@type": "WebSite", name: "Executive Partners", url: SITE },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Jobs", item: `${SITE}/jobs` },
      { "@type": "ListItem", position: 2, name: "Singapore", item: PAGE_URL },
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
          Singapore — APAC &amp; ASEAN Private Banking
        </div>

        {/* H1 */}
        <h1 className="mt-3 text-center text-4xl font-extrabold tracking-tight md:text-5xl">
          Private Banking Jobs in Singapore
        </h1>

        {/* Intent-rich copy (~700–800 words potential) */}
        <section className="mx-auto mt-4 max-w-3xl space-y-4 text-sm leading-6 text-neutral-300">
          <p>
            Executive Partners supports leading banks, EAMs and family offices in{" "}
            <strong>Singapore</strong>, Asia’s most established cross-border hub for{" "}
            <strong>Private Banking &amp; Wealth Management</strong>. With deep capital flows
            across ASEAN, Greater China and South Asia, Singapore is a focal point for UHNW/HNW
            coverage and multi-booking strategies.
          </p>
          <p>
            Strong Singapore profiles pair credible <em>portability</em> with disciplined conduct
            under <strong>MAS</strong> standards and bank governance. Desks value balanced revenue
            (discretionary mandates and recurring advisory), realistic transition plans, and
            cross-border fluency across priority corridors.
          </p>

          <h2 className="mt-4 text-lg font-semibold text-white">What makes a strong Singapore RM profile?</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Proven UHNW/HNW coverage (ASEAN/Greater China/South Asia) with referenceable tenure
              and stable revenue.
            </li>
            <li>
              <strong>Portability</strong>: realistic wallet share, retention track record, and
              a transition plan aligned to Singapore booking and cross-border rules.
            </li>
            <li>
              <strong>Multi-product</strong> experience: advisory/DPM, Lombard and real-estate
              financing, structured solutions, and access to private markets.
            </li>
            <li>
              <strong>Compliance excellence</strong>: rigorous KYC/AML, suitability and documentation
              under MAS-aligned frameworks.
            </li>
            <li>
              Language capability depending on desk: Mandarin, Bahasa Indonesia/Melayu, Hindi/Tamil,
              Thai or Vietnamese can be advantageous.
            </li>
          </ul>

          <h2 className="mt-4 text-lg font-semibold text-white">Hiring themes in Singapore</h2>
          <p>
            Demand is consistent for ASEAN coverage with deep networks, Greater China specialists
            with robust governance, and leaders able to scale multi-market teams. Firms increasingly
            prize low-noise market behaviour, strong client outcomes, and ethical, sustainable growth.
          </p>

          <h2 className="mt-4 text-lg font-semibold text-white">Relocating to Singapore</h2>
          <p>
            Singapore attracts senior bankers from Europe and across APAC. Packages typically include
            competitive base/bonus and relocation support. We advise on work passes, onboarding, and
            realistic ramp timelines to align expectations on both sides.
          </p>

          <h2 className="mt-4 text-lg font-semibold text-white">How we work</h2>
          <p>
            We map the market discreetly, validate portability, and present actionable shortlists.
            Candidates move only with consent; clients receive calibrated, compliance-checked profiles
            aligned to strategy and booking realities. Our Swiss base and Singapore partnerships provide
            a clear vantage point on APAC hiring dynamics.
          </p>
        </section>

        {/* Visible FAQ (mirrors JSON-LD) */}
        <section className="mt-12 max-w-3xl mx-auto text-neutral-300">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-white">
                Which client segments are most in demand in Singapore?
              </h3>
              <p className="mt-1 text-sm">
                UHNW/HNW across ASEAN, Greater China and South Asia; global families booking via Singapore.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">
                What regulatory expectations apply in Singapore?
              </h3>
              <p className="mt-1 text-sm">
                MAS-aligned conduct with rigorous KYC/AML, suitability and cross-border governance.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">
                Which languages help for Singapore private banking?
              </h3>
              <p className="mt-1 text-sm">
                English and Mandarin are common; Bahasa Indonesia/Melayu, Hindi/Tamil, Thai or Vietnamese can help depending on desk.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">
                What portability signals matter most?
              </h3>
              <p className="mt-1 text-sm">
                Referenceable tenure, recurring advisory/DPM revenue, clear wallet-share story, and a compliant transition plan.
              </p>
            </div>
          </div>
        </section>

        {/* Live Singapore roles */}
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Featured Singapore Roles</h2>
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
                    {j.location || "Singapore"} {j.market ? `• ${j.market}` : ""}
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
                We’re curating Singapore roles now.{" "}
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
            <p className="text-neutral-300">Ready to discuss a Singapore mandate or a move?</p>
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
            <Link href="/private-banking-jobs-london" className="underline hover:text-white">
              London
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