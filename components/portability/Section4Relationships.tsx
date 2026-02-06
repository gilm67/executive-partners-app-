// components/portability/Section4Relationships.tsx
"use client";

import { usePortability } from "./store";

export default function Section4Relationships() {
  // ✅ Select only needed slices (BP-style, avoids unnecessary re-renders)
  const avg_relationship_years = usePortability((s) => s.avg_relationship_years);
  const clients_known_personally_pct = usePortability((s) => s.clients_known_personally_pct);
  const multi_generational_pct = usePortability((s) => s.multi_generational_pct);
  const client_referral_rate_pct = usePortability((s) => s.client_referral_rate_pct);
  const kyc_portability = usePortability((s) => s.kyc_portability);
  const set = usePortability((s) => s.set);

  return (
    <section className="space-y-6">
      {/* ✅ BP-style card */}
      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 ring-1 ring-white/10">
        <h2 className="mb-3 text-lg md:text-xl font-semibold text-white">
          4️⃣ Client Relationships & Dependencies
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Avg Relationship Length */}
          <div>
            <label className="mb-1 block text-sm font-medium text-white/90">
              Avg Relationship Length (years)
            </label>
            <input
              type="number"
              min={0}
              step={0.5}
              value={avg_relationship_years || ""}
              onChange={(e) => set({ avg_relationship_years: Number(e.target.value) })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/40"
              placeholder="8.5"
            />
            <div className="mt-1 text-xs text-white/60">
              Longer relationships = stronger portability
            </div>
          </div>

          {/* Clients Known Personally */}
          <div>
            <label className="mb-1 block text-sm font-medium text-white/90">
              Clients Known Personally (%)
            </label>
            <input
              type="number"
              min={0}
              max={100}
              value={clients_known_personally_pct || ""}
              onChange={(e) => set({ clients_known_personally_pct: Number(e.target.value) })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/40"
              placeholder="80"
            />
            <div className="mt-1 text-xs text-white/60">
              Personal relationships increase transfer likelihood
            </div>
          </div>

          {/* Multi-Generational Relationships */}
          <div>
            <label className="mb-1 block text-sm font-medium text-white/90">
              Multi-Generational Relationships (%)
            </label>
            <input
              type="number"
              min={0}
              max={100}
              value={multi_generational_pct || ""}
              onChange={(e) => set({ multi_generational_pct: Number(e.target.value) })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/40"
              placeholder="40"
            />
            <div className="mt-1 text-xs text-white/60">
              Serving multiple generations strengthens loyalty
            </div>
          </div>

          {/* Client Referral Rate */}
          <div>
            <label className="mb-1 block text-sm font-medium text-white/90">
              Annual Client Referral Rate (%)
            </label>
            <input
              type="number"
              min={0}
              max={100}
              value={client_referral_rate_pct || ""}
              onChange={(e) => set({ client_referral_rate_pct: Number(e.target.value) })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/40"
              placeholder="15"
            />
            <div className="mt-1 text-xs text-white/60">
              High referral rate indicates strong trust
            </div>
          </div>

          {/* KYC / Compliance Portability */}
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-white/90">
              KYC / Compliance Portability (0 = None, 3 = Full reuse)
            </label>
            <input
              type="range"
              min={0}
              max={3}
              step={1}
              value={kyc_portability}
              onChange={(e) => set({ kyc_portability: Number(e.target.value) })}
              className="w-full accent-emerald-500"
            />
            <div className="mt-1 text-sm text-emerald-300">
              Current: {kyc_portability} —{" "}
              {["No reuse", "Partial reuse", "Good reuse", "Near full reuse"][kyc_portability]}
            </div>
            <div className="mt-1 text-xs text-white/60">
              CRS / FATCA / MiFID documentation reusability across platforms
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}