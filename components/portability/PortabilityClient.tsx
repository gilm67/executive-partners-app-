// components/portability/PortabilityClient.tsx
"use client";

import { Suspense } from "react";
import Link from "next/link";
import Section1Profile from "./Section1Profile";
import Section2Book from "./Section2Book";
import Section3Geography from "./Section3Geography";
import Section4Relationships from "./Section4Relationships";
import Section5Analysis from "./Section5Analysis";

export default function PortabilityClient() {
  return (
    <main className="relative text-white">
      {/* ✅ Same subtle background glow as /en/bp-simulator */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1100px 380px at 15% -10%, rgba(201,161,74,.14) 0%, rgba(201,161,74,0) 58%), radial-gradient(900px 340px at 110% 0%, rgba(245,231,192,.10) 0%, rgba(245,231,192,0) 60%)",
        }}
      />

      {/* ✅ Same outer container spacing as BpSimulatorClient */}
      <div className="relative mx-auto max-w-6xl px-4 py-4 md:py-6">
        {/* ✅ Same inner container spacing as BPClient */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {/* ✅ Header card matches BPClient */}
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4 ring-1 ring-white/10">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-white/70 ring-1 ring-white/10">
                  Executive Partners · Private Tool
                </div>

                <h1 className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight">
                  Portability Readiness Diagnostic
                </h1>

                <p className="mt-1 text-sm text-white/70">
                  Confidential tool — comprehensive assessment across client quality, regulatory
                  infrastructure, product dependencies, and relationship strength.
                </p>
              </div>

              {/* ✅ Contextual conversion CTAs (like BP tool) */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#portability-calibration"
                  className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white"
                >
                  Share output →
                </a>

                <a
                  href="https://calendly.com/execpartners/15-minute-career-consultation"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-xl bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
                >
                  Book 15-min call →
                </a>

                <Link
                  href="/en/bp-simulator"
                  className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white"
                >
                  Business Plan →
                </Link>
              </div>
            </div>
          </div>

          <hr className="border-white/10" />

          {/* ✅ Sections (same separators rhythm as BPClient) */}
          <Suspense fallback={<div className="text-sm text-white/70">Loading…</div>}>
            <Section1Profile />
            <hr className="border-white/10" />

            <Section2Book />
            <hr className="border-white/10" />

            <Section3Geography />
            <hr className="border-white/10" />

            <Section4Relationships />
            <hr className="border-white/10" />

            <Section5Analysis />
          </Suspense>

          {/* ✅ Confidential calibration (anchor target + conversion CTA) */}
          <section id="portability-calibration" className="mt-2 scroll-mt-28">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
                    Confidential calibration
                  </div>
                  <h2 className="mt-2 text-lg font-semibold text-white">
                    Sanity-check portability realism before you speak to a bank.
                  </h2>
                  <p className="mt-1 text-sm text-white/70">
                    We validate what truly moves (90 days vs 12 months), booking-centre constraints,
                    KYC transferability, and mitigation steps. Then we help you convert it into a bank-ready
                    business plan.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://calendly.com/execpartners/15-minute-career-consultation"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-xl bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
                  >
                    Book 15-min call →
                  </a>

                  <Link
                    href="/en/contact"
                    className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white"
                  >
                    Send your details →
                  </Link>

                  <Link
                    href="/en/bp-simulator"
                    className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white"
                  >
                    Build Business Plan →
                  </Link>
                </div>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <div className="text-sm font-semibold text-white">What truly moves</div>
                  <div className="mt-1 text-sm text-white/60">90 days vs 12 months — realistic portability.</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <div className="text-sm font-semibold text-white">Committee readiness</div>
                  <div className="mt-1 text-sm text-white/60">Fix the gaps that get plans rejected.</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <div className="text-sm font-semibold text-white">Market benchmarks</div>
                  <div className="mt-1 text-sm text-white/60">Geneva / Zurich / Dubai / London patterns.</div>
                </div>
              </div>

              <div className="mt-4 text-xs text-white/60">
                Tip: include portable %, AUM composition, booking centre, product dependencies (lending/DPM/alts),
                and comp structure.
              </div>
            </div>
          </section>

          {/* ✅ Footer (optional: BP doesn't show it; keep if you want) */}
          <div className="pt-2 text-center text-xs text-white/50">
            Confidential diagnostic • Data not stored without explicit consent
          </div>
        </div>
      </div>
    </main>
  );
}