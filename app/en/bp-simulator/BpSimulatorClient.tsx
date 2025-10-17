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

/* ------------------------------
   Reusable bits
------------------------------ */
function HelpTip({ show, children }: { show: boolean; children: React.ReactNode }) {
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
        value={Number.isFinite(value) ? value : 0}
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

/* Small Yes/No helper (for toggle lists) */
type YesNo = "Yes" | "No";
function YesNoSelect({
  label,
  value,
  onChange,
}: {
  label: string;
  value: YesNo;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <label className="text-sm flex items-center justify-between gap-3">
      <span>{label}</span>
      <select
        className="rounded-md bg-black/30 border border-white/10 px-2 py-1 w-28"
        value={value}
        onChange={onChange}
      >
        <option>Yes</option>
        <option>No</option>
      </select>
    </label>
  );
}

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
  currentAumMM: number; // in million

  /* —— NEW: Assets snapshot —— */
  assets_totalAumM: number;
  assets_affluentPct: number; // <1m
  assets_hnwiPct: number;     // 1–15m
  assets_uhnwiPct: number;    // >15m

  /* —— NEW: ROA / Revenues —— */
  roa_averagePct: number;     // %
  roa_revYtdM: number;        // in million
  roa_revLastYearM: number;   // in million

  /* —— NEW: Service mix (% of assets) —— */
  svc_selfDirectedPct: number;
  svc_discretionaryPct: number;
  svc_advisoryPct: number;
  svc_directAccessPct: number; // direct access to trading room
  svc_custodyPct: number;

  /* —— NEW: # Clients domiciled —— */
  dom_country1: string;
  dom_share1: number;
  dom_country2: string;
  dom_share2: number;
  dom_country3: string;
  dom_share3: number;

  /* —— NEW: Type of Clients (Yes/No) —— */
  client_pep: YesNo;
  client_executive: YesNo;
  client_inactive: YesNo;
  client_company: YesNo;
  client_finInstitutionEam: YesNo;
  client_trust: YesNo;

  /* —— NEW: Type of Product (Yes/No) —— */
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

/* Narrow keys to numeric-only fields for safe arithmetic */
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

/* Defaults */
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

  /* NEW */
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
  new Intl.NumberFormat("en-CH", { style: "currency", currency, maximumFractionDigits: 0 }).format(n || 0);

/* ===========================================================
   1) BASIC CANDIDATE INFORMATION (requested fields)
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
      setCandidate({ ...candidate, [k]: (typeof candidate[k] === "number" ? Number(val) : val) as Candidate[K] });
    };

  const Row2 = ({ children }: { children: React.ReactNode }) => (
    <div className="grid grid-cols-2 gap-3">{children}</div>
  );

  return (
    <section className="container-max grid gap-6 pb-4">
      <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-5 ring-1 ring-white/10">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          1️⃣ Basic Candidate Information
          <PopTip>We use Base × 1.25 as a proxy for annual fixed cost in Section 4 unless you set a custom override.</PopTip>
        </h2>
        <p className="mt-1 text-xs text-white/60">Fields marked * are recommended.</p>

        <HelpTip show={showTips}>
          Use current-year numbers. If uncertain, be conservative. Toggle off the Base×1.25 switch to input a custom
          <b> Fixed Cost per year</b> (includes seat, desk, support, platform fees).
        </HelpTip>

        {/* Identity & comp */}
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <Text label="Candidate Name" value={candidate.name} onChange={onCand("name")} />
          <Text label="Candidate Email *" value={candidate.email} onChange={onCand("email")} type="email" />
          <Select
            label="Currency *"
            value={candidate.currency}
            onChange={onCand("currency")}
            options={["CHF", "USD", "EUR", "AED", "SGD", "HKD"]}
          />

          <Num label={`Current Base Salary (${candidate.currency}) *`} value={candidate.baseSalary} onChange={onCand("baseSalary")} step={1_000} />
          <Num label={`Last Bonus (${candidate.currency}) *`} value={candidate.lastBonus} onChange={onCand("lastBonus")} step={1_000} />
          <Num label="Years of Experience *" value={candidate.yearsExperience} onChange={onCand("yearsExperience")} step={1} />

          <Select
            label="Current Role *"
            value={candidate.role}
            onChange={onCand("role")}
            options={[
              "Relationship Manager","Senior Relationship Manager","Assistant Relationship Manager",
              "Investment Advisor","Managing Director","Director","Team Head","Market Head","Other",
            ]}
          />
          <Select
            label="Candidate Location *"
            value={candidate.location}
            onChange={onCand("location")}
            options={[
              "— Select —","Zurich","Geneva","Lausanne","Basel","Luzern",
              "Dubai","London","Hong Kong","Singapore","New York","Miami","Madrid","Lisbon","Sao Paulo",
            ]}
          />
          <Text label="Current Employer *" value={candidate.employer} onChange={onCand("employer")} />

          <Select
            label="Current Market *"
            value={candidate.marketLabel}
            onChange={onCand("marketLabel")}
            options={[
              "CH Onshore","UK","Portugal","Spain","Germany","MEA","LATAM",
              "CIS","CEE","France","Benelux","Asia","Argentina","Brazil","Conosur","NRI","India","US","China",
            ]}
          />
          <Num label="Inherited Book (% of AUM) *" value={candidate.inheritedBookPct} onChange={onCand("inheritedBookPct")} step={1} />
          <Num label="Current Number of Clients *" value={candidate.currentClients} onChange={onCand("currentClients")} step={1} />
          <Num label="Current AUM (in million CHF) *" value={candidate.currentAumMM} onChange={onCand("currentAumMM")} step={0.1} />
        </div>

        {/* Auto fixed cost toggle */}
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

        {/* ————————————————— NEW PDF-like blocks ————————————————— */}

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Assets */}
          <section className="rounded-xl bg-black/30 ring-1 ring-white/10 border border-white/10">
            <header className="px-4 py-3 border-b border-white/10 text-sm font-semibold flex items-center gap-2">
              Assets (%assets / #clients)
              <PopTip>AUM in millions; tiers as % of assets. Keep shares summing near 100%.</PopTip>
            </header>
            <div className="p-4 grid gap-3">
              <Num label="Total AUM (m)" value={candidate.assets_totalAumM} onChange={onCand("assets_totalAumM")} step={0.1} />
              <div className="grid grid-cols-2 gap-3">
                <Num label="o/w Affluent (<1m) %" value={candidate.assets_affluentPct} onChange={onCand("assets_affluentPct")} step={1} />
                <Num label="o/w HNWI (1–15m) %" value={candidate.assets_hnwiPct} onChange={onCand("assets_hnwiPct")} step={1} />
              </div>
              <Num label="o/w UHNWI (>15m) %" value={candidate.assets_uhnwiPct} onChange={onCand("assets_uhnwiPct")} step={1} />
            </div>
          </section>

          {/* ROA / Revenues */}
          <section className="rounded-xl bg-black/30 ring-1 ring-white/10 border border-white/10">
            <header className="px-4 py-3 border-b border-white/10 text-sm font-semibold flex items-center gap-2">
              ROA / Revenues
              <PopTip>Average ROA in %, Revenues in millions (YTD & last year).</PopTip>
            </header>
            <div className="p-4 grid gap-3">
              <Num label="Average ROA (%)" value={candidate.roa_averagePct} onChange={onCand("roa_averagePct")} step={0.1} />
              <div className="grid grid-cols-2 gap-3">
                <Num label="Revenues YTD (m)" value={candidate.roa_revYtdM} onChange={onCand("roa_revYtdM")} step={0.1} />
                <Num label="Revenues last year (m)" value={candidate.roa_revLastYearM} onChange={onCand("roa_revLastYearM")} step={0.1} />
              </div>
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Service type */}
          <section className="rounded-xl bg-black/30 ring-1 ring-white/10 border border-white/10">
            <header className="px-4 py-3 border-b border-white/10 text-sm font-semibold flex items-center gap-2">
              Service type (% of Assets)
              <PopTip>Breakdown by mandate type. Aim for totals near 100%.</PopTip>
            </header>
            <div className="p-4 grid gap-3">
              <Num label="Self-directed %" value={candidate.svc_selfDirectedPct} onChange={onCand("svc_selfDirectedPct")} step={1} />
              <Num label="Discretionary mandate %" value={candidate.svc_discretionaryPct} onChange={onCand("svc_discretionaryPct")} step={1} />
              <Num label="Investment Advisory %" value={candidate.svc_advisoryPct} onChange={onCand("svc_advisoryPct")} step={1} />
              <Num label="Direct Access to trading room %" value={candidate.svc_directAccessPct} onChange={onCand("svc_directAccessPct")} step={1} />
              <Num label="Custody %" value={candidate.svc_custodyPct} onChange={onCand("svc_custodyPct")} step={1} />
            </div>
          </section>

          {/* # Clients (domicile) */}
          <section className="rounded-xl bg-black/30 ring-1 ring-white/10 border border-white/10">
            <header className="px-4 py-3 border-b border-white/10 text-sm font-semibold flex items-center gap-2">
              # Clients (%assets / #clients)
              <PopTip>List up to three key domiciles with their estimated shares.</PopTip>
            </header>
            <div className="p-4 grid gap-3">
              <div className="grid grid-cols-2 gap-3">
                <Text label="o/w domiciled in" value={candidate.dom_country1} onChange={onCand("dom_country1")} />
                <Num label="Share (%)" value={candidate.dom_share1} onChange={onCand("dom_share1")} step={1} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Text label="o/w domiciled in" value={candidate.dom_country2} onChange={onCand("dom_country2")} />
                <Num label="Share (%)" value={candidate.dom_share2} onChange={onCand("dom_share2")} step={1} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Text label="o/w domiciled in" value={candidate.dom_country3} onChange={onCand("dom_country3")} />
                <Num label="Share (%)" value={candidate.dom_share3} onChange={onCand("dom_share3")} step={1} />
              </div>
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Type of Clients */}
          <section className="rounded-xl bg-black/30 ring-1 ring-white/10 border border-white/10">
            <header className="px-4 py-3 border-b border-white/10 text-sm font-semibold flex items-center gap-2">
              Type of Clients
              <PopTip>Select Yes/No for each client type.</PopTip>
            </header>
            <div className="p-4 grid gap-3">
              <YesNoSelect label="PEP" value={candidate.client_pep} onChange={onCand("client_pep")} />
              <YesNoSelect label="Executive / Entrepreneur" value={candidate.client_executive} onChange={onCand("client_executive")} />
              <YesNoSelect label="Inactive" value={candidate.client_inactive} onChange={onCand("client_inactive")} />
              <YesNoSelect label="Company" value={candidate.client_company} onChange={onCand("client_company")} />
              <YesNoSelect label="Financial Institution / EAM" value={candidate.client_finInstitutionEam} onChange={onCand("client_finInstitutionEam")} />
              <YesNoSelect label="Trust" value={candidate.client_trust} onChange={onCand("client_trust")} />
            </div>
          </section>

          {/* Type of Product */}
          <section className="rounded-xl bg-black/30 ring-1 ring-white/10 border border-white/10">
            <header className="px-4 py-3 border-b border-white/10 text-sm font-semibold flex items-center gap-2">
              Type of Product
              <PopTip>Mark product areas you actively cover. Use “Other” note to specify.</PopTip>
            </header>
            <div className="p-4 grid gap-3">
              <YesNoSelect label="Credit Lombard" value={candidate.prod_creditLombard} onChange={onCand("prod_creditLombard")} />
              <YesNoSelect label="Mortgage" value={candidate.prod_mortgage} onChange={onCand("prod_mortgage")} />
              <YesNoSelect label="Wealth & Tax Planning" value={candidate.prod_wealthTaxPlanning} onChange={onCand("prod_wealthTaxPlanning")} />
              <YesNoSelect label="Structured Products" value={candidate.prod_structuredProducts} onChange={onCand("prod_structuredProducts")} />
              <YesNoSelect label="Hedge Funds / Private Equity" value={candidate.prod_hedgeFundsPE} onChange={onCand("prod_hedgeFundsPE")} />
              <div className="grid grid-cols-2 gap-3">
                <YesNoSelect label="Other" value={candidate.prod_other} onChange={onCand("prod_other")} />
                <Text label="Other (explain)" value={candidate.prod_otherNote} onChange={onCand("prod_otherNote")} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================
   2) BUSINESS PLAN — PAGE 1 (contextual strategy)
   =========================================================== */
function BPModelPage1() {
  return (
    <section className="container-max grid gap-6">
      <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 ring-1 ring-white/10">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          📄 Business Development Plan — Page 1
          <PopTip>High-level strategy inputs to frame your growth plan.</PopTip>
        </h2>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <label className="text-sm">
            Target Market(s)
            <input className="mt-1 w-full rounded-md bg-black/30 border border-white/10 px-3 py-2" placeholder="e.g. MEA, CH Onshore" />
          </label>
          <label className="text-sm">
            Client Segment
            <input className="mt-1 w-full rounded-md bg-black/30 border border-white/10 px-3 py-2" placeholder="e.g. UHNWI, Family Offices" />
          </label>
          <label className="text-sm md:col-span-2">
            Strategic Positioning
            <textarea className="mt-1 w-full rounded-md bg-black/30 border border-white/10 px-3 py-2" rows={2} placeholder="e.g. Relationship-led, independent advice, platform differentiation" />
          </label>
          <label className="text-sm md:col-span-2">
            Value Proposition & Unique Angle
            <textarea className="mt-1 w-full rounded-md bg-black/30 border border-white/10 px-3 py-2" rows={2} placeholder="e.g. LatAm UHNWI niche + FX expertise" />
          </label>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================
   3) NET NEW MONEY
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

  return (
    <section className="container-max py-6">
      <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 ring-1 ring-white/10">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          2️⃣ Net New Money (NNM)
          <PopTip>Enter conservative, probability-weighted inflows per year.</PopTip>
        </h2>
        <HelpTip show={showTips}>
          Split large tickets realistically across years and track “stretch” cases separately to avoid double counting.
        </HelpTip>

        <div className="mt-4 grid md:grid-cols-3 gap-4">
          <label className="text-sm">
            NNM — Year 1 ({currency})
            <input
              type="number"
              inputMode="decimal"
              value={Number.isFinite(nnmY1) ? nnmY1 : 0}
              onChange={(e) => onPatch({ nnmY1: Number(e.target.value || 0) })}
              className="mt-1 w-full rounded-md bg-black/30 border border-white/10 px-3 py-2"
              placeholder="e.g. 20000000"
            />
          </label>
          <label className="text-sm">
            NNM — Year 2 ({currency})
            <input
              type="number"
              inputMode="decimal"
              value={Number.isFinite(nnmY2) ? nnmY2 : 0}
              onChange={(e) => onPatch({ nnmY2: Number(e.target.value || 0) })}
              className="mt-1 w-full rounded-md bg-black/30 border border-white/10 px-3 py-2"
              placeholder="e.g. 25000000"
            />
          </label>
          <label className="text-sm">
            NNM — Year 3 ({currency})
            <input
              type="number"
              inputMode="decimal"
              value={Number.isFinite(nnmY3) ? nnmY3 : 0}
              onChange={(e) => onPatch({ nnmY3: Number(e.target.value || 0) })}
              className="mt-1 w-full rounded-md bg-black/30 border border-white/10 px-3 py-2"
              placeholder="e.g. 30000000"
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
   4) SIMPLE REVENUE / COST / NET VIEW (kept for table)
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

  // push parent update by effect (avoids setState during render warning)
  useEffect(() => {
    onNetMarginY3(netMarginY3Pct);
  }, [netMarginY3Pct, onNetMarginY3]);

  return (
    <section className="container-max py-6">
      <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 ring-1 ring-white/10">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          4️⃣ Revenue, Costs & Net Margin (Simple View)
          <PopTip>
            Applies ROA% to NNM per year. Fixed = {useAutoFixed ? "Base × 1.25" : "Custom fixed override"} each year.
          </PopTip>
        </h2>
        <HelpTip show={showTips}>
          {useAutoFixed ? (
            <>Fixed cost source: <b>Base × 1.25</b>. Turn the toggle off in the Candidate section to override.</>
          ) : (
            <>Fixed cost source: <b>Custom fixed per year</b>. Ensure it includes seat, desk, support, platform fees.</>
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

        {/* Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-white/5">
              <tr>
                <th className="px-3 py-2 text-left font-medium">Year</th>
                <th className="px-3 py-2 text-left font-medium">Gross Revenue</th>
                <th className="px-3 py-2 text-left font-medium">Fixed Cost ({useAutoFixed ? "Base×1.25" : "Custom"})</th>
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
                  <span className="text-xs text-white/60">(Net margin {rev3 > 0 ? netMarginY3Pct.toFixed(1) : 0}%)</span>
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
   5) BUSINESS PLAN — PAGE 2 (prospect summary table)
   =========================================================== */
function BPModelPage2({
  rows,
  setRows,
}: {
  rows: ProspectRow[];
  setRows: (r: ProspectRow[]) => void;
}) {
  const add = () =>
    setRows([
      ...rows,
      {
        id: uid(),
        name: "",
        source: "Self-acquired",
        wealthM: 0,
        aumM: 0,
        marginPct: 0,
        bestY1M: 0,
        worstY1M: 0,
        bestY2M: 0,
        worstY2M: 0,
        bestY3M: 0,
        worstY3M: 0,
      },
    ]);
  const patch = (id: string, p: Partial<ProspectRow>) => setRows(rows.map((r) => (r.id === id ? { ...r, ...p } : r)));
  const remove = (id: string) => setRows(rows.filter((r) => r.id !== id));

  const totals = rows.reduce(
    (a, r) => {
      a.wealth += r.wealthM || 0;
      a.aum += r.aumM || 0;
      a.best1 += r.bestY1M || 0;
      a.worst1 += r.worstY1M || 0;
      a.best2 += r.bestY2M || 0;
      a.worst2 += r.worstY2M || 0;
      a.best3 += r.bestY3M || 0;
      a.worst3 += r.worstY3M || 0;
      return a;
    },
    { wealth: 0, aum: 0, best1: 0, worst1: 0, best2: 0, worst2: 0, best3: 0, worst3: 0 }
  );

  return (
    <section className="container-max grid gap-6 pt-2">
      <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 ring-1 ring-white/10">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          3️⃣ Business Development Plan — Page 2
          <PopTip>Map prospects/groups with best/worst NNM over 3 years.</PopTip>
        </h2>

        <div className="mt-3 flex gap-2">
          <button className="btn-primary" onClick={add}>
            ➕ Add row
          </button>
          <button className="btn-ghost" onClick={() => setRows([])} disabled={!rows.length}>
            Clear all
          </button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-white/5 align-bottom">
              <tr>
                <th className="px-3 py-2 text-left font-medium">Prospect / Group</th>
                <th className="px-3 py-2 text-left font-medium">Source</th>
                <th className="px-3 py-2 text-right font-medium">Wealth (M)</th>
                <th className="px-3 py-2 text-right font-medium">AUM (M)</th>
                <th className="px-3 py-2 text-right font-medium">Margin (%)</th>
                <th className="px-3 py-2 text-right font-medium">Best Y1</th>
                <th className="px-3 py-2 text-right font-medium">Worst Y1</th>
                <th className="px-3 py-2 text-right font-medium">Best Y2</th>
                <th className="px-3 py-2 text-right font-medium">Worst Y2</th>
                <th className="px-3 py-2 text-right font-medium">Best Y3</th>
                <th className="px-3 py-2 text-right font-medium">Worst Y3</th>
                <th className="px-3 py-2 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="px-3 py-2">
                    <input
                      className="w-56 rounded-md bg-black/30 border border-white/10 px-2 py-1"
                      value={r.name}
                      onChange={(e) => patch(r.id, { name: e.target.value })}
                      placeholder="e.g. FO Israel #1"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <select
                      className="w-40 rounded-md bg-black/30 border border-white/10 px-2 py-1"
                      value={r.source}
                      onChange={(e) => patch(r.id, { source: e.target.value as ProspectRow["source"] })}
                    >
                      <option>Self-acquired</option>
                      <option>Inherited</option>
                      <option>Finder</option>
                      <option>Other</option>
                    </select>
                  </td>
                  {(
                    [
                      ["wealthM", 0.1],
                      ["aumM", 0.1],
                      ["marginPct", 0.01],
                      ["bestY1M", 0.1],
                      ["worstY1M", 0.1],
                      ["bestY2M", 0.1],
                      ["worstY2M", 0.1],
                      ["bestY3M", 0.1],
                      ["worstY3M", 0.1],
                    ] as const
                  ).map(([k, step]) => (
                    <td key={k} className="px-3 py-2 text-right">
                      <input
                        type="number"
                        step={step}
                        className="w-24 max-w-[110px] rounded-md bg-black/30 border border-white/10 px-2 py-1 text-right"
                        value={(r as any)[k]}
                        onChange={(e) => patch(r.id, { [k]: Number(e.target.value || 0) } as any)}
                      />
                    </td>
                  ))}
                  <td className="px-3 py-2">
                    <button className="btn-ghost text-red-300" onClick={() => remove(r.id)}>
                      🗑 Remove
                    </button>
                  </td>
                </tr>
              ))}
              {!!rows.length && (
                <tr className="bg-white/5 font-medium">
                  <td className="px-3 py-2">TOTAL</td>
                  <td className="px-3 py-2"></td>
                  <td className="px-3 py-2 text-right">{totals.wealth.toFixed(1)}</td>
                  <td className="px-3 py-2 text-right">{totals.aum.toFixed(1)}</td>
                  <td className="px-3 py-2 text-right">—</td>
                  <td className="px-3 py-2 text-right">{totals.best1.toFixed(1)}</td>
                  <td className="px-3 py-2 text-right">{totals.worst1.toFixed(1)}</td>
                  <td className="px-3 py-2 text-right">{totals.best2.toFixed(1)}</td>
                  <td className="px-3 py-2 text-right">{totals.worst2.toFixed(1)}</td>
                  <td className="px-3 py-2 text-right">{totals.best3.toFixed(1)}</td>
                  <td className="px-3 py-2 text-right">{totals.worst3.toFixed(1)}</td>
                  <td className="px-3 py-2"></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================
   5.5) CHARTS — Visual summary
   =========================================================== */
function ChartsPanel({
  currency,
  nnmSeries,
  pnlSeries,
  serviceMix,
  assetTiers,
  prospectBands,
}: {
  currency: string;
  nnmSeries: Array<{ year: string; NNM: number }>;
  pnlSeries: Array<{ year: string; Revenue: number; Fixed: number; Net: number }>;
  serviceMix: Array<{ name: string; value: number }>;
  assetTiers: Array<{ name: string; value: number }>;
  prospectBands: Array<{ year: string; Best: number; Worst: number }>;
}) {
  const pieColors = ["#7dd3fc", "#86efac", "#fde68a", "#fca5a5", "#c4b5fd"];
  return (
    <section className="container-max py-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* NNM line */}
        <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-5 ring-1 ring-white/10">
          <h3 className="text-sm font-semibold mb-3">NNM Trajectory ({currency})</h3>
          <div className="h-56">
            <ResponsiveContainer>
              <LineChart data={nnmSeries}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(v) => Intl.NumberFormat("en-CH", { notation: "compact" }).format(v)} />
                <Tooltip formatter={(v: number) => fmtCurrency(v, currency)} />
                <Legend />
                <Line type="monotone" dataKey="NNM" stroke="#93c5fd" dot />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* P&L bars */}
        <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-5 ring-1 ring-white/10">
          <h3 className="text-sm font-semibold mb-3">Revenue vs Fixed vs Net ({currency})</h3>
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={pnlSeries}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(v) => Intl.NumberFormat("en-CH", { notation: "compact" }).format(v)} />
                <Tooltip formatter={(v: number) => fmtCurrency(v, currency)} />
                <Legend />
                <Bar dataKey="Revenue" stackId="a" fill="#60a5fa" />
                <Bar dataKey="Fixed" stackId="a" fill="#a3a3a3" />
                <Bar dataKey="Net" fill="#34d399" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Service mix pie */}
        <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-5 ring-1 ring-white/10">
          <h3 className="text-sm font-semibold mb-3">Service Mix (% of Assets)</h3>
          <div className="h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie dataKey="value" data={serviceMix} outerRadius={90} label>
                  {serviceMix.map((_, i) => (
                    <Cell key={i} fill={pieColors[i % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Asset tiers pie */}
        <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-5 ring-1 ring-white/10">
          <h3 className="text-sm font-semibold mb-3">Asset Tiers (% of AUM)</h3>
          <div className="h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie dataKey="value" data={assetTiers} outerRadius={90} label>
                  {assetTiers.map((_, i) => (
                    <Cell key={i} fill={pieColors[(i + 2) % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Prospect best/worst band */}
        <div className="md:col-span-2 rounded-2xl border border-white/10 bg-neutral-900/40 p-5 ring-1 ring-white/10">
          <h3 className="text-sm font-semibold mb-3">Prospects — Best/Worst NNM bands (M)</h3>
          <div className="h-56">
            <ResponsiveContainer>
              <AreaChart data={prospectBands}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="Best" stroke="#86efac" fill="#86efac" fillOpacity={0.35} />
                <Area type="monotone" dataKey="Worst" stroke="#fca5a5" fill="#fca5a5" fillOpacity={0.25} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================
   6) FINAL ANALYSIS + EXPORT (refined)
   =========================================================== */
type Insights = {
  netMarginY3Pct: number;
  rev3: number;
  fixed: number;
  roaY1: number;
  roaY2: number;
  roaY3: number;
  nnmY1: number;
  nnmY2: number;
  nnmY3: number;
  currency: string;
  serviceMixSum: number;
  assetTierSum: number;
  domicileSum: number;
  pep: YesNo;
  exec: YesNo;
  company: YesNo;
  prodCredit: YesNo;
  prodStruct: YesNo;
  prodHFPE: YesNo;
};

function FinalAnalysis({
  exporting,
  onExportPdf,
  onExportCsv,
  insights,
}: {
  exporting: boolean;
  onExportPdf: () => void;
  onExportCsv: () => void;
  insights: Insights;
}) {
  const {
    netMarginY3Pct,
    rev3,
    fixed,
    roaY1,
    roaY2,
    roaY3,
    nnmY1,
    nnmY2,
    nnmY3,
    currency,
    serviceMixSum,
    assetTierSum,
    domicileSum,
    pep,
    exec,
    company,
    prodCredit,
    prodStruct,
    prodHFPE,
  } = insights;

  const score = useMemo(() => {
    if (!netMarginY3Pct) return "⚪ Neutral";
    if (netMarginY3Pct >= 40) return "🟢 Excellent";
    if (netMarginY3Pct >= 28) return "🟡 Good";
    return "🔴 Weak";
  }, [netMarginY3Pct]);

  // Diagnostic metrics
  const nnmCAGR = useMemo(() => {
    const start = nnmY1 || 0;
    const end = nnmY3 || 0;
    if (start <= 0 || end <= 0) return 0;
    return (Math.pow(end / start, 1 / 2) - 1) * 100;
  }, [nnmY1, nnmY3]);

  const roaTrend = useMemo(() => {
    if (roaY3 > roaY2 && roaY2 >= roaY1) return "improving";
    if (roaY3 < roaY2 && roaY2 <= roaY1) return "deteriorating";
    return "mixed";
  }, [roaY1, roaY2, roaY3]);

  const fixedAsPctOfRev3 = useMemo(() => (rev3 > 0 ? (fixed / rev3) * 100 : 0), [fixed, rev3]);

  // What ROA would be needed in Y3 to reach 35% net margin?
  const targetNetMargin = 0.35;
  const revNeededForTarget = useMemo(() => (1 - targetNetMargin > 0 ? fixed / (1 - targetNetMargin) : 0), [fixed]);
  const roaNeededPct = useMemo(() => (nnmY3 > 0 ? (revNeededForTarget / nnmY3) * 100 : 0), [revNeededForTarget, nnmY3]);
  const roaGapBps = Math.max(0, Math.round((roaNeededPct - roaY3) * 100)); // in bps

  const warnings: string[] = [];
  if (serviceMixSum && Math.abs(100 - serviceMixSum) > 5) warnings.push(`Service mix totals ${serviceMixSum.toFixed(0)}% (aim ~100%).`);
  if (assetTierSum && Math.abs(100 - assetTierSum) > 5) warnings.push(`Asset tiers total ${assetTierSum.toFixed(0)}% (aim ~100%).`);
  if (domicileSum && Math.abs(100 - domicileSum) > 5) warnings.push(`Domicile shares total ${domicileSum.toFixed(0)}% (aim ~100%).`);
  if (pep === "Yes") warnings.push("PEP exposure flagged — expect enhanced onboarding/monitoring timelines.");

  // Recommendations (concise, banker-grade)
  const recs = [
    netMarginY3Pct < 28
      ? `Raise Y3 ROA from ${roaY3.toFixed(2)}% toward ~${roaNeededPct.toFixed(
          2
        )}% (+${roaGapBps} bps) or lift Y3 NNM by ~${fmtCurrency(
          Math.max(0, revNeededForTarget - rev3) / (roaY3 / 100 || 0.0001),
          currency
        )} to achieve ≈35% net margin.`
      : `Maintain Y3 ROA ≈ ${roaY3.toFixed(2)}% and protect pricing; discounting would compress the current ${netMarginY3Pct.toFixed(
          1
        )}% net margin.`,
    fixedAsPctOfRev3 > 60
      ? `Fixed cost burden is ${fixedAsPctOfRev3.toFixed(
          0
        )}% of Y3 revenue — renegotiate desk/support allocations or phase hiring until revenue run-rate exceeds ${fmtCurrency(
          fixed / 0.6,
          currency
        )}.`
      : `Fixed cost discipline adequate (${fixedAsPctOfRev3.toFixed(0)}% of Y3 revenue). Keep variable-heavy stack.`,
    nnmCAGR < 10
      ? `NNM CAGR at ${nnmCAGR.toFixed(1)}% — concentrate pipeline on 3–5 anchor prospects; pre-commit custody and FX lines to accelerate conversion.`
      : `NNM growth ${nnmCAGR.toFixed(1)}% — ensure pipeline depth to backfill slippage and sustain trajectory.`,
    exec === "Yes" && (prodCredit === "Yes" || prodStruct === "Yes" || prodHFPE === "Yes")
      ? `Leverage executive/entrepreneur footprint with structured yields and Lombard overlays; bundle treasury/FX to defend ROA.`
      : `Clarify monetization levers (advisory retainers, DPM tiers, financing spreads) to stabilize ROA.`,
  ];

  return (
    <section className="container-max py-10">
      <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 ring-1 ring-white/10">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          📈 Final Analysis & Recommendation
          <PopTip>Actionable diagnostics derived from NNM, ROA and fixed-cost profile.</PopTip>
        </h2>

        {/* KPIs */}
        <div className="mt-4 grid md:grid-cols-4 gap-4">
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="text-xs text-white/70">Net Margin (Y3)</div>
            <div className="text-2xl font-bold">{netMarginY3Pct.toFixed(1)}%</div>
            <div className="text-sm mt-1">Status: <span className="font-semibold">{score}</span></div>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="text-xs text-white/70">Fixed as % of Rev (Y3)</div>
            <div className="text-2xl font-bold">{fixedAsPctOfRev3.toFixed(0)}%</div>
            <div className="text-sm mt-1">{fmtCurrency(fixed, currency)} fixed</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="text-xs text-white/70">NNM CAGR (Y1→Y3)</div>
            <div className="text-2xl font-bold">{nnmCAGR.toFixed(1)}%</div>
            <div className="text-sm mt-1">{fmtCurrency(nnmY1, currency)} → {fmtCurrency(nnmY3, currency)}</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="text-xs text-white/70">ROA Trend</div>
            <div className="text-2xl font-bold capitalize">{roaTrend}</div>
            <div className="text-sm mt-1">
              {roaY1.toFixed(2)}% → {roaY2.toFixed(2)}% → {roaY3.toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold mb-2">Recommendations</h3>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            {recs.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>

        {/* Cautions */}
        {warnings.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-2">Cautions / Data Hygiene</h3>
            <ul className="list-disc pl-6 space-y-2 text-sm text-amber-200">
              {warnings.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            className={`btn-primary ${exporting ? "opacity-60 cursor-not-allowed" : ""}`}
            disabled={exporting}
            onClick={onExportPdf}
          >
            {exporting ? "Exporting…" : "📄 Export PDF"}
          </button>
          <button className="btn-ghost" onClick={onExportCsv}>
            📊 Export CSV
          </button>
          <Link href="/en/contact" className="btn-ghost">
            🤝 Talk to an Advisor
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------
   Export helpers
------------------------------ */
async function exportPdf(el: HTMLElement, candidateName?: string) {
  // Cast to any to allow 'scale' and 'backgroundColor' options without relying on community types
  const canvas = await html2canvas(el, { scale: 2, backgroundColor: "#0B0E13" } as any);
  const imgData = canvas.toDataURL("image/jpeg", 0.92);
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const imgHeight = (canvas.height * pageWidth) / canvas.width;
  let position = 0;
  let heightLeft = imgHeight;

  pdf.addImage(imgData, "JPEG", 0, position, pageWidth, imgHeight);
  heightLeft -= pdf.internal.pageSize.getHeight();

  while (heightLeft > 0) {
    pdf.addPage();
    position = heightLeft - imgHeight;
    pdf.addImage(imgData, "JPEG", 0, position, pageWidth, imgHeight);
    heightLeft -= pdf.internal.pageSize.getHeight();
  }

  const safeName = candidateName
    ? `bp-simulator-${candidateName.trim().replace(/\s+/g, "-")}.pdf`
    : "bp-simulator.pdf";
  pdf.save(safeName);
}

function exportCsvSimple({
  netMarginPctY3,
  candidateName,
  roaY1,
  roaY2,
  roaY3,
}: {
  netMarginPctY3: number;
  candidateName?: string;
  roaY1: number;
  roaY2: number;
  roaY3: number;
}) {
  const csv = `Section,Value
Net Margin Y3 (%),${netMarginPctY3.toFixed(2)}
ROA% Y1,${roaY1}
ROA% Y2,${roaY2}
ROA% Y3,${roaY3}
`;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = candidateName
    ? `bp-simulator-${candidateName.trim().replace(/\s+/g, "-")}.csv`
    : "bp-simulator.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ===========================================================
   MAIN
   =========================================================== */
export default function BpSimulatorClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Toggles
  const [showTips, setShowTips] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [autoFixedFromBase, setAutoFixedFromBase] = useState(true);
  const [customFixedPerYear, setCustomFixedPerYear] = useState<number>(350_000);

  // Candidate
  const [candidate, setCandidate] = useState<Candidate>(DEFAULT_CANDIDATE);

  // NNM
  const [nnmY1, setNnmY1] = useState<number>(20_000_000);
  const [nnmY2, setNnmY2] = useState<number>(25_000_000);
  const [nnmY3, setNnmY3] = useState<number>(30_000_000);

  // ROA (%)
  const [roaY1, setRoaY1] = useState<number>(1.0);
  const [roaY2, setRoaY2] = useState<number>(1.0);
  const [roaY3, setRoaY3] = useState<number>(1.0);

  // Derived — Y3 Net Margin %
  const [netMarginPctY3, setNetMarginPctY3] = useState<number>(0);

  // Prospects (Page 2)
  const [prospects, setProspects] = useState<ProspectRow[]>([]);

  // Derived values for charts & analysis (compute here once)
  const fixed = useMemo(
    () => (autoFixedFromBase ? Math.max(0, candidate.baseSalary) * 1.25 : Math.max(0, customFixedPerYear)),
    [autoFixedFromBase, candidate.baseSalary, customFixedPerYear]
  );
  const rev1 = useMemo(() => nnmY1 * (roaY1 / 100), [nnmY1, roaY1]);
  const rev2 = useMemo(() => nnmY2 * (roaY2 / 100), [nnmY2, roaY2]);
  const rev3 = useMemo(() => nnmY3 * (roaY3 / 100), [nnmY3, roaY3]);
  const nm1 = useMemo(() => rev1 - fixed, [rev1, fixed]);
  const nm2 = useMemo(() => rev2 - fixed, [rev2, fixed]);
  const nm3 = useMemo(() => rev3 - fixed, [rev3, fixed]);

  const nnmSeries = useMemo(
    () => [
      { year: "Y1", NNM: nnmY1 },
      { year: "Y2", NNM: nnmY2 },
      { year: "Y3", NNM: nnmY3 },
    ],
    [nnmY1, nnmY2, nnmY3]
  );
  const pnlSeries = useMemo(
    () => [
      { year: "Y1", Revenue: rev1, Fixed: fixed, Net: nm1 },
      { year: "Y2", Revenue: rev2, Fixed: fixed, Net: nm2 },
      { year: "Y3", Revenue: rev3, Fixed: fixed, Net: nm3 },
    ],
    [rev1, rev2, rev3, fixed, nm1, nm2, nm3]
  );

  const serviceMix = useMemo(
    () => [
      { name: "Self-directed", value: candidate.svc_selfDirectedPct || 0 },
      { name: "Discretionary", value: candidate.svc_discretionaryPct || 0 },
      { name: "Advisory", value: candidate.svc_advisoryPct || 0 },
      { name: "Direct Access", value: candidate.svc_directAccessPct || 0 },
      { name: "Custody", value: candidate.svc_custodyPct || 0 },
    ],
    [
      candidate.svc_selfDirectedPct,
      candidate.svc_discretionaryPct,
      candidate.svc_advisoryPct,
      candidate.svc_directAccessPct,
      candidate.svc_custodyPct,
    ]
  );
  const serviceMixSum = serviceMix.reduce((a, b) => a + (b.value || 0), 0);

  const assetTiers = useMemo(
    () => [
      { name: "Affluent <1m", value: candidate.assets_affluentPct || 0 },
      { name: "HNWI 1–15m", value: candidate.assets_hnwiPct || 0 },
      { name: "UHNWI >15m", value: candidate.assets_uhnwiPct || 0 },
    ],
    [candidate.assets_affluentPct, candidate.assets_hnwiPct, candidate.assets_uhnwiPct]
  );
  const assetTierSum = assetTiers.reduce((a, b) => a + (b.value || 0), 0);

  const domicileSum = (candidate.dom_share1 || 0) + (candidate.dom_share2 || 0) + (candidate.dom_share3 || 0);

  const prospectBands = useMemo(() => {
    const sum = (key: NumericProspectKey) =>
      prospects.reduce((a, r) => a + (typeof r[key] === "number" ? r[key] : 0), 0);
    const to1 = (n: number) => Number(n.toFixed(1));
    return [
      { year: "Y1", Best: to1(sum("bestY1M")), Worst: to1(sum("worstY1M")) },
      { year: "Y2", Best: to1(sum("bestY2M")), Worst: to1(sum("worstY2M")) },
      { year: "Y3", Best: to1(sum("bestY3M")), Worst: to1(sum("worstY3M")) },
    ];
  }, [prospects]);

  const handleExportPdf = async () => {
    if (!containerRef.current) return;
    setExporting(true);
    try {
      await exportPdf(containerRef.current, candidate.name);
    } finally {
      setExporting(false);
    }
  };

  const handleExportCsv = () =>
    exportCsvSimple({ netMarginPctY3, candidateName: candidate.name, roaY1, roaY2, roaY3 });

  return (
    <main className="min-h-screen" ref={containerRef}>
      {/* Header */}
      <section className="container-max py-8 md:py-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Business Plan Simulator</h1>
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

      {/* ORDERED SECTIONS */}
      <CandidateBlock
        showTips={showTips}
        candidate={candidate}
        setCandidate={setCandidate}
        autoFixedFromBase={autoFixedFromBase}
        setAutoFixedFromBase={setAutoFixedFromBase}
        customFixedPerYear={customFixedPerYear}
        setCustomFixedPerYear={setCustomFixedPerYear}
      />

      <BPModelPage1 />

      <NetNewMoney
        currency={candidate.currency || "CHF"}
        nnmY1={nnmY1}
        nnmY2={nnmY2}
        nnmY3={nnmY3}
        onPatch={(p) => {
          if (p.nnmY1 !== undefined) setNnmY1(p.nnmY1);
          if (p.nnmY2 !== undefined) setNnmY2(p.nnmY2);
          if (p.nnmY3 !== undefined) setNnmY3(p.nnmY3);
        }}
        showTips={showTips}
      />

      <BPModelPage2 rows={prospects} setRows={setProspects} />

      {/* CHARTS */}
      <ChartsPanel
        currency={candidate.currency || "CHF"}
        nnmSeries={nnmSeries}
        pnlSeries={pnlSeries}
        serviceMix={serviceMix}
        assetTiers={assetTiers}
        prospectBands={prospectBands}
      />

      {/* TABLE + COMPUTATION of Y3 Net Margin (updates parent) */}
      <RevenueCostsSimple
        currency={candidate.currency || "CHF"}
        baseSalary={candidate.baseSalary}
        useAutoFixed={autoFixedFromBase}
        customFixedPerYear={customFixedPerYear}
        nnmY1={nnmY1}
        nnmY2={nnmY2}
        nnmY3={nnmY3}
        roaY1={roaY1}
        roaY2={roaY2}
        roaY3={roaY3}
        onChangeRoa={(p) => {
          if (p.roaY1 !== undefined) setRoaY1(p.roaY1);
          if (p.roaY2 !== undefined) setRoaY2(p.roaY2);
          if (p.roaY3 !== undefined) setRoaY3(p.roaY3);
        }}
        onNetMarginY3={setNetMarginPctY3}
        showTips={showTips}
      />

      <FinalAnalysis
        exporting={exporting}
        onExportPdf={handleExportPdf}
        onExportCsv={handleExportCsv}
        insights={{
          netMarginY3Pct: netMarginPctY3,
          rev3,
          fixed,
          roaY1,
          roaY2,
          roaY3,
          nnmY1,
          nnmY2,
          nnmY3,
          currency: candidate.currency || "CHF",
          serviceMixSum,
          assetTierSum,
          domicileSum,
          pep: candidate.client_pep,
          exec: candidate.client_executive,
          company: candidate.client_company,
          prodCredit: candidate.prod_creditLombard,
          prodStruct: candidate.prod_structuredProducts,
          prodHFPE: candidate.prod_hedgeFundsPE,
        }}
      />
    </main>
  );
}