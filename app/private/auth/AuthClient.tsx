"use client";

import { useEffect, useMemo, useState } from "react";

function safeNext(nextRaw: string | null): string {
  // ✅ Only allow internal /private paths (prevents open-redirects)
  if (!nextRaw) return "/private";

  const next = nextRaw.trim();
  if (!next) return "/private";
  if (!next.startsWith("/")) return "/private";
  if (next.startsWith("//")) return "/private";
  if (next.includes("://")) return "/private"; // blocks http/https/etc.
  if (!next.startsWith("/private")) return "/private"; // keep it inside private area

  return next;
}

export default function AuthClient({
  token,
  next,
}: {
  token: string | null;
  next: string | null;
}) {
  const [status, setStatus] = useState<"checking" | "ok" | "fail">("checking");
  const target = useMemo(() => safeNext(next), [next]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!token) {
        if (!cancelled) setStatus("fail");
        return;
      }

      try {
        const res = await fetch("/api/magic-link/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        if (!res.ok) throw new Error("verify_failed");
        if (!cancelled) setStatus("ok");

        // ✅ Hard navigation so the cookie is definitely present on the next request
        window.location.assign(target);
      } catch {
        if (!cancelled) setStatus("fail");
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [token, target]);

  const requestHref = `/private/auth/request?next=${encodeURIComponent(target)}`;

  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-2xl font-semibold">Private Access</h1>

      {status === "checking" && (
        <p className="mt-3 text-white/70">Verifying your secure link…</p>
      )}

      {status === "ok" && (
        <p className="mt-3 text-white/70">Access confirmed. Redirecting…</p>
      )}

      {status === "fail" && (
        <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-5">
          <p className="text-white/80">
            This link is invalid or expired. Please request a new one.
          </p>
          <a
            className="mt-4 inline-block rounded-lg bg-white px-4 py-2 text-sm font-medium text-black"
            href={requestHref}
          >
            Request a new link
          </a>
        </div>
      )}
    </main>
  );
}