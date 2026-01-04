"use client";

import * as React from "react";

export function useActiveToc(
  ids: string[],
  rootMargin = "-25% 0px -65% 0px"
) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  // Stable key so the effect doesn't thrash on new array instances
  const idsKey = React.useMemo(() => ids.filter(Boolean).join("|"), [ids]);

  React.useEffect(() => {
    // SSR / non-browser safety
    if (typeof window === "undefined") return;
    if (!idsKey) return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    // Set initial active section (prevents empty highlight on refresh mid-article)
    const getInitial = () => {
      const y = window.scrollY;
      const candidates = elements
        .map((el) => ({ id: el.id, top: el.getBoundingClientRect().top }))
        // headings above the top zone are "already passed"
        .filter((x) => x.top <= window.innerHeight * 0.35)
        .sort((a, b) => b.top - a.top);
      return candidates[0]?.id ?? elements[0].id;
    };

    setActiveId((prev) => prev ?? getInitial());

    let raf = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        // pick the most visible intersecting heading; throttle updates to avoid flicker
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort(
              (a, b) =>
                (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
            );

          const next = (visible[0]?.target as HTMLElement | undefined)?.id;
          if (!next) return;

          setActiveId((prev) => (prev === next ? prev : next));
        });
      },
      { root: null, threshold: [0.1, 0.2, 0.35, 0.5], rootMargin }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [idsKey, rootMargin]); // idsKey is stable; avoids re-observe loops

  return activeId;
}