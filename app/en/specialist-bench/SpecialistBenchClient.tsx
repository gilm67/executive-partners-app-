"use client";
import React, { useState } from "react";

const ROLES = [
  "Assistant Relationship Manager (ARM)",
  "Compliance Officer",
  "Risk Manager",
  "Operations / Middle Office",
  "Legal / Regulatory",
  "Fund Administration",
  "Client Onboarding / KYC",
  "Product Specialist",
  "Portfolio Management Assistant",
  "Other",
];

const MARKETS = [
  "Switzerland (CH)", "France", "Germany / Austria", "UK",
  "Middle East (UAE / Saudi)", "Asia (Singapore / HK)",
  "LATAM", "Italy", "Israel", "Other",
];

const EXPERIENCE = ["1-3 years", "3-5 years", "5-10 years", "10+ years"];

type FormState = {
  firstName: string; lastName: string; email: string; role: string;
  institution: string; experience: string; markets: string[];
  languages: string; linkedin: string; brief: string; consent: boolean;
};

const EMPTY: FormState = {
  firstName: "", lastName: "", email: "", role: "",
  institution: "", experience: "", markets: [],
  languages: "", linkedin: "", brief: "", consent: false,
};

const STYLES = `
  @keyframes sb-glow-pulse {
    0%, 100% { opacity: 0.10; }
    50% { opacity: 0.20; }
  }
  @keyframes sb-fade-up {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .sb-hero-glow {
    position: absolute;
    top: -120px;
    left: 50%;
    transform: translateX(-50%);
    width: 900px;
    height: 900px;
    border-radius: 50%;
    background: radial-gradient(ellipse at center, rgba(201,161,74,0.22) 0%, transparent 65%);
    animation: sb-glow-pulse 5s ease-in-out infinite;
    pointer-events: none;
  }
  .sb-fade-up   { animation: sb-fade-up 0.7s ease both; }
  .sb-fade-up-2 { animation: sb-fade-up 0.7s 0.1s ease both; }
  .sb-fade-up-3 { animation: sb-fade-up 0.7s 0.2s ease both; }
  .sb-form input:not([type="checkbox"]),
  .sb-form select,
  .sb-form textarea {
    background: rgba(255,255,255,0.04) !important;
    color: #e5e7eb !important;
    border: 1px solid rgba(255,255,255,0.09) !important;
    border-radius: 8px !important;
    padding: 12px 14px !important;
    font-size: 14px !important;
    width: 100% !important;
    box-sizing: border-box !important;
    display: block !important;
    font-family: inherit !important;
    transition: border-color 0.15s, background 0.15s !important;
    outline: none !important;
    -webkit-appearance: auto !important;
    appearance: auto !important;
    box-shadow: none !important;
  }
  .sb-form input:not([type="checkbox"]):focus,
  .sb-form select:focus,
  .sb-form textarea:focus {
    border-color: rgba(201,161,74,0.45) !important;
    background: rgba(201,161,74,0.03) !important;
  }
  .sb-form input::placeholder,
  .sb-form textarea::placeholder {
    color: rgba(255,255,255,0.2) !important;
    opacity: 1 !important;
  }
  .sb-form select option { background: #0d1728 !important; color: #e5e7eb !important; }
  .sb-form textarea { resize: none !important; min-height: 80px !important; }
  .sb-form input[type="checkbox"] {
    width: 16px !important; height: 16px !important; padding: 0 !important;
    accent-color: #C9A14A !important; flex-shrink: 0 !important; margin-top: 2px !important;
  }
  .sb-step-card { transition: border-color 0.2s, background 0.2s; }
  .sb-step-card:hover {
    border-color: rgba(201,161,74,0.25) !important;
    background: rgba(201,161,74,0.03) !important;
  }
  .sb-cta-btn { transition: opacity 0.15s; }
  .sb-cta-btn:hover { opacity: 0.88; }
`;

const LBL: React.CSSProperties = {
  display: "block", fontSize: "11px", fontWeight: 600,
  color: "rgba(255,255,255,0.38)", textTransform: "uppercase",
  letterSpacing: "0.07em", marginBottom: "7px",
};

const DIVIDER: React.CSSProperties = {
  border: "none", borderTop: "1px solid rgba(255,255,255,0.06)", margin: "26px 0",
};

function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "10px",
      fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em",
      textTransform: "uppercase", color: "#C9A14A", marginBottom: "18px",
    }}>
      <span>{n}</span>
      <span style={{ flex: 1, height: "1px", background: "rgba(201,161,74,0.18)" }} />
      <span>{label}</span>
    </div>
  );
}

export default function SpecialistBenchPage() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const toggleMarket = (m: string) =>
    setForm((f) => ({
      ...f,
      markets: f.markets.includes(m) ? f.markets.filter((x) => x !== m) : [...f.markets, m],
    }));

  const handleSubmit = async () => {
    if (!form.firstName || !form.lastName || !form.email || !form.role || !form.institution || !form.experience || !form.consent) {
      setErrorMsg("Please complete all required fields and confirm your consent.");
      return;
    }
    setErrorMsg("");
    setStatus("loading");
    try {
      const res = await fetch("/api/specialist-bench", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <main style={{ minHeight: "100vh", background: "#0B0F1A", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
        <style dangerouslySetInnerHTML={{ __html: STYLES }} />
        <div style={{ maxWidth: "520px", width: "100%", textAlign: "center" }} className="sb-fade-up">
          <div style={{ width: 68, height: 68, borderRadius: "50%", background: "rgba(201,161,74,0.08)", border: "1px solid rgba(201,161,74,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px" }}>
            <svg width="28" height="28" fill="none" stroke="#C9A14A" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p style={{ color: "#C9A14A", fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "16px" }}>Profile Received</p>
          <h2 style={{ color: "#ffffff", fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: "16px" }}>You are on the bench.</h2>
          <p style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.8, fontSize: "15px", marginBottom: "36px" }}>
            Your profile has been added to our Specialist Bench. We will reach out confidentially when a partner bank requests your specific expertise. No noise. No unsolicited calls.
          </p>
          <div style={{ width: "36px", height: "1px", background: "rgba(201,161,74,0.35)", margin: "0 auto 24px" }} />
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Executive Partners &middot; Geneva</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "#0B0F1A" }}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: "72vh", display: "flex", alignItems: "center", padding: "130px 16px 80px" }}>
        <div className="sb-hero-glow" />
        <div aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "clamp(180px, 32vw, 400px)", fontWeight: 900, color: "rgba(255,255,255,0.013)", letterSpacing: "-0.05em", userSelect: "none", pointerEvents: "none", lineHeight: 1, whiteSpace: "nowrap" }}>EP</div>

        <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div className="sb-fade-up" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginBottom: "30px" }}>
            <div style={{ height: "1px", width: "28px", background: "rgba(201,161,74,0.45)" }} />
            <span style={{ color: "#C9A14A", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>Specialist Bench &middot; Executive Partners</span>
            <div style={{ height: "1px", width: "28px", background: "rgba(201,161,74,0.45)" }} />
          </div>

          <h1 className="sb-fade-up-2" style={{ color: "#ffffff", fontSize: "clamp(40px, 6.5vw, 76px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.03em", marginBottom: "26px" }}>
            The bench that<br />
            <span style={{ color: "#C9A14A" }}>calls you first.</span>
          </h1>

          <p className="sb-fade-up-3" style={{ color: "rgba(255,255,255,0.48)", fontSize: "17px", lineHeight: 1.8, maxWidth: "500px", margin: "0 auto 40px" }}>
            We work exclusively in private banking. Register once. We approach you when a partner bank needs your exact profile. Nothing more.
          </p>

          <a href="#register" className="sb-cta-btn" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#C9A14A", color: "#0B0F1A", padding: "15px 30px", borderRadius: "999px", fontSize: "13px", fontWeight: 800, letterSpacing: "0.05em", textDecoration: "none" }}>
            Register confidentially
            <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </section>

      {/* STATS */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "22px 16px", background: "rgba(255,255,255,0.018)" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 48px" }}>
          {[["14","Active Markets"],["200+","Placements"],["100%","Confidential"],["12+","Years in Private Banking"]].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ color: "#C9A14A", fontSize: "22px", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>{num}</div>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase", marginTop: "5px" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Roles line */}
      <div style={{ textAlign: "center", padding: "8px 16px 48px" }}>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)", margin: 0, letterSpacing: "0.02em" }}>
          <strong>Open to all specialist and support roles in private banking and wealth management.</strong>
        </p>
      </div>

      {/* HOW IT WORKS */}
      <section style={{ padding: "72px 16px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <p style={{ textAlign: "center", color: "#C9A14A", fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "44px" }}>How It Works</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "14px" }}>
            {[
              { n: "01", title: "Register once", body: "Your profile stays on file. No CV, no interviews, no pressure from us." },
              { n: "02", title: "We hold your brief", body: "Every active mandate from our partner banks is matched against the bench first." },
              { n: "03", title: "We call you. Discreetly.", body: "Your employer never knows. We only approach when the match is real and live." },
            ].map(({ n, title, body }) => (
              <div key={n} className="sb-step-card" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "28px 22px" }}>
                <div style={{ color: "rgba(201,161,74,0.35)", fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em", marginBottom: "14px" }}>{n}</div>
                <div style={{ color: "#ffffff", fontSize: "15px", fontWeight: 600, marginBottom: "10px", lineHeight: 1.3 }}>{title}</div>
                <div style={{ color: "rgba(255,255,255,0.38)", fontSize: "13px", lineHeight: 1.75 }}>{body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="register" style={{ padding: "0 16px 96px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "44px" }}>
            <p style={{ color: "#C9A14A", fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "14px" }}>Confidential Registration</p>
            <h2 style={{ color: "#ffffff", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "8px" }}>Register your profile</h2>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>Takes 2 minutes. No CV required.</p>
          </div>

          <div className="sb-form" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "20px", padding: "clamp(24px, 5vw, 44px)" }}>

            <SectionLabel n="01" label="Your identity" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
              <div>
                <label style={LBL}>First name <span style={{ color: "#C9A14A" }}>*</span></label>
                <input type="text" value={form.firstName} onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))} placeholder="Jean" />
              </div>
              <div>
                <label style={LBL}>Last name <span style={{ color: "#C9A14A" }}>*</span></label>
                <input type="text" value={form.lastName} onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))} placeholder="Dupont" />
              </div>
            </div>
            <div>
              <label style={LBL}>Personal email <span style={{ color: "#C9A14A" }}>*</span></label>
              <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="jean.dupont@gmail.com" />
            </div>

            <hr style={DIVIDER} />
            <SectionLabel n="02" label="Your role" />
            <div style={{ marginBottom: "16px" }}>
              <label style={LBL}>Current role <span style={{ color: "#C9A14A" }}>*</span></label>
              <select value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}>
                <option value="">Select your role</option>
                {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div>
                <label style={LBL}>Current institution <span style={{ color: "#C9A14A" }}>*</span></label>
                <input type="text" value={form.institution} onChange={(e) => setForm((f) => ({ ...f, institution: e.target.value }))} placeholder="Pictet, UBS, EFG..." />
              </div>
              <div>
                <label style={LBL}>Experience <span style={{ color: "#C9A14A" }}>*</span></label>
                <select value={form.experience} onChange={(e) => setForm((f) => ({ ...f, experience: e.target.value }))}>
                  <option value="">Select</option>
                  {EXPERIENCE.map((e) => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>
            </div>

            <hr style={DIVIDER} />
            <SectionLabel n="03" label="Your coverage" />
            <div style={{ marginBottom: "16px" }}>
              <label style={LBL}>Markets you cover</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "6px" }}>
                {MARKETS.map((m) => (
                  <button key={m} type="button" onClick={() => toggleMarket(m)} style={{ padding: "7px 15px", borderRadius: "999px", fontSize: "12px", fontWeight: 500, cursor: "pointer", background: form.markets.includes(m) ? "#C9A14A" : "transparent", color: form.markets.includes(m) ? "#0B0F1A" : "rgba(255,255,255,0.42)", border: form.markets.includes(m) ? "1px solid #C9A14A" : "1px solid rgba(255,255,255,0.11)", transition: "all 0.15s" }}>
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={LBL}>Languages</label>
              <input type="text" value={form.languages} onChange={(e) => setForm((f) => ({ ...f, languages: e.target.value }))} placeholder="French (native), English (fluent), German (working)" />
            </div>

            <hr style={DIVIDER} />
            <SectionLabel n="04" label="Your profile" />
            <div style={{ marginBottom: "16px" }}>
              <label style={LBL}>LinkedIn <span style={{ textTransform: "none", letterSpacing: 0, fontWeight: 400, color: "rgba(255,255,255,0.22)" }}>optional</span></label>
              <input type="url" value={form.linkedin} onChange={(e) => setForm((f) => ({ ...f, linkedin: e.target.value }))} placeholder="https://linkedin.com/in/yourname" />
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.22)", marginTop: "6px", marginBottom: 0 }}>No CV needed. LinkedIn is enough.</p>
            </div>
            <div>
              <label style={LBL}>Anything we should know? <span style={{ textTransform: "none", letterSpacing: 0, fontWeight: 400, color: "rgba(255,255,255,0.22)" }}>optional</span></label>
              <textarea value={form.brief} onChange={(e) => setForm((f) => ({ ...f, brief: e.target.value }))} rows={3} placeholder="Specialisation, certifications, particular market expertise..." />
            </div>

            <hr style={DIVIDER} />

            <div style={{ background: "rgba(201,161,74,0.04)", border: "1px solid rgba(201,161,74,0.12)", borderRadius: "12px", padding: "18px", marginBottom: "26px" }}>
              <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer" }}>
                <input type="checkbox" checked={form.consent} onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))} />
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.38)", lineHeight: 1.7 }}>
                  I consent to Executive Partners storing my profile and contacting me confidentially when a relevant opportunity arises. My information will not be shared with any third party without prior agreement. I can withdraw at any time by emailing{" "}
                  <a href="mailto:recruiter@execpartners.ch" style={{ color: "#C9A14A" }}>recruiter@execpartners.ch</a>.
                </span>
              </label>
            </div>

            {errorMsg && <p style={{ color: "#f87171", fontSize: "13px", marginBottom: "14px" }}>{errorMsg}</p>}

            <button onClick={handleSubmit} disabled={status === "loading"} style={{ width: "100%", background: "#C9A14A", color: "#0B0F1A", border: "none", borderRadius: "12px", padding: "17px", fontSize: "14px", fontWeight: 800, letterSpacing: "0.04em", cursor: status === "loading" ? "not-allowed" : "pointer", opacity: status === "loading" ? 0.55 : 1, transition: "opacity 0.15s" }}>
              {status === "loading" ? "Submitting..." : "Join the Specialist Bench →"}
            </button>

            {status === "error" && (
              <p style={{ color: "#f87171", fontSize: "13px", textAlign: "center", marginTop: "12px" }}>Something went wrong. Please email recruiter@execpartners.ch.</p>
            )}

            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.18)", textAlign: "center", marginTop: "20px", marginBottom: 0, letterSpacing: "0.03em" }}>
              Strictly confidential. No unsolicited approaches to your current employer.
            </p>
          </div>

          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.22)", textAlign: "center", marginTop: "28px" }}>
            Looking for senior RM positions?{" "}
            <a href="/en/bp-simulator" style={{ color: "#C9A14A" }}>Try the Business Plan Simulator instead.</a>
          </p>
        </div>
      </section>
    </main>
  );
}
