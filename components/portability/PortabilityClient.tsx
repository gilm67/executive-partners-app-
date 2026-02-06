// components/portability/PortabilityClient.tsx
"use client";

import { Suspense } from "react";
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
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
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

          {/* ✅ Footer (optional: BP doesn't show it; keep if you want) */}
          <div className="pt-2 text-center text-xs text-white/50">
            Confidential diagnostic • Data not stored without explicit consent
          </div>
        </div>
      </div>
    </main>
  );
}