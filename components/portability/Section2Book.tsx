// components/portability/Section2Book.tsx
"use client";

import { useEffect } from "react";
import { usePortability } from "./store";

export default function Section2Book() {
  // ✅ Select only what we need (BP-style, avoids noisy rerenders)
  const total_aum_m = usePortability((s) => s.total_aum_m);
  const number_clients = usePortability((s) => s.number_clients);
  const avg_client_size_m = usePortability((s) => s.avg_client_size_m);
  const inherited_book_pct = usePortability((s) => s.inherited_book_pct);
  const self_acquired_pct = usePortability((s) => s.self_acquired_pct);
  const top_3_concentration_pct = usePortability((s) => s.top_3_concentration_pct);
  const set = usePortability((s) => s.set);

  // ✅ Auto-calculate avg client size (guarded)
  useEffect(() => {
    if (total_aum_m > 0 && number_clients > 0) {
      const avg = Math.round((total_aum_m / number_clients) * 10) / 10;
      if (avg !== avg_client_size_m) {
        set({ avg_client_size_m: avg });
      }
    }
  }, [total_aum_m, number_clients, avg_client_size_m, set]);

  // ✅ Auto-calculate self-acquired percentage (guarded)
  useEffect(() => {
    const self = Math.max(0, 100 - inherited_book_pct);
    if (self !== self_acquired_pct) {
      set({ self_acquired_pct: self });
    }
  }, [inherited_book_pct, self_acquired_pct, set]);

  return (
    <section className="space-y-6">
      {/* ✅ BP-style card */}
      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 ring-1 ring-white/10">
        <h2 className="mb-3 text-lg md:text-xl font-semibold text-white">
          2️⃣ Book Composition & Quality
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Total AUM */}
          <div>
            <label className="mb-1 block text-sm font-medium text-white/90">
              Total AUM (millions)
            </label>
            <input
              type="number"
              min={0}
              step={10}
              value={total_aum_m || ""}
              onChange={(e) => set({ total_aum_m: Number(e.target.value) })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/40"
              placeholder="250"
            />
          </div>

          {/* Number of Clients */}
          <div>
            <label className="mb-1 block text-sm font-medium text-white/90">
              Number of Clients
            </label>
            <input
              type="number"
              min={0}
              value={number_clients || ""}
              onChange={(e) => set({ number_clients: Number(e.target.value) })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/40"
              placeholder="40"
            />
          </div>

          {/* Average Client Size (auto-calculated) */}
          <div>
            <label className="mb-1 block text-sm font-medium text-white/90">
              Avg Client Size (millions)
            </label>
            <input
              type="text"
              value={avg_client_size_m ? avg_client_size_m.toFixed(1) : ""}
              disabled
              className="w-full cursor-not-allowed rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-white/60"
            />
            <div className="mt-1 text-xs text-white/60">
              Auto-calculated
            </div>
          </div>

          {/* Inherited Book % */}
          <div>
            <label className="mb-1 block text-sm font-medium text-white/90">
              Inherited Book (%)
            </label>
            <input
              type="number"
              min={0}
              max={100}
              value={inherited_book_pct || ""}
              onChange={(e) => set({ inherited_book_pct: Number(e.target.value) })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/40"
              placeholder="30"
            />
            <div className="mt-1 text-xs text-white/60">
              Self-acquired: {self_acquired_pct}%
            </div>
          </div>

          {/* Top 3 Concentration */}
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-white/90">
              Top 3 Clients Concentration (% of total AUM)
            </label>
            <input
              type="number"
              min={0}
              max={100}
              value={top_3_concentration_pct || ""}
              onChange={(e) => set({ top_3_concentration_pct: Number(e.target.value) })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/40"
              placeholder="45"
            />
            <div className="mt-1 text-xs text-white/60">
              Lower is better. Target: &lt;45% for strong portability.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}