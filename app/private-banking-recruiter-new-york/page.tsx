import type { Metadata } from "next";
import CityRecruiterPage from "../components/CityRecruiterPage";

export const metadata: Metadata = {
  title: {
    absolute: "Private Banking Recruiter in Miami – Executive Partners",
  },
  description:
    "Executive search boutique for senior Private Banking & Wealth Management hires in Miami. LatAm UHNW, international wealth and US offshore booking-centre roles.",
  alternates: {
    canonical: "/private-banking-recruiter-miami",
  },
  openGraph: {
    type: "article",
    url: "/private-banking-recruiter-miami",
    title: "Private Banking Recruiter in Miami – Executive Partners",
    description:
      "Specialist recruiter for Private Banking & Wealth Management in Miami: LatAm UHNW and international offshore wealth.",
    siteName: "Executive Partners",
  },
  robots: { index: true, follow: true },
};

export default function PrivateBankingRecruiterMiamiPage() {
  return (
    <CityRecruiterPage
      city="Miami"
      country="US"
      heroEyebrow="Private Banking · Miami · Executive Search"
      heroTitle="Private Banking Recruiter in Miami"
      heroSubtitle="Senior Private Bankers and Desk Heads serving LatAm UHNW and international offshore clients."
      heroIntro={
        "Miami has evolved from a regional hub into a strategic platform for LatAm UHNW families, cross-border entrepreneurs and institutional-style family offices. Competition for senior bankers with deep, trust-based LatAm relationships is intense."
      }
      bulletPoints={[
        "Senior Bankers with USD 200m–500m+ portable AUM across LatAm UHNW/HNW.",
        "Desk Heads for Brazil, Southern Cone, Andean and Mexico coverage.",
        "Moves between global platforms, US banks and boutique LatAm-focused private banks.",
        "Support on US offshore rules, KYC/AML expectations and booking-centre strategy.",
      ]}
      marketSummary={
        "Despite regulatory pressures and geopolitical volatility, Miami continues to attract assets from Brazil, Mexico, Argentina, Colombia and beyond. Banks are prioritising senior talent with resilient client relationships, strong compliance records and the ability to work across Miami, New York and local LatAm offices."
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
          baseRange: "USD 260k – 360k",
          bonusRange: "60% – 130% of base",
          totalRange: "≈ USD 420k – 820k+",
        },
        {
          level: "Market Head LatAm",
          baseRange: "USD 320k – 450k",
          bonusRange: "80% – 150% of base",
          totalRange: "≈ USD 600k – 1.1m+",
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
          label: "The Power Shift: How Private Banking Talent Dynamics Are Evolving",
          href:
            "/insights/the-power-shift-how-private-banking-talent-dynamics-are-evolving",
        },
        {
          label: "Unlock Your Next Career Move: Senior RMs with Portable Books",
          href:
            "/insights/unlock-your-next-career-move-senior-rms-with-portable-books-in-the-spotlight-acr-2025-12-09",
        },
        {
          label:
            "Swiss Private Banking: Thriving Against the Odds (Tariffs & Volatility)",
          href:
            "/insights/swiss-private-banking-thriving-against-the-odds-2025-12-09",
        },
      ]}
      relatedCities={[
        { label: "New York", href: "/private-banking-recruiter-new-york" },
        { label: "Geneva", href: "/private-banking-recruiter-geneva" },
        { label: "Zurich", href: "/private-banking-recruiter-zurich" },
      ]}
    />
  );
}