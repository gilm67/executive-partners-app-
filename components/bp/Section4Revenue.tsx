'use client';

import { useMemo } from 'react';
import { useBP } from './store';
import { getROA } from './types'; // ← fallback-aware ROA getter

const fmt0 = new Intl.NumberFormat('en-CH', { maximumFractionDigits: 0 });

export default function Section4Revenue() {
  const { i, set } = useBP();

  // derive all numbers exactly like Streamlit
  const m = useMemo(() => {
    const nnm1 = toNum(i.nnm_y1_m) * 1_000_000;
    const nnm2 = toNum(i.nnm_y2_m) * 1_000_000;
    const nnm3 = toNum(i.nnm_y3_m) * 1_000_000;

    // % values (use *_pct if present, otherwise legacy *_y)
    const roa1 = toNum(getROA(i, 1));
    const roa2 = toNum(getROA(i, 2));
    const roa3 = toNum(getROA(i, 3));

    const rev1 = nnm1 * (roa1 / 100);
    const rev2 = nnm2 * (roa2 / 100);
    const rev3 = nnm3 * (roa3 / 100);

    const fixed = toNum(i.base_salary) * 1.25;

    const nm1 = rev1 - fixed;
    const nm2 = rev2 - fixed;
    const nm3 = rev3 - fixed;

    const grossTotal = rev1 + rev2 + rev3;
    const totalCosts = fixed * 3;
    const nmTotal = nm1 + nm2 + nm3;

    // For tiny bar chart widths
    const maxBar = Math.max(rev1, rev2, rev3, nm1, nm2, nm3, 1);

    return { rev1, rev2, rev3, fixed, nm1, nm2, nm3, grossTotal, totalCosts, nmTotal, maxBar };
  }, [
    i.nnm_y1_m,
    i.nnm_y2_m,
    i.nnm_y3_m,
    i.roa_y1_pct, i.roa_y2_pct, i.roa_y3_pct, // watch canonical
    // also watch legacy in case store still sets them
    // @ts-ignore – legacy fields may exist at runtime
    i.roa_y1, // eslint-disable-line
    // @ts-ignore
    i.roa_y2, // eslint-disable-line
    // @ts-ignore
    i.roa_y3, // eslint-disable-line
    i.base_salary,
  ]);

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">4️⃣ Revenue, Costs &amp; Net Margin</h2>
      <p className="text-white/70">
        Set ROA% per year. Fixed cost = Base Salary × 1.25 (matches your Streamlit logic).
      </p>

      {/* ROA inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Field label="ROA % Year 1">
          <Num
            value={firstDefined(i.roa_y1_pct, /* legacy: */ (i as any).roa_y1, '')}
            onChange={(v) => set({ roa_y1_pct: v })}
          />
        </Field>
        <Field label="ROA % Year 2">
          <Num
            value={firstDefined(i.roa_y2_pct, (i as any).roa_y2, '')}
            onChange={(v) => set({ roa_y2_pct: v })}
          />
        </Field>
        <Field label="ROA % Year 3">
          <Num
            value={firstDefined(i.roa_y3_pct, (i as any).roa_y3, '')}
            onChange={(v) => set({ roa_y3_pct: v })}
          />
        </Field>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="min-w-full text-sm">
          <thead className="bg-white/5 text-white/70">
            <tr>
              <Th>Year</Th>
              <Th className="text-right">Gross Revenue (CHF)</Th>
              <Th className="text-right">Fixed Cost (CHF)</Th>
              <Th className="text-right">Net Margin (CHF)</Th>
            </tr>
          </thead>
          <tbody>
            <Row label="Year 1" rev={m.rev1} fixed={m.fixed} nm={m.nm1} />
            <Row label="Year 2" rev={m.rev2} fixed={m.fixed} nm={m.nm2} />
            <Row label="Year 3" rev={m.rev3} fixed={m.fixed} nm={m.nm3} />
            <tr className="bg-emerald-500/10 font-semibold">
              <Td>Total</Td>
              <Td className="text-right">{fmt0.format(m.grossTotal)}</Td>
              <Td className="text-right">{fmt0.format(m.totalCosts)}</Td>
              <Td className="text-right">{fmt0.format(m.nmTotal)}</Td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mini bar chart (CSS, no deps) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-white/80 mb-2">Gross Revenue</h3>
          <Bars
            items={[
              ['Year 1', m.rev1],
              ['Year 2', m.rev2],
              ['Year 3', m.rev3],
            ]}
            max={m.maxBar}
          />
        </div>
        <div>
          <h3 className="text-sm font-medium text-white/80 mb-2">Net Margin</h3>
          <Bars
            items={[
              ['Year 1', m.nm1],
              ['Year 2', m.nm2],
              ['Year 3', m.nm3],
            ]}
            max={m.maxBar}
          />
        </div>
      </div>

      {/* Quick metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
        <Metric label="Fixed Cost (each year)" value={`CHF ${fmt0.format(m.fixed)}`} />
        <Metric label="Gross Revenue (3Y)" value={`CHF ${fmt0.format(m.grossTotal)}`} />
        <Metric label="Total Costs (3Y)" value={`CHF ${fmt0.format(m.totalCosts)}`} />
        <Metric label="Net Margin (3Y)" value={`CHF ${fmt0.format(m.nmTotal)}`} />
      </div>
    </section>
  );
}

function Row({ label, rev, fixed, nm }: { label: string; rev: number; fixed: number; nm: number }) {
  return (
    <tr className="odd:bg-white/5">
      <Td>{label}</Td>
      <Td className="text-right">{fmt0.format(rev)}</Td>
      <Td className="text-right">{fmt0.format(fixed)}</Td>
      <Td className={`text-right ${nm >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
        {fmt0.format(nm)}
      </Td>
    </tr>
  );
}

function Bars({ items, max }: { items: [string, number][]; max: number }) {
  return (
    <div className="space-y-2">
      {items.map(([label, val]) => {
        const pct = Math.max(2, Math.min(100, (Math.abs(val) / max) * 100));
        const positive = val >= 0;
        return (
          <div key={label} className="flex items-center gap-2">
            <div className="w-20 text-xs text-white/70">{label}</div>
            <div className="flex-1 h-3 rounded bg-white/5 overflow-hidden">
              <div
                className={`h-full ${positive ? 'bg-emerald-500/70' : 'bg-rose-500/70'}`}
                style={{ width: `${pct}%` }}
                title={fmt0.format(val)}
              />
            </div>
            <div className="w-28 text-right text-xs text-white/70">CHF {fmt0.format(val)}</div>
          </div>
        );
      })}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
      <div className="text-white/60">{label}</div>
      <div className="text-white font-medium">{value}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="text-sm text-white/80 space-y-1 block">
      <div className="font-medium text-white">{label}</div>
      <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">{children}</div>
    </label>
  );
}

function Num({ value, onChange }: { value: number | string; onChange: (v: number) => void }) {
  return (
    <input
      type="number"
      step={0.1}
      inputMode="decimal"
      className="w-full bg-transparent outline-none"
      value={value ?? ''}
      onChange={(e) => onChange(toNum(e.target.value))}
    />
  );
}

function Th({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <th className={`px-3 py-2 text-left ${className}`}>{children}</th>;
}
function Td({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-3 py-2 ${className}`}>{children}</td>;
}

function toNum(v: unknown) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}
function firstDefined<T>(...vals: T[]): T | undefined {
  for (const v of vals) if (v !== undefined && v !== null && (v as any) !== '') return v;
  return undefined;
}