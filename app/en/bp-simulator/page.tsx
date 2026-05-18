// app/en/bp-simulator/page.tsx
import type { Metadata } from "next";
import BpSimulatorClient from "./BpSimulatorClient";
import { BreadcrumbSchema, ServiceSchema } from "@/components/StructuredData";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://www.execpartners.ch");

export const metadata: Metadata = {
  title: "Business Plan Simulator | Private Banking | Executive Partners",
  description: "Model AUM portability, revenue projections and net margin scenarios. AI-driven business plan simulator for private banking relationship managers.",
  openGraph: {
    title: "Business Plan Simulator | Executive Partners",
    description: "Bank-style business case builder to stress-test portability assumptions. Model NNM, ROA, revenues, and margins.",
  },
  alternates: { canonical: "https://www.execpartners.ch/en/bp-simulator" },
  twitter: {
    card: "summary_large_image",
    title: "Business Plan Simulator | Executive Partners",
    description: "Model revenue, break-even timeline and approval readiness for private banking moves.",
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
        description="Model AUM portability, revenue projections and net margin scenarios. AI-driven business plan simulator for private banking relationship managers."
      />
      
      {/* SEO — Business Plan Simulator Private Banker */}
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-2">
        <p className="text-sm text-white/40 leading-relaxed max-w-3xl">
          The EP Business Plan Simulator is the only tool built specifically for private bankers
          modelling AUM transfer, NNM projections, and 3-year P&amp;L the way a hiring committee
          actually reviews them. Uses a cumulative AUM revenue model — not NNM × ROA — with
          institution-type cost multipliers, garden leave factors, breakeven calculation by month,
          committee readiness scoring across seven dimensions, and an auto-generated downside scenario.
          Used by senior Relationship Managers preparing business plans for private banks in
          Switzerland, the United Kingdom, Dubai, and Singapore. Free and confidential.
        </p>
      </div>
<BpSimulatorClient />
    </>
  );
}
