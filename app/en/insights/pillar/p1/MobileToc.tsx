"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { TocItem } from "./StickyToc";

export default function MobileToc({ items }: { items: readonly TocItem[] }) {
  const ids = useMemo(() => items.map((i) => i.id), [items]);
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "");

  const containerRef = useRef<HTMLDivElement | null>(null);
  const chipRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    if (!ids.length) return;

    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;

        visible.sort((a, b) => {
          const at = a.boundingClientRect.top;
          const bt = b.boundingClientRect.top;
          return Math.abs(at) - Math.abs(bt);
        });

        const best = visible[0]?.target?.id;
        if (best) setActiveId(best);
      },
      {
        root: null,
        rootMargin: "-120px 0px -70% 0px",
        threshold: [0.1, 0.2, 0.4],
      }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  // ✅ Auto-center active chip in the scroll container
  useEffect(() => {
    const container = containerRef.current;
    const chip = chipRefs.current[activeId];
    if (!container || !chip) return;

    const containerRect = container.getBoundingClientRect();
    const chipRect = chip.getBoundingClientRect();

    const currentLeft = container.scrollLeft;
    const chipCenter = chipRect.left + chipRect.width / 2;
    const containerCenter = containerRect.left + containerRect.width / 2;

    const delta = chipCenter - containerCenter;
    const nextLeft = currentLeft + delta;

    container.scrollTo({ left: nextLeft, behavior: "smooth" });
  }, [activeId]);

  return (
    <div className="sticky top-0 z-40 -mx-4 border-b border-white/10 bg-[#05070A]/80 px-4 py-3 backdrop-blur">
      <div
        ref={containerRef}
        className="flex items-center gap-2 overflow-x-auto scrollbar-hide"
      >
        {items.map((it) => {
          const isActive = it.id === activeId;

          return (
            <a
              key={it.id}
              ref={(el) => {
                chipRefs.current[it.id] = el;
              }}
              href={`#${it.id}`}
              className={[
                "shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                isActive
                  ? "border-white/25 bg-white/10 text-white"
                  : "border-white/15 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white",
              ].join(" ")}
              aria-current={isActive ? "location" : undefined}
            >
              {it.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}