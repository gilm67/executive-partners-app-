"use client";

import { useEffect, useMemo, useState } from "react";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";

type ReqType = "profile" | "bp" | "portability";
type GateStatus = "none" | "pending" | "approved" | "rejected";

type Props = {
  requestType: ReqType;
  title: string;
  description?: string;

  // server-provided (can be stale)
  status?: GateStatus;
  requestId?: string | null;

  // where to refresh / where to return after auth
  refreshHref?: string; // e.g. "/en/portability" or "/en/bp-simulator"
};

function defaultHrefForType(t: ReqType) {
  if (t === "bp") return "/en/bp-simulator";
  if (t === "portability") return "/en/portability";
  return "/private";
}

function normalizeStatus(s?: any): GateStatus {
  if (s === "approved") return "approved";
  if (s === "rejected") return "rejected";
  if (s === "pending") return "pending";
  return "none";
}

export default function AccessRequestGate({
  requestType,
  title,
  description,
  status,
  requestId = null,
  refreshHref,
}: Props) {
  const refresh = refreshHref || defaultHrefForType(requestType);
  const autoApproveTool = requestType === "bp" || requestType === "portability";

  const [org, setOrg] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // ✅ Local authoritative state (prefer /api/private/me live status)
  const [liveStatus, setLiveStatus] = useState<GateStatus>(
    normalizeStatus(status)
  );
  const [submittedId, setSubmittedId] = useState<string | null>(requestId);

  // Detect whether user is authenticated
  const [sessionState, setSessionState] = useState<
    "checking" | "active" | "inactive"
  >("checking");

  async function refreshFromMe() {
    try {
      const res = await fetch("/api/private/me", {
        cache: "no-store",
        credentials: "include",
      });
      const data = await res.json().catch(() => null);

      const authed = Boolean(res.ok && data?.authenticated === true);
      setSessionState(authed ? "active" : "inactive");

      if (!authed) return;

      // ✅ Use new response: data.access[requestType].status + requestId
      const s = normalizeStatus(data?.access?.[requestType]?.status);
      const rid = data?.access?.[requestType]?.requestId ?? null;

      setLiveStatus(s);
      if (rid && !submittedId) setSubmittedId(String(rid));

      // ✅ Auto-redirect for tools as soon as approved is observed
      if (autoApproveTool && s === "approved") {
        window.location.assign(refresh);
      }
    } catch {
      setSessionState("inactive");
    }
  }

  // Initial load: derive auth + live access from /me
  useEffect(() => {
    void refreshFromMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestType]);

  // Keep local state in sync if server prop changes (but do not regress)
  useEffect(() => {
    if (requestId && !submittedId) setSubmittedId(requestId);

    setLiveStatus((prev) => {
      if (prev === "approved") return "approved"; // never regress locally
      const next = normalizeStatus(status);
      return next === "none" ? prev : next; // don't overwrite with "none" from stale props
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, requestId]);

  // ✅ Primary CTA logic
  const primary = useMemo(() => {
    if (sessionState === "checking") {
      return { label: "Checking session…", href: refresh, disabled: true };
    }

    if (sessionState !== "active") {
      return {
        label: "Get secure link",
        href: `/private/auth/request?next=${encodeURIComponent(refresh)}`,
        disabled: false,
      };
    }

    if (liveStatus === "approved") {
      return { label: "Continue", href: refresh, disabled: false };
    }

    // ✅ none / pending / rejected → show request form
    return {
      label: liveStatus === "pending" ? "Request sent" : "Request access",
      href: "#request",
      disabled: false,
    };
  }, [sessionState, liveStatus, refresh]);

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

      if (res.status === 401) {
        window.location.assign(
          `/private/auth/request?next=${encodeURIComponent(refresh)}`
        );
        return;
      }

      if (!res.ok || !json?.ok) {
        alert(json?.error ? `Request failed: ${json.error}` : "Request failed.");
        return;
      }

      if (json?.data?.id) setSubmittedId(String(json.data.id));

      // ✅ After submitting: refresh from /me (source of truth)
      await refreshFromMe();

      // If still not approved:
      if (!autoApproveTool) {
        alert("Access request sent. We will review and confirm by email.");
      } else {
        // for tools: if it isn't approved yet, tell them to refresh
        if (liveStatus !== "approved") {
          alert("Request received. If not unlocked instantly, click Refresh status in a few seconds.");
        }
      }
    } finally {
      setSubmitting(false);
    }
  }

  const statusLabel =
    sessionState !== "active"
      ? "Not authenticated"
      : liveStatus === "approved"
      ? "Approved"
      : liveStatus === "rejected"
      ? "Rejected"
      : liveStatus === "pending"
      ? "Pending / Under review"
      : "Access required";

  const statusHint =
    sessionState !== "active"
      ? "Get a secure link to authenticate first."
      : liveStatus === "approved"
      ? "Access is enabled for your account."
      : liveStatus === "rejected"
      ? "Your request was rejected. You may submit a new request with more context."
      : liveStatus === "pending"
      ? "Your request is being processed."
      : autoApproveTool
      ? "Click Unlock now to request access (should unlock automatically)."
      : "Request access to unlock this area.";

  const showForm = sessionState === "active" && liveStatus !== "approved";

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
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-wide text-white/50">
                Current status
              </div>
              <div className="mt-1 font-semibold">{statusLabel}</div>
              <div className="mt-1 text-xs text-white/55">{statusHint}</div>

              {submittedId ? (
                <div className="mt-2 text-xs text-white/50">
                  Request ID: <span className="font-mono">{submittedId}</span>
                </div>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2">
              <SecondaryButton href="/en/contact">Contact</SecondaryButton>
              <SecondaryButton href={refresh}>Refresh</SecondaryButton>

              {/* ✅ real button (SecondaryButton doesn't support onClick) */}
              <button
                type="button"
                onClick={() => void refreshFromMe()}
                className="inline-flex rounded-2xl border border-white/15 px-4 py-2 text-sm text-white/80 hover:text-white hover:border-white/25"
              >
                Refresh status
              </button>
            </div>
          </div>
        </div>

        {/* ✅ ONE PRIMARY CTA / FORM */}
        <div className="mt-5">
          {!showForm ? (
            <PrimaryButton href={primary.href} disabled={primary.disabled}>
              {primary.label}
            </PrimaryButton>
          ) : (
            <div id="request" className="space-y-3">
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

              <button
                type="button"
                onClick={submitRequest}
                disabled={submitting}
                className="rounded-full bg-brandGold px-4 py-2 text-sm font-semibold text-black shadow-lg shadow-brandGold/30 hover:bg-brandGoldDark disabled:opacity-60"
              >
                {submitting
                  ? "Sending…"
                  : autoApproveTool
                  ? "Unlock now"
                  : "Request access"}
              </button>

              <p className="text-[11px] text-white/50">
                Confirmations are sent from recruiter@execpartners.ch.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}