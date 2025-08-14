"use client";

import { useState } from "react";

export default function ApplyForm({
  defaultRole = "",
  defaultMarket = "",
  defaultJobId = "",
}: {
  defaultRole?: string;
  defaultMarket?: string;
  defaultJobId?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(defaultRole);
  const [market, setMarket] = useState(defaultMarket);
  const [notes, setNotes] = useState("");
  const [jobId, setJobId] = useState(defaultJobId);
  const [loading, setLoading] = useState(false);
  const [okMsg, setOkMsg] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOkMsg(null);
    setErrMsg(null);

    if (!name.trim() || !email.trim()) {
      setErrMsg("Name and Email are required.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          role: role.trim(),
          market: market.trim(),
          notes: notes.trim(),
          jobId: jobId.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data.error || "Submission failed");
      }

      setOkMsg("Thanks! Your application has been received.");
      // reset, but keep job context
      setName("");
      setEmail("");
      setNotes("");
    } catch (err: any) {
      setErrMsg(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border bg-white p-6">
      {okMsg && (
        <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
          {okMsg}
        </div>
      )}
      {errMsg && (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {errMsg}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm text-neutral-700">Name *</label>
          <input
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-neutral-700">Email *</label>
          <input
            type="email"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm text-neutral-700">Role</label>
          <input
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g., Private Banker"
          />
        </div>
        <div>
          <label className="block text-sm text-neutral-700">Market</label>
          <input
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600"
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            placeholder="e.g., CH Onshore"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm text-neutral-700">Job ID (optional)</label>
          <input
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            placeholder="e.g., 101"
          />
        </div>
        <div>
          <label className="block text-sm text-neutral-700">Notes</label>
          <input
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anything you'd like to add"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 disabled:opacity-60"
      >
        {loading ? "Submitting…" : "Submit Application"}
      </button>

      <p className="text-xs text-neutral-500">
        We’ll email you from Executive Partners. Your details are confidential.
      </p>
    </form>
  );
}
