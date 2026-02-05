// components/portability/Section2Book.tsx
'use client';

import { usePortability } from './store';
import { useEffect } from 'react';

export default function Section2Book() {
  const state = usePortability();

  // Auto-calculate avg client size
  useEffect(() => {
    if (state.total_aum_m > 0 && state.number_clients > 0) {
      const avg = state.total_aum_m / state.number_clients;
      state.set({ avg_client_size_m: Math.round(avg * 10) / 10 });
    }
  }, [state.total_aum_m, state.number_clients]);

  // Auto-calculate self-acquired percentage
  useEffect(() => {
    const self = Math.max(0, 100 - state.inherited_book_pct);
    state.set({ self_acquired_pct: self });
  }, [state.inherited_book_pct]);

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          2️⃣ Book Composition & Quality
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Total AUM */}
          <div>
            <label className="block text-sm font-medium text-white/90 mb-1">
              Total AUM (millions)
            </label>
            <input
              type="number"
              min="0"
              step="10"
              value={state.total_aum_m || ''}
              onChange={(e) => state.set({ total_aum_m: Number(e.target.value) })}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white"
              placeholder="250"
            />
          </div>

          {/* Number of Clients */}
          <div>
            <label className="block text-sm font-medium text-white/90 mb-1">
              Number of Clients
            </label>
            <input
              type="number"
              min="0"
              value={state.number_clients || ''}
              onChange={(e) => state.set({ number_clients: Number(e.target.value) })}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white"
              placeholder="40"
            />
          </div>

          {/* Average Client Size (auto-calculated) */}
          <div>
            <label className="block text-sm font-medium text-white/90 mb-1">
              Avg Client Size (millions) - Auto-calculated
            </label>
            <input
              type="text"
              value={state.avg_client_size_m.toFixed(1)}
              disabled
              className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white/60 cursor-not-allowed"
            />
          </div>

          {/* Inherited Book % */}
          <div>
            <label className="block text-sm font-medium text-white/90 mb-1">
              Inherited Book (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={state.inherited_book_pct || ''}
              onChange={(e) => state.set({ inherited_book_pct: Number(e.target.value) })}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white"
              placeholder="30"
            />
            <div className="mt-1 text-xs text-white/60">
              Self-acquired: {state.self_acquired_pct}%
            </div>
          </div>

          {/* Top 3 Concentration */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-white/90 mb-1">
              Top 3 Clients Concentration (% of total AUM)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={state.top_3_concentration_pct || ''}
              onChange={(e) => state.set({ top_3_concentration_pct: Number(e.target.value) })}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white"
              placeholder="45"
            />
            <div className="mt-1 text-xs text-white/60">
              Lower is better. Target: &lt;45% for strong portability
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}