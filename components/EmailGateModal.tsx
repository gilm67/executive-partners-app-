"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface EmailGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => Promise<void> | void;
  score?: number;
  toolName?: string;
}

export default function EmailGateModal({
  isOpen,
  onClose,
  onSubmit,
}: EmailGateModalProps): JSX.Element | null {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setError("Please enter a valid professional email address.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await onSubmit(email);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-[#0B0E13] p-6 ring-1 ring-white/10 shadow-2xl">
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-white/50 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-4">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-white/70 ring-1 ring-white/10">
            Executive Partners · Confidential Tool
          </div>

          <h2 className="text-xl font-semibold text-white">
            Receive your confidential Portability Diagnostic
          </h2>

          <p className="mt-2 text-sm text-white/70">
            This professional diagnostic is used internally to assess client
            transferability across Tier-1 private banks.
            <br />
            <span className="text-white/60">
              Geneva · London · Dubai · Singapore
            </span>
          </p>
        </div>

        {/* Value bullets */}
        <div className="mb-4 space-y-1 text-sm text-white/80">
          <div>• Overall portability score</div>
          <div>• Risk flags & structural constraints</div>
          <div>• Practical recommendations</div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-white/90"
            >
              Professional email
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@privatebank.com"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-rose-500/10 p-3 text-sm text-rose-400">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-white/60 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-[#0B0E13] hover:bg-white/90 disabled:opacity-60"
            >
              {loading ? "Sending…" : "Receive my confidential report"}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-4 text-xs text-white/50">
          No data is stored or shared without explicit consent.
        </div>
      </div>
    </div>
  );
}