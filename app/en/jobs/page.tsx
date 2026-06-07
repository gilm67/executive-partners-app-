/* app/en/jobs/page.tsx */
import type { Metadata } from "next";
import { Suspense } from "react";
import { BreadcrumbSchema } from "@/components/StructuredData";
import MandatesClient from "./MandatesClient";
import { MANDATES } from "./mandates-data";

/* ── site base ── */
const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://www.execpartners.ch");

/* ── SEO metadata ── */
export const metadata: Metadata = {
  title: "Private Banking Jobs Switzerland 2026 | Senior RM & Team Head Roles Geneva, Zurich, Dubai",
  description:
    "Browse confidential private banking jobs in Switzerland, Dubai and Singapore. Senior Relationship Manager, Team Head and Investment Advisor roles. Compensation visible. Apply in 90 seconds.",
  openGraph: {
    title: "Private Banking Jobs Switzerland 2026 | Senior RM Roles",
    description:
      "Active mandates across Swiss Onshore, CIS/CEE, Italian, Greek/Cypriot, Asian and Latin American markets. Confidential. Compensation visible. Apply in 90 seconds.",
    url: `${SITE}/en/jobs`,
    images: [{ url: "/og.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Banking Jobs Switzerland 2026 | Senior RM Roles",
    description:
      "Active mandates across Geneva, Zurich, Milan, Dubai, Singapore and Hong Kong. Confidential executive search.",
  },
  alternates: { canonical: `${SITE}/en/jobs` },
  robots: { index: true, follow: true },
};

/* Derive JobPosting JSON-LD from the single source of truth */
const CURRENCY_RE = /(CHF|EUR|GBP|USD|SGD|HKD)/;
function parseAmount(token: string): number {
  const m = token.match(/([\d.]+)\s*([KM])/i);
  if (!m) return 0;
  const n = parseFloat(m[1]);
  return m[2].toUpperCase() === "M" ? Math.round(n * 1000000) : Math.round(n * 1000);
}
function parseComp(comp: string): { currency: string; min: number; max: number } {
  const cur = comp.match(CURRENCY_RE)?.[1] ?? "CHF";
  const nums = comp.match(/[\d.]+\s*[KM]/gi) ?? [];
  return { currency: cur, min: nums[0] ? parseAmount(nums[0]) : 0, max: nums[1] ? parseAmount(nums[1]) : 0 };
}
function countryFromLocation(loc: string): string {
  const l = loc.toLowerCase();
  if (l.includes("milan")) return "IT";
  if (l.includes("london")) return "GB";
  if (l.includes("hong kong")) return "HK";
  if (l.includes("singapore")) return "SG";
  if (l.includes("new york")) return "US";
  return "CH";
}

const jobsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListOrder: "https://schema.org/ItemListOrderDescending",
  numberOfItems: MANDATES.length,
  itemListElement: MANDATES.map((m, idx) => {
    const comp = parseComp(m.comp_base);
    const fullTitle = `${m.title} \u2014 ${m.subtitle}`;
    return {
      "@type": "ListItem",
      position: idx + 1,
      url: `${SITE}/en/jobs#${m.id}`,
      item: {
        "@type": "JobPosting",
        title: fullTitle,
        description: `Confidential private banking mandate \u2014 ${fullTitle}. Handled exclusively by Executive Partners, Geneva. ${m.comp_base} estimated total compensation. Apply confidentially in 90 seconds.`,
        industry: "Private Banking & Wealth Management",
        employmentType: "FULL_TIME",
        datePosted: m.listedDate,
        validThrough: "2026-12-31",
        hiringOrganization: {
          "@type": "Organization",
          name: "Executive Partners",
          sameAs: SITE,
        },
        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: m.location.split(/,| or /)[0].trim(),
            addressCountry: countryFromLocation(m.location),
          },
        },
        baseSalary: {
          "@type": "MonetaryAmount",
          currency: comp.currency,
          value: {
            "@type": "QuantitativeValue",
            minValue: comp.min,
            maxValue: comp.max,
            unitText: "YEAR",
          },
        },
        applicationContact: {
          "@type": "ContactPoint",
          contactType: "Application",
          email: "gil.chalem@execpartners.ch",
          url: `${SITE}/en/apply`,
        },
      },
    };
  }),
};

/* ── Page ── */
export default function JobsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE },
          { name: "Jobs", url: `${SITE}/en/jobs` },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobsJsonLd) }}
      />

      <Suspense fallback={<div className="min-h-[400px]" />}>
        <MandatesClient />
      </Suspense>
    </>
  );
}
