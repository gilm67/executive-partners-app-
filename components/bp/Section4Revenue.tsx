'use client';

// ═══════════════════════════════════════════════════════════════
// Section 4 — Revenue, Costs & Net Margin (v2)
//
// KEY FIXES vs original:
// 1. Revenue model: cumulative AUM (not NNM-only per year)
//    AUM_Y1 = portableAUM × gardenLeaveFactor + NNM_Y1
//    AUM_Y2 = AUM_Y1 + NNM_Y2  (Y1 book stays and earns in Y2)
//    AUM_Y3 = AUM_Y2 + NNM_Y3
// 2. ROA writes to roa_y1/y2/y3 (fixing field name mismatch with Section5)
// 3. Institution-type cost structure (replaces flat 1.25x multiplier)
// 4. Downside scenario auto-generated from Section 3 worst_nnm_m data
// 5. Breakeven calculator
// 6. New inputs: portability_pct, garden_leave_months, institution_type, sign_on_bonus
// ═══════════════════════════════════════════════════════════════

import { useMemo, type ReactNode } from 'react';
import { useBP } from '@/components/bp/store';

const fmt0 = new Intl.NumberFormat('en-CH', { maximumFractionDigits: 0 });
const fmtM = (v: number) => `${(v / 1_000_000).toFixed(2)}M`;

function toNum(v: unknown): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

// ── Institution cost multipliers ─────────────────────────────
// Base salary × multiplier = full annual cost to institution
// Covers: employer social contributions (~18% CH), infrastructure,
// bonus provision, overhead allocation. Sign-on is added separately.
const INSTITUTION_TYPES = [
  {
    key: 'tier1_swiss',
    label: 'Tier-1 Swiss private bank (UBS, Julius Baer, Pictet, Lombard Odier...)',
    multiplier: 1.65,
    note: 'High infrastructure cost, full social charges, generous bonus provision. Typical all-in cost ~1.6–1.7x base.',
  },
  {
    key: 'international',
    label: 'International platform (HSBC, BNP, Citi, Deutsche WM...)',
    multiplier: 1.70,
    note: 'Similar to Tier-1 Swiss with additional compliance and reporting overhead. All-in ~1.65–1.75x base.',
  },
  {
    key: 'boutique',
    label: 'Swiss boutique / family office (Bergos, Maerki Baumann, VP Bank...)',
    multiplier: 1.45,
    note: 'Lower infrastructure overhead than bulge bracket. More flexible compensation structure. All-in ~1.40–1.50x base.',
  },
  {
    key: 'eam',
    label: 'External Asset Manager (EAM / gérant indépendant)',
    multiplier: 1.30,
    note: 'Revenue-share model. Lower fixed cost base. Platform fees paid separately. All-in ~1.25–1.35x base.',
  },
];

export default function Section4Revenue() {
  const i = useBP((s: any) => s.i);
  const set = useBP((s: any) => s.set);

  const calc = useMemo(() => {
    // ── Inputs ──────────────────────────────────────────────
    const currentAUM_m = toNum(i.current_assets_m);
    const portabilityPct = toNum((i as any).portability_pct ?? 60);
    const gardenLeaveMonths = toNum((i as any).garden_leave_months ?? 3);
    const institutionType = (i as any).institution_type ?? 'tier1_swiss';
    const signOnBonus = toNum((i as any).sign_on_bonus ?? 0);

    const roa1 = toNum((i as any).roa_y1);
    const roa2 = toNum((i as any).roa_y2);
    const roa3 = toNum((i as any).roa_y3);

    const nnm1_m = toNum(i.nnm_y1_m);
    const nnm2_m = toNum(i.nnm_y2_m);
    const nnm3_m = toNum(i.nnm_y3_m);

    const baseSalary = toNum(i.base_salary);
    const instData = INSTITUTION_TYPES.find(t => t.key === institutionType) ?? INSTITUTION_TYPES[0];
    const costMultiplier = instData.multiplier;

    // ── Portable AUM ────────────────────────────────────────
    // How much of the current book realistically transfers
    const portableAUM_m = currentAUM_m * (portabilityPct / 100);

    // Garden leave reduces Y1 revenue: if 3 months garden leave,
    // only 9/12 months of revenue in Y1 from the transferred book
    const gardenLeaveFactor = Math.max(0, Math.min(1, (12 - gardenLeaveMonths) / 12));

    // ── BASE CASE: Cumulative AUM model ────────────────────
    const effectivePortableY1 = portableAUM_m * gardenLeaveFactor;
    const aum_y1_m = effectivePortableY1 + nnm1_m;
    const aum_y2_m = aum_y1_m + nnm2_m;  // Y1 AUM stays and earns in Y2
    const aum_y3_m = aum_y2_m + nnm3_m;

    const rev1 = aum_y1_m * 1_000_000 * (roa1 / 100);
    const rev2 = aum_y2_m * 1_000_000 * (roa2 / 100);
    const rev3 = aum_y3_m * 1_000_000 * (roa3 / 100);

    // ── COST MODEL ──────────────────────────────────────────
    const annualCostBase = baseSalary * costMultiplier;
    const signOnAmortPerYear = signOnBonus / 3;
    const annualCostTotal = annualCostBase + signOnAmortPerYear;

    const nm1 = rev1 - annualCostTotal;
    const nm2 = rev2 - annualCostTotal;
    const nm3 = rev3 - annualCostTotal;

    const grossTotal = rev1 + rev2 + rev3;
    const totalCosts = annualCostTotal * 3;
    const nmTotal = nm1 + nm2 + nm3;

    // ── BREAKEVEN ───────────────────────────────────────────
    // Total investment = sign-on + accumulated losses until positive margin
    // Find the month when cumulative net margin turns positive
    let breakEvenMonth: number | null = null;
    let cumulativeMargin = -signOnBonus; // start in the red by sign-on amount

    // Monthly approximations (linear ramp within each year)
    for (let m = 1; m <= 36; m++) {
      const year = m <= 12 ? 1 : m <= 24 ? 2 : 3;
      const monthlyRev = [rev1, rev2, rev3][year - 1] / 12;
      const monthlyCost = annualCostTotal / 12;
      cumulativeMargin += (monthlyRev - monthlyCost);
      if (cumulativeMargin >= 0 && breakEvenMonth === null) {
        breakEvenMonth = m;
      }
    }

    // ── DOWNSIDE SCENARIO ───────────────────────────────────
    // Use worst_nnm_m from prospects if available, else 60% of base NNM
    const worstProspectsSum = (i.prospects || []).reduce(
      (acc: number, p: any) => acc + toNum(p?.worst_nnm_m), 0
    );
    const downside_nnm1 = worstProspectsSum > 0 ? worstProspectsSum : nnm1_m * 0.6;
    const downside_nnm2 = nnm2_m * 0.65;
    const downside_nnm3 = nnm3_m * 0.70;

    // 60% portability in downside
    const downside_portable_m = portableAUM_m * 0.60 * gardenLeaveFactor;
    const down_aum_y1 = downside_portable_m + downside_nnm1;
    const down_aum_y2 = down_aum_y1 + downside_nnm2;
    const down_aum_y3 = down_aum_y2 + downside_nnm3;

    const down_rev1 = down_aum_y1 * 1_000_000 * (roa1 / 100);
    const down_rev2 = down_aum_y2 * 1_000_000 * (roa2 / 100);
    const down_rev3 = down_aum_y3 * 1_000_000 * (roa3 / 100);
    const down_nm1 = down_rev1 - annualCostTotal;
    const down_nm2 = down_rev2 - annualCostTotal;
    const down_nm3 = down_rev3 - annualCostTotal;
    const down_grossTotal = down_rev1 + down_rev2 + down_rev3;
    const down_nmTotal = down_nm1 + down_nm2 + down_nm3;

    const maxBar = Math.max(rev1, rev2, rev3, Math.abs(nm1), Math.abs(nm2), Math.abs(nm3), 1);

    return {
      portableAUM_m, gardenLeaveFactor, effectivePortableY1,
      aum_y1_m, aum_y2_m, aum_y3_m,
      rev1, rev2, rev3,
      annualCostBase, annualCostTotal, signOnAmortPerYear,
      nm1, nm2, nm3,
      grossTotal, totalCosts, nmTotal,
      breakEvenMonth, instData,
      down_rev1, down_rev2, down_rev3,
      down_nm1, down_nm2, down_nm3,
      down_grossTotal, down_nmTotal,
      down_aum_y1, down_aum_y2, down_aum_y3,
      maxBar,
    };
  }, [
    i.current_assets_m,
    (i as any).portability_pct,
    (i as any).garden_leave_months,
    (i as any).institution_type,
    (i as any).sign_on_bonus,
    (i as any).roa_y1,
    (i as any).roa_y2,
    (i as any).roa_y3,
    i.nnm_y1_m, i.nnm_y2_m, i.nnm_y3_m,
    i.base_salary, i.prospects,
  ]);

  const c = calc;

  return (
    <section className="space-y-6">
      <h2 className="text-lg font-semibold">4️⃣ Revenue, Costs & Net Margin</h2>

      {/* ── Model explanation ── */}
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/70 space-y-1">
        <p className="font-medium text-white/90">How the model works</p>
        <p>Revenue is calculated on <strong>cumulative AUM</strong> — not just NNM per year. Your transferred book continues generating revenue in Year 2 and Year 3. This is how receiving banks actually model a hire.</p>
        <p className="text-white/50 text-xs mt-1">
          AUM Y1 = (Portable AUM × garden leave factor) + NNM Y1 &nbsp;·&nbsp;
          AUM Y2 = AUM Y1 + NNM Y2 &nbsp;·&nbsp;
          AUM Y3 = AUM Y2 + NNM Y3
        </p>
      </div>

      {/* ── New inputs: portability, garden leave, institution, sign-on ── */}
      <div className="rounded-xl border border-brandGold/20 bg-brandGold/5 p-4 space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">AUM Transfer Assumptions</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <Field label={`Portability haircut — what % of your current AUM (${toNum(i.current_assets_m)}M) will actually transfer?`}>
              <div className="flex items-center gap-2">
                <input
                  type="range" min={10} max={100} step={5}
                  value={toNum((i as any).portability_pct ?? 60)}
                  onChange={e => set({ portability_pct: Number(e.target.value) } as any)}
                  className="flex-1 accent-amber-400"
                />
                <span className="text-white font-semibold w-12 text-right">
                  {toNum((i as any).portability_pct ?? 60)}%
                </span>
              </div>
              <p className="text-xs text-white/50 mt-1">
                Portable AUM: <strong className="text-amber-300">{(c.portableAUM_m).toFixed(1)}M</strong> &nbsp;·&nbsp;
                Use the Portability Tool score as a starting point
              </p>
            </Field>
          </div>

          <div>
            <Field label="Garden leave duration — months before you can start generating revenue">
              <div className="grid grid-cols-4 gap-1.5">
                {[0, 1, 2, 3, 6].map(m => (
                  <button key={m} type="button"
                    onClick={() => set({ garden_leave_months: m } as any)}
                    className={`rounded-lg border px-2 py-1.5 text-xs font-medium transition text-center ${
                      toNum((i as any).garden_leave_months ?? 3) === m
                        ? 'border-amber-400/60 bg-amber-400/15 text-amber-200'
                        : 'border-white/15 bg-white/5 text-white/70 hover:border-white/30'
                    }`}
                  >{m === 0 ? 'None' : `${m}mo`}</button>
                ))}
              </div>
              <p className="text-xs text-white/50 mt-1">
                Revenue factor Y1: <strong className="text-amber-300">{(c.gardenLeaveFactor * 100).toFixed(0)}%</strong> of year
              </p>
            </Field>
          </div>

        </div>
      </div>

      {/* ── Institution type & cost model ── */}
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/60">Target Institution & Cost Structure</p>
        <div className="space-y-2">
          {INSTITUTION_TYPES.map(inst => (
            <button key={inst.key} type="button"
              onClick={() => set({ institution_type: inst.key } as any)}
              className={`w-full rounded-xl border px-4 py-3 text-left text-xs transition ${
                ((i as any).institution_type ?? 'tier1_swiss') === inst.key
                  ? 'border-white/40 bg-white/10 text-white'
                  : 'border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20'
              }`}
            >
              <span className="font-semibold text-sm block">{inst.label}</span>
              <span className="text-white/50">{inst.note}</span>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <Field label={`Sign-on bonus from receiving bank (${i.currency || 'CHF'})`}>
            <input type="number" min={0} step={10000}
              className="w-full bg-transparent outline-none"
              value={(i as any).sign_on_bonus ?? 0}
              onChange={e => set({ sign_on_bonus: Number(e.target.value) || 0 } as any)}
            />
          </Field>
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs space-y-1">
            <p className="text-white/60">Annual cost breakdown</p>
            <p>Base salary: <strong className="text-white">{fmt0.format(toNum(i.base_salary))}</strong></p>
            <p>Employer charges + overhead ({c.instData.multiplier}x): <strong className="text-white">{fmt0.format(c.annualCostBase)}</strong></p>
            {toNum((i as any).sign_on_bonus) > 0 && (
              <p>Sign-on amortised (÷3): <strong className="text-amber-300">{fmt0.format(c.signOnAmortPerYear)}</strong></p>
            )}
            <p className="font-semibold text-white border-t border-white/10 pt-1 mt-1">
              Total annual cost: {fmt0.format(c.annualCostTotal)}
            </p>
          </div>
        </div>
      </div>

      {/* ── ROA inputs ── */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-3">
          ROA per year — enter as a percentage (e.g. enter <strong>0.75</strong> for 75 basis points)
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { label: 'ROA % Year 1', key: 'roa_y1' as const },
            { label: 'ROA % Year 2', key: 'roa_y2' as const },
            { label: 'ROA % Year 3', key: 'roa_y3' as const },
          ].map(({ label, key }) => (
            <Field key={key} label={label}>
              <input type="number" step={0.05} inputMode="decimal"
                className="w-full bg-transparent outline-none"
                value={(i as any)[key] ?? ''}
                onChange={e => set({ [key]: toNum(e.target.value) } as any)}
              />
            </Field>
          ))}
        </div>
        <p className="text-xs text-white/40 mt-2">
          Typical CH onshore: 0.65–0.90% &nbsp;·&nbsp; International: 0.80–1.20% &nbsp;·&nbsp; MEA/APAC: 0.90–1.30%
        </p>
      </div>

      {/* ── AUM build table ── */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">AUM Build (Base Case)</p>
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="min-w-full text-sm">
            <thead className="bg-white/5 text-white/60">
              <tr>
                <Th>Year</Th>
                <Th className="text-right">Portable Book (M)</Th>
                <Th className="text-right">+ NNM (M)</Th>
                <Th className="text-right">= Total AUM (M)</Th>
                <Th className="text-right">Revenue</Th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white/5">
                <Td>Year 1</Td>
                <Td className="text-right text-amber-300">{c.effectivePortableY1.toFixed(1)}M</Td>
                <Td className="text-right">+{toNum(i.nnm_y1_m).toFixed(1)}M</Td>
                <Td className="text-right font-semibold text-white">{c.aum_y1_m.toFixed(1)}M</Td>
                <Td className="text-right text-emerald-300">{fmt0.format(c.rev1)}</Td>
              </tr>
              <tr className="odd:bg-white/5">
                <Td>Year 2</Td>
                <Td className="text-right text-amber-300">{c.aum_y1_m.toFixed(1)}M ↗</Td>
                <Td className="text-right">+{toNum(i.nnm_y2_m).toFixed(1)}M</Td>
                <Td className="text-right font-semibold text-white">{c.aum_y2_m.toFixed(1)}M</Td>
                <Td className="text-right text-emerald-300">{fmt0.format(c.rev2)}</Td>
              </tr>
              <tr className="odd:bg-white/5">
                <Td>Year 3</Td>
                <Td className="text-right text-amber-300">{c.aum_y2_m.toFixed(1)}M ↗</Td>
                <Td className="text-right">+{toNum(i.nnm_y3_m).toFixed(1)}M</Td>
                <Td className="text-right font-semibold text-white">{c.aum_y3_m.toFixed(1)}M</Td>
                <Td className="text-right text-emerald-300">{fmt0.format(c.rev3)}</Td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── P&L table (base case) ── */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">P&L Summary — Base Case</p>
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="min-w-full text-sm">
            <thead className="bg-white/5 text-white/60">
              <tr>
                <Th>Year</Th>
                <Th className="text-right">Gross Revenue</Th>
                <Th className="text-right">All-in Cost</Th>
                <Th className="text-right">Net Margin</Th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white/5">
                <Td>Year 1</Td>
                <Td className="text-right">{fmt0.format(c.rev1)}</Td>
                <Td className="text-right">{fmt0.format(c.annualCostTotal)}</Td>
                <Td className={`text-right font-medium ${c.nm1 >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>{fmt0.format(c.nm1)}</Td>
              </tr>
              <tr className="odd:bg-white/5">
                <Td>Year 2</Td>
                <Td className="text-right">{fmt0.format(c.rev2)}</Td>
                <Td className="text-right">{fmt0.format(c.annualCostTotal)}</Td>
                <Td className={`text-right font-medium ${c.nm2 >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>{fmt0.format(c.nm2)}</Td>
              </tr>
              <tr className="odd:bg-white/5">
                <Td>Year 3</Td>
                <Td className="text-right">{fmt0.format(c.rev3)}</Td>
                <Td className="text-right">{fmt0.format(c.annualCostTotal)}</Td>
                <Td className={`text-right font-medium ${c.nm3 >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>{fmt0.format(c.nm3)}</Td>
              </tr>
              <tr className="bg-emerald-500/10 font-semibold">
                <Td>3Y Total</Td>
                <Td className="text-right">{fmt0.format(c.grossTotal)}</Td>
                <Td className="text-right">{fmt0.format(c.totalCosts)}</Td>
                <Td className={`text-right ${c.nmTotal >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>{fmt0.format(c.nmTotal)}</Td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Breakeven ── */}
      <div className={`rounded-xl border p-4 ${
        c.breakEvenMonth === null
          ? 'border-rose-500/30 bg-rose-500/10'
          : c.breakEvenMonth <= 12
          ? 'border-emerald-500/30 bg-emerald-500/10'
          : c.breakEvenMonth <= 24
          ? 'border-amber-500/30 bg-amber-500/10'
          : 'border-rose-500/25 bg-rose-500/8'
      }`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-1">Breakeven</p>
            {c.breakEvenMonth !== null ? (
              <>
                <p className="text-2xl font-bold text-white">
                  Month {c.breakEvenMonth}
                  <span className="text-sm font-normal text-white/60 ml-2">
                    ({c.breakEvenMonth <= 12 ? 'Year 1' : c.breakEvenMonth <= 24 ? 'Year 2' : 'Year 3'})
                  </span>
                </p>
                <p className="text-xs text-white/60 mt-1">
                  The receiving bank recovers its total investment in the hire at month {c.breakEvenMonth}.
                  {c.breakEvenMonth <= 12 && ' Excellent — Year 1 positive is rare and will be noted by committees.'}
                  {c.breakEvenMonth > 12 && c.breakEvenMonth <= 18 && ' Strong — within the typical 12–24 month window banks target.'}
                  {c.breakEvenMonth > 18 && c.breakEvenMonth <= 24 && ' Acceptable, but committees will scrutinise Year 1 AUM transfer assumptions.'}
                  {c.breakEvenMonth > 24 && ' Challenging — most banks prefer breakeven within 24 months. Consider adjusting portability assumptions.'}
                </p>
              </>
            ) : (
              <>
                <p className="text-xl font-bold text-rose-300">Not within 3 years</p>
                <p className="text-xs text-white/60 mt-1">
                  At current assumptions, the hire does not reach breakeven within the 36-month projection window.
                  A committee will not approve this BP without significant revisions to AUM, NNM, or ROA assumptions.
                </p>
              </>
            )}
          </div>
          <div className="text-right text-xs text-white/50 shrink-0 space-y-1">
            <p>Total investment:</p>
            <p className="text-white font-medium">{fmt0.format(toNum((i as any).sign_on_bonus) + c.annualCostTotal)}</p>
            <p className="text-white/40">sign-on + Y1 all-in cost</p>
          </div>
        </div>
      </div>

      {/* ── Downside scenario ── */}
      <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-rose-300">
          Downside Scenario
          {(i.prospects || []).some((p: any) => toNum(p?.worst_nnm_m) > 0)
            ? ' (using worst-case NNM from Section 3 prospects)'
            : ' (auto-generated at 60% of base assumptions)'}
        </p>
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="min-w-full text-sm">
            <thead className="bg-white/5 text-white/60">
              <tr>
                <Th>Year</Th>
                <Th className="text-right">AUM (M)</Th>
                <Th className="text-right">Revenue</Th>
                <Th className="text-right">Net Margin</Th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Year 1', aum: c.down_aum_y1, rev: c.down_rev1, nm: c.down_nm1 },
                { label: 'Year 2', aum: c.down_aum_y2, rev: c.down_rev2, nm: c.down_nm2 },
                { label: 'Year 3', aum: c.down_aum_y3, rev: c.down_rev3, nm: c.down_nm3 },
              ].map(row => (
                <tr key={row.label} className="odd:bg-white/5">
                  <Td>{row.label}</Td>
                  <Td className="text-right">{row.aum.toFixed(1)}M</Td>
                  <Td className="text-right text-rose-300">{fmt0.format(row.rev)}</Td>
                  <Td className={`text-right font-medium ${row.nm >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>{fmt0.format(row.nm)}</Td>
                </tr>
              ))}
              <tr className="bg-rose-500/10 font-semibold">
                <Td>3Y Total</Td>
                <Td className="text-right">{' '}</Td>
                <Td className="text-right text-rose-300">{fmt0.format(c.down_grossTotal)}</Td>
                <Td className={`text-right ${c.down_nmTotal >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>{fmt0.format(c.down_nmTotal)}</Td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-white/50">
          Banks always stress-test BPs with a downside scenario. Prepare to defend both cases in committee.
          If your downside shows a loss in all three years, expect the hiring committee to revise your AUM transfer assumptions downward before approving.
        </p>
      </div>

      {/* ── Visual summary ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
        {[
          { label: 'Portable AUM', value: `${c.portableAUM_m.toFixed(1)}M` },
          { label: 'AUM Y3 (cumulative)', value: `${c.aum_y3_m.toFixed(1)}M` },
          { label: '3Y Gross Revenue', value: fmt0.format(c.grossTotal) },
          { label: '3Y Net Margin', value: fmt0.format(c.nmTotal), highlight: true },
        ].map(m => (
          <div key={m.label} className={`rounded-xl border px-3 py-2 ${m.highlight ? 'border-emerald-500/30 bg-emerald-500/10' : 'border-white/10 bg-white/5'}`}>
            <div className="text-white/60 text-xs">{m.label}</div>
            <div className={`font-semibold mt-0.5 ${m.highlight ? 'text-emerald-300' : 'text-white'}`}>{m.value}</div>
          </div>
        ))}
      </div>

    </section>
  );
}

/* ── Primitives ─────────────────────────────────────────────── */

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="text-sm text-white/80 space-y-1 block">
      <div className="font-medium text-white">{label}</div>
      <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">{children}</div>
    </label>
  );
}

function Th({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <th className={`px-3 py-2 text-left ${className}`}>{children}</th>;
}

function Td({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <td className={`px-3 py-2 ${className}`}>{children}</td>;
}
