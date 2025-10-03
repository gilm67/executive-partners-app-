"use client";

import { useState } from "react";

export type FormValues = {
  market?: string;
  aum?: number;
  nnmY1?: number;
  nnmY2?: number;
  nnmY3?: number;
};

export default function PortabilityForm({
  onSubmit,
  disabled,
}: {
  onSubmit: (values: FormValues) => void | Promise<void>;
  disabled?: boolean;
}) {
  const [values, setValues] = useState<FormValues>({
    market: "CH Onshore",
    aum: 0,
    nnmY1: 0,
    nnmY2: 0,
    nnmY3: 0,
  });

  return (
    <form
      className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!disabled) await onSubmit(values);
      }}
    >
      <label className="text-sm">
        <span className="block text-white/70 mb-1">Market</span>
        <select
          className="w-full rounded-lg bg-neutral-900 border border-white/10 px-3 py-2"
          value={values.market}
          onChange={(e) => setValues((v) => ({ ...v, market: e.target.value }))}
          disabled={disabled}
        >
          <option>CH Onshore</option>
          <option>MEA</option>
          <option>UK</option>
          <option>US</option>
          <option>APAC</option>
        </select>
      </label>

      {[
        ["AUM (M)", "aum"],
        ["NNM Year 1 (M)", "nnmY1"],
        ["NNM Year 2 (M)", "nnmY2"],
        ["NNM Year 3 (M)", "nnmY3"],
      ].map(([label, key]) => (
        <label key={key} className="text-sm">
          <span className="block text-white/70 mb-1">{label}</span>
          <input
            type="number"
            step="0.1"
            className="w-full rounded-lg bg-neutral-900 border border-white/10 px-3 py-2"
            value={(values as any)[key] ?? 0}
            onChange={(e) =>
              setValues((v) => ({ ...v, [key]: parseFloat(e.target.value || "0") }))
            }
            disabled={disabled}
          />
        </label>
      ))}

      <button
        type="submit"
        disabled={disabled}
        className="rounded-xl bg-white/90 text-black font-semibold px-4 py-2 hover:bg-white disabled:opacity-50"
      >
        Calculate Portability
      </button>
    </form>
  );
}