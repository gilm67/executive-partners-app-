// components/portability/Section4Relationships.tsx
'use client';

import { usePortability } from './store';

export default function Section4Relationships() {
  const state = usePortability();

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          4️⃣ Client Relationships & Dependencies
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-white/90 mb-1">
              Avg Relationship Length (years)
            </label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={state.avg_relationship_years || ''}
              onChange={(e) => state.set({ avg_relationship_years: Number(e.target.value) })}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white"
              placeholder="8.5"
            />
            <div className="mt-1 text-xs text-white/60">
              Longer relationships = stronger portability
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-1">
              Clients Known Personally (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={state.clients_known_personally_pct || ''}
              onChange={(e) => state.set({ clients_known_personally_pct: Number(e.target.value) })}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white"
              placeholder="80"
            />
            <div className="mt-1 text-xs text-white/60">
              Personal relationships increase transfer likelihood
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-1">
              Multi-Generational Relationships (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={state.multi_generational_pct || ''}
              onChange={(e) => state.set({ multi_generational_pct: Number(e.target.value) })}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white"
              placeholder="40"
            />
            <div className="mt-1 text-xs text-white/60">
              Serving multiple generations strengthens loyalty
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-1">
              Annual Client Referral Rate (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={state.client_referral_rate_pct || ''}
              onChange={(e) => state.set({ client_referral_rate_pct: Number(e.target.value) })}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white"
              placeholder="15"
            />
            <div className="mt-1 text-xs text-white/60">
              High referral rate indicates strong trust
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-white/90 mb-1">
              KYC/Compliance Portability (0 = None, 3 = Full reuse)
            </label>
            <input
              type="range"
              min="0"
              max="3"
              step="1"
              value={state.kyc_portability}
              onChange={(e) => state.set({ kyc_portability: Number(e.target.value) })}
              className="w-full accent-emerald-500"
            />
            <div className="mt-1 text-sm text-emerald-300">
              Current: {state.kyc_portability} - {
                ['No reuse', 'Partial reuse', 'Good reuse', 'Near full reuse'][state.kyc_portability]
              }
            </div>
            <div className="mt-1 text-xs text-white/60">
              CRS/FATCA/MiFID documentation reusability across platforms
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
