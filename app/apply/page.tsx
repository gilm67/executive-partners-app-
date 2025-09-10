"use client";

import { useState } from "react";

type Props = {
  defaultRole?: string;
  defaultMarket?: string;
  defaultJobId?: string;
};

export default function ApplyForm({
  defaultRole = "",
  defaultMarket = "",
  defaultJobId = "",
}: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState<boolean | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setOk(null);
    setErrMsg(null);

    try {
      const form = e.currentTarget;
      const fd = new FormData(form); // ✅ send multipart/form-data

      const res = await fetch("/api/apply", {
        method: "POST",
        body: fd,
        // ⛔️ DO NOT set Content-Type — the browser sets the multipart boundary
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Request failed (${res.status})`);
      }

      setOk(true);
      form.reset();
    } catch (err: any) {
      setOk(false);
      setErrMsg(err?.message || "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* Inline status banners */}
      {ok === false && (
        <div className="mb-4 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm">
          {errMsg}
        </div>
      )}
      {ok === true && (
        <div className="mb-4 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm">
          Thank you — we’ve received your application.
        </div>
      )}

      <form onSubmit={onSubmit} encType="multipart/form-data" className="grid gap-3">
        <div className="grid gap-3 md:grid-cols-2">
          <input
            name="name"
            required
            placeholder="Name *"
            className="rounded-md bg-white/5 px-3 py-2"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Email *"
            className="rounded-md bg-white/5 px-3 py-2"
          />
          <input
            name="role"
            defaultValue={defaultRole}
            placeholder="Role (e.g., Senior RM)"
            className="rounded-md bg-white/5 px-3 py-2"
          />
          <input
            name="market"
            defaultValue={defaultMarket}
            placeholder="Market (e.g., Dubai / CH Onshore)"
            className="rounded-md bg-white/5 px-3 py-2"
          />
          <input
            name="jobId"
            defaultValue={defaultJobId}
            placeholder="Job ID (optional)"
            className="rounded-md bg-white/5 px-3 py-2 md:col-span-2"
          />
          {/* Optional CV upload (works with FormData) */}
          {/* <input
            name="cv"
            type="file"
            accept=".pdf,.doc,.docx"
            className="rounded-md bg-white/5 px-3 py-2 md:col-span-2"
          /> */}
          <textarea
            name="notes"
            placeholder="Anything you'd like to add"
            className="rounded-md bg-white/5 px-3 py-2 md:col-span-2"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 w-full rounded-md bg-[#1D4ED8] px-4 py-2 font-semibold hover:bg-[#1E40AF] disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </>
  );
}