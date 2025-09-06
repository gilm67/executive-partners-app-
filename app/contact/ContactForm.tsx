// app/contact/ContactForm.tsx
"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setMsg("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      message: fd.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      if (!res.ok) throw new Error(text || "Failed to send");

      setStatus("success");
      setMsg("Thank you. We’ll respond quickly and confidentially.");
      (e.currentTarget as HTMLFormElement).reset();
    } catch (err: any) {
      setStatus("error");
      setMsg(err?.message ?? "Unable to send. Please try again.");
    }
  }

  return (
    <>
      {status !== "idle" && msg && (
        <div
          className={`mb-6 rounded-xl border p-4 text-sm ${
            status === "success"
              ? "border-emerald-700/40 bg-emerald-900/20 text-emerald-300"
              : status === "error"
              ? "border-red-700/40 bg-red-900/20 text-red-300"
              : "border-neutral-700 bg-neutral-900 text-neutral-300"
          }`}
        >
          {msg}
        </div>
      )}

      <form
        onSubmit={onSubmit}
        className="space-y-5 rounded-2xl border border-neutral-800 bg-neutral-950/40 p-6 shadow-lg"
      >
        <div>
          <label className="block text-sm font-medium text-neutral-300">Name</label>
          <input
            name="name"
            required
            placeholder="Your full name"
            className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm focus:border-neutral-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-300">Email</label>
          <input
            name="email"
            type="email"
            required
            placeholder="name@company.com"
            className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm focus:border-neutral-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-300">Message</label>
          <textarea
            name="message"
            rows={7}
            required
            placeholder="Tell us about your hiring need or your profile. All messages are confidential."
            className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm leading-6 focus:border-neutral-600"
          />
        </div>

        <button
          disabled={status === "sending"}
          className="w-full rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send"}
        </button>

        <p className="text-xs text-neutral-500">
          By submitting, you consent to confidential processing of your information for recruitment services.
        </p>
      </form>
    </>
  );
}
