"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      role: (form.elements.namedItem("role") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      // honeypot (hidden)
      website: (form.elements.namedItem("website") as HTMLInputElement).value,
      // tracking source (optional)
      source: "jobs.execpartners.ch/contact",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `Request failed (${res.status})`);
      }

      setStatus("ok");
      form.reset();
    } catch (err: any) {
      setError(err.message || "Failed to send. Please try again.");
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Contact</h1>
        <p className="mt-2 text-neutral-300">
          We’ll reply within 1 business day.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          {/* Honeypot (hidden) */}
          <input
            type="text"
            name="website"
            autoComplete="off"
            tabIndex={-1}
            className="hidden"
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-sm text-neutral-400">Name *</label>
              <input
                name="name"
                required
                className="mt-1 w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-600"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-400">Email *</label>
              <input
                name="email"
                type="email"
                required
                className="mt-1 w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-600"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-sm text-neutral-400">Phone (optional)</label>
              <input
                name="phone"
                className="mt-1 w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-600"
                placeholder="+41 ..."
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-400">I am a</label>
              <select
                name="role"
                className="mt-1 w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-600"
                defaultValue=""
              >
                <option value="">— Select —</option>
                <option>Candidate</option>
                <option>Hiring Manager</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-neutral-400">Message *</label>
            <textarea
              name="message"
              required
              rows={6}
              className="mt-1 w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-600"
              placeholder="Tell us briefly what you need…"
            />
          </div>

          <button
            disabled={status === "sending"}
            className="rounded-md bg-white px-4 py-2 font-medium text-black disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </button>

          {status === "ok" && (
            <p className="text-sm text-green-400">Thanks! We’ve received your message.</p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <div className="pt-6 text-sm text-neutral-400">
            Or email us directly:{" "}
            <a className="underline" href="mailto:recruiter@execpartners.ch">
              recruiter@execpartners.ch
            </a>
          </div>
        </form>

        <div className="mt-12 text-neutral-400">
          <div className="font-medium">Executive Partners</div>
          <div>Geneva, Switzerland</div>
        </div>
      </section>
    </main>
  );
}
