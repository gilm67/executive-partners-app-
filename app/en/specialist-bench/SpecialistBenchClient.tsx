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
  languages: string; brief: string; consent: boolean;
};

const EMPTY: FormState = {
  firstName: "", lastName: "", email: "", role: "",
  institution: "", experience: "", markets: [],
  languages: "", brief: "", consent: false,
};

const GLOBAL_OVERRIDE = `
  .sb-wrap input,
  .sb-wrap select,
  .sb-wrap textarea {
    background-color: #ffffff !important;
    background: #ffffff !important;
    color: #111827 !important;
    border: 1px solid #d1d5db !important;
    border-radius: 8px !important;
    padding: 10px 14px !important;
    font-size: 14px !important;
    width: 100% !important;
    box-sizing: border-box !important;
    display: block !important;
    font-family: inherit !important;
    -webkit-appearance: auto !important;
    appearance: auto !important;
    box-shadow: none !important;
  }
  .sb-wrap input::placeholder,
  .sb-wrap textarea::placeholder {
    color: #9ca3af !important;
    opacity: 1 !important;
  }
  .sb-wrap textarea {
    resize: none !important;
    min-height: 80px !important;
  }
  .sb-wrap input[type="checkbox"] {
    width: 16px !important;
    height: 16px !important;
    padding: 0 !important;
    display: inline-block !important;
    accent-color: #1B3A6B !important;
    flex-shrink: 0 !important;
  }
`;

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
      <main style={{ minHeight: "100vh", background: "#F8F7F4", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
        <div style={{ maxWidth: "480px", width: "100%", background: "#fff", borderRadius: "16px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", padding: "48px 40px", textAlign: "center" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(27,58,107,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <svg width="32" height="32" fill="none" stroke="#1B3A6B" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 style={{ color: "#1B3A6B", fontSize: "22px", fontWeight: 600, marginBottom: "12px" }}>You are on the bench.</h2>
          <p style={{ color: "#4b5563", lineHeight: 1.7, marginBottom: "24px" }}>
            Your profile has been added to our Specialist Bench. We will reach out confidentially when a partner bank requests your specific expertise.
          </p>
          <p style={{ fontSize: "13px", color: "#9ca3af" }}>Executive Partners, Geneva</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "#F8F7F4" }}>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_OVERRIDE }} />

      {/* Hero */}
      <section style={{ background: "#1B3A6B", padding: "72px 16px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#C9A14A", fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px" }}>
            Executive Partners — Specialist Bench
          </p>
          <h1 style={{ color: "#ffffff", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 600, lineHeight: 1.25, marginBottom: "20px" }}>
            Your expertise deserves the right opportunity.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "17px", lineHeight: 1.7, maxWidth: "560px", margin: "0 auto" }}>
            We work exclusively in private banking and wealth management. If you hold a specialist or support role and you are open to the right conversation, register here. We approach you when a partner bank is looking for exactly your profile. Nothing more.
          </p>
        </div>
      </section>

      {/* Trust strip */}
      <section style={{ background: "rgba(201,161,74,0.08)", borderTop: "1px solid rgba(201,161,74,0.25)", borderBottom: "1px solid rgba(201,161,74,0.25)", padding: "18px 16px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
          {["Strictly confidential", "No unsolicited outreach to your current employer", "We contact you only when there is a real match"].map((t) => (
            <span key={t} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#1B3A6B", fontWeight: 600 }}>
              <span style={{ color: "#C9A14A" }}>◆</span> {t}
            </span>
          ))}
        </div>
      </section>

      {/* Form */}
      <section style={{ padding: "56px 16px" }}>
        <div className="sb-wrap" style={{ maxWidth: "640px", margin: "0 auto", background: "#ffffff", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "clamp(24px, 5vw, 40px)" }}>
          <h2 style={{ color: "#1B3A6B", fontSize: "20px", fontWeight: 600, marginBottom: "32px", marginTop: 0 }}>Register your profile</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>
                First name <span style={{ color: "#C9A14A" }}>*</span>
              </label>
              <input type="text" value={form.firstName} onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))} placeholder="Jean" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>
                Last name <span style={{ color: "#C9A14A" }}>*</span>
              </label>
              <input type="text" value={form.lastName} onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))} placeholder="Dupont" />
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>
              Professional email <span style={{ color: "#C9A14A" }}>*</span>
            </label>
            <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="j.dupont@privatebank.com" />
            <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px", marginBottom: 0 }}>Personal email accepted. We never contact your employer.</p>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>
              Current role <span style={{ color: "#C9A14A" }}>*</span>
            </label>
            <select value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}>
              <option value="">Select your role</option>
              {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>
                Current institution <span style={{ color: "#C9A14A" }}>*</span>
              </label>
              <input type="text" value={form.institution} onChange={(e) => setForm((f) => ({ ...f, institution: e.target.value }))} placeholder="Pictet, UBS, EFG..." />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>
                Experience <span style={{ color: "#C9A14A" }}>*</span>
              </label>
              <select value={form.experience} onChange={(e) => setForm((f) => ({ ...f, experience: e.target.value }))}>
                <option value="">Select</option>
                {EXPERIENCE.map((e) => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>
              Markets / geographies you cover
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {MARKETS.map((m) => (
                <button key={m} type="button" onClick={() => toggleMarket(m)}
                  style={{
                    padding: "6px 14px", borderRadius: "999px", fontSize: "12px", fontWeight: 500, cursor: "pointer",
                    background: form.markets.includes(m) ? "#1B3A6B" : "#ffffff",
                    color: form.markets.includes(m) ? "#ffffff" : "#4b5563",
                    border: form.markets.includes(m) ? "1px solid #1B3A6B" : "1px solid #d1d5db",
                  }}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>
              Languages
            </label>
            <input type="text" value={form.languages} onChange={(e) => setForm((f) => ({ ...f, languages: e.target.value }))} placeholder="French (native), English (fluent), German (working)" />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>
              Anything we should know? <span style={{ fontSize: "11px", fontWeight: 400, color: "#9ca3af", textTransform: "none", letterSpacing: 0 }}>(optional)</span>
            </label>
            <textarea value={form.brief} onChange={(e) => setForm((f) => ({ ...f, brief: e.target.value }))} rows={3}
              placeholder="Specialisation, certifications, particular market expertise..." />
          </div>

          <div style={{ background: "#F8F7F4", borderRadius: "10px", padding: "16px", marginBottom: "28px" }}>
            <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer" }}>
              <input type="checkbox" checked={form.consent} onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))} />
              <span style={{ fontSize: "12px", color: "#4b5563", lineHeight: 1.6 }}>
                I consent to Executive Partners storing my profile and contacting me confidentially when a relevant opportunity arises. I understand my information will not be shared with any third party without my prior agreement. I can withdraw at any time by emailing{" "}
                <a href="mailto:recruiter@execpartners.ch" style={{ color: "#1B3A6B" }}>recruiter@execpartners.ch</a>.
              </span>
            </label>
          </div>

          {errorMsg && <p style={{ color: "#ef4444", fontSize: "13px", marginBottom: "16px" }}>{errorMsg}</p>}

          <button onClick={handleSubmit} disabled={status === "loading"}
            style={{ width: "100%", background: "#1B3A6B", color: "#ffffff", border: "none", borderRadius: "10px", padding: "14px", fontSize: "14px", fontWeight: 600, letterSpacing: "0.03em", cursor: "pointer", opacity: status === "loading" ? 0.6 : 1 }}>
            {status === "loading" ? "Submitting..." : "Join the Specialist Bench"}
          </button>

          {status === "error" && (
            <p style={{ color: "#ef4444", fontSize: "13px", textAlign: "center", marginTop: "12px" }}>
              Something went wrong. Please email recruiter@execpartners.ch.
            </p>
          )}

          <p style={{ fontSize: "12px", color: "#9ca3af", textAlign: "center", marginTop: "20px", marginBottom: 0 }}>
            Strictly confidential. No unsolicited approaches to your current employer.
          </p>
        </div>
      </section>

      <section style={{ padding: "0 16px 64px" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "13px", color: "#6b7280" }}>
            Looking for senior Relationship Manager positions?{" "}
            <a href="/en/candidate-assessment" style={{ color: "#1B3A6B", fontWeight: 500 }}>
              Use our Business Plan Simulator instead.
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
