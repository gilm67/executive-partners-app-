'use client';

import { useMemo } from 'react';
import { useBP } from './store';

export default function Section2NNM() {
  const { i, set } = useBP();

  // Sum of prospects' "Best NNM (M)" for the little sanity check line
  const bestProspectsSum = useMemo(
    () => (i.prospects || []).reduce((acc, p) => acc + (Number(p.best_nnm_m) || 0), 0),
    [i.prospects]
  );

  const totalNNM3Y = (Number(i.nnm_y1_m) || 0) + (Number(i.nnm_y2_m) || 0) + (Number(i.nnm_y3_m) || 0);

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">2️⃣ Net New Money (3Y)</h2>
      <p className="text-white/70">Enter NNM projections (values in <strong>M CHF</strong>) and projected client counts.</p>

      {/* NNM rows */}
      <div className="grid md:grid-cols-3 gap-4">
        <Field label="NNM Year 1 (M CHF)">
          <NumberInput
            value={i.nnm_y1_m}
            step={0.1}
            onChange={(v) => set({ nnm_y1_m: v })}
          />
        </Field>
        <Field label="NNM Year 2 (M CHF)">
          <NumberInput
            value={i.nnm_y2_m}
            step={0.1}
            onChange={(v) => set({ nnm_y2_m: v })}
          />
        </Field>
        <Field label="NNM Year 3 (M CHF)">
          <NumberInput
            value={i.nnm_y3_m}
            step={0.1}
            onChange={(v) => set({ nnm_y3_m: v })}
          />
        </Field>
      </div>

      {/* Projected clients */}
      <div className="grid md:grid-cols-3 gap-4">
        <Field label="Projected Clients Year 1">
          <IntInput
            value={i.proj_clients_y1}
            onChange={(v) => set({ proj_clients_y1: v })}
          />
        </Field>
        <Field label="Projected Clients Year 2">
          <IntInput
            value={i.proj_clients_y2}
            onChange={(v) => set({ proj_clients_y2: v })}
          />
        </Field>
        <Field label="Projected Clients Year 3">
          <IntInput
            value={i.proj_clients_y3}
            onChange={(v) => set({ proj_clients_y3: v })}
          />
        </Field>
      </div>

      {/* Quick facts */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/80 flex flex-wrap gap-4">
        <span><span className="text-white/60">3Y NNM Total:</span> <strong className="text-white">{totalNNM3Y.toFixed(1)} M</strong></span>
        <span>•</span>
        <span><span className="text-white/60">Prospects (Best) Sum:</span> <strong className="text-white">{bestProspectsSum.toFixed(1)} M</strong></span>
        <span>•</span>
        <span>
          <span className="text-white/60">Δ vs Year-1:</span>{' '}
          <strong className={deltaClass(bestProspectsSum - (Number(i.nnm_y1_m) || 0))}>
            {(bestProspectsSum - (Number(i.nnm_y1_m) || 0)).toFixed(1)} M
          </strong>
        </span>
      </div>
    </section>
  );
}

/* ——— little building blocks ——— */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="text-sm text-white/80 space-y-1 block">
      <div className="font-medium text-white">{label}</div>
      <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
        {children}
      </div>
    </label>
  );
}

function NumberInput({
  value,
  step = 0.1,
  onChange,
}: {
  value: number | string;
  step?: number;
  onChange: (v: number) => void;
}) {
  return (
    <input
      type="number"
      inputMode="decimal"
      step={step}
      className="w-full bg-transparent outline-none"
      value={value ?? ''}
      onChange={(e) => onChange(safeNum(e.target.value))}
    />
  );
}

function IntInput({
  value,
  onChange,
}: {
  value: number | string;
  onChange: (v: number) => void;
}) {
  return (
    <input
      type="number"
      inputMode="numeric"
      step={1}
      className="w-full bg-transparent outline-none"
      value={value ?? ''}
      onChange={(e) => onChange(Math.max(0, Math.floor(safeNum(e.target.value))))}
    />
  );
}

function safeNum(v: string): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function deltaClass(delta: number) {
  return delta >= 0 ? 'text-emerald-300' : 'text-rose-300';
}
