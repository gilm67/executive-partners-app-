// components/bp/types.ts

// Prospect rows can come from UI or CSV with table-style headers.
// Support both shapes to avoid runtime/type mismatches.
export type Prospect = {
  // internal (camel) shape
  name?: string;
  source?: 'Self Acquired' | 'Inherited' | 'Finder';
  wealth_m?: number;
  best_nnm_m?: number;
  worst_nnm_m?: number;

  // table/CSV shape
  Name?: string;
  Source?: 'Self Acquired' | 'Inherited' | 'Finder';
  'Wealth (M)'?: number;
  'Best NNM (M)'?: number;
  'Worst NNM (M)'?: number;
};

export type CandidateInputs = {
  // Basic info
  candidate_name?: string;
  candidate_email?: string;
  years_experience?: number;
  inherited_book_pct?: number;
  current_role?: string;
  candidate_location?: string;
  current_employer?: string;
  current_market?: string;
  currency?: 'CHF' | 'USD' | 'EUR' | 'AED' | 'SGD' | 'HKD';

  // Comp
  base_salary?: number;
  last_bonus?: number;

  // Current book
  current_number_clients?: number;
  current_assets_mchf?: number;

  // NNM projections (M CHF)
  nnm_y1_m?: number;
  nnm_y2_m?: number;
  nnm_y3_m?: number;

  // Projected clients
  proj_clients_y1?: number;
  proj_clients_y2?: number;
  proj_clients_y3?: number;

  // ROA (%) — canonical fields
  roa_y1_pct?: number;
  roa_y2_pct?: number;
  roa_y3_pct?: number;

  // --- Back-compat (deprecated): allow old code like i.roa_y1 ---
  roa_y1?: number;
  roa_y2?: number;
  roa_y3?: number;

  // Analysis settings
  target_segment?: 'HNWI' | 'UHNWI';
  tolerance_pct?: number;

  // Prospects list
  prospects?: Prospect[];
};

// Handy alias for Zustand `set` patches
export type CandidatePatch = Partial<CandidateInputs>;

/* ---------------- Helpers ---------------- */

// Prefer the *_pct fields; fall back to legacy *_y fields.
export const getROA = (i: CandidateInputs, year: 1 | 2 | 3): number => {
  const pct =
    year === 1 ? i.roa_y1_pct :
    year === 2 ? i.roa_y2_pct :
    i.roa_y3_pct;

  const legacy =
    year === 1 ? i.roa_y1 :
    year === 2 ? i.roa_y2 :
    i.roa_y3;

  const n = Number(pct ?? legacy);
  return Number.isFinite(n) ? n : 0;
};

// Prospect accessors that work for both shapes
export const getProspectBestNNM = (p: Prospect): number =>
  Number.isFinite(Number(p.best_nnm_m ?? p['Best NNM (M)']))
    ? Number(p.best_nnm_m ?? p['Best NNM (M)'])
    : 0;

export const getProspectWealth = (p: Prospect): number =>
  Number.isFinite(Number(p.wealth_m ?? p['Wealth (M)']))
    ? Number(p.wealth_m ?? p['Wealth (M)'])
    : 0;