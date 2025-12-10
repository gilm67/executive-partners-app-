import type { Metadata } from "next";
import CityRecruiterPage from "@/components/CityRecruiterPage";

export const metadata: Metadata = {
  title: {
    absolute: "Private Banking Recruiter in Hong Kong – Executive Partners",
  },
  description:
    "Executive search boutique for senior Private Banking & Wealth Management hires in Hong Kong. Greater China, North Asia and regional UHNW desks.",
  alternates: {
    canonical: "/private-banking-recruiter-hong-kong",
  },
  openGraph: {
    type: "article",
    url: "/private-banking-recruiter-hong-kong",
    title: "Private Banking Recruiter in Hong Kong – Executive Partners",
    description:
      "Specialist recruiter for Private Banking & Wealth Management in Hong Kong: Greater China and North Asia UHNW/HNW desks.",
    siteName: "Executive Partners",
  },
  robots: { index: true, follow: true },
};

export default function PrivateBankingRecruiterHongKongPage() {
  return (
    <CityRecruiterPage
      city="Hong Kong"
      country="Hong Kong"
      heroEyebrow="Private Banking · Hong Kong · Executive Search"
      heroTitle="Private Banking Recruiter in Hong Kong"
      heroSubtitle="Senior RMs and Desk Heads covering Greater China and North Asia UHNW/HNW clients."
      heroIntro={
        "Hong Kong remains a critical access point to Mainland China wealth, with a strong concentration of UHNW entrepreneurs, listed-company owners and next-generation clients. Despite regulatory and geopolitical complexity, demand continues for senior Relationship Managers with clean, portable AUM and strong onshore/offshore connectivity."
      }
      bulletPoints={[
        "Senior RMs with USD 150m–500m+ portable AUM across Mainland China, Hong Kong and North Asia.",
        "Desk Heads and Team Leads with experience managing cross-border regulatory and booking-centre constraints.",
        "Moves between global platforms and top-tier Chinese, Swiss and US private banks.",
        "Support on long-term relocation options (Singapore, Switzerland, UK) while maintaining client connectivity.",
      ]}
      marketSummary={
        "The Hong Kong talent market is increasingly polarised: top performers remain highly courted, while mid-level bankers without clear portability face pressure. Platforms are sharpening expectations on net new money, cross-selling and digital adoption, but are prepared to back the right profile with guarantees and bespoke packages."
      }
      compCurrency="HKD"
      compRows={[
        {
          level: "Senior RM (8–12y, strong book)",
          baseRange: "HKD 1.6m – 2.4m",
          bonusRange: "40% – 90% of base",
          totalRange: "≈ HKD 2.2m – 4.5m",
        },
        {
          level: "Desk Head / Team Head",
          baseRange: "HKD 2.0m – 3.0m",
          bonusRange: "60% – 110% of base",
          totalRange: "≈ HKD 3.2m – 6.0m",
        },
        {
          level: "Market Head / Market Group Head",
          baseRange: "HKD 2.8m – 4.0m",
          bonusRange: "80% – 140% of base",
          totalRange: "≈ HKD 5.0m – 9.5m",
        },
      ]}
      bookingCentres={[
        "Hong Kong booking centre",
        "Singapore",
        "Zurich & Geneva",
        "London / EU hubs",
      ]}
      desksCovered={[
        "Mainland China UHNW / entrepreneurs",
        "Hong Kong onshore / offshore",
        "North Asia (Taiwan, Korea, Japan)",
        "Family offices & listed-company owners",
      ]}
      pdfHref="/pdfs/private-banking-career-intelligence-2025.pdf"
      insightsLinks={[
        {
          label: "The Great UBS Paradox",
          href: "/insights/the-great-ubs-paradox",
        },
        {
          label:
            "Swiss Private Banking: Thriving Against the Odds (Tariffs & Volatility)",
          href:
            "/insights/swiss-private-banking-thriving-against-the-odds-2025-12-09",
        },
        {
          label:
            "Swiss Private Banks Navigate Rate Cuts and Tariff Turbulence, Deliver Mixed Results",
          href:
            "/insights/swiss-private-banks-navigate-rate-cuts-and-tariff-turbulence-deliver-mixed-resul-2025-12-09",
        },
      ]}
      relatedCities={[
        { label: "Singapore", href: "/private-banking-recruiter-singapore" },
        { label: "Geneva", href: "/private-banking-recruiter-geneva" },
        { label: "Zurich", href: "/private-banking-recruiter-zurich" },
      ]}
    />
  );
}