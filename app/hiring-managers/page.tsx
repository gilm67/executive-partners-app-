"use client";

import { useEffect, useState } from "react";

export default function HiringManagersPage() {
  // Admin token UI
  const [token, setToken] = useState("");
  const [tokenSaved, setTokenSaved] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const t = localStorage.getItem("ep_admin_token") || "";
      setToken(t);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ep_admin_token", token || "");
      setTokenSaved(!!token);
      const id = setTimeout(() => setTokenSaved(false), 1200);
      return () => clearTimeout(id);
    }
  }, [token]);

  // Form state
  const [title, setTitle] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [market, setMarket] = useState("");
  const [seniority, setSeniority] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [confidential, setConfidential] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [okMsg, setOkMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setOkMsg(null);

    if (!token) {
      setError("Missing admin token. Paste it above.");
      return;
    }

    setSubmitting(true);
    try {
      const body = {
        title: title.trim(),
        role: role.trim(),
        location: location.trim(),
        market: market.trim(),
        seniority: seniority.trim(),
        summary: summary.trim(),
        description: description.trim(),
        confidential,
      };

      const res = await fetch("/api/jobs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          // Primary (your API accepted this via curl):
          Authorization: `Bearer ${token}`,

          // Fallback (just in case the route checks this header name):
          "x-admin-token": token,
        },
        body: JSON.stringify(body),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(json?.error || `Unauthorized (${res.status})`);
        return;
      }

      setOkMsg("Job posted ✅");
      // optional: clear the form
      setTitle("");
      setRole("");
      setLocation("");
      setMarket("");
      setSeniority("");
      setSummary("");
      setDescription("");
      setConfidential(false);
    } catch (err: any) {
      setError(err?.message || "Network error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-2">Hiring Managers</h1>
      <p className="text-sm text-neutral-400 mb-6">
        Create a new role. Entries are saved to your <em>Jobs</em> sheet and
        available instantly on the site.
      </p>

      {/* --- Admin Token box --- */}
      <div className="mb-4">
        <label className="block text-sm text-neutral-300 mb-1">Admin Token</label>
        <input
          className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
          placeholder="EP_admin_…"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <div className="text-xs mt-1">
          {tokenSaved ? (
            <span className="text-emerald-400">Saved to this browser</span>
          ) : (
            <span className="text-neutral-500">
              Paste the value you set in Vercel (APP_ADMIN_TOKEN)
            </span>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded border border-red-600 bg-red-950/40 text-red-300 p-3">
          {error}
        </div>
      )}
      {okMsg && (
        <div className="mb-4 rounded border border-emerald-700 bg-emerald-900/30 text-emerald-300 p-3">
          {okMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
          placeholder="e.g. Private Banker – Zurich"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
          <input
            className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
            placeholder="Market"
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            required
          />
          <input
            className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
            placeholder="Seniority"
            value={seniority}
            onChange={(e) => setSeniority(e.target.value)}
            required
          />
        </div>
        <input
          className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
          placeholder="Short one-line summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <textarea
          className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
          placeholder="Full description…"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={confidential}
            onChange={(e) => setConfidential(e.target.checked)}
          />
          Confidential
        </label>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60"
        >
          {submitting ? "Posting…" : "Post Job"}
        </button>
        <p className="text-xs text-neutral-500">
          Saved to your Google Sheet “Jobs” tab via service account.
        </p>
      </form>
    </div>
  );
}
