"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close on ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Scroll detection for background blur
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition ${
        scrolled ? "bg-black/40 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      {/* Top bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-wide text-white md:text-xl"
        >
          Executive Partners
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <NavLinks />
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden rounded-xl border border-white/25 bg-black/30 px-3 py-2 text-white backdrop-blur"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
          />
          {/* Panel */}
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-x-4 top-20 z-50 rounded-2xl border border-white/15 bg-[#0a0f1a]/95 p-5 shadow-2xl md:hidden"
          >
            <div className="grid gap-3 text-sm">
              <MobileLink href="/about" onClick={() => setOpen(false)}>
                About
              </MobileLink>
              <MobileLink href="/services" onClick={() => setOpen(false)}>
                Services
              </MobileLink>
              <MobileLink href="/insights" onClick={() => setOpen(false)}>
                Insights
              </MobileLink>
              <hr className="my-2 border-white/10" />
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-white/25 px-5 py-3 text-center font-semibold text-white hover:bg-white/10"
              >
                Connect with us
              </Link>
              <Link
                href="/jobs"
                onClick={() => setOpen(false)}
                className="rounded-2xl bg-white px-5 py-3 text-center font-semibold text-black hover:bg-white/90"
              >
                Explore opportunities
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

/* Desktop links */
function NavLinks() {
  return (
    <>
      <Link className="text-white/90 hover:text-white transition" href="/about">
        About
      </Link>
      <Link className="text-white/90 hover:text-white transition" href="/services">
        Services
      </Link>
      <Link className="text-white/90 hover:text-white transition" href="/insights">
        Insights
      </Link>
      <Link
        className="rounded-2xl border border-white/30 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
        href="/contact"
      >
        Connect with us
      </Link>
      <Link
        className="rounded-2xl bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90"
        href="/jobs"
      >
        Explore opportunities
      </Link>
    </>
  );
}

/* Mobile link helper */
function MobileLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-lg px-3 py-2 text-white/90 hover:bg-white/10 hover:text-white transition"
    >
      {children}
    </Link>
  );
}

/* Icons (inline, no deps) */
function IconMenu() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      className="text-white"
    >
      <path
        d="M3 6h18M3 12h18M3 18h18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconClose() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      className="text-white"
    >
      <path
        d="M6 6l12 12M18 6l-12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}