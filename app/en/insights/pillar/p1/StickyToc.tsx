"use client";

import { useEffect, useMemo, useState } from "react";

type TocItem = { id: string; label: string };

export default function StickyToc({
  items,
  className = "",
}: {
  items: TocItem[];
  className?: string;
}) {
  const ids = useMemo(() => items.map((i) => i.id), [items]);
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "");

  useEffect(() => {
    if (!ids.length) return;

    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    // Choose the section that is currently "most" in view around the top
    const observer = new IntersectionObserver(
      (entries) => {
        // keep only visible
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;

        // pick the one closest to the top (smallest top value)
        visible.sort((a, b) => {
          const at = a.boundingClientRect.top;
          const bt = b.boundingClientRect.top;
          return Math.abs(at) - Math.abs(bt);
        });

        const best = visible[0]?.target?.id;
        if (best) setActiveId(best);
      },
      {
        // tweak if your header height differs
        root: null,
        rootMargin: "-120px 0px -70% 0px",
        threshold: [0.1, 0.2, 0.4],
      }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return (
    <nav className={className} aria-label="Table of contents">
      <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
        Table of contents
      </div>

      <div className="mt-4 flex flex-col gap-1.5">
        {items.map((it) => {
          const isActive = it.id === activeId;
          return (
            <a
              key={it.id}
              href={`#${it.id}`}
              className={[
                "rounded-lg px-2 py-1.5 text-sm transition",
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white",
              ].join(" ")}
              aria-current={isActive ? "location" : undefined}
            >
              {it.label}
            </a>
          );
        })}
      </div>

      <div className="mt-5 border-t border-white/10 pt-4">
        <a
          href="#chapters"
          className="text-sm font-semibold text-white/70 hover:text-white underline underline-offset-4"
        >
          Back to top →
        </a>
      </div>
    </nav>
  );
}