// app/en/jobs/[slug]/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Adjust if your MarkdownLite path differs
import MarkdownLite from "@/app/jobs/MarkdownLite";

import {
  getJobBySlug as getCanonicalJobBySlug,
  jobsList as canonicalJobs,
} from "@/data/jobs";

/* ---------------- Types ---------------- */
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
  // prebuild known canonical slugs to reduce 404 risk
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
  if (
    h.includes("hong-kong") ||
    h.includes("hk") ||
    h.includes("greater-china")
  )
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
      blocks.push("### Overview\n" + j.overview.map((x: string) => `- ${x}`).join("\n"));
    }
    if (Array.isArray(j.responsibilities) && j.responsibilities.length) {
      blocks.push(
        "### Key Responsibilities\n" +
          j.responsibilities.map((x: string) => `- ${x}`).join("\n"),
      );
    }
    if (Array.isArray(j.qualifications) && j.qualifications.length) {
      blocks.push(
        "### Qualifications\n" +
          j.qualifications.map((x: string) => `- ${x}`).join("\n"),
      );
    }
    if (Array.isArray(j.compliance) && j.compliance.length) {
      blocks.push(
        "### Regulatory & Compliance\n" +
          j.compliance.map((x: string) => `- ${x}`).join("\n"),
      );
    }
    if (Array.isArray(j.offer) && j.offer.length) {
      blocks.push("### What We Offer\n" + j.offer.map((x: string) => `- ${x}`).join("\n"));
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

/* ---------- Resolver ----------
   IMPORTANT: we provide a safe fallback for unknown slugs so legacy URLs don’t 404.
   We mark those as noindex in metadata.
*/
async function resolveJobBySlug(requestedSlug: string): Promise<{
  job: Job | null;
  isFallback: boolean;
}> {
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

  // ✅ fallback so /en/jobs/<legacy-slug> renders instead of 404
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
    // ✅ If it’s a fallback job (not in canonical data), keep it out of Google.
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

  // Keep postings "fresh" for ~60 days
  const validThroughISO = (() => {
    const d = job.createdAt ? new Date(job.createdAt) : new Date();
    d.setDate(d.getDate() + 60);
    return d.toISOString();
  })();

  const country = countryForLocation(job.location);
  const applyHref = buildApplyHref(job);

  const body = buildBodyMarkdown(job);

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
    industry: job.market || inferMarket(job) || "Private Banking",
    directApply: true,
    url: canonicalUrl,
    isAccessibleForFree: true,
    potentialAction: {
      "@type": "ApplyAction",
      target: `${base}${applyHref}`,
    },
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

  const createdFmt = job.createdAt
    ? new Date(job.createdAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : undefined;

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
                  {job.market || inferMarket(job) || "Private Banking"}
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

        {/* Body */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <MarkdownLite text={body} />
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