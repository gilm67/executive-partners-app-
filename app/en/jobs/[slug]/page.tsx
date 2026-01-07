// app/en/jobs/[slug]/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Adjust if your MarkdownLite path differs
import MarkdownLite from "@/app/jobs/MarkdownLite";

import ExpressInterestForm from "@/components/ExpressInterestForm";
import ConfidentialProcessFAQ from "@/components/ConfidentialProcessFAQ";

import {
  getJobBySlug as getCanonicalJobBySlug,
  jobsList as canonicalJobs,
} from "@/data/jobs";

/* ---------------- Types ---------------- */
type Market =
  | "CH"
  | "UK"
  | "UAE"
  | "SG"
  | "HK"
  | "US"
  | "EU"
  | "BR"
  | "LATAM"
  | "GLOBAL";

type Job = {
  id?: string;
  title: string;
  location: string;
  market?: string;
  seniority?: string;
  summary?: string;
  slug: string;
  confidential?: boolean;
  active?: boolean;
  createdAt?: string;
  body?: string;

  overview?: string[];
  responsibilities?: string[];
  qualifications?: string[];
  offer?: string[];
  compliance?: string[];
};

const HIDDEN_SLUGS = new Set<string>([
  "senior-relationship-manager-ch-onshore-4",
  "senior-relationship-manager-brazil-2",
  "private-banker-mea-2",
]);

export const revalidate = 900;
export const dynamicParams = true;

export function generateStaticParams() {
  const canon = Array.isArray(canonicalJobs)
    ? canonicalJobs
        .map((j: any) => (j?.slug ? String(j.slug).trim() : ""))
        .filter(Boolean)
        .map((slug: string) => ({ slug }))
    : [];
  return canon;
}

/* ---------------- Utils ---------------- */
function norm(s: string | undefined) {
  return (s ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-|-$/g, "");
}

function siteBase() {
  const env =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "https://www.execpartners.ch";
  const url = env.startsWith("http") ? env : `https://${env}`;
  return url.replace(/\/$/, "");
}

/** Basic HTML escape (for JSON-LD description) */
function escapeHTML(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function toHtmlLines(s: string) {
  return escapeHTML(s).replace(/\n/g, "<br/>");
}

/** Map common locations to ISO 3166-1 alpha-2 country codes */
function countryForLocation(loc?: string): string | undefined {
  if (!loc) return undefined;
  const L = loc.toLowerCase();
  if (/(?:\bgeneva\b|\bzurich\b|\blausanne\b|\bswitzerland\b|\bch\b)/.test(L))
    return "CH";
  if (/(?:\bdubai\b|\buae\b|\bunited arab emirates\b)/.test(L)) return "AE";
  if (/\bsingapore\b/.test(L)) return "SG";
  if (/(?:\bhong\s*kong\b|\bhk\b)/.test(L)) return "HK";
  if (/(?:\blondon\b|\buk\b|\bunited kingdom\b|\bgb\b)/.test(L)) return "GB";
  if (/(?:\bnew york\b|\bnyc\b|\busa\b|\bunited states\b|\bus\b)/.test(L))
    return "US";
  if (/(?:\bportugal\b|\blisbon\b|\bporto\b)/.test(L)) return "PT";
  if (/(?:\bbrazil\b|\bsão paulo\b|\bsao paulo\b|\brio\b)/.test(L)) return "BR";
  return undefined;
}

/* ---------------- Content helpers ---------------- */

const COMP_BLOCK = `
### Compensation
Compensation is highly competitive and structured according to seniority, experience, and the business plan presented (AUM, NNM, and the client portfolio).
`.trim();

function withCompensation(text: string) {
  const t = (text || "").trim();
  return /(^|\n)###\s+Compensation\b/i.test(t)
    ? t
    : `${t}\n\n${COMP_BLOCK}`.trim();
}

function titleFromSlug(slug: string) {
  const cleaned = slug
    .replace(/[-_]+/g, " ")
    .replace(/\bch\b/i, "CH")
    .trim();
  return cleaned
    ? cleaned.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1))
    : "Private Banking Role";
}

function inferMarket(job: Job): string | undefined {
  if (job.market && job.market.trim()) return job.market.trim();
  const h = `${norm(job.slug)}-${norm(job.title)}-${norm(job.location)}`;
  if (h.includes("ch-onshore")) return "Switzerland (Onshore)";
  if (h.includes("mea")) return "Middle East & Africa (MEA)";
  if (h.includes("brazil")) return "Brazil (LatAm)";
  if (h.includes("portugal")) return "Portugal (LatAm/Europe)";
  if (h.includes("hong-kong") || h.includes("hk") || h.includes("greater-china"))
    return "Hong Kong / Greater China";
  if (h.includes("singapore") || h.includes("apac")) return "APAC";
  return undefined;
}

function buildApplyHref(job: Job) {
  const params = new URLSearchParams();
  if (job.title) params.set("role", job.title);
  const m = inferMarket(job);
  if (m) params.set("market", m);
  if (job.slug) params.set("jobId", job.slug);
  return `/en/apply?${params.toString()}`;
}

/** Prefer structured arrays if present, else body, else summary */
function buildBodyMarkdown(job: Job) {
  const blocks: string[] = [];
  const j: any = job;

  const hasSections =
    (Array.isArray(j.overview) && j.overview.length) ||
    (Array.isArray(j.responsibilities) && j.responsibilities.length) ||
    (Array.isArray(j.qualifications) && j.qualifications.length) ||
    (Array.isArray(j.compliance) && j.compliance.length) ||
    (Array.isArray(j.offer) && j.offer.length);

  if (hasSections) {
    if (Array.isArray(j.overview) && j.overview.length) {
      blocks.push(
        "### Overview\n" + j.overview.map((x: string) => `- ${x}`).join("\n")
      );
    }
    if (Array.isArray(j.responsibilities) && j.responsibilities.length) {
      blocks.push(
        "### Key Responsibilities\n" +
          j.responsibilities.map((x: string) => `- ${x}`).join("\n")
      );
    }
    if (Array.isArray(j.qualifications) && j.qualifications.length) {
      blocks.push(
        "### Qualifications\n" +
          j.qualifications.map((x: string) => `- ${x}`).join("\n")
      );
    }
    if (Array.isArray(j.compliance) && j.compliance.length) {
      blocks.push(
        "### Regulatory & Compliance\n" +
          j.compliance.map((x: string) => `- ${x}`).join("\n")
      );
    }
    if (Array.isArray(j.offer) && j.offer.length) {
      blocks.push(
        "### What We Offer\n" + j.offer.map((x: string) => `- ${x}`).join("\n")
      );
    }
  }

  const raw =
    (job.body?.trim() ||
      (blocks.length ? blocks.join("\n\n") : "") ||
      job.summary ||
      "").trim();

  const base =
    raw ||
    "Details available upon request. Executive Partners shares full information after a confidential qualification call.";

  return withCompensation(base);
}

function firstNonEmpty(...vals: Array<string | undefined | null>) {
  for (const v of vals) {
    const t = (v ?? "").trim();
    if (t) return t;
  }
  return "";
}

function pickHighlights(job: Job) {
  const out: string[] = [];
  const push = (s?: string) => {
    const t = (s ?? "").trim();
    if (t) out.push(t);
  };

  const j: any = job;
  if (Array.isArray(j.overview)) j.overview.slice(0, 2).forEach(push);
  if (Array.isArray(j.responsibilities)) j.responsibilities.slice(0, 2).forEach(push);
  if (Array.isArray(j.qualifications)) j.qualifications.slice(0, 1).forEach(push);

  return out.slice(0, 4);
}

/* ---------- Resolver ---------- */
async function resolveJobBySlug(
  requestedSlug: string
): Promise<{ job: Job | null; isFallback: boolean }> {
  const wanted = norm(requestedSlug);

  const exactRaw = (getCanonicalJobBySlug(requestedSlug) as Job | null) ?? null;
  if (exactRaw) return { job: exactRaw, isFallback: false };

  const exactNorm = (getCanonicalJobBySlug(wanted) as Job | null) ?? null;
  if (exactNorm) return { job: exactNorm, isFallback: false };

  const fuzzy =
    (canonicalJobs as any[]).find((j) => norm(j?.slug) === wanted) ||
    (canonicalJobs as any[]).find((j) => norm(j?.slug).startsWith(wanted)) ||
    (canonicalJobs as any[]).find((j) => wanted.startsWith(norm(j?.slug)));

  if (fuzzy) return { job: fuzzy as Job, isFallback: false };

  const fallback: Job = {
    slug: requestedSlug,
    title: titleFromSlug(requestedSlug),
    location: "Confidential",
    market: "Private Banking",
    seniority: "Director / Executive Director",
    summary:
      "Confidential private banking mandate via Executive Partners. Full details shared after qualification.",
    confidential: true,
    active: true,
  };

  return { job: fallback, isFallback: true };
}

/* ---------------- Market-aware form config ---------------- */
type FormConfig = {
  market: Market;
  locationLabel: string;
  aumLabel: string;
  aumOptions: string[];
};

function getFormConfig(job: Job): FormConfig {
  const loc = (job.location || "").toLowerCase();
  const mk = (job.market || inferMarket(job) || "").toLowerCase();
  const slug = norm(job.slug);
  const title = (job.title || "").toLowerCase();
  const hint = `${loc} ${mk} ${slug} ${title}`;

  if (/(geneva|zurich|lausanne|switzerland|\bch\b)/.test(hint)) {
    return {
      market: "CH",
      locationLabel: "Geneva / Zurich (Switzerland)",
      aumLabel: "Portable AUM (Switzerland)",
      aumOptions: ["< 20M", "20–50M", "50–100M", "100–200M", "> 200M"],
    };
  }

  if (/(dubai|uae|united arab emirates|difc|\bae\b)/.test(hint)) {
    return {
      market: "UAE",
      locationLabel: "Dubai (DIFC)",
      aumLabel: "Portable AUM (MENA / International)",
      aumOptions: ["< 25M", "25–50M", "50–100M", "100–200M", "> 200M"],
    };
  }

  if (/(london|united kingdom|\buk\b|\bgb\b)/.test(hint)) {
    return {
      market: "UK",
      locationLabel: "London (United Kingdom)",
      aumLabel: "Portable AUM (UK / International)",
      aumOptions: ["< 10M", "10–25M", "25–50M", "50–100M", "> 100M"],
    };
  }

  if (/(singapore|\bsg\b)/.test(hint)) {
    return {
      market: "SG",
      locationLabel: "Singapore",
      aumLabel: "Portable AUM (APAC)",
      aumOptions: ["< 10M", "10–25M", "25–50M", "50–100M", "> 100M"],
    };
  }

  if (/(hong kong|\bhk\b|greater china|china)/.test(hint)) {
    return {
      market: "HK",
      locationLabel: "Hong Kong",
      aumLabel: "Portable AUM (Greater China / APAC)",
      aumOptions: ["< 10M", "10–25M", "25–50M", "50–100M", "> 100M"],
    };
  }

  if (/(new york|nyc|miami|united states|\busa\b|\bus\b)/.test(hint)) {
    return {
      market: "US",
      locationLabel: "United States",
      aumLabel: "Portable AUM (US / International)",
      aumOptions: ["< 10M", "10–25M", "25–50M", "50–100M", "> 100M"],
    };
  }

  if (/(brazil|sao paulo|são paulo|rio|latam)/.test(hint)) {
    return {
      market: "BR",
      locationLabel: "Brazil / LatAm",
      aumLabel: "Portable AUM (Brazil / LatAm)",
      aumOptions: ["< 50M", "50–100M", "100–200M", "> 200M"],
    };
  }

  return {
    market: "GLOBAL",
    locationLabel: job.location || "Location discussed",
    aumLabel: "Portable AUM",
    aumOptions: ["< 25M", "25–50M", "50–100M", "100–200M", "> 200M"],
  };
}

/* ---------------- Metadata ---------------- */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const base = siteBase();

  const { job, isFallback } = await resolveJobBySlug(slug);
  if (!job) {
    return {
      title: "Role | Executive Partners",
      robots: { index: false, follow: true },
    };
  }

  const title = `${job.title} | Executive Partners`;
  const description =
    job.summary ??
    "Confidential private banking mandate via Executive Partners. Apply discretely.";

  const canonical = `${base}/en/jobs/${encodeURIComponent(slug)}`;
  const applyTarget = `${base}${buildApplyHref(job)}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      images: [{ url: `${base}/og.png` }],
    },
    robots: isFallback
      ? { index: false, follow: true }
      : job.active === false || HIDDEN_SLUGS.has(job.slug)
        ? { index: false, follow: true }
        : { index: true, follow: true },
    other: { "apply:target": applyTarget },
  };
}

/* ---------------- Page ---------------- */
export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { job, isFallback } = await resolveJobBySlug(slug);

  if (!job || job.active === false || HIDDEN_SLUGS.has(job.slug)) {
    notFound();
  }

  const base = siteBase();
  const canonicalUrl = `${base}/en/jobs/${encodeURIComponent(slug)}`;
  const datePostedISO = job.createdAt
    ? new Date(job.createdAt).toISOString()
    : new Date().toISOString();

  const validThroughISO = (() => {
    const d = job.createdAt ? new Date(job.createdAt) : new Date();
    d.setDate(d.getDate() + 60);
    return d.toISOString();
  })();

  const applyHref = buildApplyHref(job);

  const cfg = getFormConfig(job);

  const createdFmt = job.createdAt
    ? new Date(job.createdAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : undefined;

  const marketLabel = job.market || inferMarket(job) || "Private Banking";

  // Build the markdown for the left "full description" (still used + JSON-LD)
  const body = buildBodyMarkdown(job);

  const country = countryForLocation(job.location);

  const jobPosting = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: toHtmlLines(body),
    datePosted: datePostedISO,
    validThrough: validThroughISO,
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "Confidential (via Executive Partners)",
      url: base,
      sameAs: base,
    },
    employmentAgency: {
      "@type": "Organization",
      name: "Executive Partners",
      url: base,
      sameAs: base,
    },
    ...(job.location && {
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: job.location,
          ...(country ? { addressCountry: country } : {}),
        },
      },
    }),
    industry: marketLabel,
    directApply: true,
    url: canonicalUrl,
    isAccessibleForFree: true,
    potentialAction: { "@type": "ApplyAction", target: `${base}${applyHref}` },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Jobs", item: `${base}/en/jobs` },
      { "@type": "ListItem", position: 2, name: job.title, item: canonicalUrl },
    ],
  };

  const replacer = (_k: string, v: unknown) => (v === undefined ? undefined : v);

  // Premium “executive summary”
  const summary =
    firstNonEmpty(job.summary) ||
    (isFallback
      ? "Confidential private banking mandate via Executive Partners. Full details are shared after a short qualification call."
      : "Confidential private banking opportunity. Details shared after a short qualification call.");

  const highlights = pickHighlights(job);

  const SectionCard = ({
    title,
    subtitle,
    children,
  }: {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
  }) => (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_1px_3px_rgba(0,0,0,.25)]">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-white">{title}</h2>
          {subtitle ? <p className="mt-1 text-xs text-white/60">{subtitle}</p> : null}
        </div>
        <div className="h-px w-10 bg-[#d4af37]/50" />
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );

  const BulletList = ({ items }: { items: string[] }) => (
    <ul className="space-y-2 text-sm text-white/75">
      {items.map((t, i) => (
        <li key={`${t}-${i}`} className="flex gap-2">
          <span className="mt-[2px] text-[#d4af37]/80">•</span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPosting, replacer) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb, replacer) }}
      />

      {/* soft ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 420px at 18% -10%, rgba(201,161,74,.16) 0%, rgba(201,161,74,0) 60%), radial-gradient(1000px 380px at 110% 0%, rgba(245,231,192,.12) 0%, rgba(245,231,192,0) 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-5xl px-4 py-10">
        {/* Header Card */}
        <section className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.03))] p-6 shadow-[0_1px_3px_rgba(0,0,0,.25)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-brandGoldSoft to-brandGold px-2.5 py-1 text-xs font-semibold text-black shadow-sm">
                  {marketLabel}
                </span>

                {job.confidential ? (
                  <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-xs font-medium">
                    Confidential
                  </span>
                ) : null}

                {createdFmt ? (
                  <span className="text-xs text-white/70">Posted {createdFmt}</span>
                ) : null}

                {isFallback ? (
                  <span className="text-xs text-white/60">
                    (Legacy link – details shared after qualification)
                  </span>
                ) : null}
              </div>

              <h1 className="mt-2 text-2xl font-bold leading-tight md:text-3xl">
                {job.title}
              </h1>

              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/80">
                <span>{job.location}</span>
                {job.seniority ? <span>{job.seniority}</span> : null}
              </div>
            </div>

            <div className="flex w-full items-center gap-3 md:w-auto">
              <Link
                href={applyHref}
                className="inline-flex flex-1 items-center justify-center rounded-xl bg-brandGold/20 px-4 py-2 text-sm font-semibold text-brandGoldPale transition hover:bg-brandGold/30 hover:text-white md:flex-none"
              >
                Apply / Submit CV
              </Link>
              <Link
                href="/en/contact"
                className="hidden items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 md:inline-flex"
              >
                Talk to us
              </Link>
            </div>
          </div>
        </section>

        {/* CONTENT GRID */}
        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_420px]">
          {/* Left: Premium job layout */}
          <div className="space-y-6">
            {/* Executive Summary */}
            <section className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.03))] p-6 shadow-[0_1px_3px_rgba(0,0,0,.25)]">
              <div className="flex items-center justify-between gap-3">
                <div className="text-xs uppercase tracking-wider text-white/60">
                  Executive Summary
                </div>
                <div className="h-px w-12 bg-[#d4af37]/50" />
              </div>

              <p className="mt-3 text-sm leading-relaxed text-white/80">{summary}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  {job.location}
                </span>
                {job.seniority ? (
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                    {job.seniority}
                  </span>
                ) : null}
                <span className="rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-3 py-1 text-xs text-[#d4af37]">
                  Response within 24h
                </span>
                <span className="rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-3 py-1 text-xs text-[#d4af37]">
                  Strict confidentiality
                </span>
              </div>

              {highlights.length ? (
                <div className="mt-5 rounded-xl border border-white/10 bg-black/15 p-4">
                  <div className="text-xs uppercase tracking-wider text-white/60">
                    Key Highlights
                  </div>
                  <div className="mt-3">
                    <BulletList items={highlights} />
                  </div>
                </div>
              ) : null}
            </section>

            {/* Structured sections (if present) */}
            {Array.isArray(job.overview) && job.overview.length ? (
              <SectionCard title="Overview" subtitle="What you will own and drive">
                <BulletList items={job.overview} />
              </SectionCard>
            ) : null}

            {Array.isArray(job.responsibilities) && job.responsibilities.length ? (
              <SectionCard
                title="Key Responsibilities"
                subtitle="Core objectives and execution priorities"
              >
                <BulletList items={job.responsibilities} />
              </SectionCard>
            ) : null}

            {Array.isArray(job.qualifications) && job.qualifications.length ? (
              <SectionCard title="Qualifications" subtitle="What we typically see in successful profiles">
                <BulletList items={job.qualifications} />
              </SectionCard>
            ) : null}

            {Array.isArray(job.offer) && job.offer.length ? (
              <SectionCard title="What We Offer" subtitle="Platform, support and upside">
                <BulletList items={job.offer} />
              </SectionCard>
            ) : null}

            {Array.isArray(job.compliance) && job.compliance.length ? (
              <SectionCard title="Regulatory & Compliance" subtitle="Cross-border and governance expectations">
                <BulletList items={job.compliance} />
              </SectionCard>
            ) : null}

            {/* Full description (kept for SEO + detail) */}
            <SectionCard title="Full Description" subtitle="Complete mandate outline (confidential)">
              <div className="prose prose-invert max-w-none prose-p:text-white/80 prose-li:text-white/75 prose-headings:text-white">
                <MarkdownLite text={body} />
              </div>
            </SectionCard>
          </div>

          {/* Right: Express interest */}
          <aside className="h-fit self-start rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_60px_rgba(0,0,0,0.25)] lg:sticky lg:top-24 lg:mb-16 lg:max-h-[calc(100vh-7rem)] lg:overflow-auto lg:pr-3">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-wider text-white/60">
                Express interest
              </div>
              <div className="h-px w-10 bg-[#d4af37]/60" />
            </div>

            <p className="mt-3 text-sm text-white/70">
              No CV required at this stage. We respond within 24 hours (confidential).
            </p>

            <div className="mt-5">
              <ExpressInterestForm
                compact
                jobId={job.id ?? job.slug ?? slug}
                jobTitle={job.title}
                market={cfg.market}
                locationLabel={cfg.locationLabel}
                aumLabel={cfg.aumLabel}
                portableAumOptions={cfg.aumOptions}
              />
            </div>

            <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs text-white/60">
              Prefer email? Use our{" "}
              <Link
                className="text-white underline decoration-white/25 underline-offset-4 hover:decoration-white/60"
                href="/en/contact"
              >
                contact page
              </Link>
              .
            </div>

            <div className="mt-5">
              <ConfidentialProcessFAQ compact />
            </div>
          </aside>
        </section>

        {/* Footer CTA */}
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-neutral-300 md:text-left">
              We share <span className="font-semibold">confidential</span> mandates directly
              with qualified bankers.
            </p>
            <div className="flex gap-3">
              <Link
                href="/en/jobs"
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                Browse roles
              </Link>
              <Link
                href={applyHref}
                className="rounded-xl bg-brandGold/20 px-4 py-2 text-sm font-semibold text-brandGoldPale hover:bg-brandGold/30 hover:text-white"
              >
                Submit CV
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}