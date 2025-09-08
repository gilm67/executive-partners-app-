// app/components/CardBtn.tsx
import React from "react";
import Link from "next/link";

type Tone = "blue" | "green" | "neutral" | "dark";

interface CardBtnProps {
  href: string;
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
  /** force a real <a> (useful for file downloads) */
  external?: boolean;
}

const TONE_STYLES: Record<Tone, string> = {
  // Rich, branded tones used across landing + jobs
  blue:
    "bg-[#1D4ED8] hover:bg-[#1E40AF] text-white shadow-[0_8px_30px_rgba(29,78,216,.35)]",
  green:
    "bg-emerald-600 hover:bg-emerald-700 text-white shadow-[0_8px_30px_rgba(16,185,129,.30)]",
  // Neutral = subtle outline/ghost (matches cards)
  neutral: "border border-white/15 bg-white/5 hover:bg-white/10 text-white",
  // Dark = compact, high-contrast chip
  dark: "bg-neutral-950 text-white border border-neutral-800 hover:bg-neutral-900",
};

/**
 * CardBtn — consistent CTA used in hero + feature cards + job cards.
 * - Internal links: Next.js <Link> for fast client nav
 * - External links: real <a> with target/rel
 * - Consistent height so button rows align across cards
 */
export function CardBtn({
  href,
  tone = "neutral",
  children,
  className,
  external,
}: CardBtnProps) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition " +
    "min-h-[40px]"; // ensures equal button height

  const cls = `${base} ${TONE_STYLES[tone]} ${className ?? ""}`;

  const isExternal = external ?? /^https?:\/\//i.test(href);

  if (isExternal) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}