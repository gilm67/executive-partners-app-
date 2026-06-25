"use client";

import { useState, useEffect } from "react";

const NAVY = "#1B3A6B";
const GOLD = "#C9A14A";

type Assessment = {
  timestamp: string;
  name: string;
  email: string;
  institution: string;
  market: string;
  aum: string;
  roa: string;
  portability: string;
  epScore: string;
  token: string;
  analysisSummary: string;
};

function ScoreBadge({ score }: { score: string }) {
  const num = parseInt(score);
  if (isNaN(num)) return <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>—</span>;
  const color = num >= 22 ? "#6ee7b7" : num >= 16 ? "#fbbf24" : "#f87171";
  return (
    <span style={{ color, fontWeight: 700, fontSize: "14px" }}>{score}</span>
  );
}

export default function AssessmentsDashboard() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Assessment | null>(null);
  const [total, setTotal] = useState(0);

  async function load(pw: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/assessments", {
        headers: { "x-ep-admin": pw },
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to load");
      setAssessments(data.assessments);
      setTotal(data.total);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAuth() {
    setAuthed(true);
    await load(password);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "10px", padding: "10px 14px", color: "#fff", fontSize: "14px", outline: "none",
    boxSizing: "border-box", fontFamily: "Arial, sans-serif",
  };

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", background: "#050814", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <div style={{ background: "#0B0F1A", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "40px", width: "100%", maxWidth: "400px" }}>
          <div style={{ color: GOLD, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "8px" }}>Executive Partners</div>
          <h1 style={{ color: "#fff", fontSize: "22px", fontWeight: 600, marginBottom: "24px" }}>Assessments Dashboard</h1>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleAuth()}
            style={inputStyle} placeholder="Access password" />
          <button onClick={handleAuth}
            style={{ marginTop: "16px", width: "100%", background: GOLD, color: NAVY, border: "none", borderRadius: "10px", padding: "12px", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}>
            Enter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#050814", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <div>
            <div style={{ color: GOLD, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "4px" }}>Executive Partners · Internal</div>
            <h1 style={{ color: "#fff", fontSize: "24px", fontWeight: 700, margin: 0 }}>Candidate Assessments</h1>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div style={{ background: "rgba(201,161,74,0.1)", border: "1px solid rgba(201,161,74,0.3)", borderRadius: "10px", padding: "8px 16px", color: GOLD, fontSize: "13px", fontWeight: 700 }}>
              {total} total
            </div>
            <button onClick={() => load(password)}
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "8px 16px", color: "rgba(255,255,255,0.7)", fontSize: "13px", cursor: "pointer" }}>
              Refresh
            </button>
            <a href="/ep-internal/candidate-intake"
              style={{ background: GOLD, color: NAVY, borderRadius: "10px", padding: "8px 16px", fontSize: "13px", fontWeight: 700, textDecoration: "none" }}>
              New candidate →
            </a>
          </div>
        </div>

        {loading && (
          <div style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", padding: "60px" }}>Loading assessments...</div>
        )}

        {error && (
          <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "12px", padding: "16px", color: "#fca5a5", marginBottom: "16px" }}>
            {error}
          </div>
        )}

        {!loading && assessments.length === 0 && !error && (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <div style={{ color: "rgba(255,255,255,0.2)", fontSize: "48px", marginBottom: "16px" }}>📋</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "16px" }}>No assessments yet.</div>
            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px", marginTop: "8px" }}>Completed candidate assessments will appear here automatically.</div>
          </div>
        )}

        {/* Two-column layout when one is selected */}
        <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 1fr" : "1fr", gap: "16px" }}>

          {/* List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {assessments.map((a, idx) => (
              <div key={idx}
                onClick={() => setSelected(selected?.token === a.token ? null : a)}
                style={{
                  background: selected?.token === a.token ? "rgba(201,161,74,0.08)" : "#0B0F1A",
                  border: `1px solid ${selected?.token === a.token ? "rgba(201,161,74,0.4)" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: "12px", padding: "16px 20px", cursor: "pointer",
                  transition: "all 0.15s",
                }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ color: "#fff", fontWeight: 700, fontSize: "15px", marginBottom: "2px" }}>{a.name}</div>
                    <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>{a.institution} · {a.market}</div>
                  </div>
                  <ScoreBadge score={a.epScore} />
                </div>
                <div style={{ display: "flex", gap: "16px", marginTop: "10px" }}>
                  {[
                    { label: "AUM", value: a.aum },
                    { label: "ROA", value: a.roa },
                    { label: "Portability", value: a.portability },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</div>
                      <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px", fontWeight: 600, marginTop: "2px" }}>{value}</div>
                    </div>
                  ))}
                </div>
                <div style={{ color: "rgba(255,255,255,0.25)", fontSize: "11px", marginTop: "10px" }}>{a.timestamp}</div>
              </div>
            ))}
          </div>

          {/* Detail panel */}
          {selected && (
            <div style={{ background: "#0B0F1A", border: "1px solid rgba(201,161,74,0.2)", borderRadius: "12px", padding: "20px", position: "sticky", top: "20px", alignSelf: "flex-start" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: "18px" }}>{selected.name}</div>
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", marginTop: "2px" }}>{selected.institution} · {selected.market}</div>
                  <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", marginTop: "4px" }}>{selected.email}</div>
                </div>
                <button onClick={() => setSelected(null)}
                  style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.4)", fontSize: "20px", cursor: "pointer" }}>×</button>
              </div>

              {/* Score */}
              <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "10px", padding: "14px", marginBottom: "16px", display: "flex", gap: "24px" }}>
                {[
                  { label: "EP Score", value: selected.epScore, gold: true },
                  { label: "AUM", value: selected.aum },
                  { label: "ROA", value: selected.roa },
                  { label: "Portability", value: selected.portability },
                ].map(({ label, value, gold }) => (
                  <div key={label}>
                    <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</div>
                    <div style={{ color: gold ? GOLD : "rgba(255,255,255,0.8)", fontSize: gold ? "18px" : "14px", fontWeight: 700, marginTop: "2px" }}>{value}</div>
                  </div>
                ))}
              </div>

              {/* Analysis summary */}
              <div style={{ marginBottom: "16px" }}>
                <div style={{ color: GOLD, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Analysis Summary</div>
                <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "8px", padding: "12px", color: "rgba(255,255,255,0.7)", fontSize: "12px", lineHeight: 1.7, maxHeight: "200px", overflowY: "auto" }}>
                  {selected.analysisSummary}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <a href={`mailto:${selected.email}?subject=Your EP Assessment — Next Steps`}
                  style={{ display: "block", textAlign: "center", background: GOLD, color: NAVY, borderRadius: "10px", padding: "10px", fontWeight: 700, fontSize: "13px", textDecoration: "none" }}>
                  Email {selected.name.split(" ")[0]} →
                </a>
                <a href={`https://www.execpartners.ch/en/candidate-assessment/${selected.token}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ display: "block", textAlign: "center", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", borderRadius: "10px", padding: "10px", fontSize: "13px", textDecoration: "none" }}>
                  View assessment form →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
