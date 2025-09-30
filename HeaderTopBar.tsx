"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HeaderTopBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 z-50 w-full transition-colors duration-300
        ${scrolled
          ? "bg-white shadow-md text-neutral-900"
          : "lg:bg-white lg:shadow-md lg:text-neutral-900 bg-transparent text-white"}
      `}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="text-sm font-bold tracking-wide sm:text-base lg:text-lg"
        >
          EXECUTIVE PARTNERS
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-4 text-xs font-medium sm:text-sm">
          <Link href="/jobs" className="hover:underline">
            Jobs
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}