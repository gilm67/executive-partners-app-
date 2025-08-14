"use client";

import { useState } from "react";

export default function ApplyPage({
  searchParams,
}: {
  searchParams?: { role?: string; market?: string; jobId?: string };
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const role = searchParams?.role ?? "";
  const market = searchParams?.market ?? "";
  const jobId = searchParams?.jobId ?? "";
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<null | "ok" | "err">(null);
  const [errMsg, setErrMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setDone(null);
    setErrMsg("");

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role, market, notes, jobId }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (json?.ok) {
        setDone("ok");
        setName("");
        setEmail("");
        setNotes("");
      } else {
        throw new Error(json?.error || "Unknown error");
      }
    } catch (err: any) {
      setDone("err");
      setErrMsg(String(err?.message || err));
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

      {/* Card stays white, inputs force dark text */}
      <div className="rounded-2xl border border-neutral-800 bg-white p-6 shadow-sm">
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Name / Email */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-900">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2
                           text-neutral-900 placeholder-neutral-500 outline-none
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="Your full name"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-900">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2
                           text-neutral-900 placeholder-neutral-500 outline-none
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          {/* Role / Market (read-only if provided) */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-900">
                Role
              </label>
              <input
                type="text"
                value={role}
                readOnly
                className="w-full cursor-not-allowed rounded-lg border border-neutral-300 bg-neutral-100 px-3 py-2
                           text-neutral-800 placeholder-neutral-500"
                placeholder="(optional)"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-900">
                Market
              </label>
              <input
                type="text"
                value={market}
                readOnly
                className="w-full cursor-not-allowed rounded-lg border border-neutral-300 bg-neutral-100 px-3 py-2
                           text-neutral-800 placeholder-neutral-500"
                placeholder="(optional)"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-900">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[120px] w-full rounded-lg border border-neutral-300 bg-white px-3 py-2
                         text-neutral-900 placeholder-neutral-500 outline-none
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="Anything you'd like to add…"
            />
          </div>

          {/* Hidden jobId field (if present) */}
          {jobId ? <input type="hidden" name="jobId" value={jobId} /> : null}

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-blue-700 px-4 py-2 text-white
                         hover:bg-blue-800 disabled:opacity-60"
            >
              {submitting ? "Submitting…" : "Submit"}
            </button>
          </div>

          {/* Feedback */}
          {done === "ok" && (
            <p className="text-sm text-green-700">
              ✅ Thanks! We’ve received your application.
            </p>
          )}
          {done === "err" && (
            <p className="text-sm text-red-600">
              ⚠️ Something went wrong: {errMsg}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

