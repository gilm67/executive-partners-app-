"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";

// ✅ Real simulator UI (Sections 1–5)
import BPClient from "./BPClient";

export default function BpSimulatorClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * ✅ FINAL RULE:
   * - NO client auth / no /api/private/me calls
   * - page.tsx is the ONLY gate
   * - Client ALWAYS renders the simulator UI
   */
  const [showTips, setShowTips] = useState(true);

  // Non-blocking badge
  const sessionBadge = {
    cls: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
    text: "🔒 Secure access",
  };

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen bg-[#0B0E13] text-white body-grain"
    >
      {/* background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 420px at 18% -10%, rgba(201,161,74,.22) 0%, rgba(201,161,74,0) 55%), radial-gradient(1000px 380px at 110% 0%, rgba(245,231,192,.20) 0%, rgba(245,231,192,0) 60%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-8 md:py-12">
        {/* header */}
        <section className="rounded-2xl border border-white/10 bg-black/40 p-6 ring-1 ring-white/10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-brandGold/10 px-4 py-1 text-xs font-semibold text-brandGoldPale ring-1 ring-brandGold/40">
                Executive Partners · Private Tool
              </p>

              <div className="mt-3 flex items-center gap-2 flex-wrap">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Business Plan Simulator
                </h1>

                <span
                  className={[
                    "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs border",
                    sessionBadge.cls,
                  ].join(" ")}
                  title="Non-blocking badge"
                >
                  {sessionBadge.text}
                </span>
              </div>

              <p className="mt-2 max-w-3xl text-sm text-white/75 md:text-base">
                Model AuM portability, revenue & net margins with strategy panels,
                NNM, charts, and exportable outputs.
              </p>

              <div className="mt-3 text-xs text-white/60">
                If anything looks locked, request a fresh secure link{" "}
                <Link
                  className="underline underline-offset-4 hover:text-white"
                  href="/private/auth/request?next=/en/bp-simulator"
                >
                  here
                </Link>
                .
              </div>
            </div>

            <label className="inline-flex items-center gap-2 text-sm text-white/80">
              <input
                type="checkbox"
                className="accent-white"
                checked={showTips}
                onChange={(e) => setShowTips(e.target.checked)}
              />
              Show tips
            </label>
          </div>
        </section>

        {/* ✅ REAL SIMULATOR */}
        <div className="mt-8">
          <BPClient />
        </div>
      </div>
    </main>
  );
}