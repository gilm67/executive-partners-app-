// @ts-nocheck
"use client";
import { useEffect } from "react";

export function BriefDrawer({ mandate, onClose, onApply }) {
  const href = "/en/jobs/" + mandate["id"];

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/65 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[600px] flex-col bg-[#0D1117] shadow-[-24px_0_80px_rgba(0,0,0,.7)] border-l border-white/10">

        <div className="flex shrink-0 items-center justify-between px-7 py-4 bg-[#0D1117]/96 backdrop-blur-md border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <span className="text-xl">{mandate.flag}</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brandGoldSoft">{mandate.tag}</span>
          </div>
          <button onClick={onClose} aria-label="Close" className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white transition">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-7 py-7 space-y-7">
          <div>
            <h2 className="font-[var(--font-playfair)] text-[2rem] font-semibold leading-tight text-white mb-1.5">{mandate.title}</h2>
            <p className="text-lg text-neutral-300">{mandate.subtitle} · {mandate.location}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.03))] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brandGoldSoft mb-2">Indicative Compensation</p>
              <p className="text-xl font-bold text-white leading-tight">{mandate.comp_base}</p>
              <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">{mandate.comp_note}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.03))] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-2">Portable Book</p>
              <p className="text-xl font-bold text-white leading-tight">{mandate.aum}</p>
              <p className="text-xs text-neutral-400 mt-1.5">{mandate.aum_note}</p>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500 mb-4">The Opportunity</p>
            {mandate.brief.split("\n\n").map((para, i) => (
              <p key={i} className="text-[15px] text-neutral-300 leading-[1.75] mb-3">{para}</p>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500 mb-4">Ideal Profile</p>
            <ul className="space-y-3">
              {mandate.profile_lines.map((line, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-brandGold opacity-60" />
                  <span className="text-[14px] text-neutral-300 leading-relaxed">{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500 mb-3">Process</p>
            <div className="flex flex-wrap gap-2">
              {mandate.process.split(" \u00b7 ").map((step, i) => (
                <span key={i} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-neutral-400">{step}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="shrink-0 border-t border-white/[0.08] bg-[#0D1117]/96 backdrop-blur-md px-7 py-5 space-y-3">
          <button
            onClick={() => { onClose(); onApply(mandate); }}
            className="w-full rounded-xl border border-brandGold/70 bg-brandGold py-3 text-sm font-bold text-black hover:bg-brandGoldSoft transition shadow-[0_4px_20px_rgba(201,161,74,.25)]"
          >
            Check My Profile and Apply
          </button>
          
          <a
            href={href}
            className="block w-full rounded-xl border border-white/15 bg-white/[0.04] py-3 text-center text-sm font-semibold text-neutral-300 hover:bg-white/10 hover:text-white transition"
          >
            Full Details
          </a>
          <p className="text-center text-[10px] tracking-widest text-white/20">
            100% CONFIDENTIAL
          </p>
        </div>
      </div>
    </>
  );
}
