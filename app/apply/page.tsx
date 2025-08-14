"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export const dynamic = "force-dynamic";   // ensure Vercel doesn’t cache a 404
export const runtime = "nodejs";          // keep it on the server runtime

export default function ApplyPage() {
  const sp = useSearchParams();
  const [name, setName]   = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  // Pre-fill from query
  const role   = sp.get("role")   || "";
  const market = sp.get("market") || "";
  const jobId  = sp.get("jobId")  || "";

  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setOk(null);
    setErr(null);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role, market, notes, jobId }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setOk(true);
      setName(""); setEmail(""); setNotes("");
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
            <label className="block text-sm text-neutral-300">Role</label>
            <input
              className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-neutral-100"
              value={role}
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-300">Market</label>
            <input
              className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-neutral-100"
              value={market}
              readOnly
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
