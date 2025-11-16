"use client";

import { useState } from "react";

type ContactType = "candidate" | "hiring-manager" | "other";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
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
        <label className="block text-sm font-medium text-neutral-200">
          I am a…
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setContactType("candidate")}
            className={`btn-ghost text-xs px-3 py-1.5 ${
              contactType === "candidate"
                ? "border-emerald-400/80 bg-emerald-500/10 text-emerald-200"
                : "opacity-80"
            }`}
          >
            Candidate
          </button>
          <button
            type="button"
            onClick={() => setContactType("hiring-manager")}
            className={`btn-ghost text-xs px-3 py-1.5 ${
              contactType === "hiring-manager"
                ? "border-emerald-400/80 bg-emerald-500/10 text-emerald-200"
                : "opacity-80"
            }`}
          >
            Hiring Manager
          </button>
          <button
            type="button"
            onClick={() => setContactType("other")}
            className={`btn-ghost text-xs px-3 py-1.5 ${
              contactType === "other"
                ? "border-emerald-400/80 bg-emerald-500/10 text-emerald-200"
                : "opacity-80"
            }`}
          >
            Other
          </button>
        </div>
        <input type="hidden" name="contactType" value={contactType} />
      </div>

      {/* Name + Email */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-neutral-200">
            Name *
          </label>
          <input
            name="name"
            required
            className="w-full rounded-xl border border-neutral-700 bg-neutral-900/70 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
            placeholder="Your full name"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-neutral-200">
            Email *
          </label>
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
        <label className="block text-sm font-medium text-neutral-200">
          Phone (optional)
        </label>
        <input
          name="phone"
          className="w-full rounded-xl border border-neutral-700 bg-neutral-900/70 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
          placeholder="+41 ..."
        />
        <p className="text-[11px] text-neutral-500">
          We can call you discreetly — no voicemail, no messages left without
          prior agreement.
        </p>
      </div>

      {/* Hiring Manager fields */}
      {contactType === "hiring-manager" && (
        <div className="grid gap-4 md:grid-cols-3">
          <Field name="hm_company" label="Company" placeholder="Bank / IAM / Family Office" />
          <Field name="hm_role" label="Role" placeholder="Desk Head, COO..." />
          <Field name="hm_location" label="Location" placeholder="Geneva, Zurich, Dubai..." />
        </div>
      )}

      {/* Candidate fields */}
      {contactType === "candidate" && (
        <div className="grid gap-4 md:grid-cols-3">
          <Field name="cand_bank" label="Current bank" placeholder="UBS, Julius Baer..." />
          <Field name="cand_market" label="Market" placeholder="CH Onshore, MEA, LatAm..." />
          <Field name="cand_aum_band" label="AUM band" placeholder="e.g. 200–500m, 500m+" />
        </div>
      )}

      {/* Message */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-neutral-200">
          Message *
        </label>
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
          className="inline-flex w-full md:w-auto items-center justify-center rounded-full font-semibold text-sm leading-none px-6 py-3 min-w-[13rem] disabled:opacity-70 disabled:cursor-not-allowed"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #FFE8A3 0%, #F6C859 45%, #D6A738 100%)",
            backgroundColor: "transparent",
            color: "#1A1300",
            boxShadow:
              "0 10px 28px rgba(214,167,56,.38), inset 0 1px 0 rgba(255,255,255,.75)",
          }}
        >
          {status === "sending"
            ? "Sending…"
            : status === "sent"
            ? "Message sent"
            : "Send message confidentially"}
        </button>

        <p className="text-[11px] text-neutral-500">
          Or email us directly at{" "}
          <a
            href="mailto:contact@execpartners.ch"
            className="text-emerald-300 underline underline-offset-2"
          >
            contact@execpartners.ch
          </a>
          .
        </p>
      </div>

      {status === "error" && (
        <p className="text-[12px] text-red-400">
          Something went wrong. Please try again or email{" "}
          <a
            href="mailto:contact@execpartners.ch"
            className="underline underline-offset-2"
          >
            contact@execpartners.ch
          </a>
          .
        </p>
      )}
    </form>
  );
}

function Field({
  name,
  label,
  placeholder,
}: {
  name: string;
  label: string;
  placeholder: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-neutral-200">
        {label} (optional)
      </label>
      <input
        name={name}
        className="w-full rounded-xl border border-neutral-700 bg-neutral-900/70 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
        placeholder={placeholder}
      />
    </div>
  );
}