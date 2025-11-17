"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import PrimaryButton from "@/components/ui/PrimaryButton";

type DimensionKey =
  | "custodian"
  | "aum"
  | "licenses"
  | "product"
  | "concentration"
  | "compliance";

const DIMENSIONS: Array<{
  key: DimensionKey;
  label: string;
  description: string;
}> = [
  {
    key: "custodian",
    label: "Custodian / Booking Centre Footprint",
    description:
      "CH, UK, UAE, SG, HK, US — the more booking centres your clients can follow, the higher your portability.",
  },
  {
    key: "aum",
    label: "AUM Mix & Diversification",
    description:
      "Balanced advisory/DPM/lending books are easier to transfer than highly concentrated or single-product books.",
  },
  {
    key: "licenses",
    label: "Cross-Border Licenses",
    description:
      "FINMA outbound, FCA, DIFC/ADGM, MAS, SFC, plus bank-level permissions enabling compliant servicing.",
  },
  {
    key: "product",
    label: "Product Scope Breadth",
    description:
      "From core PB to structured products, private markets and alternatives — especially relevant for HNWI/UHNW and US/LatAm clients.",
  },
  {
    key: "concentration",
    label: "Client Concentration",
    description:
      "Lower concentration = lower attrition risk when moving from Geneva to Dubai, London to Zurich, or Paris to Lisbon/Madrid.",
  },
  {
    key: "compliance",
    label: "Compliance & KYC Reuse",
    description:
      "CRS, FATCA, MiFID II, LSFin packs that can be reused → shorter onboarding and faster time-to-revenue.",
  },
];

export default function PortabilityClient() {
  const [scores, setScores] = useState<Record<DimensionKey, number>>({
    custodian: 3,
    aum: 3,
    licenses: 2,
    product: 3,
    concentration: 3,
    compliance: 2,
  });

  const captureRef = useRef<HTMLDivElement | null>(null);

  const total = useMemo(() => {
    const vals = Object.values(scores);
    const sum = vals.reduce((acc, v) => acc + v, 0);
    const max = vals.length * 5;
    const pct = Math.round((sum / max) * 100);
    return { sum, max, pct };
  }, [scores]);

  const level =
    total.pct >= 80
      ? "Excellent mobility"
      : total.pct >= 60
      ? "Good mobility"
      : total.pct >= 40
      ? "Moderate mobility"
      : "Limited mobility";

  const handleDownload = async () => {
    if (!captureRef.current) return;
    const element = captureRef.current;

    // slightly enlarge for better quality
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: "#0B0F1A",
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("portability-readiness-report.pdf");
  };

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-6 py-12">
      {/* header + action bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-brandGold/10 px-4 py-1 text-sm text-brandGoldPale ring-1 ring-brandGold/40">
            Executive Partners · Geneva · Global PB &amp; WM
          </p>
          <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            Portability Readiness Score™
          </h1>
          <p className="mt-2 text-gray-200/90">
            Senior private-banking mobility across Switzerland, the UK, UAE,
            Singapore, Hong Kong, New York, Miami, Paris, Lisbon and Madrid.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={handleDownload}
            className="rounded-xl bg-brandGold px-4 py-2 text-sm font-semibold text-black shadow-lg shadow-brandGold/30 hover:bg-brandGoldDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandGold/90 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            Download PDF report
          </button>
          <PrimaryButton href="/en/contact" className="whitespace-nowrap">
            Request diagnostic
          </PrimaryButton>
        </div>
      </div>

      {/* everything below will be in the PDF */}
      <div ref={captureRef} className="space-y-10">
        {/* top section */}
        <div className="flex flex-col gap-10 lg:flex-row">
          {/* LEFT: intro card */}
          <div className="flex-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10"
            >
              <h2 className="text-lg font-semibold text-white">
                What this evaluates
              </h2>
              <p className="text-sm text-gray-300">
                How easily a banker or team can be onboarded and start producing
                revenues in another hub — Geneva, Zurich, London, Dubai,
                Singapore, Hong Kong, New York, Miami or key EU capitals.
              </p>
              <p className="mt-2 text-xs text-gray-400">
                Indicative only — receiving bank&apos;s compliance rules always
                prevail.
              </p>
            </motion.div>

            <p className="text-sm text-gray-300">
              We use six dimensions similar to what leading Swiss and
              international private banks review: booking-centre coverage,
              diversification of book, cross-border permissions, product depth,
              client concentration and reuse of KYC/compliance packs.
            </p>
          </div>

          {/* RIGHT: interactive panel */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md space-y-6 rounded-2xl bg-gradient-to-b from-black/80 via-black/50 to-black/20 p-6 ring-1 ring-brandGold/40"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-300">
                  Overall score
                </p>
                <p className="text-3xl font-bold text-white">{total.pct}%</p>
                <p className="text-xs text-gray-400">{level}</p>
              </div>
              <div className="h-16 w-16 rounded-full bg-brandGold/20 ring-4 ring-brandGold/40" />
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-brandGold/15 px-3 py-1 text-brandGoldPale ring-1 ring-brandGold/50">
                Faster time-to-revenue
              </span>
              <span className="rounded-full border border-brandGold/40 bg-black/40 px-3 py-1 text-brandGoldPale">
                Lower onboarding friction
              </span>
            </div>

            <div className="space-y-4">
              {DIMENSIONS.map((dim) => (
                <div key={dim.key} className="space-y-1">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium text-white">
                      {dim.label}
                    </p>
                    <p className="text-sm text-gray-300">
                      {scores[dim.key]}/5
                    </p>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={scores[dim.key]}
                    onChange={(e) =>
                      setScores((prev) => ({
                        ...prev,
                        [dim.key]: Number(e.target.value),
                      }))
                    }
                    className="w-full accent-brandGold"
                  />
                  <p className="text-[11px] text-gray-400">
                    {dim.description}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-[10px] leading-relaxed text-gray-500">
              Final onboarding depends on the target bank&apos;s compliance, tax,
              immigration and booking-centre rules (FINMA, FCA, DFSA/FSRA, MAS,
              SFC, SEC).
            </p>
          </motion.div>
        </div>

        {/* mobility routes */}
        <section className="space-y-4 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
          <h2 className="text-xl font-semibold text-white">
            Global mobility routes we actively cover
          </h2>
          <p className="text-sm text-gray-300">
            Executive Partners supports senior private-banking moves across
            Swiss, European, Middle Eastern, Asian and US wealth hubs.
          </p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-black/30 p-4 ring-1 ring-white/10">
              <h3 className="text-sm font-semibold text-white">
                Switzerland ↔ UK / EU
              </h3>
              <p className="text-xs text-gray-300">
                Geneva / Zurich to London, Paris, Lisbon, Madrid — driven by
                EU/HNW books, languages and custodian compatibility.
              </p>
            </div>
            <div className="rounded-xl bg-black/30 p-4 ring-1 ring-white/10">
              <h3 className="text-sm font-semibold text-white">
                Switzerland / UK → UAE
              </h3>
              <p className="text-xs text-gray-300">
                Geneva / London to Dubai / Abu Dhabi (DIFC, ADGM) for MENA, NRI
                and East Africa books.
              </p>
            </div>
            <div className="rounded-xl bg-black/30 p-4 ring-1 ring-white/10">
              <h3 className="text-sm font-semibold text-white">
                Europe → US Wealth Hubs
              </h3>
              <p className="text-xs text-gray-300">
                Paris / Madrid / Lisbon to New York or Miami for LatAm/HNW
                coverage, subject to US onboarding.
              </p>
            </div>
            <div className="rounded-xl bg-black/30 p-4 ring-1 ring-white/10">
              <h3 className="text-sm font-semibold text-white">
                Switzerland / UK → Singapore &amp; Hong Kong
              </h3>
              <p className="text-xs text-gray-300">
                For Asia &amp; NRI coverage (MAS / SFC rules, local booking
                centres).
              </p>
            </div>
            <div className="rounded-xl bg-black/30 p-4 ring-1 ring-white/10">
              <h3 className="text-sm font-semibold text-white">
                US (New York / Miami) → Switzerland
              </h3>
              <p className="text-xs text-gray-300">
                For international bankers seeking Swiss platforms for multi-book
                mandates.
              </p>
            </div>
            <div className="rounded-xl bg-black/30 p-4 ring-1 ring-white/10">
              <h3 className="text-sm font-semibold text-white">
                Intra-EU (Paris, Lisbon, Madrid)
              </h3>
              <p className="text-xs text-gray-300">
                For multilingual RMs with Southern European HNW/UHNW books who
                want Swiss/UK umbrella or a Middle East platform.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}