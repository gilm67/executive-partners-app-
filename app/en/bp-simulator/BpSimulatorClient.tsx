"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* ------------------------------
   Tiny hover bulb tip (💡)
------------------------------ */
function PopTip({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative group inline-flex items-center cursor-help select-none ml-1 align-middle">
      💡
      <span className="absolute z-20 left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block rounded-md bg-black/80 text-white text-xs px-3 py-2 whitespace-pre-line shadow-lg ring-1 ring-white/10">
        {children}
      </span>
    </span>
  );
}

function HelpTip({
  show,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) {
  if (!show) return null;
  return (
    <div className="mt-2 rounded-md border border-white/10 bg-black/30 p-3 text-xs leading-relaxed text-white/75">
      <div className="mb-1 font-medium">💡 Tip</div>
      <div>{children}</div>
    </div>
  );
}

function Text({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) {
  return (
    <label className="text-sm">
      {label}
      <input
        type={type}
        className="mt-1 w-full rounded-md bg-black/30 border border-white/10 px-3 py-2"
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

/* ✅ show empty field instead of 0 */
function Num({
  label,
  value,
  onChange,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  step?: number;
}) {
  return (
    <label className="text-sm">
      {label}
      <input
        type="number"
        inputMode="decimal"
        className="mt-1 w-full rounded-md bg-black/30 border border-white/10 px-3 py-2"
        value={Number.isFinite(value) ? (value === 0 ? "" : value) : ""}
        onChange={onChange}
        step={step}
      />
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}) {
  return (
    <label className="text-sm">
      {label}
      <select
        className="mt-1 w-full rounded-md bg-black/30 border border-white/10 px-3 py-2"
        value={value}
        onChange={onChange}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

type YesNo = "Yes" | "No";

/* ------------------------------
   Types
------------------------------ */
type Candidate = {
  name: string;
  email: string;
  yearsExperience: number;
  inheritedBookPct: number;
  role: string;
  location: string;
  employer: string;
  marketLabel: string;
  currency: string;
  baseSalary: number;
  lastBonus: number;
  currentClients: number;
  currentAumMM: number;
  assets_totalAumM: number;
  assets_affluentPct: number;
  assets_hnwiPct: number;
  assets_uhnwiPct: number;
  roa_averagePct: number;
  roa_revYtdM: number;
  roa_revLastYearM: number;
  svc_selfDirectedPct: number;
  svc_discretionaryPct: number;
  svc_advisoryPct: number;
  svc_directAccessPct: number;
  svc_custodyPct: number;
  dom_country1: string;
  dom_share1: number;
  dom_country2: string;
  dom_share2: number;
  dom_country3: string;
  dom_share3: number;
  client_pep: YesNo;
  client_executive: YesNo;
  client_inactive: YesNo;
  client_company: YesNo;
  client_finInstitutionEam: YesNo;
  client_trust: YesNo;
  prod_creditLombard: YesNo;
  prod_mortgage: YesNo;
  prod_wealthTaxPlanning: YesNo;
  prod_structuredProducts: YesNo;
  prod_hedgeFundsPE: YesNo;
  prod_other: YesNo;
  prod_otherNote: string;
};

// ✅ KEEP all your existing constants + sections (CandidateBlock, NNM, charts, export helpers, etc.) unchanged…

/* ===========================================================
   MAIN
   =========================================================== */
export default function BpSimulatorClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * ✅ FINAL RULE:
   * - NO client auth / no /api/private/me calls
   * - Page.tsx is the ONLY gate
   * - Client ALWAYS renders the simulator UI
   */

  const [showTips, setShowTips] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [autoFixedFromBase, setAutoFixedFromBase] = useState(true);
  const [customFixedPerYear, setCustomFixedPerYear] = useState<number>(350_000);

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

        {/* ✅ ALWAYS render simulator tree (THIS was missing) */}
        <div className="mt-8">
          <SimulatorBody
            showTips={showTips}
            exporting={exporting}
            setExporting={setExporting}
            autoFixedFromBase={autoFixedFromBase}
            setAutoFixedFromBase={setAutoFixedFromBase}
            customFixedPerYear={customFixedPerYear}
            setCustomFixedPerYear={setCustomFixedPerYear}
          />
        </div>
      </div>
    </main>
  );
}

/**
 * ✅ Paste your existing simulator UI here.
 * This exists ONLY to guarantee your UI mounts/renders.
 * Keep all your internal states/sections exactly as they were (paste them below).
 */
function SimulatorBody(props: {
  showTips: boolean;
  exporting: boolean;
  setExporting: React.Dispatch<React.SetStateAction<boolean>>;
  autoFixedFromBase: boolean;
  setAutoFixedFromBase: React.Dispatch<React.SetStateAction<boolean>>;
  customFixedPerYear: number;
  setCustomFixedPerYear: React.Dispatch<React.SetStateAction<number>>;
}) {
  // props are available when you paste your real tree
  const {
    showTips,
    exporting,
    setExporting,
    autoFixedFromBase,
    setAutoFixedFromBase,
    customFixedPerYear,
    setCustomFixedPerYear,
  } = props;

  return (
    <div className="space-y-6">
      {/* ✅ TEMP sanity marker (remove later) */}
      <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-4 text-sm text-emerald-100">
        ✅ Simulator mounted. Now paste your real sections below this line.
      </div>

      {/* 🔥 IMPORTANT:
         Replace everything below with your REAL component tree:
         - CandidateBlock
         - NNM section
         - Charts
         - Export panel
         - Summary
      */}

      {/* Example skeleton (delete):
      <CandidateBlock showTips={showTips} />
      <NnmSection showTips={showTips} />
      <Charts />
      <ExportPanel exporting={exporting} setExporting={setExporting} />
      */}
    </div>
  );
}