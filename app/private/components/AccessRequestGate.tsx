"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";

type GateStatus = "pending" | "approved" | "rejected";

type Props = {
  requestType: "profile" | "bp" | "portability";
  title: string;
  description?: string;
  status?: GateStatus;
  requestId?: string | null;
};

function getNextPath(requestType: Props["requestType"]) {
  if (requestType === "bp") return "/en/bp-simulator";
  if (requestType === "portability") return "/en/portability";
  // default for profile access (adjust if your canonical page differs)
  return "/private/candidate-profiles";
}

export default function AccessRequestGate({
  requestType,
  title,
  description,
  status = "pending",
  requestId = null,
}: Props) {
  const router = useRouter();

  const [org, setOrg] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(requestId);

  const effectiveStatus: GateStatus = useMemo(() => {
    return status ?? "pending";
  }, [status]);

  const canRequest = effectiveStatus !== "approved";

  const nextPath = useMemo(() => getNextPath(requestType), [requestType]);
  const authHref = useMemo(
    () => `/private/auth?next=${encodeURIComponent(nextPath)}`,
    [nextPath]
  );

  async function submitRequest() {
    if (submitting) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/private/access-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          request_type: requestType,
          requester_org: org.trim() || null,
          message: message.trim() || null,
        }),
      });

      const json = await res.json().catch(() => ({}));

      // ✅ If not logged in (or cookie missing), send them to private auth
      // and bring them back to the right tool after verification.
      if (res.status === 401) {
        router.push(authHref);
        return;
      }

      if (!res.ok || !json?.ok) {
        alert(json?.error ? `Request failed: ${json.error}` : "Request failed.");
        return;
      }

      setSubmittedId(json?.data?.id ?? null);
      alert("Request sent. We will review and confirm by email.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl border border-white/10 bg-black/40 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.7)]">
        <div className="inline-flex items-center gap-2 rounded-full bg-brandGold/10 px-3 py-1 text-xs font-semibold text-brandGoldPale ring-1 ring-brandGold/40">
          Executive Partners · Private Access
        </div>

        <h1 className="mt-3 text-2xl font-bold text-white">{title}</h1>

        {description ? (
          <p className="mt-2 text-sm text-white/70">{description}</p>
        ) : null}

        <div className="mt-4 rounded-xl border border-white/10 bg-black/50 p-4 text-sm text-white/80">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-wide text-white/50">
                Current status
              </div>
              <div className="mt-1 font-semibold">
                {effectiveStatus === "approved"
                  ? "Approved"
                  : effectiveStatus === "rejected"
                  ? "Rejected"
                  : "Pending / Not approved yet"}
              </div>
              {submittedId ? (
                <div className="mt-1 text-xs text-white/50">
                  Request ID: <span className="font-mono">{submittedId}</span>
                </div>
              ) : null}
            </div>

            <div className="flex gap-2">
              <SecondaryButton href="/en/contact">Contact</SecondaryButton>
              {/* ✅ refresh must return to the page that is gated */}
              <SecondaryButton href={nextPath}>Refresh</SecondaryButton>
            </div>
          </div>
        </div>

        {canRequest ? (
          <div className="mt-5 space-y-3">
            <div>
              <label className="block text-xs font-medium text-white/70">
                Organisation (optional)
              </label>
              <input
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none"
                placeholder="e.g. UBS, Julius Baer, Family Office, etc."
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/70">
                Message (optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 min-h-[90px] w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none"
                placeholder="Brief context (market, coverage, reason for access)…"
              />
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="button"
                onClick={submitRequest}
                disabled={submitting}
                className="rounded-full bg-brandGold px-4 py-2 text-sm font-semibold text-black shadow-lg shadow-brandGold/30 hover:bg-brandGoldDark disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Request access"}
              </button>

              {/* ✅ If they need to authenticate first, this takes them to auth with the correct return path */}
              <PrimaryButton href={authHref}>Request link</PrimaryButton>

              <PrimaryButton href="/en/contact">Discuss confidentially</PrimaryButton>
            </div>

            <p className="text-[11px] text-white/50">
              Important: all confirmations are sent from recruiter@execpartners.ch.
            </p>
          </div>
        ) : (
          <div className="mt-5">
            {/* ✅ continue should go to the correct tool page */}
            <PrimaryButton href={nextPath}>Continue to tool</PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
}