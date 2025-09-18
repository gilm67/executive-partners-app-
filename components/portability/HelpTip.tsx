"use client";

import {useEffect, useRef, useState} from "react";

export default function HelpTip({
  content,
  side = "top",
}: {
  content: string;
  side?: "top" | "bottom" | "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      const t = e.target as Node;
      if (btnRef.current?.contains(t) || popRef.current?.contains(t)) return;
      setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pos =
    side === "bottom"
      ? "left-1/2 -translate-x-1/2 top-[calc(100%+8px)]"
      : side === "left"
      ? "right-[calc(100%+8px)] top-1/2 -translate-y-1/2"
      : side === "right"
      ? "left-[calc(100%+8px)] top-1/2 -translate-y-1/2"
      : "left-1/2 -translate-x-1/2 bottom-[calc(100%+8px)]";

  return (
    <span className="relative inline-flex">
      <button
        ref={btnRef}
        type="button"
        className="help-dot-ep"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Help"
        onClick={() => setOpen((o) => !o)}
      >
        i
      </button>
      {open && (
        <div ref={popRef} role="tooltip" className={`popover-ep ${pos}`}>
          <div className="max-w-xs text-xs leading-relaxed text-neutral-200">{content}</div>
        </div>
      )}
    </span>
  );
}
