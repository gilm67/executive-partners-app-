"use client";

import { useState } from "react";

type Props = {
  role?: string;
  market?: string;
  jobId?: string;
};

export default function ApplyClient({ role = "", market = "", jobId = "" }: Props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail]       = useState("");
  const [notes, setNotes]       = useState("");
  const [roleState, setRole]    = useState(role);
  const [marketState, setMarket]= useState(market);
  const [file, setFile]         = useState<File | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk]   = useState<null | boolean>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setOk(null);
    setErr(null);

    try {
      const fd = new FormData();
      fd.append("fullName", fullName);
      fd.append("email", email);
      fd.append("role", roleState);
      fd.append("market", marketState);
      fd.append("aum", "");        // optional field expected by /api/register
      fd.append("mobility", "");   // optional field expected by /api/register
      fd.append("notes", notes);
      if (jobId) fd.append("jobId", jobId);
      if (file)  fd.append("cv", file);

      const res = await fetch("/api/register", {
        method: "POST",
        body: fd,
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok || json?.ok !== true) {
        throw new Error(json?.error || `HTTP ${res.status}`);
      }

      setOk(true);
      // Clear only user-typed fields
      setFullName("");
      setEmail("");
      setNotes("");
      setFile(null);
      // Keep role/market values
    } catch (e: any) {
      setOk(false);
      setErr(e?.message || "Submit error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Apply confidentially</h1>
      <p className="text-neutral-400">
        Your profile will be reviewed discreetly. We’ll contact you if there’s a strong fit.
      </p>

      <form
        onSubmit={onSubmit}
        className="mx-auto w-full max-w-xl rounded-2xl border border-neutral-800 bg-neutral-900 p-6"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm text-neutral-300">Name</label>
            <input
              className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
              placeholder="Your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-300">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-300">Role</label>
            {/* Make editable (remove readOnly) */}
            <input
              className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-neutral-100"
              value={roleState}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Private Banker"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-300">Market</label>
            {/* Make editable (remove readOnly) */}
            <input
              className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-neutral-100"
              value={marketState}
              onChange={(e) => setMarket(e.target.value)}
              placeholder="e.g. CH Onshore"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm text-neutral-300">Attach CV (PDF/DOCX)</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="mt-1 w-full text-neutral-200 file:mr-3 file:rounded-md file:border-0 file:bg-neutral-700 file:px-3 file:py-2 file:text-neutral-100 hover:file:bg-neutral-600"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm text-neutral-300">Notes (optional)</label>
          <textarea
            className="mt-1 h-28 w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
            placeholder="Anything you’d like to add…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? "Submitting…" : "Submit"}
        </button>

        {ok === true && (
          <p className="mt-3 text-sm text-green-400">Thanks—application received.</p>
        )}
        {ok === false && (
          <p className="mt-3 text-sm text-red-400">Sorry, something went wrong: {err}</p>
        )}
      </form>
    </section>
  );
}
