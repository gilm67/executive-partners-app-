"use client";

import { useState } from "react";

type RevealEmailProps = {
  email: string;
};

export default function RevealEmail({ email }: RevealEmailProps) {
  const [visible, setVisible] = useState(false);

  if (visible) {
    return (
      <a
        href={`mailto:${email}`}
        className="font-mono text-[0.9rem] text-[#F5D778] underline-offset-2 hover:underline"
      >
        {email}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setVisible(true)}
      className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-200 hover:bg-white/10"
    >
      Click to reveal email
    </button>
  );
}