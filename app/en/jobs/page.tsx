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
  { title: "Senior Relationship Manager — Brazilian Market",         location: "Zurich or Geneva, Switzerland",  slug: "rm-brazil-ch" },
  { title: "Senior Relationship Manager — Argentine Market",        location: "Zurich or Geneva, Switzerland",  slug: "rm-argentina-ch" },
  { title: "Senior Relationship Manager — Swiss Onshore",           location: "Geneva, Switzerland",             slug: "swiss-onshore-geneva" },
  { title: "Senior Relationship Manager — Greek & Cypriot Market",  location: "Geneva, Switzerland",             slug: "greece-cyprus-geneva" },
  { title: "Investment Advisor — CIS & CEE (Geneva)",               location: "Geneva, Switzerland",             slug: "ia-cis-cee-geneva" },
  { title: "Investment Advisor — CIS & CEE (Zurich)",               location: "Zurich, Switzerland",             slug: "ia-cis-cee-zurich" },
  { title: "Assistant Relationship Manager — Emerging Markets",     location: "Geneva, Switzerland",             slug: "arm-russian-geneva" },
  { title: "Senior Relationship Manager — Italian Market",          location: "Milan, Italy",                    slug: "rm-italy-milan" },
  { title: "Senior Relationship Manager — Hong Kong",               location: "Hong Kong",                       slug: "rm-hong-kong" },
  { title: "Senior Relationship Manager — Singapore",               location: "Singapore",                       slug: "rm-singapore" },
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
      description:
        "Confidential private banking mandate handled exclusively by Executive Partners, Geneva.",
      industry: "Private Banking & Wealth Management",
      employmentType: "FULL_TIME",
      datePosted: "2026-01-08",
      hiringOrganization: {
        "@type": "Organization",
        name: "Executive Partners",
        sameAs: SITE,
      },
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: m.location,
        },
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
