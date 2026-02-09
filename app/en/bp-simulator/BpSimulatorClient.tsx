"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ✅ Real simulator UI (Sections 1–5)
import BPClient from "./BPClient";

// Keep this loose so you can map whatever your API returns
type ToolPrefill = Record<string, any> | null;

type PrefillStatus = "idle" | "loading" | "loaded" | "skipped" | "error";

const PREFILL_ENDPOINT = "/api/private/tool-profile";

function isObject(v: unknown): v is Record<string, any> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

export default function BpSimulatorClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * ✅ FINAL RULE:
   * - NO client auth / no /api/private/me calls
   * - page.tsx is the ONLY gate
   * - Client ALWAYS renders the simulator UI
   */
  const [showTips, setShowTips] = useState(true);

  // ✅ Cross-tool prefill payload (Portability -> BP)
  const [prefill, setPrefill] = useState<ToolPrefill>(null);
  const [, setPrefillStatus] = useState<PrefillStatus>("idle"); // keep internal, no UI output

  useEffect(() => {
    const controller = new AbortController();
    let alive = true;

    async function loadPrefill() {
      setPrefillStatus("loading");

      try {
        const res = await fetch(PREFILL_ENDPOINT, {
          method: "GET",
          cache: "no-store",
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });

        if (!alive) return;

        // Not authorized / no profile / endpoint not deployed yet — don't block the tool.
        if (!res.ok) {
          setPrefillStatus("skipped");
          return;
        }

        // Avoid exceptions if the endpoint returns non-JSON (edge cases).
        const ct = res.headers.get("content-type") || "";
        const isJson = ct.includes("application/json");

        const json = isJson ? await res.json().catch(() => null) : null;

        if (!alive) return;

        // Accept:
        // - { ok: true, ... }  -> load
        // - { ... } (no ok)    -> load (backwards compatible)
        // - { ok: false }      -> skip
        if (isObject(json)) {
          const hasOk = Object.prototype.hasOwnProperty.call(json, "ok");
          const ok = hasOk ? Boolean((json as any).ok) : true;

          if (ok) {
            setPrefill(json);
            setPrefillStatus("loaded");
            return;
          }
        }

        setPrefillStatus("skipped");
      } catch (e: any) {
        if (!alive || controller.signal.aborted) return;
        setPrefillStatus("error");
        // Silent fail: tool still works without prefill
      }
    }

    loadPrefill();

    return () => {
      alive = false;
      controller.abort();
    };
  }, []);

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

      <div className="relative mx-auto max-w-6xl px-4 py-4 md:py-6">
        {/* Minimal tool toolbar (internal UI feel) */}
        <div className="mb-4 flex items-center justify-end">
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
        <BPClient prefill={prefill} showTips={showTips} />

        {/* ✅ Confidential calibration (anchor target + conversion CTA) */}
        <section id="bp-calibration" className="mt-10 scroll-mt-28">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
                  Confidential calibration
                </div>
                <h2 className="mt-2 text-lg font-semibold text-white">
                  Share your BP output for a confidential calibration call.
                </h2>
                <p className="mt-1 text-sm text-white/70">
                  We sanity-check portability realism, ROA, revenue mix and approval readiness — before you speak to a bank.
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
                  Send your output →
                </Link>

                <Link
                  href="/portability"
                  className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white"
                >
                  Portability tool →
                </Link>
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="text-sm font-semibold text-white">Portability realism</div>
                <div className="mt-1 text-sm text-white/60">
                  What truly moves in 90 days vs 12 months.
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="text-sm font-semibold text-white">Committee readiness</div>
                <div className="mt-1 text-sm text-white/60">
                  Fix the gaps that get plans rejected.
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="text-sm font-semibold text-white">Market benchmarks</div>
                <div className="mt-1 text-sm text-white/60">
                  Geneva / Zurich / Dubai / London patterns.
                </div>
              </div>
            </div>

            <div className="mt-4 text-xs text-white/60">
              Tip: include portable %, NNM target, ROA, booking centre (CH/UK/UAE/Asia), and current comp structure.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}