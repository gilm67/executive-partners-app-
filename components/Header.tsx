'use client';
import Link from "next/link";

const NAV: { label: string; href: string }[] = [
  { label: "Executive Partners", href: "/en" },
  { label: "Markets", href: "/markets" },
  { label: "Jobs", href: "/jobs" },
  { label: "Candidates", href: "/candidates" },
  { label: "Hiring Managers", href: "/hiring-managers" },
  { label: "BP Simulator", href: "/bp-simulator" },
  { label: "Portability", href: "/portability" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0E13]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0B0E13]/80">
      <nav className="mx-auto w-full max-w-6xl px-4">
        <ul className="flex flex-wrap items-center justify-center gap-3 py-3">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-md px-3 py-1.5 text-sm font-semibold text-white/90 hover:text-white hover:bg-white/10"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
