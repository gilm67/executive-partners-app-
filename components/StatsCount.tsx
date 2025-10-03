// components/StatsCount.tsx
"use client";

import { useEffect, useRef, useState } from "react";

function useInViewOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setInView(true), io.disconnect()),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

function CountUp({ to, inView, suffix = "" }: { to: number; inView: boolean; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const duration = 1200;
    const raf = (ts: number) => {
      if (start == null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * to));
      if (p < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span className="text-4xl font-semibold">
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsCount() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const items = [
    { label: "Senior placements", value: 200, suffix: "+" },
    { label: "12-month retention", value: 92, suffix: "%" },
    { label: "Global hubs", value: 8, suffix: "" },
  ];
  return (
    <section ref={ref} className="mt-12 grid gap-4 sm:grid-cols-3">
      {items.map((s) => (
        <div key={s.label} className="card">
          <div><CountUp to={s.value} inView={inView} suffix={s.suffix} /></div>
          <div className="mt-2 text-white/70">{s.label}</div>
        </div>
      ))}
    </section>
  );
}