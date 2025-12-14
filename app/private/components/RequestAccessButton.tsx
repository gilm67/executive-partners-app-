"use client";

import { useState } from "react";

export default function RequestAccessButton({
  profileId,
}: {
  profileId: string;
}) {
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onClick() {
    if (!profileId) {
      setErrorMsg("Missing profile id.");
      setState("error");
      return;
    }

    try {
      setErrorMsg(null);
      setState("loading");

      const res = await fetch("/api/private/access-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // message is optional; safe to include
        body: JSON.stringify({
          profile_id: profileId,
          message: "Interested in this profile. Please share details discreetly.",
        }),
      });

      if (!res.ok) {
        let msg = "Request failed";
        try {
          const data = await res.json();
          msg = data?.error || data?.message || msg;
        } catch {
          // ignore
        }
        throw new Error(msg);
      }

      setState("ok");
    } catch (e: any) {
      setErrorMsg(e?.message || "Request failed");
      setState("error");
    }
  }

  return (
    <div className="mt-4">
      <button
        onClick={onClick}
        disabled={state === "loading" || state === "ok"}
        className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black disabled:opacity-60"
      >
        {state === "idle" && "Request access"}
        {state === "loading" && "Sending…"}
        {state === "ok" && "Request sent ✓"}
        {state === "error" && "Try again"}
      </button>

      {state === "ok" && (
        <p className="mt-2 text-xs text-white/70">
          We’ve received your request. We’ll confirm discreetly by email.
        </p>
      )}

      {state === "error" && errorMsg && (
        <p className="mt-2 text-xs text-red-400">{errorMsg}</p>
      )}
    </div>
  );
}