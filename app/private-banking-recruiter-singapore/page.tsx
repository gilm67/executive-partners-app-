import type { Metadata } from "next";
import CityRecruiterPage from "../components/CityRecruiterPage";

export const metadata: Metadata = {
  title: {
    absolute: "Private Banking Recruiter in Singapore – Executive Partners",
  },
  description:
    "Executive search boutique for senior Private Banking & Wealth Management hires in Singapore. UHNW/HNW RMs, Team Heads and Market Leaders covering ASEAN, NRI and Greater China.",
  alternates: {
    canonical: "/private-banking-recruiter-singapore",
  },
  openGraph: {
    type: "article",
    url: "/private-banking-recruiter-singapore",
    title: "Private Banking Recruiter in Singapore – Executive Partners",
    description:
      "Specialist recruiter for Private Banking & Wealth Management in Singapore: ASEAN, NRI and Greater China desks.",
    siteName: "Executive Partners",
  },
  robots: { index: true, follow: true },
};

export default function PrivateBankingRecruiterSingaporePage() {
  return (
    <CityRecruiterPage
      city="Singapore"
      country="Singapore"
      heroEyebrow="Private Banking · Singapore · Executive Search"
      heroTitle="Private Banking Recruiter in Singapore"
      heroSubtitle="Senior RMs, Team Heads and Market Leaders across ASEAN, NRI and Greater China."
      heroIntro={
        "Singapore has consolidated its position as Asia’s flagship wealth hub, competing directly with Hong Kong for UHNW families, entrepreneurs and next-gen clients. Senior Relationship Managers who can demonstrate clean, portable AUM across ASEAN, NRI and Greater China remain in high demand."
      }
      bulletPoints={[
        "Senior RMs with USD 150m–500m+ portable AUM across ASEAN, NRI and Greater China.",
        "Desk Heads and Market Leaders for Singapore booking-centre and regional hubs.",
        "Moves from global platforms (UBS, CS/UBS, JP, MS, Citi, HSBC, SCB) into leading private banks and family offices.",
        "Guidance on MAS licensing, variable compensation and long-term career trajectory in Asia.",
      ]}
      marketSummary={
        "Banks in Singapore are actively rebalancing headcount towards senior revenue-generators with diversified, internationally booked books. Pressure on margins and cost of capital means platforms are more selective on new joiners, but the right profile still commands strong guarantees and multi-year upside."
      }
      compCurrency="SGD"
      compRows={[
        {
          level: "Senior RM (8–12y, strong book)",
          baseRange: "SGD 260k – 380k",
          bonusRange: "40% – 90% of base",
          totalRange: "≈ SGD 350k – 650k+",
        },
        {
          level: "Desk Head / Team Head",
          baseRange: "SGD 320k – 480k",
          bonusRange: "60% – 110% of base",
          totalRange: "≈ SGD 500k – 900k+",
        },
        {
          level: "Market Head / Segment Head",
          baseRange: "SGD 450k – 650k",
          bonusRange: "80% – 140% of base",
          totalRange: "≈ SGD 800k – 1.5m",
        },
      ]}
      bookingCentres={[
        "Singapore booking centre",
        "Hong Kong",
        "Zurich & Geneva",
        "London / EU hubs",
      ]}
      desksCovered={[
        "ASEAN onshore / offshore",
        "NRI & South Asia",
        "Greater China & North Asia",
        "Global UHNW / single-family offices",
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
            "The Swiss Private Banking Talent Revolution: Digital Skills & NextGen Clients",
          href:
            "/insights/the-swiss-private-banking-talent-revolution-digital-skills-nextgen-clients-and-the-battle-for-expertise",
        },
        {
          label:
            "What Do Gen Z Want from Wealth Managers and How Fast is Industry Shifting?",
          href:
            "/insights/what-do-gen-z-want-from-wealth-managers-and-how-fast-is-industry-shifting",
        },
      ]}
      relatedCities={[
        { label: "Dubai", href: "/private-banking-recruiter-dubai" },
        { label: "Hong Kong", href: "/private-banking-recruiter-hong-kong" },
        { label: "Geneva", href: "/private-banking-recruiter-geneva" },
      ]}
    />
  );
}