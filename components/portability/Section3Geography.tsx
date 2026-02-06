// components/portability/Section3Geography.tsx
"use client";

import { usePortability } from "./store";

const BOOKING_CENTRES = [
  "Geneva",
  "Zurich",
  "London",
  "Luxembourg",
  "Singapore",
  "Hong Kong",
  "Dubai",
  "New York",
  "Miami",
  "Monaco",
  "Bahamas",
  "Cayman Islands",
  "Paris",
  "Madrid",
  "Milan",
  "Lisbon",
];

const PRODUCTS = [
  "Advisory",
  "Discretionary Portfolio Management (DPM)",
  "Lombard Lending",
  "Mortgage Lending",
  "Structured Products",
  "Private Equity",
  "Hedge Funds",
  "Real Estate",
];

export default function Section3Geography() {
  // ✅ Select only needed slices (BP-style)
  const booking_centres = usePortability((s) => s.booking_centres);
  const cross_border_licenses = usePortability((s) => s.cross_border_licenses);
  const primary_products = usePortability((s) => s.primary_products);
  const advisory_aum_pct = usePortability((s) => s.advisory_aum_pct);
  const dpm_aum_pct = usePortability((s) => s.dpm_aum_pct);
  const lending_exposure_m = usePortability((s) => s.lending_exposure_m);
  const alternatives_aum_pct = usePortability((s) => s.alternatives_aum_pct);
  const set = usePortability((s) => s.set);

  const toggleBookingCentre = (centre: string) => {
    const current = booking_centres ?? [];
    set({
      booking_centres: current.includes(centre)
        ? current.filter((c) => c !== centre)
        : [...current, centre],
    });
  };

  const toggleProduct = (product: string) => {
    const current = primary_products ?? [];
    set({
      primary_products: current.includes(product)
        ? current.filter((p) => p !== product)
        : [...current, product],
    });
  };

  return (
    <section className="space-y-6">
      {/* ✅ BP-style card */}
      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 ring-1 ring-white/10">
        <h2 className="mb-3 text-lg md:text-xl font-semibold text-white">
          3️⃣ Geography & Product Coverage
        </h2>

        {/* Booking Centres */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-white/90">
            Booking Centres (select all that apply)
          </label>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {BOOKING_CENTRES.map((centre) => {
              const active = booking_centres.includes(centre);
              return (
                <button
                  key={centre}
                  type="button"
                  onClick={() => toggleBookingCentre(centre)}
                  className={`rounded-xl px-3 py-2 text-sm transition ${
                    active
                      ? "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/60"
                      : "bg-white/5 text-white/80 ring-1 ring-white/15 hover:bg-white/10"
                  }`}
                >
                  {centre}
                </button>
              );
            })}
          </div>

          <div className="mt-2 text-xs text-white/60">
            Selected: {booking_centres.length} centre(s)
          </div>
        </div>

        {/* Cross-border Licenses */}
        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-white/90">
            Cross-Border Licenses (0 = None, 3 = Extensive)
          </label>

          <input
            type="range"
            min={0}
            max={3}
            step={1}
            value={cross_border_licenses}
            onChange={(e) => set({ cross_border_licenses: Number(e.target.value) })}
            className="w-full accent-emerald-500"
          />

          <div className="mt-1 text-sm text-emerald-300">
            Current: {cross_border_licenses} —{" "}
            {
              [
                "None / Onshore only",
                "Limited outbound",
                "Multi-jurisdiction",
                "Robust multi-jurisdiction",
              ][cross_border_licenses]
            }
          </div>
        </div>

        {/* Primary Products */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-white/90">
            Primary Products & Services
          </label>

          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {PRODUCTS.map((product) => {
              const active = primary_products.includes(product);
              return (
                <button
                  key={product}
                  type="button"
                  onClick={() => toggleProduct(product)}
                  className={`rounded-xl px-3 py-2 text-left text-sm transition ${
                    active
                      ? "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/60"
                      : "bg-white/5 text-white/80 ring-1 ring-white/15 hover:bg-white/10"
                  }`}
                >
                  {product}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Mix Breakdown */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-white/90">
              Advisory AUM (%)
            </label>
            <input
              type="number"
              min={0}
              max={100}
              value={advisory_aum_pct || ""}
              onChange={(e) => set({ advisory_aum_pct: Number(e.target.value) })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/40"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-white/90">
              DPM AUM (%)
            </label>
            <input
              type="number"
              min={0}
              max={100}
              value={dpm_aum_pct || ""}
              onChange={(e) => set({ dpm_aum_pct: Number(e.target.value) })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/40"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-white/90">
              Lending Exposure (millions)
            </label>
            <input
              type="number"
              min={0}
              value={lending_exposure_m || ""}
              onChange={(e) => set({ lending_exposure_m: Number(e.target.value) })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/40"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-white/90">
              Alternatives AUM (%)
            </label>
            <input
              type="number"
              min={0}
              max={100}
              value={alternatives_aum_pct || ""}
              onChange={(e) => set({ alternatives_aum_pct: Number(e.target.value) })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/40"
            />
          </div>
        </div>
      </div>
    </section>
  );
}