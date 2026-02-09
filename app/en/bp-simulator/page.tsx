// app/en/bp-simulator/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import BpSimulatorClient from "./BpSimulatorClient";
import { BreadcrumbSchema, ServiceSchema } from "@/components/StructuredData";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://www.execpartners.ch");

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

      {/* ✅ Contextual CTA (connect tool → confidential call) */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-10">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
                Confidential calibration
              </div>
              <h2 className="mt-2 text-xl font-semibold text-white">
                Have us sanity-check your Business Plan.
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-white/70">
                Share your BP output and we’ll stress-test the assumptions (portability realism, NNM,
                ROA, revenue mix, margins) — confidentially.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://calendly.com/execpartners/15-minute-career-consultation"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-xl bg-[#D4AF37] px-5 py-2.5 text-sm font-semibold text-black hover:opacity-90"
              >
                Book a 15-min call →
              </a>

              <Link
                href="/en/contact"
                className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white"
              >
                Prefer to message →
              </Link>
            </div>
          </div>

          <div className="mt-5 border-t border-white/10 pt-4 text-xs text-white/60">
            Tip: include AUM portable %, NNM target, ROA, revenue mix, and your target booking centre.
          </div>
        </div>
      </section>

      {/* Simulator */}
      <BpSimulatorClient />
    </>
  );
}