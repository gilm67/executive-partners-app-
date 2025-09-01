// app/contact/page.tsx
"use client";

import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });
    if (res.ok) setSent(true);
  }

  return (
    <div className="ep-section">
      <h1 className="ep-title">Contact</h1>
      <p className="ep-subtitle">We reply quickly and confidentially.</p>

      <form onSubmit={onSubmit} className="ep-panel mt-6 space-y-5">
        <div>
          <label className="ep-label">Name</label>
          <input className="ep-input" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="ep-label">Email</label>
          <input
            type="email"
            className="ep-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="ep-label">Message</label>
          <textarea
            className="ep-textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="How can we help?"
          />
        </div>
        <button className="ep-btn-primary" type="submit">
          {sent ? "Sent ✓" : "Send"}
        </button>
      </form>
    </div>
  );
}
