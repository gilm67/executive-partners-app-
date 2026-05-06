"use client";

import { track } from "@vercel/analytics";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import BPClient from "./BPClient";
import { useBP } from "@/components/bp/store";

type ToolPrefill = Record<string, any> | null;
type PrefillStatus = "idle" | "loading" | "loaded" | "skipped" | "error";

const PREFILL_ENDPOINT = "/api/private/tool-profile";

function isObject(v: unknown): v is Record<string, any> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

// ── Bottom capture state ────────────────────────────────────
type BottomCapture = {
  name: string;
  email: string;
  submitting: boolean;
  done: boolean;
};

export default function BpSimulatorClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const base = useMemo(() => (pathname?.startsWith("/en") ? "/en" : ""), [pathname]);

  const [showTips, setShowTips] = useState(true);
  const [prefill, setPrefill] = useState<ToolPrefill>(null);
  const [, setPrefillStatus] = useState<PrefillStatus>("idle");

  const exportStatus = useBP((s: any) => s.exportStatus) as
    | "idle" | "generating" | "ready" | "error";
  const exportFileName = useBP((s: any) => s.exportFileName) as string | null;
  const resetExportStatus = useBP((s: any) => s.resetExportStatus) as () => void;

  // ── Get BP summary from store for lead notification ──────
  const storeI = useBP((s: any) => s.i);

  // ── Bottom capture state ─────────────────────────────────
  const [bottomCapture, setBottomCapture] = useState<BottomCapture>({
    name: "", email: "", submitting: false, done: false,
  });

  const resultsReady = exportStatus === "ready";

  useEffect(() => {
    const controller = new AbortController();
    let alive = true;

    async function loadPrefill() {
      setPrefillStatus("loading");
      try {
        const res = await fetch(PREFILL_ENDPOINT, {
          method: "GET", cache: "no-store",
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });
        if (!alive) return;
        if (!res.ok) { setPrefillStatus("skipped"); return; }
        const ct = res.headers.get("content-type") || "";
        const isJson = ct.includes("application/json");
        const json = isJson ? await res.json().catch(() => null) : null;
        if (!alive) return;
        if (isObject(json)) {
          const hasOk = Object.prototype.hasOwnProperty.call(json, "ok");
          const ok = hasOk ? Boolean((json as any).ok) : true;
          if (ok) { setPrefill(json); setPrefillStatus("loaded"); return; }
        }
        setPrefillStatus("skipped");
      } catch (e: any) {
        if (!alive || controller.signal.aborted) return;
        setPrefillStatus("error");
      }
    }

    loadPrefill();
    return () => { alive = false; controller.abort(); };
  }, []);

  const scrollToCalibration = useCallback(() => {
    const el = document.getElementById("bp-download");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // ── Bottom capture submit ─────────────────────────────────
  const handleBottomCapture = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bottomCapture.email || !bottomCapture.email.includes("@")) return;

    setBottomCapture(p => ({ ...p, submitting: true }));

    // Build a summary from the store
    const s = storeI as any;
    const summary = [
      "CANDIDATE: " + (s.candidate_name || "—") + " | " + (s.current_role || "—") + " | " + (s.candidate_location || "—"),
      "EMPLOYER: " + (s.current_employer || "—") + " | Market: " + (s.current_market || "—"),
      "EXPERIENCE: " + (s.years_experience || 0) + " yrs | Inherited: " + (s.inherited_book_pct || 0) + "% | Clients: " + (s.current_number_clients || 0),
      "COMPENSATION: Base " + (s.base_salary || 0) + " | Bonus: " + (s.last_bonus || 0),
      "AUM: " + (s.current_assets_m || 0) + "M | Portability: " + (s.portability_pct || 60) + "% | Garden leave: " + (s.garden_leave_months != null ? s.garden_leave_months : 3) + "mo",
      "ROA: Y1 " + (s.roa_y1 || 0) + "% | Y2 " + (s.roa_y2 || 0) + "% | Y3 " + (s.roa_y3 || 0) + "%",
      "NNM: Y1 " + (s.nnm_y1_m || 0) + "M | Y2 " + (s.nnm_y2_m || 0) + "M | Y3 " + (s.nnm_y3_m || 0) + "M",
      "INSTITUTION: " + (s.institution_type || "tier1_swiss") + " | Sign-on: " + (s.sign_on_bonus || 0),
      "SCORES: " + (s.score || 0) + "/10 | Committee: " + (s.committee_score || 0) + "/100",
      s.ai_notes ? "ANALYSIS: " + s.ai_notes : null,
    ].filter(Boolean).join(" | ");

    try {
      await fetch("/api/capture-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: bottomCapture.name,
          email: bottomCapture.email,
          tool: "bp-simulator",
          summary,
        }),
      });
    } catch {
      // Silent fail — never block user experience
    }

    setBottomCapture(p => ({ ...p, submitting: false, done: true }));
    track("bp_email_captured", { market: String(storeI.current_market || ""), aum: Number(storeI.current_assets_m || 0), score: Number(storeI.score || 0) });

    // Trigger Section5's save button if it exists
    setTimeout(() => {
      const saveBtn = document.getElementById("bp-save-btn") as HTMLButtonElement | null;
      if (saveBtn && !saveBtn.disabled) {
        saveBtn.click();
      } else {
        // If Section5 save already ran or not visible, scroll to calibration
        scrollToCalibration();
      }
    }, 150);
  }, [bottomCapture.email, bottomCapture.name, storeI, scrollToCalibration]);

  // ── Sticky CTA (appears after PDF is ready) ──────────────
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
                Portability realism · ROA · revenue mix · approval readiness
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

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1100px 380px at 15% -10%, rgba(201,161,74,.14) 0%, rgba(201,161,74,0) 58%), radial-gradient(900px 340px at 110% 0%, rgba(245,231,192,.10) 0%, rgba(245,231,192,0) 60%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-4 md:py-6">
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

        
        {/* HERO */}
        <div style={{paddingTop:"2rem", paddingBottom:"1.5rem"}}>
          <div style={{display:"flex", flexWrap:"wrap", gap:"0.5rem", marginBottom:"1.25rem"}}>
            <span style={{color:"#D4AF37", border:"1px solid rgba(212,175,55,0.35)", background:"rgba(212,175,55,0.08)", borderRadius:"9999px", padding:"0.25rem 0.75rem", fontSize:"11px", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.1em"}}>
              Executive Partners · Confidential Tool
            </span>
            <span style={{color:"#6ee7b7", border:"1px solid rgba(110,231,183,0.2)", background:"rgba(110,231,183,0.08)", borderRadius:"9999px", padding:"0.25rem 0.75rem", fontSize:"11px"}}>
              🔒 No data shared without consent
            </span>
          </div>
          <h1 style={{color:"#ffffff", fontSize:"clamp(1.75rem,4vw,3rem)", fontWeight:700, letterSpacing:"-0.02em", margin:0}}>
            Business Plan Simulator
          </h1>
          <p style={{color:"rgba(255,255,255,0.58)", fontSize:"1rem", lineHeight:"1.65", marginTop:"0.75rem", maxWidth:"640px"}}>
            Model your AUM transfer, revenue ramp, and 3-year P&L the way a hiring committee actually reviews it.
            Cumulative AUM model, breakeven calculator, committee readiness score, and downside scenario — built on 200+ EP placements.
          </p>
          <div style={{display:"flex", flexWrap:"wrap", gap:"0.5rem", marginTop:"1.25rem"}}>
            {[["Cumulative AUM","correct revenue model"],["7 dimensions","committee readiness"],["Base + downside","dual scenario P&L"],["Breakeven","month-by-month"]].map(([v,l]) => (
              <div key={v} style={{display:"flex", alignItems:"center", gap:"0.5rem", borderRadius:"9999px", border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.04)", padding:"0.375rem 1rem"}}>
                <span style={{fontSize:"0.875rem", fontWeight:700, color:"#D4AF37"}}>{v}</span>
                <span style={{fontSize:"0.75rem", color:"rgba(255,255,255,0.4)"}}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        <BPClient prefill={prefill} showTips={showTips} />

        {/* ── Calibration section ── */}

        {/* ── Bottom download CTA — email capture + PDF ── */}
        <section className="mt-8">
          <div className="rounded-2xl border border-[#D4AF37]/40 bg-[#D4AF37]/5 p-6">

            {!bottomCapture.done ? (
              <>
                <div className="mb-4">
                  <p className="text-sm font-semibold text-white">
                    Save & download your full Business Plan PDF
                  </p>
                  <p className="mt-1 text-xs text-white/60">
                    Your complete analysis, P&L model, committee readiness score, and downside scenario — formatted as a confidential EP report. We will also send you a follow-up confidentially.
                  </p>
                </div>

                <form onSubmit={handleBottomCapture} className="flex flex-col gap-3 sm:flex-row sm:items-end">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-1">
                        Name <span className="text-white/40">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={bottomCapture.name}
                        onChange={e => setBottomCapture(p => ({ ...p, name: e.target.value }))}
                        placeholder="Your name"
                        className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#D4AF37]/60 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-1">
                        Email <span className="text-[#D4AF37]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={bottomCapture.email}
                        onChange={e => setBottomCapture(p => ({ ...p, email: e.target.value }))}
                        placeholder="your.name@bank.com"
                        className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#D4AF37]/60 transition"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={bottomCapture.submitting || !bottomCapture.email}
                    className="shrink-0 rounded-xl bg-[#D4AF37] px-6 py-2.5 text-sm font-semibold text-black hover:opacity-90 disabled:opacity-50 transition whitespace-nowrap"
                  >
                    {bottomCapture.submitting ? "Saving..." : "Save & Download PDF →"}
                  </button>
                </form>

                <p className="mt-3 text-[11px] text-white/40">
                  Handled confidentially by Executive Partners. No third-party sharing.
                </p>
              </>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">
                    PDF saved and downloading...
                  </p>
                  <p className="mt-1 text-xs text-white/60">
                    We will follow up confidentially. In the meantime, book a call to discuss your results with the EP team.
                  </p>
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
                    Contact EP →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {exportStatus === "ready" && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={scrollToCalibration}
              className="text-sm text-white/70 underline decoration-white/20 hover:text-white"
            >
              Jump to calibration section
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
