// app/portability/portability-client.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

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
  const [aumMix, setAumMix] = useState(3);              // 1–5
  const [booking, setBooking] = useState(2);            // 0–3
  const [licenses, setLicenses] = useState(2);          // 0–3
  const [scope, setScope] = useState(3);                // 1–4
  const [concentration, setConcentration] = useState(3);// 1–5 (lower better)
  const [compliance, setCompliance] = useState(2);      // 0–3

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

  const Field = ({
    label, tipId, tip, children,
  }: {
    label: string;
    tipId: string;
    tip: string;
    children: React.ReactNode;
  }) => (
    <div className="space-y-1">
      <label className="flex items-center text-sm font-medium">
        {label}
        <InfoTip id={tipId} text={tip} />
      </label>
      {children}
    </div>
  );

  return (
    <div className="space-y-6">
      <Field
        label="Market"
        tipId="tip-market"
        tip="Pick your main region. We adjust the score for local licensing, cross-border rules, and operating complexity."
      >
        <select
          className="mt-1 w-full rounded border px-3 py-2"
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

      <div className="rounded-xl border p-4">
        <div className="text-sm text-neutral-500">Your score</div>
        <div className="mt-1 text-4xl font-semibold">{score}/100</div>
        <div className="mt-2 text-neutral-700">
          {score >= 80
            ? "High portability potential"
            : score >= 60
            ? "Moderate portability potential"
            : "Lower portability potential (we can plan mitigation steps)"}
        </div>
      </div>

      <div className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">
        <div className="font-medium">Talk confidentially</div>
        <p className="mt-1">
          Want a private assessment and market options?{" "}
          <Link className="underline" href="/contact">Contact Executive Partners</Link>.
        </p>
      </div>

      <p className="text-xs text-neutral-500">
        Disclaimer: Indicative only. We do not store any data without your explicit consent.
      </p>
    </div>
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
      className="mt-1 w-full rounded border px-3 py-2"
      value={value}
      min={min}
      max={max}
      onChange={(e) => setValue(Number(e.target.value))}
    />
  );
}
