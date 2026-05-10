// @ts-nocheck
"use client";
import { useEffect } from "react";

export function BriefDrawer({ mandate, onClose, onApply }) {
  const href = "/en/jobs/" + mandate["id"];
  const paragraphs = mandate.brief.split("\n\n");
  const steps = mandate.process.split(" \u00b7 ");

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div>
      <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[620px] flex-col bg-[#0B0F1A] border-l border-white/10 shadow-[-32px_0_80px_rgba(0,0,0,.8)]">

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between px-8 py-5 border-b border-white/[0.07] bg-[#0B0F1A]/95 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{mandate.flag}</span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A14A]/80">{mandate.tag}</p>
              {mandate.urgent && (
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-green-400">Actively Filling</span>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/5 text-white/40 hover:border-white/20 hover:text-white transition text-lg"
          >
            &#10005;
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-8 py-7 space-y-7">

          {/* Title */}
          <div>
            <h2 className="font-[var(--font-playfair)] text-[1.9rem] font-semibold leading-tight text-white mb-1.5">
              {mandate.title}
            </h2>
            <p className="text-base text-neutral-400">{mandate.subtitle} &nbsp;&middot;&nbsp; {mandate.location}</p>
          </div>

          {/* At a glance strip */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02))] p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A14A]/80 mb-1.5">Base Salary</p>
              <p className="text-base font-bold text-white leading-tight">{mandate.comp_base}</p>
              <p className="text-[11px] text-neutral-500 mt-1 leading-snug">{mandate.comp_note}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02))] p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-1.5">Portable Book</p>
              <p className="text-base font-bold text-white leading-tight">{mandate.aum}</p>
              <p className="text-[11px] text-neutral-500 mt-1 leading-snug">{mandate.aum_note}</p>
            </div>
          </div>

          {/* The Opportunity */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="h-5 w-0.5 rounded-full bg-[#C9A14A]" />
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C9A14A]/80">The Opportunity</p>
            </div>
            <div className="space-y-3">
              {paragraphs.map((para, i) => (
                <p key={i} className="text-[14px] text-neutral-300 leading-[1.8]">{para}</p>
              ))}
            </div>
          </div>

          {/* What You Bring */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="h-5 w-0.5 rounded-full bg-[#C9A14A]" />
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C9A14A]/80">What You Bring</p>
            </div>
            <p className="text-xs text-neutral-600 mb-5 ml-4">The profile that succeeds in this mandate.</p>
            <ul className="space-y-3">
              {mandate.profile_lines.map((line, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-[4px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#C9A14A]/30 bg-[#C9A14A]/10 text-[#C9A14A] text-[10px] font-bold">
                    {i + 1}
                  </span>
                  <span className="text-[13px] text-neutral-300 leading-relaxed">{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Process */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="h-5 w-0.5 rounded-full bg-[#C9A14A]" />
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C9A14A]/80">Selection Process</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  {i > 0 && <span className="text-white/20">&#8594;</span>}
                  <span className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-neutral-400">{step}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[11px] text-neutral-600 leading-relaxed">
              No panels. Your information is never shared without your explicit consent.
            </p>
          </div>

          {/* Why EP */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600 mb-4">Why Executive Partners</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                ["200+", "Senior placements"],
                ["98%", "Retention rate"],
                ["1", "Point of contact"],
                ["24h", "Response time"],
              ].map(([stat, label], i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <span className="text-[#C9A14A] font-bold text-sm w-10 shrink-0">{stat}</span>
                  <span className="text-[11px] text-neutral-600">{label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sticky footer CTAs */}
        <div className="shrink-0 border-t border-white/[0.07] bg-[#0B0F1A]/95 backdrop-blur-md px-8 py-5 space-y-2.5">
          <button
            onClick={() => { onClose(); onApply(mandate); }}
            className="w-full rounded-xl bg-[#C9A14A] py-3 text-sm font-bold text-black hover:opacity-90 transition shadow-[0_4px_20px_rgba(201,161,74,.25)]"
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
            100% CONFIDENTIAL &nbsp;&middot;&nbsp; GDPR COMPLIANT
          </p>
        </div>

      </div>
    </div>
  );
}
