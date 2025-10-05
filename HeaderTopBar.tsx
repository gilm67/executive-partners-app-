"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // lightweight icons

export default function HeaderTopBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        ${scrolled || menuOpen
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

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <Link href="/jobs" className="hover:underline">
            Jobs
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex items-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="lg:hidden bg-white text-neutral-900 shadow-md">
          <nav className="flex flex-col space-y-2 px-4 py-4 text-sm font-medium">
            <Link
              href="/jobs"
              onClick={() => setMenuOpen(false)}
              className="hover:underline"
            >
              Jobs
            </Link>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="hover:underline"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}