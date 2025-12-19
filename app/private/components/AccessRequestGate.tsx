"use client";

import { useEffect, useMemo, useState } from "react";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";

type GateStatus = "pending" | "approved" | "rejected";

type Props = {
  requestType: "profile" | "bp" | "portability";
  title: string;
  description?: string;
  status?: GateStatus;
  requestId?: string | null;

  // where to refresh / where to return after auth
  refreshHref?: string; // e.g. "/en/portability" or "/en/bp-simulator"
};

function defaultHrefForType(t: Props["requestType"]) {
  if (t === "bp") return "/en/bp-simulator";
  if (t === "portability") return "/en/portability";
  return "/private";
}

function normalizeStatus(s?: GateStatus): GateStatus {
  if (s === "approved") return "approved";
  if (s === "rejected") return "rejected";
  return "pending";
}

export default function AccessRequestGate({
  requestType,
  title,
  description,
  status,
  requestId = null,
  refreshHref,
}: Props) {
  const [org, setOrg] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(requestId);

  const refresh = refreshHref || defaultHrefForType(requestType);

  // Detect whether user is authenticated
  const [sessionState, setSessionState] = useState<
    "checking" | "active" | "inactive"
  >("checking");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/private/me", { cache: "no-store" });
        const data = await res.json().catch(() => null);
        const authed = Boolean(res.ok && data?.authenticated === true);
        if (!cancelled) setSessionState(authed ? "active" : "inactive");
      } catch {
        if (!cancelled) setSessionState("inactive");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const effectiveStatus: GateStatus = useMemo(
    () => normalizeStatus(status),
    [status]
  );

  // ✅ Primary CTA logic (single action)
  const primary = useMemo(() => {
    // Still checking session => keep user calm, offer refresh only
    if (sessionState === "checking") {
      return {
        label: "Checking session…",
        href: refresh,
        disabled: true,
      };
    }

    // Not authenticated => Get secure link (magic link)
    if (sessionState !== "active") {
      return {
        label: "Get secure link",
        href: `/private/auth/request?next=${encodeURIComponent(refresh)}`,
        disabled: false,
      };
    }

    // Authenticated:
    if (effectiveStatus === "approved") {
      return { label: "Continue", href: refresh, disabled: false };
    }

    if (effectiveStatus === "pending") {
      // Request already pending → avoid allowing spam requests
      return { label: "Refresh", href: refresh, disabled: false };
    }

    // rejected → allow requesting again
    return { label: "Request access", href: "#request", disabled: false };
  }, [sessionState, effectiveStatus, refresh]);

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
        // session missing/expired → push them to magic link flow
        window.location.assign(
          `/private/auth/request?next=${encodeURIComponent(refresh)}`
        );
        return;
      }

      if (!res.ok || !json?.ok) {
        alert(json?.error ? `Request failed: ${json.error}` : "Request failed.");
        return;
      }

      setSubmittedId(json?.data?.id ?? null);
      alert("Access request sent. We will review and confirm by email.");

      // After request: best UX is to refresh the page so status updates
      window.location.assign(refresh);
    } finally {
      setSubmitting(false);
    }
  }

  const statusLabel =
    sessionState !== "active"
      ? "Not authenticated"
      : effectiveStatus === "approved"
      ? "Approved"
      : effectiveStatus === "rejected"
      ? "Rejected"
      : "Pending / Under review";

  const statusHint =
    sessionState !== "active"
      ? "Get a secure link to authenticate first."
      : effectiveStatus === "pending"
      ? "Your request is under review. We’ll confirm by email once approved."
      : effectiveStatus === "rejected"
      ? "Your request was rejected. You may submit a new request with more context."
      : effectiveStatus === "approved"
      ? "Access is enabled for your account."
      : "Request access to unlock this tool.";

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

            <div className="flex gap-2">
              <SecondaryButton href="/en/contact">Contact</SecondaryButton>
              <SecondaryButton href={refresh}>Refresh</SecondaryButton>
            </div>
          </div>
        </div>

        {/* ✅ ONE PRIMARY CTA */}
        <div className="mt-5">
          {primary.href === "#request" ? (
            <>
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
                  {submitting ? "Sending…" : "Request access"}
                </button>

                <p className="text-[11px] text-white/50">
                  Confirmations are sent from recruiter@execpartners.ch.
                </p>
              </div>
            </>
          ) : (
            <PrimaryButton href={primary.href}>
              {primary.label}
            </PrimaryButton>
          )}
        </div>
      </div>
    </div>
  );
}code 