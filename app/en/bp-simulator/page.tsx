// app/en/bp-simulator/page.tsx
import type { Metadata } from "next";
import BpSimulatorClient from "./BpSimulatorClient";

export const metadata: Metadata = {
  title: "Business Plan Simulator — Executive Partners",
  description:
    "Model AuM portability, revenue projections and net margin scenarios with our AI-driven simulator for Private Bankers.",
  openGraph: {
    title: "Business Plan Simulator — Executive Partners",
    description:
      "Model AuM portability, revenue projections and net margin scenarios with our AI-driven simulator for Private Bankers.",
    url: "https://execpartners-prod.vercel.app/en/bp-simulator",
    siteName: "Executive Partners",
    locale: "en_CH",
    type: "website",
    images: [
      {
        url: "/og/og-bp-simulator.png", // must exist at public/og/og-bp-simulator.png
        width: 1200,
        height: 630,
        alt: "Executive Partners — Business Plan Simulator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Plan Simulator — Executive Partners",
    description:
      "Model AuM portability, revenue projections and net margin scenarios with our AI-driven simulator for Private Bankers.",
    images: ["/og/og-bp-simulator.png"],
  },
};

export default function Page() {
  return <BpSimulatorClient />;
}