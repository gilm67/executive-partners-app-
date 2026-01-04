"use client";

import * as React from "react";
import { useActiveToc } from "./useActiveToc.client";

type Item = { id: string; title: string; level: 2 | 3 };

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

/**
 * Scroll to an element with a controlled top offset (premium feel).
 * This avoids the "scrollIntoView hides title under sticky header" issue.
 */
function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const reduce = prefersReducedMotion();

  // Adjust this if your header height changes (px)
  const OFFSET = 96; // ~ top-24 / scroll-mt-24 equivalent

  const top = el.getBoundingClientRect().top + window.scrollY - OFFSET;

  window.scrollTo({
    top,
    behavior: reduce ? "auto" : "smooth",
  });

  // Update URL hash without a jump
  history.replaceState(null, "", `#${id}`);
}

export default function TocDesktop({ toc }: { toc: Item[] }) {
  const ids = React.useMemo(() => toc.map((t) => t.id), [toc]);
  const activeId = useActiveToc(ids);

  const onClick = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      scrollToId(id);
    },
    []
  );

  if (!toc?.length) return null;

  return (
    <div className="sticky top-24 rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_60px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-wider text-white/60">
          On this page
        </div>
        <div className="h-px w-10 bg-[#d4af37]/60" />
      </div>

      <nav className="mt-4 space-y-1">
        {toc.map((item) => {
          const isActive = item.id === activeId;

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => onClick(e, item.id)}
              aria-current={isActive ? "location" : undefined}
              className={[
                "group relative block rounded-lg px-3 py-2 text-sm transition",
                "outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/40 focus-visible:ring-offset-0",
                item.level === 3 ? "ml-2" : "",
                isActive
                  ? "bg-white/[0.08] text-white"
                  : "text-white/70 hover:text-white hover:bg-white/[0.06]",
              ].join(" ")}
            >
              {/* Active left rail (premium) */}
              <span
                className={[
                  "absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[2px] rounded-full transition",
                  isActive ? "bg-[#d4af37]" : "bg-transparent",
                ].join(" ")}
              />

              <span
                className={[
                  "mr-2 inline-block transition",
                  isActive
                    ? "text-[#d4af37]"
                    : "text-[#d4af37]/70 group-hover:text-[#d4af37]/90",
                ].join(" ")}
              >
                •
              </span>

              <span className="inline-block leading-snug">{item.title}</span>
            </a>
          );
        })}
      </nav>

      <div className="mt-6 h-px w-full bg-white/10" />
      <div className="mt-4 text-xs text-white/50">
        Tip: Share deep links to sections using the TOC anchors.
      </div>
    </div>
  );
}