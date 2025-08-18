"use client";

import { useState, useTransition } from "react";

type Props = {
  email: string;
  timestamp?: string; // optional (server only needs email for now)
  initial?: string;   // "YES" | "NO" | undefined
};

/**
 * One-button optimistic toggle with clear YES/NO styling.
 * YES -> green pill with ✔︎, NO -> gray pill with ✖︎
 */
export default function ShortlistToggle({ email, timestamp, initial }: Props) {
  const startState = (initial || "").toUpperCase() === "YES" ? "YES" : "NO";
  const [val, setVal] = useState<"YES" | "NO">(startState);
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    const next: "YES" | "NO" = val === "YES" ? "NO" : "YES";

    // optimistic update
    setVal(next);

    startTransition(async () => {
      try {
        const res = await fetch("/api/candidates/shortlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // server uses only email right now; timestamp sent for future-proofing
          body: JSON.stringify({ email, timestamp, value: next }),
        });
        if (!res.ok) throw new Error("API error");
      } catch {
        // roll back on error
        setVal(val);
        alert("Failed to update shortlist.");
      }
    });
  };

  const isYes = val === "YES";

  return (
    <button
      onClick={onClick}
      disabled={isPending || !email}
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium transition border
        ${isYes
          ? "bg-green-600 text-white border-green-700 hover:bg-green-700"
          : "bg-neutral-200 text-neutral-800 border-neutral-300 hover:bg-neutral-300"
        } disabled:opacity-60 disabled:cursor-not-allowed`}
      title={isYes ? "Shortlisted (click to unset)" : "Not shortlisted (click to set)"}
      aria-pressed={isYes}
    >
      <span aria-hidden="true">{isPending ? "…" : isYes ? "✔︎" : "✖︎"}</span>
      <span>{isYes ? "Shortlisted" : "Not Shortlisted"}</span>
    </button>
  );
}
