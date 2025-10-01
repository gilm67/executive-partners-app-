// components/Skyline.tsx
"use client";

import { useEffect, useRef } from "react";

/**
 * Thin, animated outline skyline with glowing hubs and a subtle particle glow.
 * Sits under the hero as a decorative separator.
 */
export default function Skyline() {
  return (
    <div className="relative mt-10" aria-hidden>
      {/* subtle particle glow (wealth flow) */}
      <Particles />

      <svg
        viewBox="0 0 1200 180"
        className="mx-auto block w-full max-w-6xl opacity-70"
        role="presentation"
      >
        {/* Outline stroke anim */}
        <path
          d="M10,140 L60,140 L80,110 L120,110 L150,90 L190,90 L220,120 L260,120 L300,70 L340,70 L360,95 L390,95 L420,80 L460,80 L500,120 L540,120 L570,90 L610,90 L640,115 L680,115 L720,85 L760,85 L800,120 L840,120 L870,95 L910,95 L940,110 L980,110 L1020,75 L1060,75 L1100,120 L1180,120"
          fill="none"
          stroke="rgba(158,203,255,.65)"  /* ice stroke */
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: 1400, strokeDashoffset: 1400 }}
          className="animate-[dash_2200ms_ease-out_forwards]"
        />

        {/* Geneva + hubs (sapphire/ice only) */}
        <Hub x={500} y={120} label="Geneva" />
        <Hub x={310} y={72}  label="London" />
        <Hub x={118} y={110} label="New York" />
        <Hub x={865} y={96}  label="Dubai" />
        <Hub x={980} y={110} label="Singapore" />
      </svg>

      <style jsx>{`
        @keyframes dash { to { stroke-dashoffset: 0; } }
      `}</style>
    </div>
  );
}

function Hub({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <>
      <circle cx={x} cy={y} r="3" fill="rgba(124,216,255,.95)">
        {/* softer, slower pulse */}
        <animate
          attributeName="r"
          values="2.6;3.6;2.6"
          dur="3.8s"
          repeatCount="indefinite"
        />
      </circle>
      <text x={x + 8} y={y - 2} fontSize="10" fill="rgba(255,255,255,.7)">
        {label}
      </text>
    </>
  );
}

/** Lightweight particle glow (wealth flow) with proper scaling + reduced-motion support */
function Particles() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;

    // Respect reduced-motion
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Lower density on small screens, higher on desktop (but still lightweight)
    const baseCount = Math.max(20, Math.min(48, Math.floor(window.innerWidth / 50)));
    const count = prefersReduced ? Math.floor(baseCount * 0.4) : baseCount;

    const particles = Array.from({ length: count }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: 40 + Math.random() * 110,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.05,
      r: 0.6 + Math.random() * 1.2,
    }));

    const DPR = Math.max(1, window.devicePixelRatio || 1);
    function resize() {
      // set backing store size
      const w = window.innerWidth;
      const h = 180;
      canvas.width = Math.floor(w * DPR);
      canvas.height = Math.floor(h * DPR);
      // set CSS size
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      // reset transform before scaling to avoid compounding
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(DPR, DPR);
    }
    resize();

    function step() {
      // Pause when hidden to save CPU
      // (and when prefers-reduced-motion, we render once then stop)
      if (document.hidden || prefersReduced) {
        drawFrame();
        return; // no RAF requeue when reduced or hidden
      }
      drawFrame();
      raf = requestAnimationFrame(step);
    }

    function drawFrame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // subtle ice glow particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = window.innerWidth;
        if (p.x > window.innerWidth) p.x = 0;
        if (p.y < 20) p.y = 160;
        if (p.y > 160) p.y = 20;

        ctx.globalAlpha = 0.8;
        ctx.fillStyle = "rgba(158,203,255,0.9)"; // ice
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // First paint
    drawFrame();
    // Animate only if not reduced motion
    if (!prefersReduced) raf = requestAnimationFrame(step);

    // Handle resize + visibility
    const onResize = () => resize();
    const onVisibility = () => {
      if (!document.hidden && !prefersReduced) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(step);
      }
    };
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute left-1/2 top-0 z-0 -translate-x-1/2"
      style={{ width: "100%", height: 180 }}
    />
  );
}