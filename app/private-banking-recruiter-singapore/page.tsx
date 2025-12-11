// app/private-banking-recruiter-paris/page.tsx
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
const PAGE_URL = `${SITE}/private-banking-recruiter-paris`;

/* ---------- metadata ---------- */
export const metadata: Metadata = {
  title: {
    absolute: "Private Banking Recruiter in Paris – Executive Partners",
  },
  description:
    "Executive search boutique focused on senior Private Banking & Wealth Management hires in Paris and major French / EU hubs. Senior RMs, Desk Heads and Market Leaders with UHNW/HNW domestic and cross-border books.",
  alternates: {
    canonical: "/private-banking-recruiter-paris",
  },
  openGraph: {
    type: "article",
    url: "/private-banking-recruiter-paris",
    title: "Private Banking Recruiter in Paris – Executive Partners",
    description:
      "Specialist recruiter for Private Banking & Wealth Management in Paris: French UHNW/HNW, entrepreneurs and cross-border EU flows.",
    siteName: "Executive Partners",
  },
  robots: { index: true, follow: true },
};

export default function PrivateBankingRecruiterParisPage() {
  // ---------- Structured Data (JSON-LD) ----------
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    name: "Executive Partners – Private Banking Recruiter in Paris",
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
    areaServed: ["FR", "CH", "LU", "GB", "EU"],
    sameAs: [
      SITE,
      "https://www.linkedin.com/company/executive-partners",
    ],
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
        name: "Private Banking Recruiter in Paris",
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
        city="Paris"
        country="France"
        heroEyebrow="Private Banking · Paris · Executive Search"
        heroTitle="Private Banking Recruiter in Paris"
        heroSubtitle="Senior Private Bankers and Desk Heads covering French UHNW, entrepreneurs and cross-border EU clients."
        heroIntro={
          "Paris is a strategic hub for French UHNW families, listed-company executives and tech / private equity entrepreneurs. Large universal banks and specialist wealth managers are competing for senior Relationship Managers who can combine tax-aware advisory with sophisticated investment and credit capabilities."
        }
        bulletPoints={[
          "Senior RMs with EUR 150m–400m+ AUM across French UHNW/HNW and entrepreneurs.",
          "Desk Heads for Paris onshore, key regional centres and EU cross-border coverage.",
          "Moves between universal banks, pure-play wealth managers and family-office style platforms.",
          "Advisory on compensation design, carried-interest style incentives and long-term retention.",
        ]}
        marketSummary={
          "For experienced bankers, Paris offers access to one of Europe’s deepest domestic wealth pools, increasingly driven by tech, PE and mid-market M&A wealth creation. The most attractive platforms balance strong brand recognition, open-architecture investment platforms and the ability to work seamlessly with lawyers, tax advisers and corporate finance partners. Hiring managers are prioritising bankers who can demonstrate recurring advisory revenues, low attrition and disciplined risk management in a tighter regulatory environment."
        }
        compCurrency="EUR"
        compRows={[
          {
            level: "Senior RM (onshore France)",
            baseRange: "EUR 130k – 190k",
            bonusRange: "30% – 70% of base",
            totalRange: "≈ EUR 170k – 320k",
          },
          {
            level: "Desk Head / Team Lead",
            baseRange: "EUR 170k – 230k",
            bonusRange: "50% – 90% of base",
            totalRange: "≈ EUR 255k – 435k",
          },
          {
            level: "Market Head France",
            baseRange: "EUR 210k – 280k",
            bonusRange: "70% – 110% of base",
            totalRange: "≈ EUR 360k – 580k",
          },
        ]}
        bookingCentres={[
          "Paris onshore",
          "Luxembourg",
          "Geneva & Zurich",
          "London and other EU hubs",
        ]}
        desksCovered={[
          "French UHNW families",
          "Tech, PE and corporate executives",
          "Mid-market entrepreneurs and family businesses",
          "Non-resident French / cross-border EU",
        ]}
        pdfHref="/pdfs/private-banking-career-intelligence-2025.pdf"
        insightsLinks={[
          {
            label: "Swiss Private Banking: Thriving Against the Odds",
            href:
              "/insights/swiss-private-banking-thriving-against-the-odds-2025-12-09",
          },
          {
            label:
              "The Swiss Banking Earthquake: How the Credit Suisse Collapse…",
            href:
              "/insights/the-swiss-banking-earthquake-how-the-credit-suisse-collapse-is-creating-the-bigg-2025-12-09",
          },
          {
            label:
              "The AI Reckoning: How 5,200 Job Cuts Are Reshaping Private Banking Talent",
            href:
              "/insights/the-ai-reckoning-how-5-200-job-cuts-are-reshaping-private-banking-talent-forever-2025-12-09",
          },
        ]}
        relatedCities={[
          { label: "Geneva", href: "/private-banking-recruiter-geneva" },
          { label: "Zurich", href: "/private-banking-recruiter-zurich" },
          { label: "Madrid", href: "/private-banking-recruiter-madrid" },
        ]}
      />
    </>
  );
}