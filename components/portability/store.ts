// components/portability/store.ts
import { create } from "zustand";

export type PortabilityDimensions = {
  client_quality: number;
  regulatory: number;
  product_dependency: number;
  relationship_strength: number;
};

export type PortabilityState = {
  // Section 1: Basic Profile
  candidate_name: string;
  candidate_email: string;
  years_experience: number | undefined; // ✅ allow empty input
  current_bank: string;
  current_role: string;
  current_market: string;

  // ✅ NEW: manual market (only used when current_market === "OTHER")
  current_market_other: string;

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
  portability_dimensions: PortabilityDimensions;
  risk_flags: string[];
  recommendations: string[];
};

type Actions = {
  /**
   * Keep name `set` to avoid changing your components.
   * This update is shallow; pass only the fields you want to change.
   */
  set: (partial: Partial<PortabilityState>) => void;
  reset: () => void;
};

function createInitialState(): PortabilityState {
  return {
    candidate_name: "",
    candidate_email: "",
    years_experience: undefined,
    current_bank: "",
    current_role: "",
    current_market: "CH",

    // ✅ NEW
    current_market_other: "",

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
}

export const usePortability = create<PortabilityState & Actions>((set) => ({
  ...createInitialState(),

  // ✅ Only create a new state object when there is an actual update
  set: (partial) =>
    set((state) => {
      // If nothing changes, return the same state reference (reduces renders)
      let changed = false;

      for (const [k, v] of Object.entries(partial)) {
        if ((state as any)[k] !== v) {
          changed = true;
          break;
        }
      }

      return changed ? { ...state, ...partial } : state;
    }),

  // ✅ Reset to a FRESH object (no shared reference)
  reset: () => set(() => createInitialState()),
}));