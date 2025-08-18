"use client";

import { useState } from "react";

type Props = {
  initialRole?: string;
  initialMarket?: string;
};

export default function ApplyClient({ initialRole = "", initialMarket = "" }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [role, setRole] = useState(initialRole);
  const [market, setMarket] = useState(initialMarket);

  const [aum, setAum] = useState("");
  const [mobility, setMobility] = useState("");
  const [notes, setNotes] = useState("");

  const [file, setFile] = useState<File | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setOk(null);
    setErr(null);

    try {
      const fd = new FormData();
      fd.append("fullName", name);
      fd.append("email", email);
      fd.append("role", role);
      fd.append("market", market);
      fd.append("aum", aum);
      fd.append("mobility", mobility);
      fd.append("notes", notes);
      if (file) fd.append("cv", file);

      const res = await fetch("/api/register", { method: "POST", body: fd });
      const json = await res.json().catch(() => ({} as any));
      if (!res.ok || json?.ok !== true) {
        throw new Error(json?.error || `HTTP ${res.status}`);
      }

      setOk(true);
      setName(""); setEmail("");
      setAum(""); setMobility(""); setNotes("");
      setFile(null);
    } catch (e: any) {
      setOk(false);
      setErr(e?.message || "Submit error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <label className="block text-sm text-neutral-300">Role (editable)</label>
          <input
            className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
            placeholder="e.g., Private Banker"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-300">Market (editable)</label>
          <input
            className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
            placeholder="e.g., CH Onshore"
            value={market}
            onChange={(e) => setMarket(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-300">AUM (optional)</label>
          <input
            className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-neutral-100 placeholder-neutral-500"
            placeholder="e.g., 50M+"
            value={aum}
            onChange={(e) => setAum(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-300">Mobility / Notice (optional)</label>
          <input
            className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-neutral-100 placeholder-neutral-500"
            placeholder="e.g., 3 months"
            value={mobility}
            onChange={(e) => setMobility(e.target.value)}
          />
        </div>
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

      <div className="mt-4">
        <label className="block text-sm text-neutral-300">Attach CV (PDF/DOCX)</label>
        <input
          type="file"
          name="cv"
          className="mt-1 block w-full text-sm text-neutral-200 file:mr-4 file:rounded-md file:border-0 file:bg-neutral-700 file:px-3 file:py-2 file:text-neutral-100 hover:file:bg-neutral-600"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
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
  );
}


