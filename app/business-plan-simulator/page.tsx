// app/business-plan-simulator/page.tsx
import type { Metadata } from "next";
import BPClient from "./BPClient";

export const metadata: Metadata = {
  title: "Business Plan Simulator – Executive Partners",
  description:
    "On-domain simulator for Private Bankers: model AUM growth, revenue, NNM and client portability with recruiter-grade insights.",
  openGraph: {
    title: "Business Plan Simulator – Executive Partners",
    description:
      "Confidential Next.js simulator for NNM, AUM, revenue and profitability. No external embeds.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Executive Partners" }],
  },
  twitter: { card: "summary_large_image", title: "Business Plan Simulator", images: ["/og.png"] },
};

// ✅ Use the restored BPClient component, not an iframe / external link
export default function BpSimulatorPage() {
  return (
    <main className="min-h-[70vh] bg-white text-black">
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h1 className="text-4xl font-semibold tracking-tight mb-4">
          Business Plan Simulator
        </h1>
        <p className="mb-8 text-neutral-700 max-w-2xl">
          Model your Private Banking business case: test AUM growth, revenue scenarios,
          net new money projections and client portability — all in one on-domain tool.
        </p>

        {/* Render the actual Next.js simulator UI */}
        <BPClient />

        <p className="mt-10 text-xs text-neutral-500">
          Your inputs remain confidential. No data leaves execpartners.ch without consent.
        </p>
      </section>
    </main>
  );
}