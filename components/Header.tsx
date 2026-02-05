"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function Header() {
  const pathname = usePathname();

  const base = useMemo(() => {
    if (!pathname) return "";
    return pathname.startsWith("/en") ? "/en" : "";
  }, [pathname]);

  const navItems = useMemo(
    () => [
      { name: "Jobs", href: `${base}/jobs` },
      { name: "Candidates", href: `${base}/candidates` },
      { name: "Hiring Managers", href: `${base}/hiring-managers` },
      { name: "Markets", href: `${base}/markets` },
      { name: "Insights", href: `${base}/insights` },
      { name: "About", href: `${base}/about` },
      { name: "Contact", href: `${base}/contact` },
      { name: "Free Tools ⭐", href: `${base}/portability` }, // Direct link to Portability
    ],
    [base]
  );

  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-transparent">
      <Link href={base || "/"} className="text-lg font-bold tracking-tight text-white">
        Executive Partners
      </Link>

      <nav className="hidden md:flex items-center gap-6 text-sm text-white">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="hover:text-blue-300 transition"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}