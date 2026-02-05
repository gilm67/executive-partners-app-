// components/portability/Section5Analysis.tsx
'use client';

import { usePortability } from './store';
import { useMemo, useRef, useState, useEffect } from 'react';
import EmailGateModal from '@/components/EmailGateModal';

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

export default function Section5Analysis() {
  const state = usePortability();
  const pdfRef = useRef<HTMLDivElement>(null);
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // -------- Calculate Multi-Dimensional Scores --------
  const dimensions = useMemo(() => {
    const s = state;

    // Client Quality Score (0-100)
    let clientQuality = 50;
    if (s.self_acquired_pct >= 70) clientQuality += 20;
    else if (s.self_acquired_pct >= 50) clientQuality += 10;
    else clientQuality -= 10;

    if (s.avg_client_size_m >= 5) clientQuality += 15;
    else if (s.avg_client_size_m >= 3) clientQuality += 10;
    else if (s.avg_client_size_m >= 1.5) clientQuality += 5;

    if (s.top_3_concentration_pct <= 30) clientQuality += 15;
    else if (s.top_3_concentration_pct <= 45) clientQuality += 5;
    else clientQuality -= 10;

    // Regulatory Score (0-100)
    let regulatory = 40;
    const tier1Centres = ['Geneva', 'Zurich', 'London', 'Luxembourg', 'Singapore'];
    const hasTier1 = s.booking_centres.some(c => tier1Centres.includes(c));
    if (hasTier1) regulatory += 20;
    if (s.booking_centres.length >= 3) regulatory += 15;
    else if (s.booking_centres.length >= 2) regulatory += 10;

    if (s.cross_border_licenses === 3) regulatory += 20;
    else if (s.cross_border_licenses === 2) regulatory += 10;
    else if (s.cross_border_licenses === 1) regulatory += 5;

    if (s.kyc_portability === 3) regulatory += 15;
    else if (s.kyc_portability === 2) regulatory += 10;
    else if (s.kyc_portability === 1) regulatory += 5;

    // Product Dependency Score (0-100, lower dependency = higher score)
    let productDep = 60;
    const hasLending = s.primary_products.some(p => p.includes('Lending'));
    const hasAlts = s.primary_products.some(p => 
      p.includes('Private Equity') || p.includes('Hedge') || p.includes('Real Estate')
    );
    
    if (hasLending && s.lending_exposure_m > s.total_aum_m * 0.3) productDep -= 20;
    else if (hasLending) productDep += 10;

    if (hasAlts) productDep += 10;
    if (s.dpm_aum_pct >= 40) productDep += 15;
    if (s.advisory_aum_pct >= 30) productDep += 10;

    // Relationship Strength Score (0-100)
    let relationship = 50;
    if (s.avg_relationship_years >= 10) relationship += 20;
    else if (s.avg_relationship_years >= 7) relationship += 15;
    else if (s.avg_relationship_years >= 5) relationship += 10;

    if (s.clients_known_personally_pct >= 80) relationship += 15;
    else if (s.clients_known_personally_pct >= 60) relationship += 10;

    if (s.multi_generational_pct >= 40) relationship += 10;
    else if (s.multi_generational_pct >= 25) relationship += 5;

    if (s.client_referral_rate_pct >= 20) relationship += 15;
    else if (s.client_referral_rate_pct >= 10) relationship += 10;

    return {
      client_quality: Math.max(0, Math.min(100, Math.round(clientQuality))),
      regulatory: Math.max(0, Math.min(100, Math.round(regulatory))),
      product_dependency: Math.max(0, Math.min(100, Math.round(productDep))),
      relationship_strength: Math.max(0, Math.min(100, Math.round(relationship))),
    };
  }, [state]);

  // Overall Score (weighted average)
  const overallScore = useMemo(() => {
    return Math.round(
      dimensions.client_quality * 0.30 +
      dimensions.regulatory * 0.25 +
      dimensions.product_dependency * 0.20 +
      dimensions.relationship_strength * 0.25
    );
  }, [dimensions]);

  // Risk Flags
  const riskFlags = useMemo(() => {
    const flags: string[] = [];
    const s = state;

    if (s.inherited_book_pct > 50) flags.push('High inherited book (>50%) - attrition risk');
    if (s.top_3_concentration_pct > 50) flags.push('Top-3 concentration >50% - high dependency risk');
    if (s.booking_centres.length === 0) flags.push('No booking centres selected - limited portability');
    if (s.cross_border_licenses === 0) flags.push('No cross-border licenses - domestic market only');
    if (s.avg_client_size_m < 2) flags.push('Low avg client size (<2M) - may indicate mass affluent segment');
    if (s.kyc_portability <= 1) flags.push('Poor KYC portability - onboarding delays expected');
    if (s.avg_relationship_years < 3) flags.push('Short relationships (<3 years) - weak loyalty indicator');
    if (s.lending_exposure_m > s.total_aum_m * 0.4) flags.push('High lending exposure (>40% AUM) - platform dependency');

    return flags;
  }, [state]);

  // Recommendations
  const recommendations = useMemo(() => {
    const recs: string[] = [];
    const s = state;

    if (s.self_acquired_pct < 70) recs.push('Build self-acquired book to 70%+ for stronger portability');
    if (s.booking_centres.length < 2) recs.push('Add Tier-1 booking centres (Geneva, London, Singapore, Luxembourg)');
    if (s.cross_border_licenses < 2) recs.push('Obtain multi-jurisdiction licenses for broader market access');
    if (s.top_3_concentration_pct > 45) recs.push('Diversify client base - target top-3 <45% of AUM');
    if (s.kyc_portability < 2) recs.push('Standardize CRS/FATCA/MiFID documentation for reusability');
    if (s.clients_known_personally_pct < 70) recs.push('Strengthen personal relationships with key clients');
    if (!s.primary_products.some(p => p.includes('DPM'))) recs.push('Consider adding DPM capability for stickiness');
    if (s.client_referral_rate_pct < 10) recs.push('Build referral engine - target 10%+ annual referral rate');

    return recs;
  }, [state]);

  // Verdict
  const verdict = useMemo(() => {
    if (overallScore >= 75) return '🟢 Excellent Portability';
    if (overallScore >= 60) return '🟡 Good Portability';
    if (overallScore >= 40) return '🟠 Moderate Portability';
    return '🔴 Limited Portability';
  }, [overallScore]);

  // Update store with results
  useEffect(() => {
    state.set({
      score: overallScore,
      portability_dimensions: dimensions,
      risk_flags: riskFlags,
      recommendations: recommendations,
    });
  }, [overallScore, dimensions, riskFlags, recommendations]);

  // Email gate handler
  const handleEmailSubmit = async (email: string) => {
    try {
      const response = await fetch("/api/tool-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          tool_name: "portability",
          score: overallScore,
          input_data: state,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setUserEmail(email);
      setShowEmailGate(false);
      
      // Trigger PDF generation
      setTimeout(() => generatePDF(), 100);
    } catch (error) {
      console.error("Error submitting email:", error);
      throw error;
    }
  };

  // PDF Generation
  async function generatePDF() {
    if (!userEmail) {
      setShowEmailGate(true);
      return;
    }

    try {
      setSaving(true);

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

      pdf.setTextColor(30);
      pdf.setFontSize(14);
      pdf.text('Portability Readiness Diagnostic', 30, 40);

      // Watermark
      const anyPdf = pdf as any;
      try {
        if (anyPdf.GState && anyPdf.setGState) {
          pdf.saveGraphicsState();
          pdf.setGState(new anyPdf.GState({ opacity: 0.08 }));
          pdf.setFontSize(48);
          pdf.setTextColor(30);
          pdf.text('Executive Partners', pageW / 2, pageH / 2, { align: 'center', angle: 30 });
          pdf.restoreGraphicsState();
        }
      } catch {}

      const imgW = pageW - 60;
      const imgH = (canvas.height / canvas.width) * imgW;
      pdf.addImage(imgData, 'PNG', 30, 60, imgW, imgH, undefined, 'FAST');

      const fname = `EP_Portability_${(state.candidate_name || 'Diagnostic').replace(/\s+/g,'_')}.pdf`;
      pdf.save(fname);
    } catch (e) {
      console.error(e);
      alert('Sorry, PDF generation failed. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold text-white">5️⃣ Portability Analysis</h2>

      {/* PDF Snapshot Area */}
      <div ref={pdfRef} className="space-y-6">
        {/* Overall Score */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="text-white font-semibold text-lg">
            {verdict} <span className="text-white/60">({overallScore}/100)</span>
          </div>
          <Bar value={overallScore} />

          {/* Dimensional Breakdown */}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/80">Client Quality</span>
                <span className="text-white font-semibold">{dimensions.client_quality}/100</span>
              </div>
              <Bar value={dimensions.client_quality} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/80">Regulatory Infrastructure</span>
                <span className="text-white font-semibold">{dimensions.regulatory}/100</span>
              </div>
              <Bar value={dimensions.regulatory} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/80">Product Independence</span>
                <span className="text-white font-semibold">{dimensions.product_dependency}/100</span>
              </div>
              <Bar value={dimensions.product_dependency} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/80">Relationship Strength</span>
                <span className="text-white font-semibold">{dimensions.relationship_strength}/100</span>
              </div>
              <Bar value={dimensions.relationship_strength} />
            </div>
          </div>
        </div>

        {/* Risk Flags */}
        {riskFlags.length > 0 && (
          <div className="rounded-2xl border border-rose-400/30 bg-rose-400/10 p-4">
            <div className="font-semibold text-white mb-2">⚠️ Risk Flags</div>
            <ul className="list-disc ml-5 space-y-1 text-sm text-white/80">
              {riskFlags.map((flag, i) => (
                <li key={i}>{flag}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommendations */}
        <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4">
          <div className="font-semibold text-white mb-2">💡 Recommendations</div>
          <ul className="list-disc ml-5 space-y-1 text-sm text-white/80">
            {recommendations.length > 0 ? (
              recommendations.map((rec, i) => <li key={i}>{rec}</li>)
            ) : (
              <li>Excellent setup - maintain current standards</li>
            )}
          </ul>
        </div>

        {/* Key Metrics Summary */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="font-semibold text-white mb-3">📊 Key Metrics</div>
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-white/70">Total AUM:</span>
              <span className="text-white font-semibold">{state.total_aum_m}M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Clients:</span>
              <span className="text-white font-semibold">{state.number_clients}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Self-Acquired:</span>
              <span className="text-white font-semibold">{state.self_acquired_pct}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Booking Centres:</span>
              <span className="text-white font-semibold">{state.booking_centres.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Avg Relationship:</span>
              <span className="text-white font-semibold">{state.avg_relationship_years} years</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => !userEmail ? setShowEmailGate(true) : generatePDF()}
          disabled={saving}
          className="inline-flex items-center rounded-xl bg-white text-[#0B0E13] px-6 py-3 text-sm font-semibold hover:bg-white/90 disabled:opacity-60"
        >
          {saving ? 'Generating PDF...' : 'Download Full Analysis PDF'}
        </button>
      </div>

      <EmailGateModal
        isOpen={showEmailGate}
        onClose={() => setShowEmailGate(false)}
        onSubmit={handleEmailSubmit}
        score={overallScore}
        toolName="portability"
      />
    </section>
  );
}