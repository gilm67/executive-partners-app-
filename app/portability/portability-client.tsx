"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import EmailGateModal from "@/components/EmailGateModal";

/** Tiny dependency-free tooltip that works on hover + click (mobile) */
function InfoTip({ id, text }: { id: string; text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-block align-middle">
      <button
        type="button"
        aria-label="More info"
        aria-describedby={id}
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
        className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full border text-xs leading-none text-gray-500 hover:text-gray-700"
      >
        ?
      </button>
      <span
        id={id}
        role="tooltip"
        className={`absolute z-10 mt-2 w-64 rounded-md border bg-white p-2 text-xs text-gray-700 shadow transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onMouseLeave={() => setOpen(false)}
      >
        {text}
      </span>
    </span>
  );
}

type Market = "CH" | "EU" | "UK" | "MEA" | "LATAM" | "APAC";

export default function PortabilityClient() {
  const [market, setMarket] = useState<Market>("CH");
  const [aumMix, setAumMix] = useState(3);
  const [booking, setBooking] = useState(2);
  const [licenses, setLicenses] = useState(2);
  const [scope, setScope] = useState(3);
  const [concentration, setConcentration] = useState(3);
  const [compliance, setCompliance] = useState(2);
  
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  const score = useMemo(() => {
    const base =
      aumMix * 4 +
      booking * 5 +
      licenses * 6 +
      scope * 4 +
      (6 - concentration) * 5 +
      compliance * 6;

    const factor: Record<Market, number> = {
      CH: 1.0, EU: 0.95, UK: 0.98, MEA: 0.90, LATAM: 0.88, APAC: 0.92,
    };

    return Math.round(Math.min(100, Math.max(0, (base / 100) * 100 * factor[market])));
  }, [aumMix, booking, licenses, scope, concentration, compliance, market]);

  const handleCalculate = () => {
    setHasCalculated(true);
    setShowEmailGate(true);
  };

  const handleEmailSubmit = async (email: string) => {
    const inputData = {
      market,
      aumMix,
      booking,
      licenses,
      scope,
      concentration,
      compliance,
    };

    try {
      const response = await fetch("/api/tool-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          tool_name: "portability",
          score,
          input_data: inputData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setShowEmailGate(false);
      setShowResults(true);
    } catch (error) {
      console.error("Error submitting email:", error);
      throw error;
    }
  };

  const Field = ({
    label, tipId, tip, children,
  }: {
    label: string;
    tipId: string;
    tip: string;
    children: React.ReactNode;
  }) => (
    <div className="space-y-1">
      <label className="flex items-center text-sm font-medium text-white">
        {label}
        <InfoTip id={tipId} text={tip} />
      </label>
      {children}
    </div>
  );

  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white body-grain">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 420px at 18% -10%, rgba(201,161,74,.22) 0%, rgba(201,161,74,0) 55%), radial-gradient(1000px 380px at 110% 0%, rgba(245,231,192,.20) 0%, rgba(245,231,192,0) 60%)",
        }}
      />
      
      <div className="relative mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-2">Portability Score Calculator</h1>
        <p className="text-white/70 mb-8">
          Assess your AUM portability potential in minutes
        </p>

        <div className="space-y-6 rounded-2xl border border-white/10 bg-black/40 p-6">
          <Field
            label="Market"
            tipId="tip-market"
            tip="Pick your main region. We adjust the score for local licensing, cross-border rules, and operating complexity."
          >
            <select
              className="mt-1 w-full rounded border border-white/20 bg-white/5 px-3 py-2 text-white"
              value={market}
              onChange={(e) => setMarket(e.target.value as Market)}
            >
              <option value="CH">Switzerland (CH)</option>
              <option value="EU">European Union (EU)</option>
              <option value="UK">United Kingdom (UK)</option>
              <option value="MEA">Middle East & Africa (MEA)</option>
              <option value="LATAM">Latin America (LATAM)</option>
              <option value="APAC">Asia Pacific (APAC)</option>
            </select>
          </Field>

          <Field
            label="AUM mix (1–5)"
            tipId="tip-aum"
            tip="Diversification across custodians/products/regions. Higher diversification generally increases portability."
          >
            <NumberInput value={aumMix} setValue={setAumMix} min={1} max={5} />
          </Field>

          <Field
            label="Booking centres (0–3)"
            tipId="tip-booking"
            tip="How many booking centres you (and your clients) can use. More centres = more flexibility for transitions."
          >
            <NumberInput value={booking} setValue={setBooking} min={0} max={3} />
          </Field>

          <Field
            label="Cross-border licenses (0–3)"
            tipId="tip-lic"
            tip="Breadth of regulatory permissions across jurisdictions. More coverage = fewer hurdles to move clients."
          >
            <NumberInput value={licenses} setValue={setLicenses} min={0} max={3} />
          </Field>

          <Field
            label="Product scope breadth (1–4)"
            tipId="tip-scope"
            tip="How wide your offering is (e.g., DPM, advisory, lending, alts). Broader scopes can add complexity to portability."
          >
            <NumberInput value={scope} setValue={setScope} min={1} max={4} />
          </Field>

          <Field
            label="Client concentration (1–5; lower is better)"
            tipId="tip-conc"
            tip="If a few clients represent most of your revenue, switching is riskier. Lower concentration improves portability."
          >
            <NumberInput value={concentration} setValue={setConcentration} min={1} max={5} />
          </Field>

          <Field
            label="Compliance / KYC portability (0–3)"
            tipId="tip-kyc"
            tip="How easily KYC/tax documents can transfer and be re-used across borders and custodians."
          >
            <NumberInput value={compliance} setValue={setCompliance} min={0} max={3} />
          </Field>

          <button
            onClick={handleCalculate}
            className="mt-6 w-full rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F5D778] px-6 py-3 font-semibold text-black transition hover:opacity-90"
          >
            Calculate My Score
          </button>
        </div>

        {showResults && (
          <>
            <div className="mt-8 rounded-xl border border-white/20 bg-gradient-to-br from-[#D4AF37]/10 to-[#F5D778]/5 p-6">
              <div className="text-sm text-white/70">Your Portability Score</div>
              <div className="mt-1 text-5xl font-bold text-[#F5D778]">{score}/100</div>
              <div className="mt-3 text-white/90">
                {score >= 80
                  ? "High portability potential - Your book has strong transferability"
                  : score >= 60
                  ? "Moderate portability potential - Several factors support a move"
                  : "Lower portability potential - We can help you plan mitigation steps"}
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">
              <div className="font-medium">Talk confidentially</div>
              <p className="mt-1">
                Want a private assessment and market options?{" "}
                <Link className="underline" href="/contact">Contact Executive Partners</Link>.
              </p>
            </div>

            <p className="mt-4 text-xs text-white/50">
              Disclaimer: Indicative only. We do not store any data without your explicit consent.
            </p>
          </>
        )}
      </div>

      <EmailGateModal
        isOpen={showEmailGate}
        onClose={() => setShowEmailGate(false)}
        onSubmit={handleEmailSubmit}
        score={score}
        toolName="portability"
      />
    </main>
  );
}

function NumberInput({
  value, setValue, min, max,
}: {
  value: number; setValue: (n: number) => void; min: number; max: number;
}) {
  return (
    <input
      type="number"
      className="mt-1 w-full rounded border border-white/20 bg-white/5 px-3 py-2 text-white"
      value={value}
      min={min}
      max={max}
      onChange={(e) => setValue(Number(e.target.value))}
    />
  );
}