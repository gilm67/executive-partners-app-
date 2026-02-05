// components/portability/Section1Profile.tsx
'use client';

import { usePortability } from './store';

const MARKETS = [
  'CH - Switzerland',
  'UK - United Kingdom',
  'UAE - Dubai',
  'SG - Singapore',
  'HK - Hong Kong',
  'LU - Luxembourg',
  'US - United States',
];

export default function Section1Profile() {
  const state = usePortability();

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          1️⃣ Basic Profile & Market Context
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-white/90 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={state.candidate_name}
              onChange={(e) => state.set({ candidate_name: e.target.value })}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-1">
              Email
            </label>
            <input
              type="email"
              value={state.candidate_email}
              onChange={(e) => state.set({ candidate_email: e.target.value })}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-1">
              Current Bank
            </label>
            <input
              type="text"
              value={state.current_bank}
              onChange={(e) => state.set({ current_bank: e.target.value })}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white"
              placeholder="UBS, Credit Suisse, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-1">
              Current Role
            </label>
            <input
              type="text"
              value={state.current_role}
              onChange={(e) => state.set({ current_role: e.target.value })}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white"
              placeholder="Senior Relationship Manager"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-1">
              Years in Private Banking
            </label>
            <input
              type="number"
              min="0"
              value={state.years_experience || ''}
              onChange={(e) => state.set({ years_experience: Number(e.target.value) })}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-1">
              Primary Market
            </label>
            <select
              value={state.current_market}
              onChange={(e) => state.set({ current_market: e.target.value })}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white"
            >
              {MARKETS.map((m) => (
                <option key={m} value={m.split(' - ')[0]}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}