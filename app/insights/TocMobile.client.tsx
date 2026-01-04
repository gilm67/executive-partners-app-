"use client";

import * as React from "react";
import { useActiveToc } from "./useActiveToc.client";

type Item = { id: string; title: string; level: 2 | 3 };

export default function TocMobile({ toc }: { toc: Item[] }) {
  const [open, setOpen] = React.useState(false);
  const ids = React.useMemo(() => toc.map((t) => t.id), [toc]);
  const activeId = useActiveToc(ids);

  if (!toc?.length) return null;

  return (
    <div className="lg:hidden mb-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left shadow-[0_0_40px_rgba(0,0,0,0.25)]"
        aria-expanded={open}
      >
        <div className="flex items-center justify-between">
          <div className="text-xs uppercase tracking-wider text-white/60">
            On this page
          </div>
          <div className="flex items-center gap-3">
            <div className="h-px w-10 bg-[#d4af37]/60" />
            <span className="text-sm text-white/80">{open ? "−" : "+"}</span>
          </div>
        </div>
        <div className="mt-1 text-sm text-white/70">
          Tap to {open ? "hide" : "view"} sections
        </div>
      </button>

      {open ? (
        <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 shadow-[0_0_40px_rgba(0,0,0,0.18)]">
          <nav className="space-y-1">
            {toc.map((item) => {
              const isActive = item.id === activeId;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={[
                    "block rounded-lg px-3 py-2 text-sm transition",
                    item.level === 3 ? "ml-3" : "",
                    isActive
                      ? "bg-white/[0.08] text-white"
                      : "text-white/70 hover:text-white hover:bg-white/[0.06]",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "mr-2",
                      isActive ? "text-[#d4af37]" : "text-[#d4af37]/70",
                    ].join(" ")}
                  >
                    •
                  </span>
                  {item.title}
                </a>
              );
            })}
          </nav>
        </div>
      ) : null}
    </div>
  );
}