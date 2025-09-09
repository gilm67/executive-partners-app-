/* app/private-banking-jobs-dubai/page.tsx */
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
const PAGE_PATH = "/private-banking-jobs-dubai";
const PAGE_URL = `${SITE}${PAGE_PATH}`;

type Job = {
  title: string;
  slug: string;
  location?: string;
  market?: string;
  summary?: string;
  active?: boolean;
};

const DUBAI_WORDS = /(dubai|uae|abu dhabi|middle\s*east|mea|gulf|gcc)/i;

async function fetchDubaiJobs(): Promise<Job[]> {
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
        .filter((j) => DUBAI_WORDS.test(`${j.location ?? ""} ${j.market ?? ""}`));
      if (filtered.length) return filtered.slice(0, 9);
    } catch {
      /* ignore and try next */
    }
  }
  return [];
}

/* ---------- SEO metadata ---------- */
export const metadata: Metadata = {
  title: { absolute: "Private Banking Jobs in Dubai | Executive Partners" },
  description:
    "Explore Private Banking & Wealth Management jobs in Dubai. MEA mandates for Relationship Managers, Team Heads and Market Leaders covering UHNW/HNW clients.",
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: "website",
    url: PAGE_PATH,
    title: "Private Banking Jobs in Dubai | Executive Partners",
    description:
      "Live MEA mandates from Dubai. Discreet search for HNW/UHNW Relationship Managers and senior leaders across the Middle East.",
    images: [{ url: "/og.png" }],
    siteName: "Executive Partners",
  },
  robots: { index: true, follow: true },
};

export const revalidate = 3600;

export default async function DubaiLandingPage() {
  const jobs = await fetchDubaiJobs();

  /* JSON-LD: FAQ (Dubai/MEA) */
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which client segments are most in demand in Dubai?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Banks in Dubai focus on UHNW/HNW clients across GCC, Levant, Africa and India. Portable books with referenceable MEA revenue are prioritised.",
        },
      },
      {
        "@type": "Question",
        name: "What languages are valued for Dubai private banking roles?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Arabic and English are most common; French, Hindi and Urdu can be valuable depending on desk coverage.",
        },
      },
      {
        "@type": "Question",
        name: "What portability is required?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Credible, referenceable UHNW/HNW coverage with realistic wallet share, a clean compliance record, and alignment with cross-border rules.",
        },
      },
      {
        "@type": "Question",
        name: "Do you support relocations to Dubai?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. We advise on packages, licensing, and onboarding timelines for senior bankers relocating to Dubai.",
        },
      },
    ],
  };

  /* JSON-LD: CollectionPage + Breadcrumb + ItemList (if we have jobs) */
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Private Banking Jobs in Dubai",
    url: PAGE_URL,
    description:
      "Curated mandates for Private Banking & Wealth Management across Dubai and the Middle East.",
    about: ["Private Banking", "Wealth Management", "Relationship Managers", "Team Heads", "UHNW", "HNW", "MEA"],
    isPartOf: { "@type": "WebSite", name: "Executive Partners", url: SITE },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Jobs", item: `${SITE}/jobs` },
      { "@type": "ListItem", position: 2, name: "Dubai", item: PAGE_URL },
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
          Dubai — Middle East &amp; Africa Private Banking
        </div>

        {/* H1 */}
        <h1 className="mt-3 text-center text-4xl font-extrabold tracking-tight md:text-5xl">
          Private Banking Jobs in Dubai
        </h1>

        {/* ~750 words */}
        <section className="mx-auto mt-4 max-w-3xl space-y-4 text-sm leading-6 text-neutral-300">
          <p>
            Executive Partners partners with leading banks and family offices in{" "}
            <strong>Dubai</strong>, the Gulf’s premier hub for{" "}
            <strong>Private Banking &amp; Wealth Management</strong>. With its strategic position between
            Europe and Asia, Dubai is the launchpad for MEA client coverage and a magnet for global UHNW
            and HNW flows.
          </p>
          <p>
            Banks in Dubai seek Relationship Managers and Team Heads who can serve clients across the
            GCC, Levant, Africa, and India. Successful candidates typically demonstrate a blend of
            <em> portable client books</em>, deep regional ties, and a strong compliance culture aligned
            with DFSA and international standards.
          </p>

          <h2 className="mt-4 text-lg font-semibold text-white">What makes a strong Dubai RM profile?</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Proven coverage of UHNW/HNW clients across MEA with referenceable history.</li>
            <li>
              <strong>Portability</strong>: evidence of client retention, realistic wallet share, and adherence to
              cross-border regulations.
            </li>
            <li>
              Languages: Arabic, English, French, Hindi or Urdu add competitive advantage for regional
              coverage.
            </li>
            <li>
              Multi-product expertise: advisory, DPM, Lombard lending, real estate financing, and access
              to private markets.
            </li>
          </ul>

          <h2 className="mt-4 text-lg font-semibold text-white">Hiring themes in Dubai</h2>
          <p>
            Demand is strong for RMs covering GCC and North Africa, India-focused bankers, and team
            leaders able to drive regional strategy. Employers prize candidates who balance revenue
            generation with regulatory discipline. A growing trend is the integration of{" "}
            <strong>Sharia-compliant solutions</strong> and private market access into advisory platforms.
          </p>

          <h2 className="mt-4 text-lg font-semibold text-white">Relocating to Dubai</h2>
          <p>
            Dubai attracts senior bankers from Europe, Asia and beyond. Packages often include tax-free
            compensation, relocation support, housing allowance and education benefits. We advise
            candidates on licensing requirements, onboarding timelines and realistic ramp-up periods.
          </p>

          <h2 className="mt-4 text-lg font-semibold text-white">How we work</h2>
          <p>
            We map the market discreetly, validate portability, and present actionable shortlists.
            Candidates move only with consent, and clients receive calibrated, compliance-checked
            profiles aligned with strategic goals. Our Geneva base and Dubai partnerships give us a
            unique vantage point on cross-border talent flows.
          </p>
        </section>

        {/* Visible FAQ (mirrors JSON-LD) */}
        <section className="mt-12 max-w-3xl mx-auto text-neutral-300">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-white">
                Which client segments are most in demand in Dubai?
              </h3>
              <p className="mt-1 text-sm">
                UHNW/HNW coverage across GCC, Levant, Africa and India with referenceable revenue.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">
                What languages are valued for Dubai private banking roles?
              </h3>
              <p className="mt-1 text-sm">
                Arabic and English are core; French, Hindi and Urdu can strengthen candidacy.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">
                What portability is required?
              </h3>
              <p className="mt-1 text-sm">
                Credible portable wallet share, clean compliance record, and cross-border alignment.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">
                Do you support relocations to Dubai?
              </h3>
              <p className="mt-1 text-sm">
                Yes—package advice, licensing guidance and onboarding timelines.
              </p>
            </div>
          </div>
        </section>

        {/* Live Dubai roles */}
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Featured Dubai Roles</h2>
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
                    {j.location || "Dubai"} {j.market ? `• ${j.market}` : ""}
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
                We’re curating Dubai roles now.{" "}
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
            <Link href="/private-banking-jobs-singapore" className="underline hover:text-white">
              Singapore
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