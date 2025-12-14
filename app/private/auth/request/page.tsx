"use client";

import { useState } from "react";

export default function RequestLinkPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(false);

    await fetch("/api/magic-link/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setSent(true);
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-20">
      <h1 className="text-2xl font-semibold">Request access link</h1>
      <p className="mt-4 text-white/80">
        Enter your email to receive a time-limited secure link. If your access is approved, you will receive instructions.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@domain.com"
          className="w-full rounded-md bg-white/5 px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-white/30"
        />
        <button className="w-full rounded-md bg-white/10 px-4 py-3 font-medium hover:bg-white/15">
          Send secure link
        </button>
      </form>

      {sent && (
        <p className="mt-6 text-white/70">
          If this email is eligible, a secure link has been sent. Please check your inbox.
        </p>
      )}
    </div>
  );
}