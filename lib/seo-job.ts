// lib/seo-job.ts
import type { Metadata } from "next";

/* ---------- Types ---------- */
export type PublicJob = {
  slug: string;
  title: string;
  summary?: string;
  description?: string;          // HTML or plain text
  location?: string;             // e.g. "Geneva, Switzerland"
  countryCode?: string;          // e.g. "CH"
  city?: string;                 // e.g. "Geneva"
  remote?: boolean;
  market?: string;               // e.g. "CH Onshore"
  hiringOrg?: { name: string; url?: string; logo?: string };
  employmentType?: string;       // e.g. "FULL_TIME"
  baseSalaryMin?: number;
  baseSalaryMax?: number;
  currency?: string;             // e.g. "CHF"
  datePostedISO?: string;        // ISO date string
  validThroughISO?: string;      // ISO date string in the future
  updatedAt?: string;
  createdAt?: string;
  active?: boolean;
};

/* ---------- URL helpers ---------- */
export function siteBase(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "https://www.execpartners.ch";
  const url = raw.startsWith("http") ? raw : `https://${raw}`;
  return url.replace(/\/+$/, "");
}

export function jobUrl(slug: string) {
  return `${siteBase()}/jobs/${slug}`;
}

/* ---------- Text helpers ---------- */
export function sanitizeHtmlToText(input?: string) {
  if (!input) return "";
  // strip simple tags & scripts, collapse whitespace
  return input
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\u00A0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/* ---------- JSON-LD builders ---------- */
export function buildJobPosting(job: PublicJob) {
  const SITE = siteBase();
  const url = jobUrl(job.slug);
  const title = job.title;

  const description =
    sanitizeHtmlToText(job.description || job.summary) ||
    `${job.title} — ${[job.market, job.location].filter(Boolean).join(" · ")}`.trim();

  const datePosted =
    job.datePostedISO || job.updatedAt || job.createdAt || new Date().toISOString();

  // If not supplied, keep the listing valid for 60 days
  const validThrough =
    job.validThroughISO ||
    new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString();

  // Hiring org (client) and our agency as the poster
  const hiringOrganization = {
    "@type": "Organization",
    name: job.hiringOrg?.name || "Confidential (Executive Partners Client)",
    sameAs: job.hiringOrg?.url || SITE,
    ...(job.hiringOrg?.logo
      ? { logo: { "@type": "ImageObject", url: job.hiringOrg.logo } }
      : {}),
  };

  const employmentAgency = {
    "@type": "Organization",
    name: "Executive Partners",
    url: SITE,
    sameAs: SITE,
  };

  // Location
  const country = job.countryCode || "CH";
  const locality = job.city || job.location; // fallback: show “Geneva” or the raw location
  const jobLocation = job.remote
    ? {
        "@type": "Place",
        address: { "@type": "PostalAddress", addressCountry: country },
      }
    : locality
    ? {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: locality,
          addressCountry: country,
        },
      }
    : {
        "@type": "Place",
        address: { "@type": "PostalAddress", addressCountry: country },
      };

  // Compensation (optional)
  const compensation =
    job.baseSalaryMin && job.baseSalaryMax && job.currency
      ? {
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: job.currency,
            value: {
              "@type": "QuantitativeValue",
              minValue: job.baseSalaryMin,
              maxValue: job.baseSalaryMax,
              unitText: "YEAR",
            },
          },
        }
      : {};

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title,
    description,                // plain text is fine for JSON-LD
    datePosted,
    validThrough,
    employmentType: job.employmentType || "FULL_TIME",
    hiringOrganization,
    employmentAgency,
    jobLocation,
    applicantLocationRequirements: job.remote
      ? { "@type": "Country", name: country }
      : undefined,
    jobLocationType: job.remote ? "TELECOMMUTE" : "ON_SITE",
    industry: "Private Banking & Wealth Management",
    occupationalCategory: job.market || undefined,
    ...compensation,
    directApply: true,
    potentialAction: {
      "@type": "ApplyAction",
      target: `${SITE}/apply`,
    },
    identifier: {
      "@type": "PropertyValue",
      name: "Executive Partners",
      value: job.slug,
    },
    url,
    isAccessibleForFree: true,
  };
}

export function buildJobBreadcrumb(title: string, slug: string) {
  const base = siteBase();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Jobs", item: `${base}/jobs` },
      { "@type": "ListItem", position: 2, name: title || "Role", item: `${base}/jobs/${slug}` },
    ],
  };
}

/* ---------- Next Metadata helper ---------- */
export function buildJobMetadata(job: PublicJob | null, slug: string): Metadata {
  const base = siteBase();
  const url = `${base}/jobs/${slug}`;
  const title = job?.title ? `${job.title} | Executive Partners` : "Role | Executive Partners";
  const description =
    job?.summary ||
    sanitizeHtmlToText(job?.description) ||
    "Confidential private banking mandate via Executive Partners. Apply discreetly.";

  const robots =
    job?.active === false ? { index: false, follow: true } : { index: true, follow: true };

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
    robots,
  };
}