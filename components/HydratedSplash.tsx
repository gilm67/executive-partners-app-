"use client";

import { useEffect, useState } from "react";
import Splash from "@/components/Splash";

/**
 * Shows Splash once, then unmounts after ~1.6s (fail-safe),
 * so it can never block the page.
 */
export default function HydratedSplash() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Fail-safe hide: even if Splash’s own animation fails,
    // we remove the overlay so the page is usable.
    const timeout = window.setTimeout(() => setVisible(false), 1600);
    return () => clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        pointerEvents: "none",
        background: "#0B0E13",
      }}
    >
      <Splash />
    </div>
  );
}
