/* app/private-banking-jobs-switzerland/page.tsx */
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
const PAGE_URL = `${SITE}/private-banking-jobs-switzerland`;

type Job = {
  title: string;
  slug: string;
  location?: string;
  market?: string;
  summary?: string;
  active?: boolean;
};

/* CH filter: Geneva/Genève/Zurich/Zürich/Lausanne/Basel/Bern/CH/Suisse + common abbreviations */
const CH_WORDS =
  /(geneva|genève|zurich|zürich|lausanne|basel|bern|switzerland|suisse|\bch\b|\bzh\b|\bge\b)/i;

async function fetchSwissJobs(): Promise<Job[]> {
  const qs = new URLSearchParams({ active: "true", limit: "12" }).toString();
  const tries = [`${SITE}/api/jobs?${qs}`, `/api/jobs?${qs}`];

  for (const url of tries) {
    try {
      const r = await fetch(url, { cache: "no-store" });
      if (!r.ok) continue;
      const data = await r.json();
      const list = Array.isArray(data) ? data : Array.isArray((data as any)?.jobs) ? (data as any).jobs : [];
      const filtered = (list as Job[])
        .filter((j) => j?.active !== false)
        .filter((j) => CH_WORDS.test(`${j.location ?? ""} ${j.market ?? ""}`));
      if (filtered.length) return filtered.slice(0, 9);
    } catch {
      /* ignore and try next */
    }
  }
  return [];
}

/* ---------- SEO metadata ---------- */
export const metadata: Metadata = {
  title: { absolute: "Private Banking Jobs in Switzerland | Executive Partners" },
  description:
    "Explore Private Banking & Wealth Management jobs in Switzerland. Geneva, Zurich & Romandie mandates for Relationship Managers, Team Heads and Market Leaders.",
  alternates: { canonical: "/private-banking-jobs-switzerland" },
  openGraph: {
    type: "website",
    url: "/private-banking-jobs-switzerland",
    title: "Private Banking Jobs in Switzerland | Executive Partners",
    description:
      "Live Swiss mandates across Geneva, Zurich & Romandie. Discreet search for HNW/UHNW Relationship Managers and leaders.",
    images: [{ url: "/og.png" }],
    siteName: "Executive Partners",
  },
  robots: { index: true, follow: true },
};

/* ---------- page ---------- */
export const revalidate = 3600;

export default async function CHLandingPage() {
  const jobs = await fetchSwissJobs();

  /* JSON-LD: CollectionPage + Breadcrumb + ItemList + FAQ */
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Private Banking Jobs in Switzerland",
    url: PAGE_URL,
    description:
      "Curated mandates for Private Banking & Wealth Management across Switzerland (Geneva, Zurich, Romandie).",
    about: ["Private Banking", "Wealth Management", "Relationship Managers", "Team Heads", "UHNW", "HNW"],
    isPartOf: { "@type": "WebSite", name: "Executive Partners", url: SITE },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Jobs", item: `${SITE}/jobs` },
      { "@type": "ListItem", position: 2, name: "Switzerland", item: PAGE_URL },
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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which Swiss locations do you recruit for?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Primarily Geneva, Zurich and Lausanne, with roles across CH onshore as well as desks serving UK, MEA, LatAm and APAC from Switzerland.",
        },
      },
      {
        "@type": "Question",
        name: "What level of portability do clients expect?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Most mandates expect proven HNW/UHNW coverage and credible wallet portability. We assess realistic transfer potential before shortlisting.",
        },
      },
      {
        "@type": "Question",
        name: "Do you handle confidential moves and team lifts?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. We run quiet processes with strict KYC/AML and cross-border compliance, including discreet team approaches where appropriate.",
        },
      },
      {
        "@type": "Question",
        name: "How should I apply?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Apply confidentially via our Apply page with your CV and target market(s). We typically respond the same business day.",
        },
      },
    ],
  };

  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {itemListJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      ) : null}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

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
          Switzerland — Geneva • Zurich • Romandie
        </div>

        {/* H1 */}
        <h1 className="mt-3 text-center text-4xl font-extrabold tracking-tight md:text-5xl">
          Private Banking Jobs in Switzerland
        </h1>

        {/* ~700 words of targeted copy */}
        <section className="mx-auto mt-4 max-w-3xl space-y-4 text-sm leading-6 text-neutral-300">
          <p>
            Executive Partners is a Geneva-headquartered executive search firm dedicated to{" "}
            <strong>Private Banking</strong> &amp; <strong>Wealth Management</strong>. Switzerland remains the most
            mature cross-border booking centre globally, with deep client flows across Europe, Middle East, LatAm and APAC.
            We help banks, EAMs and family offices hire proven Relationship Managers (HNW/UHNW), Team Heads and Market
            Leaders who combine <em>credible portability</em> with disciplined, compliant client care.
          </p>
          <p>
            Our Swiss mandates typically cover <strong>Geneva</strong>, <strong>Zurich</strong> and wider{" "}
            <strong>Romandie</strong>, with onshore and cross-border remits. Success profiles emphasise portable revenue,
            realistic wallet share, booking-centre fit, and adherence to FINMA documentation standards. We calibrate with
            the business on <em>realistic</em> time-to-ramp and compensation design so hires both perform and stay.
          </p>

          <h2 className="mt-4 text-lg font-semibold text-white">What makes a strong Swiss RM profile?</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Proven coverage</strong> of defined client geographies (CH onshore, EU cross-border, MEA, LatAm) with
              referenceable relationships.
            </li>
            <li>
              <strong>Portability signals</strong>: client retention history, referral ecosystem, and a narrative consistent
              with cross-border rules and product shelf.
            </li>
            <li>
              <strong>Advisory breadth</strong>: discretionary/advisory mandates, credit (Lombard/RE), and private markets access.
            </li>
            <li>
              <strong>Compliance excellence</strong>: FINMA-grade files, clean documentation, and disciplined communication.
            </li>
          </ul>

          <h2 className="mt-4 text-lg font-semibold text-white">Current hiring themes</h2>
          <p>
            Banks are prioritising steady, multi-year books over one-off wins. Desks with a balanced mix of discretionary
            mandates and recurring advisory revenue tend to onboard more smoothly. Demand is healthy for CH Onshore,
            Portugal/LatAm diaspora in Geneva, MEA coverage from Zurich, and select UK/US cross-border specialists with
            robust governance.
          </p>

          <h2 className="mt-4 text-lg font-semibold text-white">How we work</h2>
          <p>
            We map the market, validate portability and present shortlists you can act on. For candidates, we share roles
            discreetly and move only with consent. For hiring managers, we stress-test the commercial plan and timeline
            before approach work so processes run quietly and efficiently.
          </p>
        </section>

        {/* Live Swiss roles */}
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Featured Swiss Roles</h2>
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
                    {j.location || "Switzerland"} {j.market ? `• ${j.market}` : ""}
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
                We’re curating Swiss roles now.{" "}
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
              Ready to discuss a Swiss mandate or a move?
            </p>
            <div className="flex gap-3">
              <Link
                href="/apply"
                className="rounded-xl bg-[#1D4ED8] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1E40AF]"
              >
                Candidates — Apply
              </Link>
              <Link
                href="/hiring-managers"
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                Hiring Managers — Hire Talent
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

        {/* Visible FAQ to support FAQ JSON-LD */}
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-bold">FAQ</h2>
          <div className="mt-4 space-y-4 text-sm text-neutral-300">
            <div>
              <div className="font-semibold text-white">Which Swiss locations do you recruit for?</div>
              <p>Geneva, Zurich and Lausanne, plus desks serving international markets from Switzerland.</p>
            </div>
            <div>
              <div className="font-semibold text-white">What portability is expected?</div>
              <p>Credible wallet portability with verified client relationships and booking feasibility.</p>
            </div>
            <div>
              <div className="font-semibold text-white">Do you manage confidential moves and teams?</div>
              <p>Yes—quiet processes with strict compliance and governance checks.</p>
            </div>
            <div>
              <div className="font-semibold text-white">How do I apply?</div>
              <p>
                Use the <Link href="/apply" className="underline underline-offset-4 hover:text-white">
                  Apply page
                </Link>. We typically respond the same business day.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}