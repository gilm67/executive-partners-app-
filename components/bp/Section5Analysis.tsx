'use client';

import Link from 'next/link';
import { useMemo, useRef, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useBP } from './store';

function Bar({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className="h-2.5 w-full rounded-full bg-white/10 overflow-hidden">
      <div
        className={`h-full ${pct >= 70 ? 'bg-emerald-400' : pct >= 40 ? 'bg-amber-400' : 'bg-rose-400'}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function n(v: unknown) {
  const x = Number(v ?? 0);
  return Number.isFinite(x) ? x : 0;
}

export default function Section5Analysis() {
  const { i, set } = useBP();
  const pathname = usePathname();
  const base = useMemo(() => (pathname?.startsWith('/en') ? '/en' : ''), [pathname]);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState<null | 'ok' | 'err'>(null);
  const pdfRef = useRef<HTMLDivElement>(null);

  // -------- Derived inputs --------
  const nnm1 = n(i.nnm_y1_m);
  const nnm2 = n(i.nnm_y2_m);
  const nnm3 = n(i.nnm_y3_m);
  const roa1 = n((i as any).roa_y1);
  const roa2 = n((i as any).roa_y2);
  const roa3 = n((i as any).roa_y3);
  const avgROA = (roa1 + roa2 + roa3) / 3;
  const totalNNM3Y = nnm1 + nnm2 + nnm3;

  const bestProspectsSum = (i.prospects || []).reduce((s, p) => s + n(p.best_nnm_m), 0);

  // -------- Score (traffic light) with your ROA thresholds --------
  let score = 0;
  const reasons_pos: string[] = [];
  const reasons_neg: string[] = [];
  const flags: string[] = [];

  if ((i.years_experience ?? 0) >= 7) { score += 2; reasons_pos.push('Experience ≥7 years in market'); }
  else if ((i.years_experience ?? 0) >= 6) { score += 1; reasons_pos.push('Experience 6 years'); }
  else { reasons_neg.push('Experience <6 years'); }

  const aum_min = i.current_market === 'CH Onshore' ? 250 : 200;
  if (n(i.current_assets_m) >= aum_min) { score += 2; reasons_pos.push(`AUM ≥ ${aum_min}M`); }
  else { reasons_neg.push(`AUM shortfall: ${(aum_min - n(i.current_assets_m)).toFixed(0)}M`); }

  if (n(i.base_salary) > 200_000 && n(i.last_bonus) > 100_000) { score += 2; reasons_pos.push('Comp suggests hunter profile'); }
  else if (n(i.base_salary) <= 150_000 && n(i.last_bonus) <= 50_000) { score -= 1; reasons_neg.push('Comp suggests inherited/less portable profile'); }
  else { flags.push('Comp neutral – clarify book origin'); }

  // ROA thresholds: <0.6 low, 0.6–0.8 average, >0.9 good
  if (avgROA > 0.9) { score += 2; reasons_pos.push(`Avg ROA ${avgROA.toFixed(2)}% (good)`); }
  else if (avgROA >= 0.6 && avgROA <= 0.8) { score += 1; reasons_pos.push(`Avg ROA ${avgROA.toFixed(2)}% (average)`); }
  else if (avgROA < 0.6) { reasons_neg.push(`Avg ROA ${avgROA.toFixed(2)}% (low)`); }
  else { flags.push(`Avg ROA ${avgROA.toFixed(2)}% (unclassified)`); }

  if (n(i.current_number_clients) === 0) { flags.push('Clients not provided'); }
  else if (n(i.current_number_clients) > 80) { reasons_neg.push(`High client count (${i.current_number_clients}) – likely lower segment`); }
  else { score += 1; reasons_pos.push('Client load appropriate (≤80)'); }

  const tolerancePct = 10;
  if (nnm1 === 0 && bestProspectsSum === 0) {
    flags.push('Prospects & NNM Y1 both zero');
  } else if (Math.abs(bestProspectsSum - nnm1) <= (tolerancePct / 100) * Math.max(nnm1, 1e-9)) {
    score += 1; reasons_pos.push(`Prospects Best NNM ${bestProspectsSum.toFixed(1)}M ≈ NNM Y1 ${nnm1.toFixed(1)}M`);
  } else {
    reasons_neg.push(`Prospects ${bestProspectsSum.toFixed(1)}M vs NNM Y1 ${nnm1.toFixed(1)}M (> ${tolerancePct}% dev)`);
  }

  if (totalNNM3Y >= 100) { score += 2; reasons_pos.push(`3Y NNM ${totalNNM3Y.toFixed(1)}M meets target`); }
  else { reasons_neg.push(`3Y NNM ${totalNNM3Y.toFixed(1)}M below target`); }

  const verdict = score >= 7 ? '🟢 Strong Candidate'
                : score >= 4 ? '🟡 Medium Potential'
                : '🔴 Weak Candidate';

  // -------- Portability score (compute ONCE) --------
  const portabilityScore = (() => {
    let p = 50;
    const inherited = n(i.inherited_book_pct);

    if (inherited <= 20) p += 20;
    else if (inherited <= 40) p += 10;
    else p -= 10;

    if (n(i.current_number_clients) <= 50 && n(i.current_assets_m) >= 200) p += 15;
    else if (n(i.current_number_clients) <= 80 && n(i.current_assets_m) >= 150) p += 5;
    else p -= 5;

    // ROA thresholds contribution
    if (avgROA > 0.9) p += 10;
    else if (avgROA < 0.6) p -= 5;

    if (nnm1 > 0) {
      const best = (i.prospects || []).reduce((s, r) => s + n(r.best_nnm_m), 0);
      if (best >= nnm1) p += 10;
    }

    if (n(i.years_experience) >= 7) p += 5;

    return Math.max(0, Math.min(100, Math.round(p)));
  })();

  const portabilityText =
    portabilityScore >= 70
      ? 'High portability: predominantly self-acquired clients, balanced book, and realistic NNM pipeline.'
      : portabilityScore >= 40
      ? 'Medium portability: reasonable potential but requires careful onboarding and product fit.'
      : 'Low portability: inherited-heavy or fragmented book, risk of attrition if moved.';

  // -------- Financials (use baseSalary ONCE) --------
  const baseSalary = n(i.base_salary);
  const rev1 = nnm1 * (roa1 / 100) * 1_000_000;
  const rev2 = nnm2 * (roa2 / 100) * 1_000_000;
  const rev3 = nnm3 * (roa3 / 100) * 1_000_000;
  const gross_total = rev1 + rev2 + rev3;
  const fixed_cost = baseSalary * 1.25;
  const nm1 = rev1 - fixed_cost, nm2 = rev2 - fixed_cost, nm3 = rev3 - fixed_cost;
  const nm_total = nm1 + nm2 + nm3;
  const profit_margin_pct = gross_total > 0 ? ((gross_total - fixed_cost * 3) / gross_total) * 100 : 0;

  // -------- Persist ai_notes & score so Section 6/API can use them --------
  const aiNotes =
    `Verdict ${verdict.replace(/^[^ ]+\s*/, '')}; ` +
    `AUM ${Math.round(n(i.current_assets_m))}M in ${i.current_market}; ` +
    `Avg ROA ${avgROA.toFixed(2)}%; 3Y NNM ${totalNNM3Y.toFixed(1)}M; ` +
    (reasons_pos.length ? `Positives: ${reasons_pos.join('; ')}. ` : '') +
    (reasons_neg.length ? `Risks: ${reasons_neg.join('; ')}. ` : '') +
    (flags.length ? `Flags: ${flags.join('; ')}.` : '');

  useEffect(() => {
    set({ score, ai_notes: aiNotes });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    i.years_experience, i.current_market, i.current_assets_m, i.base_salary, i.last_bonus,
    i.current_number_clients, i.inherited_book_pct,
    i.nnm_y1_m, i.nnm_y2_m, i.nnm_y3_m,
    (i as any).roa_y1, (i as any).roa_y2, (i as any).roa_y3,
    i.prospects
  ]);

  // ---------- Save + PDF ----------
  async function onSaveAndPDF() {
    try {
      setSaving(true);
      setSaved(null);

      // 1) Save to Google Sheet via API
      const payload = {
        ...i,
        score,
        ai_notes: aiNotes,
      };
      const res = await fetch('/api/save-bp', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json?.ok !== true) throw new Error(json?.message || `Save failed (${res.status})`);
      setSaved('ok');

      // 2) Generate PDF snapshot of the analysis card(s)
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ]);

      const node = pdfRef.current!;
      const canvas = await html2canvas(node, { scale: 2, backgroundColor: '#0B0E13' });
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();

      // Title
      pdf.setTextColor(30);
      pdf.setFontSize(14);
      pdf.text('Business Plan Simulator – Analysis Summary', 30, 40);

      // Watermark fallback-safe
      const anyPdf = pdf as any;
      try {
        if (anyPdf.GState && anyPdf.setGState) {
          pdf.saveGraphicsState();
          pdf.setGState(new anyPdf.GState({ opacity: 0.08 }));
          pdf.setFontSize(48);
          pdf.setTextColor(30);
          pdf.text('Executive Partners', pageW / 2, pageH / 2, { align: 'center', angle: 30 });
          pdf.restoreGraphicsState();
        } else {
          pdf.setFontSize(48);
          pdf.setTextColor(220);
          pdf.text('Executive Partners', pageW / 2, pageH / 2, { align: 'center', angle: 30 });
        }
      } catch {
        pdf.setFontSize(48);
        pdf.setTextColor(220);
        pdf.text('Executive Partners', pageW / 2, pageH / 2, { align: 'center', angle: 30 });
      }

      // Snapshot image
      const imgW = pageW - 60;
      const imgH = (canvas.height / canvas.width) * imgW;
      pdf.addImage(imgData, 'PNG', 30, 60, imgW, imgH, undefined, 'FAST');

      const fname = `EP_BP_Analysis_${(i.candidate_name || 'Candidate').replace(/\s+/g,'_')}.pdf`;
      pdf.save(fname);
    } catch (e) {
      console.error(e);
      setSaved('err');
      alert('Sorry, we could not save or export the PDF. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  const contactHref = `${base}/contact?subject=${encodeURIComponent('BP Simulator – Request a Call')}`
    + `&name=${encodeURIComponent(i.candidate_name || '')}`
    + `&email=${encodeURIComponent(i.candidate_email || '')}`;

  return (
    <section className="space-y-6">
      <h2 className="text-lg font-semibold">5️⃣ AI Candidate Analysis</h2>

      {/* PDF snapshot area */}
      <div ref={pdfRef} className="space-y-6">
        {/* Verdict */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-white font-semibold">
            Traffic Light: {verdict} <span className="text-white/60">(score {score}/10)</span>
          </div>
          <div className="mt-3 grid gap-4 md:grid-cols-3 text-sm">
            <div>
              <div className="font-medium text-white">Positives</div>
              <ul className="mt-1 list-disc ml-4 space-y-1 text-white/80">
                {(reasons_pos.length ? reasons_pos : ['—']).map((x, idx) => (
                  <li key={`pos-${idx}`}>✅ {x}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-medium text-white">Risks / Gaps</div>
              <ul className="mt-1 list-disc ml-4 space-y-1 text-white/80">
                {(reasons_neg.length ? reasons_neg : ['—']).map((x, idx) => (
                  <li key={`neg-${idx}`}>❌ {x}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-medium text-white">Flags / To Clarify</div>
              <ul className="mt-1 list-disc ml-4 space-y-1 text-white/80">
                {(flags.length ? flags : ['—']).map((x, idx) => (
                  <li key={`flag-${idx}`}>⚠️ {x}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Narrative */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
          <div className="font-semibold text-white">📊 Narrative Assessment</div>
          <p className="text-sm text-white/80">
            Candidate shows AUM of <b>{Math.round(n(i.current_assets_m))}M</b> in <b>{i.current_market}</b>,
            average ROA <b>{avgROA.toFixed(2)}%</b>, and projected 3Y NNM <b>{totalNNM3Y.toFixed(1)}M</b>.
          </p>
        </div>

        {/* Portability */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-white">🔑 Portability Readiness</div>
            <div className="text-white/80 text-sm">{portabilityScore}/100</div>
          </div>
          <Bar value={portabilityScore} />
          <p className="text-sm text-white/80">{portabilityText}</p>
          <div className="text-xs text-white/50">
            Signal drivers: inherited book {n(i.inherited_book_pct)}% · clients {n(i.current_number_clients)} · AUM {Math.round(n(i.current_assets_m))}M · avg ROA {avgROA.toFixed(2)}% · prospects vs NNM Y1
          </div>
        </div>
      </div>

      {/* CTA: complete Portability */}
      <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4">
        <div className="text-white font-semibold">Finish your Portability Diagnostic</div>
        <p className="text-sm text-white/80 mt-1">
          For a sharper recommendation, please complete the dedicated Portability questions (client origin
          mix, relationship tenure, product dependencies, domicile & onboarding constraints).
        </p>
        <div className="mt-3">
          <Link
            href={`${base}/portability`}
            className="inline-flex items-center rounded-xl bg-emerald-500/90 hover:bg-emerald-500 text-white px-4 py-2 text-sm font-semibold"
          >
            Complete Portability →
          </Link>
        </div>
      </div>

      {/* Actions (single button) */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={onSaveAndPDF}
          disabled={saving}
          className="inline-flex items-center rounded-xl bg-white text-[#0B0E13] px-4 py-2 text-sm font-semibold hover:bg-white/90 disabled:opacity-60"
        >
          {saving ? 'Saving & Generating PDF…' : 'Save to Google Sheet + Download Full Analysis PDF'}
        </button>

        <Link
          href={`${base}/contact?subject=${encodeURIComponent('BP Simulator – Request a Call')}`}
          className="inline-flex items-center rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
        >
          Request a Call
        </Link>

        {saved === 'ok' && <span className="text-emerald-400 text-sm self-center">Saved ✓</span>}
        {saved === 'err' && <span className="text-rose-400 text-sm self-center">Save failed</span>}
      </div>

      {/* Recruiter note */}
      <div className="text-xs text-white/45 italic">
        Recruiter note: Use portability ≥70 and 3Y NNM ≥100M as a strong signal for senior mandates; 40–70 needs
        onboarding/product fit review; &lt;40 only for niche coverage or team-play scenarios.
      </div>
    </section>
  );
}
