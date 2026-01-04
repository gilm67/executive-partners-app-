"use client";

import * as React from "react";

/**
 * Returns reading progress (0..1) within a container element.
 * If containerId is not found, it falls back to whole page scroll.
 *
 * Notes:
 * - Uses document coordinates (offsetTop/offsetHeight) for stable math.
 * - Progress starts when the container top hits the top of viewport,
 *   and ends when the container bottom hits the bottom of viewport.
 */
export function useScrollProgress(containerId?: string) {
  const [p, setP] = React.useState(0);

  React.useEffect(() => {
    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

    const getPageProgress = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const scrollHeight = doc.scrollHeight || 1;
      const clientHeight = doc.clientHeight || 1;
      const denom = Math.max(1, scrollHeight - clientHeight);
      return clamp01(scrollTop / denom);
    };

    const getContainerProgress = (el: HTMLElement) => {
      const doc = document.documentElement;

      // Document scroll position
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const viewportH = window.innerHeight || doc.clientHeight || 1;

      // Container position in document coordinates
      const top = el.offsetTop;
      const height = el.offsetHeight || 1;
      const bottom = top + height;

      // Start when container top reaches viewport top
      const start = top;
      // End when container bottom reaches viewport bottom
      const end = bottom - viewportH;

      // If container fully fits and we're past it, return 1
      if (scrollTop >= end) return 1;
      if (scrollTop <= start) return 0;

      const denom = Math.max(1, end - start);
      return clamp01((scrollTop - start) / denom);
    };

    const get = () => {
      const el = containerId ? document.getElementById(containerId) : null;
      if (!el) return getPageProgress();
      return getContainerProgress(el as HTMLElement);
    };

    let raf = 0;
    const onScroll = () => {
      if (reduce) {
        setP(get());
        return;
      }
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setP(get()));
    };

    setP(get());
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [containerId]);

  return p;
}