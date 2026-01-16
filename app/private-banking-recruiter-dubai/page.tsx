// app/private-banking-recruiter-dubai/page.tsx
import type { Metadata } from "next";
import CityRecruiterPage from "@/components/CityRecruiterPage";

export const metadata: Metadata = {
  title: {
    absolute: "Private Banking Recruiter in Dubai – Executive Partners",
  },
  description:
    "Executive search boutique focused on senior Private Banking & Wealth Management hires in Dubai and the wider GCC. Senior RMs, Team Heads and Market Leaders with portable UHNW/HNW books.",
  alternates: {
    canonical: "/private-banking-recruiter-dubai",
  },
  openGraph: {
    type: "article",
    url: "/private-banking-recruiter-dubai",
    title: "Private Banking Recruiter in Dubai – Executive Partners",
    description:
      "Specialist recruiter for Private Banking & Wealth Management in Dubai: GCC, MENA and NRI desks, UHNW/HNW RMs, Team Heads and Market Leaders.",
    siteName: "Executive Partners",
  },
  robots: { index: true, follow: true },
};

export default function PrivateBankingRecruiterDubaiPage() {
  return (
    <CityRecruiterPage
      city="Dubai"
      country="UAE"
      heroEyebrow="Private Banking · Dubai · Executive Search"
      heroTitle="Private Banking Recruiter in Dubai"
      heroSubtitle="Senior RMs, Team Heads and Market Leaders across GCC, MENA and NRI desks."
      heroIntro={
        "Dubai has become one of the most competitive wealth hubs on the planet – a crossroads for GCC families, international entrepreneurs, NRI clients and African UHNW. From DIFC, senior Relationship Managers now book assets into Dubai, Geneva, Zurich, Singapore and Hong Kong on the same platform."
      }
      bulletPoints={[
        "Senior RMs with CHF 150m–500m+ portable AUM across GCC, Levant, NRI and Africa.",
        "Team Heads and Market Leaders for Dubai onshore, DIFC and international booking centres.",
        "Moves from global platforms (UBS, CS/UBS, JP, MS, Citi, HSBC) into leading regional and international banks.",
        "Discreet guidance on licences, variable compensation and platform risk for Dubai-based bankers.",
      ]}
      marketSummary={
        "For Private Bankers, Dubai offers a unique mix of tax efficiency, rapid client acquisition and multi-booking-centre flexibility. Banks in DIFC are actively competing for senior RMs who can demonstrate solid, compliant portability from GCC, Levant, NRI and Africa segments. The most attractive platforms are those that combine strong investment architecture, competitive credit and a pragmatic view on onboarding when assets are booked across Dubai, Switzerland and Singapore."
      }
      compCurrency="AED"
      compRows={[
        {
          level: "Senior RM (5–10y, strong book)",
          baseRange: "AED 650k – 900k",
          bonusRange: "40% – 80% of base",
          totalRange: "≈ AED 900k – 1.6m",
        },
        {
          level: "Team Head (small team)",
          baseRange: "AED 900k – 1.3m",
          bonusRange: "60% – 100% of base",
          totalRange: "≈ AED 1.4m – 2.4m",
        },
        {
          level: "Market Head / Desk Head",
          baseRange: "AED 1.2m – 1.8m",
          bonusRange: "70% – 120% of base",
          totalRange: "≈ AED 2.0m – 3.8m",
        },
      ]}
      bookingCentres={[
        "Dubai (DIFC / onshore)",
        "Geneva & Zurich",
        "Singapore & Hong Kong",
        "London and selected EU hubs",
      ]}
      desksCovered={[
        "GCC & broader MENA onshore / NNR",
        "Levant & Eastern Mediterranean",
        "NRI (India, Pakistan, Sri Lanka)",
        "Africa UHNW / entrepreneurs",
      ]}
      pdfHref="/pdfs/private-banking-career-intelligence-2026.pdf"
      insightsLinks={[
        {
          label:
            "This Week Changed Everything: Four Events Reshaping Wealth Management",
          href:
            "/insights/this-week-changed-everything-four-events-reshaping-wealth-management",
        },
        {
          label:
            "The AI Reckoning: How 5,200 Job Cuts Are Reshaping Private Banking Talent",
          href:
            "/insights/the-ai-reckoning-how-5-200-job-cuts-are-reshaping-private-banking-talent-forever",
        },
        {
          label:
            "The Power Shift: How Private Banking Talent Dynamics Are Evolving",
          href:
            "/insights/the-power-shift-how-private-banking-talent-dynamics-are-evolving",
        },
      ]}
    />
  );
}