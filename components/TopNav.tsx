// components/TopNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/jobs", label: "Jobs" },
    { href: "/candidates", label: "Candidates" },
    { href: "/hiring-managers", label: "Hiring Managers" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-neutral-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Logo / Home link */}
        <Link href="/" className="font-semibold text-lg tracking-tight text-neutral-900">
          Executive Partners
        </Link>

        {/* Navigation links */}
        <div className="flex items-center gap-5 text-sm">
          {navItems.map(({ href, label }) => {
            const isActive =
              href === "/"
                ? pathname === href
                : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={`transition-colors hover:text-blue-600 ${
                  isActive ? "font-semibold underline underline-offset-4 text-blue-700" : "text-neutral-700"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}