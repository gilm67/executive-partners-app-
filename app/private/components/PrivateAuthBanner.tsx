"use client";

import { usePathname } from "next/navigation";

export default function PrivateAuthBanner() {
  const pathname = usePathname();

  // Hide banner on ALL authentication flow pages
  if (pathname?.startsWith("/private/auth")) {
    return null;
  }

  return (
    <div className="px-4 py-2 text-xs text-white/60">
      Not authenticated.
    </div>
  );
}