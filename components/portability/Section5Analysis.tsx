"use client";

import { useMemo, useRef, useState, useCallback } from "react";
import EmailGateModal from "@/components/EmailGateModal";
import { usePortability } from "./store";

type PdfMode = "full" | "anon";

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

const clamp100 = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export default function Section5Analysis() {
  /* ---------- STORE ---------- */
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

  /* ---------- LOCAL STATE ---------- */
  const reportRef = useRef<HTMLDivElement>(null);
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [pdfMode, setPdfMode] = useState<PdfMode>("full");

  /* =======================
     SCORE CALCULATION
  ======================= */
  const dimensions = useMemo(() => {
    // Client quality
    let clientQuality = 50;
    if (self_acquired_pct >= 70) clientQuality += 20;
    else if (self_acquired_pct >= 50) clientQuality += 10;
    else clientQuality -= 10;

    if (avg_client_size_m >= 5) clientQuality += 15;
    else if (avg_client_size_m >= 3) clientQuality += 10;
    else if (avg_client_size_m >= 1.5) clientQuality += 5;

    if (top_3_concentration_pct <= 30) clientQuality += 15;
    else if (top_3_concentration_pct <= 45) clientQuality += 5;
    else clientQuality -= 10;

    // Regulatory
    let regulatory = 40;
    const tier1 = ["Geneva", "Zurich", "London", "Luxembourg", "Singapore"];
    if ((booking_centres ?? []).some((c) => tier1.includes(c))) regulatory += 20;

    if ((booking_centres ?? []).length >= 3) regulatory += 15;
    else if ((booking_centres ?? []).length >= 2) regulatory += 10;

    if (cross_border_licenses === 3) regulatory += 20;
    else if (cross_border_licenses === 2) regulatory += 10;
    else if (cross_border_licenses === 1) regulatory += 5;

    if (kyc_portability === 3) regulatory += 15;
    else if (kyc_portability === 2) regulatory += 10;
    else if (kyc_portability === 1) regulatory += 5;

    // Product dependency
    let productDep = 60;
    const products = primary_products ?? [];
    const hasLending = products.some((p) => p.includes("Lending"));
    const hasAlts = products.some(
      (p) => p.includes("Private Equity") || p.includes("Hedge") || p.includes("Real Estate")
    );

    if (hasLending && total_aum_m > 0 && lending_exposure_m > total_aum_m * 0.3) productDep -= 20;
    else if (hasLending) productDep += 10;

    if (hasAlts) productDep += 10;
    if (dpm_aum_pct >= 40) productDep += 15;
    if (advisory_aum_pct >= 30) productDep += 10;

    // Relationship
    let relationship = 50;
    if (avg_relationship_years >= 10) relationship += 20;
    else if (avg_relationship_years >= 7) relationship += 15;
    else if (avg_relationship_years >= 5) relationship += 10;

    if (clients_known_personally_pct >= 80) relationship += 15;
    else if (clients_known_personally_pct >= 60) relationship += 10;

    if (multi_generational_pct >= 40) relationship += 10;
    else if (multi_generational_pct >= 25) relationship += 5;

    if (client_referral_rate_pct >= 20) relationship += 15;
    else if (client_referral_rate_pct >= 10) relationship += 10;

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

  const overallScore = useMemo(() => {
    return clamp100(
      dimensions.client_quality * 0.3 +
        dimensions.regulatory * 0.25 +
        dimensions.product_dependency * 0.2 +
        dimensions.relationship_strength * 0.25
    );
  }, [dimensions]);

  const verdict = useMemo(() => {
    if (overallScore >= 75) return "🟢 Excellent Portability";
    if (overallScore >= 60) return "🟡 Good Portability";
    if (overallScore >= 40) return "🟠 Moderate Portability";
    return "🔴 Limited Portability";
  }, [overallScore]);

  const riskFlags = useMemo(() => {
    const flags: string[] = [];
    if (inherited_book_pct > 50) flags.push("High inherited book (>50%) - attrition risk");
    if (top_3_concentration_pct > 50) flags.push("Top-3 concentration >50% - high dependency risk");
    if ((booking_centres ?? []).length === 0) flags.push("No booking centres selected - limited portability");
    if (cross_border_licenses === 0) flags.push("No cross-border licenses - domestic market only");
    if (avg_client_size_m < 2) flags.push("Low avg client size (<2M) - may indicate mass affluent segment");
    if (kyc_portability <= 1) flags.push("Poor KYC portability - onboarding delays expected");
    if (avg_relationship_years < 3) flags.push("Short relationships (<3 years) - weak loyalty indicator");
    if (total_aum_m > 0 && lending_exposure_m > total_aum_m * 0.4)
      flags.push("High lending exposure (>40% AUM) - platform dependency");
    return flags;
  }, [
    inherited_book_pct,
    top_3_concentration_pct,
    booking_centres,
    cross_border_licenses,
    avg_client_size_m,
    kyc_portability,
    avg_relationship_years,
    total_aum_m,
    lending_exposure_m,
  ]);

  const recommendations = useMemo(() => {
    const recs: string[] = [];
    const centres = booking_centres ?? [];
    const products = primary_products ?? [];

    if (self_acquired_pct < 70) recs.push("Build self-acquired book to 70%+ for stronger portability");
    if (centres.length < 2) recs.push("Add Tier-1 booking centres (Geneva, London, Singapore, Luxembourg)");
    if (cross_border_licenses < 2) recs.push("Obtain multi-jurisdiction licenses for broader market access");
    if (top_3_concentration_pct > 45) recs.push("Diversify client base - target top-3 <45% of AUM");
    if (kyc_portability < 2) recs.push("Standardize CRS/FATCA/MiFID documentation for reusability");
    if (clients_known_personally_pct < 70) recs.push("Strengthen personal relationships with key clients");
    if (!products.some((p) => p.includes("DPM"))) recs.push("Consider adding DPM capability for stickiness");
    if (client_referral_rate_pct < 10) recs.push("Build referral engine - target 10%+ annual referral rate");

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

  /* =======================
     TRACK DOWNLOAD (non-blocking)
  ======================= */
  const logDownload = useCallback(
    (mode: PdfMode) => {
      fetch("/api/tool-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: mode === "full" ? userEmail : null,
          tool_name: "portability",
          download_type: mode,
          score: overallScore,
          market: (booking_centres ?? [])[0] ?? null,
          total_aum_m: total_aum_m ?? null,
          self_acquired_pct: self_acquired_pct ?? null,
        }),
      }).catch(() => {});
    },
    [userEmail, overallScore, booking_centres, total_aum_m, self_acquired_pct]
  );

  /* =======================
     MULTI-PAGE PDF (FULL REPORT)
  ======================= */
  const generatePDF = useCallback(
    async (mode: PdfMode) => {
      if (mode === "full" && !userEmail) {
        setShowEmailGate(true);
        return;
      }

      setPdfMode(mode);
      // Let React render anon/full differences before screenshot
      await sleep(60);

      const node = reportRef.current;
      if (!node) return;

      try {
        setSaving(true);

        const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
          import("html2canvas"),
          import("jspdf"),
        ]);

        const canvas = await html2canvas(node, {
          scale: 2,
          backgroundColor: "#0B0E13",
          useCORS: true,
          windowWidth: node.scrollWidth,
          windowHeight: node.scrollHeight,
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({ unit: "pt", format: "a4" });

        const pageW = pdf.internal.pageSize.getWidth();
        const pageH = pdf.internal.pageSize.getHeight();

        const margin = 30;
        const headerH = 110; // space for header text
        const contentW = pageW - margin * 2;

        // Scale image to PDF width
        const imgH = (canvas.height * contentW) / canvas.width;

        // Header
        pdf.setFontSize(14);
        pdf.setTextColor(30);
        pdf.text("Portability Readiness Diagnostic", margin, 40);

        pdf.setFontSize(10);
        pdf.setTextColor(120);
        pdf.text(
          mode === "anon"
            ? "Anonymized version — for internal bank review only"
            : "Confidential — Candidate diagnostic",
          margin,
          58
        );

        pdf.setFontSize(9);
        pdf.setTextColor(120);
        pdf.text(
          "Disclaimer: Indicative and non-binding diagnostic based on declared inputs. Subject to onboarding, compliance validation and internal risk approvals.",
          margin,
          78,
          { maxWidth: contentW }
        );

        // Watermark for anonymized
        if (mode === "anon") {
          const anyPdf = pdf as any;
          try {
            if (anyPdf.GState && anyPdf.setGState) {
              pdf.saveGraphicsState();
              pdf.setGState(new anyPdf.GState({ opacity: 0.08 }));
              pdf.setFontSize(56);
              pdf.setTextColor(40);
              pdf.text("ANONYMIZED", pageW / 2, pageH / 2, { align: "center", angle: 30 });
              pdf.restoreGraphicsState();
            }
          } catch {}
        }

        // Multi-page image placement
        // We draw the same big image with negative y offsets for subsequent pages
        let y = headerH;
        pdf.addImage(imgData, "PNG", margin, y, contentW, imgH, undefined, "FAST");

        let remaining = imgH - (pageH - y - margin);
        let pageIndex = 1;

        while (remaining > 0) {
          pdf.addPage();
          // Reapply watermark on additional pages (anon)
          if (mode === "anon") {
            const anyPdf = pdf as any;
            try {
              if (anyPdf.GState && anyPdf.setGState) {
                pdf.saveGraphicsState();
                pdf.setGState(new anyPdf.GState({ opacity: 0.08 }));
                pdf.setFontSize(56);
                pdf.setTextColor(40);
                pdf.text("ANONYMIZED", pageW / 2, pageH / 2, { align: "center", angle: 30 });
                pdf.restoreGraphicsState();
              }
            } catch {}
          }

          const offsetY = headerH - pageIndex * (pageH - margin);
          pdf.addImage(imgData, "PNG", margin, offsetY, contentW, imgH, undefined, "FAST");
          remaining -= pageH - margin;
          pageIndex += 1;
        }

        // Log event (non-blocking)
        logDownload(mode);

        pdf.save(
          mode === "anon"
            ? "EP_Portability_Anonymized.pdf"
            : `EP_Portability_${(candidate_name || "Diagnostic").replace(/\s+/g, "_")}.pdf`
        );
      } catch (e) {
        console.error(e);
        alert("PDF generation failed. Please try again.");
      } finally {
        setSaving(false);
      }
    },
    [userEmail, candidate_name, logDownload]
  );

  /* =======================
     RENDER
  ======================= */
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold text-white">5️⃣ Portability Analysis</h2>

      {/* ======= FULL REPORT AREA (THIS is what we print) ======= */}
      <div ref={reportRef} className="space-y-6">
        {/* Summary */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-2">
            <div className="text-lg font-semibold text-white">
              {verdict} <span className="text-white/60">({overallScore}/100)</span>
            </div>

            {/* Show candidate details ONLY in full mode */}
            {pdfMode === "full" && (candidate_name || candidate_email) && (
              <div className="text-sm text-white/70">
                <div>
                  <span className="text-white/50">Candidate:</span>{" "}
                  <span className="text-white/80">{candidate_name || "—"}</span>
                </div>
                <div>
                  <span className="text-white/50">Email:</span>{" "}
                  <span className="text-white/80">{candidate_email || "—"}</span>
                </div>
              </div>
            )}

            <Bar value={overallScore} />
          </div>

          {/* Dimensional breakdown */}
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

        {/* Risk flags */}
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
              <li>Excellent setup — maintain current standards</li>
            )}
          </ul>
        </div>

        {/* Key metrics */}
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
      {/* ======================================================== */}

      {/* ===== Screen-only CTA (NOT inside reportRef) ===== */}
      {overallScore >= 60 && (
        <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4">
          <div className="mb-2 text-sm text-white/80">
            A strong portability score only creates value if translated into a realistic business plan.
          </div>
          <a
            href="/en/bp-simulator?src=portability&prefill=true"
            className="inline-flex rounded-xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-[#0B0E13]"
          >
            Simulate your 3-year business plan →
          </a>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => generatePDF("full")}
          disabled={saving}
          className="inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#0B0E13] disabled:opacity-60"
        >
          {saving ? "Generating…" : "Download Full Analysis PDF"}
        </button>

        <button
          onClick={() => generatePDF("anon")}
          disabled={saving}
          className="inline-flex rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 disabled:opacity-60"
        >
          {saving ? "Generating…" : "Download Anonymized PDF (Banks)"}
        </button>
      </div>

      {/* Email gate */}
      <EmailGateModal
        isOpen={showEmailGate}
        onClose={() => setShowEmailGate(false)}
        onSubmit={async (email) => {
          setUserEmail(email);
          setShowEmailGate(false);
          await generatePDF("full");
        }}
        score={overallScore}
        toolName="portability"
      />
    </section>
  );
}