// components/portability/Section1Profile.tsx
"use client";

import { useCallback } from "react";
import { usePortability } from "./store";

const MARKETS = [
  { code: "CH", label: "CH - Switzerland" },
  { code: "UK", label: "UK - United Kingdom" },
  { code: "UAE", label: "UAE - Dubai" },
  { code: "SG", label: "SG - Singapore" },
  { code: "HK", label: "HK - Hong Kong" },
  { code: "LU", label: "LU - Luxembourg" },
  { code: "US", label: "US - United States" },
];

export default function Section1Profile() {
  // ✅ Select only what this section needs (prevents re-render on unrelated store updates)
  const candidate_name = usePortability((s) => s.candidate_name);
  const candidate_email = usePortability((s) => s.candidate_email);
  const current_bank = usePortability((s) => s.current_bank);
  const current_role = usePortability((s) => s.current_role);
  const years_experience = usePortability((s) => s.years_experience);
  const current_market = usePortability((s) => s.current_market);
  const set = usePortability((s) => s.set);

  const onYearsChange = useCallback(
    (v: string) => {
      // Allow empty input without forcing 0 into the store
      if (v === "") {
        set({ years_experience: undefined as unknown as number });
        return;
      }
      const n = Number(v);
      set({ years_experience: Number.isFinite(n) ? n : 0 });
    },
    [set]
  );

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-4 text-xl font-semibold text-white">
          1️⃣ Basic Profile & Market Context
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-white/90">
              Full Name
            </label>
            <input
              type="text"
              value={candidate_name ?? ""}
              onChange={(e) => set({ candidate_name: e.target.value })}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white"
              placeholder="John Doe"
              autoComplete="name"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-white/90">
              Email
            </label>
            <input
              type="email"
              value={candidate_email ?? ""}
              onChange={(e) => set({ candidate_email: e.target.value })}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white"
              placeholder="john@example.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-white/90">
              Current Bank
            </label>
            <input
              type="text"
              value={current_bank ?? ""}
              onChange={(e) => set({ current_bank: e.target.value })}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white"
              placeholder="UBS, Julius Baer, Lombard Odier…"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-white/90">
              Current Role
            </label>
            <input
              type="text"
              value={current_role ?? ""}
              onChange={(e) => set({ current_role: e.target.value })}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white"
              placeholder="Senior Relationship Manager"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-white/90">
              Years in Private Banking
            </label>
            <input
              type="number"
              min={0}
              value={years_experience ?? ""}
              onChange={(e) => onYearsChange(e.target.value)}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white"
              inputMode="numeric"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-white/90">
              Primary Market
            </label>
            <select
              value={current_market ?? ""}
              onChange={(e) => set({ current_market: e.target.value })}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white"
            >
              <option value="" disabled>
                Select…
              </option>
              {MARKETS.map((m) => (
                <option key={m.code} value={m.code}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}