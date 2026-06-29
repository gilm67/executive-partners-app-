"use client";
import { useState, useEffect } from "react";

const GOLD = "#C9A14A";
const GOLD_DIM = "rgba(201,161,74,0.12)";
const GOLD_BORDER = "rgba(201,161,74,0.28)";

const OPT = {
  aum: [
    { v: "sub50",   l: "Under CHF 50M" },
    { v: "50_150",  l: "CHF 50M - 150M" },
    { v: "150_500", l: "CHF 150M - 500M" },
    { v: "500_1b",  l: "CHF 500M - 1B" },
    { v: "above1b", l: "Above CHF 1B" },
  ],
  seniority: [
    { v: "advisor",  l: "Investment Advisor / RM" },
    { v: "srm",      l: "Senior Relationship Manager" },
    { v: "teamhead", l: "Team Head / Managing Director" },
    { v: "market",   l: "Market Head / Regional Head" },
  ],
  geography: [
    { v: "gcc",       l: "GCC - UAE, Saudi Arabia, Qatar" },
    { v: "israel",    l: "Israel" },
    { v: "eu_france", l: "Europe - France" },
    { v: "eu_italy",  l: "Europe - Italy" },
    { v: "eu_iberia", l: "Europe - Iberia" },
    { v: "eu_dach",   l: "Europe - DACH" },
    { v: "latam_br",  l: "Latin America - Brazil" },
    { v: "latam_mx",  l: "Latin America - Mexico / Colombia" },
    { v: "latam_arg", l: "Latin America - Argentina / Chile" },
    { v: "cee",       l: "CEE - Poland, Czech, Hungary" },
    { v: "swiss",     l: "Swiss Domestic" },
    { v: "uk",        l: "UK Onshore" },
    { v: "apac_sg",   l: "APAC - Singapore" },
    { v: "apac_hk",   l: "APAC - Hong Kong" },
    { v: "apac_other",l: "APAC - Japan, Australia" },
    { v: "nri",       l: "NRI - India" },
    { v: "cis",       l: "CIS - Russia, Kazakhstan, Ukraine" },
    { v: "mea",       l: "MEA - Africa, South Africa" },
    { v: "multi",     l: "Multi-market" },
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
    { v: "geneva",        l: "Geneva" },
    { v: "zurich",        l: "Zurich" },
    { v: "dubai",         l: "Dubai (DIFC)" },
    { v: "abudhabi",      l: "Abu Dhabi (ADGM)" },
    { v: "singapore",     l: "Singapore" },
    { v: "hongkong",      l: "Hong Kong" },
    { v: "london",        l: "London" },
    { v: "luxembourg",    l: "Luxembourg" },
    { v: "liechtenstein", l: "Liechtenstein" },
    { v: "monaco",        l: "Monaco" },
    { v: "telaviv",       l: "Tel Aviv" },
    { v: "miami",         l: "Miami" },
    { v: "newyork",       l: "New York" },
    { v: "multi",         l: "Multiple / Flexible" },
  ],
};

const DEMAND_STYLE = {
  High:      { color: "#C9A14A", bg: "rgba(201,161,74,0.08)", border: "rgba(201,161,74,0.35)", label: "HIGH DEMAND" },
  Selective: { color: "#a07840", bg: "rgba(160,120,64,0.08)", border: "rgba(160,120,64,0.35)", label: "SELECTIVE DEMAND" },
  Emerging:  { color: "#5a88b0", bg: "rgba(90,136,176,0.08)", border: "rgba(90,136,176,0.35)", label: "EMERGING DEMAND" },
};

const ACTIVE_MANDATES = {
  gcc:       "/en/jobs/senior-relationship-manager-mea-dubai",
  israel:    "/en/jobs/senior-relationship-manager-tel-aviv",
  eu_france: "/en/jobs/senior-relationship-manager-french-market-geneva",
  eu_italy:  "/en/jobs/senior-relationship-manager-italian-market-geneva",
  latam_br:  "/en/jobs/senior-relationship-manager-brazil-ch",
  swiss:     "/en/jobs",
  apac_sg:   "/en/jobs",
};

const SYSTEM = `You are the market intelligence engine for Executive Partners, a Geneva-based boutique executive search firm specialising exclusively in private banking and wealth management. Generate personalised market positioning assessments. RULES: Never name specific institutions actively hiring. Only refer to institution types. Use only publicly known structural market dynamics. Be specific to this exact profile. Elegant institutional prose only. No bullet points. No em dashes. Valid JSON only, no markdown. Format: {"segment":"4-6 word label","demandLevel":"High|Selective|Emerging","demandRationale":"one sentence","positioning":"2-3 sentences","assets":"2-3 sentences","friction":"1-2 sentences","outlook":"1-2 sentences"}`;

const SCAN_STEPS = [
  "Calibrating profile matrix",
  "Cross-referencing 14 market corridors",
  "Mapping institutional appetite",
  "Scoring demand vectors",
  "Compiling intelligence report",
];

function SectionDivider({ number, label }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1.75rem" }}>
      <span style={{ fontSize:"9px", letterSpacing:"0.28em", textTransform:"uppercase", color:GOLD, fontWeight:700, opacity:0.75, whiteSpace:"nowrap" }}>
        {number} {label}
      </span>
      <div style={{ flex:1, height:"1px", background:"rgba(201,161,74,0.15)" }} />
    </div>
  );
}

function FieldCard({ number, label, sublabel, children }) {
  return (
    <div style={{ borderLeft:`2px solid rgba(201,161,74,0.22)`, paddingLeft:"1.1rem", marginBottom:"1.6rem" }}>
      <div style={{ display:"flex", alignItems:"baseline", gap:"0.45rem", marginBottom:"0.35rem" }}>
        <span style={{ fontSize:"9px", color:GOLD, fontWeight:700, letterSpacing:"0.12em", opacity:0.6 }}>
          {String(number).padStart(2,"0")}
        </span>
        <span style={{ fontSize:"11px", fontWeight:600, color:"rgba(255,255,255,0.8)", letterSpacing:"0.06em", textTransform:"uppercase" }}>
          {label}
        </span>
      </div>
      {sublabel && (
        <p style={{ fontSize:"11px", color:"rgba(255,255,255,0.3)", marginBottom:"0.5rem", lineHeight:1.5 }}>{sublabel}</p>
      )}
      {children}
    </div>
  );
}

function StyledSelect({ value, onChange, opts }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position:"relative" }}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width:"100%",
          background: focused ? "rgba(201,161,74,0.07)" : "rgba(255,255,255,0.03)",
          border:`1px solid ${focused ? "rgba(201,161,74,0.4)" : "rgba(255,255,255,0.08)"}`,
          color:"rgba(255,255,255,0.85)",
          fontSize:"13px",
          padding:"10px 36px 10px 12px",
          appearance:"none",
          cursor:"pointer",
          outline:"none",
          transition:"all 0.2s",
          borderRadius:"2px",
          fontFamily:"inherit",
        }}
      >
        {opts.map(o => (
          <option key={o.v} value={o.v} style={{ background:"#090c14", color:"rgba(255,255,255,0.85)" }}>
            {o.l}
          </option>
        ))}
      </select>
      <svg style={{ position:"absolute", right:11, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }} width="9" height="5" viewBox="0 0 9 5" fill="none">
        <path d="M0 0L4.5 5L9 0" fill={GOLD} fillOpacity="0.65" />
      </svg>
    </div>
  );
}

function StyledInput({ value, onChange, placeholder, type }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type || "text"}
      value={value}
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        width:"100%",
        background: focused ? "rgba(201,161,74,0.07)" : "rgba(255,255,255,0.03)",
        border:`1px solid ${focused ? "rgba(201,161,74,0.4)" : "rgba(255,255,255,0.08)"}`,
        color:"rgba(255,255,255,0.85)",
        fontSize:"13px",
        padding:"10px 12px",
        outline:"none",
        transition:"all 0.2s",
        borderRadius:"2px",
        fontFamily:"inherit",
        boxSizing:"border-box",
      }}
    />
  );
}

function ResultBlock({ label, content, variant }) {
  const styles = {
    warn:    { bg:"rgba(200,80,60,0.05)",    border:"rgba(200,80,60,0.25)",    text:"rgba(220,150,140,0.9)" },
    gold:    { bg:"rgba(201,161,74,0.05)",   border:"rgba(201,161,74,0.25)",   text:"rgba(255,255,255,0.82)" },
    default: { bg:"rgba(255,255,255,0.015)", border:"rgba(255,255,255,0.08)", text:"rgba(255,255,255,0.72)" },
  };
  const s = styles[variant] || styles.default;
  return (
    <div style={{
      background:s.bg,
      borderLeft:`2px solid ${s.border}`,
      paddingLeft:"1.1rem",
      paddingTop:"0.7rem",
      paddingBottom:"0.7rem",
      marginBottom:"1.1rem",
    }}>
      <p style={{ fontSize:"9px", letterSpacing:"0.22em", textTransform:"uppercase", color:GOLD, opacity:0.65, fontWeight:700, marginBottom:"0.4rem" }}>
        {label}
      </p>
      <p style={{ fontSize:"13px", lineHeight:1.8, color:s.text }}>{content}</p>
    </div>
  );
}

export default function FitMatcherTool() {
  const [f, setF] = useState({
    aum:"150_500", seniority:"srm", geography:"gcc",
    clientType:"uhnw", mandate:"hunter", employment:"bank",
    booking:"geneva", name:"", email:"",
  });
  const set = k => v => setF(p => ({ ...p, [k]:v }));
  const [phase, setPhase] = useState("input");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [scanLine, setScanLine] = useState(0);

  useEffect(() => {
    if (phase !== "loading") return;
    let i = 0;
    const t = setInterval(() => { i++; setScanLine(i % SCAN_STEPS.length); }, 900);
    return () => clearInterval(t);
  }, [phase]);

  const assess = async () => {
    if (!f.email || !f.email.includes("@")) {
      setError("A valid email is required to receive your assessment.");
      return;
    }
    setError("");
    setPhase("loading");
    const userMsg = "Profile: AUM=" + f.aum + ", Seniority=" + f.seniority + ", Geography=" + f.geography + ", ClientType=" + f.clientType + ", Mandate=" + f.mandate + ", Employment=" + f.employment + ", Booking=" + f.booking;
    try {
      const res = await fetch("/api/fit-matcher-assess", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify({ profile:userMsg }),
      });
      const data = await res.json();
      const parsed = data.result;
      setResult(parsed);
      setPhase("results");
      fetch("/api/fit-matcher", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify({ ...f, assessment:parsed, ts:new Date().toISOString() }),
      }).catch(() => {});
    } catch(err) {
      setError("Assessment could not be generated. Please try again.");
      setPhase("input");
    }
  };

  const dc = result ? (DEMAND_STYLE[result.demandLevel] || DEMAND_STYLE.Selective) : {};

  return (
    <div style={{ background:"#080b14", minHeight:"100vh" }}>
      <style>{`
        @keyframes fmpulse{0%,100%{opacity:0.35;transform:scale(0.8)}50%{opacity:1;transform:scale(1.2)}}
        @keyframes fmfade{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fmprog{0%{width:5%}80%{width:90%}100%{width:95%}}
        .fm-fade{animation:fmfade 0.45s ease forwards}
      `}</style>

      <div style={{ height:"2px", background:`linear-gradient(90deg,transparent 0%,${GOLD} 35%,${GOLD} 65%,transparent 100%)`, opacity:0.55 }} />

      <div style={{ maxWidth:"860px", margin:"0 auto", padding:"3rem 1.5rem 5rem" }}>

        {/* HERO */}
        <div style={{ marginBottom:"3rem" }}>
          <div style={{
            display:"inline-flex", alignItems:"center", gap:"8px",
            border:`1px solid ${GOLD_BORDER}`, background:GOLD_DIM,
            padding:"4px 14px", borderRadius:"2px", marginBottom:"1.5rem",
          }}>
            <span style={{ width:5, height:5, borderRadius:"50%", background:GOLD, display:"inline-block" }} />
            <span style={{ fontSize:"9px", letterSpacing:"0.28em", textTransform:"uppercase", color:GOLD, fontWeight:700 }}>
              Executive Partners · Market Intelligence
            </span>
          </div>

          <h1 style={{ fontSize:"clamp(1.9rem,5vw,3rem)", fontWeight:800, color:"#fff", lineHeight:1.1, letterSpacing:"-0.02em", marginBottom:"1rem" }}>
            Private Bank<br />
            <span style={{ color:GOLD }}>Fit Assessment</span>
          </h1>
          <p style={{ fontSize:"13.5px", color:"rgba(255,255,255,0.42)", lineHeight:1.8, maxWidth:"460px" }}>
            A market positioning analysis calibrated to your specific commercial profile.
            Submissions reviewed against live market activity within 48 hours.
          </p>
          <div style={{ display:"flex", alignItems:"center", gap:"1rem", marginTop:"1.75rem" }}>
            <div style={{ height:"1px", flex:1, background:"rgba(255,255,255,0.06)" }} />
            <span style={{ fontSize:"9px", letterSpacing:"0.18em", color:"rgba(255,255,255,0.18)", textTransform:"uppercase" }}>Confidential · Discretion Guaranteed</span>
            <div style={{ height:"1px", flex:1, background:"rgba(255,255,255,0.06)" }} />
          </div>
        </div>

        {/* INPUT */}
        {phase === "input" && (
          <div className="fm-fade">
            <SectionDivider number="01 —" label="Commercial Profile" />
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 2.75rem" }}>
              <div>
                <FieldCard number={1} label="AUM Under Management">
                  <StyledSelect value={f.aum} onChange={set("aum")} opts={OPT.aum} />
                </FieldCard>
                <FieldCard number={2} label="Seniority Level">
                  <StyledSelect value={f.seniority} onChange={set("seniority")} opts={OPT.seniority} />
                </FieldCard>
                <FieldCard number={3} label="Primary Client Geography">
                  <StyledSelect value={f.geography} onChange={set("geography")} opts={OPT.geography} />
                </FieldCard>
                <FieldCard number={4} label="Client Tier">
                  <StyledSelect value={f.clientType} onChange={set("clientType")} opts={OPT.clientType} />
                </FieldCard>
              </div>
              <div>
                <SectionDivider number="02 —" label="Mandate Preferences" />
                <FieldCard number={5} label="Mandate Style">
                  <StyledSelect value={f.mandate} onChange={set("mandate")} opts={OPT.mandate} />
                </FieldCard>
                <FieldCard number={6} label="Employment Structure">
                  <StyledSelect value={f.employment} onChange={set("employment")} opts={OPT.employment} />
                </FieldCard>
                <FieldCard number={7} label="Target Booking Centre">
                  <StyledSelect value={f.booking} onChange={set("booking")} opts={OPT.booking} />
                </FieldCard>
              </div>
            </div>

            <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", marginTop:"0.5rem", paddingTop:"2rem" }}>
              <SectionDivider number="03 —" label="Delivery" />
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 2.75rem" }}>
                <FieldCard number={8} label="Name" sublabel="Optional">
                  <StyledInput value={f.name} onChange={v => setF(p => ({ ...p, name:v }))} placeholder="Your name" />
                </FieldCard>
                <FieldCard number={9} label="Email" sublabel="Your assessment will be sent here">
                  <StyledInput value={f.email} onChange={v => setF(p => ({ ...p, email:v }))} placeholder="your@email.com" type="email" />
                </FieldCard>
              </div>
            </div>

            {error && (
              <p style={{ fontSize:"12px", color:"#f87171", marginBottom:"1rem", letterSpacing:"0.02em" }}>
                {error}
              </p>
            )}

            <button
              onClick={assess}
              style={{
                width:"100%", background:GOLD, color:"#000",
                border:"none", padding:"15px 32px",
                fontSize:"11px", fontWeight:700,
                letterSpacing:"0.2em", textTransform:"uppercase",
                cursor:"pointer", fontFamily:"inherit",
                borderRadius:"2px", transition:"opacity 0.2s",
                marginTop:"0.25rem",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity="0.87"}
              onMouseLeave={e => e.currentTarget.style.opacity="1"}
            >
              Generate Market Assessment →
            </button>
            <p style={{ fontSize:"10px", color:"rgba(255,255,255,0.18)", textAlign:"center", marginTop:"0.9rem", letterSpacing:"0.04em" }}>
              No CV required · Strictly confidential · No bank names disclosed
            </p>
          </div>
        )}

        {/* LOADING */}
        {phase === "loading" && (
          <div className="fm-fade" style={{ padding:"3.5rem 0" }}>
            <div style={{ height:"2px", background:"rgba(201,161,74,0.1)", borderRadius:"1px", marginBottom:"2.5rem", overflow:"hidden" }}>
              <div style={{ height:"100%", background:GOLD, animation:"fmprog 5s ease-in-out forwards" }} />
            </div>
            <div style={{ display:"flex", gap:"0.45rem", alignItems:"center", marginBottom:"2.25rem" }}>
              {[0,1,2].map(i => (
                <div key={i} style={{ width:6, height:6, borderRadius:"50%", background:GOLD, animation:`fmpulse 1.4s ease-in-out ${i*0.28}s infinite` }} />
              ))}
              <span style={{ fontSize:"9px", letterSpacing:"0.28em", textTransform:"uppercase", color:"rgba(255,255,255,0.28)", marginLeft:"0.5rem" }}>
                Analysing Market Configuration
              </span>
            </div>
            <div style={{ borderLeft:`2px solid ${GOLD_BORDER}`, paddingLeft:"1.1rem" }}>
              {SCAN_STEPS.map((step, i) => (
                <div key={step} style={{
                  fontSize:"12.5px",
                  color: i === scanLine ? "rgba(255,255,255,0.75)" : i < scanLine ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.18)",
                  marginBottom:"0.7rem",
                  display:"flex", alignItems:"center", gap:"0.7rem",
                  transition:"color 0.4s",
                }}>
                  <span style={{
                    width:5, height:5, borderRadius:"50%",
                    background: i === scanLine ? GOLD : i < scanLine ? "rgba(201,161,74,0.4)" : "rgba(255,255,255,0.1)",
                    display:"inline-block", flexShrink:0, transition:"background 0.4s",
                  }} />
                  {step}
                  {i < scanLine && <span style={{ fontSize:"10px", color:GOLD, opacity:0.7 }}>&#10003;</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RESULTS */}
        {phase === "results" && result && (
          <div className="fm-fade">
            <div style={{
              display:"grid", gridTemplateColumns:"1fr auto", gap:"1.5rem",
              alignItems:"start", borderBottom:"1px solid rgba(255,255,255,0.06)",
              paddingBottom:"1.75rem", marginBottom:"1.75rem",
            }}>
              <div>
                <p style={{ fontSize:"9px", letterSpacing:"0.25em", textTransform:"uppercase", color:GOLD, opacity:0.65, fontWeight:700, marginBottom:"0.5rem" }}>
                  Market Segment
                </p>
                <h2 style={{ fontSize:"clamp(1.3rem,3vw,1.9rem)", fontWeight:800, color:"#fff", letterSpacing:"-0.02em", lineHeight:1.15, marginBottom:"0.7rem" }}>
                  {result.segment}
                </h2>
                <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.38)", lineHeight:1.75, maxWidth:"500px", fontStyle:"italic" }}>
                  {result.demandRationale}
                </p>
              </div>
              <div style={{
                border:`1px solid ${dc.border}`, background:dc.bg,
                padding:"1.1rem 1.5rem", textAlign:"center",
                minWidth:"130px", borderRadius:"2px",
              }}>
                <p style={{ fontSize:"9px", letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(255,255,255,0.28)", marginBottom:"0.45rem" }}>Market Demand</p>
                <p style={{ fontSize:"10px", fontWeight:700, letterSpacing:"0.14em", color:dc.color, textTransform:"uppercase" }}>{dc.label}</p>
              </div>
            </div>

            {ACTIVE_MANDATES[f.geography] && (
              <a
                href={ACTIVE_MANDATES[f.geography]}
                style={{
                  display:"inline-flex", alignItems:"center", gap:"0.55rem",
                  background:"rgba(201,161,74,0.07)", border:`1px solid ${GOLD_BORDER}`,
                  padding:"9px 15px", marginBottom:"1.75rem",
                  textDecoration:"none", borderRadius:"2px", transition:"background 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.background="rgba(201,161,74,0.13)"}
                onMouseLeave={e => e.currentTarget.style.background="rgba(201,161,74,0.07)"}
              >
                <span style={{ width:6, height:6, borderRadius:"50%", background:GOLD, display:"inline-block", animation:"fmpulse 2s ease-in-out infinite" }} />
                <span style={{ fontSize:"11px", color:GOLD, fontWeight:600, letterSpacing:"0.03em" }}>
                  A mandate currently open matches your profile configuration
                </span>
                <span style={{ color:GOLD, fontSize:"12px" }}>&#8594;</span>
              </a>
            )}

            <SectionDivider number="" label="Intelligence Report" />

            <ResultBlock label="Market Positioning" content={result.positioning} variant="gold" />
            <ResultBlock label="Commercial Assets" content={result.assets} />
            <ResultBlock label="Structural Friction Points" content={result.friction} variant="warn" />
            <ResultBlock label="12 to 18 Month Outlook" content={result.outlook} />

            <div style={{
              marginTop:"1.75rem",
              background:"rgba(255,255,255,0.015)",
              border:"1px solid rgba(255,255,255,0.07)",
              borderTop:`2px solid ${GOLD}`,
              padding:"1.4rem",
              borderRadius:"0 0 2px 2px",
            }}>
              <p style={{ fontSize:"9px", letterSpacing:"0.22em", textTransform:"uppercase", color:GOLD, opacity:0.65, fontWeight:700, marginBottom:"0.5rem" }}>
                Next Steps
              </p>
              <p style={{ fontSize:"13px", color:"rgba(255,255,255,0.6)", lineHeight:1.8 }}>
                Your profile has been received by Executive Partners. We will review your configuration against current market activity and be in touch within 48 hours if we identify relevant positioning for your specific combination.
              </p>
              {f.email && (
                <p style={{ fontSize:"11px", color:"rgba(255,255,255,0.22)", marginTop:"0.65rem" }}>
                  Confirmation sent to {f.email}
                </p>
              )}
            </div>

            <button
              onClick={() => { setPhase("input"); setResult(null); }}
              style={{
                marginTop:"1.4rem", background:"transparent",
                border:"1px solid rgba(255,255,255,0.1)",
                color:"rgba(255,255,255,0.28)",
                padding:"8px 18px", fontSize:"9px",
                letterSpacing:"0.2em", textTransform:"uppercase",
                cursor:"pointer", fontFamily:"inherit", borderRadius:"2px",
                transition:"all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.22)"; e.currentTarget.style.color="rgba(255,255,255,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; e.currentTarget.style.color="rgba(255,255,255,0.28)"; }}
            >
              Run Another Assessment
            </button>
          </div>
        )}

        <div style={{
          marginTop:"4rem", paddingTop:"1.5rem",
          borderTop:"1px solid rgba(255,255,255,0.05)",
          fontSize:"10px", color:"rgba(255,255,255,0.16)",
          lineHeight:1.8, letterSpacing:"0.02em",
        }}>
          Executive Partners · Geneva · execpartners.ch · recruiter@execpartners.ch<br />
          Market positioning assessment based on structural dynamics only. All submissions treated with absolute discretion under Swiss data protection standards.
        </div>
      </div>
    </div>
  );
}
