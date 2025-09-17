"use client";

import {useState} from "react";
import {usePathname} from "next/navigation";
import {useTranslations} from "next-intl";
import {Link} from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";

type NavItem = {href: string; label: string; external?: boolean};

export default function TopNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navItems: NavItem[] = [
    {href: "/jobs", label: t("jobs")},
    {href: "/insights", label: t("insights")},
    {href: "/candidates", label: t("candidates")},
    {href: "/hiring-managers", label: t("hiringManagers")},
    {href: "/contact", label: t("contact")}
  ];

  return (
    <header className="border-b border-white/10">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8 py-4 gap-4">
        <Link href="/" className="font-bold text-lg">Executive Partners</Link>

        <div className="flex items-center gap-4">
          <button
            className="sm:hidden text-white"
            onClick={() => setOpen(!open)}
            aria-label={t("toggleMenu", {default: "Toggle menu"})}
          >
            ☰
          </button>
          <div className="hidden sm:block">
            <LocaleSwitcher />
          </div>
        </div>
      </nav>

      <div className={`sm:border-t sm:border-white/10`}>
        <ul className={`sm:flex mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 gap-6 text-sm font-medium
            ${open ? "block py-3 space-y-3" : "hidden sm:flex py-3 space-y-0"}`}>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={pathname.startsWith(item.href) ? "text-emerald-400" : "hover:underline"}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="sm:hidden">
            {/* mobile-only locale switcher */}
            <LocaleSwitcher />
          </li>
        </ul>
      </div>
    </header>
  );
}
