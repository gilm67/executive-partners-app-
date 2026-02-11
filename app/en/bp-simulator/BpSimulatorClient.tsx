"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ✅ Real simulator UI (Sections 1–5)
import BPClient from "./BPClient";

// ✅ IMPORTANT: use the SAME store as Section5Analysis
// If Section5Analysis imports from "./store", then change this import to "./store" too.
// Otherwise exportStatus will never update here.
import { useBP } from "@/components/bp/store";

// Keep this loose so you can map whatever your API returns
type ToolPrefill = Record<string, any> | null;

type PrefillStatus = "idle" | "loading" | "loaded" | "skipped" | "error";

const PREFILL_ENDPOINT = "/api/private/tool-profile";

function isObject(v: unknown): v is Record<string, any> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

export default function BpSimulatorClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const base = useMemo(() => (pathname?.startsWith("/en") ? "/en" : ""), [pathname]);

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

  // ✅ Export bridge from store (Section 5 -> sticky CTA)
  const exportStatus = useBP((s: any) => s.exportStatus) as
    | "idle"
    | "generating"
    | "ready"
    | "error";
  const exportFileName = useBP((s: any) => s.exportFileName) as string | null;
  const resetExportStatus = useBP((s: any) => s.resetExportStatus) as () => void;

  // ✅ Show sticky CTA only when PDF is ready
  const resultsReady = exportStatus === "ready";

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

  const scrollToCalibration = useCallback(() => {
    const el = document.getElementById("bp-calibration");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // ✅ Sticky CTA component (only after export is READY)
  const StickyCTA = useMemo(() => {
    if (!resultsReady) return null;

    return (
      <div className="fixed bottom-4 left-0 right-0 z-50 px-4">
        <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-[#050814]/85 backdrop-blur shadow-[0_20px_80px_rgba(0,0,0,.55)]">
          <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
                Confidential calibration
              </div>
              <div className="mt-1 text-sm font-semibold text-white">
                PDF ready{exportFileName ? ` — ${exportFileName}` : ""}. Want a senior sanity-check?
              </div>
              <div className="mt-0.5 text-xs text-white/60">
                Portability realism • ROA • revenue mix • approval readiness
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href="https://calendly.com/execpartners/15-minute-career-consultation"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-xl bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
              >
                Book 15-min call →
              </a>

              <Link
                href={`${base}/contact`}
                className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white"
              >
                Send output →
              </Link>

              <button
                type="button"
                onClick={() => resetExportStatus?.()}
                className="inline-flex items-center rounded-xl border border-white/15 bg-white/0 px-4 py-2 text-sm font-semibold text-white/60 hover:bg-white/5 hover:text-white/80"
                aria-label="Hide"
              >
                Hide
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }, [resultsReady, exportFileName, resetExportStatus, base]);

  return (
    <main ref={containerRef} className="relative text-white">
      {StickyCTA}

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
                  We sanity-check portability realism, ROA, revenue mix and approval readiness — before you speak to a
                  bank.
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
                  href={`${base}/contact`}
                  className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white"
                >
                  Send your output →
                </Link>

                <Link
                  href={`${base}/portability`}
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

        {/* Optional: small helper link to scroll when ready */}
        {exportStatus === "ready" && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={scrollToCalibration}
              className="text-sm text-white/70 underline decoration-white/20 hover:text-white"
            >
              Jump to calibration section ↓
            </button>
          </div>
        )}
      </div>
    </main>
  );
}