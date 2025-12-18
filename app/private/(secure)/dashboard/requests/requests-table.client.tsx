"use client";

import { useState } from "react";
import RequestStatusButtons from "./request-status-buttons";

export type Status = "pending" | "approved" | "rejected";

export type ReqRow = {
  id: string;
  created_at: string;
  profile_id: string;
  requester_email: string;
  requester_org: string | null;
  message: string | null;
  status: Status;
  reviewed_at: string | null;
  reviewed_by: string | null;
};

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("en-CH");
}

function StatusPill({ status }: { status: Status }) {
  const base = "inline-flex items-center rounded-full px-2 py-0.5 text-xs ring-1";

  if (status === "approved") {
    return (
      <span className={`${base} bg-emerald-500/10 text-emerald-200 ring-emerald-400/20`}>
        approved
      </span>
    );
  }

  if (status === "rejected") {
    return (
      <span className={`${base} bg-red-500/10 text-red-200 ring-red-400/20`}>
        rejected
      </span>
    );
  }

  return (
    <span className={`${base} bg-white/5 text-white/80 ring-white/10`}>
      pending
    </span>
  );
}

export default function RequestsTable({ initialRows }: { initialRows: ReqRow[] }) {
  const [rows, setRows] = useState<ReqRow[]>(initialRows);

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-white/5">
          <tr>
            <th className="px-3 py-2 text-left">Created</th>
            <th className="px-3 py-2 text-left">Requester</th>
            <th className="px-3 py-2 text-left">Org</th>
            <th className="px-3 py-2 text-left">Status</th>
            <th className="px-3 py-2 text-left">Reviewed</th>
            <th className="px-3 py-2 text-left">Reviewed by</th>
            <th className="px-3 py-2 text-left">Message</th>
            <th className="px-3 py-2 text-right">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-white/10">
          {rows.map((r) => (
            <tr key={r.id} className="align-top">
              <td className="px-3 py-2 text-white/80 whitespace-nowrap">
                {formatDate(r.created_at)}
              </td>

              <td className="px-3 py-2 whitespace-nowrap">
                {r.requester_email}
                <div className="text-xs text-white/40">Profile: {r.profile_id}</div>
              </td>

              <td className="px-3 py-2">{r.requester_org || "—"}</td>

              <td className="px-3 py-2">
                <StatusPill status={r.status} />
              </td>

              <td className="px-3 py-2 text-white/80 whitespace-nowrap">
                {r.reviewed_at ? formatDate(r.reviewed_at) : "—"}
              </td>

              <td className="px-3 py-2 whitespace-nowrap">{r.reviewed_by || "—"}</td>

              <td className="px-3 py-2 max-w-[520px]">
                <span className="text-white/80 break-words">{r.message || "—"}</span>
              </td>

              <td className="px-3 py-2 text-right whitespace-nowrap">
                <RequestStatusButtons
                  id={r.id}
                  currentStatus={r.status}
                  initialReviewedAt={r.reviewed_at}
                  initialReviewedBy={r.reviewed_by}
                  onUpdated={(payload) => {
                    setRows((prev) =>
                      prev.map((x) =>
                        x.id !== payload.id
                          ? x
                          : {
                              ...x,
                              status: String(payload.status).toLowerCase() as Status,
                              reviewed_at: payload.reviewed_at ?? x.reviewed_at,
                              reviewed_by: payload.reviewed_by ?? x.reviewed_by,
                            }
                      )
                    );
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-3 text-xs text-white/40">
        Buttons call{" "}
        <code className="text-white/60">/api/private/admin/requests/[id]/status</code>
      </p>
    </div>
  );
}