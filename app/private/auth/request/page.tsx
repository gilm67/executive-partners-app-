"use client";

// app/private/auth/request/page.tsx
import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

/**
 * ✅ Accept only INTERNAL safe paths that we intentionally allow.
 * We now allow your public gated tools too.
 */
function safeNext(raw: string | null) {
  if (!raw) return "";
  let next = raw.trim();
  if (!next) return "";
  if (!next.startsWith("/")) return "";
  if (next.startsWith("//")) return "";
  if (next.includes("://")) return "";

  // strip query/hash (defensive)
  next = next.split("#")[0].split("?")[0];

  // allow-list (tight)
  const ALLOWED = ["/en/portability", "/en/bp-simulator", "/private"];
  const ok = ALLOWED.includes(next) || next.startsWith("/private/");
  if (!ok) return "";

  return next;
}

export default function PrivateAuthRequestPage() {
  const sp = useSearchParams();
  const router = useRouter();

  const next = useMemo(() => safeNext(sp.get("next")), [sp]);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const [error, setError] = useState<string | null>(null);

  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white body-grain">
      {/* background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 360px at 15% -10%, rgba(201,161,74,.20) 0%, rgba(201,161,74,0) 55%), radial-gradient(900px 360px at 110% 0%, rgba(245,231,192,.18) 0%, rgba(245,231,192,0) 60%)",
        }}
      />

      <div className="relative mx-auto max-w-xl px-6 py-14">
        <p className="inline-flex items-center gap-2 rounded-full bg-brandGold/10 px-4 py-1 text-xs font-semibold text-brandGoldPale ring-1 ring-brandGold/40">
          Executive Partners · Secure Access
        </p>

        <h1 className="mt-4 text-3xl font-bold md:text-4xl">
          Request secure access
        </h1>

        <p className="mt-3 text-sm text-white/75 md:text-base">
          Enter your email to receive a single-use link (valid for 20 minutes).
        </p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-6 md:p-8">
          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              setError(null);
              setStatus("sending");

              try {
                await fetch("/api/magic-link/request", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email, next: next || null }),
                });
              } catch (err: any) {
                // We still redirect for anti-enumeration, but we keep a fallback error just in case
                setError(err?.message || "Something went wrong. Please try again.");
              } finally {
                setStatus("idle");
                router.push("/private/auth/request/sent");
              }
            }}
          >
            <label className="block text-xs font-semibold text-white/70">
              Email
            </label>

            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/35 focus:border-brandGold/50 focus:ring-2 focus:ring-brandGold/20"
            />

            <button
              disabled={status === "sending"}
              className="w-full rounded-xl bg-brandGold px-4 py-3 text-sm font-semibold text-black hover:bg-brandGold/90 disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send secure link"}
            </button>

            {error && (
              <p className="text-xs text-red-300">
                {error}
              </p>
            )}

            <p className="text-xs text-white/55">
              For security, we don’t confirm whether an email exists in our system.
            </p>
          </form>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href={next || "/en/portability"}
            className="inline-flex justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white/80 hover:bg-white/5"
          >
            Back
          </Link>

          <Link
            href="/en/portability/request-access"
            className="inline-flex justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white/80 hover:bg-white/5"
          >
            Request access (manual)
          </Link>
        </div>
      </div>
    </main>
  );
}