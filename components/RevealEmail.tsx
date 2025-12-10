// components/RevealEmail.tsx
"use client";

import { useState } from "react";

type RevealEmailProps = {
  label?: string;
  email: string;
};

export default function RevealEmail({
  label = "Click to reveal email",
  email,
}: RevealEmailProps) {
  const [shown, setShown] = useState(false);

  if (shown) {
    return (
      <button
        type="button"
        className="font-mono text-xs sm:text-sm text-[#F5D778] underline underline-offset-4"
        onClick={() => {
          // copy to clipboard on click
          if (navigator?.clipboard) {
            navigator.clipboard.writeText(email).catch(() => {});
          }
        }}
      >
        {email}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setShown(true)}
      className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs sm:text-[0.8rem] text-neutral-200 hover:bg-white/10"
    >
      {label}
    </button>
  );
}