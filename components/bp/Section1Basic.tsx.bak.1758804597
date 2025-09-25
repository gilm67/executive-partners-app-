'use client';

import { useBP } from './store';

/* ---------- Tiny input helpers (no default 0, nice placeholders) ---------- */
function IntInput({
  value,
  onChange,
  placeholder
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
  placeholder
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
  currencyLabel = 'CHF'
}: {
  value: number | string | undefined;
  onChange: (v: number) => void;
  placeholder?: string;
  currencyLabel?: string;
}) {
  return (
    <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2">
      <span className="text-sm text-white/60 mr-2">{currencyLabel}</span>
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
  const C = i?.currency || 'CHF';

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">1️⃣ Basic Candidate Information</h2>

      {/* Identity */}
      <div className="grid md:grid-cols-2 gap-4">
        <label className="block text-sm text-white/80 space-y-1">
          <span className="font-medium text-white">Full Name *</span>
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <input
              type="text"
              className="w-full bg-transparent outline-none"
              placeholder="e.g. Jane Doe"
              value={i.candidate_name ?? ''}
              onChange={(e) => set({ candidate_name: e.target.value })}
            />
          </div>
        </label>

        <label className="block text-sm text-white/80 space-y-1">
          <span className="font-medium text-white">Email *</span>
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <input
              type="email"
              className="w-full bg-transparent outline-none"
              placeholder="name@company.com"
              value={i.candidate_email ?? ''}
              onChange={(e) => set({ candidate_email: e.target.value })}
            />
          </div>
        </label>
      </div>

      {/* Experience / Inherited */}
      <div className="grid md:grid-cols-2 gap-4">
        <label className="block text-sm text-white/80 space-y-1">
          <span className="font-medium text-white">Years of Experience *</span>
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <IntInput
              value={i.years_experience}
              onChange={(v) => set({ years_experience: v })}
              placeholder="e.g. 12"
            />
          </div>
        </label>

        <label className="block text-sm text-white/80 space-y-1">
          <span className="font-medium text-white">Inherited Book (% of AUM) *</span>
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <IntInput
              value={i.inherited_book_pct}
              onChange={(v) => set({ inherited_book_pct: v })}
              placeholder="%"
            />
          </div>
        </label>
      </div>

      {/* Role / Location (kept as text selects — unchanged) */}
      <div className="grid md:grid-cols-2 gap-4">
        <label className="block text-sm text-white/80 space-y-1">
          <span className="font-medium text-white">Current Role</span>
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <input
              type="text"
              className="w-full bg-transparent outline-none"
              placeholder="Relationship Manager"
              value={i.current_role ?? ''}
              onChange={(e) => set({ current_role: e.target.value })}
            />
          </div>
        </label>

        <label className="block text-sm text-white/80 space-y-1">
          <span className="font-medium text-white">Location</span>
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <input
              type="text"
              className="w-full bg-transparent outline-none"
              placeholder="e.g. Geneva"
              value={i.candidate_location ?? ''}
              onChange={(e) => set({ candidate_location: e.target.value })}
            />
          </div>
        </label>
      </div>

      {/* Employer / Market */}
      <div className="grid md:grid-cols-2 gap-4">
        <label className="block text-sm text-white/80 space-y-1">
          <span className="font-medium text-white">Current Employer</span>
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <input
              type="text"
              className="w-full bg-transparent outline-none"
              placeholder="Bank name"
              value={i.current_employer ?? ''}
              onChange={(e) => set({ current_employer: e.target.value })}
            />
          </div>
        </label>

        <label className="block text-sm text-white/80 space-y-1">
          <span className="font-medium text-white">Market</span>
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <input
              type="text"
              className="w-full bg-transparent outline-none"
              placeholder="e.g. CH Onshore"
              value={i.current_market ?? ''}
              onChange={(e) => set({ current_market: e.target.value })}
            />
          </div>
        </label>
      </div>

      {/* Compensation */}
      <div className="grid md:grid-cols-2 gap-4">
        <label className="block text-sm text-white/80 space-y-1">
          <span className="font-medium text-white">Current Base Salary ({C}) *</span>
          <MoneyInput
            value={i.base_salary}
            onChange={(v) => set({ base_salary: v })}
            placeholder="e.g. 180000"
            currencyLabel={C}
          />
        </label>

        <label className="block text-sm text-white/80 space-y-1">
          <span className="font-medium text-white">Last Bonus ({C}) *</span>
          <MoneyInput
            value={i.last_bonus}
            onChange={(v) => set({ last_bonus: v })}
            placeholder="e.g. 60000"
            currencyLabel={C}
          />
        </label>
      </div>

      {/* Book snapshot */}
      <div className="grid md:grid-cols-2 gap-4">
        <label className="block text-sm text-white/80 space-y-1">
          <span className="font-medium text-white">Current Number of Clients *</span>
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <IntInput
              value={i.current_number_clients}
              onChange={(v) => set({ current_number_clients: v })}
              placeholder="e.g. 35"
            />
          </div>
        </label>

        <label className="block text-sm text-white/80 space-y-1">
          <span className="font-medium text-white">Current AUM (million {C}) *</span>
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <NumberInput
              value={i.current_assets_m}
              step={0.1}
              onChange={(v) => set({ current_assets_m: v })}
              placeholder="e.g. 220"
            />
          </div>
        </label>
      </div>
    </section>
  );
}
