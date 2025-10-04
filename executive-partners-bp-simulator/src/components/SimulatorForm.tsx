"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { computeScore, type SimulatorInput } from "@/lib/score";

const MARKETS = [
  { id: "uae_dubai", label: "Dubai (UAE)" },
  { id: "ch_geneva", label: "Geneva (CH)" },
  { id: "ch_zurich", label: "Zurich (CH)" },
  { id: "sg_singapore", label: "Singapore (SG)" },
  { id: "uk_london", label: "London (UK)" },
  { id: "us_newyork", label: "New York (US)" },
];

const BOOKING_CENTRES = [
  "Dubai (DIFC)",
  "Geneva",
  "Zurich",
  "Singapore",
  "London",
  "New York",
];

const LOCAL_KEY = "bp-simulator-v1";

type SaveState = "idle" | "saving" | "saved" | "error";

export default function SimulatorForm() {
  const [data, setData] = useState<SimulatorInput>(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem(LOCAL_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return {
      marketId: "uae_dubai",
      bookingCentres: ["Dubai (DIFC)"],
      aumMix: 3,
      crossBorderLicenses: 1,
      productScope: 2,
      clientConcentration: 2,
      kycPortability: 2,
    };
  });

  const [saveState, setSaveState] = useState<SaveState>("idle");
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-save to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
    }
  }, [data]);

  const score = useMemo(() => computeScore(data), [data]);

  const onToggleCentre = (label: string) => {
    setData((d) => {
      const has = d.bookingCentres.includes(label);
      const next = has
        ? d.bookingCentres.filter((c) => c !== label)
        : [...d.bookingCentres, label];
      return { ...d, bookingCentres: next };
    });
  };

  const saveToBackend = async () => {
    setSaveState("saving");
    try {
      const res = await fetch("/api/save", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ input: data, score }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 1500);
    } catch (e) {
      setSaveState("error");
      setTimeout(() => setSaveState("idle"), 2500);
    }
  };

  const exportPdf = async () => {
    // Only works if you installed jspdf + html2canvas
    try {
      const { jsPDF } = await import("jspdf");
      const html2canvas = (await import("html2canvas")).default;

      const el = containerRef.current!;
      const canvas = await html2canvas(el, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({ unit: "pt", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
      const w = canvas.width * ratio;
      const h = canvas.height * ratio;
      const x = (pageWidth - w) / 2;
      const y = 40;

      pdf.text("Executive Partners – BP Simulator", 40, 24);
      pdf.addImage(imgData, "PNG", x, y, w, h);
      pdf.save("bp-simulator.pdf");
    } catch (e) {
      alert("PDF export requires jspdf & html2canvas to be installed.");
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Business Plan Simulator</h1>
        <p className="text-sm text-neutral-600">
          Fill the fields below to estimate portability strength and readiness.
        </p>
      </div>

      <div
        ref={containerRef}
        className="rounded-2xl border border-neutral-200 p-4 md:p-6 shadow-sm bg-white"
      >
        {/* Top summary */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <div className="text-sm text-neutral-600">Current Score</div>
            <div className="text-4xl font-extrabold">
              {score}
              <span className="ml-2 text-lg font-medium text-neutral-500">/100</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={[
                "inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold",
                score >= 75
                  ? "bg-green-100 text-green-700"
                  : score >= 55
                  ? "bg-amber-100 text-amber-700"
                  : "bg-red-100 text-red-700",
              ].join(" ")}
            >
              {score >= 75 ? "Green light" : score >= 55 ? "Amber" : "Red"}
            </span>

            <button
              type="button"
              onClick={saveToBackend}
              className="rounded-lg border px-3 py-1.5 text-sm hover:bg-neutral-50"
            >
              {saveState === "saving"
                ? "Saving…"
                : saveState === "saved"
                ? "Saved ✓"
                : saveState === "error"
                ? "Error"
                : "Save"}
            </button>

            {hasPdfDeps() && (
              <button
                type="button"
                onClick={exportPdf}
                className="rounded-lg bg-black text-white px-3 py-1.5 text-sm hover:bg-neutral-800"
              >
                Export PDF
              </button>
            )}
          </div>
        </div>

        {/* Form grid */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-semibold">Home Market</span>
              <select
                className="mt-1 w-full rounded-lg border px-3 py-2"
                value={data.marketId}
                onChange={(e) =>
                  setData((d) => ({ ...d, marketId: e.target.value }))
                }
              >
                {MARKETS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label}
                  </option>
                ))}
              </select>
            </label>

            <fieldset>
              <legend className="text-sm font-semibold">Booking Centres</legend>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {BOOKING_CENTRES.map((c) => (
                  <label key={c} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="size-4"
                      checked={data.bookingCentres.includes(c)}
                      onChange={() => onToggleCentre(c)}
                    />
                    {c}
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="block">
              <span className="text-sm font-semibold">AUM Mix</span>
              <select
                className="mt-1 w-full rounded-lg border px-3 py-2"
                value={data.aumMix}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    aumMix: Number(e.target.value) as SimulatorInput["aumMix"],
                  }))
                }
              >
                <option value={1}>1 — Mostly small tickets (&lt;$1m)</option>
                <option value={2}>2</option>
                <option value={3}>3 — Balanced</option>
                <option value={4}>4</option>
                <option value={5}>5 — Mostly large (&gt;$10m)</option>
              </select>
            </label>
          </div>

          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-semibold">Cross-border Licenses</span>
              <input
                type="number"
                min={0}
                max={4}
                className="mt-1 w-full rounded-lg border px-3 py-2"
                value={data.crossBorderLicenses}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    crossBorderLicenses: Math.max(
                      0,
                      Math.min(4, Number(e.target.value))
                    ) as SimulatorInput["crossBorderLicenses"],
                  }))
                }
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold">Product Scope</span>
              <input
                type="range"
                min={1}
                max={5}
                value={data.productScope}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    productScope: Number(e.target.value) as SimulatorInput["productScope"],
                  }))
                }
                className="w-full"
              />
              <div className="text-xs text-neutral-600 mt-1">
                {data.productScope} / 5
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-semibold">Client Concentration</span>
              <select
                className="mt-1 w-full rounded-lg border px-3 py-2"
                value={data.clientConcentration}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    clientConcentration: Number(
                      e.target.value
                    ) as SimulatorInput["clientConcentration"],
                  }))
                }
              >
                <option value={1}>1 — Low (diversified)</option>
                <option value={2}>2 — Moderate</option>
                <option value={3}>3 — High (few key clients)</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-semibold">KYC Portability</span>
              <select
                className="mt-1 w-full rounded-lg border px-3 py-2"
                value={data.kycPortability}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    kycPortability: Number(e.target.value) as SimulatorInput["kycPortability"],
                  }))
                }
              >
                <option value={1}>1 — Weak</option>
                <option value={2}>2 — Adequate</option>
                <option value={3}>3 — Excellent</option>
              </select>
            </label>
          </div>
        </div>

        {/* Mini insights */}
        <div className="mt-6 rounded-xl border p-4 bg-neutral-50 text-sm">
          <div className="font-semibold mb-2">Insights</div>
          <ul className="list-disc pl-5 space-y-1">
            {data.bookingCentres.length < 2 && (
              <li>
                Add a second booking centre to improve portability across jurisdictions.
              </li>
            )}
            {data.clientConcentration > 1 && (
              <li>
                Lower client concentration reduces transition risk and improves the score.
              </li>
            )}
            {data.crossBorderLicenses < 2 && (
              <li>
                Additional cross-border coverage typically unlocks more AUM portability.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

function hasPdfDeps() {
  // crude check so the button only shows if libs are installed
  try {
    require.resolve?.("jspdf");
    require.resolve?.("html2canvas");
    return true;
  } catch {
    return false;
  }
}