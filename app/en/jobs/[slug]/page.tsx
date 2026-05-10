// app/en/jobs/[slug]/page.tsx
import { MANDATES } from "../mandates-data";
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
      images: [{ url: `${base}/og.webp` }],
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

  const mandateData = MANDATES.find((m) => m.id === slug);
  if (mandateData) {
    const base = siteBase();
    const applyHref = "/en/apply?role=" + mandateData["id"];
    const paragraphs = mandateData.brief.split("\n\n");
    const steps = mandateData.process.split(" \u00b7 ");
    return (
      <main className="relative min-h-screen bg-[#0B0F1A] text-white">

        {/* Ambient background */}
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(1400px 500px at 10% -10%, rgba(201,161,74,.14) 0%, rgba(201,161,74,0) 55%), radial-gradient(1100px 420px at 110% 0%, rgba(245,231,192,.10) 0%, rgba(245,231,192,0) 60%)" }} />

        <div className="relative mx-auto w-full max-w-5xl px-4 py-10 space-y-5">

          {/* ── HEADER CARD ────────────────────────────── */}
          <section className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.03))] p-7">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div className="flex-1 min-w-0">
                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-2xl">{mandateData.flag}</span>
                  <span className="inline-flex items-center rounded-full bg-gradient-to-r from-[#C9A14A] to-[#E8C96A] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-black">{mandateData.tag}</span>
                  <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/70">Confidential</span>
                  {mandateData.urgent && <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-green-400"><span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />Actively Filling</span>}
                </div>
                {/* Title */}
                <h1 className="font-[var(--font-playfair)] text-3xl font-semibold leading-tight text-white mb-2 md:text-4xl">{mandateData.title}</h1>
                <p className="text-lg text-neutral-400">{mandateData.subtitle} &nbsp;&middot;&nbsp; {mandateData.location}</p>
              </div>
              {/* CTA buttons */}
              <div className="flex flex-col gap-2.5 w-full md:w-auto shrink-0">
                <a href={applyHref} className="inline-flex items-center justify-center rounded-xl bg-[#C9A14A] px-6 py-3 text-sm font-bold text-black hover:opacity-90 transition shadow-[0_4px_20px_rgba(201,161,74,.3)]">Apply / Submit CV</a>
                <a href="/en/contact" className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition">Speak with a Recruiter</a>
              </div>
            </div>
          </section>

          {/* ── AT A GLANCE STRIP ─────────────────────── */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02))] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A14A]/80 mb-1.5">Base Salary</p>
              <p className="text-lg font-bold text-white leading-tight">{mandateData.comp_base}</p>
              <p className="text-[11px] text-neutral-500 mt-1 leading-snug">{mandateData.comp_note}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02))] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-1.5">Portable Book</p>
              <p className="text-lg font-bold text-white leading-tight">{mandateData.aum}</p>
              <p className="text-[11px] text-neutral-500 mt-1 leading-snug">{mandateData.aum_note}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02))] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-1.5">Location</p>
              <p className="text-sm font-semibold text-white leading-tight">{mandateData.location}</p>
              <p className="text-[11px] text-neutral-500 mt-1">On-site</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02))] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-1.5">Seniority</p>
              <p className="text-sm font-semibold text-white leading-tight">Director / ED</p>
              <p className="text-[11px] text-neutral-500 mt-1">Senior mandate</p>
            </div>
          </div>

          {/* ── MAIN CONTENT GRID ─────────────────────── */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">

            {/* LEFT COLUMN */}
            <div className="space-y-5">

              {/* The Opportunity */}
              <section className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02))] p-7">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-5 w-0.5 rounded-full bg-[#C9A14A]" />
                  <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C9A14A]/80">The Opportunity</p>
                </div>
                <div className="space-y-4">
                  {paragraphs.map((para: string, i: number) => (
                    <p key={i} className="text-[15px] text-neutral-300 leading-[1.85]">{para}</p>
                  ))}
                </div>
              </section>

              {/* What You Bring */}
              <section className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02))] p-7">
                <div className="flex items-center gap-3 mb-2">
                  <span className="h-5 w-0.5 rounded-full bg-[#C9A14A]" />
                  <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C9A14A]/80">What You Bring</p>
                </div>
                <p className="text-sm text-neutral-500 mb-6 ml-4">The profile that succeeds in this mandate.</p>
                <ul className="space-y-4">
                  {mandateData.profile_lines.map((line: string, i: number) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="mt-[5px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#C9A14A]/30 bg-[#C9A14A]/10 text-[#C9A14A] text-[10px] font-bold">{i + 1}</span>
                      <span className="text-[14px] text-neutral-200 leading-relaxed">{line}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Process */}
              <section className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02))] p-7">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-5 w-0.5 rounded-full bg-[#C9A14A]" />
                  <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C9A14A]/80">Selection Process</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {steps.map((step: string, i: number) => (
                    <div key={i} className="flex items-center gap-2.5">
                      {i > 0 && <span className="text-white/20 text-lg">&#8594;</span>}
                      <span className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-neutral-400">{step}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-[11px] text-neutral-600 leading-relaxed">No panels. No bureaucratic rounds. Your information is never shared with the hiring institution without your explicit consent.</p>
              </section>

              {/* Compensation detail */}
              <section className="rounded-2xl border border-[#C9A14A]/15 bg-[linear-gradient(135deg,rgba(201,161,74,.06),rgba(27,58,107,.08))] p-7">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-5 w-0.5 rounded-full bg-[#C9A14A]" />
                  <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C9A14A]/80">Indicative Compensation</p>
                </div>
                <p className="text-3xl font-bold text-white mb-1">{mandateData.comp_base}</p>
                <p className="text-sm text-neutral-400 mb-4">{mandateData.comp_note}</p>
                <p className="text-[11px] text-neutral-600 leading-relaxed italic">Indicative range only. Final package is structured by the hiring institution based on AUM, NNM track record, seniority and negotiation. NPC contribution is available for qualified candidates.</p>
              </section>
            </div>

            {/* RIGHT COLUMN — sticky sidebar */}
            <aside className="space-y-4 lg:sticky lg:top-24 h-fit">

              {/* Express interest */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-1">Express Interest</p>
                <p className="text-sm text-white/60 mb-5 leading-relaxed">No CV required. Confidential. We respond within 24 hours.</p>
                <div className="space-y-2.5">
                  <a href={applyHref} className="block w-full rounded-xl bg-[#C9A14A] py-3 text-center text-sm font-bold text-black hover:opacity-90 transition shadow-[0_4px_16px_rgba(201,161,74,.25)]">Apply / Submit CV</a>
                  <a href="/en/contact" className="block w-full rounded-xl border border-white/15 bg-white/[0.04] py-3 text-center text-sm font-semibold text-neutral-300 hover:bg-white/10 hover:text-white transition">Speak with a Recruiter</a>
                </div>
                <p className="mt-4 text-center text-[10px] tracking-widest text-white/20">100% CONFIDENTIAL &nbsp;&middot;&nbsp; GDPR COMPLIANT</p>
              </div>

              {/* Why EP */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-4">Why Executive Partners</p>
                <ul className="space-y-3">
                  {[
                    ["200+", "Senior placements in private banking"],
                    ["98%", "Retention rate across all mandates"],
                    ["1", "Point of contact — dedicated recruiter"],
                    ["24h", "Response time. Always."],
                  ].map(([stat, label], i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-[#C9A14A] font-bold text-sm w-12 shrink-0">{stat}</span>
                      <span className="text-xs text-neutral-500 leading-snug">{label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Confidentiality note */}
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600 mb-3">Confidentiality</p>
                <p className="text-xs text-neutral-600 leading-relaxed">This is a confidential mandate. The hiring institution is disclosed only after your qualification call with Executive Partners. Your details are never shared without your consent.</p>
              </div>
            </aside>
          </div>

          {/* ── FOOTER CTA ────────────────────────────── */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div>
                <p className="font-semibold text-white mb-1">Ready to explore this mandate?</p>
                <p className="text-sm text-neutral-500">No CV required at this stage. One call. Fully confidential.</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <a href="/en/jobs" className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition">&#8592; All mandates</a>
                <a href={applyHref} className="rounded-xl bg-[#C9A14A]/20 border border-[#C9A14A]/30 px-5 py-2.5 text-sm font-semibold text-[#C9A14A] hover:bg-[#C9A14A]/30 hover:text-white transition">Apply Now</a>
              </div>
            </div>
          </section>

        </div>
      </main>
    );
  }




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