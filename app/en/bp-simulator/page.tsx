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
  title: { absolute: "Private Banking Business Plan Simulator | Build Your 3-Year Case – Executive Partners" },
  description: "Free private banking business plan simulator. Model your 3-year AUM ramp, NNM, ROA and P&L the way a hiring committee evaluates it — built on 200+ EP placements.",
  openGraph: {
    title: "Business Plan Simulator ",
    description: "Bank-style business case builder to stress-test portability assumptions. Model NNM, ROA, revenues, and margins.",
  },
  alternates: { canonical: "https://www.execpartners.ch/en/bp-simulator" },
  twitter: {
    card: "summary_large_image",
    title: "Business Plan Simulator ",
    description: "Model revenue, break-even timeline and approval readiness for private banking moves.",
  },
};

const BP_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a private banking business plan simulator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A private banking business plan simulator models the 3-year AUM ramp, NNM projections, ROA, and P&L the way a hiring committee evaluates a candidate. It helps relationship managers stress-test portability assumptions and calculate break-even timelines before approaching a new bank."
      }
    },
    {
      "@type": "Question",
      name: "How do private banks evaluate a business plan from a relationship manager?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Private banks evaluate RM business plans across seven dimensions: portable AUM, NNM ramp by year, ROA assumptions, fixed cost coverage, break-even month, downside scenario, and committee readiness. The EP Business Plan Simulator scores each dimension to produce a Committee Readiness Score out of 100."
      }
    },
    {
      "@type": "Question",
      name: "What NNM and ROA assumptions should I use in my private banking business plan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Conservative NNM assumptions typically range from 30 to 50 percent of portable AUM in year one, rising to 60 to 80 percent by year three. ROA benchmarks in Swiss private banking range from 65 to 90 basis points for HNW books and 40 to 65 basis points for UHNW books. The simulator uses institution-type cost multipliers to produce realistic net margin figures."
      }
    },
    {
      "@type": "Question",
      name: "Is the EP Business Plan Simulator free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The EP Business Plan Simulator is free, confidential, and requires no login. It is used by senior relationship managers preparing business plans for private banks in Geneva, Zurich, Dubai, Singapore, London, and New York."
      }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BP_FAQ_SCHEMA) }}
      />
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
