"use client";

import React, { useRef, useState } from "react";

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

  return (
    <main ref={containerRef} className="relative text-white">
      {/* Subtle background glow (lighter than the marketing version) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1100px 380px at 15% -10%, rgba(201,161,74,.14) 0%, rgba(201,161,74,0) 58%), radial-gradient(900px 340px at 110% 0%, rgba(245,231,192,.10) 0%, rgba(245,231,192,0) 60%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-6 md:py-8">
        {/* Minimal tool toolbar */}
        <div className="mb-5 flex items-center justify-end">
          <label className="inline-flex items-center gap-2 text-sm text-white/70">
            <input
              type="checkbox"
              className="accent-white"
              checked={showTips}
              onChange={(e) => setShowTips(e.target.checked)}
            />
            Show tips
          </label>
        </div>

        {/* ✅ REAL SIMULATOR */}
        {/* If BPClient supports it, pass showTips; otherwise keep as-is. */}
        <BPClient />
      </div>
    </main>
  );
}