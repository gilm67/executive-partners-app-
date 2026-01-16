// app/private-banking-recruiter-new-york/page.tsx
import type { Metadata } from "next";
import CityRecruiterPage from "@/components/CityRecruiterPage";

/* ---------- helpers for absolute URLs ---------- */
function siteBase() {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL ||
    "https://www.execpartners.ch";
  const url = fromEnv.startsWith("http") ? fromEnv : `https://${fromEnv}`;
  return url.replace(/\/$/, "");
}

const SITE = siteBase();
const PAGE_URL = `${SITE}/private-banking-recruiter-new-york`;

/* ---------- metadata ---------- */
export const metadata: Metadata = {
  title: {
    absolute: "Private Banking Recruiter in New York – Executive Partners",
  },
  description:
    "Executive search boutique focused on senior Private Banking & Wealth Management hires in New York and key US booking centres. Senior RMs, Desk Heads and Market Leaders with documented UHNW/HNW books.",
  alternates: {
    canonical: "/private-banking-recruiter-new-york",
  },
  openGraph: {
    type: "article",
    url: "/private-banking-recruiter-new-york",
    title: "Private Banking Recruiter in New York – Executive Partners",
    description:
      "Specialist recruiter for Private Banking & Wealth Management in New York: US onshore, LatAm offshore and global UHNW coverage.",
    siteName: "Executive Partners",
  },
  robots: { index: true, follow: true },
};

export default function PrivateBankingRecruiterNewYorkPage() {
  // ---------- Structured Data (JSON-LD) ----------
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    name: "Executive Partners – Private Banking Recruiter in New York",
    url: PAGE_URL,
    image: `${SITE}/og.png`,
    logo: `${SITE}/icon.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "118 rue du Rhône",
      addressLocality: "Geneva",
      postalCode: "1204",
      addressCountry: "CH",
    },
    areaServed: ["US", "CH", "BR", "MX", "AR", "CL"],
    sameAs: [SITE],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Private Banking Recruiter in New York",
        item: PAGE_URL,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <CityRecruiterPage
        city="New York"
        country="United States"
        heroEyebrow="Private Banking · New York · Executive Search"
        heroTitle="Private Banking Recruiter in New York"
        heroSubtitle="Senior Private Bankers, Desk Heads and Market Leaders across US onshore and LatAm offshore."
        heroIntro={
          "New York remains one of the most strategic wealth hubs in the world — a nexus for US UHNW families, global entrepreneurs and LatAm offshore clients. Competition is intense for senior Relationship Managers with deep, multi-cycle client relationships and a demonstrable track record of net new money and ROA."
        }
        bulletPoints={[
          "Senior Private Bankers with USD 200m–500m+ portable AUM across US UHNW/HNW and LatAm offshore.",
          "Desk Heads and Market Leaders covering US onshore, International & LatAm segments.",
          "Moves between global platforms (UBS, JPM, MS, Citi, HSBC, BofA) and leading boutiques / multi-family offices.",
          "Advisory on UHNWI segment positioning, platform differentiation and long-term compensation architecture.",
        ]}
        marketSummary={
          "For senior bankers, New York offers access to one of the deepest UHNW ecosystems globally, combined with sophisticated product platforms across advisory, alternatives and lending. The most attractive platforms balance institutional brand, open-architecture investment solutions and pragmatic onboarding for cross-border clients, particularly for LatAm and international entrepreneurs booking into the US. Institutions are prioritising bankers who can evidence clean, compliant portability, strong teaming behaviour and a proven ability to generate recurring revenues in volatile markets."
        }
        compCurrency="USD"
        compRows={[
          {
            level: "Senior Private Banker (US / LatAm)",
            baseRange: "USD 210k – 310k",
            bonusRange: "40% – 110% of base",
            totalRange: "≈ USD 290k – 650k+",
          },
          {
            level: "Desk Head / Team Lead",
            baseRange: "USD 260k – 360k",
            bonusRange: "60% – 130% of base",
            totalRange: "≈ USD 420k – 820k+",
          },
          {
            level: "Market Head / Segment Head",
            baseRange: "USD 320k – 450k",
            bonusRange: "80% – 150% of base",
            totalRange: "≈ USD 580k – 1.1m+",
          },
        ]}
        bookingCentres={[
          "New York (US onshore & offshore booking)",
          "Miami",
          "Zurich & Geneva",
          "Local LatAm hubs (São Paulo, Mexico City, Bogotá)",
        ]}
        desksCovered={[
          "US UHNW & key HNW pods",
          "LatAm offshore (Brazil, Mexico, Southern Cone, Andean region)",
          "International entrepreneurs booking into the US",
          "Family offices and private investment offices",
        ]}
        pdfHref="/pdfs/private-banking-career-intelligence-2026.pdf"
        insightsLinks={[
          {
            label:
              "This Week Changed Everything: Four Events Reshaping Wealth Management",
            href:
              "/insights/this-week-changed-everything-four-events-reshaping-wealth-management-2025-12-09",
          },
          {
            label: "Swiss Private Banking: Thriving Against the Odds",
            href:
              "/insights/swiss-private-banking-thriving-against-the-odds-2025-12-09",
          },
          {
            label:
              "The Power Shift: How Private Banking Talent Dynamics Are Evolving",
            href:
              "/insights/the-power-shift-how-private-banking-talent-dynamics-are-evolving-2025-12-09",
          },
        ]}
      />
    </>
  );
}