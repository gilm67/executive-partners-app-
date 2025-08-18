// app/hiring-managers/page.tsx
"use client";

import { useState } from "react";

export default function HiringManagersPage() {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const payload = {
      title: String(fd.get("title") || "").trim(),
      role: String(fd.get("role") || "").trim(),
      location: String(fd.get("location") || "").trim(),
      market: String(fd.get("market") || "").trim(),
      seniority: String(fd.get("seniority") || "").trim(),
      summary: String(fd.get("summary") || "").trim(),
      description: String(fd.get("description") || "").trim(),
      confidential:
        fd.get("confidential") === "on" ? "YES" : (String(fd.get("confidential") || "") || "NO"),
    };

    if (!payload.title) {
      setError("Please provide a Title.");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/jobs/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok || json?.ok === false) {
        throw new Error(json?.error || `Request failed (${res.status})`);
      }

      setMessage("✅ Job posted to Google Sheets.");
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-neutral-950 text-neutral-100">
      {/* Hero */}
      <section className="border-b border-white/5 bg-gradient-to-b from-neutral-900/60 to-neutral-950">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Hiring Managers
          </h1>
          <p className="mt-3 max-w-2xl text-neutral-300">
            Create a new role. Entries are saved to your <em>Jobs</em> sheet and
            available instantly on the site.
          </p>
        </div>
      </section>

      {/* Form */}
      <section>
        <div className="mx-auto max-w-3xl px-6 py-10">
          <form
            onSubmit={onSubmit}
            className="form-dark mx-auto rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 backdrop-blur space-y-6"
          >
            {/* Alerts */}
            {message && (
              <div className="rounded-lg border border-teal-700/40 bg-teal-900/20 px-4 py-3 text-sm text-teal-200">
                {message}
              </div>
            )}
            {error && (
              <div className="rounded-lg border border-red-700/40 bg-red-900/20 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-200">
                Title <span className="text-neutral-400">(required)</span>
              </label>
              <input
                name="title"
                placeholder="e.g. Private Banker – Zurich"
                required
                className="w-full rounded-lg border border-neutral-700 bg-neutral-900 text-neutral-100 placeholder-neutral-400
                           focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 transition"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-200">
                  Role
                </label>
                <input
                  name="role"
                  placeholder="Private Banker"
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-900 text-neutral-100 placeholder-neutral-400
                             focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 transition"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-200">
                  Location
                </label>
                <input
                  name="location"
                  placeholder="Zurich"
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-900 text-neutral-100 placeholder-neutral-400
                             focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-200">
                  Market
                </label>
                <input
                  name="market"
                  placeholder="CH Onshore"
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-900 text-neutral-100 placeholder-neutral-400
                             focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 transition"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-200">
                  Seniority
                </label>
                <input
                  name="seniority"
                  placeholder="Senior"
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-900 text-neutral-100 placeholder-neutral-400
                             focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 transition"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-200">
                Summary
              </label>
              <input
                name="summary"
                placeholder="Short one-line summary"
                className="w-full rounded-lg border border-neutral-700 bg-neutral-900 text-neutral-100 placeholder-neutral-400
                           focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 transition"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-200">
                Description
              </label>
              <textarea
                name="description"
                rows={6}
                placeholder="Full description…"
                className="w-full rounded-lg border border-neutral-700 bg-neutral-900 text-neutral-100 placeholder-neutral-400
                           focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 transition"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="confidential"
                id="confidential"
                className="h-4 w-4 rounded border-neutral-700 bg-neutral-900 text-teal-500 focus:ring-teal-400"
              />
              <label htmlFor="confidential" className="text-sm text-neutral-200">
                Confidential
              </label>
            </div>

            <div className="pt-1">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center rounded-lg bg-teal-600 px-4 py-2 font-medium text-white
                           hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:opacity-60 transition"
              >
                {submitting ? "Posting…" : "Post Job"}
              </button>
            </div>
          </form>

          <p className="mt-4 text-xs text-neutral-400">
            Saved to your Google Sheet “Jobs” tab via service account.
          </p>
        </div>
      </section>
    </main>
  );
}

