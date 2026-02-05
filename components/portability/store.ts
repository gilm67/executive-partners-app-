// components/portability/store.ts
import { create } from 'zustand';

export type PortabilityState = {
  // Section 1: Basic Profile
  candidate_name: string;
  candidate_email: string;
  years_experience: number;
  current_bank: string;
  current_role: string;
  current_market: string;
  
  // Section 2: Book Composition
  total_aum_m: number;
  number_clients: number;
  avg_client_size_m: number;
  inherited_book_pct: number;
  self_acquired_pct: number;
  top_3_concentration_pct: number;
  
  // Section 3: Geography & Products
  booking_centres: string[];
  cross_border_licenses: number;
  primary_products: string[];
  advisory_aum_pct: number;
  dpm_aum_pct: number;
  lending_exposure_m: number;
  alternatives_aum_pct: number;
  
  // Section 4: Client Relationships
  avg_relationship_years: number;
  clients_known_personally_pct: number;
  multi_generational_pct: number;
  client_referral_rate_pct: number;
  kyc_portability: number;
  
  // Section 5: Results
  score: number;
  portability_dimensions: {
    client_quality: number;
    regulatory: number;
    product_dependency: number;
    relationship_strength: number;
  };
  risk_flags: string[];
  recommendations: string[];
};

type Actions = {
  set: (partial: Partial<PortabilityState>) => void;
  reset: () => void;
};

const initialState: PortabilityState = {
  candidate_name: '',
  candidate_email: '',
  years_experience: 0,
  current_bank: '',
  current_role: '',
  current_market: 'CH',
  
  total_aum_m: 0,
  number_clients: 0,
  avg_client_size_m: 0,
  inherited_book_pct: 0,
  self_acquired_pct: 100,
  top_3_concentration_pct: 0,
  
  booking_centres: [],
  cross_border_licenses: 1,
  primary_products: [],
  advisory_aum_pct: 0,
  dpm_aum_pct: 0,
  lending_exposure_m: 0,
  alternatives_aum_pct: 0,
  
  avg_relationship_years: 0,
  clients_known_personally_pct: 0,
  multi_generational_pct: 0,
  client_referral_rate_pct: 0,
  kyc_portability: 1,
  
  score: 0,
  portability_dimensions: {
    client_quality: 0,
    regulatory: 0,
    product_dependency: 0,
    relationship_strength: 0,
  },
  risk_flags: [],
  recommendations: [],
};

export const usePortability = create<PortabilityState & Actions>((set) => ({
  ...initialState,
  set: (partial) => set((state) => ({ ...state, ...partial })),
  reset: () => set(initialState),
}));