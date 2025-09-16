"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";

/**
 * Timeline (seconds):
 * - Fade in + slight de-scale: 1.2s
 * - Hold fully visible with gentle zoom-in: 3s
 * - Fade out overlay: 2s
 * Total ≈ 6.2s
 */
const FADE_IN = 1.2;
const HOLD = 3.0;
const FADE_OUT = 2.0;

export default function Splash() {
  const pathname = usePathname();
  // Show splash only on the homepage
  if (pathname !== "/") return null;

  const [done, setDone] = useState(false);
  const overlay = useAnimation();
  const image = useAnimation();

  // Lock scroll while splash is active
  useEffect(() => {
    if (!done) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [done]);

  // Respect user's reduced-motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReducedMotion) {
      // Skip animation entirely for reduced motion
      setDone(true);
      return;
    }

    let t: ReturnType<typeof setTimeout>;
    (async () => {
      // 1) Fade/scale in
      await image.start({
        opacity: 1,
        scale: 1,
        transition: { duration: FADE_IN, ease: [0.22, 1, 0.36, 1] },
      });

      // 2) Gentle zoom-in during hold
      image.start({
        scale: 1.04,
        transition: { duration: HOLD, ease: "linear" },
      });

      // 3) Fade out overlay (reveal page)
      t = setTimeout(async () => {
        await overlay.start({
          opacity: 0,
          transition: { duration: FADE_OUT, ease: [0.22, 1, 0.36, 1] },
        });
        setDone(true);
      }, HOLD * 1000);
    })();

    return () => clearTimeout(t);
  }, [overlay, image, prefersReducedMotion]);

  if (done) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={overlay}
      className="fixed inset-0 z-50 bg-black"
      aria-hidden
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.06 }}
        animate={image}
        className="relative h-full w-full"
        style={{ overflow: "hidden" }}
      >
        <Image
          src="/imageep2.png"
          alt="Executive Partners Splash"
          fill
          priority
          className="object-contain object-center"
          sizes="100vw"
        />
      </motion.div>
    </motion.div>
  );
}