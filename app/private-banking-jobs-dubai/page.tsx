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

const DUBAI_WORDS =
  /(dubai|uae|abu dhabi|middle\s*east|\bmea\b|gulf|\bgcc\b)/i;

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
    "Explore Private Banking & Wealth Management jobs in Dubai (UAE). MEA mandates for Relationship Managers, Team Heads and Market Leaders serving UHNW/HNW clients.",
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: "website",
    url: PAGE_PATH,
    title: "Private Banking Jobs in Dubai | Executive Partners",
    description:
      "Live MEA mandates from Dubai: Relationship Managers, Team Heads, Market Leaders. Discreet recruitment for UHNW/HNW private banking in the UAE.",
    images: [{ url: "/og.png" }],
    siteName: "Executive Partners",
  },
  robots: { index: true, follow: true },
};

export const revalidate = 3600;

export default async function DubaiLandingPage() {
  const jobs = await fetchDubaiJobs();

  /* ---------- JSON-LD ---------- */
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

        {/* Intent-rich copy */}
        <section className="mx-auto mt-4 max-w-3xl space-y-4 text-sm leading-6 text-neutral-300">
          <p>
            Executive Partners works with leading private banks, EAMs and family offices in{" "}
            <strong>Dubai</strong>, the Gulf’s premier hub for{" "}
            <strong>Private Banking &amp; Wealth Management</strong>. With its position between Europe and Asia,
            Dubai anchors UHNW and HNW coverage across GCC, Levant, Africa and India—and remains a key booking and advisory centre for MEA.
          </p>

          <p>
            Current mandates prioritise Relationship Managers and Team Heads with <em>portable</em> client books,
            proven revenue, and a strong compliance culture. We calibrate on booking options, credit appetite, and product
            shelf (advisory/DPM, Lombard &amp; real estate lending, private markets) to ensure business plans are realistic and durable.
          </p>

          <h2 className="mt-4 text-lg font-semibold text-white">What makes a strong Dubai RM profile?</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Referenceable UHNW/HNW coverage across GCC, Levant, Africa or India.</li>
            <li><strong>Portability</strong> with credible wallet share and retention history.</li>
            <li>Languages: Arabic and English (plus French, Hindi or Urdu depending on desk).</li>
            <li>Multi-product execution: advisory/DPM, Lombard, real estate, and private markets access.</li>
          </ul>

          <h2 className="mt-4 text-lg font-semibold text-white">Hiring themes in Dubai</h2>
          <p>
            Demand is healthy for GCC and North Africa coverage, India-focused desks, and team leaders who can drive regional strategy.
            Employers value cycle-time to decision, disciplined onboarding, and cross-border governance—often blending
            conventional and <strong>Sharia-compliant</strong> solutions.
          </p>

          <h2 className="mt-4 text-lg font-semibold text-white">Relocating to Dubai</h2>
          <p>
            Packages frequently include tax-free compensation, relocation support, housing and education benefits.
            We advise candidates on DFSA licensing, immigration steps, and realistic ramp-up timelines.
          </p>

          <h2 className="mt-4 text-lg font-semibold text-white">How we work</h2>
          <p>
            We map the market discreetly, validate portability, and present shortlists you can act on. Candidates move only with consent.
            Hiring managers get calibrated, compliance-checked profiles aligned to desk strategy. Our Geneva base and Dubai partnerships
            give us a clear view of cross-border talent flows.
          </p>
        </section>

        {/* Visible FAQ (mirrors JSON-LD) */}
        <section className="mt-12 max-w-3xl mx-auto text-neutral-300">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-white">Which client segments are most in demand in Dubai?</h3>
              <p className="mt-1 text-sm">UHNW/HNW coverage across GCC, Levant, Africa and India with referenceable revenue.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white">What languages are valued for Dubai private banking roles?</h3>
              <p className="mt-1 text-sm">Arabic and English are core; French, Hindi and Urdu can strengthen candidacy.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white">What portability is required?</h3>
              <p className="mt-1 text-sm">Credible portable wallet share, clean compliance record, and cross-border alignment.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white">Do you support relocations to Dubai?</h3>
              <p className="mt-1 text-sm">Yes—package advice, licensing guidance and onboarding timelines.</p>
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

        {/* CTAs */}
        <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-neutral-300">
              Ready to discuss a Dubai mandate or a move?
            </p>
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