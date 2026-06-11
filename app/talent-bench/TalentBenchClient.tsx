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

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-10">
        <select
          value={functionFilter}
          onChange={(e) => setFunctionFilter(e.target.value)}
          className="border border-neutral-300 rounded-md px-3 py-2 text-sm bg-white"
        >
          {functions.map((f) => (
            <option key={f} value={f}>
              {f === "All" ? "All functions" : f}
            </option>
          ))}
        </select>

        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="border border-neutral-300 rounded-md px-3 py-2 text-sm bg-white"
        >
          {regions.map((r) => (
            <option key={r} value={r}>
              {r === "All" ? "All regions" : r}
            </option>
          ))}
        </select>

        <span className="ml-auto text-sm text-neutral-500 self-center">
          {filtered.length} profile{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="border border-neutral-200 rounded-xl p-6 hover:shadow-md transition-shadow bg-white flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                {c.function}
              </span>
              <span className="text-xs text-neutral-400">{c.id}</span>
            </div>

            <h3 className="text-lg font-semibold mb-1">{c.title}</h3>
            <p className="text-sm text-neutral-500 mb-4">
              {c.region} &middot; {c.seniority}
            </p>

            <p className="text-sm text-neutral-700 leading-relaxed mb-4">
              {c.summary}
            </p>

            <ul className="text-sm text-neutral-600 space-y-1 mb-4">
              {c.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 block w-1 h-1 rounded-full bg-neutral-400 flex-shrink-0" />
                  {h}
                </li>
              ))}
            </ul>

            <p className="text-xs text-neutral-500 mb-5 mt-auto">
              {c.availability}
            </p>

            <button
              onClick={() => {
                setActiveCandidate(c);
                setRequestSent(false);
                setRequestEmail("");
              }}
              className="text-sm font-medium border border-neutral-900 rounded-md px-4 py-2 hover:bg-neutral-900 hover:text-white transition-colors"
            >
              Request full profile
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeCandidate && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={() => setActiveCandidate(null)}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {!requestSent ? (
              <form onSubmit={handleRequest}>
                <h3 className="text-lg font-semibold mb-2">
                  Request full profile
                </h3>
                <p className="text-sm text-neutral-600 mb-4">
                  {activeCandidate.title} &middot; {activeCandidate.region}{" "}
                  ({activeCandidate.id})
                </p>
                <p className="text-sm text-neutral-600 mb-4">
                  We will follow up directly with the full CV and a
                  confidentiality note, subject to mutual fit.
                </p>
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={requestEmail}
                  onChange={(e) => setRequestEmail(e.target.value)}
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm mb-4"
                />
                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveCandidate(null)}
                    className="text-sm px-4 py-2 rounded-md border border-neutral-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={sending}
                    className="text-sm px-4 py-2 rounded-md bg-neutral-900 text-white disabled:opacity-50"
                  >
                    {sending ? "Sending..." : "Send request"}
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <h3 className="text-lg font-semibold mb-2">Request sent</h3>
                <p className="text-sm text-neutral-600 mb-4">
                  Thank you. Gil will be in touch shortly with the full
                  profile for {activeCandidate.id}.
                </p>
                <button
                  onClick={() => setActiveCandidate(null)}
                  className="text-sm px-4 py-2 rounded-md border border-neutral-300"
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
