"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/talent-bench";

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/talent-bench-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push(redirect);
        router.refresh();
      } else {
        setError("Incorrect password. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-brand-bg min-h-screen flex items-center justify-center px-6">
      <div className="max-w-sm w-full">
        <p className="text-xs uppercase tracking-widest text-brand-gold mb-3 text-center">
          Confidential
        </p>
        <h1 className="text-2xl font-semibold text-brand-text mb-2 text-center">
          Talent Bench
        </h1>
        <p className="text-sm text-brand-textMuted mb-8 text-center leading-relaxed">
          This area is restricted to clients of Executive Partners. Please
          enter the access code provided to you.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            required
            placeholder="Access code"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-white/10 rounded-md px-4 py-3 text-sm mb-4 bg-brand-surface text-brand-text placeholder:text-brand-textMuted/60 focus:outline-none focus:ring-1 focus:ring-brand-gold"
          />

          {error && (
            <p className="text-sm text-red-400 mb-4 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full text-sm font-semibold uppercase tracking-wide rounded-md px-4 py-3 bg-brand-gold text-brand-bg disabled:opacity-50 hover:opacity-90 transition-opacity"
          >
            {loading ? "Checking..." : "Enter"}
          </button>
        </form>

        <p className="text-xs text-brand-textMuted mt-8 text-center">
          Don't have an access code? Contact{" "}
          <a
            href="mailto:gil.chalem@execpartners.ch"
            className="text-brand-gold hover:underline"
          >
            gil.chalem@execpartners.ch
          </a>
        </p>
      </div>
    </main>
  );
}

export default function TalentBenchLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
