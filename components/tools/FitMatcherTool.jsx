"use client";
import { useState } from "react";

const G = {
  gold:    "#b89557",
  goldDim: "#7a6237",
  text:    "#ede5d8",
  sub:     "#c0aa90",
  muted:   "#8a7a6a",
  border:  "#2e2c28",
  input:   "#161410",
  warn:    "#d4a090",
};
const serif = "Georgia, \'Times New Roman\', serif";
const mono  = "\'Courier New\', monospace";

const OPT = {
  aum: [
    { v: "sub50",    l: "Below CHF 50M" },
    { v: "50_150",   l: "CHF 50M - 150M" },
    { v: "150_500",  l: "CHF 150M - 500M" },
    { v: "500_1b",   l: "CHF 500M - 1B" },
    { v: "above1b",  l: "Above CHF 1B" },
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
  High:      { border: "#b89557", text: "#c8a868", bg: "rgba(184,149,87,0.10)" },
  Selective: { border: "#7a6237", text: "#a07840", bg: "rgba(122,98,55,0.10)" },
  Emerging:  { border: "#3a5878", text: "#5a88b0", bg: "rgba(58,88,120,0.10)" },
};

const SYSTEM = `You are the market intelligence engine for Executive Partners, a Geneva-based boutique executive search firm specialising exclusively in private banking and wealth management. You generate personalised market positioning assessments for senior private banking candidates. ABSOLUTE RULES: Never name specific banks, EAMs, or institutions that are actively hiring. Refer only to institution types. Base all commentary exclusively on publicly known structural market dynamics. Be genuinely specific to this exact profile combination. Write in elegant institutional prose. No bullet points. No em dashes. Respond ONLY with valid JSON, no markdown, no backticks. Required JSON: { "segment": "4 to 6 word label", "demandLevel": "High" or "Selective" or "Emerging", "demandRationale": "one sentence", "positioning": "two to three sentences", "assets": "two to three sentences", "friction": "one to two sentences", "outlook": "one to two sentences" }`;

function Cap({ children, style = {} }) {
  return <div style={{ fontSize: 9, letterSpacing: 4, color: G.muted, textTransform: "uppercase", fontFamily: serif, ...style }}>{children}</div>;
}
function Label({ children }) {
  return <div style={{ fontSize: 10, letterSpacing: 3, color: G.sub, textTransform: "uppercase", marginBottom: 8, fontFamily: serif }}>{children}</div>;
}
function Field({ label, children, style = {} }) {
  return <div style={{ marginBottom: 20, ...style }}><Label>{label}</Label>{children}</div>;
}
function Sel({ value, onChange, opts }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} style={{
      width: "100%", background: G.input, border: `1px solid ${G.border}`,
      color: G.text, padding: "11px 36px 11px 14px", fontSize: 13, fontFamily: serif,
      cursor: "pointer", outline: "none", appearance: "none",
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'6\'%3E%3Cpath d=\'M0 0l5 6 5-6z\' fill=\'%23b89557\'/%3E%3C/svg%3E")`,
      backgroundRepeat: "no-repeat", backgroundPosition: "right 13px center",
    }}>
      {opts.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  );
}
function Inp({ value, onChange, placeholder, type = "text" }) {
  return (
    <input type={type} value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} style={{
      width: "100%", background: G.input, border: `1px solid ${G.border}`,
      color: G.text, padding: "11px 14px", fontSize: 13, fontFamily: serif,
      outline: "none", boxSizing: "border-box",
    }} />
  );
}
function ResultBlock({ label, content, warn }) {
  return (
    <div style={{ marginBottom: 26 }}>
      <Label>{label}</Label>
      <p style={{ margin: 0, fontSize: 14, color: warn ? G.warn : G.text, lineHeight: 1.85 }}>{content}</p>
    </div>
  );
}

export default function FitMatcherTool() {
  const [f, setF] = useState({ aum: "150_500", seniority: "srm", geography: "gcc", clientType: "uhnw", mandate: "hunter", employment: "bank", booking: "geneva", name: "", email: "" });
  const set = k => v => setF(p => ({ ...p, [k]: v }));
  const [phase, setPhase] = useState("input");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const assess = async () => {
    if (!f.email || !f.email.includes("@")) { setError("A valid email is required."); return; }
    setError(""); setPhase("loading");
    const userMsg = `Assess: AUM: ${f.aum}, Seniority: ${f.seniority}, Market: ${f.geography}, Client: ${f.clientType}, Mandate: ${f.mandate}, Employment: ${f.employment}, Booking: ${f.booking}`;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system: SYSTEM, messages: [{ role: "user", content: userMsg }] }),
      });
      const data = await res.json();
      const raw = data.content?.find(b => b.type === "text")?.text || "";
      const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
      setResult(parsed); setPhase("results");
      fetch("/api/fit-matcher", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...f, assessment: parsed, ts: new Date().toISOString() }) }).catch(() => {});
    } catch { setError("Assessment could not be generated. Please try again."); setPhase("input"); }
  };

  const dc = result ? (DEMAND[result.demandLevel] || DEMAND.Selective) : {};
  const hr = { borderTop: `1px solid ${G.border}`, margin: "28px 0" };
  const sectionHead = { fontSize: 9, letterSpacing: 4, color: G.sub, textTransform: "uppercase", fontFamily: serif, marginBottom: 20, borderBottom: `1px solid ${G.border}`, paddingBottom: 12 };

  return (
    <div style={{ fontFamily: serif, color: G.text, maxWidth: 840, margin: "0 auto", padding: "48px 32px 64px" }}>
      <div style={{ borderBottom: `1px solid ${G.border}`, paddingBottom: 28, marginBottom: 36 }}>
        <div style={{ fontSize: 9, letterSpacing: 5, color: G.muted, textTransform: "uppercase", marginBottom: 12 }}>Executive Partners · Geneva · execpartners.ch</div>
        <h1 style={{ margin: "0 0 12px", fontSize: 28, fontWeight: 400, color: G.text, lineHeight: 1.25 }}>Private Bank Fit Assessment</h1>
        <p style={{ margin: 0, fontSize: 14, color: G.sub, lineHeight: 1.8, maxWidth: 520 }}>A market positioning analysis calibrated to your specific commercial profile. Submissions are reviewed against live market activity within 48 hours.</p>
      </div>

      {phase === "input" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 40px" }}>
            <div>
              <div style={sectionHead}>Commercial Profile</div>
              <Field label="AUM Under Management"><Sel value={f.aum} onChange={set("aum")} opts={OPT.aum} /></Field>
              <Field label="Seniority Level"><Sel value={f.seniority} onChange={set("seniority")} opts={OPT.seniority} /></Field>
              <Field label="Primary Client Geography"><Sel value={f.geography} onChange={set("geography")} opts={OPT.geography} /></Field>
              <Field label="Client Tier"><Sel value={f.clientType} onChange={set("clientType")} opts={OPT.clientType} /></Field>
            </div>
            <div>
              <div style={sectionHead}>Mandate Preferences</div>
              <Field label="Mandate Style"><Sel value={f.mandate} onChange={set("mandate")} opts={OPT.mandate} /></Field>
              <Field label="Employment Structure"><Sel value={f.employment} onChange={set("employment")} opts={OPT.employment} /></Field>
              <Field label="Target Booking Centre"><Sel value={f.booking} onChange={set("booking")} opts={OPT.booking} /></Field>
            </div>
          </div>
          <div style={hr} />
          <div style={{ fontSize: 9, letterSpacing: 4, color: G.sub, textTransform: "uppercase", marginBottom: 20 }}>Contact for Follow-up</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px", marginBottom: 28 }}>
            <Field label="Name (optional)"><Inp value={f.name} onChange={v => setF(p => ({ ...p, name: v }))} placeholder="Your name" /></Field>
            <Field label="Email - your assessment will be sent here"><Inp value={f.email} onChange={v => setF(p => ({ ...p, email: v }))} placeholder="your@email.com" type="email" /></Field>
          </div>
          {error && <p style={{ color: "#d06050", fontSize: 12, marginBottom: 16 }}>{error}</p>}
          <button onClick={assess} style={{ background: "transparent", border: `1px solid ${G.gold}`, color: G.gold, padding: "14px 36px", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", cursor: "pointer", fontFamily: serif }}
            onMouseEnter={e => { e.currentTarget.style.background = G.gold; e.currentTarget.style.color = "#080808"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = G.gold; }}>
            Assess My Profile
          </button>
        </div>
      )}

      {phase === "loading" && (
        <div style={{ textAlign: "center", padding: "72px 0" }}>
          <div style={{ fontSize: 9, letterSpacing: 5, color: G.sub, textTransform: "uppercase", marginBottom: 20 }}>Analysing Market Configuration</div>
          <p style={{ color: G.muted, fontSize: 13, lineHeight: 2, margin: "0 auto", maxWidth: 360 }}>Cross-referencing your profile against structural market dynamics across Geneva, Zurich, Dubai, Singapore, and London.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 32 }}>
            {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: G.gold, animation: `fmpulse 1.4s ease-in-out ${i*0.28}s infinite` }} />)}
          </div>
          <style>{`@keyframes fmpulse{0%,100%{opacity:.15;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}`}</style>
        </div>
      )}

      {phase === "results" && result && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24, marginBottom: 28 }}>
            <div>
              <div style={{ fontSize: 9, letterSpacing: 4, color: G.muted, textTransform: "uppercase", marginBottom: 10 }}>Market Segment</div>
              <div style={{ fontSize: 22, color: G.gold, fontWeight: 400, lineHeight: 1.3 }}>{result.segment}</div>
            </div>
            <div style={{ flexShrink: 0, background: dc.bg, border: `1px solid ${dc.border}`, padding: "16px 24px", textAlign: "center", minWidth: 140 }}>
              <div style={{ fontSize: 9, letterSpacing: 3, color: G.muted, textTransform: "uppercase", marginBottom: 8 }}>Market Demand</div>
              <div style={{ fontFamily: mono, fontSize: 15, color: dc.text, letterSpacing: 1 }}>{result.demandLevel}</div>
            </div>
          </div>
          <p style={{ fontSize: 13, color: G.sub, fontStyle: "italic", lineHeight: 1.8, margin: "0 0 28px" }}>{result.demandRationale}</p>
          <div style={hr} />
          <ResultBlock label="Market Positioning" content={result.positioning} />
          <ResultBlock label="Commercial Assets" content={result.assets} />
          <ResultBlock label="Structural Friction Points" content={result.friction} warn />
          <ResultBlock label="12 to 18 Month Outlook" content={result.outlook} />
          <div style={hr} />
          <div style={{ borderLeft: `3px solid ${G.goldDim}`, padding: "20px 24px", background: "rgba(184,149,87,0.05)" }}>
            <div style={{ fontSize: 9, letterSpacing: 4, color: G.goldDim, textTransform: "uppercase", marginBottom: 12 }}>Next Steps</div>
            <p style={{ margin: 0, fontSize: 14, color: G.text, lineHeight: 1.85 }}>Your profile has been received by Executive Partners. We will review your configuration against current market activity and be in touch within 48 hours if we identify relevant positioning for your specific combination.</p>
            {f.email && <p style={{ fontSize: 11, color: G.muted, margin: "10px 0 0" }}>Confirmation sent to {f.email}.</p>}
          </div>
          <button onClick={() => { setPhase("input"); setResult(null); }} style={{ background: "transparent", border: `1px solid ${G.border}`, color: G.muted, padding: "10px 22px", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", cursor: "pointer", fontFamily: serif, marginTop: 24 }}>
            Run Another Assessment
          </button>
        </div>
      )}

      <div style={{ borderTop: `1px solid ${G.border}`, marginTop: 48, paddingTop: 20, fontSize: 10, color: G.muted, lineHeight: 1.9 }}>
        Executive Partners · Geneva · execpartners.ch · recruiter@execpartners.ch<br />
        Market positioning assessment based on structural dynamics only. All submissions are treated with absolute discretion in accordance with Swiss data protection standards.
      </div>
    </div>
  );
}
