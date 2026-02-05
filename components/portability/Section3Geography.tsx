// components/portability/Section3Geography.tsx
'use client';

import { usePortability } from './store';

const BOOKING_CENTRES = [
  'Geneva', 'Zurich', 'London', 'Luxembourg', 
  'Singapore', 'Hong Kong', 'Dubai', 'New York',
  'Miami', 'Monaco', 'Bahamas', 'Cayman Islands',
  'Paris', 'Madrid', 'Milan', 'Lisbon'  // Added Portugal
];

const PRODUCTS = [
  'Advisory',
  'Discretionary Portfolio Management (DPM)',
  'Lombard Lending',
  'Mortgage Lending',
  'Structured Products',
  'Private Equity',
  'Hedge Funds',
  'Real Estate',
];

export default function Section3Geography() {
  const state = usePortability();

  const toggleBookingCentre = (centre: string) => {
    const current = state.booking_centres || [];
    if (current.includes(centre)) {
      state.set({ booking_centres: current.filter(c => c !== centre) });
    } else {
      state.set({ booking_centres: [...current, centre] });
    }
  };

  const toggleProduct = (product: string) => {
    const current = state.primary_products || [];
    if (current.includes(product)) {
      state.set({ primary_products: current.filter(p => p !== product) });
    } else {
      state.set({ primary_products: [...current, product] });
    }
  };

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          3️⃣ Geography & Product Coverage
        </h2>

        {/* Booking Centres */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-white/90 mb-2">
            Booking Centres (select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {BOOKING_CENTRES.map((centre) => (
              <button
                key={centre}
                type="button"
                onClick={() => toggleBookingCentre(centre)}
                className={`rounded-lg px-3 py-2 text-sm transition ${
                  state.booking_centres.includes(centre)
                    ? 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/60'
                    : 'bg-white/5 text-white/80 ring-1 ring-white/15 hover:bg-white/10'
                }`}
              >
                {centre}
              </button>
            ))}
          </div>
          <div className="mt-2 text-xs text-white/60">
            Selected: {state.booking_centres.length} centre(s)
          </div>
        </div>

        {/* Cross-border Licenses */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-white/90 mb-1">
            Cross-Border Licenses (0 = None, 3 = Extensive)
          </label>
          <input
            type="range"
            min="0"
            max="3"
            step="1"
            value={state.cross_border_licenses}
            onChange={(e) => state.set({ cross_border_licenses: Number(e.target.value) })}
            className="w-full accent-emerald-500"
          />
          <div className="mt-1 text-sm text-emerald-300">
            Current: {state.cross_border_licenses} - {
              ['None/Onshore only', 'Limited outbound', 'Multi-jurisdiction', 'Robust multi-jurisdiction'][state.cross_border_licenses]
            }
          </div>
        </div>

        {/* Primary Products */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-white/90 mb-2">
            Primary Products & Services
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {PRODUCTS.map((product) => (
              <button
                key={product}
                type="button"
                onClick={() => toggleProduct(product)}
                className={`rounded-lg px-3 py-2 text-sm text-left transition ${
                  state.primary_products.includes(product)
                    ? 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/60'
                    : 'bg-white/5 text-white/80 ring-1 ring-white/15 hover:bg-white/10'
                }`}
              >
                {product}
              </button>
            ))}
          </div>
        </div>

        {/* Product Mix Breakdown */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-white/90 mb-1">
              Advisory AUM (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={state.advisory_aum_pct || ''}
              onChange={(e) => state.set({ advisory_aum_pct: Number(e.target.value) })}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-1">
              DPM AUM (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={state.dpm_aum_pct || ''}
              onChange={(e) => state.set({ dpm_aum_pct: Number(e.target.value) })}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-1">
              Lending Exposure (millions)
            </label>
            <input
              type="number"
              min="0"
              value={state.lending_exposure_m || ''}
              onChange={(e) => state.set({ lending_exposure_m: Number(e.target.value) })}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-1">
              Alternatives AUM (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={state.alternatives_aum_pct || ''}
              onChange={(e) => state.set({ alternatives_aum_pct: Number(e.target.value) })}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
}