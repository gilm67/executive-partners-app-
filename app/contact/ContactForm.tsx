"use client";

import { useState } from "react";

type ContactType = "candidate" | "hiring-manager" | "other";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [contactType, setContactType] = useState<ContactType>("candidate");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setStatus("sent");
        form.reset();
      } else {
        console.error("Contact error", data);
        setStatus("error");
      }
    } catch (err) {
      console.error("Contact error", err);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* I am a… */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-neutral-200">I am a…</label>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setContactType("candidate")}
            className={`btn-ghost text-xs px-3 py-1.5 ${
              contactType === "candidate"
                ? "border-emerald-400/80 bg-emerald-500/10 text-emerald-200"
                : "opacity-80"
            }`}>
            Candidate
          </button>

          <button type="button" onClick={() => setContactType("hiring-manager")}
            className={`btn-ghost text-xs px-3 py-1.5 ${
              contactType === "hiring-manager"
                ? "border-emerald-400/80 bg-emerald-500/10 text-emerald-200"
                : "opacity-80"
            }`}>
            Hiring Manager
          </button>

          <button type="button" onClick={() => setContactType("other")}
            className={`btn-ghost text-xs px-3 py-1.5 ${
              contactType === "other"
                ? "border-emerald-400/80 bg-emerald-500/10 text-emerald-200"
                : "opacity-80"
            }`}>
            Other
          </button>
        </div>
        <input type="hidden" name="contactType" value={contactType} />
      </div>

      {/* Name + Email */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-neutral-200">Name *</label>
          <input
            name="name"
            required
            className="w-full rounded-xl border border-neutral-700 bg-neutral-900/70 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
            placeholder="Your full name"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-neutral-200">Email *</label>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-neutral-700 bg-neutral-900/70 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
            placeholder="you@company.com"
          />
        </div>
      </div>

      {/* Phone */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-neutral-200">Phone (optional)</label>
        <input
          name="phone"
          className="w-full rounded-xl border border-neutral-700 bg-neutral-900/70 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
          placeholder="+41 ..."
        />
        <p className="text-[11px] text-neutral-500">
          We can call you discreetly — no voicemail, no messages left without prior agreement.
        </p>
      </div>

      {/* Hiring Manager fields */}
      {contactType === "hiring-manager" && (
        <div className="grid gap-4 md:grid-cols-3">
          <InputHM label="Company (optional)" name="hm_company" placeholder="Bank / IAM / Family Office" />
          <InputHM label="Role (optional)" name="hm_role" placeholder="Desk Head, COO..." />
          <InputHM label="Location (optional)" name="hm_location" placeholder="Geneva, Zurich, Dubai..." />
        </div>
      )}

      {/* Candidate fields */}
      {contactType === "candidate" && (
        <div className="grid gap-4 md:grid-cols-3">
          <InputHM label="Current bank (optional)" name="cand_bank" placeholder="UBS, Julius Baer..." />
          <InputHM label="Market (optional)" name="cand_market" placeholder="CH Onshore, MEA, LatAm..." />
          <InputHM label="AUM band (optional)" name="cand_aum_band" placeholder="e.g. 200–500m, 500m+" />
        </div>
      )}

      {/* Message */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-neutral-200">Message *</label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full rounded-xl border border-neutral-700 bg-neutral-900/70 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
          placeholder={
            contactType === "hiring-manager"
              ? "Briefly describe the mandate, booking centre, market focus and seniority."
              : "Tell us about your situation, current platform and what you are exploring."
          }
        />
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 pt-2 md:flex-row md:items-center md:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-primary btn-xl w-full md:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === "sending" ? "Sending…" : status === "sent" ? "Message sent" : "Send message confidentially"}
        </button>
      </div>

      {status === "error" && (
        <p className="text-[12px] text-red-400">
          Something went wrong. Please try again later.
        </p>
      )}
    </form>
  );
}

/* Small helper component */
function InputHM({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-neutral-200">{label}</label>
      <input
        name={name}
        className="w-full rounded-xl border border-neutral-700 bg-neutral-900/70 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
        placeholder={placeholder}
      />
    </div>
  );
}