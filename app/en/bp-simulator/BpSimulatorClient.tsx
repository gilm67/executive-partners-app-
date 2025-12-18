"use client";

import { useMemo, useRef, useState, useEffect } from "react";
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

type ProspectRow = {
  id: string;
  name: string;
  source: "Self-acquired" | "Inherited" | "Finder" | "Other";
  wealthM: number;
  aumM: number;
  marginPct: number;
  bestY1M: number;
  worstY1M: number;
  bestY2M: number;
  worstY2M: number;
  bestY3M: number;
  worstY3M: number;
};

type NumericProspectKey = Extract<
  keyof ProspectRow,
  | "wealthM"
  | "aumM"
  | "marginPct"
  | "bestY1M"
  | "worstY1M"
  | "bestY2M"
  | "worstY2M"
  | "bestY3M"
  | "worstY3M"
>;

const DEFAULT_CANDIDATE: Candidate = {
  name: "",
  email: "",
  yearsExperience: 0,
  inheritedBookPct: 0,
  role: "Relationship Manager",
  location: "— Select —",
  employer: "",
  marketLabel: "CH Onshore",
  currency: "CHF",
  baseSalary: 0,
  lastBonus: 0,
  currentClients: 0,
  currentAumMM: 0,
  assets_totalAumM: 0,
  assets_affluentPct: 0,
  assets_hnwiPct: 0,
  assets_uhnwiPct: 0,
  roa_averagePct: 0,
  roa_revYtdM: 0,
  roa_revLastYearM: 0,
  svc_selfDirectedPct: 0,
  svc_discretionaryPct: 0,
  svc_advisoryPct: 0,
  svc_directAccessPct: 0,
  svc_custodyPct: 0,
  dom_country1: "",
  dom_share1: 0,
  dom_country2: "",
  dom_share2: 0,
  dom_country3: "",
  dom_share3: 0,
  client_pep: "No",
  client_executive: "Yes",
  client_inactive: "No",
  client_company: "Yes",
  client_finInstitutionEam: "No",
  client_trust: "No",
  prod_creditLombard: "Yes",
  prod_mortgage: "No",
  prod_wealthTaxPlanning: "Yes",
  prod_structuredProducts: "Yes",
  prod_hedgeFundsPE: "Yes",
  prod_other: "No",
  prod_otherNote: "",
};

const uid = () => Math.random().toString(36).slice(2, 9);

const fmtCurrency = (n: number, currency: string) =>
  new Intl.NumberFormat("en-CH", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(n || 0);

/* ===========================================================
   1) BASIC CANDIDATE INFORMATION
   =========================================================== */
function CandidateBlock({
  showTips,
  candidate,
  setCandidate,
  autoFixedFromBase,
  setAutoFixedFromBase,
  customFixedPerYear,
  setCustomFixedPerYear,
}: {
  showTips: boolean;
  candidate: Candidate;
  setCandidate: (c: Candidate) => void;
  autoFixedFromBase: boolean;
  setAutoFixedFromBase: (v: boolean) => void;
  customFixedPerYear: number;
  setCustomFixedPerYear: (n: number) => void;
}) {
  const onCand =
    <K extends keyof Candidate>(k: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const val =
        e.target instanceof HTMLInputElement && e.target.type === "number"
          ? Number(e.target.value || 0)
          : e.target.value;
      setCandidate({
        ...candidate,
        [k]: (typeof candidate[k] === "number" ? Number(val) : val) as Candidate[K],
      });
    };

  return (
    <section className="container-max grid gap-6 pb-4 overflow-visible">
      <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-5 ring-1 ring-white/10">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          1️⃣ Basic Candidate Information
          <PopTip>
            We use Base × 1.25 as a proxy for annual fixed cost in Section 4 unless you set a custom override.
          </PopTip>
        </h2>
        <p className="mt-1 text-xs text-white/60">Fields marked * are recommended.</p>

        <HelpTip show={showTips}>
          Use current-year numbers. If uncertain, be conservative. Toggle off the Base×1.25 switch to input a custom
          <b> Fixed Cost per year</b> (includes seat, desk, support, platform fees).
        </HelpTip>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <Text label="Candidate Name" value={candidate.name} onChange={onCand("name")} />
          <Text label="Candidate Email *" value={candidate.email} onChange={onCand("email")} type="email" />
          <Select
            label="Currency *"
            value={candidate.currency}
            onChange={onCand("currency")}
            options={["CHF", "USD", "EUR", "AED", "SGD", "HKD"]}
          />
          <Num
            label={`Current Base Salary (${candidate.currency}) *`}
            value={candidate.baseSalary}
            onChange={onCand("baseSalary")}
            step={1_000}
          />
          <Num
            label={`Last Bonus (${candidate.currency}) *`}
            value={candidate.lastBonus}
            onChange={onCand("lastBonus")}
            step={1_000}
          />
          <Num label="Years of Experience *" value={candidate.yearsExperience} onChange={onCand("yearsExperience")} step={1} />
          <Select
            label="Current Role *"
            value={candidate.role}
            onChange={onCand("role")}
            options={[
              "Relationship Manager",
              "Senior Relationship Manager",
              "Assistant Relationship Manager",
              "Investment Advisor",
              "Managing Director",
              "Director",
              "Team Head",
              "Market Head",
              "Other",
            ]}
          />
          <Select
            label="Candidate Location *"
            value={candidate.location}
            onChange={onCand("location")}
            options={[
              "— Select —",
              "Zurich",
              "Geneva",
              "Lausanne",
              "Basel",
              "Luzern",
              "Dubai",
              "London",
              "Hong Kong",
              "Singapore",
              "New York",
              "Miami",
              "Madrid",
              "Lisbon",
              "Sao Paulo",
            ]}
          />
          <Text label="Current Employer *" value={candidate.employer} onChange={onCand("employer")} />
          <Select
            label="Current Market *"
            value={candidate.marketLabel}
            onChange={onCand("marketLabel")}
            options={[
              "CH Onshore",
              "UK",
              "Portugal",
              "Spain",
              "Germany",
              "MEA",
              "LATAM",
              "CIS",
              "CEE",
              "France",
              "Benelux",
              "Asia",
              "Argentina",
              "Brazil",
              "Conosur",
              "NRI",
              "India",
              "US",
              "China",
            ]}
          />
          <Num label="Inherited Book (% of AUM) *" value={candidate.inheritedBookPct} onChange={onCand("inheritedBookPct")} step={1} />
          <Num label="Current Number of Clients *" value={candidate.currentClients} onChange={onCand("currentClients")} step={1} />
          <Num label="Current AUM (in million CHF) *" value={candidate.currentAumMM} onChange={onCand("currentAumMM")} step={0.1} />
        </div>

        <div className="mt-3 flex items-center gap-2">
          <input
            id="autoFixed"
            type="checkbox"
            className="accent-white"
            checked={autoFixedFromBase}
            onChange={(e) => setAutoFixedFromBase(e.target.checked)}
          />
          <label htmlFor="autoFixed" className="text-sm">
            Set Fixed Cost from Base × 1.25 (Year 1)
          </label>
          <PopTip>Uncheck to enter a custom yearly fixed cost below.</PopTip>
        </div>
        {!autoFixedFromBase && (
          <div className="mt-2">
            <Num
              label={`Custom Fixed Cost per Year (${candidate.currency})`}
              value={customFixedPerYear}
              onChange={(e) => setCustomFixedPerYear(Number(e.target.value || 0))}
              step={10_000}
            />
          </div>
        )}
      </div>
    </section>
  );
}

/* ===========================================================
   2) BUSINESS PLAN — PAGE 1
   =========================================================== */
function BPModelPage1() {
  return (
    <section className="container-max grid gap-6 overflow-visible">
      <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 ring-1 ring-white/10">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          📄 Business Development Plan — Page 1
          <PopTip>High-level strategy inputs to frame your growth plan.</PopTip>
        </h2>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <label className="text-sm">
            Target Market(s)
            <input
              className="mt-1 w-full rounded-md bg-black/30 border border-white/10 px-3 py-2"
              placeholder="e.g. MEA, CH Onshore"
            />
          </label>
          <label className="text-sm">
            Client Segment
            <input
              className="mt-1 w-full rounded-md bg-black/30 border border-white/10 px-3 py-2"
              placeholder="e.g. UHNWI, Family Offices"
            />
          </label>
          <label className="text-sm md:col-span-2">
            Strategic Positioning
            <textarea
              className="mt-1 w-full rounded-md bg-black/30 border border-white/10 px-3 py-2"
              rows={2}
              placeholder="e.g. Relationship-led, independent advice, platform differentiation"
            />
          </label>
          <label className="text-sm md:col-span-2">
            Value Proposition & Unique Angle
            <textarea
              className="mt-1 w-full rounded-md bg-black/30 border border-white/10 px-3 py-2"
              rows={2}
              placeholder="e.g. LatAm UHNWI niche + FX expertise"
            />
          </label>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================
   3) NET NEW MONEY  ✅ now in millions
   =========================================================== */
function NetNewMoney({
  currency,
  nnmY1,
  nnmY2,
  nnmY3,
  onPatch,
  showTips,
}: {
  currency: string;
  nnmY1: number;
  nnmY2: number;
  nnmY3: number;
  onPatch: (p: Partial<{ nnmY1: number; nnmY2: number; nnmY3: number }>) => void;
  showTips: boolean;
}) {
  const fmt = (n: number) =>
    new Intl.NumberFormat("en-CH", { style: "currency", currency, maximumFractionDigits: 0 }).format(n || 0);

  const toDisplay = (val: number) => (Number.isFinite(val) && val !== 0 ? val / 1_000_000 : "");

  return (
    <section className="container-max py-6 overflow-visible">
      <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 ring-1 ring-white/10">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          2️⃣ Net New Money (NNM)
          <PopTip>Enter conservative, probability-weighted inflows per year.</PopTip>
        </h2>
        <HelpTip show={showTips}>
          Values below are in <b>millions</b>. Typing <code>1</code> = {fmt(1_000_000)}.
        </HelpTip>

        <div className="mt-4 grid md:grid-cols-3 gap-4">
          <label className="text-sm">
            NNM — Year 1 ({currency}, in millions)
            <input
              type="number"
              inputMode="decimal"
              step={0.1}
              value={toDisplay(nnmY1)}
              onChange={(e) => onPatch({ nnmY1: Number(e.target.value || 0) * 1_000_000 })}
              className="mt-1 w-full rounded-md bg-black/30 border border-white/10 px-3 py-2"
              placeholder="e.g. 20"
            />
          </label>
          <label className="text-sm">
            NNM — Year 2 ({currency}, in millions)
            <input
              type="number"
              inputMode="decimal"
              step={0.1}
              value={toDisplay(nnmY2)}
              onChange={(e) => onPatch({ nnmY2: Number(e.target.value || 0) * 1_000_000 })}
              className="mt-1 w-full rounded-md bg-black/30 border border-white/10 px-3 py-2"
              placeholder="e.g. 25"
            />
          </label>
          <label className="text-sm">
            NNM — Year 3 ({currency}, in millions)
            <input
              type="number"
              inputMode="decimal"
              step={0.1}
              value={toDisplay(nnmY3)}
              onChange={(e) => onPatch({ nnmY3: Number(e.target.value || 0) * 1_000_000 })}
              className="mt-1 w-full rounded-md bg-black/30 border border-white/10 px-3 py-2"
              placeholder="e.g. 30"
            />
          </label>
        </div>

        <p className="mt-3 text-xs text-white/60">
          Preview — Total 3y NNM: <strong>{fmt((nnmY1 || 0) + (nnmY2 || 0) + (nnmY3 || 0))}</strong>
        </p>
      </div>
    </section>
  );
}

/* ===========================================================
   4) SIMPLE REVENUE / COST / NET VIEW
   =========================================================== */
function RevenueCostsSimple({
  currency,
  baseSalary,
  useAutoFixed,
  customFixedPerYear,
  nnmY1,
  nnmY2,
  nnmY3,
  roaY1,
  roaY2,
  roaY3,
  onChangeRoa,
  onNetMarginY3,
  showTips,
}: {
  currency: string;
  baseSalary: number;
  useAutoFixed: boolean;
  customFixedPerYear: number;
  nnmY1: number;
  nnmY2: number;
  nnmY3: number;
  roaY1: number;
  roaY2: number;
  roaY3: number;
  onChangeRoa: (patch: Partial<{ roaY1: number; roaY2: number; roaY3: number }>) => void;
  onNetMarginY3: (pct: number) => void;
  showTips: boolean;
}) {
  const fixed = useMemo(
    () => (useAutoFixed ? Math.max(0, baseSalary) * 1.25 : Math.max(0, customFixedPerYear)),
    [useAutoFixed, baseSalary, customFixedPerYear]
  );

  const rev1 = useMemo(() => nnmY1 * (roaY1 / 100), [nnmY1, roaY1]);
  const rev2 = useMemo(() => nnmY2 * (roaY2 / 100), [nnmY2, roaY2]);
  const rev3 = useMemo(() => nnmY3 * (roaY3 / 100), [nnmY3, roaY3]);

  const nm1 = useMemo(() => rev1 - fixed, [rev1, fixed]);
  const nm2 = useMemo(() => rev2 - fixed, [rev2, fixed]);
  const nm3 = useMemo(() => rev3 - fixed, [rev3, fixed]);

  const totalRev = rev1 + rev2 + rev3;
  const totalCost = fixed * 3;
  const totalNet = nm1 + nm2 + nm3;

  const netMarginY3Pct = useMemo(() => (rev3 > 0 ? (nm3 / rev3) * 100 : 0), [rev3, nm3]);

  useEffect(() => {
    onNetMarginY3(netMarginY3Pct);
  }, [netMarginY3Pct, onNetMarginY3]);

  return (
    <section className="container-max py-6 overflow-visible">
      <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 ring-1 ring-white/10">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          4️⃣ Revenue, Costs & Net Margin (Simple View)
          <PopTip>
            Applies ROA% to NNM per year. Fixed = {useAutoFixed ? "Base × 1.25" : "Custom fixed override"} each year.
          </PopTip>
        </h2>
        <HelpTip show={showTips}>
          {useAutoFixed ? (
            <>
              Fixed cost source: <b>Base × 1.25</b>. Turn the toggle off in the Candidate section to override.
            </>
          ) : (
            <>
              Fixed cost source: <b>Custom fixed per year</b>. Ensure it includes seat, desk, support, platform fees.
            </>
          )}
        </HelpTip>

        <div className="mt-4 grid md:grid-cols-3 gap-3">
          <label className="text-sm">
            ROA % Year 1
            <input
              type="number"
              step={0.1}
              value={roaY1}
              onChange={(e) => onChangeRoa({ roaY1: Number(e.target.value || 0) })}
              className="mt-1 w-full rounded-md bg-black/30 border border-white/10 px-3 py-2"
            />
          </label>
          <label className="text-sm">
            ROA % Year 2
            <input
              type="number"
              step={0.1}
              value={roaY2}
              onChange={(e) => onChangeRoa({ roaY2: Number(e.target.value || 0) })}
              className="mt-1 w-full rounded-md bg-black/30 border border-white/10 px-3 py-2"
            />
          </label>
          <label className="text-sm">
            ROA % Year 3
            <input
              type="number"
              step={0.1}
              value={roaY3}
              onChange={(e) => onChangeRoa({ roaY3: Number(e.target.value || 0) })}
              className="mt-1 w-full rounded-md bg-black/30 border border-white/10 px-3 py-2"
            />
          </label>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-white/5">
              <tr>
                <th className="px-3 py-2 text-left font-medium">Year</th>
                <th className="px-3 py-2 text-left font-medium">Gross Revenue</th>
                <th className="px-3 py-2 text-left font-medium">
                  Fixed Cost ({useAutoFixed ? "Base×1.25" : "Custom"})
                </th>
                <th className="px-3 py-2 text-left font-medium">Net Margin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="px-3 py-2">Year 1</td>
                <td className="px-3 py-2">{fmtCurrency(rev1, currency)}</td>
                <td className="px-3 py-2">{fmtCurrency(fixed, currency)}</td>
                <td className="px-3 py-2">{fmtCurrency(nm1, currency)}</td>
              </tr>
              <tr>
                <td className="px-3 py-2">Year 2</td>
                <td className="px-3 py-2">{fmtCurrency(rev2, currency)}</td>
                <td className="px-3 py-2">{fmtCurrency(fixed, currency)}</td>
                <td className="px-3 py-2">{fmtCurrency(nm2, currency)}</td>
              </tr>
              <tr>
                <td className="px-3 py-2">Year 3</td>
                <td className="px-3 py-2">
                  {fmtCurrency(rev3, currency)}{" "}
                  <span className="text-xs text-white/60">
                    (Net margin {rev3 > 0 ? netMarginY3Pct.toFixed(1) : 0}%)
                  </span>
                </td>
                <td className="px-3 py-2">{fmtCurrency(fixed, currency)}</td>
                <td className="px-3 py-2">{fmtCurrency(nm3, currency)}</td>
              </tr>
              <tr className="bg-white/5 font-medium">
                <td className="px-3 py-2">Total</td>
                <td className="px-3 py-2">{fmtCurrency(totalRev, currency)}</td>
                <td className="px-3 py-2">{fmtCurrency(totalCost, currency)}</td>
                <td className="px-3 py-2">{fmtCurrency(totalNet, currency)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================
   5) BUSINESS PLAN — PAGE 2 (prospect table)
   =========================================================== */
function BPModelPage2({ rows, setRows }: { rows: ProspectRow[]; setRows: (r: ProspectRow[]) => void }) {
  // ... your BPModelPage2 unchanged
  return <div />; // ⛔️ Keep your existing BPModelPage2 code here (you pasted it fully already)
}

/* ===========================================================
   5.5) CHARTS — Visual summary
   =========================================================== */
function ChartsPanel(props: any) {
  // ... unchanged
  return <div />; // ⛔️ Keep your existing ChartsPanel code here (you pasted it fully already)
}

/* ===========================================================
   6) FINAL ANALYSIS + EXPORT
   =========================================================== */
function FinalAnalysis(props: any) {
  // ... unchanged
  return <div />; // ⛔️ Keep your existing FinalAnalysis code here (you pasted it fully already)
}

/* ------------------------------
   Export helpers (unchanged)
------------------------------ */
// ... keep your exportPdf + exportCsvSimple unchanged

/* ===========================================================
   MAIN
   =========================================================== */
export default function BpSimulatorClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  // ✅ PATCH 3 — Smart secure badge (checks server session)
  const [sessionState, setSessionState] = useState<"checking" | "active" | "inactive">("checking");

  useEffect(() => {
    let cancelled = false;

    async function check() {
      try {
        const res = await fetch("/api/private/me", { cache: "no-store" });
        const data = await res.json().catch(() => null);

        const isAuthed = Boolean(res.ok && data?.authenticated === true);

        if (!cancelled) setSessionState(isAuthed ? "active" : "inactive");
      } catch {
        if (!cancelled) setSessionState("inactive");
      }
    }

    check();
    return () => {
      cancelled = true;
    };
  }, []);

  const [showTips, setShowTips] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [autoFixedFromBase, setAutoFixedFromBase] = useState(true);
  const [customFixedPerYear, setCustomFixedPerYear] = useState<number>(350_000);
  const [candidate, setCandidate] = useState<Candidate>(DEFAULT_CANDIDATE);
  const [nnmY1, setNnmY1] = useState<number>(20_000_000);
  const [nnmY2, setNnmY2] = useState<number>(25_000_000);
  const [nnmY3, setNnmY3] = useState<number>(30_000_000);
  const [roaY1, setRoaY1] = useState<number>(1.0);
  const [roaY2, setRoaY2] = useState<number>(1.0);
  const [roaY3, setRoaY3] = useState<number>(1.0);
  const [netMarginPctY3, setNetMarginPctY3] = useState<number>(0);

  // ... keep the rest of your file unchanged from here down
  // IMPORTANT: keep your existing JSX badge block (it is correct)
  return (
    <main className="min-h-screen overflow-visible pb-10" ref={containerRef}>
      <section className="container-max py-8 md:py-10 overflow-visible">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Business Plan Simulator</h1>

              <span
                className={[
                  "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs border",
                  sessionState === "active"
                    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                    : sessionState === "checking"
                    ? "border-white/15 bg-white/5 text-white/70"
                    : "border-amber-400/30 bg-amber-400/10 text-amber-200",
                ].join(" ")}
                title="Secure session status"
              >
                {sessionState === "active"
                  ? "🔒 Secure session active"
                  : sessionState === "checking"
                  ? "🔄 Checking session…"
                  : "🔓 Session inactive"}
              </span>
            </div>

            <p className="mt-2 text-white/80">
              Model AuM portability, revenue & net margins with strategy panels, NNM, charts, and exportable outputs.
            </p>
          </div>

          <label className="inline-flex items-center gap-2 text-sm">
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

      {/* KEEP THE REST OF YOUR COMPONENT TREE UNCHANGED */}
    </main>
  );
}