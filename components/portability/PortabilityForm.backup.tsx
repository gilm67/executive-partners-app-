"use client";

import { useMemo, useRef, useState } from "react";
import { MARKETS, REGION_ORDER, BOOKING_CENTRES } from "@/lib/portability/config";

type Result = { score:number; median:number; topQuartile:number; recs:string[] };

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-neutral-100">{title}</div>
      {subtitle && <div className="field-hint-ep">{subtitle}</div>}
      {children}
    </div>
  );
}

function Chip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
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
      <span
        className={[
          "h-4 w-4 rounded-sm border transition",
          selected ? "border-emerald-400 bg-emerald-500/80" : "border-white/20",
        ].join(" ")}
      />
    </button>
  );
}

export default function PortabilityForm() {
  const [marketId, setMarketId] = useState("ch_geneva");
  const [booking, setBooking] = useState<string[]>(["Geneva", "Zurich"]);
  const [touchedBooking, setTouchedBooking] = useState(false);

  const [aumMix, setAumMix] = useState(3);
  const [licenses, setLicenses] = useState(1);
  const [product, setProduct] = useState(2);
  const [concentration, setConcentration] = useState(3);
  const [kyc, setKyc] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const market = useMemo(() => MARKETS.find((m) => m.id === marketId), [marketId]);
  const grouped = useMemo(
    () => REGION_ORDER.map((r) => ({ region: r, items: MARKETS.filter((m) => m.region === r) })),
    []
  );

  const pendingReq = useRef<AbortController | null>(null);

  function toggleCentre(c: string) {
    setTouchedBooking(true);
    setBooking((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  }

  async function analyze() {
    if (!booking.length) {
      setError("Select at least one booking centre.");
      setResult(null);
      return;
    }
    if (pendingReq.current) pendingReq.current.abort();
    const controller = new AbortController();
    pendingReq.current = controller;

    setLoading(true);
    setError(null);

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
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`Analyze failed (${res.status})`);
      const data = await res.json();
      setResult({
        score: data.score,
        median: data.benchmark.median,
        topQuartile: data.benchmark.topQuartile,
        recs: data.recommendations,
      });
    } catch (e: any) {
      if (e.name !== "AbortError") {
        setError(e?.message || "Something went wrong. Please try again.");
        setResult(null);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-ep">
      <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
        <div className="mb-5">
          <div className="text-xl font-semibold">Portability Readiness Score™</div>
          {market && (
            <p className="mt-1 text-sm text-neutral-300">
              {market.label} · Regulator: {market.regulator || "—"} · {market.notes?.slice(0, 2).join(" · ")}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Market */}
          <Section title="Market">
            <div className="relative">
              <select
                value={marketId}
                onChange={(e) => {
                  const v = e.target.value;
                  setMarketId(v);
                  if (!touchedBooking) {
                    const def = MARKETS.find((m) => m.id === v)?.defaultCentres || [];
                    if (def.length) setBooking(def);
                  }
                }}
                className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-neutral-100 outline-none transition hover:bg-white/[0.06] focus:border-emerald-400"
              >
                {grouped.map((g) => (
                  <optgroup key={g.region} label={g.region}>
                    {g.items.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </Section>

          {/* Booking centres */}
          <Section
            title="Booking centres"
            subtitle="Pick the custodians/centres your clients can use. More options typically increase portability."
          >
            <div className="grid grid-cols-2 gap-2">
              {BOOKING_CENTRES.map((c) => (
                <Chip key={c} label={c} selected={booking.includes(c)} onClick={() => toggleCentre(c)} />
              ))}
            </div>
          </Section>

          {/* Sliders (simple selects for robustness) */}
          <Section title="AUM mix (diversification)">
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              value={aumMix}
              onChange={(e) => setAumMix(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="field-hint-ep">1 = concentrated • 5 = well diversified</div>
          </Section>

          <Section title="Cross-border licenses" subtitle="Jurisdictional permissions (0–3)">
            <input
              type="range"
              min={0}
              max={3}
              step={1}
              value={licenses}
              onChange={(e) => setLicenses(parseInt(e.target.value))}
              className="w-full"
            />
          </Section>

          <Section title="Product scope breadth" subtitle="Advisory/DPM • Lending • Alternatives">
            <input
              type="range"
              min={1}
              max={4}
              step={1}
              value={product}
              onChange={(e) => setProduct(parseInt(e.target.value))}
              className="w-full"
            />
          </Section>

          <Section title="Client concentration (lower is better)">
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              value={concentration}
              onChange={(e) => setConcentration(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="field-hint-ep">1 = diversified • 5 = top-heavy</div>
          </Section>

          <Section title="Compliance / KYC portability" subtitle="CRS/FATCA/MiFID/LSFin pack reuse (0–3)">
            <input
              type="range"
              min={0}
              max={3}
              step={1}
              value={kyc}
              onChange={(e) => setKyc(parseInt(e.target.value))}
              className="w-full"
            />
          </Section>
        </div>

        <div className="mt-4 flex items-center justify-end gap-3">
          {error && <span className="text-xs text-red-400">{error}</span>}
          <button
            onClick={analyze}
            disabled={loading}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading ? "Analyzing…" : "Analyze"}
          </button>
        </div>

        {result && (
          <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">Result</div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm">
                {market?.label}
              </div>
            </div>
            <div className="mt-3 text-3xl font-semibold">{result.score}/100</div>
            <div className="mt-1 text-sm text-neutral-300">
              Benchmark — Median {result.median} • Top quartile {result.topQuartile}
            </div>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-neutral-200">
              {result.recs.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
            <div className="mt-4 flex gap-3">
              <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
                Map my booking-centre options
              </button>
              <button className="rounded-lg border border-white/15 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/[0.07]">
                Get my bank-ready dossier
              </button>
            </div>
          </div>
        )}

        <p className="mt-5 text-xs text-neutral-400">
          Privacy: We do not store any data without your explicit consent.
        </p>
      </div>
    </div>
  );
}
