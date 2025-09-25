'use client';

import { useBP } from './store';

/* ---------- Helpers ---------- */
function IntInput({
  value,
  onChange,
  placeholder,
}: {
  value: number | string | undefined;
  onChange: (v: number) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="number"
      inputMode="numeric"
      step={1}
      className="w-full bg-transparent outline-none"
      placeholder={placeholder}
      value={value ?? ''}
      onChange={(e) => onChange(Math.max(0, Math.floor(Number(e.target.value) || 0)))}
    />
  );
}

function NumberInput({
  value,
  onChange,
  step = 0.1,
  placeholder,
}: {
  value: number | string | undefined;
  onChange: (v: number) => void;
  step?: number;
  placeholder?: string;
}) {
  return (
    <input
      type="number"
      inputMode="decimal"
      step={step}
      className="w-full bg-transparent outline-none"
      placeholder={placeholder}
      value={value ?? ''}
      onChange={(e) => onChange(Number(e.target.value) || 0)}
    />
  );
}

function MoneyInput({
  value,
  onChange,
  placeholder,
}: {
  value: number | string | undefined;
  onChange: (v: number) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2">
      <span className="text-sm text-white/60 mr-2">CHF</span>
      <input
        type="number"
        inputMode="decimal"
        className="w-full bg-transparent outline-none"
        placeholder={placeholder}
        value={value ?? ''}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
      />
    </div>
  );
}

/* ---------- Section 1 ---------- */
export default function Section1Basic() {
  const { i, set } = useBP();

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">1️⃣ Basic Candidate Information</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <label className="block text-sm text-white/80 space-y-1">
          <span className="font-medium text-white">Years of Experience *</span>
          <IntInput
            value={i.years_exp}
            onChange={(v) => set({ years_exp: v })}
            placeholder="e.g. 12"
          />
        </label>

        <label className="block text-sm text-white/80 space-y-1">
          <span className="font-medium text-white">Inherited Book (% of AUM) *</span>
          <IntInput
            value={i.inherited_pct}
            onChange={(v) => set({ inherited_pct: v })}
            placeholder="%"
          />
        </label>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <label className="block text-sm text-white/80 space-y-1">
          <span className="font-medium text-white">Current Base Salary (CHF) *</span>
          <MoneyInput
            value={i.base_salary}
            onChange={(v) => set({ base_salary: v })}
            placeholder="Base salary"
          />
        </label>

        <label className="block text-sm text-white/80 space-y-1">
          <span className="font-medium text-white">Last Bonus (CHF) *</span>
          <MoneyInput
            value={i.last_bonus}
            onChange={(v) => set({ last_bonus: v })}
            placeholder="Bonus"
          />
        </label>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <label className="block text-sm text-white/80 space-y-1">
          <span className="font-medium text-white">Current Number of Clients *</span>
          <IntInput
            value={i.current_clients}
            onChange={(v) => set({ current_clients: v })}
            placeholder="e.g. 35"
          />
        </label>

        <label className="block text-sm text-white/80 space-y-1">
          <span className="font-medium text-white">Current AUM (in million CHF) *</span>
          <NumberInput
            value={i.current_aum_m}
            step={0.1}
            onChange={(v) => set({ current_aum_m: v })}
            placeholder="e.g. 150"
          />
        </label>
      </div>
    </section>
  );
}