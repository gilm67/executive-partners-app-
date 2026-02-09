// app/portability/portability-client.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
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
        className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xs leading-none text-white/70 hover:bg-white/10 hover:text-white"
      >
        ?
      </button>

      <span
        id={id}
        role="tooltip"
        className={`absolute left-0 z-10 mt-2 w-72 rounded-xl border border-white/10 bg-[#0B1020]/95 p-3 text-xs text-white/80 shadow-lg backdrop-blur transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onMouseLeave={() => setOpen(false)}
      >
        {text}
      </span>
    </span>
  );
}

type Market = "CH" | "EU" | "UK" | "MEA" | "LATAM" | "APAC";

/** Optional: lightweight cross-tool prefill (Portability -> BP reminder) */
const BP_PREFILL_STORAGE_KEY = "bp_prefill_v1";

export default function PortabilityClient() {
  const [market, setMarket] = useState<Market>("CH");
  const [aumMix, setAumMix] = useState(3); // 1–5
  const [booking, setBooking] = useState(2); // 0–3
  const [licenses, setLicenses] = useState(2); // 0–3
  const [scope, setScope] = useState(3); // 1–4
  const [concentration, setConcentration] = useState(3); // 1–5 (lower better)
  const [compliance, setCompliance] = useState(2); // 0–3

  const score = useMemo(() => {
    const base =
      aumMix * 4 +
      booking * 5 +
      licenses * 6 +
      scope * 4 +
      (6 - concentration) * 5 +
      compliance * 6;

    const factor: Record<Market, number> = {
      CH: 1.0,
      EU: 0.95,
      UK: 0.98,
      MEA: 0.9,
      LATAM: 0.88,
      APAC: 0.92,
    };

    return Math.round(Math.min(100, Math.max(0, (base / 100) * 100 * factor[market])));
  }, [aumMix, booking, licenses, scope, concentration, compliance, market]);

  const band = useMemo(() => {
    if (score >= 80) return "high";
    if (score >= 60) return "mid";
    return "low";
  }, [score]);

  const scoreLabel = useMemo(() => {
    if (score >= 80) return "High portability potential";
    if (score >= 60) return "Moderate portability potential";
    return "Lower portability potential (we can plan mitigation steps)";
  }, [score]);

  const scoreKicker = useMemo(() => {
    if (score >= 80)
      return "You’re closer to “committee-ready”. Next step is to stress-test the business plan assumptions (NNM, ROA, comp).";
    if (score >= 60)
      return "You’re in a workable zone. Tighten booking centre / KYC transferability and sanity-check the business plan before outreach.";
    return "You likely need a mitigation plan (client segmentation, timing, booking centre strategy) before moving.";
  }, [score]);

  // ✅ Store a lightweight prefill hint for BP (does not store client PII; only tool params)
  useEffect(() => {
    try {
      const payload = {
        source: "portability",
        market,
        portabilityScore: score,
        inputs: { aumMix, booking, licenses, scope, concentration, compliance },
        ts: Date.now(),
      };
      window.localStorage.setItem(BP_PREFILL_STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* noop */
    }
  }, [market, score, aumMix, booking, licenses, scope, concentration, compliance]);

  const Field = ({
    label,
    tipId,
    tip,
    children,
  }: {
    label: string;
    tipId: string;
    tip: string;
    children: React.ReactNode;
  }) => (
    <div className="space-y-1">
      <label className="flex items-center text-sm font-semibold text-white/85">
        {label}
        <InfoTip id={tipId} text={tip} />
      </label>
      {children}
    </div>
  );

  return (
    <main className="relative overflow-hidden text-white">
      {/* Premium background (matches your site tone) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#060A12]" />
        <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl opacity-25" />
        <div className="absolute top-40 left-[-200px] h-[380px] w-[380px] rounded-full bg-[#D4AF37]/10 blur-3xl opacity-35" />
        <div className="absolute bottom-[-220px] right-[-200px] h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40" />
      </div>

      <div className="mx-auto w-full max-w-4xl px-4 py-10">
        {/* Header */}
        <header className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/70">
            Executive Partners · Free tool
            <span className="h-1 w-1 rounded-full bg-[#D4AF37]/80" />
            Portability
          </div>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white">
            Portability Score
          </h1>
          <p className="mt-2 max-w-2xl text-white/70">
            Quick signal on portability complexity by market, booking centres, licensing and KYC transferability.
          </p>
        </header>

        {/* Inputs card */}
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur">
          <div className="grid gap-5 md:grid-cols-2">
            <Field
              label="Market"
              tipId="tip-market"
              tip="Pick your main region. We adjust the score for local licensing, cross-border rules, and operating complexity."
            >
              <select
                className="mt-1 w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-white outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-[#D4AF37]/35"
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

            {/* Score */}
            <div className="md:col-span-2">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <div className="text-xs text-white/55">Your score</div>
                    <div className="mt-1 text-4xl font-semibold text-white">
                      {score}/100
                    </div>
                    <div className="mt-2 text-white/80">{scoreLabel}</div>
                    <div className="mt-2 text-sm text-white/60">{scoreKicker}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    {band === "high" ? (
                      <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                        Strong signal
                      </span>
                    ) : band === "mid" ? (
                      <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-200">
                        Workable
                      </span>
                    ) : (
                      <span className="rounded-full border border-rose-400/20 bg-rose-400/10 px-3 py-1 text-xs font-semibold text-rose-200">
                        Needs mitigation
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ✅ Bridge to BP + Calibration */}
            <div className="md:col-span-2">
              <section className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
                      Next step (confidential)
                    </div>

                    <h2 className="mt-2 text-lg font-semibold text-white">
                      Turn this portability score into a bank-ready Business Plan.
                    </h2>

                    <p className="mt-1 text-sm text-white/70">
                      We’ll stress-test NNM targets, ROA assumptions, revenue mix and committee readiness — before you speak to a bank.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/en/bp-simulator"
                      className="inline-flex items-center rounded-xl bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
                    >
                      Build your Business Plan →
                    </Link>

                    <a
                      href="https://calendly.com/execpartners/15-minute-career-consultation"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white"
                    >
                      Sanity-check portability →
                    </a>

                    <Link
                      href="/en/contact"
                      className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white"
                    >
                      Send details confidentially →
                    </Link>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-3">
                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <div className="text-sm font-semibold text-white">What truly moves</div>
                    <div className="mt-1 text-sm text-white/60">
                      90 days vs 12 months — realistic portability.
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <div className="text-sm font-semibold text-white">Approval readiness</div>
                    <div className="mt-1 text-sm text-white/60">
                      Fix the gaps that get plans rejected by committees.
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <div className="text-sm font-semibold text-white">Market benchmarks</div>
                    <div className="mt-1 text-sm text-white/60">
                      Geneva / Zurich / Dubai / London patterns.
                    </div>
                  </div>
                </div>

                {band === "low" ? (
                  <div className="mt-4 text-xs text-white/60">
                    Tip: if your score is below 60, we typically start with mitigation (client segmentation, booking centre strategy, timing) before business case submission.
                  </div>
                ) : (
                  <div className="mt-4 text-xs text-white/60">
                    Tip: include portable %, NNM target, ROA, booking centre (CH/UK/UAE/Asia), and current comp structure.
                  </div>
                )}
              </section>
            </div>

            {/* Disclaimer */}
            <div className="md:col-span-2">
              <p className="text-xs text-white/50">
                Disclaimer: Indicative only. We do not store any personal data without your explicit consent.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function NumberInput({
  value,
  setValue,
  min,
  max,
}: {
  value: number;
  setValue: (n: number) => void;
  min: number;
  max: number;
}) {
  return (
    <input
      type="number"
      className="mt-1 w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-white outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-[#D4AF37]/35"
      value={value}
      min={min}
      max={max}
      onChange={(e) => setValue(Number(e.target.value))}
    />
  );
}