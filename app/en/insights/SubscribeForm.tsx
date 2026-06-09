"use client";
import { useState } from "react";

function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setStatus(data.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="mt-7 text-sm font-semibold text-emerald-400">
        ✓ You are subscribed. Welcome to Private Wealth Pulse.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mx-auto">
      <input
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="w-full sm:flex-1 rounded-xl border border-white/15 bg-white/8 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-white/10 transition"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-black hover:opacity-90 transition whitespace-nowrap disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Subscribe free"}
      </button>
      {status === "error" && <p className="w-full text-xs text-red-400 mt-1">Something went wrong. Please try again.</p>}
    </form>
  );
}

