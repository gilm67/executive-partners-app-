export type Prospect = {
  Name: string;
  Source: 'Self Acquired' | 'Inherited' | 'Finder';
  'Wealth (M)': number;
  'Best NNM (M)': number;
  'Worst NNM (M)': number;
};
export type CandidateInputs = {
  candidate_name: string;
  candidate_email: string;
  years_experience: number;
  inherited_book_pct: number;
  current_role: string;
  candidate_location: string;
  current_employer: string;
  current_market: string;
  currency: 'CHF'|'USD'|'EUR'|'AED'|'SGD'|'HKD';
  base_salary: number;
  last_bonus: number;
  current_number_clients: number;
  current_assets_mchf: number;

  nnm_y1_m: number;
  nnm_y2_m: number;
  nnm_y3_m: number;

  proj_clients_y1: number;
  proj_clients_y2: number;
  proj_clients_y3: number;

  roa_y1_pct: number;
  roa_y2_pct: number;
  roa_y3_pct: number;

  target_segment: 'HNWI' | 'UHNWI';
  tolerance_pct: number;
};
