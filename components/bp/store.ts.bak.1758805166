'use client';
import { create } from 'zustand';

export type Prospect = {
  name: string;
  source: 'Self Acquired' | 'Inherited' | 'Finder';
  wealth_m: number;       // M CHF
  best_nnm_m: number;     // M CHF
  worst_nnm_m: number;    // M CHF
};

export type Inputs = {
  // Section 1
  candidate_name: string;
  candidate_email: string;
  years_experience: number | undefined;
  inherited_book_pct: number | undefined;
  current_role: string;
  candidate_location: string;
  current_employer: string;
  current_market: string;
  currency: string;
  base_salary: number | undefined;
  last_bonus: number | undefined;
  current_number_clients: number | undefined;
  current_assets_m: number | undefined;

  // Section 2
  nnm_y1_m: number | undefined;
  nnm_y2_m: number | undefined;
  nnm_y3_m: number | undefined;
  proj_clients_y1: number | undefined;
  proj_clients_y2: number | undefined;
  proj_clients_y3: number | undefined;

  // Section 3
  prospects: Prospect[];
  // draft fields
  p_name: string;
  p_source: Prospect['source'];
  p_wealth_m: number;
  p_best_nnm_m: number;
  p_worst_nnm_m: number;
  edit_index: number;

  // Section 5 outputs (persisted)
  score?: number;
  ai_notes?: string;
};

type BPState = {
  i: Inputs;
  set: (patch: Partial<Inputs>) => void;

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

/** Returns average ROA in % (e.g., 0.9 means 0.9%) */
export function avgROA(i: Partial<Inputs>): number {
  const r1 = n((i as any).roa_y1);
  const r2 = n((i as any).roa_y2);
  const r3 = n((i as any).roa_y3);
  return (r1 + r2 + r3) / 3;
}

/**
 * Portability score (0–100).
 * Uses your thresholds:
 * - Inherited <=20 +20; <=40 +10; else -10
 * - Book shape (clients vs AUM) +15 / +5 / -5
 * - ROA: >0.9 +10; <0.6 -5 (0.6–0.8 = neutral here)
 * - Pipeline realism (Best ≥ NNM Y1) +10
 * - Experience ≥7y +5
 * Base is 50; clamped 0..100
 */
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

/* ---------- Zustand store ---------- */
const defaultProspectDraft = {
  p_name: '',
  p_source: 'Self Acquired' as const,
  p_wealth_m: 0,
  p_best_nnm_m: 0,
  p_worst_nnm_m: 0,
  edit_index: -1,
};

export const useBP = create<BPState>((set, get) => ({
  i: {
    // Section 1 defaults (now blank)
    candidate_name: '',
    candidate_email: '',
    years_experience: undefined,
    inherited_book_pct: undefined,
    current_role: 'Relationship Manager',
    candidate_location: '— Select —',
    current_employer: '',
    current_market: 'CH Onshore',
    currency: 'CHF',
    base_salary: undefined,
    last_bonus: undefined,
    current_number_clients: undefined,
    current_assets_m: undefined,

    // Section 2 defaults (now blank)
    nnm_y1_m: undefined,
    nnm_y2_m: undefined,
    nnm_y3_m: undefined,
    proj_clients_y1: undefined,
    proj_clients_y2: undefined,
    proj_clients_y3: undefined,

    // Section 3 defaults
    prospects: [],
    ...defaultProspectDraft,

    // Section 5 outputs
    score: 0,
    ai_notes: '',
  },

  set: (patch) => set((s) => ({ i: { ...s.i, ...patch } })),

  resetProspectForm: () => set((s) => ({ i: { ...s.i, ...defaultProspectDraft } })),

  addProspect: () => {
    const { p_name, p_source, p_wealth_m, p_best_nnm_m, p_worst_nnm_m, prospects } = get().i;
    const newRow: Prospect = {
      name: (p_name || '').trim(),
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
      name: (p_name || '').trim(),
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
      return { i: { ...s.i, prospects: next, ...(s.i.edit_index === index ? defaultProspectDraft : {}) } };
    }),

  cancelEditProspect: () => set((s) => ({ i: { ...s.i, ...defaultProspectDraft } })),

  importProspects: (rows: Prospect[]) =>
    set((s) => ({ i: { ...s.i, prospects: [...s.i.prospects, ...rows] } })),
}));