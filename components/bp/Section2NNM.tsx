'use client';

import { useMemo, useEffect, useRef, useState } from 'react';
import { useBP } from './store';

export default function Section2NNM() {
  const { i, set } = useBP();

  const bestProspectsSum = useMemo(
    () => (i.prospects || []).reduce((acc, p) => acc + (Number(p.best_nnm_m) || 0), 0),
    [i.prospects]
  );

  const totalNNM3Y =
    (Number(i.nnm_y1_m) || 0) +
    (Number(i.nnm_y2_m) || 0) +
    (Number(i.nnm_y3_m) || 0);

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">2️⃣ Net New Money (3Y)</h2>
      <p className="text-white/70">
        Enter NNM projections (values in <strong>M CHF</strong>) and projected client counts.
      </p>

      <div className="grid md:grid-cols-3 gap-4">
        <Field label="NNM Year 1 (M CHF)">
          <NumberInput
            value={i.nnm_y1_m ?? ''}          {/* <-- coalesce */}
            step={0.1}
            placeholder="e.g. 25"
            onChange={(v) => set({ nnm_y1_m: v })}
          />
        </Field>
        <Field label="NNM Year 2 (M CHF)">
          <NumberInput
            value={i.nnm_y2_m ?? ''}          {/* <-- coalesce */}
            step={0.1}
            placeholder="e.g. 35"
            onChange={(v) => set({ nnm_y2_m: v })}
          />
        </Field>
        <Field label="NNM Year 3 (M CHF)">
          <NumberInput
            value={i.nnm_y3_m ?? ''}          {/* <-- coalesce */}
            step={0.1}
            placeholder="e.g. 45"
            onChange={(v) => set({ nnm_y3_m: v })}
          />
        </Field>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Field label="Projected Clients Year 1">
          <IntInput
            value={i.proj_clients_y1 ?? ''}    {/* <-- coalesce */}
            placeholder="e.g. 10"
            onChange={(v) => set({ proj_clients_y1: v })}
          />
        </Field>
        <Field label="Projected Clients Year 2">
          <IntInput
            value={i.proj_clients_y2 ?? ''}    {/* <-- coalesce */}
            placeholder="e.g. 15"
            onChange={(v) => set({ proj_clients_y2: v })}
          />
        </Field>
        <Field label="Projected Clients Year 3">
          <IntInput
            value={i.proj_clients_y3 ?? ''}    {/* <-- coalesce */}
            placeholder="e.g. 18"
            onChange={(v) => set({ proj_clients_y3: v })}
          />
        </Field>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/80 flex flex-wrap gap-4">
        <span>
          <span className="text-white/60">3Y NNM Total:</span>{' '}
          <strong className="text-white">{totalNNM3Y.toFixed(1)} M</strong>
        </span>
        <span>•</span>
        <span>
          <span className="text-white/60">Prospects (Best) Sum:</span>{' '}
          <strong className="text-white">{bestProspectsSum.toFixed(1)} M</strong>
        </span>
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

/** Friendly decimal input */
function NumberInput({
  value,
  step = 0.1,
  placeholder,
  onChange
}: {
  value: number | string | undefined;    // <-- allow undefined safely
  step?: number;
  placeholder?: string;
  onChange: (v: number) => void;
}) {
  const toText = (v: number | string | undefined | null) =>
    v === 0 || v === '0' || v === undefined || v === null ? '' : String(v);

  const [text, setText] = useState<string>(toText(value));
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setText(toText(value));
  }, [value]);

  const commit = () => {
    const raw = text.trim();
    if (raw === '' || raw === '-' || raw === '.' || raw === '-.') {
      onChange(0);
      setText('');
      return;
    }
    const n = Number(raw);
    onChange(Number.isFinite(n) ? n : 0);
    setText(Number.isFinite(n) ? String(n) : '');
  };

  return (
    <input
      ref={ref}
      type="text"
      inputMode="decimal"
      placeholder={placeholder}
      className="w-full bg-transparent outline-none"
      value={text}
      onChange={(e) => {
        const v = e.target.value;
        if (/^-?\d*([.]\d*)?$/.test(v) || v === '') setText(v);
      }}
      onFocus={(e) => e.currentTarget.select()}
      onBlur={commit}
      onWheel={(e) => (e.currentTarget as HTMLInputElement).blur()}
    />
  );
}

/** Friendly integer input (>=0) */
function IntInput({
  value,
  placeholder,
  onChange
}: {
  value: number | string | undefined;     // <-- allow undefined safely
  placeholder?: string;
  onChange: (v: number) => void;
}) {
  const toText = (v: number | string | undefined | null) =>
    v === 0 || v === '0' || v === undefined || v === null ? '' : String(v);

  const [text, setText] = useState<string>(toText(value));

  useEffect(() => {
    setText(toText(value));
  }, [value]);

  const commit = () => {
    const raw = text.trim();
    if (raw === '') {
      onChange(0);
      setText('');
      return;
    }
    let n = Math.floor(Number(raw));
    if (!Number.isFinite(n)) n = 0;
    if (n < 0) n = 0;
    onChange(n);
    setText(String(n));
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      placeholder={placeholder}
      className="w-full bg-transparent outline-none"
      value={text}
      onChange={(e) => {
        const v = e.target.value;
        if (/^\d*$/.test(v) || v === '') setText(v);
      }}
      onFocus={(e) => e.currentTarget.select()}
      onBlur={commit}
      onWheel={(e) => (e.currentTarget as HTMLInputElement).blur()}
    />
  );
}

function deltaClass(delta: number) {
  return delta >= 0 ? 'text-emerald-300' : 'text-rose-300';
}