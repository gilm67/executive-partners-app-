"use client";

import { useMemo, useState } from "react";

type Candidate = {
  id: string;
  function: string;
  title: string;
  region: string;
  seniority: string;
  summary: string;
  highlights: string[];
  availability: string;
};

export default function TalentBenchClient({
  candidates,
}: {
  candidates: Candidate[];
}) {
  const [functionFilter, setFunctionFilter] = useState("All");
  const [regionFilter, setRegionFilter] = useState("All");
  const [activeCandidate, setActiveCandidate] = useState<Candidate | null>(
    null
  );
  const [requestSent, setRequestSent] = useState(false);
  const [requestEmail, setRequestEmail] = useState("");
  const [sending, setSending] = useState(false);

  const functions = useMemo(
    () => ["All", ...Array.from(new Set(candidates.map((c) => c.function)))],
    [candidates]
  );
  const regions = useMemo(
    () => ["All", ...Array.from(new Set(candidates.map((c) => c.region)))],
    [candidates]
  );

  const filtered = candidates.filter((c) => {
    return (
      (functionFilter === "All" || c.function === functionFilter) &&
      (regionFilter === "All" || c.region === regionFilter)
    );
  });

  async function handleRequest(e: React.FormEvent) {
    e.preventDefault();
    if (!activeCandidate) return;
    setSending(true);

    try {
      await fetch("/api/talent-bench-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateId: activeCandidate.id,
          candidateTitle: activeCandidate.title,
          requesterEmail: requestEmail,
        }),
      });
      setRequestSent(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  }

  function pillClass(active: boolean) {
    return active
      ? "px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wide bg-brand-gold text-brand-bg transition-colors"
      : "px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wide border border-white/15 text-brand-textMuted hover:border-brand-gold/50 hover:text-brand-text transition-colors";
  }

  return (
    <>
      {/* Filter row: function pills */}
      <div className="mb-4">
        <p className="text-xs uppercase tracking-widest text-brand-textMuted mb-2">
          Function
        </p>
        <div className="flex flex-wrap gap-2">
          {functions.map((f) => (
            <button
              key={f}
              onClick={() => setFunctionFilter(f)}
              className={pillClass(functionFilter === f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Filter row: region pills */}
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-brand-textMuted mb-2">
          Region
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => setRegionFilter(r)}
              className={pillClass(regionFilter === r)}
            >
              {r}
            </button>
          ))}
          <span className="ml-auto text-sm text-brand-textMuted whitespace-nowrap pl-4">
            {filtered.length} profile{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-brand-gold/40 via-white/10 to-transparent mb-10" />

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="group relative rounded-xl p-7 bg-brand-surface border border-white/10 hover:border-brand-gold/40 transition-colors flex flex-col overflow-hidden"
          >
            {/* Accent corner */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brand-gold to-transparent opacity-60" />

            <div className="flex items-start justify-between mb-4">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-brand-gold">
                {c.function}
              </span>
              <span className="text-[11px] font-mono text-brand-textMuted/70">
                {c.id}
              </span>
            </div>

            <h3 className="text-xl font-semibold mb-1 text-brand-text leading-snug">
              {c.title}
            </h3>
            <p className="text-sm text-brand-goldSoft mb-5">
              {c.region} &middot; {c.seniority}
            </p>

            <p className="text-sm text-brand-text/85 leading-relaxed mb-5">
              {c.summary}
            </p>

            <ul className="text-sm text-brand-textMuted space-y-1.5 mb-6">
              {c.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-2 block w-1 h-1 rounded-full bg-brand-gold flex-shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex items-center justify-between gap-4 pt-4 border-t border-white/5">
              <p className="text-xs text-brand-textMuted italic">
                {c.availability}
              </p>
              <button
                onClick={() => {
                  setActiveCandidate(c);
                  setRequestSent(false);
                  setRequestEmail("");
                }}
                className="flex-shrink-0 text-xs font-semibold uppercase tracking-wide border border-brand-gold text-brand-gold rounded-full px-4 py-2 hover:bg-brand-gold hover:text-brand-bg transition-colors"
              >
                Request profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-brand-textMuted py-16">
          No profiles match these filters.
        </p>
      )}

      {/* Modal */}
      {activeCandidate && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setActiveCandidate(null)}
        >
          <div
            className="bg-brand-surface border border-white/10 rounded-xl p-7 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {!requestSent ? (
              <form onSubmit={handleRequest}>
                <p className="text-[11px] uppercase tracking-widest text-brand-gold mb-2">
                  Confidential request
                </p>
                <h3 className="text-lg font-semibold mb-2 text-brand-text">
                  {activeCandidate.title}
                </h3>
                <p className="text-sm text-brand-textMuted mb-5">
                  {activeCandidate.region} &middot; {activeCandidate.id}
                </p>
                <p className="text-sm text-brand-textMuted mb-5">
                  We will follow up directly with the full CV and a
                  confidentiality note, subject to mutual fit.
                </p>
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={requestEmail}
                  onChange={(e) => setRequestEmail(e.target.value)}
                  className="w-full border border-white/10 rounded-md px-3 py-2.5 text-sm mb-5 bg-brand-bg text-brand-text placeholder:text-brand-textMuted/60 focus:outline-none focus:ring-1 focus:ring-brand-gold"
                />
                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveCandidate(null)}
                    className="text-sm px-4 py-2 rounded-full border border-white/15 text-brand-textMuted hover:text-brand-text transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={sending}
                    className="text-sm px-5 py-2 rounded-full bg-brand-gold text-brand-bg font-semibold disabled:opacity-50 hover:opacity-85 transition-opacity"
                  >
                    {sending ? "Sending..." : "Send request"}
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <p className="text-[11px] uppercase tracking-widest text-brand-gold mb-2">
                  Request sent
                </p>
                <h3 className="text-lg font-semibold mb-3 text-brand-text">
                  Thank you
                </h3>
                <p className="text-sm text-brand-textMuted mb-6">
                  Gil will be in touch shortly with the full profile for{" "}
                  {activeCandidate.id}.
                </p>
                <button
                  onClick={() => setActiveCandidate(null)}
                  className="text-sm px-5 py-2 rounded-full border border-white/15 text-brand-text hover:border-brand-gold/50 transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
