"use client";

import React, { useState } from "react";

export default function MandateAlertForm() {
  const [email, setEmail] = useState("");
  const [market, setMarket] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/mandate-alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, market: market || "Any market" }),
      });
      const data = await res.json();
      setStatus(data.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-sm font-semibold text-emerald-400 text-center py-2">
        ✓ You're on the list. We'll email you when a matching mandate goes live.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-2 w-full max-w-xl mx-auto">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-brandGold/50 transition"
      />
      <input
        type="text"
        value={market}
        onChange={(e) => setMarket(e.target.value)}
        placeholder="Market (optional)"
        className="sm:w-44 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-brandGold/50 transition"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-xl bg-brandGold px-5 py-2.5 text-sm font-semibold text-black hover:opacity-90 transition disabled:opacity-60 whitespace-nowrap"
      >
        {status === "loading" ? "Sending…" : "Notify me"}
      </button>
    </form>
  );
}
