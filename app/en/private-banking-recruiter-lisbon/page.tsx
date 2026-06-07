// app/private-banking-recruiter-lisbon/page.tsx
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
const PAGE_URL = `${SITE}/en/private-banking-recruiter-lisbon`;

/* ---------- metadata ---------- */
export const metadata: Metadata = {
  title: {
    absolute: "Private Banking Recruiter Lisbon | Senior RM & Portuguese Wealth Search",
  },
  description:
    "Executive search boutique focused on senior Private Banking & Wealth Management hires in Lisbon and the wider Portuguese market. Senior RMs serving international residents, returning expatriates and entrepreneurs.",
  alternates: {
    canonical: "https://www.execpartners.ch/en/private-banking-recruiter-lisbon",
  },
  openGraph: {
    type: "article",
    url: "https://www.execpartners.ch/en/private-banking-recruiter-lisbon",
    title: "Private Banking Recruiter Lisbon | Senior RM & Portuguese Wealth Search",
    description:
      "Specialist recruiter for Private Banking & Wealth Management in Lisbon: international HNW residents, tech/real-estate entrepreneurs and returning Portuguese families.",
    siteName: "Executive Partners",
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Banking Recruiter Lisbon | Senior RM & Portuguese Wealth Search",
    description: "Specialist recruiter for Private Banking & Wealth Management in Lisbon: international HNW residents, tech/real-estate entrepreneurs and returning Portugues",
    images: ["https://www.execpartners.ch/og.webp"],
  },
  robots: { index: true, follow: true },
};

export default function PrivateBankingRecruiterLisbonPage() {
  // ---------- Structured Data (JSON-LD) ----------
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    name: "Executive Partners – Private Banking Recruiter in Lisbon",
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
    areaServed: ["PT", "CH", "GB", "LU", "EU"],
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
        name: "Private Banking Recruiter in Lisbon",
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
        city="Lisbon"
        country="Portugal"
        heroEyebrow="Private Banking · Lisbon · Executive Search"
        heroTitle="Private Banking Recruiter in Lisbon"
        heroSubtitle="Senior Private Bankers serving international HNW residents, entrepreneurs and returning Portuguese families."
        heroIntro={
          "Lisbon has emerged as a lifestyle-driven wealth hub, attracting international HNW individuals, tech founders and remote executives alongside established Portuguese families. Local and international institutions are seeking bankers able to combine international structuring with pragmatic, on-the-ground relationship management."
        }
        bulletPoints={[
          "Senior RMs with EUR 80m–200m+ AUM across international and domestic HNW clients.",
          "Coverage of expatriate communities, tech founders, real-estate investors and returning Portuguese families.",
          "Moves between Portuguese banks, international platforms and boutique wealth managers.",
          "Advisory on how to position between Portugal, Switzerland, UK and other booking centres.",
        ]}
        marketSummary={
          "For private bankers, Lisbon offers access to a growing base of internationally mobile clients who value lifestyle, flexibility and cross-border structuring. The strongest platforms can coordinate with Swiss, UK or Luxembourg booking centres while providing local lending, real-estate and corporate-finance access. Hiring managers are focusing on bankers with a genuinely international client book, strong English plus additional languages, and a consultative, planning-led advisory style."
        }
        compCurrency="EUR"
        compRows={[
          {
            level: "Senior RM (Portugal / international)",
            baseRange: "EUR 80k – 130k",
            bonusRange: "20% – 55% of base",
            totalRange: "≈ EUR 100k – 200k",
          },
          {
            level: "Team Lead / Desk Head",
            baseRange: "EUR 110k – 160k",
            bonusRange: "35% – 75% of base",
            totalRange: "≈ EUR 150k – 280k",
          },
          {
            level: "Market Head Portugal",
            baseRange: "EUR 150k – 200k",
            bonusRange: "50% – 90% of base",
            totalRange: "≈ EUR 225k – 380k",
          },
        ]}
        bookingCentres={[
          "Lisbon & Porto onshore",
          "Zurich & Geneva",
          "Luxembourg",
          "London and other EU hubs",
        ]}
        desksCovered={[
          "International HNW residents in Portugal",
          "Tech and digital entrepreneurs",
          "Real-estate and hospitality investors",
          "Returning Portuguese families / expats",
        ]}
        pdfHref="/pdfs/private-banking-career-intelligence-2026.pdf"
        insightsLinks={[
          {
            label: "The Last Wave: UBS Integration and What Comes Next",
            href: "/en/insights/the-last-wave",
          },
          {
            label: "Switzerland Is Running Out of Banks",
            href: "/en/insights/switzerland-running-out-banks",
          },
          {
            label: "The Emotional Strategist: When AI Handles the Analysis",
            href: "/en/insights/the-emotional-strategist",
          }
        ]}
      />
    </>
  );
}