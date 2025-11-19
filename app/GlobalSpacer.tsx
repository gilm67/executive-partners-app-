"use client";

import { usePathname } from "next/navigation";

export function GlobalSpacer() {
  const pathname = usePathname();

  // Hide spacer on home hero pages only
  const hideOnHome = pathname === "/" || pathname === "/en";

  if (hideOnHome) return null;

  return (
    <div
      id="global-spacer"
      aria-hidden
      className="h-4 md:h-5"
    />
  );
}