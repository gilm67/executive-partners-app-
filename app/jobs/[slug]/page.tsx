// app/jobs/[slug]/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import MarkdownLite from "../MarkdownLite";

/* 🔗 Use your canonical data (single source of truth) */
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
  // Optional extended fields your data/jobs.ts might have:
  experience_min?: number;
  languages?: string[];
  overview?: string[];
  responsibilities?: string[];
  qualifications?: string[];
  offer?: string[];
  compliance?: string[];
};

/* ---------------- Constants ---------------- */

const HIDDEN_SLUGS = new Set<string>([
  "senior-relationship-manager-ch-onshore-4",
  "senior-relationship-manager-brazil-2",
  "private-banker-mea-2",
]);

export const revalidate = 900; // cache the page for 15m

/* ---------------- Utils ---------------- */

function norm(s: string | undefined) {
  return (s ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-|-$/g, "");
}

function md(s: string) {
  return s.trim();
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

/** Convert a minimal markdown-ish string to safe HTML lines */
function toHtmlLines(s: string) {
  return escapeHTML(s).replace(/\n/g, "<br/>");
}

/** Map common locations to ISO 3166-1 alpha-2 country codes */
function countryForLocation(loc?: string): string | undefined {
  if (!loc) return undefined;
  const L = loc.toLowerCase();
  if (
    /(?:\bgeneva\b|\bzurich\b|\blausanne\b|\bswitzerland\b|\bch\b)/.test(L)
  )
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

/* ---------- Compensation block + helper (injected everywhere) ---------- */

const COMP_BLOCK = md(`
### Compensation
Compensation is highly competitive and structured according to seniority, experience, and the business plan presented (AUM, NNM, and the client portfolio).
`);

function withCompensation(text: string) {
  const t = (text || "").trim();
  // avoid duplicates if a Compensation section already exists
  return /(^|\n)###\s+Compensation\b/i.test(t) ? t : `${t}\n\n${COMP_BLOCK}`.trim();
}

/* ------------ Rich fallback bodies (markdown) ------------ */

const FALLBACK_BODIES: Record<string, string> = {
  // BRAZIL — Zurich or Geneva
  "senior-relationship-manager-brazil-ch": md(`
**Title:** Senior Relationship Manager Brazil  
**Location:** Zurich or Geneva

### Position Overview
The **Senior Relationship Manager** is responsible for acquiring, developing, and managing a portfolio of high-net-worth (HNW) and ultra-high-net-worth (UHNW) individuals **based in Brazil**, serving as a trusted advisor by providing comprehensive private banking services and tailored financial solutions.

### Key Responsibilities
- Develop and expand a personal client network, especially within the **Brazil** market.  
- Act as a strategic advisor, offering integrated wealth management solutions across investments, lending, and estate planning.  
- Deliver full-service banking and facilitate all client transactions, collaborating with product specialists as needed.  
- Proactively identify business development opportunities and generate new leads through networking and referrals.  
- Provide consistent, high-value advice with a focus on long-term relationships and client satisfaction.  
- Maintain rigorous compliance with internal policies and regulatory guidelines, including **KYC and AML** standards.  
- Mentor junior staff, contribute to team goals, and share best practices within the organization.

### Core Requirements
- University degree in finance, banking, or a related field; advanced education or certifications preferred.  
- Proven track record of at least **7–10 years** in private banking, with a strong portfolio of **HNW/UHNW clients in Brazil**.  
- Deep knowledge of financial markets, investment products, and regulatory topics.  
- Outstanding interpersonal, communication, and negotiation skills, with fluency in **English and Portuguese**; French or Swiss German considered a plus.  
- Demonstrated entrepreneurial drive, with experience in both client acquisition ("hunter") and client retention ("farmer") roles.  
- **Swiss residency or valid permit** highly desirable; cross-border experience an advantage.

### Essential Competencies
- Business acumen with a robust local network and a client-focused, ethical approach.  
- Ability to leverage internal experts and resources for holistic client solutions.  
- Strong compliance awareness and attention to detail.  
- High motivation, team spirit, and adaptability in a dynamic and demanding environment.

### What Our Client Offer
- Advanced workplace infrastructure, collaborative spaces, and diverse teams.  
- Opportunities for career progression in a client-focused, entrepreneurial setting.  
- Competitive compensation, benefits, and ongoing professional development.
`),

  // MEA — Dubai
  "senior-relationship-manager-mea-dubai": md(`
**Title:** Private Banker / Senior Relationship Manager — MEA  
**Location:** Dubai

### Position Overview
The **Senior Relationship Manager** will acquire, develop, and manage a portfolio of **HNW/UHNW clients across the Middle East & Africa (MEA)** from a Dubai hub, delivering tailored private banking solutions across investment, credit, and wealth planning.

### Key Responsibilities
- Build and expand a personal client network across GCC, Levant, and North Africa.  
- Act as a strategic advisor, providing integrated wealth solutions (DPM/advisory, structured products, Lombard/real-estate credit, and wealth planning).  
- Drive new business through referrals, professional networks, and targeted events across the region.  
- Maintain strict cross-border and local regulatory adherence; ensure comprehensive **KYC/AML**.  
- Partner with product specialists; mentor juniors and champion best practices.

### Core Requirements
- 7–10+ years in private banking with **portable MEA relationships** and proven acquisition.  
- Strong knowledge of regional markets and cross-border frameworks.  
- Fluency in **English**; **Arabic and/or French** are strong advantages.  
- Entrepreneurial, results-driven profile; track record of sustainable client retention.

### Essential Competencies
- High cultural fluency across MEA and strong stakeholder management.  
- Rigorous compliance mind-set and disciplined execution.  
- Collaborative, proactive, and client-centric approach.

### What Our Client Offer
- **Dubai** hub with global booking options, competitive grid, and robust product shelf.  
- Clear development path, diverse teams, and private markets access.
`),

  // MEA — Zurich
  "senior-relationship-manager-mea-zurich": md(`
**Title:** Senior Relationship Manager — MEA  
**Location:** Zurich

### Position Overview
Advise **HNW/UHNW MEA** clients via **Zurich booking**, leveraging Switzerland’s stability and depth in global wealth management.

### Key Responsibilities
- Acquire and grow a MEA portfolio (GCC/Levant/Africa) from a Swiss platform.  
- Provide integrated investment, credit, and succession solutions with strong cross-border governance.  
- Build professional referral networks (lawyers, fiduciaries, family offices).  
- Ensure robust **KYC/AML** and cross-border compliance.

### Core Requirements
- 7+ years in Swiss private banking with **MEA coverage** and portable relationships.  
- Fluent **English** (Arabic and/or French valued).  
- Strong acquisition track record and disciplined client care.

### Essential Competencies
- Client-first advisory, structured problem-solving, and collaboration across teams.  
- High integrity and compliance discipline.

### What Our Client Offer
- Swiss booking center with global reach, strong platform support, and competitive remuneration.
`),

  // CH Onshore — Zurich
  "senior-relationship-manager-ch-onshore-zurich": md(`
**Title:** Senior Relationship Manager — CH Onshore  
**Location:** Zurich

### Position Overview
Serve **Swiss-domiciled HNW/UHNW** clients in **Zurich**, offering holistic onshore private banking solutions aligned with FINMA standards.

### Key Responsibilities
- Acquire and grow a Swiss onshore portfolio across Zurich and surrounding cantons.  
- Deliver integrated advisory across investments, mortgages, pension, and succession planning.  
- Build referral ecosystems with local lawyers, fiduciaries, and entrepreneurs.  
- Maintain **FINMA-grade** documentation and compliance.

### Core Requirements
- 7–10+ years Swiss onshore coverage with a portable network.  
- Fluency in **German/Swiss German** and English (French a plus).  
- Strong commercial drive and client care.

### Essential Competencies
- Local market credibility, ethical approach, and attention to detail.  
- Collaborative team player with high standards and resilience.

### What Our Client Offer
- Entrepreneurial onshore platform, respected brand, and competitive grid.
`),

  // CH Onshore — Lausanne
  "senior-relationship-manager-ch-onshore-lausanne": md(`
**Title:** Senior Relationship Manager — CH Onshore  
**Location:** Lausanne (Romandie)

### Position Overview
Advise **HNW/UHNW Swiss onshore** clients across **Romandie** (Lausanne/Vaud/Geneva), offering comprehensive local solutions.

### Key Responsibilities
- Develop and manage a portfolio across Lausanne, Vaud, and Geneva.  
- Provide investment advisory, lending, pension, and estate planning tailored to Swiss onshore needs.  
- Grow referral channels with local professionals; ensure top-tier client service.  
- Uphold **FINMA** compliance and rigorous **KYC/AML**.

### Core Requirements
- 7+ years Swiss onshore PB; proven Romandie network.  
- Fluency in **French** and English; strong local presence.  
- Acquisition and long-term relationship management skills.

### Essential Competencies
- Client-first mentality, diligence, and collaborative mindset.  
- Strong ethics and attention to detail.

### What Our Client Offer
- Strong Romandie brand, supportive culture, and competitive compensation.
`),

  // Portugal — Geneva
  "senior-relationship-manager-portugal-geneva": md(`
**Title:** Senior Relationship Manager — Portugal  
**Location:** Geneva

### Position Overview
Lead relationships with **HNW/UHNW Portuguese** clients and diaspora from **Geneva**, leveraging Switzerland’s booking center and cross-border capabilities.

### Key Responsibilities
- Acquire and grow a portfolio of Portuguese entrepreneurs and families in CH/EU.  
- Provide integrated advisory across investments, credit, and wealth/succession planning.  
- Build diaspora referral channels; drive new business via events and partnerships.  
- Ensure stringent **KYC/AML** and cross-border compliance.

### Core Requirements
- 7–10+ years covering **Portugal** with portable relationships.  
- Fluency in **Portuguese** and English (French a strong plus).  
- Consistent acquisition and retention track record.

### Essential Competencies
- Cultural fluency, client-centric advisory, and disciplined execution.  
- Strong compliance awareness and team collaboration.

### What Our Client Offer
- Geneva hub with dedicated Portugal/LatAm desk, private markets access, and competitive grid.
`),
};

/* ---------------- “Always available” job fallbacks ---------------- */

const KNOWN_JOBS: Record<string, Job> = {
  "senior-relationship-manager-brazil-ch": {
    slug: "senior-relationship-manager-brazil-ch",
    title: "Senior Relationship Manager — Brazil",
    location: "Zurich or Geneva",
    market: "Brazil (LatAm)",
    seniority: "Director/ED/MD",
    active: true,
    summary:
      "Develop and manage HNW/UHNW Brazilian clients; full private banking advisory and cross-border expertise.",
    body: FALLBACK_BODIES["senior-relationship-manager-brazil-ch"],
  },
  "senior-relationship-manager-mea-dubai": {
    slug: "senior-relationship-manager-mea-dubai",
    title: "Private Banker — MEA",
    location: "Dubai",
    market: "Middle East & Africa (MEA)",
    seniority: "Director/ED/MD",
    active: true,
    summary:
      "Cover UHNW/HNW MEA clients from Dubai; strong acquisition and cross-border expertise.",
    body: FALLBACK_BODIES["senior-relationship-manager-mea-dubai"],
  },
  "senior-relationship-manager-mea-zurich": {
    slug: "senior-relationship-manager-mea-zurich",
    title: "Senior Relationship Manager — MEA",
    location: "Zurich",
    market: "Middle East & Africa (MEA)",
    seniority: "Director/ED/MD",
    active: true,
    summary:
      "Serve UHNW/HNW MEA clients via Zurich booking; advisory, credit and structuring.",
    body: FALLBACK_BODIES["senior-relationship-manager-mea-zurich"],
  },
  "senior-relationship-manager-ch-onshore-zurich": {
    slug: "senior-relationship-manager-ch-onshore-zurich",
    title: "Senior Relationship Manager — CH Onshore",
    location: "Zurich",
    market: "Switzerland (Onshore)",
    seniority: "Director/ED/MD",
    active: true,
    summary:
      "UHNW/HNW Swiss-domiciled clients; Zurich booking centre; strong local network required.",
    body: FALLBACK_BODIES["senior-relationship-manager-ch-onshore-zurich"],
  },
  "senior-relationship-manager-ch-onshore-lausanne": {
    slug: "senior-relationship-manager-ch-onshore-lausanne",
    title: "Senior Relationship Manager — CH Onshore",
    location: "Lausanne",
    market: "Switzerland (Onshore)",
    seniority: "Director/ED/MD",
    active: true,
    summary:
      "UHNW/HNW Swiss-domiciled clients; Romandie focus; strong local network required.",
    body: FALLBACK_BODIES["senior-relationship-manager-ch-onshore-lausanne"],
  },
  "senior-relationship-manager-portugal-geneva": {
    slug: "senior-relationship-manager-portugal-geneva",
    title: "Senior Relationship Manager — Portugal",
    location: "Geneva",
    market: "Portugal (LatAm/Europe)",
    seniority: "Director/ED/MD",
    active: true,
    summary:
      "UHNW/HNW Portuguese clients and diaspora; Geneva booking centre; cross-border expertise.",
    body: FALLBACK_BODIES["senior-relationship-manager-portugal-geneva"],
  },
};

/* ---------------- Optional salary bands for JSON-LD ---------------- */

type SalaryBand = {
  min: number;
  max: number;
  currency: string;
  unitText?: "YEAR" | "MONTH" | "HOUR";
};
const SALARY_RANGES: Record<string, SalaryBand> = {
  // Example if you ever want to publish:
  // "senior-relationship-manager-mea-dubai": { min: 250000, max: 500000, currency: "USD", unitText: "YEAR" },
};

/* ---------------- Static params so featured links always resolve ---------------- */

export const dynamicParams = true;

export function generateStaticParams() {
  // canonical slugs (if present)
  const canon = Array.isArray(canonicalJobs)
    ? canonicalJobs
        .map((j) => (j?.slug ? String(j.slug).trim() : ""))
        .filter(Boolean)
        .map((slug) => ({ slug }))
    : [];

  // our guaranteed fallbacks (homepage featured items + other knowns)
  const known = Object.keys(KNOWN_JOBS).map((slug) => ({ slug }));

  // de-dupe by slug
  const seen = new Set<string>();
  const merged = [...known, ...canon].filter(({ slug }) => {
    if (seen.has(slug)) return false;
    seen.add(slug);
    return true;
  });

  return merged;
}

/* ---------------- Data loading ---------------- */

/**
 * Primary resolver:
 * 1) Try canonical data source (`@/data/jobs`) by exact raw slug,
 *    then by normalized slug
 * 2) If not found, try canonical fuzzy match
 * 3) If still not found, fall back to your KNOWN_JOBS + rich markdown bodies
 */
async function resolveJobBySlug(requestedSlug: string): Promise<Job | null> {
  const wanted = norm(requestedSlug);

  // 1) Exact from canonical data (raw, then normalized)
  const canonExactRaw = getCanonicalJobBySlug(requestedSlug) as Job | null;
  if (canonExactRaw) return canonExactRaw;
  const canonExactNorm = getCanonicalJobBySlug(wanted) as Job | null;
  if (canonExactNorm) return canonExactNorm;

  // 2) Fuzzy from canonical list (helps if slug case/accents differ)
  const canonFuzzy =
    canonicalJobs.find((j) => norm(j.slug) === wanted) ||
    canonicalJobs.find((j) => norm(j.slug).startsWith(wanted)) ||
    canonicalJobs.find((j) => wanted.startsWith(norm(j.slug))) ||
    canonicalJobs.find((j) => norm(j.title).includes(wanted));
  if (canonFuzzy) return canonFuzzy as Job;

  // 3) Fallback (ensures page still works even if API/canonical misconfigured)
  return KNOWN_JOBS[wanted] ?? null;
}

/* ---------------- Prefill helpers ---------------- */

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
  return `/apply?${params.toString()}`;
}

/* --- Market slug + jobs listing URL helpers for internal links --- */

function inferMarketSlugFromJob(job: Job): string | undefined {
  const l = (job.location || "").toLowerCase();
  const s = norm(job.slug);
  const t = `${s}-${l}-${(job.market || "").toLowerCase()}`;

  if (t.includes("geneva")) return "geneva";
  if (t.includes("zurich")) return "zurich";
  if (t.includes("lausanne")) return "geneva"; // Romandie → Geneva market sheet
  if (t.includes("dubai")) return "dubai";
  if (t.includes("singapore")) return "singapore";
  if (t.includes("hong-kong") || t.includes("hong kong") || t.includes("hk"))
    return "hong-kong";
  if (t.includes("new-york") || t.includes("new york") || t.includes("nyc"))
    return "new-york";
  if (t.includes("miami")) return "miami";
  if (t.includes("paris")) return "paris";
  if (t.includes("milan")) return "milan";
  if (t.includes("lisbon") || t.includes("portugal")) return "lisbon";
  return undefined;
}

function jobsListingHrefForMarketSlug(slug: string): string {
  switch (slug) {
    case "geneva":
      return "/private-banking-jobs-geneva";
    case "zurich":
      return "/private-banking-jobs-zurich";
    case "dubai":
      return "/private-banking-jobs-dubai";
    case "singapore":
      return "/private-banking-jobs-singapore";
    case "new-york":
      return "/private-banking-jobs-new-york";
    default:
      // Fallback to generic jobs page if a dedicated landing doesn't exist yet
      return "/jobs";
  }
}

function cityLabelFromSlug(slug: string): string {
  switch (slug) {
    case "new-york":
      return "New York";
    case "hong-kong":
      return "Hong Kong";
    default:
      return slug.charAt(0).toUpperCase() + slug.slice(1);
  }
}

/* ---------------- Metadata ---------------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await resolveJobBySlug(slug);
  const base = siteBase();

  const title = job?.title
    ? `${job.title} | Executive Partners`
    : "Role | Executive Partners";

  const description =
    job?.summary ??
    "Confidential private banking mandate via Executive Partners. Apply discretely.";

  const url = `${base}/jobs/${slug}`;
  const applyTarget = job ? `${base}${buildApplyHref(job)}` : `${base}/apply`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [{ url: `${base}/og.png` }],
    },
    robots:
      job?.active === false || (job && HIDDEN_SLUGS.has(job.slug))
        ? { index: false, follow: true }
        : { index: true, follow: true },
    other: {
      "apply:target": applyTarget,
    },
  };
}

/* ---------------- Page ---------------- */

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ Exclusive access gate (Jobs details are private)
  const cookieStore = await cookies();
  const hasSession = cookieStore.get("ep_private")?.value;
  if (!hasSession) {
    redirect("/private/auth/request");
  }

  const { slug } = await params;
  const job = await resolveJobBySlug(slug);

  // ✅ Use Next's jobs 404
  if (!job || job.active === false || HIDDEN_SLUGS.has(job.slug)) {
    notFound();
  }

  // -------- JSON-LD (JobPosting + Breadcrumb) --------
  const base = siteBase();
  const url = `${base}/jobs/${slug}`;
  const datePostedISO = job.createdAt
    ? new Date(job.createdAt).toISOString()
    : new Date().toISOString();

  // Keep postings "fresh" for ~60 days
  const validThroughISO = (() => {
    const baseDate = job.createdAt ? new Date(job.createdAt) : new Date();
    baseDate.setDate(baseDate.getDate() + 60);
    return baseDate.toISOString();
  })();

  const country = countryForLocation(job.location);

  // Prefer rich canonical sections if present, else fallbacks/summary
  let bodyFromSections = "";
  const hasSections =
    Array.isArray((job as any).overview) ||
    Array.isArray((job as any).responsibilities) ||
    Array.isArray((job as any).qualifications) ||
    Array.isArray((job as any).offer) ||
    Array.isArray((job as any).compliance);

  if (hasSections) {
    const j: any = job;
    const blocks: string[] = [];
    if (Array.isArray(j.overview) && j.overview.length) {
      blocks.push(
        "### Overview\n" + j.overview.map((x: string) => `- ${x}`).join("\n"),
      );
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
      blocks.push(
        "### What We Offer\n" +
          j.offer.map((x: string) => `- ${x}`).join("\n"),
      );
    }
    bodyFromSections = blocks.join("\n\n");
  }

  const descriptionSourceRaw = (
    job.body?.trim() ||
    bodyFromSections ||
    FALLBACK_BODIES[norm(job.slug)] ||
    job.summary ||
    "Confidential private banking mandate."
  ).trim();

  // Inject Compensation disclaimer (also used in JSON-LD)
  const descriptionSource = withCompensation(descriptionSourceRaw);

  // Optional compensation numbers for JSON-LD (left undefined by default)
  const salary = SALARY_RANGES[norm(job.slug)];
  const compensation = salary
    ? {
        baseSalary: {
          "@type": "MonetaryAmount",
          currency: salary.currency,
          value: {
            "@type": "QuantitativeValue",
            minValue: salary.min,
            maxValue: salary.max,
            unitText: salary.unitText ?? "YEAR",
          },
        },
      }
    : undefined;

  const jobPosting = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: toHtmlLines(descriptionSource),
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
    ...(country && {
      applicantLocationRequirements: {
        "@type": "Country",
        name: country,
      },
    }),
    identifier: {
      "@type": "PropertyValue",
      name: "Executive Partners",
      value: job.slug,
    },
    url,
    isAccessibleForFree: true,
    potentialAction: {
      "@type": "ApplyAction",
      target: `${base}${buildApplyHref(job)}`, // ✅ prefilled apply link
    },
    ...(compensation ?? {}),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Jobs", item: `${base}/jobs` },
      { "@type": "ListItem", position: 2, name: job.title, item: url },
    ],
  };

  const replacer = (_k: string, v: unknown) =>
    v === undefined ? undefined : v;

  const createdFmt = job.createdAt
    ? new Date(job.createdAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : undefined;

  const body = descriptionSource;

  // ✅ Build prefilled /apply URL (works for all current & future jobs)
  const applyHref = buildApplyHref(job);

  // For internal links block
  const marketSlug = inferMarketSlugFromJob(job);
  const marketCityLabel = marketSlug ? cityLabelFromSlug(marketSlug) : null;
  const marketJobsHref = marketSlug
    ? jobsListingHrefForMarketSlug(marketSlug)
    : "/jobs";
  const bpSimulatorHref = `/bp-simulator?src=job_${encodeURIComponent(
    job.slug,
  )}`;

  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jobPosting, replacer),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumb, replacer),
        }}
      />

      {/* soft ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 420px at 18% -10%, rgba(59,130,246,.16) 0%, rgba(59,130,246,0) 60%), radial-gradient(1000px 380px at 110% 0%, rgba(16,185,129,.15) 0%, rgba(16,185,129,0) 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-5xl px-4 py-10">
        {/* Header Card */}
        <section className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.03))] p-6 shadow-[0_1px_3px_rgba(0,0,0,.25)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-2">
                {job.market || inferMarket(job) ? (
                  <span className="inline-flex items-center rounded-full bg-gradient-to-r from-sky-500 to-blue-400 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
                    {job.market || inferMarket(job)}
                  </span>
                ) : null}
                {job.confidential ? (
                  <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-xs font-medium">
                    Confidential
                  </span>
                ) : null}
                {createdFmt ? (
                  <span className="text-xs text-white/70">
                    Posted {createdFmt}
                  </span>
                ) : null}
              </div>

              <h1 className="mt-2 text-2xl font-bold leading-tight md:text-3xl">
                {job.title}
              </h1>

              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/80">
                {job.location && (
                  <span className="inline-flex items-center gap-1.5">
                    {job.location}
                  </span>
                )}
                {job.seniority && (
                  <span className="inline-flex items-center gap-1.5">
                    {job.seniority}
                  </span>
                )}
              </div>
            </div>

            <div className="flex w-full items-center gap-3 md:w-auto">
              {/* ✅ Prefilled apply */}
              <Link
                href={applyHref}
                className="inline-flex flex-1 items-center justify-center rounded-xl bg-[#1D4ED8] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1E40AF] md:flex-none"
              >
                Apply / Submit CV
              </Link>
              <Link
                href="/contact"
                className="hidden items-center justify-center rounded-xl border border-white/15 bg:white/5 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 md:inline-flex"
              >
                Talk to us
              </Link>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          {body ? (
            <MarkdownLite text={body} />
          ) : (
            <p className="text-neutral-300">Details available upon request.</p>
          )}
        </section>

        {/* 🔗 Market insights & tools – internal links block for SEO */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-lg font-semibold">Market insights &amp; tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Use these links to explore the market, benchmark your move and stay
            in touch with Executive Partners.
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {marketSlug && (
              <div className="space-y-1 text-sm">
                <Link
                  href={`/en/markets/${marketSlug}`}
                  className="font-semibold text-[#F4D270] underline underline-offset-2"
                >
                  Deep dive: Private Banking in {marketCityLabel}
                </Link>
                <p className="text-neutral-300">
                  Licensing, compensation benchmarks, hiring pulse and
                  relocation notes for {marketCityLabel}.
                </p>
              </div>
            )}

            <div className="space-y-1 text-sm">
              <Link
                href={marketJobsHref}
                className="font-semibold text-[#F4D270] underline underline-offset-2"
              >
                View more roles in this market
              </Link>
              <p className="text-neutral-300">
                Browse additional Private Banking opportunities in the same
                region.
              </p>
            </div>

            <div className="space-y-1 text-sm">
              <Link
                href="/candidates"
                className="font-semibold text-[#F4D270] underline underline-offset-2"
              >
                Candidates hub
              </Link>
              <p className="text-neutral-300">
                Register confidentially and be considered for future mandates
                that match your book and seniority.
              </p>
            </div>

            <div className="space-y-1 text-sm">
              <Link
                href={bpSimulatorHref}
                className="font-semibold text-[#F4D270] underline underline-offset-2"
              >
                Run Business Plan Simulator
              </Link>
              <p className="text-neutral-300">
                Model revenue, ROA and portability assumptions for your move
                before speaking with a platform.
              </p>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-neutral-300 md:text-left">
              Not an exact match? We share{" "}
              <span className="font-semibold">confidential</span> mandates
              directly with qualified bankers.
            </p>
            <div className="flex gap-3">
              <Link
                href="/jobs"
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                Browse more roles
              </Link>
              {/* ✅ Prefilled apply (footer) */}
              <Link
                href={applyHref}
                className="rounded-xl bg-[#1D4ED8] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1E40AF]"
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