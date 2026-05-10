// @ts-nocheck
"use client";
import { BriefDrawer } from "./BriefDrawer";
import { MANDATES } from "./mandates-data";

import { useState, useRef, useEffect } from "react";

const HUBS = ["All", "Geneva", "Zurich", "Lugano", "London", "Milan", "New York", "Hong Kong", "Singapore"];

function ScreeningModal({ mandate, onClose, onPass }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [fails, setFails] = useState([]);
  const [warns, setWarns] = useState([]);
  const allAnswered = mandate.screening.every((_, i) => answers[i] !== undefined);
  const submit = () => {
    const f = [], w = [];
    mandate.screening.forEach((s, i) => {
      const chosen = answers[i];
      if (!chosen) return;
      if (chosen.pass === false) f.push({ q: s.q, chosen: chosen.label });
      if (chosen.pass === "warn") w.push({ q: s.q, chosen: chosen.label });
    });
    setFails(f); setWarns(w); setSubmitted(true);
    if (f.length === 0) setTimeout(() => { onClose(); onPass(); }, 1100);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="w-full max-w-lg max-h-[88vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0B0E13] p-6 shadow-2xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brandGoldSoft mb-1">Quick Qualification Check</p>
            <h3 className="text-lg font-bold text-white">{mandate.title}</h3>
            <p className="text-sm text-neutral-400">{mandate.location}</p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white text-2xl leading-none ml-4">×</button>
        </div>
        <p className="text-sm text-neutral-400 leading-relaxed mb-5 pb-4 border-b border-white/10">A few targeted questions to confirm you meet the core criteria. Takes under 90 seconds.</p>
        {!submitted ? (
          <>
            {mandate.screening.map((s, i) => (
              <div key={i} className={`mb-5 ${i < mandate.screening.length - 1 ? "pb-5 border-b border-white/[0.06]" : ""}`}>
                <p className="text-sm font-medium text-white/90 leading-relaxed mb-3">{s.q}</p>
                <div className="flex flex-col gap-2">
                  {s.options.map((opt, j) => {
                    const sel = answers[i]?.label === opt.label;
                    const cls = sel
                      ? opt.pass === true ? "border-green-500/60 bg-green-500/10 text-green-400"
                        : opt.pass === false ? "border-red-500/60 bg-red-500/10 text-red-400"
                        : "border-amber-500/60 bg-amber-500/10 text-amber-400"
                      : "border-white/10 bg-white/[0.03] text-neutral-400 hover:border-white/20 hover:text-white";
                    return <button key={j} onClick={() => setAnswers(p => ({ ...p, [i]: opt }))} className={`text-left px-4 py-2.5 rounded-xl border text-sm transition-all ${cls}`}>{opt.label}</button>;
                  })}
                </div>
              </div>
            ))}
            <button onClick={submit} disabled={!allAnswered} className={`w-full py-3 rounded-xl text-sm font-semibold tracking-wide transition-all ${allAnswered ? "bg-brandGold text-black hover:bg-brandGoldSoft" : "bg-white/5 text-white/20 cursor-not-allowed"}`}>Submit →</button>
          </>
        ) : fails.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">✓</div>
            <p className="text-green-400 font-semibold text-lg mb-2">Profile looks strong</p>
            {warns.length > 0 && <p className="text-amber-400/70 text-sm mb-2">A few points to discuss — we'll cover them in our call.</p>}
            <p className="text-neutral-400 text-sm">Opening the mandate brief…</p>
          </div>
        ) : (
          <div>
            <div className="rounded-xl border border-red-500/20 bg-red-500/[0.07] p-4 mb-4">
              <p className="text-red-400 text-sm font-semibold mb-3">{fails.length} criteria not met for this mandate</p>
              {fails.map((f, i) => (
                <div key={i} className={`${i < fails.length - 1 ? "mb-3 pb-3 border-b border-red-500/10" : ""}`}>
                  <p className="text-white/60 text-xs leading-relaxed mb-1">{f.q}</p>
                  <p className="text-red-400/70 text-xs">Your answer: {f.chosen}</p>
                </div>
              ))}
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed mb-4">This mandate may not be the right fit right now. A 15-minute call with Gil M. Chalem will give you an honest picture of your options.</p>
            <a href="/en/contact" className="block text-center rounded-xl border border-brandGold/40 bg-brandGold/10 px-4 py-3 text-sm font-semibold text-brandGoldPale hover:bg-brandGold/20 hover:text-white transition mb-3">Speak with a Recruiter →</a>
            <button onClick={onClose} className="w-full text-white/25 text-sm py-2 hover:text-white/50 transition">Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

function MandatePage({ mandate, onBack, onApply }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div>
      <button onClick={onBack} className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition mb-8">← All Mandates</button>
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center rounded-full flex-shrink-0 whitespace-nowrap border border-brandGold/30 bg-brandGold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-brandGoldSoft">{mandate.tag}</span>
          {mandate.urgent && <span className="inline-flex items-center rounded-full flex-shrink-0 whitespace-nowrap border border-green-500/30 bg-green-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-green-400">Actively Filling</span>}
          {mandate.ubp_ref && <span className="inline-flex items-center rounded-full flex-shrink-0 whitespace-nowrap border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-neutral-400">{mandate.ubp_ref}</span>}
        </div>
        <div className="text-4xl mb-3">{mandate.flag}</div>
        <h1 className="font-[var(--font-playfair)] text-4xl font-semibold tracking-tight text-white mb-2">{mandate.title}</h1>
        <p className="text-xl text-neutral-300">{mandate.subtitle} · {mandate.location}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.03))] p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brandGoldSoft mb-2">Indicative Compensation</p>
          <p className="text-2xl font-bold text-white mb-1">{mandate.comp_base}</p>
          <p className="text-sm text-neutral-400 mb-3">{mandate.comp_note}</p>
          <p className="text-xs text-neutral-500 italic leading-relaxed">Indicative range only. Final package determined by the hiring institution based on experience, seniority and negotiation.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.03))] p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-2">Portable Book</p>
          <p className="text-2xl font-bold text-white mb-1">{mandate.aum}</p>
          <p className="text-sm text-neutral-400">{mandate.aum_note}</p>
        </div>
      </div>
      <div className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-4">The Opportunity</p>
        {mandate.brief.split("\n\n").map((p, i) => <p key={i} className="text-neutral-300 leading-relaxed mb-4 text-[15px]">{p}</p>)}
      </div>
      <div className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.03))] p-5 mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-4">Ideal Profile</p>
        <ul className="space-y-3">
          {mandate.profile_lines.map((line, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full flex-shrink-0 whitespace-nowrap bg-brandGold shrink-0 opacity-70" />
              <span className="text-sm text-neutral-300 leading-relaxed">{line}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-3">Process</p>
        <div className="flex flex-wrap gap-2">
          {mandate.process.split(" · ").map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-white/20 text-sm">·</span>}
              <span className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-neutral-400">{step}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-brandGold/25 bg-[linear-gradient(135deg,rgba(201,161,74,.08),rgba(27,58,107,.12))] p-7 mb-6 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brandGoldSoft mb-2">Interested in this mandate?</p>
        <p className="text-sm text-neutral-400 leading-relaxed mb-5 max-w-sm mx-auto">A short qualification check — under 90 seconds — then register your interest confidentially. No CV required.</p>
        <button onClick={() => onApply(mandate)} className="inline-flex items-center gap-2 rounded-xl border border-brandGold/70 bg-brandGold px-8 py-3 text-sm font-bold text-black hover:bg-brandGoldSoft transition shadow-[0_4px_20px_rgba(201,161,74,.25)]">Apply for this Role →</button>
        <p className="text-white/15 text-[10px] mt-4 tracking-widest">100% CONFIDENTIAL · GDPR COMPLIANT</p>
      </div>
      <div className="pt-4 border-t border-white/10 flex justify-between items-center flex-wrap gap-4">
        <p className="text-xs text-neutral-500">Executive Partners · Geneva</p>
        <button onClick={onBack} className="text-xs text-neutral-400 hover:text-white transition border border-white/10 rounded-lg px-3 py-1.5">← All mandates</button>
      </div>
    </div>
  );
}

function MandateCard({ mandate, onScreen, onBrief }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.03))] p-5 shadow-[0_1px_3px_rgba(0,0,0,.25)] transition hover:shadow-[0_8px_30px_rgba(0,0,0,.45)] hover:border-brandGold/20">
      <div className="pointer-events-none absolute inset-0 opacity-[.15]" style={{ background: "radial-gradient(700px 160px at 0% 0%, rgba(201,161,74,.35), transparent 60%)" }} />
      {mandate.urgent && <div className="absolute top-0 right-0 rounded-tr-2xl rounded-bl-xl border-b border-l border-green-500/20 bg-green-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-green-400">Actively Filling</div>}
      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">{mandate.flag}</span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brandGoldSoft">{mandate.tag}</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-1">{mandate.title}</h3>
        <p className="text-sm text-neutral-400 mb-4">{mandate.subtitle} · {mandate.location}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="inline-flex items-center rounded-full flex-shrink-0 whitespace-nowrap border border-brandGold/30 bg-brandGold/10 px-3 py-1 text-xs font-semibold text-brandGoldPale">{mandate.comp_base} <span className="opacity-50 ml-1 text-[10px]">est.</span></span>
          <span className="inline-flex items-center rounded-full flex-shrink-0 whitespace-nowrap border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-400">{mandate.aum}</span>
          {mandate.ubp_ref && <span className="inline-flex items-center rounded-full flex-shrink-0 whitespace-nowrap border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-500">{mandate.ubp_ref}</span>}
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={() => onBrief(mandate)} className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-black/20 px-4 py-2 text-xs font-semibold text-neutral-300 hover:border-brandGold/30 hover:text-white transition">View Brief</button>
          <a href={`/en/jobs/${mandate.id}`} className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white hover:bg-white/10 transition">Full details →</a>
          <button onClick={() => onScreen(mandate)} className="inline-flex items-center gap-1.5 rounded-xl border border-brandGold/50 bg-brandGold/15 px-4 py-2 text-xs font-semibold text-brandGoldPale hover:bg-brandGold/25 hover:text-white transition">Apply →</button>
        </div>
      </div>
    </div>
  );
}

export default function MandatesClient() {
  const [screening, setScreening] = useState(null);
  const [brief, setBrief] = useState(null);
  const [filter, setFilter] = useState("All");
  const [selectedId, setSelectedId] = useState(null);
  const topRef = useRef(null);

  // Sync with URL on mount and browser navigation
  useEffect(() => {
    const sync = () => {
      const params = new URLSearchParams(window.location.search);
      setSelectedId(params.get("id"));
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const selected = selectedId ? MANDATES.find(m => m.id === selectedId) || null : null;

  const visible = filter === "All" ? MANDATES : MANDATES.filter(m => m.location.toLowerCase().includes(filter.toLowerCase().split(" ")[0]));

  const openFull = (mandate) => {
    const url = "/en/jobs?id=" + mandate.id;
    window.history.pushState({}, "", url);
    setSelectedId(mandate.id);
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };
  const goBack = () => {
    window.history.pushState({}, "", "/en/jobs");
    setSelectedId(null);
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  return (
    <main className="relative min-h-screen text-white" ref={topRef}>
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(1400px 500px at 10% -10%, rgba(201,161,74,.18) 0%, rgba(201,161,74,0) 55%), radial-gradient(1100px 420px at 110% 0%, rgba(245,231,192,.15) 0%, rgba(245,231,192,0) 60%)" }} />

      {brief && <BriefDrawer mandate={brief} onClose={() => setBrief(null)} onApply={(m) => { setBrief(null); setScreening(m); }} />}

      {screening && <ScreeningModal mandate={screening} onClose={() => setScreening(null)} onPass={() => { openFull(screening); setScreening(null); }} />}

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-14">
        {!selected ? (
          <>
            <div className="text-center mb-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brandGoldSoft/90 mb-3">Private Banking · Discreet Mandates</p>
              <h1 className="font-[var(--font-playfair)] text-4xl font-semibold tracking-tight md:text-5xl mb-4">Private Banking Jobs in Switzerland</h1>
              <p className="mx-auto max-w-2xl text-neutral-300 leading-relaxed">
                Live mandates across <strong>Geneva</strong> and <strong>Zurich</strong>, with international coverage in <strong>Dubai</strong>, <strong>Singapore</strong>, <strong>London</strong> &amp; <strong>New York</strong>. We publish a subset of searches; confidential roles are shared directly with qualified bankers.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
                <a href="/en/apply" className="rounded-full flex-shrink-0 whitespace-nowrap border border-brandGold/40 bg-black/30 px-3 py-1 text-xs font-semibold text-brandGoldPale hover:bg-brandGold/12 hover:text-white transition">Submit CV</a>
                <a href="/en/candidates" className="rounded-full flex-shrink-0 whitespace-nowrap border border-brandGold/40 bg-black/30 px-3 py-1 text-xs font-semibold text-brandGoldPale hover:bg-brandGold/12 hover:text-white transition">Candidate Hub</a>
                <a href="/en/contact" className="rounded-full flex-shrink-0 whitespace-nowrap border border-brandGold/40 bg-black/30 px-3 py-1 text-xs font-semibold text-brandGoldPale hover:bg-brandGold/12 hover:text-white transition">Contact a Recruiter</a>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-6">
              {HUBS.map(h => (
                <button key={h} onClick={() => setFilter(h)} className={`rounded-full px-4 py-1.5 text-xs font-semibold border transition ${filter === h ? "border-brandGold/60 bg-brandGold/15 text-brandGoldPale" : "border-white/10 bg-white/[0.03] text-neutral-400 hover:border-white/20 hover:text-white"}`}>{h}</button>
              ))}
              <span className="ml-auto text-xs text-neutral-500">{visible.length} mandate{visible.length !== 1 ? "s" : ""}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              {visible.map((m, i) => <MandateCard key={m.id} mandate={m} onScreen={setScreening} onBrief={setBrief} />)}
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center">
              <p className="text-neutral-300 mb-4">Don't see your exact market? We run confidential mandates continuously.</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a href="/en/contact" className="inline-flex items-center gap-2 rounded-xl border border-brandGold/70 bg-brandGold/15 px-5 py-2.5 text-sm font-semibold text-brandGoldPale hover:bg-brandGold/25 hover:text-white transition">Contact us</a>
                <a href="/en/candidates" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-neutral-300 hover:bg-white/10 hover:text-white transition">Register confidentially</a>
              </div>
            </div>
          </>
        ) : (
          <MandatePage mandate={selected} onBack={goBack} onApply={setScreening} />
        )}
      </div>
    </main>
  );
}
