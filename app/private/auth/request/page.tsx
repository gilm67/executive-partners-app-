"use client";

// app/private/auth/request/page.tsx
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

function safeNext(raw: string | null) {
  if (!raw) return "";
  const next = raw.trim();
  if (!next.startsWith("/")) return "";
  if (next.startsWith("//")) return "";
  if (next.includes("://")) return "";
  if (!next.startsWith("/private")) return "";
  return next;
}

export default function PrivateAuthRequestPage() {
  const sp = useSearchParams();
  const next = useMemo(() => safeNext(sp.get("next")), [sp]);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  return (
    <main className="mx-auto max-w-xl px-6 py-16 text-white">
      <h1 className="text-2xl font-semibold">Request secure access</h1>
      <p className="mt-2 text-white/70">
        Enter your email. We will send a single-use link (valid 20 minutes).
      </p>

      <form
        className="mt-6 space-y-3"
        onSubmit={async (e) => {
          e.preventDefault();
          setStatus("sending");

          try {
            await fetch("/api/magic-link/request", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, next: next || null }),
            });
          } finally {
            setStatus("sent");
          }
        }}
      >
        <input
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@domain.com"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none"
        />

        <button
          disabled={status === "sending"}
          className="w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send secure link"}
        </button>

        {status === "sent" && (
          <p className="text-sm text-white/70">
            If this email is allowed, a secure link has been sent.
          </p>
        )}
      </form>
    </main>
  );
}