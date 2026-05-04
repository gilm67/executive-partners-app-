'use client';

// ═══════════════════════════════════════════════════════════════
// Section 5 — Analysis (v2)
//
// KEY FIXES vs original:
// 1. ROA field: reads roa_y1/y2/y3 (matching store definition)
//    NOT roa_y1_pct which was the broken field
// 2. Financial calculations use cumulative AUM model (matching Section4)
// 3. Committee Readiness Score replaces the 10-point traffic light
// 4. Improved narrative with specific, actionable observations
// 5. Portability score enhanced with more dimensions
// ═══════════════════════════════════════════════════════════════

import Link from 'next/link';
import { useMemo, useRef, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useBP } from '@/components/bp/store';
import EmailGateModal from '@/components/EmailGateModal';

function ProgressBar({ value, color = 'gold' }: { value: number; color?: 'gold' | 'green' | 'amber' | 'red' }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  const cls = color === 'gold' ? 'bg-amber-400'
    : color === 'green' ? 'bg-emerald-400'
    : color === 'amber' ? 'bg-amber-400'
    : 'bg-rose-400';
  return (
    <div className="h-2.5 w-full rounded-full bg-white/10 overflow-hidden">
      <div className={`h-full ${cls} transition-all duration-500`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function n(v: unknown): number {
  const x = Number(v ?? 0);
  return Number.isFinite(x) ? x : 0;
}

const fmt0 = new Intl.NumberFormat('en-CH', { maximumFractionDigits: 0 });

export default function Section5Analysis() {
  const i = useBP((s: any) => s.i);
  const set = useBP((s: any) => s.set);
  const setExportStatus = useBP((s: any) => s.setExportStatus);

  const pathname = usePathname();
  const base = useMemo(() => (pathname?.startsWith('/en') ? '/en' : ''), [pathname]);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState<null | 'ok' | 'err'>(null);
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const pdfRef = useRef<HTMLDivElement>(null);

  // ── Inputs ────────────────────────────────────────────────
  const currentAUM_m = n(i.current_assets_m);
  const portabilityPct = n((i as any).portability_pct ?? 60);
  const gardenLeaveMonths = n((i as any).garden_leave_months ?? 3);
  const signOnBonus = n((i as any).sign_on_bonus ?? 0);
  const baseSalary = n(i.base_salary);

  const nnm1 = n(i.nnm_y1_m);
  const nnm2 = n(i.nnm_y2_m);
  const nnm3 = n(i.nnm_y3_m);

  // ✅ FIXED: reads roa_y1/y2/y3 — NOT roa_y1_pct (which was the bug)
  const roa1 = n((i as any).roa_y1);
  const roa2 = n((i as any).roa_y2);
  const roa3 = n((i as any).roa_y3);
  const avgROA = (roa1 + roa2 + roa3) / 3;
  const totalNNM3Y = nnm1 + nnm2 + nnm3;

  const bestProspectsSum = (i.prospects || []).reduce((s: number, p: any) => s + n(p.best_nnm_m), 0);
  const worstProspectsSum = (i.prospects || []).reduce((s: number, p: any) => s + n(p.worst_nnm_m), 0);

  // ── Financials (cumulative AUM model — matches Section4) ──
  const portableAUM_m = currentAUM_m * (portabilityPct / 100);
  const gardenLeaveFactor = Math.max(0, Math.min(1, (12 - gardenLeaveMonths) / 12));

  const aum_y1_m = portableAUM_m * gardenLeaveFactor + nnm1;
  const aum_y2_m = aum_y1_m + nnm2;
  const aum_y3_m = aum_y2_m + nnm3;

  const rev1 = aum_y1_m * 1_000_000 * (roa1 / 100);
  const rev2 = aum_y2_m * 1_000_000 * (roa2 / 100);
  const rev3 = aum_y3_m * 1_000_000 * (roa3 / 100);
  const grossTotal = rev1 + rev2 + rev3;

  const COST_MULT: Record<string, number> = {
    tier1_swiss: 1.65, international: 1.70, boutique: 1.45, eam: 1.30,
  };
  const costMult = COST_MULT[(i as any).institution_type ?? 'tier1_swiss'] ?? 1.65;
  const annualCost = baseSalary * costMult + signOnBonus / 3;

  const nm1 = rev1 - annualCost;
  const nm2 = rev2 - annualCost;
  const nm3 = rev3 - annualCost;
  const nmTotal = nm1 + nm2 + nm3;

  // Breakeven
  let breakEvenMonth: number | null = null;
  let cumulativeMargin = -signOnBonus;
  for (let m = 1; m <= 36; m++) {
    const yr = m <= 12 ? 1 : m <= 24 ? 2 : 3;
    cumulativeMargin += ([rev1, rev2, rev3][yr - 1] - annualCost) / 12;
    if (cumulativeMargin >= 0 && breakEvenMonth === null) breakEvenMonth = m;
  }

  // ── Committee Readiness Score (0-100) ─────────────────────
  const { committeScore, dimensions } = useMemo(() => {
    const dims: Array<{ label: string; score: number; max: number; note: string; flag?: string }> = [];

    // 1. AUM Size vs market threshold (0-20)
    const aumMin = i.current_market === 'CH Onshore' ? 250 : 200;
    const aumScore = currentAUM_m >= aumMin ? 20
      : currentAUM_m >= aumMin * 0.8 ? 14
      : currentAUM_m >= aumMin * 0.6 ? 8 : 3;
    dims.push({
      label: 'AUM Size', score: aumScore, max: 20,
      note: currentAUM_m >= aumMin
        ? `${currentAUM_m}M meets the ${aumMin}M threshold for ${i.current_market}`
        : `${currentAUM_m}M is ${(aumMin - currentAUM_m).toFixed(0)}M below the typical ${aumMin}M threshold`,
      flag: currentAUM_m < aumMin * 0.7 ? 'Below threshold — expect pushback from committee' : undefined,
    });

    // 2. Revenue quality — ROA (0-15)
    const roaScore = avgROA > 0.90 ? 15 : avgROA >= 0.70 ? 12 : avgROA >= 0.55 ? 8 : avgROA >= 0.40 ? 4 : 1;
    dims.push({
      label: 'Revenue Quality (ROA)', score: roaScore, max: 15,
      note: `Average ROA ${avgROA.toFixed(2)}% — ${
        avgROA > 0.90 ? 'strong, above CH onshore average'
        : avgROA >= 0.70 ? 'solid, within typical CH onshore range'
        : avgROA >= 0.55 ? 'below average — ensure book mix justifies this'
        : 'low — committee will question revenue sustainability'}`,
      flag: avgROA < 0.50 ? 'ROA below 0.50% — likely to trigger a business plan revision request' : undefined,
    });

    // 3. Pipeline realism — prospects vs NNM Y1 (0-15)
    const tolerance = Math.max(nnm1, 1) * 0.15;
    const pipelineScore = nnm1 === 0 && bestProspectsSum === 0 ? 0
      : Math.abs(bestProspectsSum - nnm1) <= tolerance ? 15
      : Math.abs(bestProspectsSum - nnm1) <= tolerance * 3 ? 10
      : bestProspectsSum > nnm1 ? 6 : 2;
    dims.push({
      label: 'Pipeline Realism', score: pipelineScore, max: 15,
      note: nnm1 === 0 ? 'No NNM Y1 entered — pipeline not assessable'
        : Math.abs(bestProspectsSum - nnm1) <= tolerance
        ? `Prospect best sum (${bestProspectsSum.toFixed(1)}M) aligns well with NNM Y1 (${nnm1.toFixed(1)}M)`
        : `Gap of ${Math.abs(bestProspectsSum - nnm1).toFixed(1)}M between prospect sum and NNM Y1 — committee will ask you to reconcile`,
      flag: pipelineScore <= 2 ? 'NNM assumptions are not supported by the prospect list' : undefined,
    });

    // 4. NNM growth trajectory (0-10)
    const nnmGrowthScore = nnm1 === 0 ? 0
      : nnm2 >= nnm1 && nnm3 >= nnm2 ? 10
      : nnm2 >= nnm1 * 0.8 ? 7
      : nnm2 >= nnm1 * 0.6 ? 4 : 1;
    dims.push({
      label: 'NNM Growth Trajectory', score: nnmGrowthScore, max: 10,
      note: nnm1 === 0 ? 'No NNM provided'
        : nnm2 >= nnm1 && nnm3 >= nnm2 ? 'NNM grows consistently across 3 years — credible ramp'
        : nnm2 < nnm1 * 0.8 ? 'NNM declines in Y2 — committees prefer a growing ramp, not a front-loaded plan'
        : 'NNM is broadly stable — acceptable but less compelling than a growth trajectory',
    });

    // 5. P&L viability — Y3 margin vs cost (0-20)
    const plRatio = annualCost > 0 ? rev3 / annualCost : 0;
    const plScore = plRatio >= 3 ? 20 : plRatio >= 2 ? 16 : plRatio >= 1.5 ? 12 : plRatio >= 1 ? 6 : 0;
    dims.push({
      label: 'P&L Viability (Y3)', score: plScore, max: 20,
      note: plRatio >= 3 ? `Year 3 revenue is ${plRatio.toFixed(1)}x all-in cost — strong commercial case`
        : plRatio >= 2 ? `Year 3 revenue is ${plRatio.toFixed(1)}x cost — solid, meets most committees' thresholds`
        : plRatio >= 1.5 ? `Year 3 at ${plRatio.toFixed(1)}x cost — marginal, adjust AUM or ROA assumptions`
        : plRatio >= 1 ? `Year 3 barely covers cost — committee will likely request revised assumptions`
        : `Year 3 revenue does not cover cost — plan is not commercially viable as presented`,
      flag: plRatio < 1.2 ? 'Year 3 P&L is insufficient for committee approval at most institutions' : undefined,
    });

    // 6. Portability haircut realism (0-10)
    const portScore = portabilityPct >= 80 ? 4 // suspicious if too high
      : portabilityPct >= 60 ? 10
      : portabilityPct >= 45 ? 8
      : portabilityPct >= 30 ? 5 : 2;
    dims.push({
      label: 'Portability Assumption', score: portScore, max: 10,
      note: portabilityPct >= 80
        ? `${portabilityPct}% portability is optimistic — most committees apply 50–70% for senior moves. Adjust to strengthen credibility`
        : portabilityPct >= 60 ? `${portabilityPct}% is within the credible range for a well-prepared senior move`
        : portabilityPct >= 45 ? `${portabilityPct}% is conservative — acceptable, shows realism`
        : `${portabilityPct}% is very conservative — verify this reflects legal/EAM constraints`,
      flag: portabilityPct > 85 ? 'Portability above 85% will be challenged — banks apply their own haircut' : undefined,
    });

    // 7. Experience & seniority (0-10)
    const expScore = n(i.years_experience) >= 10 ? 10
      : n(i.years_experience) >= 7 ? 8
      : n(i.years_experience) >= 5 ? 5
      : n(i.years_experience) >= 3 ? 2 : 0;
    dims.push({
      label: 'Experience & Seniority', score: expScore, max: 10,
      note: `${n(i.years_experience)} years — ${
        n(i.years_experience) >= 10 ? 'senior enough for autonomous hire'
        : n(i.years_experience) >= 7 ? 'adequate for most senior RM mandates'
        : n(i.years_experience) >= 5 ? 'borderline — may need a team or structured onboarding'
        : 'insufficient for an autonomous hire at Tier-1 level'}`,
    });

    const totalScore = dims.reduce((s, d) => s + d.score, 0);
    const totalMax = dims.reduce((s, d) => s + d.max, 0);
    const normalised = Math.round((totalScore / totalMax) * 100);

    return { committeScore: normalised, dimensions: dims };
  }, [
    currentAUM_m, avgROA, nnm1, nnm2, nnm3, bestProspectsSum,
    rev3, annualCost, portabilityPct, i.years_experience, i.current_market,
  ]);

  const committeeLevel = committeScore >= 78 ? { label: 'Committee-ready', color: 'text-emerald-300', border: 'border-emerald-500/30' }
    : committeScore >= 60 ? { label: 'Needs refinement', color: 'text-amber-300', border: 'border-amber-500/30' }
    : { label: 'Not committee-ready', color: 'text-rose-300', border: 'border-rose-500/30' };

  // ── Legacy traffic light (kept for Google Sheet save) ─────
  let score = 0;
  const reasons_pos: string[] = [];
  const reasons_neg: string[] = [];
  const flags: string[] = [];

  if (n(i.years_experience) >= 7) { score += 2; reasons_pos.push('Experience 7+ years'); }
  else if (n(i.years_experience) >= 5) { score += 1; reasons_pos.push('Experience 5+ years'); }
  else reasons_neg.push('Experience below 5 years');

  const aumMin = i.current_market === 'CH Onshore' ? 250 : 200;
  if (currentAUM_m >= aumMin) { score += 2; reasons_pos.push(`AUM ${currentAUM_m}M meets ${aumMin}M threshold`); }
  else reasons_neg.push(`AUM shortfall: ${(aumMin - currentAUM_m).toFixed(0)}M below threshold`);

  if (n(i.base_salary) > 200_000 && n(i.last_bonus) > 100_000) { score += 2; reasons_pos.push('Compensation profile suggests hunter'); }
  else if (n(i.base_salary) <= 150_000 && n(i.last_bonus) <= 50_000) { score -= 1; reasons_neg.push('Compensation suggests inherited book'); }
  else flags.push('Compensation profile is neutral');

  if (avgROA > 0.90) { score += 2; reasons_pos.push(`Avg ROA ${avgROA.toFixed(2)}% strong`); }
  else if (avgROA >= 0.60) { score += 1; reasons_pos.push(`Avg ROA ${avgROA.toFixed(2)}% adequate`); }
  else reasons_neg.push(`Avg ROA ${avgROA.toFixed(2)}% below threshold`);

  if (n(i.current_number_clients) === 0) flags.push('Client count not entered');
  else if (n(i.current_number_clients) > 80) reasons_neg.push(`Client count ${i.current_number_clients} suggests lower segment`);
  else { score += 1; reasons_pos.push('Client load appropriate (80 or fewer)'); }

  if (nnm1 === 0 && bestProspectsSum === 0) flags.push('Pipeline and NNM both empty');
  else if (Math.abs(bestProspectsSum - nnm1) <= 0.1 * Math.max(nnm1, 1)) {
    score += 1; reasons_pos.push(`Prospects (${bestProspectsSum.toFixed(1)}M) align with NNM Y1`);
  } else reasons_neg.push(`Pipeline gap: prospects ${bestProspectsSum.toFixed(1)}M vs NNM Y1 ${nnm1.toFixed(1)}M`);

  if (totalNNM3Y >= 100) { score += 2; reasons_pos.push(`3Y NNM ${totalNNM3Y.toFixed(1)}M meets 100M target`); }
  else reasons_neg.push(`3Y NNM ${totalNNM3Y.toFixed(1)}M below 100M target`);

  const verdict = score >= 7 ? 'Strong Candidate' : score >= 4 ? 'Medium Potential' : 'Needs Strengthening';

  const aiNotes =
    `Committee Readiness: ${committeScore}/100 (${committeeLevel.label}); ` +
    `Breakeven: ${breakEvenMonth ? `Month ${breakEvenMonth}` : 'Beyond 36 months'}; ` +
    `AUM ${currentAUM_m}M, Portable ${portableAUM_m.toFixed(1)}M (${portabilityPct}%), ` +
    `Market: ${i.current_market}; Avg ROA ${avgROA.toFixed(2)}%; 3Y NNM ${totalNNM3Y.toFixed(1)}M; ` +
    `3Y Net Margin: ${fmt0.format(nmTotal)}; ` +
    (reasons_pos.length ? `Positives: ${reasons_pos.join(', ')}. ` : '') +
    (reasons_neg.length ? `Risks: ${reasons_neg.join(', ')}. ` : '') +
    (flags.length ? `Flags: ${flags.join(', ')}.` : '');

  useEffect(() => {
    set({ score, ai_notes: aiNotes });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score, aiNotes]);

  // ── Email gate ─────────────────────────────────────────────
  const handleEmailSubmit = async (email: string) => {
    await fetch('/api/tool-leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email, tool_name: 'bp_simulator', score,
        input_data: { ...i, score, committee_score: committeScore, verdict },
      }),
    });
    setUserEmail(email);
    setShowEmailGate(false);
    setTimeout(() => performSaveAndPDF(), 100);
  };

  async function performSaveAndPDF() {
    try {
      setSaving(true); setSaved(null);
      setExportStatus?.('generating', null);

      const res = await fetch('/api/save-bp', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...i, score, ai_notes: aiNotes, committee_score: committeScore }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json?.ok !== true) throw new Error(json?.message || `Save failed (${res.status})`);
      setSaved('ok');

      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import('html2canvas'), import('jspdf')]);
      const node = pdfRef.current;
      if (!node) throw new Error('PDF node not found');
      const canvas = await html2canvas(node, { scale: 2, backgroundColor: '#0B0E13' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      pdf.setTextColor(30); pdf.setFontSize(14);
      pdf.text('Business Plan Analysis — Executive Partners', 30, 40);
      try {
        const anyPdf = pdf as any;
        pdf.saveGraphicsState();
        pdf.setGState(new anyPdf.GState({ opacity: 0.06 }));
        pdf.setFontSize(48); pdf.setTextColor(30);
        pdf.text('Executive Partners', pageW / 2, pageH / 2, { align: 'center', angle: 30 });
        pdf.restoreGraphicsState();
      } catch { /* silent */ }
      const imgW = pageW - 60;
      const imgH = (canvas.height / canvas.width) * imgW;
      pdf.addImage(imgData, 'PNG', 30, 60, imgW, imgH, undefined, 'FAST');
      const fname = `EP_BP_${(i.candidate_name || 'Candidate').replace(/\s+/g, '_')}.pdf`;
      pdf.save(fname);
      setExportStatus?.('ready', fname);
    } catch (e) {
      console.error(e); setSaved('err'); setExportStatus?.('error', null);
      alert('Could not save or export. Please try again.');
    } finally { setSaving(false); }
  }

  function onSaveAndPDF() {
    if (!userEmail) { setShowEmailGate(true); return; }
    performSaveAndPDF();
  }

  const contactHref = `${base}/contact?subject=${encodeURIComponent('BP Simulator – Request a Call')}&name=${encodeURIComponent(i.candidate_name || '')}&email=${encodeURIComponent(i.candidate_email || '')}`;

  return (
    <section className="space-y-6">
      <h2 className="text-lg font-semibold">5️⃣ Analysis & Committee Readiness</h2>

      <div ref={pdfRef} className="space-y-6">

        {/* ── Committee Readiness Score ── */}
        <div className={`rounded-2xl border p-5 ${committeeLevel.border} bg-white/[0.03]`}>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-1">Committee Readiness Score</p>
              <p className={`text-4xl font-bold ${committeeLevel.color}`}>{committeScore}<span className="text-xl text-white/40">/100</span></p>
              <p className={`text-sm font-semibold mt-1 ${committeeLevel.color}`}>{committeeLevel.label}</p>
            </div>
            <div className="text-right text-xs text-white/50 space-y-1">
              <p>Breakeven: <span className="text-white font-medium">{breakEvenMonth ? `Month ${breakEvenMonth}` : 'Beyond 3 years'}</span></p>
              <p>3Y Revenue: <span className="text-white font-medium">{fmt0.format(grossTotal)}</span></p>
              <p>3Y Net Margin: <span className={`font-medium ${nmTotal >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>{fmt0.format(nmTotal)}</span></p>
            </div>
          </div>

          <ProgressBar value={committeScore} color={committeScore >= 78 ? 'green' : committeScore >= 60 ? 'amber' : 'red'} />

          <div className="mt-4 space-y-3">
            {dimensions.map(dim => (
              <div key={dim.label}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-white/80 font-medium">{dim.label}</span>
                  <span className={`font-semibold ${dim.score / dim.max >= 0.7 ? 'text-emerald-300' : dim.score / dim.max >= 0.4 ? 'text-amber-300' : 'text-rose-300'}`}>
                    {dim.score}/{dim.max}
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`h-full ${dim.score / dim.max >= 0.7 ? 'bg-emerald-400' : dim.score / dim.max >= 0.4 ? 'bg-amber-400' : 'bg-rose-400'}`}
                    style={{ width: `${(dim.score / dim.max) * 100}%` }}
                  />
                </div>
                <p className="text-[11px] text-white/50 mt-0.5">{dim.note}</p>
                {dim.flag && (
                  <p className="text-[11px] text-rose-300/80 mt-0.5">⚠ {dim.flag}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Narrative ── */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
          <div className="font-semibold text-white">Narrative Assessment</div>
          <p className="text-sm text-white/80 leading-relaxed">
            {i.candidate_name || 'This candidate'} presents {currentAUM_m}M AUM in {i.current_market},
            with {n(i.current_number_clients)} clients and {n(i.years_experience)} years of experience.
            At a {portabilityPct}% portability assumption and {gardenLeaveMonths} months of garden leave,
            the bank can expect {portableAUM_m.toFixed(1)}M of transferred book generating revenue from month {gardenLeaveMonths + 1}.
            Cumulative AUM reaches {(portableAUM_m * gardenLeaveFactor + nnm1).toFixed(1)}M by end of Year 1,
            growing to {(portableAUM_m * gardenLeaveFactor + nnm1 + nnm2 + nnm3).toFixed(1)}M by end of Year 3.
          </p>
          <p className="text-sm text-white/80 leading-relaxed">
            At an average ROA of {avgROA.toFixed(2)}%, Year 3 gross revenue is projected at {fmt0.format(rev3)},
            against an all-in annual cost of {fmt0.format(annualCost)}.
            {nm3 >= 0
              ? ` Year 3 net margin is positive at ${fmt0.format(nm3)} — the hire is commercially justified by year 3.`
              : ` Year 3 net margin remains negative at ${fmt0.format(nm3)} — the BP as presented does not reach profitability within the 3-year window.`}
            {breakEvenMonth
              ? ` Breakeven occurs at month ${breakEvenMonth}.`
              : ' The hire does not reach breakeven within 36 months at current assumptions.'}
          </p>
          {reasons_neg.length > 0 && (
            <div className="rounded-lg border border-rose-500/20 bg-rose-500/8 px-3 py-2">
              <p className="text-xs font-semibold text-rose-300 mb-1">Areas requiring attention</p>
              <ul className="space-y-0.5">
                {reasons_neg.map((r, idx) => <li key={idx} className="text-xs text-white/70">— {r}</li>)}
              </ul>
            </div>
          )}
          {flags.length > 0 && (
            <div className="rounded-lg border border-amber-500/20 bg-amber-500/8 px-3 py-2">
              <p className="text-xs font-semibold text-amber-300 mb-1">Flags to address before presenting</p>
              <ul className="space-y-0.5">
                {flags.map((f, idx) => <li key={idx} className="text-xs text-white/70">— {f}</li>)}
              </ul>
            </div>
          )}
        </div>

        {/* ── Positives ── */}
        {reasons_pos.length > 0 && (
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/8 p-4">
            <div className="font-semibold text-emerald-300 mb-2 text-sm">Commercial strengths</div>
            <ul className="space-y-1">
              {reasons_pos.map((r, idx) => (
                <li key={idx} className="text-xs text-white/80 flex items-start gap-2">
                  <span className="text-emerald-400 shrink-0">+</span> {r}
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>

      {/* ── Link to Portability Tool ── */}
      <div className="rounded-2xl border border-amber-400/25 bg-amber-400/8 p-4">
        <div className="text-white font-semibold text-sm">Complete the Portability Diagnostic</div>
        <p className="text-xs text-white/70 mt-1">
          The portability haircut ({portabilityPct}%) is the most important single assumption in this BP.
          The Portability Tool assesses your specific legal position, wallet share depth, EAM exposure,
          and jurisdiction to give you a defensible figure — not a guess.
        </p>
        <Link href={`${base}/portability`}
          className="inline-flex items-center rounded-xl bg-amber-500/80 hover:bg-amber-500 text-white px-4 py-2 text-sm font-semibold mt-3"
        >
          Run the Portability Diagnostic →
        </Link>
      </div>


      {/* Hidden trigger — fired by bottom email capture form */}
      <button id="bp-save-btn" onClick={onSaveAndPDF} disabled={saving}
        className="hidden" aria-hidden="true" tabIndex={-1} />

      <EmailGateModal
        isOpen={showEmailGate}
        onClose={() => setShowEmailGate(false)}
        onSubmit={handleEmailSubmit}
        score={score}
        toolName="bp_simulator"
      />
    </section>
  );
}
