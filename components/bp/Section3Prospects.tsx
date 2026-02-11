'use client';

import { useMemo, useRef, type ReactNode } from 'react';
import { useBP, type Prospect } from '@/components/bp/store';

export default function Section3Prospects() {
  // ✅ selectors (consistent pattern + avoids extra rerenders)
  const i = useBP((s: any) => s.i);
  const set = useBP((s: any) => s.set);

  const addProspect = useBP((s: any) => s.addProspect);
  const startEditProspect = useBP((s: any) => s.startEditProspect);
  const updateProspect = useBP((s: any) => s.updateProspect);
  const deleteProspect = useBP((s: any) => s.deleteProspect);
  const cancelEditProspect = useBP((s: any) => s.cancelEditProspect);
  const importProspects = useBP((s: any) => s.importProspects);
  const resetProspectForm = useBP((s: any) => s.resetProspectForm);

  const fileRef = useRef<HTMLInputElement | null>(null);

  // Data for display with a TOTAL row at the end
  const { rowsForDisplay, totals } = useMemo(() => {
    const best = sum((i.prospects || []).map((p: any) => Number(p?.best_nnm_m) || 0));
    const worst = sum((i.prospects || []).map((p: any) => Number(p?.worst_nnm_m) || 0));
    const wealth = sum((i.prospects || []).map((p: any) => Number(p?.wealth_m) || 0));

    const totalRow = {
      name: 'TOTAL',
      source: '' as Prospect['source'] | '',
      wealth_m: wealth,
      best_nnm_m: best,
      worst_nnm_m: worst,
      _isTotal: true,
    };

    return {
      totals: totalRow,
      rowsForDisplay: [...(i.prospects || []), totalRow as any],
    };
  }, [i.prospects]);

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">3️⃣ Prospects</h2>
      <p className="text-white/70">
        Add prospects below. Use <span className="font-semibold">✏️ Edit</span> to modify and
        <span className="font-semibold"> 🗑 Delete</span> to remove. You can also import a CSV.
      </p>

      {/* CSV Import */}
      <details className="rounded-xl border border-white/10 bg-white/5 p-4">
        <summary className="cursor-pointer text-white/90 font-medium">📥 Import from CSV</summary>
        <div className="mt-3 text-sm text-white/80 space-y-2">
          <p>
            Expected headers (case-sensitive):{' '}
            <code>Name, Source, Wealth (M), Best NNM (M), Worst NNM (M)</code>
          </p>
          <input
            ref={fileRef}
            type="file"
            accept=".csv,text/csv"
            className="block w-full text-sm"
            onChange={(e) => handleCSV(e, importProspects)}
          />
          <div className="text-white/60">Sources must be one of: Self Acquired, Inherited, Finder.</div>
        </div>
      </details>

      {/* Inline form (Add / Edit) */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <Field label="Name">
          <input
            className="w-full bg-transparent outline-none"
            value={i.p_name}
            onChange={(e) => set({ p_name: e.target.value })}
          />
        </Field>

        <Field label="Source">
          <select
            className="w-full bg-transparent outline-none"
            value={i.p_source}
            onChange={(e) => set({ p_source: toSource(e.target.value) })}
          >
            {['Self Acquired', 'Inherited', 'Finder'].map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Wealth (M)">
          <Num value={i.p_wealth_m} onChange={(v) => set({ p_wealth_m: v })} />
        </Field>

        <Field label="Best NNM (M)">
          <Num value={i.p_best_nnm_m} onChange={(v) => set({ p_best_nnm_m: v })} />
        </Field>

        <Field label="Worst NNM (M)">
          <Num value={i.p_worst_nnm_m} onChange={(v) => set({ p_worst_nnm_m: v })} />
        </Field>
      </div>

      <div className="flex flex-wrap gap-2">
        <Btn
          onClick={() => (i.edit_index === -1 ? addProspect() : updateProspect())}
          kind="primary"
          label={i.edit_index === -1 ? '➕ Add' : '💾 Update'}
        />
        <Btn
          onClick={() => (i.edit_index === -1 ? resetProspectForm() : cancelEditProspect())}
          label={i.edit_index === -1 ? 'Clear' : '✖ Cancel Edit'}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="min-w-full text-sm">
          <thead className="bg-white/5 text-white/70">
            <tr>
              <Th>Name</Th>
              <Th>Source</Th>
              <Th className="text-right">Wealth (M)</Th>
              <Th className="text-right">Best NNM (M)</Th>
              <Th className="text-right">Worst NNM (M)</Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {rowsForDisplay.map((row: any, idx: number) => {
              const isTotal = !!row._isTotal;
              return (
                <tr key={idx} className={isTotal ? 'bg-emerald-500/10 font-semibold' : 'odd:bg-white/5'}>
                  <Td>{row.name}</Td>
                  <Td>{row.source || ''}</Td>
                  <Td className="text-right">{fmt(row.wealth_m)}</Td>
                  <Td className="text-right">{fmt(row.best_nnm_m)}</Td>
                  <Td className="text-right">{fmt(row.worst_nnm_m)}</Td>
                  <Td className="text-right">
                    {!isTotal && (
                      <div className="flex justify-end gap-2">
                        <Mini onClick={() => startEditProspect(idx)}>✏️ Edit</Mini>
                        <Mini onClick={() => deleteProspect(idx)}>🗑 Delete</Mini>
                      </div>
                    )}
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Quick delta info like Streamlit note */}
      <p className="text-sm text-white/60">
        Δ Best NNM vs NNM Y1:{' '}
        <span className={deltaClass(totals.best_nnm_m - (Number(i.nnm_y1_m) || 0))}>
          {(totals.best_nnm_m - (Number(i.nnm_y1_m) || 0)).toFixed(1)} M
        </span>
      </p>
    </section>
  );
}

/* ——— helpers / little primitives ——— */

function Field({ label, children }: { label: string; children: ReactNode }) {
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
      onChange={(e) => onChange(safeNum(e.target.value))}
    />
  );
}

function Btn({
  label,
  onClick,
  kind = 'ghost',
}: {
  label: string;
  onClick: () => void;
  kind?: 'primary' | 'ghost';
}) {
  const cls =
    kind === 'primary'
      ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
      : 'bg-white/5 hover:bg-white/10 text-white/90';
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-3 py-1.5 text-sm border border-white/10 transition ${cls}`}
    >
      {label}
    </button>
  );
}

function Mini({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-md px-2 py-1 text-xs bg-white/5 hover:bg-white/10 border border-white/10"
    >
      {children}
    </button>
  );
}

function Th({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <th className={`px-3 py-2 text-left ${className}`}>{children}</th>;
}
function Td({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <td className={`px-3 py-2 ${className}`}>{children}</td>;
}

function safeNum(v: string): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}
function sum(arr: number[]) {
  return arr.reduce((a, b) => a + (Number.isFinite(b) ? b : 0), 0);
}
function fmt(n: number) {
  return (Number(n) || 0).toFixed(1);
}
function deltaClass(delta: number) {
  return delta >= 0 ? 'text-emerald-300' : 'text-rose-300';
}
function toSource(v: string) {
  return (['Self Acquired', 'Inherited', 'Finder'].includes(v) ? v : 'Self Acquired') as Prospect['source'];
}

/** CSV → Prospect[] */
async function handleCSV(e: React.ChangeEvent<HTMLInputElement>, importProspects: (rows: Prospect[]) => void) {
  const f = e.target.files?.[0];
  if (!f) return;
  const txt = await f.text();
  const rows = parseCSV(txt);
  importProspects(rows);
  // reset input so re-upload of the same file triggers change
  e.target.value = '';
}

function parseCSV(text: string): Prospect[] {
  const lines = text.replace(/\r\n?/g, '\n').split('\n').filter(Boolean);
  if (!lines.length) return [];
  const header = splitCSVLine(lines[0]);
  const idx = {
    name: header.indexOf('Name'),
    source: header.indexOf('Source'),
    wealth: header.indexOf('Wealth (M)'),
    best: header.indexOf('Best NNM (M)'),
    worst: header.indexOf('Worst NNM (M)'),
  };
  if (Object.values(idx).some((i) => i < 0)) return [];

  const out: Prospect[] = [];
  for (let r = 1; r < lines.length; r++) {
    const cols = splitCSVLine(lines[r]);
    const src = (cols[idx.source] || '').trim();
    const candidate: Prospect['source'] =
      (['Self Acquired', 'Inherited', 'Finder'].includes(src) ? src : 'Self Acquired') as any;

    out.push({
      name: (cols[idx.name] || '').trim(),
      source: candidate,
      wealth_m: toNum(cols[idx.wealth]),
      best_nnm_m: toNum(cols[idx.best]),
      worst_nnm_m: toNum(cols[idx.worst]),
    });
  }
  return out;
}

function toNum(s: string) {
  const n = Number(String(s || '').replace(/,/g, ''));
  return Number.isFinite(n) ? n : 0;
}

// naive CSV splitter (handles simple quoted cells)
function splitCSVLine(line: string): string[] {
  const out: string[] = [];
  let cur = '';
  let q = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (q && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        q = !q;
      }
    } else if (ch === ',' && !q) {
      out.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out.map((s) => s.trim());
}