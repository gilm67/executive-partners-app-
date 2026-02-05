"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

interface EmailGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => Promise<void>;
  score: number;
  toolName: string;
}

export default function EmailGateModal({
  isOpen,
  onClose,
  onSubmit,
  score,
  toolName,
}: EmailGateModalProps): JSX.Element | null {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await onSubmit(email);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-white/20 bg-[#0B0F1A] p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-white/60 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 text-center">
          <div className="mb-2 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#F5D778]/10">
            <span className="text-3xl font-bold text-[#F5D778]">
              {score}
            </span>
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-white">
            Your {toolName === "portability" ? "Portability" : "Business Plan"} Score
          </h2>
          <p className="mt-2 text-sm text-white/70">
            Enter your email to see your full results and personalized recommendations
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/90">
              Email address
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-white placeholder-white/40 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
              placeholder="you@example.com"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F5D778] px-6 py-3 font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Processing..." : "See Full Results"}
          </button>

          <p className="text-center text-xs text-white/50">
            100% confidential • No spam • Unsubscribe anytime
          </p>
        </form>
      </div>
    </div>
  );
}