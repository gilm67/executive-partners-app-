"use client";

import Link from "next/link";

const navItems = [
  { name: "Jobs", href: "/jobs" },
  { name: "Candidates", href: "/candidates" },
  { name: "Hiring Managers", href: "/hiring-managers" },
  { name: "BP Simulator", href: "/bp-simulator" },
  { name: "Markets", href: "/markets" },
  { name: "Portability", href: "/portability" },
  { name: "Insights", href: "/insights" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-transparent">
      <Link href="/" className="text-lg font-bold tracking-tight">
        Executive Partners
      </Link>
      <nav className="hidden md:flex items-center gap-6 text-sm">
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