"use client";

import Link from "next/link";
import { MANDATES } from "@/app/en/jobs/mandates-data";

function timeAgo(dateStr: string): string {
  const listed = new Date(dateStr).getTime();
  const now = Date.now();
  const days = Math.max(0, Math.floor((now - listed) / (1000 * 60 * 60 * 24)));

  if (days === 0) return "Listed today";
  if (days === 1) return "Listed 1 day ago";
  if (days < 30) return `Listed ${days} days ago`;

  const months = Math.floor(days / 30);
  if (months === 1) return "Listed 1 month ago";
  return `Listed ${months} months ago`;
}

export default function MandateRadar() {
  const items = MANDATES as unknown as {
    id: string;
    listedDate: string;
    tag: string;
    title: string;
    subtitle: string;
    location: string;
    flag: string;
  }[];

  if (!items || items.length === 0) return null;

  const loop = [...items, ...items];

  return (
    <div className="border-b border-white/8 bg-[#0b0f1a] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-2.5 flex items-center gap-3">
        <span className="hidden sm:inline-flex items-center gap-1.5 shrink-0 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#D4AF37]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
          </span>
          Mandate Radar
        </span>

        <div className="relative flex-1 overflow-hidden">
          <div className="flex w-max animate-[mandate-scroll_140s_linear_infinite] gap-8 hover:[animation-play-state:paused]">
            {loop.map((m, i) => (
              <Link
                key={`${m.id}-${i}`}
                href={`/en/jobs/${m.id}`}
                className="flex items-center gap-2 text-xs text-white/55 hover:text-white transition-colors whitespace-nowrap"
              >
                <span className="text-base">{m.flag}</span>
                <span className="font-medium text-white/80">{m.title}</span>
                <span className="text-white/35">·</span>
                <span>{m.tag}</span>
                <span className="text-white/35">·</span>
                <span>{m.location}</span>
                <span className="text-white/35">·</span>
                <span className="text-[#D4AF37]/70">{timeAgo(m.listedDate)}</span>
              </Link>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#0b0f1a] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#0b0f1a] to-transparent" />
        </div>
      </div>

      <style jsx>{`
        @keyframes mandate-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
