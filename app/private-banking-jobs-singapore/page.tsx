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

/* Basic SG/APAC filter */
const SINGAPORE_WORDS =
  /(singapore|apac|asia[-\s]?pacific|sea|south(?:east)? asia|hong\s*kong|greater\s*china|indonesia|malaysia|thailand|philippines|vietnam)/i;

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
      /* ignore and try next */
    }
  }
  return [];
}

/* ---------- SEO metadata ---------- */
export const metadata: Metadata = {
  title: { absolute: "Private Banking Jobs in Singapore | Executive Partners" },
  description:
    "Explore Private Banking & Wealth Management jobs in Singapore. APAC mandates for Relationship Managers, Team Heads and Market Leaders covering UHNW/HNW clients.",
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: "website",
    url: PAGE_PATH,
    title: "Private Banking Jobs in Singapore | Executive Partners",
    description:
      "Live APAC mandates from Singapore. Discreet search for HNW/UHNW Relationship Managers and senior leaders across Southeast Asia and Greater China.",
    images: [{ url: "/og.png" }],
    siteName: "Executive Partners",
  },
  robots: { index: true, follow: true },
};

export const revalidate = 3600;

export default async function SingaporeLandingPage() {
  const jobs = await fetchSingaporeJobs();

  /* JSON-LD: FAQ tuned to Singapore/APAC */
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
            "Banks in Singapore focus on UHNW and HNW clients across Southeast Asia and Greater China, as well as NRI/Asia cross-border. Portable books with referenceable revenue and solid compliance history are prioritised.",
        },
      },
      {
        "@type": "Question",
        name: "What languages are valued for Singapore private banking roles?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "English is essential. Mandarin, Cantonese, Bahasa Indonesia/Melayu, Thai and Vietnamese are highly valued depending on desk coverage.",
        },
      },
      {
        "@type": "Question",
        name: "What licensing or compliance standards apply?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Roles typically require adherence to MAS standards and strong cross-border governance. Candidates with clean files, robust KYC/AML, and disciplined documentation stand out.",
        },
      },
      {
        "@type": "Question",
        name: "Do you support relocations to Singapore?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. We advise on packages, relocation, and onboarding timelines, and coordinate with clients on employment pass and licensing requirements.",
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
    about: ["Private Banking", "Wealth Management", "Relationship Managers", "Team Heads", "UHNW", "HNW"],
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
          Singapore — APAC Private Banking
        </div>

        {/* H1 */}
        <h1 className="mt-3 text-center text-4xl font-extrabold tracking-tight md:text-5xl">
          Private Banking Jobs in Singapore
        </h1>

        {/* ~750 words */}
        <section className="mx-auto mt-4 max-w-3xl space-y-4 text-sm leading-6 text-neutral-300">
          <p>
            Executive Partners partners with leading banks, EAMs and family offices in{" "}
            <strong>Singapore</strong>, Asia’s premier hub for{" "}
            <strong>Private Banking & Wealth Management</strong>. With world-class regulation and a deep product shelf,
            Singapore serves UHNW/HNW clients across Southeast Asia and Greater China, and acts as a gateway for global flows.
          </p>
          <p>
            Banks in Singapore seek Relationship Managers, Team Heads and Market Leaders who can cover{" "}
            <strong>SEA (Indonesia, Malaysia, Thailand, Vietnam, Philippines)</strong>,{" "}
            <strong>Greater China</strong> and <strong>NRI/Asia cross-border</strong>. Strong profiles combine a credible,
            referenceable book with disciplined compliance under <strong>MAS</strong> standards and robust cross-border governance.
          </p>

            <h2 className="mt-4 text-lg font-semibold text-white">What makes a strong Singapore RM profile?</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>Proven UHNW/HNW coverage across SEA/Greater China with referenceable client history.</li>
              <li>
                <strong>Portability</strong>: realistic wallet share, client retention narrative, and alignment to product shelf and booking constraints.
              </li>
              <li>
                <strong>Languages</strong>: English plus Mandarin/Cantonese and/or Bahasa/Thai/Vietnamese can be a major advantage.
              </li>
              <li>Multi-product expertise: DPM/advisory, Lombard and real-estate credit, and access to private markets.</li>
              <li>Exemplary KYC/AML and documentation discipline; clean compliance record.</li>
            </ul>

            <h2 className="mt-4 text-lg font-semibold text-white">Hiring themes in Singapore</h2>
            <p>
              Desks with a strong discretionary base and recurring advisory revenues tend to onboard faster. Demand is healthy
              for Indonesia/Malaysia coverage, broader SEA books, Greater China specialists, and leaders able to drive regional strategy.
              Clients prize resilient revenue, stable tenure and ethical, low-noise market behaviour.
            </p>

            <h2 className="mt-4 text-lg font-semibold text-white">Relocating to Singapore</h2>
            <p>
              Singapore attracts senior bankers from Europe, Hong Kong and the wider region. Packages typically include
              competitive base/bonus, relocation support and market-competitive benefits. We advise on employment passes,
              licensing timelines and realistic ramp periods, aligning expectations across hiring teams and candidates.
            </p>

            <h2 className="mt-4 text-lg font-semibold text-white">How we work</h2>
            <p>
              We map APAC markets discretely, validate portability and present <em>actionable</em> shortlists. Candidates move only
              with consent; clients receive calibrated, compliance-checked profiles aligned to strategy and booking realities. Our Geneva
              base and Singapore coverage give a unique vantage point on cross-border talent flows.
            </p>
        </section>

        {/* Visible FAQ section (mirrors JSON-LD) */}
        <section className="mt-12 max-w-3xl mx-auto text-neutral-300">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-white">
                Which client segments are most in demand in Singapore?
              </h3>
              <p className="mt-1 text-sm">
                UHNW/HNW clients across Southeast Asia and Greater China, plus NRI/Asia cross-border. Portable revenue with
                solid compliance history stands out.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">
                What languages are valued for Singapore roles?
              </h3>
              <p className="mt-1 text-sm">
                English is essential. Mandarin/Cantonese, Bahasa Indonesia/Melayu, Thai and Vietnamese are highly valued depending on coverage.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">
                What licensing/compliance standards apply?
              </h3>
              <p className="mt-1 text-sm">
                MAS standards with robust cross-border governance, rigorous KYC/AML and disciplined documentation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">
                Do you support relocations to Singapore?
              </h3>
              <p className="mt-1 text-sm">
                Yes — we advise on packages, relocation logistics, employment pass, licensing and onboarding timelines.
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