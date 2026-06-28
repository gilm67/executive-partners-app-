"use client";
import { useState } from "react";

// ─── Design tokens (matches execpartners.ch) ─────────────────────────────────
const C = {
  bg:      "#080808",
  surface: "#0e0e0e",
  lift:    "#121212",
  border:  "#1c1c1c",
  gold:    "#b89557",
  goldDim: "#7a6237",
  text:    "#d8cfc0",
  muted:   "#5e5648",
  dim:     "#3a3530",
  warn:    "#9b3a28",
  warnText:"#c09080",
};
const serif = "Georgia, 'Times New Roman', serif";
const mono  = "'Courier New', monospace";

// ─── Form options ─────────────────────────────────────────────────────────────
const OPT = {
  aum: [
    { v: "sub50",   l: "Below CHF 50M" },
    { v: "50_150",  l: "CHF 50M – 150M" },
    { v: "150_500", l: "CHF 150M – 500M" },
    { v: "500_1b",  l: "CHF 500M – 1B" },
    { v: "above1b", l: "Above CHF 1B" },
  ],
  seniority: [
    { v: "srm",        l: "Senior Relationship Manager" },
    { v: "teamhead",   l: "Team Head / Desk Head" },
    { v: "markethead", l: "Market Head" },
    { v: "md",         l: "Managing Director / ED" },
  ],
  geography: [
    { v: "gcc",              l: "GCC / Middle East" },
    { v: "latam",            l: "LATAM" },
    { v: "european_onshore", l: "European Onshore" },
    { v: "swiss_domestic",   l: "Swiss Domestic" },
    { v: "apac",             l: "APAC" },
    { v: "cis",              l: "CIS / Eastern Europe" },
    { v: "multi",            l: "Multi-market" },
  ],
  clientType: [
    { v: "hnw",   l: "HNW (CHF 1M – 10M)" },
    { v: "uhnw",  l: "UHNW (CHF 10M – 50M)" },
    { v: "vhnw",  l: "VHNW / Family Office (CHF 50M+)" },
    { v: "mixed", l: "Mixed HNW / UHNW" },
  ],
  mandate: [
    { v: "hunter", l: "Hunter — new asset origination" },
    { v: "farmer", l: "Farmer — relationship development" },
    { v: "both",   l: "Both hunter and farmer" },
  ],
  employment: [
    { v: "bank", l: "Employed private bank" },
    { v: "eam",  l: "External Asset Manager (EAM)" },
    { v: "open", l: "Open to both" },
  ],
  booking: [
    { v: "geneva",    l: "Geneva" },
    { v: "zurich",    l: "Zurich" },
    { v: "dubai",     l: "Dubai (DIFC)" },
    { v: "singapore", l: "Singapore" },
    { v: "hongkong",  l: "Hong Kong" },
    { v: "london",    l: "London" },
    { v: "multi",     l: "Multiple / Flexible" },
  ],
};

const DEMAND = {
  High:      { bg: "#0e0900", border: "#b89557", text: "#b89557" },
  Selective: { bg: "#0d0800", border: "#7a6237", text: "#a07840" },
  Emerging:  { bg: "#080c12", border: "#2a4060", text: "#5a80a0" },
};

// ─── Micro components ─────────────────────────────────────────────────────────
function Cap({ children, style = {} }) {
  return (
    <div style={{ fontSize: 9, letterSpacing: 4, color: C.muted, textTransform: "uppercase", ...style }}>
      {children}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <Cap style={{ marginBottom: 8 }}>{label}</Cap>
      {children}
    </div>
  );
}

function Sel({ value, onChange, opts }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} style={{
      width: "100%", background: "#0b0b0b", border: `1px solid ${C.border}`,
      color: C.text, padding: "10px 36px 10px 12px", fontSize: 12, fontFamily: serif,
      cursor: "pointer", outline: "none", appearance: "none",
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23b89557'/%3E%3C/svg%3E")`,
      backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center",
    }}>
      {opts.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  );
}

function Inp({ value, onChange, placeholder, type = "text" }) {
  return (
    <input type={type} value={value} placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      style={{
        width: "100%", background: "#0b0b0b", border: `1px solid ${C.border}`,
        color: C.text, padding: "10px 12px", fontSize: 13, fontFamily: serif,
        outline: "none", boxSizing: "border-box",
      }} />
  );
}

function Divider() {
  return <div style={{ borderTop: `1px solid ${C.border}`, margin: "24px 0" }} />;
}

function ResultBlock({ label, content, warn }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <Cap style={{ color: warn ? "#7a4030" : C.muted, marginBottom: 8 }}>{label}</Cap>
      <p style={{ margin: 0, fontSize: 13, color: warn ? C.warnText : C.text, lineHeight: 1.85 }}>
        {content}
      </p>
    </div>
  );
}

// ─── System prompt for Claude ─────────────────────────────────────────────────
const SYSTEM = `You are the market intelligence engine for Executive Partners, a Geneva-based boutique executive search firm specialising exclusively in private banking and wealth management.

You generate personalised market positioning assessments for senior private banking candidates.

ABSOLUTE RULES:
- Never name specific banks, EAMs, or institutions that are actively hiring. Refer only to institution types: boutiques, mid-size private banks, large universal banks, EAM structures, family offices.
- Base all commentary exclusively on publicly known structural market dynamics. Never invent or imply specific live mandates.
- Be genuinely specific to this exact profile combination. Generic output is a failure.
- Write in elegant institutional prose. No bullet points. No em dashes. No hyphens used as dashes. Commas and full stops only.
- Each field must be substantive and precise.
- Respond ONLY with valid JSON. No markdown fences, no backticks, no preamble, no postamble.

Required JSON format (exact keys):
{
  "segment": "4 to 6 word market segment label for this profile",
  "demandLevel": "High" or "Selective" or "Emerging",
  "demandRationale": "One precise sentence on demand level based on observable market dynamics",
  "positioning": "Two to three sentences on where this profile sits structurally in the current private banking landscape",
  "assets": "Two to three sentences on the genuine commercial assets this profile brings to prospective institutions",
  "friction": "One to two sentences on honest structural friction points this profile faces in the current market",
  "outlook": "One to two sentences on the 12 to 18 month market outlook for this profile type"
}`;

// ─── Main component ───────────────────────────────────────────────────────────
export default function FitMatcherTool() {
  const [f, setF] = useState({
    aum: "150_500", seniority: "srm", geography: "gcc",
    clientType: "uhnw", mandate: "hunter", employment: "bank",
    booking: "geneva", name: "", email: "",
  });
  const set = k => v => setF(p => ({ ...p, [k]: v }));

  const [phase, setPhase]   = useState("input");   // input | loading | results
  const [result, setResult] = useState(null);
  const [error, setError]   = useState("");

  const assess = async () => {
    if (!f.email || !f.email.includes("@")) {
      setError("A valid email is required to receive your assessment.");
      return;
    }
    setError("");
    setPhase("loading");

    const userMsg = `Assess this private banking profile:
AUM: ${f.aum}
Seniority: ${f.seniority}
Primary Market: ${f.geography}
Client Tier: ${f.clientType}
Mandate Style: ${f.mandate}
Employment Preference: ${f.employment}
Target Booking Centre: ${f.booking}`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: SYSTEM,
          messages: [{ role: "user", content: userMsg }],
        }),
      });

      const data = await res.json();
      const raw  = data.content?.find(b => b.type === "text")?.text || "";
      const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
      setResult(parsed);
      setPhase("results");

      // Silent backend lead capture (non-blocking)
      fetch("/api/fit-matcher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, assessment: parsed, ts: new Date().toISOString() }),
      }).catch(() => {});

    } catch {
      setError("Assessment could not be generated. Please try again.");
      setPhase("input");
    }
  };

  const dc = result ? (DEMAND[result.demandLevel] || DEMAND.Selective) : {};

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: serif, minHeight: "100vh", padding: "36px 28px", maxWidth: 880, margin: "0 auto" }}>

      {/* Header */}
      <div style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: 24, marginBottom: 32 }}>
        <Cap style={{ marginBottom: 10, letterSpacing: 5 }}>Executive Partners · Geneva · execpartners.ch</Cap>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 400, color: C.text, lineHeight: 1.3 }}>
          Private Bank Fit Assessment
        </h1>
        <p style={{ margin: "10px 0 0", fontSize: 13, color: C.muted, lineHeight: 1.75, maxWidth: 520 }}>
          A market positioning analysis calibrated to your specific commercial profile.
          Submissions are reviewed against live market activity within 48 hours.
        </p>
      </div>

      {/* ── INPUT PHASE ──────────────────────────────────────────────────────── */}
      {phase === "input" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 36px" }}>

            {/* Left column */}
            <div>
              <Cap style={{ marginBottom: 18, borderBottom: `1px solid ${C.border}`, paddingBottom: 10 }}>
                Commercial Profile
              </Cap>
              <Field label="AUM Under Management">
                <Sel value={f.aum} onChange={set("aum")} opts={OPT.aum} />
              </Field>
              <Field label="Seniority Level">
                <Sel value={f.seniority} onChange={set("seniority")} opts={OPT.seniority} />
              </Field>
              <Field label="Primary Client Geography">
                <Sel value={f.geography} onChange={set("geography")} opts={OPT.geography} />
              </Field>
              <Field label="Client Tier">
                <Sel value={f.clientType} onChange={set("clientType")} opts={OPT.clientType} />
              </Field>
            </div>

            {/* Right column */}
            <div>
              <Cap style={{ marginBottom: 18, borderBottom: `1px solid ${C.border}`, paddingBottom: 10 }}>
                Mandate Preferences
              </Cap>
              <Field label="Mandate Style">
                <Sel value={f.mandate} onChange={set("mandate")} opts={OPT.mandate} />
              </Field>
              <Field label="Employment Structure">
                <Sel value={f.employment} onChange={set("employment")} opts={OPT.employment} />
              </Field>
              <Field label="Target Booking Centre">
                <Sel value={f.booking} onChange={set("booking")} opts={OPT.booking} />
              </Field>
            </div>
          </div>

          <Divider />

          {/* Contact */}
          <Cap style={{ marginBottom: 18 }}>Contact for Follow-up</Cap>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
            <Field label="Name (optional)">
              <Inp value={f.name} onChange={set("name")} placeholder="Your name" />
            </Field>
            <Field label="Email — your assessment will be sent here">
              <Inp value={f.email} onChange={set("email")} placeholder="your@email.com" type="email" />
            </Field>
          </div>

          {error && <p style={{ color: "#c0503a", fontSize: 12, marginBottom: 16 }}>{error}</p>}

          <button onClick={assess} style={{
            background: "transparent", border: `1px solid ${C.gold}`, color: C.gold,
            padding: "13px 32px", fontSize: 10, letterSpacing: 4, textTransform: "uppercase",
            cursor: "pointer", fontFamily: serif,
          }}
            onMouseEnter={e => { e.currentTarget.style.background = C.gold; e.currentTarget.style.color = C.bg; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.gold; }}>
            Assess My Profile
          </button>
        </div>
      )}

      {/* ── LOADING PHASE ─────────────────────────────────────────────────────── */}
      {phase === "loading" && (
        <div style={{ textAlign: "center", padding: "80px 20px" }}>
          <Cap style={{ letterSpacing: 5, marginBottom: 20 }}>Analysing Market Configuration</Cap>
          <p style={{ color: C.muted, fontSize: 13, lineHeight: 2, margin: "0 auto", maxWidth: 340 }}>
            Cross-referencing your profile against structural market dynamics across
            Geneva, Zurich, Dubai, Singapore, and London.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 32 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: 5, height: 5, borderRadius: "50%", background: C.gold,
                animation: `ep-pulse 1.4s ease-in-out ${i * 0.28}s infinite`,
              }} />
            ))}
          </div>
          <style>{`
            @keyframes ep-pulse {
              0%, 100% { opacity: 0.15; transform: scale(0.8); }
              50%       { opacity: 1;    transform: scale(1.2); }
            }
          `}</style>
        </div>
      )}

      {/* ── RESULTS PHASE ─────────────────────────────────────────────────────── */}
      {phase === "results" && result && (
        <div>
          {/* Segment + Demand row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, gap: 20 }}>
            <div>
              <Cap style={{ marginBottom: 8 }}>Market Segment</Cap>
              <div style={{ fontSize: 21, color: C.gold, fontWeight: 400, lineHeight: 1.3 }}>
                {result.segment}
              </div>
            </div>
            <div style={{
              flexShrink: 0, background: dc.bg, border: `1px solid ${dc.border}`,
              padding: "14px 22px", textAlign: "center",
            }}>
              <Cap style={{ marginBottom: 6 }}>Market Demand</Cap>
              <div style={{ fontFamily: mono, fontSize: 15, color: dc.text }}>{result.demandLevel}</div>
            </div>
          </div>

          <p style={{ fontSize: 12, color: C.muted, fontStyle: "italic", lineHeight: 1.7, margin: "0 0 28px" }}>
            {result.demandRationale}
          </p>

          <Divider />

          <ResultBlock label="Market Positioning"        content={result.positioning} />
          <ResultBlock label="Commercial Assets"         content={result.assets} />
          <ResultBlock label="Structural Friction Points" content={result.friction} warn />
          <ResultBlock label="12 to 18 Month Outlook"   content={result.outlook} />

          <Divider />

          {/* CTA block */}
          <div style={{
            background: "#09080a", border: `1px solid #1e1628`,
            borderLeft: `3px solid ${C.goldDim}`, padding: "22px 22px",
          }}>
            <Cap style={{ color: C.goldDim, marginBottom: 12 }}>Next Steps</Cap>
            <p style={{ margin: 0, fontSize: 14, color: C.text, lineHeight: 1.85 }}>
              Your profile has been received by Executive Partners. We will review your
              configuration against current market activity and be in touch within 48 hours
              if we identify relevant positioning for your specific combination.
            </p>
            {f.email && (
              <p style={{ fontSize: 11, color: C.muted, margin: "12px 0 0" }}>
                Confirmation sent to {f.email}.
              </p>
            )}
          </div>

          <div style={{ marginTop: 24 }}>
            <button onClick={() => { setPhase("input"); setResult(null); }} style={{
              background: "transparent", border: `1px solid ${C.border}`, color: C.muted,
              padding: "10px 22px", fontSize: 9, letterSpacing: 3, textTransform: "uppercase",
              cursor: "pointer", fontFamily: serif,
            }}>
              Run Another Assessment
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 44, paddingTop: 18, fontSize: 10, color: C.dim, lineHeight: 1.9 }}>
        Executive Partners · Geneva · execpartners.ch · recruiter@execpartners.ch
        <br />
        Market positioning assessment based on structural dynamics only. Submissions are treated with absolute
        discretion in accordance with Swiss data protection standards. This tool does not constitute a job offer
        or guarantee of placement.
      </div>

    </div>
  );
}
