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
  // simple honeypot
  const [company, setCompany] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOkMsg(null);
    setErrMsg(null);

    if (company.trim()) {
      setErrMsg("Submission blocked.");
      return;
    }
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

      let data: any = {};
      try {
        data = await res.json();
      } catch {
        /* no body */
      }

      if (!res.ok || data?.ok === false) {
        throw new Error(data?.error || "Submission failed");
      }

      setOkMsg("Thanks! Your application has been received.");
      // reset (keep context fields)
      setName("");
      setEmail("");
      setNotes("");
    } catch (err: any) {
      setErrMsg(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-white"
      noValidate
    >
      {okMsg && (
        <div role="status" className="rounded-md border border-emerald-300/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
          {okMsg}
        </div>
      )}
      {errMsg && (
        <div role="alert" className="rounded-md border border-rose-300/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
          {errMsg}
        </div>
      )}

      {/* Honeypot */}
      <div className="hidden">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm text-white/80" htmlFor="name">Name *</label>
          <input
            id="name"
            name="name"
            className="mt-1 w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/50 outline-none focus:border-white/25"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            required
            aria-required="true"
          />
        </div>
        <div>
          <label className="block text-sm text-white/80" htmlFor="email">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            className="mt-1 w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/50 outline-none focus:border-white/25"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            aria-required="true"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm text-white/80" htmlFor="role">Role</label>
          <input
            id="role"
            name="role"
            className="mt-1 w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/50 outline-none focus:border-white/25"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g., Private Banker"
          />
        </div>
        <div>
          <label className="block text-sm text-white/80" htmlFor="market">Market</label>
          <input
            id="market"
            name="market"
            className="mt-1 w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/50 outline-none focus:border-white/25"
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            placeholder="e.g., CH Onshore"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm text-white/80" htmlFor="jobId">Job ID (optional)</label>
          <input
            id="jobId"
            name="jobId"
            className="mt-1 w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/50 outline-none focus:border-white/25"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            placeholder="e.g., 101"
          />
        </div>
        <div>
          <label className="block text-sm text-white/80" htmlFor="notes">Notes</label>
          <input
            id="notes"
            name="notes"
            className="mt-1 w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/50 outline-none focus:border-white/25"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anything you'd like to add"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-[#1D4ED8] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1E40AF] disabled:opacity-60"
        aria-busy={loading}
      >
        {loading ? "Submitting…" : "Submit Application"}
      </button>

      <p className="text-xs text-white/60">
        We’ll email you from Executive Partners. Your details are confidential.
      </p>
    </form>
  );
}