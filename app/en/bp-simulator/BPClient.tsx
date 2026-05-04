"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useBP } from "@/components/bp/store";

/* ---------- Types (lightweight, extend anytime) ---------- */
export type BPProfilePrefill = {
  // Section 1 (candidate)
  fullName?: string;
  email?: string;
  phone?: string;
  location?: string;
  market?: string; // e.g., CH / UK / UAE
  bank?: string;
  roleTitle?: string;
  seniority?: string;
  bookAum?: number; // numeric in base currency (or CHF) - your choice
  currency?: string; // "CHF" | "USD" | ...

  // Cross-tool (portability -> BP)
  portabilityAum?: number;
  portabilityRoaBps?: number; // e.g. 80 = 0.80%
  portabilityNnmY1?: number;
  portabilityNnmY2?: number;
  portabilityNnmY3?: number;
};

export type BPClientProps = {
  showTips?: boolean;
  prefill?: BPProfilePrefill | null;

  /** ✅ NEW: lets parent (BpSimulatorClient) show sticky CTA only after results exist */
  onResultReady?: () => void;

  /** ✅ NEW: lets BPClient itself request calibration + scroll */
  onRequestCalibration?: () => void;
};

export type BPSectionProps = {
  showTips?: boolean;
  prefill?: BPProfilePrefill | null;
};

/* ---------- Minimal loading fallback ---------- */
const Fallback = ({ title }: { title: string }) => (
  <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white/70">
    Loading {title}…
  </div>
);

/* ---------- Dynamic imports (Sections 1–5 only) ---------- */
const Section1Basic = dynamic(() => import("../../../components/bp/Section1Basic"), {
  ssr: false,
  loading: () => <Fallback title="Section 1 – Basic Candidate Information" />,
});

const Section2NNM = dynamic(() => import("../../../components/bp/Section2NNM"), {
  ssr: false,
  loading: () => <Fallback title="Section 2 – Net New Money (3Y)" />,
});

const Section3Prospects = dynamic(() => import("../../../components/bp/Section3Prospects"), {
  ssr: false,
  loading: () => <Fallback title="Section 3 – Prospects" />,
});

const Section4Revenue = dynamic(() => import("../../../components/bp/Section4Revenue"), {
  ssr: false,
  loading: () => <Fallback title="Section 4 – Revenue, Costs & Net Margin" />,
});

const Section5Analysis = dynamic(() => import("../../../components/bp/Section5Analysis"), {
  ssr: false,
  loading: () => <Fallback title="Section 5 – AI Candidate Analysis" />,
});

/**
 * Tiny helper so we can pass sectionProps safely without fighting TS
 * until each Section explicitly types its props.
 */
function RenderSection({
  Component,
  sectionProps,
}: {
  Component: React.ComponentType<any>;
  sectionProps: BPSectionProps;
}) {
  return <Component {...sectionProps} />;
}

export default function BPClient({
  showTips = true,
  prefill = null,
  onResultReady,
  onRequestCalibration,
}: BPClientProps) {
  const sectionProps: BPSectionProps = { showTips, prefill };

  // ✅ Apply prefill only once per page lifetime (store enforces "once" + "do not overwrite")
  const applyPrefillOnce = useBP((s: any) => s.applyPrefillOnce);

  useEffect(() => {
    if (!prefill) return;
    // IMPORTANT: pass RAW prefill payload; store handles flexible mapping + safety rules
    applyPrefillOnce(prefill);
  }, [prefill, applyPrefillOnce]);

  /**
   * ✅ Detect "results ready" from store so we can trigger parent sticky CTA.
   * Replace the selector with the exact key you use for computed output if needed.
   */
  const resultsSignal = useBP((s: any) => {
    // 🔧 If you know the key, prefer something explicit like:
    // return s.summary?.ok || s.report?.id || s.outputReady;

    return (
      s.summary ||
      s.results ||
      s.output ||
      s.report ||
      s.pdfUrl ||
      s.exportUrl ||
      s.aiEvaluation ||
      null
    );
  });

  // fire only once
  const firedRef = useRef(false);
  useEffect(() => {
    if (firedRef.current) return;
    if (!resultsSignal) return;
    firedRef.current = true;
    onResultReady?.();
  }, [resultsSignal, onResultReady]);

  const handleShareOutput = (e?: React.MouseEvent) => {
    e?.preventDefault();
    onRequestCalibration?.(); // parent may also scroll + show sticky
    // fallback scroll if parent doesn't handle it
    const el = document.getElementById("bp-calibration");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* ✅ Tool header (NOT marketing) */}

      <hr className="border-white/10" />

      {/* ✅ Sections (pass showTips + prefill) */}
      <RenderSection Component={Section1Basic} sectionProps={sectionProps} />
      <hr className="border-white/10" />

      <RenderSection Component={Section2NNM} sectionProps={sectionProps} />
      <hr className="border-white/10" />

      <RenderSection Component={Section3Prospects} sectionProps={sectionProps} />
      <hr className="border-white/10" />

      <RenderSection Component={Section4Revenue} sectionProps={sectionProps} />
      <hr className="border-white/10" />

      {/* Single Save/Download button lives inside Section 5 */}
      <RenderSection Component={Section5Analysis} sectionProps={sectionProps} />
    </div>
  );
}