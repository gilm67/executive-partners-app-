// app/components/CardBtn.tsx
import React from "react";

type Tone = "blue" | "green" | "neutral" | "dark";

interface CardBtnProps {
  href: string;
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
}

const TONE_STYLES: Record<Tone, string> = {
  blue: "bg-blue-600 text-white hover:bg-blue-700",
  green: "bg-emerald-600 text-white hover:bg-emerald-700",
  neutral: "bg-neutral-800 text-white hover:bg-neutral-700",
  dark: "bg-neutral-950 text-white border border-neutral-800 hover:bg-neutral-900",
};

export function CardBtn({
  href,
  tone = "neutral",
  children,
  className,
}: CardBtnProps) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition ${TONE_STYLES[tone]} ${
        className ?? ""
      }`}
    >
      {children}
    </a>
  );
}