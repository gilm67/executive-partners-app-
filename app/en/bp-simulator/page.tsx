// app/en/bp-simulator/page.tsx
import type { Metadata } from "next";
import BpSimulatorClient from "./BpSimulatorClient";
import { BreadcrumbSchema, ServiceSchema } from "@/components/StructuredData";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://www.execpartners.ch");

export const metadata: Metadata = {
  title: "Business Plan Simulator | Private Banking | Executive Partners",
  description:
    "Model AUM portability, revenue projections and net margin scenarios. AI-driven business plan simulator for private banking relationship managers.",
  openGraph: {
    title: "Business Plan Simulator | Executive Partners",
    description:
      "Bank-style business case builder to stress-test portability assumptions. Model NNM, ROA, revenues, and margins.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Plan Simulator | Executive Partners",
    description:
      "Model revenue, break-even timeline and approval readiness for private banking moves.",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE },
          { name: "Business Plan Simulator", url: `${SITE}/en/bp-simulator` },
        ]}
      />

      <ServiceSchema
        name="Business Plan Simulator"
        description="Model AUM portability, revenue projections and net margin scenarios. AI-driven business plan simulator for private banking relationship managers to stress-test portability assumptions, model NNM, ROA, revenues, and margins."
      />

      <BpSimulatorClient />
    </>
  );
}