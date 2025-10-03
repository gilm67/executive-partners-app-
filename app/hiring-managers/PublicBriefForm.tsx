// app/hiring-managers/PublicBriefForm.tsx
"use client";

import { useState } from "react";

type Payload = {
  title: string;
  market: string;
  location: string;
  seniority: string;
  summary: string;
  confidential: boolean;
  contactName: string;
  contactEmail: string;
};

const defaultData: Payload = {
  title: "",
  market: "",
  location: "",
  seniority: "",
  summary: "",
  confidential: true,
  contactName: "",
  contactEmail: "",
};

export default function PublicBriefForm() {
  const [data, setData] = useState<Payload>(defaultData);
  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [err, setErr] = useState<string | null>(null);

  const onChange = (k: keyof Payload, v: any) => {
    setData((d) => ({ ...d, [k]: v }));
  };

  const validate = () => {
    if (!data.title.trim()) return "Please add a role title.";
    if (!data.market.trim()) return "Please choose a market.";
    if (!data.location.trim()) return "Please add a location.";
    if (!data.seniority.trim()) return "Please add a seniority.";
    if (!data.summary.trim()) return "Please add a short summary.";
    if (!data.contactName.trim()) return "Please add your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.contactEmail))
      return "Please enter a valid email.";
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    const msg = validate();
    if (msg) { setErr(msg); return; }

    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json?.ok) {
        setOk(true);
        setData(defaultData);
      } else {
        setOk(false);
        setErr(json?.error || "Something went wrong. Please try again.");
      }
    } catch (e: any) {
      setOk(false);
      setErr(e?.message || "Network error.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="ep-label">Company</label>
          <input
            className="ep-input"
            value={data.market ? data.market.split(" | ")[0] : ""}
            onChange={(e) => onChange("market", e.target.value)}
            placeholder="Bank / Platform"
          />
        </div>

        <div>
          <label className="ep-label">Role Title*</label>
          <input
            className="ep-input"
            value={data.title}
            onChange={(e) => onChange("title", e.target.value)}
            placeholder="Senior Relationship Manager / Team Head"
          />
        </div>

        <div>
          <label className="ep-label">Market*</label>
          <input
            className="ep-input"
            value={data.market}
            onChange={(e) => onChange("market", e.target.value)}
            placeholder="CH Onshore / MEA / UK / APAC…"
          />
        </div>

        <div>
          <label className="ep-label">Location*</label>
          <input
            className="ep-input"
            value={data.location}
            onChange={(e) => onChange("location", e.target.value)}
            placeholder="Geneva / Zurich / Dubai / London…"
          />
        </div>

        <div>
          <label className="ep-label">Seniority*</label>
          <input
            className="ep-input"
            value={data.seniority}
            onChange={(e) => onChange("seniority", e.target.value)}
            placeholder="Director / MD / Team Head"
          />
        </div>
      </div>

      <div>
        <label className="ep-label">Short Summary*</label>
        <textarea
          className="ep-textarea"
          rows={5}
          value={data.summary}
          onChange={(e) => onChange("summary", e.target.value)}
          placeholder="UHNW build-out; booking in CH & SG; portability required; cross-border constraints…"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="confidential"
          type="checkbox"
          className="ep-checkbox"
          checked={data.confidential}
          onChange={(e) => onChange("confidential", e.target.checked)}
        />
        <label htmlFor="confidential" className="text-sm text-neutral-300">
          Keep posting unlisted (share privately only)
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="ep-label">Your Name*</label>
          <input
            className="ep-input"
            value={data.contactName}
            onChange={(e) => onChange("contactName", e.target.value)}
            placeholder="First Last"
          />
        </div>
        <div>
          <label className="ep-label">Work Email*</label>
          <input
            className="ep-input"
            value={data.contactEmail}
            onChange={(e) => onChange("contactEmail", e.target.value)}
            placeholder="name@bank.com"
          />
        </div>
      </div>

      {err && (
        <p className="rounded-md border border-red-500/30 bg-red-500/10 p-2 text-sm text-red-300">
          {err}
        </p>
      )}
      {ok && !err && (
        <p className="rounded-md border border-emerald-500/30 bg-emerald-500/10 p-2 text-sm text-emerald-300">
          Thanks — your brief was received. We’ll reply shortly.
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="ep-btn-primary"
      >
        {submitting ? "Submitting…" : "Submit Brief"}
      </button>
    </form>
  );
}