"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { BPProfilePrefill } from "@/app/en/bp-simulator/BPClient";

const PortabilityClient = dynamic(
  () => import("@/components/portability/PortabilityClient"),
  { ssr: false, loading: () => <Loader text="Loading portability assessment…" /> }
);

const BPClient = dynamic(
  () => import("@/app/en/bp-simulator/BPClient"),
  { ssr: false, loading: () => <Loader text="Loading business plan simulator…" /> }
);

/* ── Types ─────────────────────────────────────────── */
type Phase = "loading" | "portability" | "bp" | "motivation" | "complete";

type TokenInfo = {
  candidateName: string;
  institution: string;
  mandate: string;
  market?: string;
  hub?: string;
};

type PortabilityResult = {
  overallPct: number;
  overallLevel: string;
  expectedTransferRange: string;
  onboardingSpeed: string;
  corePct: number;
  legalPct: number;
  advancedPct: number;
  roaBps: number;
  market: string;
  hub: string;
};

type MotivationAnswers = {
  pushFactors: string[];
  pullFactors: string;
  competingProcesses: string;
  competingNames: string;
  baseSalaryExpected: string;
  totalCompExpected: string;
  guaranteeExpectation: string;
  clawbackCover: string;
  timeline: string;
  additionalContext: string;
};

/* ── Helpers ───────────────────────────────────────── */
function Loader({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center min-h-[40vh] text-white/40 text-sm">
      {text}
    </div>
  );
}

const PUSH_OPTIONS = [
  "Management or ownership change",
  "Reduction in product shelf",
  "Shift in risk appetite or compliance position",
  "Compensation ceiling or structural change",
  "Strategic repositioning — bank exiting my segment",
  "Post-M&A integration and cultural shift",
  "Exploring opportunities proactively",
];

const STEPS = ["Portability Assessment", "Business Plan", "Motivation & Fit"];

function ProgressBar({ current, completed }: { current: number; completed: number[] }) {
  return (
    <div className="sticky top-0 z-40 border-b border-white/8 bg-[#0B0F1A]/95 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-6 py-3">
        <div className="flex items-center gap-0">
          {STEPS.map((step, i) => (
            <div key={step} className="flex items-center flex-1">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  completed.includes(i)
                    ? "bg-emerald-500 text-white"
                    : i === current
                    ? "bg-[#D4AF37] text-black"
                    : "border border-white/20 text-white/30"
                }`}>
                  {completed.includes(i) ? "✓" : i + 1}
                </div>
                <span className={`text-xs font-medium truncate ${
                  i === current ? "text-white" : completed.includes(i) ? "text-emerald-400" : "text-white/30"
                }`}>
                  {step}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 mx-3 h-px transition-all ${completed.includes(i) ? "bg-emerald-500/50" : "bg-white/10"}`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScoreRing({ pct, color }: { pct: number; color: string }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <div className="relative h-20 w-20 shrink-0">
      <svg viewBox="0 0 72 72" className="h-20 w-20 -rotate-90">
        <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
        <circle cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-white leading-none">{pct}</span>
        <span className="text-[9px] text-white/40">/ 100</span>
      </div>
    </div>
  );
}

function TransitionCard({
  title,
  subtitle,
  result,
  color,
  onContinue,
  continueLabel,
}: {
  title: string;
  subtitle: string;
  result: { pct: number; level: string; metric1Label: string; metric1Value: string; metric2Label: string; metric2Value: string };
  color: string;
  onContinue: () => void;
  continueLabel: string;
}) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 flex flex-col items-center text-center gap-8">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-2xl">✓</div>
        <h2 className="font-[var(--font-playfair)] text-3xl font-semibold text-white">{title}</h2>
        <p className="text-white/50 text-sm max-w-md">{subtitle}</p>
      </div>

      <div className="w-full rounded-2xl border border-white/10 bg-black/40 p-6">
        <div className="flex items-center gap-6 justify-center">
          <ScoreRing pct={result.pct} color={color} />
          <div className="text-left">
            <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Score</p>
            <p className="text-2xl font-bold text-white">{result.pct}%</p>
            <p className="text-sm text-white/60 mt-0.5">{result.level}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-5">
          {[
            { label: result.metric1Label, value: result.metric1Value },
            { label: result.metric2Label, value: result.metric2Value },
          ].map(m => (
            <div key={m.label} className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
              <p className="text-[10px] text-white/35 uppercase tracking-wide mb-1">{m.label}</p>
              <p className="text-sm font-semibold" style={{ color }}>{m.value}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onContinue}
        className="rounded-full px-8 py-3 text-sm font-semibold text-black shadow-lg transition"
        style={{ backgroundColor: color }}
      >
        {continueLabel} →
      </button>
    </div>
  );
}

function MotivationSection({
  answers,
  onChange,
  onSubmit,
  submitting,
  institution,
}: {
  answers: MotivationAnswers;
  onChange: (patch: Partial<MotivationAnswers>) => void;
  onSubmit: () => void;
  submitting: boolean;
  institution: string;
}) {
  const sectionClass = "rounded-2xl border border-white/10 bg-black/40 p-6 space-y-5";
  const labelClass = "block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2";
  const inputClass = "w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-[#D4AF37]/60 transition";

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 space-y-6">
      <div className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D4AF37]/80 mb-3">
          Section 3 · Motivation & Fit
        </p>
        <h2 className="font-[var(--font-playfair)] text-3xl font-semibold text-white">
          Context behind the move
        </h2>
        <p className="mt-2 text-sm text-white/50 max-w-xl leading-relaxed">
          A strong book with weak or unclear motivation is a retention risk. These five questions give Gil M. Chalem the full picture before any introduction to {institution || "the institution"}.
        </p>
      </div>

      {/* Q1: Push factors */}
      <div className={sectionClass}>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/20 text-xs font-bold text-[#D4AF37] ring-1 ring-[#D4AF37]/40">1</div>
          <h3 className="text-base font-semibold text-white">Why are you considering a move now?</h3>
        </div>
        <p className="text-xs text-white/40 mb-4 ml-10">Select all that apply. Push-only motivation (no pull) correlates with shorter tenure at the next institution.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {PUSH_OPTIONS.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                const current = answers.pushFactors;
                const next = current.includes(opt) ? current.filter(x => x !== opt) : [...current, opt];
                onChange({ pushFactors: next });
              }}
              className={`rounded-xl border px-3 py-2.5 text-xs text-left transition ${
                answers.pushFactors.includes(opt)
                  ? "border-[#D4AF37]/60 bg-[#D4AF37]/15 text-[#D4AF37]"
                  : "border-white/10 bg-black/30 text-white/55 hover:border-white/25"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Q2: Pull factors */}
      <div className={sectionClass}>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/20 text-xs font-bold text-[#D4AF37] ring-1 ring-[#D4AF37]/40">2</div>
          <h3 className="text-base font-semibold text-white">What specifically attracts you to {institution || "this institution"}?</h3>
        </div>
        <p className="text-xs text-white/40 mb-3 ml-10">Be specific. Product shelf, booking infrastructure, cultural fit, market capabilities. Generic answers are a red flag at interview.</p>
        <textarea
          value={answers.pullFactors}
          onChange={e => onChange({ pullFactors: e.target.value })}
          rows={3}
          placeholder={`e.g. Stronger alternatives shelf (private equity, hedge funds), better ${institution || "platform"} booking infrastructure for my client base, more entrepreneurial culture post-restructuring`}
          className={inputClass + " resize-none"}
        />
      </div>

      {/* Q3: Competing processes */}
      <div className={sectionClass}>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/20 text-xs font-bold text-[#D4AF37] ring-1 ring-[#D4AF37]/40">3</div>
          <h3 className="text-base font-semibold text-white">Active conversations elsewhere?</h3>
        </div>
        <p className="text-xs text-white/40 mb-3 ml-10">EP manages sequencing to protect your reputation. This is confidential and not shared with any institution.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
          {[
            "This is the only active process",
            "1 early-stage conversation",
            "2–3 active processes at similar stage",
            "Running a broad search (4+)",
          ].map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => onChange({ competingProcesses: opt })}
              className={`rounded-xl border px-3 py-2.5 text-xs text-left transition ${
                answers.competingProcesses === opt
                  ? "border-[#D4AF37]/60 bg-[#D4AF37]/15 text-[#D4AF37]"
                  : "border-white/10 bg-black/30 text-white/55 hover:border-white/25"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        {answers.competingProcesses && answers.competingProcesses !== "This is the only active process" && (
          <input
            type="text"
            value={answers.competingNames}
            onChange={e => onChange({ competingNames: e.target.value })}
            placeholder="Institutions (optional, confidential)"
            className={inputClass}
          />
        )}
      </div>

      {/* Q4: Compensation */}
      <div className={sectionClass}>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/20 text-xs font-bold text-[#D4AF37] ring-1 ring-[#D4AF37]/40">4</div>
          <h3 className="text-base font-semibold text-white">Compensation expectations</h3>
        </div>
        <p className="text-xs text-white/40 mb-4 ml-10">
          EP rule: the hire must break even within 36 months in the base scenario. All-in cost is approximately 1.25× base salary (includes employer contributions). Enter figures in CHF thousands.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Expected base salary (CHF / year)</label>
            <input type="number" value={answers.baseSalaryExpected}
              onChange={e => onChange({ baseSalaryExpected: e.target.value })}
              placeholder="e.g. 300000" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Expected total year 1 comp (CHF)</label>
            <input type="number" value={answers.totalCompExpected}
              onChange={e => onChange({ totalCompExpected: e.target.value })}
              placeholder="e.g. 480000" className={inputClass} />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[
            { key: "none", label: "No guarantee", desc: "Assessed on transferred book" },
            { key: "partial", label: "Partial guarantee", desc: "Cover transition risk (3–6 months)" },
            { key: "full", label: "Full year 1 guarantee", desc: "Requested" },
          ].map(opt => (
            <button
              key={opt.key}
              type="button"
              onClick={() => onChange({ guaranteeExpectation: opt.key })}
              className={`rounded-xl border px-3 py-3 text-xs text-left transition ${
                answers.guaranteeExpectation === opt.key
                  ? "border-[#D4AF37]/60 bg-[#D4AF37]/15 text-[#D4AF37]"
                  : "border-white/10 bg-black/30 text-white/55 hover:border-white/25"
              }`}
            >
              <span className="font-semibold block mb-0.5">{opt.label}</span>
              <span className="opacity-70">{opt.desc}</span>
            </button>
          ))}
        </div>
        <div className="mt-3">
          <label className={labelClass}>Outstanding clawback to cover?</label>
          <div className="flex gap-2">
            {["None", "Yes — receiving bank to cover"].map(opt => (
              <button
                key={opt}
                type="button"
                onClick={() => onChange({ clawbackCover: opt })}
                className={`rounded-xl border px-4 py-2 text-xs transition ${
                  answers.clawbackCover === opt
                    ? "border-[#D4AF37]/60 bg-[#D4AF37]/15 text-[#D4AF37]"
                    : "border-white/10 bg-black/30 text-white/55 hover:border-white/25"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Q5: Timeline */}
      <div className={sectionClass}>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/20 text-xs font-bold text-[#D4AF37] ring-1 ring-[#D4AF37]/40">5</div>
          <h3 className="text-base font-semibold text-white">Availability timeline</h3>
        </div>
        <p className="text-xs text-white/40 mb-3 ml-10">Notice period plus any garden leave. Swiss law: typically 1–3 months. UK: 3–6 months at MD level. UAE/Singapore: 1–3 months.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[
            "Available immediately",
            "After 1 month",
            "After 2–3 months",
            "After 3–6 months (extended garden leave)",
            "After 6+ months",
            "Flexible — depends on offer",
          ].map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => onChange({ timeline: opt })}
              className={`rounded-xl border px-3 py-2.5 text-xs text-left transition ${
                answers.timeline === opt
                  ? "border-[#D4AF37]/60 bg-[#D4AF37]/15 text-[#D4AF37]"
                  : "border-white/10 bg-black/30 text-white/55 hover:border-white/25"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        <div className="mt-4">
          <label className={labelClass}>Additional context (optional)</label>
          <textarea
            value={answers.additionalContext}
            onChange={e => onChange({ additionalContext: e.target.value })}
            rows={2}
            placeholder="e.g. Strong referral network in Franco-Swiss market not reflected in current AUM. Prefer to move before Q3."
            className={inputClass + " resize-none"}
          />
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={submitting}
        className="w-full rounded-full py-3.5 text-sm font-semibold text-black shadow-lg disabled:opacity-60 transition mt-4"
        style={{ backgroundColor: "#D4AF37" }}
      >
        {submitting ? "Submitting your assessment…" : "Submit complete assessment →"}
      </button>
      <p className="text-[11px] text-white/30 text-center">
        Handled strictly confidentially by Gil M. Chalem at Executive Partners. Not shared with any institution without your explicit consent.
      </p>
    </div>
  );
}

/* ── Main component ────────────────────────────────── */
export default function CandidateJourneyClient({ token }: { token: string }) {
  const [phase, setPhase] = useState<Phase>("loading");
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [tokenError, setTokenError] = useState(false);
  const [portabilityResult, setPortabilityResult] = useState<PortabilityResult | null>(null);
  const [bpResultReady, setBpResultReady] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [motivation, setMotivation] = useState<MotivationAnswers>({
    pushFactors: [],
    pullFactors: "",
    competingProcesses: "",
    competingNames: "",
    baseSalaryExpected: "",
    totalCompExpected: "",
    guaranteeExpectation: "",
    clawbackCover: "",
    timeline: "",
    additionalContext: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/token-info/${token}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.candidateName) {
          setTokenInfo(data);
          setPhase("portability");
        } else {
          setTokenError(true);
          setPhase("loading");
        }
      })
      .catch(() => { setTokenError(true); setPhase("loading"); });
  }, [token]);

  const firstName = tokenInfo?.candidateName?.trim().split(" ")[0] || "";

  const bpPrefill: BPProfilePrefill | null = portabilityResult ? {
    fullName: tokenInfo?.candidateName,
    market: portabilityResult.market,
    portabilityRoaBps: portabilityResult.roaBps,
  } : null;

  const handlePortabilityDone = (result: PortabilityResult) => {
    setPortabilityResult(result);
    setCompletedSteps(prev => [...prev, 0]);
    setPhase("bp");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBpDone = () => {
    setBpResultReady(true);
    setCompletedSteps(prev => [...prev, 1]);
    setPhase("motivation");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await fetch("/api/candidate-journey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          candidateName: tokenInfo?.candidateName,
          institution: tokenInfo?.institution,
          mandate: tokenInfo?.mandate,
          portabilityResult,
          motivation,
        }),
      });
      setCompletedSteps(prev => [...prev, 2]);
      setPhase("complete");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      alert("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (tokenError) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-6 text-center">
      <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest">Executive Partners</p>
      <p className="text-white text-lg font-semibold">This link is invalid or has expired.</p>
      <p className="text-white/40 text-sm">Please contact your EP consultant for a new assessment link.</p>
    </div>
  );

  if (phase === "loading") return <Loader text="Preparing your assessment…" />;

  const currentStep = phase === "portability" ? 0 : phase === "bp" ? 1 : 2;

  return (
    <div className="min-h-screen">
      {/* Sticky progress */}
      <ProgressBar current={currentStep} completed={completedSteps} />

      {/* Personalised banner — always visible */}
      <div className="mx-auto max-w-3xl px-6 pt-10 pb-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D4AF37]/80">
          Executive Partners · Confidential · {tokenInfo?.mandate || "Senior Assessment"}
        </p>
        <h1 className="mt-2 font-[var(--font-playfair)] text-2xl font-semibold text-white md:text-3xl">
          {firstName}, your EP assessment
          {tokenInfo?.institution ? (
            <span className="text-white/50 font-normal"> · {tokenInfo.institution}</span>
          ) : null}
        </h1>
        <div className="mt-3 flex gap-2 flex-wrap">
          {[
            "200+ placements tested",
            "Strictly confidential",
            "Not shared without consent",
          ].map(t => (
            <span key={t} className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-0.5 text-[10px] text-white/35">
              <span className="text-[#D4AF37]/60">✓</span> {t}
            </span>
          ))}
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-6 mb-2" />

      {/* Phase: Portability */}
      {phase === "portability" && (
        <div>
          <div className="mx-auto max-w-3xl px-6 py-4">
            <div className="rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 px-4 py-3">
              <p className="text-xs text-[#D4AF37] font-semibold mb-0.5">Step 1 of 3 — Portability Assessment</p>
              <p className="text-xs text-white/50">
                Complete all six sections and download your PDF diagnostic. Once complete, a "Continue to Business Plan" button will appear.
              </p>
            </div>
          </div>
          <PortabilityClient
            prefillName={tokenInfo?.candidateName}
            prefillMarket={tokenInfo?.market}
            prefillHub={tokenInfo?.hub}
            onScoreReady={handlePortabilityDone}
          />
          {portabilityResult && (
            <div className="mx-auto max-w-3xl px-6 pb-10">
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-emerald-300">✓ Portability assessment complete</p>
                  <p className="text-xs text-white/40 mt-0.5">Score: {portabilityResult.overallPct}% · {portabilityResult.overallLevel}</p>
                </div>
                <button
                  onClick={() => { setCompletedSteps(prev => [...prev, 0]); setPhase("bp"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="shrink-0 rounded-full bg-[#D4AF37] px-6 py-2.5 text-sm font-semibold text-black"
                >
                  Continue to Business Plan →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Phase: Business Plan */}
      {phase === "bp" && (
        <div>
          <div className="mx-auto max-w-3xl px-6 py-4">
            {portabilityResult && (
              <div className="rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 px-4 py-3 mb-3">
                <p className="text-xs text-[#D4AF37] font-semibold mb-0.5">
                  Step 2 of 3 — Business Plan · Portability score carried forward: {portabilityResult.overallPct}%
                </p>
                <p className="text-xs text-white/50">
                  Your portability ROA ({portabilityResult.roaBps} bps) has been pre-filled. Enter your AUM in Section 1 to generate your three-year revenue projection.
                </p>
              </div>
            )}
            <div className="rounded-xl border border-[#9ECBFF]/20 bg-[#9ECBFF]/5 px-4 py-3">
              <p className="text-xs text-[#9ECBFF] font-semibold mb-0.5">Step 2 of 3 — Business Plan Simulator</p>
              <p className="text-xs text-white/50">
                Build your bank-ready revenue case. Banks close offers faster when candidates arrive with the numbers pre-built. Complete all sections and save your BP, then continue to the final section.
              </p>
            </div>
          </div>
          <BPClient
            prefill={bpPrefill}
            showTips={false}
            onResultReady={handleBpDone}
          />
          {bpResultReady && (
            <div className="mx-auto max-w-3xl px-6 pb-10">
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-emerald-300">✓ Business plan complete</p>
                  <p className="text-xs text-white/40 mt-0.5">One final section — motivation and fit</p>
                </div>
                <button
                  onClick={() => { setCompletedSteps(prev => [...prev, 1]); setPhase("motivation"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="shrink-0 rounded-full bg-[#D4AF37] px-6 py-2.5 text-sm font-semibold text-black"
                >
                  Continue to Motivation →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Phase: Motivation */}
      {phase === "motivation" && (
        <MotivationSection
          answers={motivation}
          onChange={patch => setMotivation(prev => ({ ...prev, ...patch }))}
          onSubmit={handleSubmit}
          submitting={submitting}
          institution={tokenInfo?.institution || ""}
        />
      )}

      {/* Phase: Complete */}
      {phase === "complete" && (
        <div className="mx-auto max-w-2xl px-6 py-20 flex flex-col items-center text-center gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-3xl">✓</div>
          <h2 className="font-[var(--font-playfair)] text-3xl font-semibold text-white">Assessment submitted</h2>
          <p className="text-white/55 text-sm max-w-md leading-relaxed">
            Thank you, {firstName}. Your complete assessment — portability score, business plan, and motivation profile — has been received by Gil M. Chalem at Executive Partners.
          </p>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-6 w-full text-left space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">What happens next</p>
            <p className="text-sm text-white/60">Gil will review your complete profile within 24 hours and contact you directly to discuss the analysis, positioning, and next steps.</p>
            <p className="text-sm text-white/60">Your information is treated as strictly confidential and shared only with {tokenInfo?.institution || "the target institution"} with your explicit agreement.</p>
          </div>
          <p className="text-xs text-white/30">Executive Partners · Geneva · recruiter@execpartners.ch</p>
        </div>
      )}
    </div>
  );
}
