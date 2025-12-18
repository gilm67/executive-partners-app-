"use client";

import { useState } from "react";

type Status = "pending" | "approved" | "rejected";

type UpdateResponse = {
  ok: boolean;
  data?: {
    id: string;
    status: Status | string;
    reviewed_at?: string | null;
    reviewed_by?: string | null;
  };
  error?: string;
};

function normalizeStatus(s: unknown): Status {
  const v = String(s || "").toLowerCase();
  if (v === "approved") return "approved";
  if (v === "rejected") return "rejected";
  return "pending";
}

export default function RequestStatusButtons({
  id,
  currentStatus,
  initialReviewedAt,
  initialReviewedBy,
  onUpdated,
}: {
  id: string;
  currentStatus: Status | string;
  initialReviewedAt?: string | null;
  initialReviewedBy?: string | null;
  onUpdated?: (payload: {
    id: string;
    status: Status;
    reviewed_at?: string | null;
    reviewed_by?: string | null;
  }) => void;
}) {
  const [loading, setLoading] = useState<Status | null>(null);
  const [status, setStatus] = useState<Status>(() => normalizeStatus(currentStatus));
  const [reviewedAt, setReviewedAt] = useState<string | null>(initialReviewedAt ?? null);
  const [reviewedBy, setReviewedBy] = useState<string | null>(initialReviewedBy ?? null);

  async function updateStatus(next: Status) {
    if (loading !== null) return;
    if (next === status) return;

    const prevStatus = status;
    const prevReviewedAt = reviewedAt;
    const prevReviewedBy = reviewedBy;

    setLoading(next);
    setStatus(next); // optimistic status

    // optimistic reviewed meta
    if (next !== "pending") {
      setReviewedAt(new Date().toISOString());
      setReviewedBy("…");
    } else {
      setReviewedAt(null);
      setReviewedBy(null);
    }

    try {
      const res = await fetch(`/api/private/admin/requests/${id}/status`, {
        method: "POST",
        credentials: "include", // ✅ IMPORTANT: send cookies/session
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });

      const json: UpdateResponse = await res.json().catch(() => ({ ok: false }));

      if (!res.ok || json.ok !== true || !json.data) {
        // rollback
        setStatus(prevStatus);
        setReviewedAt(prevReviewedAt);
        setReviewedBy(prevReviewedBy);
        throw new Error(json?.error ? String(json.error) : `HTTP_${res.status}`);
      }

      const canonicalStatus = normalizeStatus(json.data.status);
      setStatus(canonicalStatus);

      // canonical reviewed fields
      if (json.data.reviewed_at === null || typeof json.data.reviewed_at === "string") {
        setReviewedAt(json.data.reviewed_at ?? null);
      } else if (canonicalStatus === "pending") {
        setReviewedAt(null);
      }

      if (json.data.reviewed_by === null || typeof json.data.reviewed_by === "string") {
        setReviewedBy(json.data.reviewed_by ?? null);
      } else if (canonicalStatus === "pending") {
        setReviewedBy(null);
      }

      // include id so table updates correct row
      onUpdated?.({
        id: json.data.id,
        status: canonicalStatus,
        reviewed_at: json.data.reviewed_at ?? null,
        reviewed_by: json.data.reviewed_by ?? null,
      });
    } catch (err: any) {
      setStatus(prevStatus);
      setReviewedAt(prevReviewedAt);
      setReviewedBy(prevReviewedBy);
      alert(`Failed to update status: ${err?.message || "unknown_error"}`);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={() => updateStatus("approved")}
        disabled={loading !== null}
        className={`rounded-md px-2 py-1 text-xs ring-1 transition
          ${
            status === "approved"
              ? "bg-emerald-500/20 text-emerald-200 ring-emerald-400/30"
              : "bg-white/5 text-white/70 ring-white/10 hover:bg-emerald-500/10"
          } disabled:opacity-50`}
      >
        {loading === "approved" ? "…" : "Approve"}
      </button>

      {/* ✅ Reset button */}
      <button
        type="button"
        onClick={() => updateStatus("pending")}
        disabled={loading !== null}
        className={`rounded-md px-2 py-1 text-xs ring-1 transition
          ${
            status === "pending"
              ? "bg-white/10 text-white/90 ring-white/20"
              : "bg-white/5 text-white/70 ring-white/10 hover:bg-white/10"
          } disabled:opacity-50`}
      >
        {loading === "pending" ? "…" : "Reset"}
      </button>

      <button
        type="button"
        onClick={() => updateStatus("rejected")}
        disabled={loading !== null}
        className={`rounded-md px-2 py-1 text-xs ring-1 transition
          ${
            status === "rejected"
              ? "bg-red-500/20 text-red-200 ring-red-400/30"
              : "bg-white/5 text-white/70 ring-white/10 hover:bg-red-500/10"
          } disabled:opacity-50`}
      >
        {loading === "rejected" ? "…" : "Reject"}
      </button>

      {status !== "pending" && (
        <span className="ml-2 text-[11px] text-white/40">
          {reviewedBy ? `by ${reviewedBy}` : ""}
          {reviewedAt ? ` · ${new Date(reviewedAt).toLocaleString("en-CH")}` : ""}
        </span>
      )}
    </div>
  );
}