/* app/private-banking-jobs-geneva/page.tsx */
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
const PAGE_PATH = "/private-banking-jobs-geneva";
const PAGE_URL = `${SITE}${PAGE_PATH}`;

type Job = {
  title: string;
  slug: string;
  location?: string;
  market?: string;
  summary?: string;
  active?: boolean;
};

/* Geneva/Romandie filter (expanded) */
const GENEVA_WORDS =
  /(geneva|genève|romandie|lausanne|vaud|vevey|nyon|morges|carouge|léman|switzerland|suisse|\bch\b)/i;

async function fetchGenevaJobs(): Promise<Job[]> {
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
        .filter((j) => GENEVA_WORDS.test(`${j.location ?? ""} ${j.market ?? ""}`));
      if (filtered.length) return filtered.slice(0, 9);
    } catch { /* ignore */ }
  }
  return [];
}

/* ---------- SEO metadata ---------- */
export const metadata: Metadata = {
  title: { absolute: "Private Banking Jobs in Geneva | Executive Partners" },
  description:
    "Explore Private Banking & Wealth Management jobs in Geneva (Romandie). Mandates for Relationship Managers, Team Heads and Market Leaders serving HNW/UHNW clients.",
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: "website",
    url: PAGE_PATH,
    title: "Private Banking Jobs in Geneva | Executive Partners",
    description:
      "Live Geneva & Romandie mandates. Discreet search for HNW/UHNW Relationship Managers and senior leaders in Switzerland.",
    images: [{ url: "/og.webp" }],
    siteName: "Executive Partners",
  },
  robots: { index: true, follow: true },
};

export const revalidate = 3600;

/* ---------- page ---------- */
export default async function GenevaLandingPage() {
  const jobs = await fetchGenevaJobs();

  /* JSON-LD: FAQ + Collection + Breadcrumb + ItemList */
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which client segments are most in demand in Geneva?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Banks prioritise UHNW/HNW onshore Switzerland and cross-border Europe/LatAm/MEA via Geneva. Portable revenue with clean compliance is key.",
        },
      },
      {
        "@type": "Question",
        name: "Which languages help in Geneva private banking?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "English and French are standard. Portuguese, Italian, Arabic or Spanish can help for specific desks.",
        },
      },
      {
        "@type": "Question",
        name: "What portability signals matter in Switzerland?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Referenceable tenure, recurring discretionary/advisory revenue, credible wallet share and FINMA-grade documentation.",
        },
      },
      {
        "@type": "Question",
        name: "Do you support relocations to Geneva?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes—advice on packages, permits and onboarding timelines for senior hires.",
        },
      },
    ],
  };

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Private Banking Jobs in Geneva",
    url: PAGE_URL,
    description:
      "Curated Private Banking & Wealth Management mandates across Geneva and Romandie.",
    about: ["Private Banking", "Wealth Management", "Relationship Managers", "Team Heads", "UHNW", "HNW", "Romandie"],
    isPartOf: { "@type": "WebSite", name: "Executive Partners", url: SITE },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Jobs", item: `${SITE}/jobs` },
      { "@type": "ListItem", position: 2, name: "Geneva", item: PAGE_URL },
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

      {/* bg */}
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
          Geneva — Switzerland (Romandie) Private Banking
        </div>

        {/* H1 */}
        <h1 className="mt-3 text-center text-4xl font-extrabold tracking-tight md:text-5xl">
          Private Banking Jobs in Geneva
        </h1>

        {/* Intent-rich copy */}
        <section className="mx-auto mt-4 max-w-3xl space-y-4 text-sm leading-6 text-neutral-300">
          <p>
            Executive Partners supports banks, EAMs and family offices in <strong>Geneva</strong>, a core
            Swiss booking centre for <strong>Private Banking &amp; Wealth Management</strong>. The Romandie market blends
            onshore Swiss needs with cross-border flows, creating steady demand for seasoned Relationship Managers,
            Team Heads and Market Leaders.
          </p>
          <p>
            Strong Geneva profiles pair credible <em>portability</em> with disciplined FINMA-grade compliance.
            Desks value balanced, recurring revenues (discretionary and advisory) and measured growth that preserves
            client outcomes and confidentiality.
          </p>

          <h2 className="mt-4 text-lg font-semibold text-white">What makes a strong Geneva RM profile?</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Referenceable UHNW/HNW coverage (CH onshore and EU/LatAm/MEA cross-border where appropriate).</li>
            <li><strong>Portability</strong>: realistic wallet share, retention history and booking-centre fit.</li>
            <li>Multi-product expertise (DPM/advisory, Lombard/property credit, structured solutions, private markets).</li>
            <li>Exemplary KYC/AML and documentation discipline.</li>
            <li>Languages: French and English; Portuguese/Spanish/Arabic a plus depending on desk.</li>
          </ul>

          <h2 className="mt-4 text-lg font-semibold text-white">Hiring themes in Geneva</h2>
          <p>
            Demand is healthy for CH onshore, Portugal/LatAm diaspora, MEA specialists, and leaders able to scale
            discreetly. Firms prize low-noise processes, stable tenure and ethical, sustainable growth.
          </p>

          <h2 className="mt-4 text-lg font-semibold text-white">How we work</h2>
          <p>
            We map the market, validate portability and present <em>actionable</em> shortlists. Candidates move only with consent;
            clients receive calibrated, compliance-checked profiles aligned to strategy and booking realities.
          </p>
        </section>

        {/* Visible FAQ */}
        <section className="mt-12 max-w-3xl mx-auto text-neutral-300">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-white">Which client segments are most in demand in Geneva?</h3>
              <p className="mt-1 text-sm">UHNW/HNW onshore Switzerland and cross-border Europe/LatAm/MEA.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white">Which languages help?</h3>
              <p className="mt-1 text-sm">French and English; Portuguese/Spanish/Arabic depending on desk.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white">What portability is required?</h3>
              <p className="mt-1 text-sm">Referenceable revenue, realistic wallet share and FINMA-grade files.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white">Do you support relocations?</h3>
              <p className="mt-1 text-sm">Yes—packages, permits and onboarding timelines.</p>
            </div>
          </div>
        </section>

        {/* Live roles */}
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Featured Geneva Roles</h2>
            <Link href="/jobs" className="text-sm hover:underline">View all jobs →</Link>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {jobs.length > 0 ? (
              jobs.map((j) => (
                <article key={j.slug} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <h3 className="font-semibold">{j.title}</h3>
                  <p className="mt-1 text-xs text-white/70">
                    {j.location || "Geneva"} {j.market ? `• ${j.market}` : ""}
                  </p>
                  {j.summary ? <p className="mt-2 line-clamp-3 text-sm text-neutral-300">{j.summary}</p> : null}
                  <Link href={`/jobs/${j.slug}`} className="mt-3 inline-block rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/15">
                    View details
                  </Link>
                </article>
              ))
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-neutral-300">
                We’re curating Geneva roles now. <Link href="/apply" className="underline underline-offset-4">Submit your profile</Link> to be notified first.
              </div>
            )}
          </div>
        </section>

        {/* CTAs */}
        <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-neutral-300">Ready to discuss a Geneva mandate or a move?</p>
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
            <Link href="/private-banking-jobs-zurich" className="underline hover:text-white">Zurich</Link>
            <Link href="/private-banking-jobs-switzerland" className="underline hover:text-white">Switzerland</Link>
            <Link href="/private-banking-jobs-dubai" className="underline hover:text-white">Dubai</Link>
            <Link href="/private-banking-jobs-singapore" className="underline hover:text-white">Singapore</Link>
            <Link href="/private-banking-jobs-london" className="underline hover:text-white">London</Link>
            <Link href="/private-banking-jobs-new-york" className="underline hover:text-white">New York</Link>
          </div>
        </section>
      </div>
    </main>
  );
}