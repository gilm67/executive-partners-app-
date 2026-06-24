"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const NAVY = "#1B3A6B";
const GOLD = "#C9A14A";

export default function CandidateIntakePage() {
  const [form, setForm] = useState({
    candidateName: "",
    candidateEmail: "",
    institution: "",
    market: "",
    mandate: "",
    language: "en",
    direction: "outbound",
  });
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  function set(field: string, value: string) {
    setForm(p => ({ ...p, [field]: value }));
  }

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  async function handleSubmit() {
    if (!form.candidateName || !form.institution) {
      setError("Candidate name and institution are required.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Step 1: Create token
      const tokenRes = await fetch("/api/admin/create-token", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-ep-admin": password },
        body: JSON.stringify({
          candidateName: form.candidateName,
          institution: form.institution,
          mandate: form.mandate || "Senior Relationship Manager",
          market: form.market,
          language: form.language,
        }),
      });
      const tokenData = await tokenRes.json();
      if (!tokenData.success) throw new Error(tokenData.error || "Token creation failed");

      // Step 2: Orchestrate (sheets + email + calendar + message)
      const intakeRes = await fetch("/api/admin/intake-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-ep-admin": password },
        body: JSON.stringify({
          ...form,
          token: tokenData.token,
          tokenUrl: tokenData.url,
        }),
      });
      const intakeData = await intakeRes.json();
      if (!intakeData.success) throw new Error(intakeData.error || "Intake failed");

      setResult({ ...intakeData, token: tokenData.token, url: tokenData.url });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", background: "#050814", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <div style={{ background: "#0B0F1A", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "40px", width: "100%", maxWidth: "400px" }}>
          <div style={{ color: GOLD, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "8px" }}>Executive Partners</div>
          <h1 style={{ color: "#fff", fontSize: "22px", fontWeight: 600, marginBottom: "24px" }}>Candidate Intake</h1>
          <label style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", display: "block", marginBottom: "8px" }}>Access password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && setAuthed(true)}
            style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "10px 14px", color: "#fff", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
            placeholder="Enter password"
          />
          <button
            onClick={() => setAuthed(true)}
            style={{ marginTop: "16px", width: "100%", background: GOLD, color: NAVY, border: "none", borderRadius: "10px", padding: "12px", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}
          >
            Enter
          </button>
        </div>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "10px", padding: "10px 14px", color: "#fff", fontSize: "14px", outline: "none",
    boxSizing: "border-box", fontFamily: "Arial, sans-serif",
  };
  const labelStyle: React.CSSProperties = { color: "rgba(255,255,255,0.7)", fontSize: "12px", marginBottom: "6px", display: "block" };
  const selectStyle: React.CSSProperties = { ...inputStyle, background: "#0B0F1A" };

  return (
    <div style={{ minHeight: "100vh", background: "#050814", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ background: "#0B0F1A", border: `1px solid rgba(201,161,74,0.3)`, borderRadius: "16px", padding: "24px 28px", marginBottom: "24px" }}>
          <div style={{ color: GOLD, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "6px" }}>Executive Partners · Internal Tool</div>
          <h1 style={{ color: "#fff", fontSize: "24px", fontWeight: 700, margin: 0 }}>Candidate Intake</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", marginTop: "8px", marginBottom: 0 }}>
            Generates token, drafts outreach message, logs to pipeline, creates calendar reminders. One form. One click.
          </p>
        </div>

        {!result ? (
          <div style={{ background: "#0B0F1A", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "28px" }}>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <label style={labelStyle}>Candidate Full Name *</label>
                <input style={inputStyle} value={form.candidateName} onChange={e => set("candidateName", e.target.value)} placeholder="e.g. David Fremont" />
              </div>
              <div>
                <label style={labelStyle}>Candidate Email</label>
                <input style={inputStyle} value={form.candidateEmail} onChange={e => set("candidateEmail", e.target.value)} placeholder="name@bank.com" />
              </div>
              <div>
                <label style={labelStyle}>Current Institution *</label>
                <input style={inputStyle} value={form.institution} onChange={e => set("institution", e.target.value)} placeholder="e.g. Julius Baer" />
              </div>
              <div>
                <label style={labelStyle}>Market Coverage</label>
                <input style={inputStyle} value={form.market} onChange={e => set("market", e.target.value)} placeholder="e.g. CH Onshore, Israeli, LATAM" />
              </div>
              <div>
                <label style={labelStyle}>Mandate Reference</label>
                <input style={inputStyle} value={form.mandate} onChange={e => set("mandate", e.target.value)} placeholder="e.g. UBP Senior RM Israeli" />
              </div>
              <div>
                <label style={labelStyle}>Outreach Language</label>
                <select style={selectStyle} value={form.language} onChange={e => set("language", e.target.value)}>
                  <option value="en">English</option>
                  <option value="fr">French</option>
                </select>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Direction</label>
                <div style={{ display: "flex", gap: "12px" }}>
                  {["outbound", "inbound"].map(d => (
                    <button
                      key={d}
                      onClick={() => set("direction", d)}
                      style={{
                        flex: 1, padding: "10px", borderRadius: "10px", border: "1px solid",
                        borderColor: form.direction === d ? GOLD : "rgba(255,255,255,0.12)",
                        background: form.direction === d ? `rgba(201,161,74,0.1)` : "transparent",
                        color: form.direction === d ? GOLD : "rgba(255,255,255,0.6)",
                        cursor: "pointer", fontSize: "13px", fontWeight: form.direction === d ? 700 : 400,
                      }}
                    >
                      {d === "outbound" ? "Outbound — I approached them" : "Inbound — They approached me"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && (
              <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "10px", padding: "12px 16px", color: "#fca5a5", fontSize: "13px", marginBottom: "16px" }}>
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: "100%", background: loading ? "rgba(201,161,74,0.5)" : GOLD, color: NAVY,
                border: "none", borderRadius: "12px", padding: "14px", fontWeight: 700,
                fontSize: "15px", cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Generating..." : "Generate Token & Outreach →"}
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Success banner */}
            <div style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)", borderRadius: "12px", padding: "16px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "32px", height: "32px", background: "#10b981", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, flexShrink: 0 }}>✓</div>
              <div>
                <div style={{ color: "#6ee7b7", fontWeight: 700, fontSize: "14px" }}>All done. Everything is ready.</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", marginTop: "2px" }}>Token created · Pipeline logged · Notification sent · Calendar links ready</div>
              </div>
            </div>

            {/* Assessment URL */}
            <div style={{ background: "#0B0F1A", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "20px" }}>
              <div style={{ color: GOLD, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Assessment Link</div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <code style={{ flex: 1, background: "rgba(255,255,255,0.05)", padding: "10px 14px", borderRadius: "8px", color: "#6ee7b7", fontSize: "13px", wordBreak: "break-all" }}>{result.url}</code>
                <button onClick={() => copy(result.url, "url")} style={{ background: copied === "url" ? "#10b981" : "rgba(255,255,255,0.1)", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 16px", cursor: "pointer", fontSize: "12px", whiteSpace: "nowrap", flexShrink: 0 }}>
                  {copied === "url" ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {/* Outreach message */}
            <div style={{ background: "#0B0F1A", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "20px" }}>
              <div style={{ color: GOLD, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>Outreach Message — ready to send</div>
              <div style={{ marginBottom: "12px" }}>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", marginBottom: "4px" }}>SUBJECT</div>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", padding: "8px 12px", borderRadius: "8px", color: "#fff", fontSize: "13px" }}>{result.outreach.subject}</div>
                  <button onClick={() => copy(result.outreach.subject, "subject")} style={{ background: copied === "subject" ? "#10b981" : "rgba(255,255,255,0.1)", color: "#fff", border: "none", borderRadius: "8px", padding: "8px 14px", cursor: "pointer", fontSize: "12px", whiteSpace: "nowrap", flexShrink: 0 }}>
                    {copied === "subject" ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", marginBottom: "4px" }}>MESSAGE</div>
              <div style={{ position: "relative" }}>
                <pre style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", padding: "16px", color: "rgba(255,255,255,0.85)", fontSize: "12px", lineHeight: 1.7, whiteSpace: "pre-wrap", fontFamily: "Arial, sans-serif", margin: 0 }}>
                  {result.outreach.body}
                </pre>
                <button onClick={() => copy(result.outreach.body, "body")} style={{ position: "absolute", top: "10px", right: "10px", background: copied === "body" ? "#10b981" : "rgba(255,255,255,0.1)", color: "#fff", border: "none", borderRadius: "6px", padding: "6px 12px", cursor: "pointer", fontSize: "11px" }}>
                  {copied === "body" ? "Copied!" : "Copy"}
                </button>
              </div>
              <div style={{ marginTop: "10px", padding: "10px 14px", background: "rgba(201,161,74,0.08)", border: "1px solid rgba(201,161,74,0.2)", borderRadius: "8px" }}>
                <div style={{ color: GOLD, fontSize: "11px", fontWeight: 700 }}>Reminder: add your one CV observation</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", marginTop: "2px" }}>Replace [YOUR ONE OBSERVATION FROM THEIR CV] with one specific sentence before sending.</div>
              </div>
            </div>

            {/* Calendar reminders */}
            <div style={{ background: "#0B0F1A", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "20px" }}>
              <div style={{ color: GOLD, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>Calendar Reminders — click to add</div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {[
                  { key: "day3", label: "Day 3 Follow-up", color: "#f59e0b" },
                  { key: "day7", label: "Day 7 Follow-up", color: "#f97316" },
                  { key: "day14", label: "Day 14 Close Loop", color: "#ef4444" },
                ].map(({ key, label, color }) => (
                  <a
                    key={key}
                    href={result.calendarLinks[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: "8px", background: `rgba(255,255,255,0.05)`, border: `1px solid rgba(255,255,255,0.1)`, borderRadius: "10px", padding: "10px 16px", color: "#fff", textDecoration: "none", fontSize: "13px" }}
                  >
                    <span style={{ color, fontWeight: 700 }}>+</span> {label}
                  </a>
                ))}
              </div>
            </div>

            {/* BP Status reminder */}
            <div style={{ background: "rgba(201,161,74,0.05)", border: "1px solid rgba(201,161,74,0.2)", borderRadius: "12px", padding: "16px 20px" }}>
              <div style={{ color: GOLD, fontWeight: 700, fontSize: "13px", marginBottom: "4px" }}>Next step: update EP Tracker</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>
                Add {form.candidateName} to EP Tracker with BP Status = <strong style={{ color: "#fbbf24" }}>SENT</strong> once you send the outreach message.
              </div>
            </div>

            {/* Start over */}
            <button
              onClick={() => { setResult(null); setForm({ candidateName: "", candidateEmail: "", institution: "", market: "", mandate: "", language: "en", direction: "outbound" }); }}
              style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)", borderRadius: "10px", padding: "12px", cursor: "pointer", fontSize: "14px" }}
            >
              New candidate →
            </button>

          </div>
        )}
      </div>
    </div>
  );
}
