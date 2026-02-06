// components/portability/Section5Analysis.tsx
"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import EmailGateModal from "@/components/EmailGateModal";
import { usePortability } from "./store";

function Bar({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
      <div
        className={`h-full ${
          pct >= 70 ? "bg-emerald-400" : pct >= 40 ? "bg-amber-400" : "bg-rose-400"
        }`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function clamp100(n: number) {
  return Math.max(0, Math.min(100, Math.round(n)));
}

/**
 * IMPORTANT:
 * - We only select the fields we need from the store (prevents unnecessary rerenders).
 * - We never "state.set" derived results on every render.
 */
export default function Section5Analysis() {
  // ✅ Select only needed state fields (Zustand best practice)
  const candidate_name = usePortability((s) => s.candidate_name);
  const candidate_email = usePortability((s) => s.candidate_email);

  const self_acquired_pct = usePortability((s) => s.self_acquired_pct);
  const avg_client_size_m = usePortability((s) => s.avg_client_size_m);
  const top_3_concentration_pct = usePortability((s) => s.top_3_concentration_pct);
  const inherited_book_pct = usePortability((s) => s.inherited_book_pct);

  const booking_centres = usePortability((s) => s.booking_centres);
  const cross_border_licenses = usePortability((s) => s.cross_border_licenses);
  const kyc_portability = usePortability((s) => s.kyc_portability);

  const primary_products = usePortability((s) => s.primary_products);
  const lending_exposure_m = usePortability((s) => s.lending_exposure_m);
  const total_aum_m = usePortability((s) => s.total_aum_m);
  const dpm_aum_pct = usePortability((s) => s.dpm_aum_pct);
  const advisory_aum_pct = usePortability((s) => s.advisory_aum_pct);

  const avg_relationship_years = usePortability((s) => s.avg_relationship_years);
  const clients_known_personally_pct = usePortability((s) => s.clients_known_personally_pct);
  const multi_generational_pct = usePortability((s) => s.multi_generational_pct);
  const client_referral_rate_pct = usePortability((s) => s.client_referral_rate_pct);

  const number_clients = usePortability((s) => s.number_clients);

  const set = usePortability((s) => s.set);

  const pdfRef = useRef<HTMLDivElement>(null);
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // -------- Calculate Multi-Dimensional Scores --------
  const dimensions = useMemo(() => {
    // Client Quality (0-100)
    let clientQuality = 50;
    if ((self_acquired_pct ?? 0) >= 70) clientQuality += 20;
    else if ((self_acquired_pct ?? 0) >= 50) clientQuality += 10;
    else clientQuality -= 10;

    if ((avg_client_size_m ?? 0) >= 5) clientQuality += 15;
    else if ((avg_client_size_m ?? 0) >= 3) clientQuality += 10;
    else if ((avg_client_size_m ?? 0) >= 1.5) clientQuality += 5;

    if ((top_3_concentration_pct ?? 0) <= 30) clientQuality += 15;
    else if ((top_3_concentration_pct ?? 0) <= 45) clientQuality += 5;
    else clientQuality -= 10;

    // Regulatory (0-100)
    let regulatory = 40;
    const tier1Centres = ["Geneva", "Zurich", "London", "Luxembourg", "Singapore"];
    const centres = booking_centres ?? [];
    const hasTier1 = centres.some((c) => tier1Centres.includes(c));
    if (hasTier1) regulatory += 20;

    if (centres.length >= 3) regulatory += 15;
    else if (centres.length >= 2) regulatory += 10;

    if ((cross_border_licenses ?? 0) === 3) regulatory += 20;
    else if ((cross_border_licenses ?? 0) === 2) regulatory += 10;
    else if ((cross_border_licenses ?? 0) === 1) regulatory += 5;

    if ((kyc_portability ?? 0) === 3) regulatory += 15;
    else if ((kyc_portability ?? 0) === 2) regulatory += 10;
    else if ((kyc_portability ?? 0) === 1) regulatory += 5;

    // Product dependency (0-100; lower dependency = higher score)
    let productDep = 60;
    const products = primary_products ?? [];
    const hasLending = products.some((p) => p.includes("Lending"));
    const hasAlts = products.some(
      (p) => p.includes("Private Equity") || p.includes("Hedge") || p.includes("Real Estate")
    );

    const aum = total_aum_m ?? 0;
    const lending = lending_exposure_m ?? 0;
    if (hasLending && aum > 0 && lending > aum * 0.3) productDep -= 20;
    else if (hasLending) productDep += 10;

    if (hasAlts) productDep += 10;
    if ((dpm_aum_pct ?? 0) >= 40) productDep += 15;
    if ((advisory_aum_pct ?? 0) >= 30) productDep += 10;

    // Relationship strength (0-100)
    let relationship = 50;
    const relYears = avg_relationship_years ?? 0;
    if (relYears >= 10) relationship += 20;
    else if (relYears >= 7) relationship += 15;
    else if (relYears >= 5) relationship += 10;

    const knownPct = clients_known_personally_pct ?? 0;
    if (knownPct >= 80) relationship += 15;
    else if (knownPct >= 60) relationship += 10;

    const multiPct = multi_generational_pct ?? 0;
    if (multiPct >= 40) relationship += 10;
    else if (multiPct >= 25) relationship += 5;

    const refPct = client_referral_rate_pct ?? 0;
    if (refPct >= 20) relationship += 15;
    else if (refPct >= 10) relationship += 10;

    return {
      client_quality: clamp100(clientQuality),
      regulatory: clamp100(regulatory),
      product_dependency: clamp100(productDep),
      relationship_strength: clamp100(relationship),
    };
  }, [
    self_acquired_pct,
    avg_client_size_m,
    top_3_concentration_pct,
    booking_centres,
    cross_border_licenses,
    kyc_portability,
    primary_products,
    lending_exposure_m,
    total_aum_m,
    dpm_aum_pct,
    advisory_aum_pct,
    avg_relationship_years,
    clients_known_personally_pct,
    multi_generational_pct,
    client_referral_rate_pct,
  ]);

  // Overall Score (weighted)
  const overallScore = useMemo(() => {
    return clamp100(
      dimensions.client_quality * 0.30 +
        dimensions.regulatory * 0.25 +
        dimensions.product_dependency * 0.20 +
        dimensions.relationship_strength * 0.25
    );
  }, [dimensions]);

  // Risk Flags
  const riskFlags = useMemo(() => {
    const flags: string[] = [];
    const aum = total_aum_m ?? 0;
    const lending = lending_exposure_m ?? 0;
    const centres = booking_centres ?? [];

    if ((inherited_book_pct ?? 0) > 50) flags.push("High inherited book (>50%) - attrition risk");
    if ((top_3_concentration_pct ?? 0) > 50) flags.push("Top-3 concentration >50% - high dependency risk");
    if (centres.length === 0) flags.push("No booking centres selected - limited portability");
    if ((cross_border_licenses ?? 0) === 0) flags.push("No cross-border licenses - domestic market only");
    if ((avg_client_size_m ?? 0) < 2) flags.push("Low avg client size (<2M) - may indicate mass affluent segment");
    if ((kyc_portability ?? 0) <= 1) flags.push("Poor KYC portability - onboarding delays expected");
    if ((avg_relationship_years ?? 0) < 3) flags.push("Short relationships (<3 years) - weak loyalty indicator");
    if (aum > 0 && lending > aum * 0.4) flags.push("High lending exposure (>40% AUM) - platform dependency");

    return flags;
  }, [
    inherited_book_pct,
    top_3_concentration_pct,
    booking_centres,
    cross_border_licenses,
    avg_client_size_m,
    kyc_portability,
    avg_relationship_years,
    lending_exposure_m,
    total_aum_m,
  ]);

  // Recommendations
  const recommendations = useMemo(() => {
    const recs: string[] = [];
    const centres = booking_centres ?? [];
    const products = primary_products ?? [];

    if ((self_acquired_pct ?? 0) < 70) recs.push("Build self-acquired book to 70%+ for stronger portability");
    if (centres.length < 2)
      recs.push("Add Tier-1 booking centres (Geneva, London, Singapore, Luxembourg)");
    if ((cross_border_licenses ?? 0) < 2) recs.push("Obtain multi-jurisdiction licenses for broader market access");
    if ((top_3_concentration_pct ?? 0) > 45) recs.push("Diversify client base - target top-3 <45% of AUM");
    if ((kyc_portability ?? 0) < 2) recs.push("Standardize CRS/FATCA/MiFID documentation for reusability");
    if ((clients_known_personally_pct ?? 0) < 70) recs.push("Strengthen personal relationships with key clients");
    if (!products.some((p) => p.includes("DPM"))) recs.push("Consider adding DPM capability for stickiness");
    if ((client_referral_rate_pct ?? 0) < 10) recs.push("Build referral engine - target 10%+ annual referral rate");

    return recs;
  }, [
    self_acquired_pct,
    booking_centres,
    cross_border_licenses,
    top_3_concentration_pct,
    kyc_portability,
    clients_known_personally_pct,
    primary_products,
    client_referral_rate_pct,
  ]);

  const verdict = useMemo(() => {
    if (overallScore >= 75) return "🟢 Excellent Portability";
    if (overallScore >= 60) return "🟡 Good Portability";
    if (overallScore >= 40) return "🟠 Moderate Portability";
    return "🔴 Limited Portability";
  }, [overallScore]);

  /**
   * ✅ FIX: Prevent infinite loop
   * Only update the store when the derived results actually changed.
   * We keep a small signature of computed outputs.
   */
  const lastSigRef = useRef<string>("");

  useEffect(() => {
    const sig = JSON.stringify({
      overallScore,
      dimensions,
      riskFlags,
      recommendations,
    });

    if (sig === lastSigRef.current) return;
    lastSigRef.current = sig;

    set({
      score: overallScore,
      portability_dimensions: dimensions,
      risk_flags: riskFlags,
      recommendations,
    });
  }, [overallScore, dimensions, riskFlags, recommendations, set]);

  // Email gate handler
  const handleEmailSubmit = async (email: string) => {
    try {
      // ✅ Only send serializable input fields (avoid functions + massive object)
      const input_data = {
        candidate_name,
        candidate_email,
        total_aum_m,
        number_clients,
        self_acquired_pct,
        avg_client_size_m,
        top_3_concentration_pct,
        inherited_book_pct,
        booking_centres,
        cross_border_licenses,
        kyc_portability,
        primary_products,
        lending_exposure_m,
        dpm_aum_pct,
        advisory_aum_pct,
        avg_relationship_years,
        clients_known_personally_pct,
        multi_generational_pct,
        client_referral_rate_pct,
      };

      const response = await fetch("/api/tool-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          tool_name: "portability",
          score: overallScore,
          input_data,
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

  const generatePDF = useCallback(async () => {
    if (!userEmail) {
      setShowEmailGate(true);
      return;
    }

    try {
      setSaving(true);

      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const node = pdfRef.current;
      if (!node) throw new Error("Missing PDF node");

      const canvas = await html2canvas(node, { scale: 2, backgroundColor: "#0B0E13" });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();

      pdf.setTextColor(30);
      pdf.setFontSize(14);
      pdf.text("Portability Readiness Diagnostic", 30, 40);

      // Watermark
      const anyPdf = pdf as any;
      try {
        if (anyPdf.GState && anyPdf.setGState) {
          pdf.saveGraphicsState();
          pdf.setGState(new anyPdf.GState({ opacity: 0.08 }));
          pdf.setFontSize(48);
          pdf.setTextColor(30);
          pdf.text("Executive Partners", pageW / 2, pageH / 2, {
            align: "center",
            angle: 30,
          });
          pdf.restoreGraphicsState();
        }
      } catch {}

      const imgW = pageW - 60;
      const imgH = (canvas.height / canvas.width) * imgW;
      pdf.addImage(imgData, "PNG", 30, 60, imgW, imgH, undefined, "FAST");

      const fname = `EP_Portability_${(candidate_name || "Diagnostic").replace(/\s+/g, "_")}.pdf`;
      pdf.save(fname);
    } catch (e) {
      console.error(e);
      alert("Sorry, PDF generation failed. Please try again.");
    } finally {
      setSaving(false);
    }
  }, [userEmail, candidate_name]);

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold text-white">5️⃣ Portability Analysis</h2>

      {/* PDF Snapshot Area */}
      <div ref={pdfRef} className="space-y-6">
        {/* Overall Score */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold text-white">
            {verdict} <span className="text-white/60">({overallScore}/100)</span>
          </div>

          <Bar value={overallScore} />

          {/* Dimensional Breakdown */}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/80">Client Quality</span>
                <span className="font-semibold text-white">{dimensions.client_quality}/100</span>
              </div>
              <Bar value={dimensions.client_quality} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/80">Regulatory Infrastructure</span>
                <span className="font-semibold text-white">{dimensions.regulatory}/100</span>
              </div>
              <Bar value={dimensions.regulatory} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/80">Product Independence</span>
                <span className="font-semibold text-white">{dimensions.product_dependency}/100</span>
              </div>
              <Bar value={dimensions.product_dependency} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/80">Relationship Strength</span>
                <span className="font-semibold text-white">
                  {dimensions.relationship_strength}/100
                </span>
              </div>
              <Bar value={dimensions.relationship_strength} />
            </div>
          </div>
        </div>

        {/* Risk Flags */}
        {riskFlags.length > 0 && (
          <div className="rounded-2xl border border-rose-400/30 bg-rose-400/10 p-4">
            <div className="mb-2 font-semibold text-white">⚠️ Risk Flags</div>
            <ul className="ml-5 list-disc space-y-1 text-sm text-white/80">
              {riskFlags.map((flag, i) => (
                <li key={i}>{flag}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommendations */}
        <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4">
          <div className="mb-2 font-semibold text-white">💡 Recommendations</div>
          <ul className="ml-5 list-disc space-y-1 text-sm text-white/80">
            {recommendations.length > 0 ? (
              recommendations.map((rec, i) => <li key={i}>{rec}</li>)
            ) : (
              <li>Excellent setup - maintain current standards</li>
            )}
          </ul>
        </div>

        {/* Key Metrics Summary */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="mb-3 font-semibold text-white">📊 Key Metrics</div>
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-white/70">Total AUM:</span>
              <span className="font-semibold text-white">{total_aum_m}M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Clients:</span>
              <span className="font-semibold text-white">{number_clients}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Self-Acquired:</span>
              <span className="font-semibold text-white">{self_acquired_pct}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Booking Centres:</span>
              <span className="font-semibold text-white">{(booking_centres ?? []).length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Avg Relationship:</span>
              <span className="font-semibold text-white">{avg_relationship_years} years</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => (!userEmail ? setShowEmailGate(true) : generatePDF())}
          disabled={saving}
          className="inline-flex items-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#0B0E13] hover:bg-white/90 disabled:opacity-60"
        >
          {saving ? "Generating PDF..." : "Download Full Analysis PDF"}
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