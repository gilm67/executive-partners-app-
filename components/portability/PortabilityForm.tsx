'use client';

'use client';

"use client";

import { useMemo, useRef, useState } from "react";
import { MARKETS, REGION_ORDER, BOOKING_CENTRES } from "@/lib/portability/config";
import HelpTip from "./HelpTip";

/* -------- value labels -------- */
const aumLabel      = (n:number)=>({1:"Highly concentrated",2:"Moderately concentrated",3:"Balanced",4:"Diversified",5:"Well diversified"} as const)[n] ?? "";
const concLabel     = (n:number)=>({1:"Very diversified",2:"Diversified",3:"Balanced",4:"Concentrated",5:"Top-heavy"} as const)[n] ?? "";
const productLabel  = (n:number)=>({1:"Advisory only",2:"Advisory + DPM",3:"Advisory/DPM + Lending",4:"Advisory/DPM + Lending + Alternatives"} as const)[n] ?? "";
const licenseLabel  = (n:number)=>({0:"None / onshore only",1:"Limited outbound",2:"Multi-jurisdiction",3:"Robust multi-jurisdiction"} as const)[n] ?? "";
const kycLabel      = (n:number)=>({0:"No reuse",1:"Partial reuse",2:"Good reuse",3:"Near full reuse"} as const)[n] ?? "";

/* -------- Result type -------- */
type Result = { 
  score: number; 
  median: number; 
  topQuartile: number; 
  recs: string[]; 
  interpretation?: string[]; // canonical
  interp?: string[];         // legacy alias
};

/* -------- Section with tooltip -------- */
function Section({ title, subtitle, tip, children }:{
  title:string; subtitle?:string; tip?:string; children:React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium text-neutral-100">
        <span>{title}</span>
        {tip && <HelpTip content={tip} />}
      </div>
      {subtitle && <div className="text-xs text-neutral-400">{subtitle}</div>}
      {children}
    </div>
  );
}

/* -------- Chip component -------- */
function Chip({ label, selected, onClick }:{
  label:string; selected:boolean; onClick:()=>void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "group flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition",
        selected
          ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/15"
          : "border-white/10 bg-white/[0.03] text-neutral-200 hover:bg-white/[0.06]",
      ].join(" ")}
    >
      <span className="truncate">{label}</span>
      <span className={["h-4 w-4 rounded-sm border transition", selected ? "border-emerald-400 bg-emerald-500/80" : "border-white/20"].join(" ")} />
    </button>
  );
}

/* -------- contextual next steps -------- */
function localNextSteps(payload: any, score?: number): string[] {
  const steps: string[] = [];
  const i = payload?.inputs || {};
  const centres: string[] = payload?.bookingCentres || [];
  const tier1 = ["Geneva","Zurich","London","Luxembourg","Singapore","New York"];

  const hasTier1 = centres.some(c =>
    tier1.some(t => c.toLowerCase().includes(t.toLowerCase()))
  );

  if (centres.length === 0) {
    steps.push("Add at least one booking centre to assess portability.");
  } else if (hasTier1) {
    steps.push("Booking centres include Tier-1 hubs — coverage is already widely accepted.");
  } else {
    steps.push("Add a Tier-1 hub (e.g., London, Luxembourg, Singapore) to widen custodian matches.");
  }

  if ((i.aumMix ?? 3) <= 2) {
    steps.push("Broaden AUM mix to reduce perceived platform risk.");
  }
  if ((i.clientConcentration ?? 3) >= 4) {
    steps.push("Reduce top-client concentration below ~40% of AUM to de-risk portability.");
  }

  const lic = i.crossBorderLicenses ?? 0;
  if (lic === 0) steps.push("No outbound permissions — portability limited outside domestic market.");
  else if (lic === 1) steps.push("Limited outbound permissions — verify key target jurisdictions.");

  const prod = i.productScope ?? 2;
  if (prod <= 2) steps.push("Consider enabling Lending and Alternatives for a more competitive platform.");

  const k = i.kycPortability ?? 1;
  if (k <= 1) steps.push("Standardize CRS/FATCA + MiFID/LSFin packs for reuse across custodians.");

  return steps;
}

/* -------- Main form -------- */
export default function PortabilityForm() {
  const [marketId, setMarketId] = useState("ch_geneva");
  const [booking, setBooking] = useState<string[]>(["Geneva","Zurich"]);
  const [touchedBooking, setTouchedBooking] = useState(false);
  const [licenses, setLicenses] = useState(1);
  const [aumMix, setAumMix] = useState(3);
  const [product, setProduct] = useState(2);
  const [concentration, setConcentration] = useState(3);
  const [kyc, setKyc] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [result, setResult] = useState<Result|null>(null);

  const market  = useMemo(()=> MARKETS.find(m=>m.id===marketId), [marketId]);
  const grouped = useMemo(()=> REGION_ORDER.map(r=>({region:r, items: MARKETS.filter(m=>m.region===r)})), []);

  const pendingReq = useRef<AbortController|null>(null);

  function toggleCentre(c:string){
    setTouchedBooking(true);
    setBooking(prev => prev.includes(c) ? prev.filter(x=>x!==c) : [...prev, c]);
  }

  async function analyze(){
    if (!booking.length) { setError("Select at least one booking centre."); setResult(null); return; }
    if (pendingReq.current) pendingReq.current.abort();
    const controller = new AbortController(); pendingReq.current = controller;

    setLoading(true); setError(null);
    try {
      const payload = {
        marketId,
        bookingCentres: booking,
        aumMix,
        crossBorderLicenses: licenses,
        productScope: product,
        clientConcentration: concentration,
        kycPortability: kyc,
      };
      const res = await fetch("/api/portability/analyze", {
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify(payload), signal: controller.signal
      });
      if (!res.ok) throw new Error(`Analyze failed (${res.status})`);
      const data = await res.json();
      setResult({ 
        score: data.score, 
        median: data.benchmark.median, 
        topQuartile: data.benchmark.topQuartile, 
        recs: localNextSteps(payload, data.score),
        interpretation: data.interpretation ?? data.interp, // normalize here
      });
    } catch (e:any) {
      if (e.name !== "AbortError") { setError(e?.message || "Something went wrong. Please try again."); setResult(null); }
    } finally { setLoading(false); }
  }

  function openPrefilledEmail() {
    const subj = encodeURIComponent("Map my booking-centre options");
    const lines = [
      `Market: ${market?.label ?? "-"}`,
      `Booking centres: ${booking.join(", ") || "-"}`,
      result
        ? `Score: ${result.score}/100 (Median ${result.median} • Top quartile ${result.topQuartile})`
        : "Score: (not calculated yet)",
      "—",
      "Please advise optimal custodians and onboarding path."
    ];
    const body = encodeURIComponent(lines.filter(Boolean).join("\n"));
    window.location.href = `mailto:info@execpartners.ch?subject=${subj}&body=${body}`;
  }

  async function downloadDossier() {
    try {
      const payload:any = {
        marketLabel: market?.label,
        bookingCentres: booking,
        inputs: { aumMix, crossBorderLicenses: licenses, productScope: product, clientConcentration: concentration, kycPortability: kyc },
      };
      if (result) {
        payload.score = result.score;
        payload.benchmark = { median: result.median, topQuartile: result.topQuartile };
        payload.recommendations = result.recs;
        if (result.interpretation) payload.interpretation = result.interpretation;
      }
      const res = await fetch("/api/portability/export", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(`Export failed (${res.status})`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Executive-Partners_Portability-Dossier.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert("Sorry, failed to generate the PDF. Please try again.");
    }
  }

  return (
    <div className="container-ep">
      {/* ...inputs UI unchanged... */}

      {result && (
        <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">Result</div>
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm">{market?.label}</div>
          </div>
          <div className="mt-3 text-3xl font-semibold">{result.score}/100</div>
          <div className="mt-1 text-sm text-neutral-300">Benchmark — Median {result.median} • Top quartile {result.topQuartile}</div>
          
          <div className="mt-4 text-sm font-semibold">Recommended next steps</div>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-neutral-200">
            {result.recs.map((r,i)=>(<li key={i}>{r}</li>))}
          </ul>

          {result.interpretation && result.interpretation.length > 0 && (
            <div className="mt-5">
              <div className="text-sm font-semibold mb-2">Interpretation & banker guidance</div>
              <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-200">
                {result.interpretation.map((t, i) => (<li key={i}>{t}</li>))}
              </ul>
            </div>
          )}

          <div className="mt-4 flex gap-3">
            <button type="button" onClick={openPrefilledEmail}
              className="rounded-lg border border-white/15 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/[0.07]">
              Map my booking-centre options
            </button>
            <button type="button" onClick={downloadDossier}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
              Get my bank-ready dossier
            </button>
          </div>
        </div>
      )}

      <p className="mt-5 text-xs text-neutral-400">Privacy: We do not store any data without your explicit consent.</p>
    </div>
  );
}