// app/private-banking-recruiter-singapore/page.tsx
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
const PAGE_URL = `${SITE}/en/private-banking-recruiter-singapore`;

/* ---------- metadata ---------- */
export const metadata: Metadata = {
  title: {
    absolute: "Private Banking Recruiter Singapore | Senior RM & Asia Wealth Search",
  },
  description:
    "Executive search boutique for senior Private Banking & Wealth Management hires in Singapore. Singapore onshore, Non-Dom, International and Family Office coverage.",
  alternates: {
    canonical: "https://www.execpartners.ch/en/private-banking-recruiter-singapore",
  },
  openGraph: {
    type: "article",
    url: "https://www.execpartners.ch/en/private-banking-recruiter-singapore",
    title: "Private Banking Recruiter Singapore | Senior RM & Asia Wealth Search",
    description:
      "Specialist recruiter for Private Banking & Wealth Management in Singapore: Singapore onshore, Non-Dom and international UHNW.",
    siteName: "Executive Partners",
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Banking Recruiter Singapore | Senior RM & Asia Wealth Search",
    description: "Specialist recruiter for Private Banking & Wealth Management in Singapore: Singapore onshore, Non-Dom and international UHNW.",
    images: ["https://www.execpartners.ch/og.webp"],
  },
  robots: { index: true, follow: true },
};

export default function PrivateBankingRecruiterSingaporePage() {
  // ---------- Structured Data (JSON-LD) ----------
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    name: "Executive Partners – Private Banking Recruiter in Singapore",
    url: PAGE_URL,
    image: `${SITE}/og.webp`,
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
        name: "Private Banking Recruiter in Singapore",
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
        city="Singapore"
        country="Singapore"
        heroEyebrow="Private Banking · Singapore · Executive Search"
        heroTitle="Private Banking Recruiter in Singapore"
        heroSubtitle="Senior RMs and Desk Heads covering Singapore onshore, Non-Dom and international UHNW."
        heroIntro={
          "Singapore remains a strategic hub for ultra-high-net-worth families, single-family offices and international entrepreneurs despite tax changes and regulatory complexity. The most competitive platforms blend high-touch advisory, alternatives access and strong cross-border capabilities."
        }
        bulletPoints={[
          "Senior RMs with SGD 150m–400m+ portable AUM across Singapore onshore and international clients.",
          "Desk Heads for UHNW, Family Office and International Wealth franchises.",
          "Moves between global US platforms, Swiss banks and Singapore domestic private banks.",
          "Advice on Singapore Non-Dom changes, booking-centre strategy and long-term mobility (Geneva, Zurich, Dubai, Singapore).",
        ]}
        marketSummary={
          "In Singapore, hiring managers are emphasising advisory quality, alternatives penetration and cross-border coordination as much as raw AUM. Fee pressure and regulatory scrutiny mean banks want seasoned bankers who can evidence durable, multi-year revenues and clean portability."
        }
        compCurrency="SGD"
        compRows={[
          {
            level: "Senior RM (8–12y, strong book)",
            baseRange: "SGD 170k – 250k",
            bonusRange: "40% – 100% of base",
            totalRange: "≈ SGD 240k – 500k+",
          },
          {
            level: "Desk Head / Team Lead",
            baseRange: "SGD 210k – 300k",
            bonusRange: "60% – 120% of base",
            totalRange: "≈ SGD 330k – 650k+",
          },
          {
            level: "Market Head / Business Head",
            baseRange: "SGD 260k – 380k",
            bonusRange: "80% – 150% of base",
            totalRange: "≈ SGD 470k – 950k+",
          },
        ]}
        bookingCentres={[
          "Singapore booking centre",
          "Geneva & Zurich",
          "Jersey / Channel Islands",
          "Dubai & Singapore",
        ]}
        desksCovered={[
          "Singapore onshore HNW / UHNW",
          "Non-Dom & international professionals",
          "Family Offices & entrepreneurs",
          "Global NRI / international wealth",
        ]}
        pdfHref="/pdfs/private-banking-career-intelligence-2026.pdf"
        insightsLinks={[
          {
            label: "The Americans Are Already Here",
            href: "/en/insights/americans-already-here",
          },
          {
            label: "The Emotional Strategist: When AI Handles the Analysis",
            href: "/en/insights/the-emotional-strategist",
          },
          {
            label: "The Last Wave: UBS Integration and What Comes Next",
            href: "/en/insights/the-last-wave",
          }
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