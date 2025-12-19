"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * Allow ONLY internal redirects.
 * Supported:
 *  - /private...
 *  - /en/portability...
 *  - /en/bp-simulator...
 *  - /en...
 *
 * Default:
 *  - /en/portability (prevents accidental landing on /private)
 */
function safeNext(nextRaw: string | null): string {
  const DEFAULT = "/en/portability";

  if (!nextRaw) return DEFAULT;

  let next = nextRaw.trim();
  if (!next) return DEFAULT;

  // must be internal
  if (!next.startsWith("/")) return DEFAULT;
  if (next.startsWith("//")) return DEFAULT;
  if (next.includes("://")) return DEFAULT;

  // normalize common variants
  if (next === "/portability") next = "/en/portability";
  if (next === "/bp-simulator") next = "/en/bp-simulator";

  // normalize trailing slash (keep query/hash intact)
  // e.g. "/en/portability/?x=1" -> "/en/portability?x=1"
  next = next.replace(/\/(\?|#|$)/, "$1");

  // If someone explicitly asks for /private, allow it
  if (next === "/private/") next = "/private";

  // allowed internal areas (prefix match supports querystrings)
  const allowedPrefixes = ["/private", "/en/portability", "/en/bp-simulator", "/en"];

  const allowed = allowedPrefixes.some((p) => next === p || next.startsWith(p));

  return allowed ? next : DEFAULT;
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
          credentials: "include",
        });

        if (!res.ok) throw new Error("verify_failed");
        if (!cancelled) setStatus("ok");

        // 🔑 HARD redirect so cookie is guaranteed
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

  // keep the same target when requesting a new link
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