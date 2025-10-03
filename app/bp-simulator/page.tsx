// app/bp-simulator/page.tsx
import type { Metadata } from "next";
import BPSimulator from "@/components/bp/BPSimulator";

export const metadata: Metadata = {
  title: "Business Plan Simulator – Executive Partners",
  description:
    "Run banker-grade business plan scenarios with revenue, net margin, and net new money projections. Export a PDF and benchmark against peers.",
  openGraph: {
    title: "Business Plan Simulator – Executive Partners",
    description:
      "Interactive, confidential business plan simulator for private bankers and wealth managers.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Executive Partners" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Plan Simulator",
    images: ["/og.png"],
  },
};

export default function BPSimulatorPage() {
  return (
    <main className="min-h-[70vh]">
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="mb-8">
          <p className="mb-3 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            Business Plan Simulator
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            Build your banker-grade business plan
          </h1>
          <p className="mt-3 max-w-2xl text-white/70">
            Project your client growth, revenues, and net margin over three years.
            Benchmark your results against market standards and export a PDF
            report to share confidentially with hiring managers.
          </p>
        </div>

        {/* Interactive simulator component */}
        <BPSimulator />

        <p className="mt-8 text-xs text-neutral-400">
          Privacy: We do not store any data without your explicit consent.
        </p>
      </section>
    </main>
  );
}