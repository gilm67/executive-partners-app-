"use client";

import { useRef, useState } from "react";

type Props = {
  defaultRole?: string;
  defaultMarket?: string;
  defaultJobId?: string;
};

const MAX_CV_BYTES = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_MIME = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export default function ApplyForm({
  defaultRole = "",
  defaultMarket = "",
  defaultJobId = "",
}: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState<boolean | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  // CV state + ref to trigger native picker
  const cvInputRef = useRef<HTMLInputElement | null>(null);
  const [cvName, setCvName] = useState<string | null>(null);
  const [cvError, setCvError] = useState<string | null>(null);

  function handlePickCv() {
    setCvError(null);
    cvInputRef.current?.click();
  }

  function handleCvChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCvError(null);
    const f = e.currentTarget.files?.[0];
    if (!f) {
      setCvName(null);
      return;
    }
    if (f.size > MAX_CV_BYTES) {
      setCvError("File too large (max 10 MB).");
      e.currentTarget.value = "";
      setCvName(null);
      return;
    }
    // Type hint: allow by extension even if some browsers don’t set strict MIME for doc/docx
    const okMime =
      ACCEPTED_MIME.includes(f.type) ||
      /\.(pdf|doc|docx)$/i.test(f.name || "");
    if (!okMime) {
      setCvError("Unsupported file type. Please upload PDF, DOC, or DOCX.");
      e.currentTarget.value = "";
      setCvName(null);
      return;
    }
    setCvName(f.name);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setOk(null);
    setErrMsg(null);

    try {
      const form = e.currentTarget;
      const fd = new FormData(form); // ✅ multipart/form-data

      // If there is a CV error, block submission
      if (cvError) {
        throw new Error(cvError);
      }

      const res = await fetch("/api/apply", {
        method: "POST",
        body: fd,
        // ⛔️ Do NOT set Content-Type — browser sets boundary
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Request failed (${res.status})`);
      }

      setOk(true);
      form.reset();
      setCvName(null);
      setCvError(null);
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

      <form
        onSubmit={onSubmit}
        encType="multipart/form-data"
        className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6"
      >
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm text-white/80">
              Name *
            </label>
            <input
              id="name"
              name="name"
              required
              placeholder="Your full name"
              className="mt-1 w-full rounded-md bg-white/5 px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm text-white/80">
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="mt-1 w-full rounded-md bg-white/5 px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm text-white/80">
              Role
            </label>
            <input
              id="role"
              name="role"
              defaultValue={defaultRole}
              placeholder="e.g., Senior RM"
              className="mt-1 w-full rounded-md bg-white/5 px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="market" className="block text-sm text-white/80">
              Market
            </label>
            <input
              id="market"
              name="market"
              defaultValue={defaultMarket}
              placeholder="e.g., Dubai / CH Onshore"
              className="mt-1 w-full rounded-md bg-white/5 px-3 py-2"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="jobId" className="block text-sm text-white/80">
              Job ID (optional)
            </label>
            <input
              id="jobId"
              name="jobId"
              defaultValue={defaultJobId}
              placeholder="e.g., 101"
              className="mt-1 w-full rounded-md bg-white/5 px-3 py-2"
            />
          </div>

          {/* CV Upload */}
          <div className="md:col-span-2">
            <label className="block text-sm text-white/80">CV / Résumé</label>
            <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-center">
              <input
                ref={cvInputRef}
                name="cv"
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="hidden"
                onChange={handleCvChange}
              />
              <button
                type="button"
                onClick={handlePickCv}
                className="inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold hover:bg-white/15"
              >
                Upload CV (PDF/DOC)
              </button>
              {cvName && (
                <span className="text-xs text-white/70">Selected: {cvName}</span>
              )}
            </div>
            <p className="mt-1 text-xs text-white/50">
              Accepted: PDF, DOC, DOCX. Max size: 10 MB.
            </p>
            {cvError && (
              <p className="mt-1 text-xs text-rose-300" role="alert">
                {cvError}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="notes" className="block text-sm text-white/80">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              placeholder="Anything you'd like to add (AUM portability, booking centres, mobility, languages)…"
              className="mt-1 w-full rounded-md bg-white/5 px-3 py-2"
              rows={4}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 w-full rounded-md bg-[#1D4ED8] px-4 py-2 font-semibold hover:bg-[#1E40AF] disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit Application"}
        </button>

        <p className="text-xs text-white/60">
          We review every submission and move only with your consent.
        </p>
      </form>
    </>
  );
}