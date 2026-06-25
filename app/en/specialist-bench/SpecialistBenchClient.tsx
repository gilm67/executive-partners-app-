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

const DARK_CSS = `
  .sb-form input:not([type="checkbox"]),
  .sb-form select,
  .sb-form textarea {
    background-color: #0f1929 !important;
    background: #0f1929 !important;
    color: #e5e7eb !important;
    border: 1px solid rgba(255,255,255,0.12) !important;
    border-radius: 8px !important;
    padding: 11px 14px !important;
    font-size: 14px !important;
    width: 100% !important;
    box-sizing: border-box !important;
    display: block !important;
    font-family: inherit !important;
    -webkit-appearance: auto !important;
    appearance: auto !important;
    box-shadow: none !important;
    outline: none !important;
  }
  .sb-form input:not([type="checkbox"]):focus,
  .sb-form select:focus,
  .sb-form textarea:focus {
    border-color: rgba(201,161,74,0.5) !important;
  }
  .sb-form input::placeholder,
  .sb-form textarea::placeholder {
    color: rgba(255,255,255,0.25) !important;
    opacity: 1 !important;
  }
  .sb-form select option {
    background-color: #0f1929 !important;
    color: #e5e7eb !important;
  }
  .sb-form textarea {
    resize: none !important;
    min-height: 80px !important;
  }
  .sb-form input[type="checkbox"] {
    width: 16px !important;
    height: 16px !important;
    padding: 0 !important;
    background: transparent !important;
    border: 1px solid rgba(255,255,255,0.25) !important;
    border-radius: 3px !important;
    accent-color: #C9A14A !important;
    flex-shrink: 0 !important;
  }
`;

const LBL: React.CSSProperties = {
  display: "block",
  fontSize: "11px",
  fontWeight: 600,
  color: "rgba(255,255,255,0.45)",
  textTransform: "uppercase",
  letterSpacing: "0.07em",
  marginBottom: "7px",
};

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
        <div style={{ maxWidth: "480px", width: "100%", background: "#0f1929", border: "1px solid rgba(201,161,74,0.2)", borderRadius: "16px", padding: "48px 40px", textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(201,161,74,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <svg width="28" height="28" fill="none" stroke="#C9A14A" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 style={{ color: "#ffffff", fontSize: "22px", fontWeight: 600, marginBottom: "12px" }}>You are on the bench.</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: "24px" }}>
            Your profile has been added to our Specialist Bench. We will reach out confidentially when a partner bank requests your specific expertise.
          </p>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>Executive Partners, Geneva</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "#0B0F1A" }}>
      <style dangerouslySetInnerHTML={{ __html: DARK_CSS }} />

      {/* Hero */}
      <section style={{ background: "linear-gradient(180deg, #0f1929 0%, #0B0F1A 100%)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "80px 16px 72px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#C9A14A", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "20px" }}>
            Executive Partners — Specialist Bench
          </p>
          <h1 style={{ color: "#ffffff", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 600, lineHeight: 1.2, marginBottom: "20px", letterSpacing: "-0.01em" }}>
            Your expertise deserves<br />the right opportunity.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "17px", lineHeight: 1.75, maxWidth: "540px", margin: "0 auto" }}>
            We work exclusively in private banking and wealth management. If you hold a specialist or support role and you are open to the right conversation, register here. We approach you when a partner bank is looking for exactly your profile. Nothing more.
          </p>
        </div>
      </section>

      {/* Trust strip */}
      <section style={{ background: "rgba(201,161,74,0.05)", borderBottom: "1px solid rgba(201,161,74,0.12)", padding: "16px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "center" }}>
          {["Strictly confidential", "No unsolicited outreach to your current employer", "We contact you only when there is a real match"].map((t) => (
            <span key={t} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>
              <span style={{ color: "#C9A14A", fontSize: "10px" }}>◆</span> {t}
            </span>
          ))}
        </div>
      </section>

      {/* Form */}
      <section style={{ padding: "60px 16px 80px" }}>
        <div className="sb-form" style={{ maxWidth: "620px", margin: "0 auto", background: "#0d1728", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "clamp(24px, 5vw, 40px)" }}>
          <h2 style={{ color: "#ffffff", fontSize: "18px", fontWeight: 600, marginBottom: "28px", marginTop: 0 }}>Register your profile</h2>

          {/* Name */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "18px" }}>
            <div>
              <label style={LBL}>First name <span style={{ color: "#C9A14A" }}>*</span></label>
              <input type="text" value={form.firstName} onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))} placeholder="Jean" />
            </div>
            <div>
              <label style={LBL}>Last name <span style={{ color: "#C9A14A" }}>*</span></label>
              <input type="text" value={form.lastName} onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))} placeholder="Dupont" />
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: "18px" }}>
            <label style={LBL}>Professional email <span style={{ color: "#C9A14A" }}>*</span></label>
            <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="j.dupont@privatebank.com" />
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", marginTop: "5px", marginBottom: 0 }}>Personal email accepted. We never contact your employer.</p>
          </div>

          {/* Role */}
          <div style={{ marginBottom: "18px" }}>
            <label style={LBL}>Current role <span style={{ color: "#C9A14A" }}>*</span></label>
            <select value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}>
              <option value="">Select your role</option>
              {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          {/* Institution + Experience */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "18px" }}>
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

          {/* Markets */}
          <div style={{ marginBottom: "18px" }}>
            <label style={LBL}>Markets / geographies you cover</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {MARKETS.map((m) => (
                <button key={m} type="button" onClick={() => toggleMarket(m)}
                  style={{
                    padding: "6px 13px", borderRadius: "999px", fontSize: "12px", fontWeight: 500, cursor: "pointer",
                    background: form.markets.includes(m) ? "#C9A14A" : "transparent",
                    color: form.markets.includes(m) ? "#0B0F1A" : "rgba(255,255,255,0.55)",
                    border: form.markets.includes(m) ? "1px solid #C9A14A" : "1px solid rgba(255,255,255,0.15)",
                    transition: "all 0.15s",
                  }}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div style={{ marginBottom: "18px" }}>
            <label style={LBL}>Languages</label>
            <input type="text" value={form.languages} onChange={(e) => setForm((f) => ({ ...f, languages: e.target.value }))} placeholder="French (native), English (fluent), German (working)" />
          </div>

          {/* Brief */}
          <div style={{ marginBottom: "22px" }}>
            <label style={LBL}>
              Anything we should know?{" "}
              <span style={{ textTransform: "none", letterSpacing: 0, fontWeight: 400, color: "rgba(255,255,255,0.25)" }}>(optional)</span>
            </label>
            <textarea value={form.brief} onChange={(e) => setForm((f) => ({ ...f, brief: e.target.value }))} rows={3}
              placeholder="Specialisation, certifications, particular market expertise..." />
          </div>

          {/* Consent */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "16px", marginBottom: "24px" }}>
            <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer" }}>
              <input type="checkbox" checked={form.consent} onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))} />
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: 1.65 }}>
                I consent to Executive Partners storing my profile and contacting me confidentially when a relevant opportunity arises. I understand my information will not be shared with any third party without my prior agreement. I can withdraw at any time by emailing{" "}
                <a href="mailto:recruiter@execpartners.ch" style={{ color: "#C9A14A" }}>recruiter@execpartners.ch</a>.
              </span>
            </label>
          </div>

          {errorMsg && <p style={{ color: "#f87171", fontSize: "13px", marginBottom: "14px" }}>{errorMsg}</p>}

          <button onClick={handleSubmit} disabled={status === "loading"}
            style={{
              width: "100%", background: "#C9A14A", color: "#0B0F1A", border: "none",
              borderRadius: "10px", padding: "14px", fontSize: "14px", fontWeight: 700,
              letterSpacing: "0.03em", cursor: "pointer", opacity: status === "loading" ? 0.6 : 1,
            }}>
            {status === "loading" ? "Submitting..." : "Join the Specialist Bench"}
          </button>

          {status === "error" && (
            <p style={{ color: "#f87171", fontSize: "13px", textAlign: "center", marginTop: "12px" }}>
              Something went wrong. Please email recruiter@execpartners.ch.
            </p>
          )}

          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)", textAlign: "center", marginTop: "18px", marginBottom: 0 }}>
            Strictly confidential. No unsolicited approaches to your current employer.
          </p>
        </div>
      </section>

      <section style={{ padding: "0 16px 64px" }}>
        <div style={{ maxWidth: "620px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>
            Looking for senior Relationship Manager positions?{" "}
            <a href="/en/candidate-assessment" style={{ color: "#C9A14A" }}>
              Use our Business Plan Simulator instead.
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
