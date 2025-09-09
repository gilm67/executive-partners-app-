/* app/private-banking-jobs-new-york/page.tsx */
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
const PAGE_PATH = "/private-banking-jobs-new-york";
const PAGE_URL = `${SITE}${PAGE_PATH}`;

type Job = {
  title: string;
  slug: string;
  location?: string;
  market?: string;
  summary?: string;
  active?: boolean;
};

/* Basic New York / US filter */
const NEW_YORK_WORDS =
  /(new york|nyc|manhattan|wall street|park avenue|\bny\b|\bny,?\s*usa\b|\bus\b|\busa\b|\bunited states\b)/i;

async function fetchNewYorkJobs(): Promise<Job[]> {
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
        .filter((j) =>
          NEW_YORK_WORDS.test(`${j.location ?? ""} ${j.market ?? ""}`)
        );
      if (filtered.length) return filtered.slice(0, 9);
    } catch {
      /* ignore */
    }
  }
  return [];
}

/* ---------- SEO metadata ---------- */
export const metadata: Metadata = {
  title: { absolute: "Private Banking Jobs in New York | Executive Partners" },
  description:
    "Explore Private Banking & Wealth Management jobs in New York. US onshore & cross-border mandates for Relationship Managers, Team Heads and Market Leaders serving UHNW/HNW clients.",
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: "website",
    url: PAGE_PATH,
    title: "Private Banking Jobs in New York | Executive Partners",
    description:
      "Live New York/US mandates. Discreet search for HNW/UHNW Relationship Managers and senior leaders with US onshore and international coverage.",
    images: [{ url: "/og.png" }],
    siteName: "Executive Partners",
  },
  robots: { index: true, follow: true },
};

export const revalidate = 3600;

/* ---------- page ---------- */
export default async function NewYorkLandingPage() {
  const jobs = await fetchNewYorkJobs();

  /* JSON-LD: FAQ tuned to New York / US */
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which client segments are most in demand in New York?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Banks in New York prioritize UHNW/HNW US onshore clients, entrepreneurs, family offices and global families with US touchpoints. Select desks cover LatAm, EMEA and APAC cross-border subject to US and local rules.",
        },
      },
      {
        "@type": "Question",
        name: "What regulatory expectations apply in the US?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Strong conduct under SEC/FINRA frameworks (where applicable) with rigorous KYC/AML, suitability, Reg BI where relevant, and robust documentation. Cross-border activity is tightly governed.",
        },
      },
      {
        "@type": "Question",
        name: "Which languages help in New York private banking?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "English is essential. Spanish and Portuguese are valuable for LatAm coverage; French, Arabic, Russian and Mandarin can help for international desks.",
        },
      },
      {
        "@type": "Question",
        name: "What signals of portability matter most in the US?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Referenceable tenure, stable recurring revenues (DPM/advisory), clear wallet-share narrative, and a compliant client transition plan aligned to the US product shelf and supervision.",
        },
      },
    ],
  };

  /* JSON-LD: CollectionPage + Breadcrumb + ItemList (if jobs) */
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Private Banking Jobs in New York",
    url: PAGE_URL,
    description:
      "Curated mandates for Private Banking & Wealth Management across New York and the US.",
    about: ["Private Banking", "Wealth Management", "Relationship Managers", "Team Heads", "UHNW", "HNW"],
    isPartOf: { "@type": "WebSite", name: "Executive Partners", url: SITE },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Jobs", item: `${SITE}/jobs` },
      { "@type": "ListItem", position: 2, name: "New York", item: PAGE_URL },
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
          New York — US Onshore & Cross-Border Private Banking
        </div>

        {/* H1 */}
        <h1 className="mt-3 text-center text-4xl font-extrabold tracking-tight md:text-5xl">
          Private Banking Jobs in New York
        </h1>

        {/* ~750 words */}
        <section className="mx-auto mt-4 max-w-3xl space-y-4 text-sm leading-6 text-neutral-300">
          <p>
            Executive Partners supports leading banks, EAMs and family offices in{" "}
            <strong>New York</strong>, the US epicenter of{" "}
            <strong>Private Banking &amp; Wealth Management</strong>. The market blends
            deep domestic onshore needs with international capital flows, driving steady
            demand for seasoned Relationship Managers, Team Heads and Market Leaders.
          </p>
          <p>
            Strong New York profiles pair credible <em>portability</em> with disciplined
            compliance under <strong>SEC/FINRA</strong> supervision (where applicable) and
            bank policies. Desks value balanced revenue—discretionary mandates and recurring
            advisory income—as well as a measured growth approach that protects client outcomes.
          </p>

          <h2 className="mt-4 text-lg font-semibold text-white">
            What makes a strong New York RM profile?
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Proven UHNW/HNW coverage (US onshore, global families with US nexus) with
              referenceable tenure and stable revenue.
            </li>
            <li>
              <strong>Portability</strong>: realistic wallet share, retention track record,
              and a compliant transition plan aligned to US booking and product governance.
            </li>
            <li>
              <strong>Multi-product</strong> experience: DPM/advisory, securities-based and
              real-estate lending, structured solutions, and access to private markets.
            </li>
            <li>
              <strong>Compliance excellence</strong>: rigorous KYC/AML, suitability/Reg BI where
              relevant, and clean documentation—no shortcuts.
            </li>
            <li>
              Language capability adds value for international desks (Spanish/Portuguese,
              French, Arabic, Russian, Mandarin).
            </li>
          </ul>

          <h2 className="mt-4 text-lg font-semibold text-white">
            Hiring themes in New York
          </h2>
          <p>
            Demand is consistent for US onshore specialists with resilient, multi-year books;
            LatAm coverage with robust governance; and leaders able to scale multi-market teams.
            Firms increasingly prize low-noise market behavior, strong client outcomes, and
            ethical, sustainable growth.
          </p>

          <h2 className="mt-4 text-lg font-semibold text-white">Relocating to NYC</h2>
          <p>
            New York attracts senior bankers from Europe, LatAm and the Middle East. Packages
            include competitive base/bonus and long-term incentives. We advise on relocation,
            licensing/registration where applicable, supervision, and realistic ramp timelines,
            aligning expectations between hiring teams and candidates.
          </p>

          <h2 className="mt-4 text-lg font-semibold text-white">How we work</h2>
          <p>
            We map the market discreetly, validate portability, and present actionable shortlists.
            Candidates move only with consent; clients receive calibrated, compliance-checked profiles
            aligned to strategy. Our Swiss base and New York coverage provide a clear vantage point on
            cross-border hiring dynamics.
          </p>
        </section>

        {/* Visible FAQ Section (mirrors JSON-LD topics) */}
        <section className="mt-12 max-w-3xl mx-auto text-neutral-300">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-white">
                Which client segments are most in demand in New York?
              </h3>
              <p className="mt-1 text-sm">
                UHNW/HNW US onshore clients, entrepreneurs, family offices and global families with
                US touchpoints. Some desks also cover LatAm, EMEA and APAC cross-border under tight rules.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">What regulatory expectations apply in the US?</h3>
              <p className="mt-1 text-sm">
                SEC/FINRA frameworks (where applicable), rigorous KYC/AML, suitability/Reg BI where relevant, and
                strong documentation. Cross-border activity is highly governed.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">Which languages help in New York private banking?</h3>
              <p className="mt-1 text-sm">
                English is essential. Spanish/Portuguese help for LatAm; French, Arabic, Russian and Mandarin
                can support international desks.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">What portability signals matter most?</h3>
              <p className="mt-1 text-sm">
                Referenceable tenure, recurring revenues (DPM/advisory), a clear wallet-share story, and a compliant
                transition plan aligned to US governance.
              </p>
            </div>
          </div>
        </section>

        {/* Live New York roles */}
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Featured New York Roles</h2>
            <Link href="/jobs" className="text-sm hover:underline">
              View all jobs →
            </Link>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {jobs.length > 0 ? (
              jobs.map((j) => (
                <article
                  key={j.slug}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <h3 className="font-semibold">{j.title}</h3>
                  <p className="mt-1 text-xs text-white/70">
                    {j.location || "New York"} {j.market ? `• ${j.market}` : ""}
                  </p>
                  {j.summary ? (
                    <p className="mt-2 line-clamp-3 text-sm text-neutral-300">
                      {j.summary}
                    </p>
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
                We’re curating New York roles now.{" "}
                <Link href="/apply" className="underline underline-offset-4">
                  Submit your profile
                </Link>{" "}
                to be notified first.
              </div>
            )}
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
            <Link href="/private-banking-jobs-london" className="underline hover:text-white">
              London
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}