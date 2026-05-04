"use client";
import { create } from "zustand";

export type Prospect = {
  name: string;
  source: "Self Acquired" | "Inherited" | "Finder";
  wealth_m: number; // M CHF
  best_nnm_m: number; // M CHF
  worst_nnm_m: number; // M CHF
};

export type Readiness = "red" | "amber" | "green";
export type ExportStatus = "idle" | "generating" | "ready" | "error";

export type Inputs = {
  // Section 1
  candidate_name: string;
  candidate_email: string;
  years_experience: number;
  inherited_book_pct: number;
  current_role: string;
  candidate_location: string;
  current_employer: string;
  current_market: string;
  currency: string;
  base_salary: number;
  last_bonus: number;
  current_number_clients: number;
  current_assets_m: number;

  // ROA inputs
  roa_y1?: number; // % (e.g. 0.85 means 85 bps)
  roa_y2?: number;
  roa_y3?: number;

  // Section 2
  nnm_y1_m: number;
  nnm_y2_m: number;
  nnm_y3_m: number;
  proj_clients_y1: number;
  proj_clients_y2: number;
  proj_clients_y3: number;

  // Section 3
  prospects: Prospect[];
  // draft fields
  p_name: string;
  p_source: Prospect["source"];
  p_wealth_m: number;
  p_best_nnm_m: number;
  p_worst_nnm_m: number;
  edit_index: number;

  // Section 4 — AUM transfer & cost model inputs (v2)
  portability_pct: number;       // % of current AUM truly portable (0-100, default 60)
  garden_leave_months: number;   // months dead period before revenue starts (default 3)
  institution_type: string;      // 'tier1_swiss' | 'international' | 'boutique' | 'eam'
  sign_on_bonus: number;         // sign-on bonus from receiving bank (for breakeven calc)

  // Section 5 outputs (persisted)
  score?: number;
  ai_notes?: string;
  committee_score?: number;      // v2: committee readiness score (0-100)

  // Export bridge (Section 5 -> Calibration CTA)
  exportStatus?: ExportStatus;
  exportFileName?: string | null;
};

type BPState = {
  i: Inputs;
  set: (patch: Partial<Inputs>) => void;

  // Prefill support (Portability -> BP)
  prefillApplied: boolean;
  applyPrefillOnce: (payload: any) => void;
  resetPrefillApplied: () => void;

  // Export bridge helpers
  setExportStatus: (status: ExportStatus, fileName?: string | null) => void;
  resetExportStatus: () => void;

  // Convenience
  getReadiness: () => { readiness: Readiness; label: string };

  resetProspectForm: () => void;
  addProspect: () => void;
  startEditProspect: (index: number) => void;
  updateProspect: () => void;
  deleteProspect: (index: number) => void;
  cancelEditProspect: () => void;
  importProspects: (rows: Prospect[]) => void;
};

/* ---------- shared helpers (exported) ---------- */
export function n(v: unknown): number {
  const x = Number(v ?? 0);
  return Number.isFinite(x) ? x : 0;
}

function cleanStr(v: unknown, max = 250) {
  const s = typeof v === "string" ? v.trim() : "";
  if (!s) return "";
  return s.replace(/\s+/g, " ").slice(0, max);
}

function cleanLower(v: unknown, max = 250) {
  return cleanStr(v, max).toLowerCase();
}

function pick(obj: any, paths: string[]): any {
  for (const p of paths) {
    const parts = p.split(".");
    let cur = obj;
    let ok = true;
    for (const k of parts) {
      if (!cur || typeof cur !== "object" || !(k in cur)) {
        ok = false;
        break;
      }
      cur = cur[k];
    }
    if (ok && cur !== undefined && cur !== null && cur !== "") return cur;
  }
  return undefined;
}

function looksLikeEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function toMillions(v: unknown): number {
  const x = n(v);
  if (!x) return 0;
  if (x > 10000) return Math.round((x / 1_000_000) * 100) / 100;
  return x;
}

/** Returns average ROA in % (e.g., 0.9 means 0.9%) */
export function avgROA(i: Partial<Inputs>): number {
  const r1 = n((i as any).roa_y1);
  const r2 = n((i as any).roa_y2);
  const r3 = n((i as any).roa_y3);
  return (r1 + r2 + r3) / 3;
}

export function computePortability(i: Partial<Inputs>): number {
  let p = 50;

  const inherited = n(i.inherited_book_pct);
  if (inherited <= 20) p += 20;
  else if (inherited <= 40) p += 10;
  else p -= 10;

  const clients = n(i.current_number_clients);
  const aumM = n(i.current_assets_m);
  if (clients <= 50 && aumM >= 200) p += 15;
  else if (clients <= 80 && aumM >= 150) p += 5;
  else p -= 5;

  const aROA = avgROA(i);
  if (aROA > 0.9) p += 10;
  else if (aROA < 0.6) p -= 5;

  const nnm1 = n((i as any).nnm_y1_m);
  if (nnm1 > 0) {
    const best = (i.prospects || []).reduce((s, r) => s + n(r.best_nnm_m), 0);
    if (best >= nnm1) p += 10;
  }

  if (n(i.years_experience) >= 7) p += 5;

  return Math.max(0, Math.min(100, Math.round(p)));
}

export function readinessFromScore(score: unknown): { readiness: Readiness; label: string } {
  const s = n(score);
  if (s >= 75) return { readiness: "green", label: "Bank-ready" };
  if (s >= 55) return { readiness: "amber", label: "Needs work" };
  return { readiness: "red", label: "Not ready" };
}

/* ---------- Zustand store ---------- */
const defaultProspectDraft = {
  p_name: "",
  p_source: "Self Acquired" as const,
  p_wealth_m: 0,
  p_best_nnm_m: 0,
  p_worst_nnm_m: 0,
  edit_index: -1,
};

export const useBP = create<BPState>((set, get) => ({
  i: {
    // Section 1 defaults
    candidate_name: "",
    candidate_email: "",
    years_experience: 0,
    inherited_book_pct: 0,
    current_role: "Relationship Manager",
    candidate_location: "— Select —",
    current_employer: "",
    current_market: "CH Onshore",
    currency: "CHF",
    base_salary: 0,
    last_bonus: 0,
    current_number_clients: 0,
    current_assets_m: 0,

    // Section 2 defaults
    nnm_y1_m: 0,
    nnm_y2_m: 0,
    nnm_y3_m: 0,
    proj_clients_y1: 0,
    proj_clients_y2: 0,
    proj_clients_y3: 0,

    // Section 3 defaults
    prospects: [],
    ...defaultProspectDraft,

    // Section 4 defaults (v2 — new fields)
    portability_pct: 60,
    garden_leave_months: 3,
    institution_type: "tier1_swiss",
    sign_on_bonus: 0,

    // Section 5 outputs
    score: 0,
    ai_notes: "",
    committee_score: 0,

    // Export bridge defaults
    exportStatus: "idle",
    exportFileName: null,
  },

  set: (patch) => set((s) => ({ i: { ...s.i, ...patch } })),

  /* ---------------- Prefill ---------------- */
  prefillApplied: false,

  applyPrefillOnce: (payload: any) => {
    const st = get();
    if (st.prefillApplied) return;

    const i = st.i;

    const emailRaw =
      pick(payload, ["email", "user.email", "profile.email", "profile.portability.email", "profile.bp.email"]) ?? "";

    const fullNameRaw =
      pick(payload, [
        "fullName",
        "name",
        "profile.fullName",
        "profile.name",
        "profile.portability.fullName",
        "profile.portability.full_name",
        "profile.portability.candidate_name",
      ]) ?? "";

    const locationRaw =
      pick(payload, ["location", "profile.location", "profile.portability.location", "profile.portability.candidate_location"]) ??
      "";

    const marketRaw =
      pick(payload, [
        "market",
        "current_market",
        "profile.market",
        "profile.portability.market",
        "profile.portability.current_market",
      ]) ?? "";

    const bankRaw =
      pick(payload, [
        "bank",
        "employer",
        "current_employer",
        "profile.bank",
        "profile.portability.bank",
        "profile.portability.current_employer",
      ]) ?? "";

    const roleRaw =
      pick(payload, [
        "roleTitle",
        "role",
        "current_role",
        "profile.roleTitle",
        "profile.portability.roleTitle",
        "profile.portability.current_role",
      ]) ?? "";

    const currencyRaw = pick(payload, ["currency", "profile.currency", "profile.portability.currency"]) ?? "";

    const aumMaybe =
      pick(payload, [
        "portabilityAum",
        "profile.portability.aum",
        "profile.portability.aum_m",
        "profile.portability.current_assets",
        "profile.portability.current_assets_m",
      ]) ?? 0;

    const nnmY1Maybe =
      pick(payload, ["portabilityNnmY1", "profile.portability.nnm_y1_m", "profile.portability.nnmY1", "profile.portability.nnm_y1"]) ??
      0;

    const nnmY2Maybe =
      pick(payload, ["portabilityNnmY2", "profile.portability.nnm_y2_m", "profile.portability.nnmY2", "profile.portability.nnm_y2"]) ??
      0;

    const nnmY3Maybe =
      pick(payload, ["portabilityNnmY3", "profile.portability.nnm_y3_m", "profile.portability.nnmY3", "profile.portability.nnm_y3"]) ??
      0;

    const roaBpsMaybe =
      pick(payload, ["portabilityRoaBps", "profile.portability.roa_bps", "profile.portability.roaBps"]) ?? 0;

    // New v2 prefill fields — portability score from Portability Tool
    const portabilityPctMaybe =
      pick(payload, [
        "portabilityScore",
        "portability_score",
        "profile.portability.overallPct",
        "profile.portability.portability_pct",
      ]) ?? 0;

    const email = cleanLower(emailRaw, 180);
    const fullName = cleanStr(fullNameRaw, 180);
    const location = cleanStr(locationRaw, 180);
    const market = cleanStr(marketRaw, 120);
    const bank = cleanStr(bankRaw, 180);
    const role = cleanStr(roleRaw, 180);
    const currency = cleanStr(currencyRaw, 10);

    const patch: Partial<Inputs> = {};

    if (!i.candidate_email && email && looksLikeEmail(email)) patch.candidate_email = email;
    if (!i.candidate_name && fullName) patch.candidate_name = fullName;

    if ((i.candidate_location === "" || i.candidate_location === "— Select —") && location) {
      patch.candidate_location = location;
    }

    if ((!i.current_market || i.current_market === "— Select —") && market) patch.current_market = market;
    if (!i.current_employer && bank) patch.current_employer = bank;

    if ((i.current_role === "" || i.current_role === "Relationship Manager") && role) patch.current_role = role;

    if ((i.currency === "" || i.currency === "CHF") && currency) patch.currency = currency;

    if (n(i.current_assets_m) === 0) patch.current_assets_m = toMillions(aumMaybe);

    if (n(i.nnm_y1_m) === 0) patch.nnm_y1_m = toMillions(nnmY1Maybe);
    if (n(i.nnm_y2_m) === 0) patch.nnm_y2_m = toMillions(nnmY2Maybe);
    if (n(i.nnm_y3_m) === 0) patch.nnm_y3_m = toMillions(nnmY3Maybe);

    const roaPct = n(roaBpsMaybe) ? Math.round((n(roaBpsMaybe) / 100) * 100) / 100 : 0;
    if (!n(i.roa_y1) && roaPct) patch.roa_y1 = roaPct;
    if (!n(i.roa_y2) && roaPct) patch.roa_y2 = roaPct;
    if (!n(i.roa_y3) && roaPct) patch.roa_y3 = roaPct;

    // Pre-fill portability_pct from Portability Tool score if available
    if (i.portability_pct === 60 && n(portabilityPctMaybe) > 0) {
      patch.portability_pct = Math.min(95, Math.max(10, Math.round(n(portabilityPctMaybe))));
    }

    set((s) => ({
      prefillApplied: true,
      i: Object.keys(patch).length ? { ...s.i, ...patch } : s.i,
    }));
  },

  resetPrefillApplied: () => set(() => ({ prefillApplied: false })),

  /* ---------------- Export bridge ---------------- */
  setExportStatus: (status, fileName = null) =>
    set((s) => ({
      i: {
        ...s.i,
        exportStatus: status,
        exportFileName: fileName,
      },
    })),

  resetExportStatus: () =>
    set((s) => ({
      i: {
        ...s.i,
        exportStatus: "idle",
        exportFileName: null,
      },
    })),

  getReadiness: () => readinessFromScore(get().i.score),

  /* ---------------- Prospects ---------------- */
  resetProspectForm: () => set((s) => ({ i: { ...s.i, ...defaultProspectDraft } })),

  addProspect: () => {
    const { p_name, p_source, p_wealth_m, p_best_nnm_m, p_worst_nnm_m, prospects } = get().i;
    const newRow: Prospect = {
      name: (p_name || "").trim(),
      source: p_source,
      wealth_m: n(p_wealth_m),
      best_nnm_m: n(p_best_nnm_m),
      worst_nnm_m: n(p_worst_nnm_m),
    };
    set((s) => ({
      i: { ...s.i, prospects: [...prospects, newRow], ...defaultProspectDraft },
    }));
  },

  startEditProspect: (index: number) => {
    const row = get().i.prospects[index];
    if (!row) return;
    set((s) => ({
      i: {
        ...s.i,
        p_name: row.name,
        p_source: row.source,
        p_wealth_m: row.wealth_m,
        p_best_nnm_m: row.best_nnm_m,
        p_worst_nnm_m: row.worst_nnm_m,
        edit_index: index,
      },
    }));
  },

  updateProspect: () => {
    const { edit_index, prospects, p_name, p_source, p_wealth_m, p_best_nnm_m, p_worst_nnm_m } = get().i;
    if (edit_index < 0 || edit_index >= prospects.length) return;
    const updated: Prospect = {
      name: (p_name || "").trim(),
      source: p_source,
      wealth_m: n(p_wealth_m),
      best_nnm_m: n(p_best_nnm_m),
      worst_nnm_m: n(p_worst_nnm_m),
    };
    const next = prospects.slice();
    next[edit_index] = updated;
    set((s) => ({ i: { ...s.i, prospects: next, ...defaultProspectDraft } }));
  },

  deleteProspect: (index: number) =>
    set((s) => {
      const next = s.i.prospects.slice();
      if (index >= 0 && index < next.length) next.splice(index, 1);
      return {
        i: {
          ...s.i,
          prospects: next,
          ...(s.i.edit_index === index ? defaultProspectDraft : {}),
        },
      };
    }),

  cancelEditProspect: () => set((s) => ({ i: { ...s.i, ...defaultProspectDraft } })),

  importProspects: (rows: Prospect[]) =>
    set((s) => ({
      i: {
        ...s.i,
        prospects: [...s.i.prospects, ...rows],
      },
    })),
}));
