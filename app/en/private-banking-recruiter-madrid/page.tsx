// app/private-banking-recruiter-madrid/page.tsx
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
const PAGE_URL = `${SITE}/en/private-banking-recruiter-madrid`;

/* ---------- metadata ---------- */
export const metadata: Metadata = {
  title: {
    absolute: "Private Banking Recruiter Madrid | Senior RM & Spanish UHNW Search",
  },
  description:
    "Executive search boutique focused on senior Private Banking & Wealth Management hires in Madrid and Iberian markets. Senior RMs and Desk Heads serving Spanish UHNW/HNW and LatAm-linked flows.",
  alternates: {
    canonical: "https://www.execpartners.ch/en/private-banking-recruiter-madrid",
  },
  openGraph: {
    type: "article",
    url: "https://www.execpartners.ch/en/private-banking-recruiter-madrid",
    title: "Private Banking Recruiter Madrid | Senior RM & Spanish UHNW Search",
    description:
      "Specialist recruiter for Private Banking & Wealth Management in Madrid: Spanish UHNW, family business owners and LatAm corridors.",
    siteName: "Executive Partners",
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Banking Recruiter Madrid | Senior RM & Spanish UHNW Search",
    description: "Specialist recruiter for Private Banking & Wealth Management in Madrid: Spanish UHNW, family business owners and LatAm corridors.",
    images: ["https://www.execpartners.ch/og.webp"],
  },
  robots: { index: true, follow: true },
};

export default function PrivateBankingRecruiterMadridPage() {
  // ---------- Structured Data (JSON-LD) ----------
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    name: "Executive Partners – Private Banking Recruiter in Madrid",
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
    areaServed: ["ES", "CH", "GB", "PT", "IT", "US", "MX", "BR"],
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
        name: "Private Banking Recruiter in Madrid",
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
        city="Madrid"
        country="Spain"
        heroEyebrow="Private Banking · Madrid · Executive Search"
        heroTitle="Private Banking Recruiter in Madrid"
        heroSubtitle="Senior RMs and Desk Heads covering Spanish UHNW, entrepreneurs and LatAm-linked client books."
        heroIntro={
          "Madrid is consolidating its position as the key Iberian wealth hub, serving longstanding family businesses, new-economy founders and returning expatriates. Spanish banks and international players compete for bankers who can originate advisory mandates and manage complex family structures across Spain and Latin America."
        }
        bulletPoints={[
          "Senior RMs with EUR 120m–300m+ AUM across Spanish UHNW/HNW and family groups.",
          "Desk Heads for Iberia, LatAm-linked corridors and select non-resident books.",
          "Moves between domestic champions, international wealth managers and boutique platforms.",
          "Guidance on variable compensation, carried-interest style schemes and long-term LTIP.",
        ]}
        marketSummary={
          "For experienced private bankers, Madrid offers access to deep multigenerational wealth and a growing pool of tech and real-estate fortunes. The most compelling platforms combine credible investment capabilities (advisory + discretionary), strong lending, and cross-border structuring for clients with assets and family members across Iberia, LatAm and the UK/Switzerland. Institutions are placing particular emphasis on documented net new money, fee-based revenues and disciplined risk/compliance behaviour."
        }
        compCurrency="EUR"
        compRows={[
          {
            level: "Senior RM (Iberia)",
            baseRange: "EUR 110k – 170k",
            bonusRange: "25% – 60% of base",
            totalRange: "≈ EUR 140k – 270k",
          },
          {
            level: "Desk Head Iberia / LatAm corridor",
            baseRange: "EUR 150k – 210k",
            bonusRange: "40% – 80% of base",
            totalRange: "≈ EUR 210k – 380k",
          },
          {
            level: "Market Head Spain",
            baseRange: "EUR 190k – 250k",
            bonusRange: "60% – 100% of base",
            totalRange: "≈ EUR 300k – 500k",
          },
        ]}
        bookingCentres={[
          "Madrid onshore",
          "Barcelona and regional centres",
          "Zurich & Geneva",
          "Miami / LatAm hubs for offshore booking",
        ]}
        desksCovered={[
          "Spanish UHNW families & family offices",
          "Mid-market entrepreneurs and real-estate groups",
          "LatAm-linked client books",
          "Returning expatriates and non-resident Spaniards",
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