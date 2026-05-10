/* app/en/jobs/page.tsx */
import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import MandatesClient from "./MandatesClient";

/* ── site base ── */
const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://www.execpartners.ch");

/* ── SEO metadata ── */
export const metadata: Metadata = {
  title: "Private Banking Jobs | Executive Partners Geneva",
  description:
    "Active private banking mandates across Geneva, Zurich, Milan, Dubai, Singapore and Hong Kong. Senior Relationship Managers, Investment Advisors and Assistant RMs. Confidential executive search.",
  openGraph: {
    title: "Private Banking Jobs | Executive Partners",
    description:
      "10 active mandates across LATAM, Swiss Onshore, CIS/CEE, Italian, Greek/Cypriot and Asian markets. Confidential. Comp-visible. Apply in 90 seconds.",
    url: `${SITE}/en/jobs`,
    images: [{ url: "/og.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Banking Jobs | Executive Partners",
    description:
      "Active mandates across Geneva, Zurich, Milan, Dubai, Singapore and Hong Kong. Confidential executive search.",
  },
  alternates: { canonical: `${SITE}/en/jobs` },
  robots: { index: true, follow: true },
};

/* ── Static mandate data for JSON-LD (mirrors MandatesClient) ── */
const MANDATE_SCHEMA = [
  { title: "Senior Relationship Manager — Brazilian Market",        location: "Geneva or Zurich, Switzerland", country: "CH", currency: "CHF", salaryMin: 180000, salaryMax: 280000, slug: "rm-brazil-ch" },
  { title: "Senior Relationship Manager — Argentine Market",        location: "Geneva or Zurich, Switzerland", country: "CH", currency: "CHF", salaryMin: 180000, salaryMax: 280000, slug: "rm-argentina-ch" },
  { title: "Senior Relationship Manager — Swiss Onshore",           location: "Geneva, Switzerland",           country: "CH", currency: "CHF", salaryMin: 160000, salaryMax: 240000, slug: "swiss-onshore-geneva" },
  { title: "Senior Relationship Manager — Greek & Cypriot Market",  location: "Geneva, Switzerland",           country: "CH", currency: "CHF", salaryMin: 170000, salaryMax: 260000, slug: "greece-cyprus-geneva" },
  { title: "Investment Advisor — CIS & CEE (Geneva)",               location: "Geneva, Switzerland",           country: "CH", currency: "CHF", salaryMin: 140000, salaryMax: 220000, slug: "ia-cis-cee-geneva" },
  { title: "Investment Advisor — CIS & CEE (Zurich)",               location: "Zurich, Switzerland",           country: "CH", currency: "CHF", salaryMin: 140000, salaryMax: 220000, slug: "ia-cis-cee-zurich" },
  { title: "Assistant Relationship Manager — Emerging Markets",     location: "Geneva, Switzerland",           country: "CH", currency: "CHF", salaryMin: 90000,  salaryMax: 130000, slug: "arm-russian-geneva" },
  { title: "Senior Relationship Manager — Italian Market (Milan)",  location: "Milan, Italy",                  country: "IT", currency: "EUR", salaryMin: 150000, salaryMax: 250000, slug: "rm-italy-milan" },
  { title: "Senior Relationship Manager — Hong Kong",               location: "Hong Kong",                     country: "HK", currency: "HKD", salaryMin: 1800000, salaryMax: 3000000, slug: "rm-hong-kong" },
  { title: "Senior Relationship Manager — Singapore",               location: "Singapore",                     country: "SG", currency: "SGD", salaryMin: 280000, salaryMax: 450000, slug: "rm-singapore" },
  { title: "Senior Relationship Manager — UK Market",               location: "Geneva, Switzerland",           country: "CH", currency: "CHF", salaryMin: 180000, salaryMax: 280000, slug: "rm-uk-market" },
  { title: "Senior Relationship Manager — South African Market",    location: "Geneva, Switzerland",           country: "CH", currency: "CHF", salaryMin: 170000, salaryMax: 270000, slug: "rm-south-africa" },
];

const jobsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListOrder: "https://schema.org/ItemListOrderDescending",
  numberOfItems: MANDATE_SCHEMA.length,
  itemListElement: MANDATE_SCHEMA.map((m, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    url: `${SITE}/en/jobs#${m.slug}`,
    item: {
      "@type": "JobPosting",
      title: m.title,
      description: `Confidential private banking mandate — ${m.title}. Handled exclusively by Executive Partners, Geneva. ${m.currency} ${m.salaryMin.toLocaleString()}–${m.salaryMax.toLocaleString()} estimated total compensation. Apply confidentially in 90 seconds.`,
      industry: "Private Banking & Wealth Management",
      employmentType: "FULL_TIME",
      datePosted: "2026-05-01",
      validThrough: "2026-10-31",
      hiringOrganization: {
        "@type": "Organization",
        name: "Executive Partners",
        sameAs: SITE,
      },
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: m.location.split(",")[0].trim(),
          addressCountry: m.country,
        },
      },
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: m.currency,
        value: {
          "@type": "QuantitativeValue",
          minValue: m.salaryMin,
          maxValue: m.salaryMax,
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
  })),
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

      <MandatesClient />
    </>
  );
}
