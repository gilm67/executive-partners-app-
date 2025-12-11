// app/private-banking-recruiter-london/page.tsx
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
const PAGE_URL = `${SITE}/private-banking-recruiter-london`;

/* ---------- metadata ---------- */
export const metadata: Metadata = {
  title: {
    absolute: "Private Banking Recruiter in London – Executive Partners",
  },
  description:
    "Executive search boutique for senior Private Banking & Wealth Management hires in London. UK onshore, Non-Dom, International and Family Office coverage.",
  alternates: {
    canonical: "/private-banking-recruiter-london",
  },
  openGraph: {
    type: "article",
    url: "/private-banking-recruiter-london",
    title: "Private Banking Recruiter in London – Executive Partners",
    description:
      "Specialist recruiter for Private Banking & Wealth Management in London: UK onshore, Non-Dom and international UHNW.",
    siteName: "Executive Partners",
  },
  robots: { index: true, follow: true },
};

export default function PrivateBankingRecruiterLondonPage() {
  // ---------- Structured Data (JSON-LD) ----------
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    name: "Executive Partners – Private Banking Recruiter in London",
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
    areaServed: ["GB", "CH", "AE", "SG", "HK", "US"],
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
        name: "Private Banking Recruiter in London",
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
        city="London"
        country="UK"
        heroEyebrow="Private Banking · London · Executive Search"
        heroTitle="Private Banking Recruiter in London"
        heroSubtitle="Senior RMs and Desk Heads covering UK onshore, Non-Dom and international UHNW."
        heroIntro={
          "London remains a strategic hub for ultra-high-net-worth families, single-family offices and international entrepreneurs despite tax changes and regulatory complexity. The most competitive platforms blend high-touch advisory, alternatives access and strong cross-border capabilities."
        }
        bulletPoints={[
          "Senior RMs with GBP 150m–400m+ portable AUM across UK onshore and international clients.",
          "Desk Heads for UHNW, Family Office and International Wealth franchises.",
          "Moves between global US platforms, Swiss banks and UK domestic private banks.",
          "Advice on UK Non-Dom changes, booking-centre strategy and long-term mobility (Geneva, Zurich, Dubai, Singapore).",
        ]}
        marketSummary={
          "In London, hiring managers are emphasising advisory quality, alternatives penetration and cross-border coordination as much as raw AUM. Fee pressure and regulatory scrutiny mean banks want seasoned bankers who can evidence durable, multi-year revenues and clean portability."
        }
        compCurrency="GBP"
        compRows={[
          {
            level: "Senior RM (8–12y, strong book)",
            baseRange: "GBP 170k – 250k",
            bonusRange: "40% – 100% of base",
            totalRange: "≈ GBP 240k – 500k+",
          },
          {
            level: "Desk Head / Team Lead",
            baseRange: "GBP 210k – 300k",
            bonusRange: "60% – 120% of base",
            totalRange: "≈ GBP 330k – 650k+",
          },
          {
            level: "Market Head / Business Head",
            baseRange: "GBP 260k – 380k",
            bonusRange: "80% – 150% of base",
            totalRange: "≈ GBP 470k – 950k+",
          },
        ]}
        bookingCentres={[
          "London booking centre",
          "Geneva & Zurich",
          "Jersey / Channel Islands",
          "Dubai & Singapore",
        ]}
        desksCovered={[
          "UK onshore HNW / UHNW",
          "Non-Dom & international professionals",
          "Family Offices & entrepreneurs",
          "Global NRI / international wealth",
        ]}
        pdfHref="/pdfs/private-banking-career-intelligence-2025.pdf"
        insightsLinks={[
          {
            label:
              "This Week Changed Everything: Four Events Reshaping Wealth Management",
            href:
              "/insights/this-week-changed-everything-four-events-reshaping-wealth-management",
          },
          {
            label:
              "The Swiss Banking Earthquake: How the Credit Suisse Collapse…",
            href:
              "/insights/the-swiss-banking-earthquake-how-the-credit-suisse-collapse-is-creating-the-bigg-2025-12-09",
          },
          {
            label:
              "Unlock Your Next Career Move: Senior RMs with Portable Books",
            href:
              "/insights/unlock-your-next-career-move-senior-rms-with-portable-books-in-the-spotlight-acr-2025-12-09",
          },
        ]}
        relatedCities={[
          { label: "Geneva", href: "/private-banking-recruiter-geneva" },
          { label: "Zurich", href: "/private-banking-recruiter-zurich" },
          { label: "Dubai", href: "/private-banking-recruiter-dubai" },
        ]}
      />
    </>
  );
}