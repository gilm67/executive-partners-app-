"use client";

import { useEffect, useRef, useState } from "react";

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

  // Context fields (useful in your email/webhook)
  const [currentUrl, setCurrentUrl] = useState("");
  const [userAgent, setUserAgent] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
      setUserAgent(window.navigator.userAgent);
    }
  }, []);

  // CV state + input ref
  const cvInputRef = useRef<HTMLInputElement | null>(null);
  const [cvName, setCvName] = useState<string | null>(null);
  const [cvError, setCvError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  function validateFile(f: File): string | null {
    if (f.size > MAX_CV_BYTES) return "File too large (max 10 MB).";
    const okMime = ACCEPTED_MIME.includes(f.type) || /\.(pdf|doc|docx)$/i.test(f.name || "");
    if (!okMime) return "Unsupported file type. Please upload PDF, DOC, or DOCX.";
    return null;
  }

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
    const problem = validateFile(f);
    if (problem) {
      setCvError(problem);
      e.currentTarget.value = "";
      setCvName(null);
      return;
    }
    setCvName(f.name);
  }

  function clearCv() {
    if (cvInputRef.current) {
      cvInputRef.current.value = "";
    }
    setCvName(null);
    setCvError(null);
  }

  // Drag & drop handlers
  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(true);
  }
  function onDragLeave() {
    setDragOver(false);
  }
  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    setCvError(null);

    const f = e.dataTransfer.files?.[0];
    if (!f) return;
    const problem = validateFile(f);
    if (problem) {
      setCvError(problem);
      clearCv();
      return;
    }
    // push into the hidden input so FormData includes it
    if (cvInputRef.current) {
      const dt = new DataTransfer();
      dt.items.add(f);
      cvInputRef.current.files = dt.files;
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

      if (cvError) throw new Error(cvError);

      const res = await fetch("/api/apply", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Request failed (${res.status})`);
      }

      setOk(true);
      form.reset();
      clearCv();
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
        noValidate
      >
        {/* Hidden context (not shown to users) */}
        <input type="hidden" name="sourceUrl" value={currentUrl} />
        <input type="hidden" name="ua" value={userAgent} />

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
              aria-required="true"
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
              aria-required="true"
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

          {/* CV Upload (Button + Drag & Drop) */}
          <div className="md:col-span-2">
            <label className="block text-sm text-white/80">CV / Résumé</label>

            {/* Hidden native input (used for FormData) */}
            <input
              ref={cvInputRef}
              name="cv"
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="hidden"
              onChange={handleCvChange}
            />

            <div className="mt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handlePickCv}
                className="inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold hover:bg-white/15"
                aria-label="Upload CV (browse files)"
              >
                Upload / Import CV (PDF/DOC)
              </button>

              {cvName && (
                <>
                  <span className="text-xs text-white/70">Selected: {cvName}</span>
                  <button
                    type="button"
                    onClick={clearCv}
                    className="rounded-md border border-white/20 px-2 py-1 text-xs hover:bg-white/10"
                    aria-label="Remove selected file"
                  >
                    Remove
                  </button>
                </>
              )}
            </div>

            {/* Drag & drop area */}
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              className={`mt-3 rounded-md border border-dashed px-4 py-6 text-center text-xs ${
                dragOver ? "border-white/60 bg-white/10" : "border-white/20 bg-white/5"
              }`}
              aria-label="Drag and drop your CV here"
            >
              Drag & drop your CV here (PDF, DOC, DOCX) — max 10 MB
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
          aria-busy={submitting}
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