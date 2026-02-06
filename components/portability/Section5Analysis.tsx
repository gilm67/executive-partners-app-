"use client";

import { useMemo, useRef, useState, useCallback } from "react";
import EmailGateModal from "@/components/EmailGateModal";
import { usePortability } from "./store";

/* =======================
   TYPES
======================= */
type PdfMode = "full" | "anon";

/* =======================
   UI HELPERS
======================= */
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

/* =======================
   MAIN COMPONENT
======================= */
export default function Section5Analysis() {
  /* ---------- STORE ---------- */
  const candidate_name = usePortability((s) => s.candidate_name);

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

  /* ---------- LOCAL STATE ---------- */
  const pdfRef = useRef<HTMLDivElement>(null);
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  /* =======================
     SCORE CALCULATION
  ======================= */
  const dimensions = useMemo(() => {
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

    let regulatory = 40;
    const tier1 = ["Geneva", "Zurich", "London", "Luxembourg", "Singapore"];
    if (booking_centres.some((c) => tier1.includes(c))) regulatory += 20;
    if (booking_centres.length >= 3) regulatory += 15;
    else if (booking_centres.length >= 2) regulatory += 10;

    if (cross_border_licenses === 3) regulatory += 20;
    else if (cross_border_licenses === 2) regulatory += 10;
    else if (cross_border_licenses === 1) regulatory += 5;

    if (kyc_portability === 3) regulatory += 15;
    else if (kyc_portability === 2) regulatory += 10;
    else if (kyc_portability === 1) regulatory += 5;

    let productDep = 60;
    const hasLending = primary_products.some((p) => p.includes("Lending"));
    const hasAlts = primary_products.some(
      (p) => p.includes("Private Equity") || p.includes("Hedge") || p.includes("Real Estate")
    );

    if (hasLending && total_aum_m > 0 && lending_exposure_m > total_aum_m * 0.3) productDep -= 20;
    else if (hasLending) productDep += 10;

    if (hasAlts) productDep += 10;
    if (dpm_aum_pct >= 40) productDep += 15;
    if (advisory_aum_pct >= 30) productDep += 10;

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

  const overallScore = useMemo(
    () =>
      clamp100(
        dimensions.client_quality * 0.3 +
          dimensions.regulatory * 0.25 +
          dimensions.product_dependency * 0.2 +
          dimensions.relationship_strength * 0.25
      ),
    [dimensions]
  );

  const verdict =
    overallScore >= 75
      ? "🟢 Excellent Portability"
      : overallScore >= 60
      ? "🟡 Good Portability"
      : overallScore >= 40
      ? "🟠 Moderate Portability"
      : "🔴 Limited Portability";

  /* =======================
     TRACK DOWNLOAD EVENT
  ======================= */
  const logDownload = useCallback(
    (mode: PdfMode) => {
      // Non-blocking: never break PDF generation
      fetch("/api/tool-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: mode === "full" ? userEmail : null,
          tool_name: "portability",
          download_type: mode,
          score: overallScore,
          market: booking_centres?.[0] ?? null,
          total_aum_m: typeof total_aum_m === "number" ? total_aum_m : null,
          self_acquired_pct: typeof self_acquired_pct === "number" ? self_acquired_pct : null,
        }),
      }).catch(() => {});
    },
    [userEmail, overallScore, booking_centres, total_aum_m, self_acquired_pct]
  );

  /* =======================
     PDF GENERATION
  ======================= */
  const generatePDF = useCallback(
    async (mode: PdfMode) => {
      if (mode === "full" && !userEmail) {
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

        const canvas = await html2canvas(node, {
          scale: 2,
          backgroundColor: "#0B0E13",
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({ unit: "pt", format: "a4" });
        const pageW = pdf.internal.pageSize.getWidth();
        const pageH = pdf.internal.pageSize.getHeight();

        /* HEADER */
        pdf.setFontSize(14);
        pdf.setTextColor(30);
        pdf.text("Portability Readiness Diagnostic", 30, 40);

        pdf.setFontSize(10);
        pdf.setTextColor(120);
        pdf.text(
          mode === "anon"
            ? "Anonymized version — for internal bank review only"
            : "Confidential — Candidate diagnostic",
          30,
          58
        );

        /* WATERMARK (ANON) */
        if (mode === "anon") {
          const anyPdf = pdf as any;
          try {
            if (anyPdf.GState && anyPdf.setGState) {
              pdf.saveGraphicsState();
              pdf.setGState(new anyPdf.GState({ opacity: 0.08 }));
              pdf.setFontSize(48);
              pdf.setTextColor(50);
              pdf.text("ANONYMIZED", pageW / 2, pageH / 2, {
                align: "center",
                angle: 30,
              });
              pdf.restoreGraphicsState();
            }
          } catch {}
        }

        /* INTERPRETATION */
        pdf.setFontSize(11);
        pdf.setTextColor(60);
        pdf.text(
          `Score interpretation:\n${
            overallScore >= 75
              ? "Strong transferability across Tier-1 platforms."
              : overallScore >= 60
              ? "Good portability. Selective targeting advised."
              : overallScore >= 40
              ? "Conditional portability. Structuring required."
              : "Limited portability under standard conditions."
          }`,
          30,
          90
        );

        /* DISCLAIMER (optional, but makes it bank-safe) */
        pdf.setFontSize(9);
        pdf.setTextColor(120);
        pdf.text(
          "Disclaimer:\nIndicative and non-binding diagnostic based on declared inputs.\nSubject to onboarding, compliance validation and internal risk approvals.",
          30,
          122
        );

        /* MAIN CONTENT */
        const imgW = pageW - 60;
        const imgH = (canvas.height / canvas.width) * imgW;
        pdf.addImage(imgData, "PNG", 30, 150, imgW, imgH, undefined, "FAST");

        /* LOG DOWNLOAD (non-blocking) */
        logDownload(mode);

        /* SAVE */
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
    [userEmail, overallScore, candidate_name, logDownload]
  );

  /* =======================
     RENDER
  ======================= */
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold text-white">5️⃣ Portability Analysis</h2>

      <div ref={pdfRef} className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold text-white">
            {verdict} <span className="text-white/60">({overallScore}/100)</span>
          </div>
          <Bar value={overallScore} />
        </div>

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
      </div>

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
          Download Anonymized PDF (Banks)
        </button>
      </div>

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