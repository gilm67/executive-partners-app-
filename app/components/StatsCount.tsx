"use client";

import { useEffect, useRef, useState } from "react";

/* Observe once when the section enters the viewport */
function useInViewOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

function CountUp({
  to,
  inView,
  suffix = "",
  duration = 1200,
}: {
  to: number;
  inView: boolean;
  suffix?: string;
  duration?: number;
}) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    let raf = 0;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setVal(to);
      return;
    }

    const tick = (ts: number) => {
      if (start == null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.round(p * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span className="tabular-nums">
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsCount() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <section
      ref={ref}
      className="mt-14 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur"
      aria-label="Executive Partners authority metrics"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {/* 200+ placements */}
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
          <div className="text-sm text-white/70">Placements</div>
          <div className="mt-1 text-4xl font-extrabold tracking-tight">
            <CountUp to={200} inView={inView} suffix="+" />
          </div>
          <p className="mt-1 text-sm text-white/70">
            Senior RMs &amp; Private Bankers placed worldwide
          </p>
        </div>

        {/* 92% retention */}
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
          <div className="text-sm text-white/70">12-month Retention</div>
          <div className="mt-1 text-4xl font-extrabold tracking-tight">
            <CountUp to={92} inView={inView} suffix="%" />
          </div>
          <p className="mt-1 text-sm text-white/70">
            Candidates still in seat after 12 months
          </p>
        </div>

        {/* 8 hubs */}
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
          <div className="text-sm text-white/70">Global Hubs</div>
          <div className="mt-1 text-4xl font-extrabold tracking-tight">
            <CountUp to={8} inView={inView} />
          </div>
          <p className="mt-1 text-sm text-white/70">
            Geneva, Zurich, London, Dubai, Singapore, Hong Kong, New York, Miami
          </p>
        </div>
      </div>
    </section>
  );
}