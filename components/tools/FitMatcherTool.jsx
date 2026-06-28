"use client";
import { useState } from "react";

const GOLD = "#C9A14A";

const OPT = {
  aum: [
    { v: "sub50",   l: "Below CHF 50M" },
    { v: "50_150",  l: "CHF 50M - 150M" },
    { v: "150_500", l: "CHF 150M - 500M" },
    { v: "500_1b",  l: "CHF 500M - 1B" },
    { v: "above1b", l: "Above CHF 1B" },
  ],
  seniority: [
    { v: "srm",        l: "Senior Relationship Manager" },
    { v: "teamhead",   l: "Team Head / Desk Head" },
    { v: "markethead", l: "Market Head" },
    { v: "md",         l: "Managing Director / ED" },
  ],
  geography: [
    { v: "gcc",          l: "GCC - UAE, Saudi Arabia, Qatar" },
    { v: "israel",       l: "Israel" },
    { v: "turkey",       l: "Turkey" },
    { v: "latam_brazil", l: "LATAM - Brazil" },
    { v: "latam_other",  l: "LATAM - Argentina, Mexico, Colombia" },
    { v: "eu_france",    l: "European Onshore - France" },
    { v: "eu_dach",      l: "European Onshore - Germany, Austria, Switzerland" },
    { v: "eu_italy",     l: "European Onshore - Italy" },
    { v: "eu_benelux",   l: "European Onshore - Benelux" },
    { v: "swiss",        l: "Swiss Domestic" },
    { v: "uk",           l: "UK Onshore" },
    { v: "apac_sg",      l: "APAC - Singapore" },
    { v: "apac_hk",      l: "APAC - Hong Kong" },
    { v: "apac_other",   l: "APAC - Japan, Australia" },
    { v: "nri",          l: "NRI - India" },
    { v: "cis",          l: "CIS - Russia, Kazakhstan, Ukraine" },
    { v: "mea",          l: "MEA - Africa, South Africa" },
    { v: "multi",        l: "Multi-market" },
  ],
  clientType: [
    { v: "hnw",   l: "HNW (CHF 1M - 10M)" },
    { v: "uhnw",  l: "UHNW (CHF 10M - 50M)" },
    { v: "vhnw",  l: "VHNW / Family Office (CHF 50M+)" },
    { v: "mixed", l: "Mixed HNW / UHNW" },
  ],
  mandate: [
    { v: "hunter", l: "Hunter - new asset origination" },
    { v: "farmer", l: "Farmer - relationship development" },
    { v: "both",   l: "Both hunter and farmer" },
  ],
  employment: [
    { v: "bank", l: "Employed private bank" },
    { v: "eam",  l: "External Asset Manager (EAM)" },
    { v: "open", l: "Open to both" },
  ],
  booking: [
    { v: "geneva",         l: "Geneva" },
    { v: "zurich",         l: "Zurich" },
    { v: "dubai",          l: "Dubai (DIFC)" },
    { v: "abudhabi",       l: "Abu Dhabi (ADGM)" },
    { v: "singapore",      l: "Singapore" },
    { v: "hongkong",       l: "Hong Kong" },
    { v: "london",         l: "London" },
    { v: "luxembourg",     l: "Luxembourg" },
    { v: "liechtenstein",  l: "Liechtenstein" },
    { v: "monaco",         l: "Monaco" },
    { v: "telaviv",        l: "Tel Aviv" },
    { v: "miami",          l: "Miami" },
    { v: "newyork",        l: "New York" },
    { v: "multi",          l: "Multiple / Flexible" },
  ],
};

const DEMAND_STYLE = {
  High:      { color: "#c8a868", borderColor: "#b89557", bg: "rgba(184,149,87,0.08)" },
  Selective: { color: "#9a7840", borderColor: "#7a6237", bg: "rgba(122,98,55,0.08)" },
  Emerging:  { color: "#5a88b0", borderColor: "#3a5878", bg: "rgba(58,88,120,0.08)" },
};

const SYSTEM = `You are the market intelligence engine for Executive Partners, a Geneva-based boutique executive search firm specialising exclusively in private banking and wealth management. Generate personalised market positioning assessments. RULES: Never name specific institutions actively hiring. Only refer to institution types. Use only publicly known structural market dynamics. Be specific to this exact profile. Elegant institutional prose only. No bullet points. No em dashes. Valid JSON only, no markdown. Format: {"segment":"4-6 word label","demandLevel":"High|Selective|Emerging","demandRationale":"one sentence","positioning":"2-3 sentences","assets":"2-3 sentences","friction":"1-2 sentences","outlook":"1-2 sentences"}`;

function EPLabel({ children }) {
  return (
    <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2 font-light">
      {children}
    </p>
  );
}

function EPSelect({ label, value, onChange, opts }) {
  return (
    <div className="mb-5">
      <EPLabel>{label}</EPLabel>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full border border-white/10 text-white/80 text-sm px-3 py-2.5 pr-8 focus:outline-none focus:border-white/20 appearance-none cursor-pointer"
          style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
        >
          {opts.map(o => (
            <option key={o.v} value={o.v} style={{ background: "#0d1117", color: "rgba(255,255,255,0.8)" }}>
              {o.l}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M0 0L5 6L10 0" fill="#b89557" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function EPInput({ label, value, onChange, placeholder, type }) {
  return (
    <div className="mb-5">
      <EPLabel>{label}</EPLabel>
      <input
        type={type || "text"}
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        className="w-full border border-white/10 text-white/80 text-sm px-3 py-2.5 focus:outline-none focus:border-white/20 placeholder:text-white/20"
        style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
      />
    </div>
  );
}

function SectionHead({ children }) {
  return (
    <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-5 pb-3 border-b border-white/10">
      {children}
    </p>
  );
}

function ResultRow({ label, content, warn }) {
  return (
    <div className="mb-6">
      <EPLabel>{label}</EPLabel>
      <p className={"text-sm leading-relaxed " + (warn ? "text-[#d4a090]" : "text-white/70")}>
        {content}
      </p>
    </div>
  );
}

export default function FitMatcherTool() {
  const [f, setF] = useState({
    aum: "150_500", seniority: "srm", geography: "gcc",
    clientType: "uhnw", mandate: "hunter", employment: "bank",
    booking: "geneva", name: "", email: "",
  });
  const set = k => v => setF(p => ({ ...p, [k]: v }));
  const [phase, setPhase] = useState("input");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const assess = async () => {
    if (!f.email || !f.email.includes("@")) {
      setError("A valid email is required to receive your assessment.");
      return;
    }
    setError("");
    setPhase("loading");
    const userMsg = "Profile: AUM=" + f.aum + ", Seniority=" + f.seniority + ", Geography=" + f.geography + ", ClientType=" + f.clientType + ", Mandate=" + f.mandate + ", Employment=" + f.employment + ", Booking=" + f.booking;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system: SYSTEM, messages: [{ role: "user", content: userMsg }] }),
      });
      const data = await res.json();
      const raw = data.content?.find(b => b.type === "text")?.text || "";
      const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
      setResult(parsed);
      setPhase("results");
      fetch("/api/fit-matcher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, assessment: parsed, ts: new Date().toISOString() }),
      }).catch(() => {});
    } catch(err) {
      setError("Assessment could not be generated. Please try again.");
      setPhase("input");
    }
  };

  const dc = result ? (DEMAND_STYLE[result.demandLevel] || DEMAND_STYLE.Selective) : {};

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">

      <div className="border-b border-white/10 pb-8 mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/70 mb-3">
            Executive Partners · Free tool <span className="h-1 w-1 rounded-full bg-[#C9A14A]/80" /> Market Fit
          </div>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white mb-3">
          Private Bank Fit Assessment
        </h1>
        <p className="text-sm text-white/50 leading-relaxed max-w-lg">
          A market positioning analysis calibrated to your specific commercial profile.
          Submissions are reviewed against live market activity within 48 hours.
        </p>
      </div>

      {phase === "input" && (
        <div>
          <div className="grid grid-cols-2 gap-x-10 mb-8">
            <div>
              <SectionHead>Commercial Profile</SectionHead>
              <EPSelect label="AUM Under Management" value={f.aum} onChange={set("aum")} opts={OPT.aum} />
              <EPSelect label="Seniority Level" value={f.seniority} onChange={set("seniority")} opts={OPT.seniority} />
              <EPSelect label="Primary Client Geography" value={f.geography} onChange={set("geography")} opts={OPT.geography} />
              <EPSelect label="Client Tier" value={f.clientType} onChange={set("clientType")} opts={OPT.clientType} />
            </div>
            <div>
              <SectionHead>Mandate Preferences</SectionHead>
              <EPSelect label="Mandate Style" value={f.mandate} onChange={set("mandate")} opts={OPT.mandate} />
              <EPSelect label="Employment Structure" value={f.employment} onChange={set("employment")} opts={OPT.employment} />
              <EPSelect label="Target Booking Centre" value={f.booking} onChange={set("booking")} opts={OPT.booking} />
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 mb-8">
            <SectionHead>Contact for Follow-up</SectionHead>
            <div className="grid grid-cols-2 gap-x-10">
              <EPInput label="Name (optional)" value={f.name} onChange={v => setF(p => ({ ...p, name: v }))} placeholder="Your name" />
              <EPInput label="Email - your assessment will be sent here" value={f.email} onChange={v => setF(p => ({ ...p, email: v }))} placeholder="your@email.com" type="email" />
            </div>
          </div>
          {error && <p className="text-red-400/80 text-xs mb-4">{error}</p>}
          <button
            onClick={assess}
            className="border text-xs tracking-[0.25em] uppercase px-8 py-3.5 transition-all duration-200 hover:text-black"
            style={{ borderColor: GOLD, color: GOLD }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = GOLD; e.currentTarget.style.color = "#000"; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = GOLD; }}
          >
            Assess My Profile
          </button>
        </div>
      )}

      {phase === "loading" && (
        <div className="text-center py-20">
          <p className="text-[9px] tracking-[0.4em] uppercase text-white/30 mb-5">Analysing Market Configuration</p>
          <p className="text-sm text-white/40 leading-loose max-w-sm mx-auto">
            Cross-referencing your profile against structural market dynamics across Geneva, Zurich, Dubai, Singapore, and London.
          </p>
          <div className="flex justify-center gap-2 mt-8">
            {[0,1,2].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: GOLD, animation: "fmpulse 1.4s ease-in-out " + (i*0.28) + "s infinite" }} />
            ))}
          </div>
          <style>{"@keyframes fmpulse{0%,100%{opacity:.15;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}"}</style>
        </div>
      )}

      {phase === "results" && result && (
        <div>
          <div className="flex items-start justify-between gap-6 mb-7">
            <div>
              <EPLabel>Market Segment</EPLabel>
              <p className="text-xl font-light" style={{ color: GOLD }}>{result.segment}</p>
            </div>
            <div className="flex-shrink-0 text-center px-6 py-4 border" style={{ borderColor: dc.borderColor, backgroundColor: dc.bg, minWidth: 130 }}>
              <EPLabel>Market Demand</EPLabel>
              <p className="text-sm font-mono tracking-wider" style={{ color: dc.color }}>{result.demandLevel}</p>
            </div>
          </div>
          <p className="text-xs text-white/40 italic leading-relaxed mb-7">{result.demandRationale}</p>
          <div className="border-t border-white/10 my-7" />
          <ResultRow label="Market Positioning" content={result.positioning} />
          <ResultRow label="Commercial Assets" content={result.assets} />
          <ResultRow label="Structural Friction Points" content={result.friction} warn />
          <ResultRow label="12 to 18 Month Outlook" content={result.outlook} />
          <div className="border-t border-white/10 my-7" />
          <div className="pl-5 py-5 pr-5" style={{ borderLeft: "2px solid rgba(184,149,87,0.3)", backgroundColor: "rgba(184,149,87,0.05)" }}>
            <EPLabel>Next Steps</EPLabel>
            <p className="text-sm text-white/70 leading-relaxed">
              Your profile has been received by Executive Partners. We will review your configuration against current market activity and be in touch within 48 hours if we identify relevant positioning for your specific combination.
            </p>
            {f.email && <p className="text-xs text-white/30 mt-2">Confirmation sent to {f.email}.</p>}
          </div>
          <button
            onClick={() => { setPhase("input"); setResult(null); }}
            className="mt-6 border border-white/10 text-white/30 text-[9px] tracking-[0.25em] uppercase px-5 py-2.5 hover:border-white/20 hover:text-white/50 transition-all"
          >
            Run Another Assessment
          </button>
        </div>
      )}

      <div className="border-t border-white/10 mt-12 pt-5 text-[10px] text-white/20 leading-relaxed">
        Executive Partners · Geneva · execpartners.ch · recruiter@execpartners.ch<br />
        Market positioning assessment based on structural dynamics only. All submissions are treated with absolute discretion in accordance with Swiss data protection standards.
      </div>
    </div>
  );
}
