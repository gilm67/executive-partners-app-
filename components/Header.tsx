'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  
  { label: "Executive Partners", href: "/en" },
  { label: "Markets", href: "/markets" },
  { label: "Jobs", href: "/jobs" },
  { label: "Candidates", href: "/candidates" },
  { label: "Hiring Managers", href: "/hiring-managers" },
  { label: "BP Simulator", href: "/bp-simulator" },
  { label: "Portability", href: "/portability" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export default function Header() {
  const pathname = usePathname() || "/en";
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0B0E13]/80 backdrop-blur">
      <div className="mx-auto max-w-6xl h-14 px-4 flex items-center gap-6 overflow-x-auto">
        {items.map((it) => {
          const active = pathname === it.href || pathname.startsWith(it.href + "/");
          return (
            <Link
              key={it.label}
              href={it.href}
              className={[
                "shrink-0 py-1 text-sm transition",
                active ? "text-white font-semibold underline underline-offset-8" : "text-white/80 hover:text-white"
              ].join(" ")}
            >
              {it.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
