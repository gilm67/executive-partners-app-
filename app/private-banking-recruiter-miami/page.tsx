// app/private-banking-recruiter-miami/page.tsx
import type { Metadata } from "next";
import CityRecruiterPage from "@/components/CityRecruiterPage";

export const metadata: Metadata = {
  title: {
    absolute: "Private Banking Recruiter in Miami – Executive Partners",
  },
  description:
    "Executive search boutique focused on senior Private Banking & Wealth Management hires in Miami and key LatAm-linked booking centres. Senior Private Bankers, Desk Heads and Market Leaders with documented UHNW/HNW books.",
  alternates: {
    canonical: "/private-banking-recruiter-miami",
  },
  openGraph: {
    type: "article",
    url: "/private-banking-recruiter-miami",
    title: "Private Banking Recruiter in Miami – Executive Partners",
    description:
      "Specialist recruiter for Private Banking & Wealth Management in Miami: LatAm UHNW, international offshore and US-based entrepreneurs.",
    siteName: "Executive Partners",
  },
  robots: { index: true, follow: true },
};

export default function PrivateBankingRecruiterMiamiPage() {
  return (
    <CityRecruiterPage
      city="Miami"
      country="United States"
      heroEyebrow="Private Banking · Miami · Executive Search"
      heroTitle="Private Banking Recruiter in Miami"
      heroSubtitle="Senior Private Bankers and Desk Heads serving LatAm UHNW and international offshore clients."
      heroIntro={
        "Miami has evolved from a regional hub into a strategic platform for LatAm UHNW families, cross-border entrepreneurs and institutional-style family offices. Competition for senior bankers with deep, trust-based relationships is intense across Brazilian, Mexican, Southern Cone and Andean coverage."
      }
      bulletPoints={[
        "Senior Private Bankers with USD 200m–500m+ portable AUM across LatAm UHNW/HNW pods.",
        "Desk Heads for Brazil, Southern Cone, Andean and Mexico coverage, plus multi-country LatAm books.",
        "Moves between global platforms and LatAm-focused boutiques / multi-family offices.",
        "Guidance on US vs offshore booking, tax & regulatory expectations and team build-outs.",
      ]}
      marketSummary={
        "For senior talent, Miami offers a unique mix of dollar-based booking, proximity to LatAm clients and strong access to alternatives, credit and structured solutions. The most attractive platforms combine robust international compliance standards with pragmatic onboarding and a credible LatAm investment proposition. Hiring managers are prioritising bankers who can evidence clean, auditable portability and collaborative behaviour in team-based coverage models."
      }
      compCurrency="USD"
      compRows={[
        {
          level: "Senior Private Banker (LatAm)",
          baseRange: "USD 210k – 300k",
          bonusRange: "40% – 110% of base",
          totalRange: "≈ USD 290k – 630k+",
        },
        {
          level: "Desk Head / Team Lead",
          baseRange: "USD 250k – 340k",
          bonusRange: "60% – 130% of base",
          totalRange: "≈ USD 400k – 780k+",
        },
        {
          level: "Market Head LatAm",
          baseRange: "USD 320k – 450k",
          bonusRange: "80% – 150% of base",
          totalRange: "≈ USD 580k – 1.1m+",
        },
      ]}
      bookingCentres={[
        "Miami booking centre",
        "New York",
        "Zurich & Geneva",
        "Local LatAm hubs (São Paulo, Mexico City, Bogotá, Santiago)",
      ]}
      desksCovered={[
        "Brazil UHNW",
        "Southern Cone (Argentina, Chile, Uruguay)",
        "Mexico & Central America",
        "Andean region (Colombia, Peru, etc.)",
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
          label: "The Power Shift: How Private Banking Talent Dynamics Are Evolving",
          href:
            "/insights/the-power-shift-how-private-banking-talent-dynamics-are-evolving",
        },
        {
          label: "Swiss Private Banking: Thriving Against the Odds",
          href: "/insights/swiss-private-banking-thriving-against-the-odds",
        },
      ]}
    />
  );
}