'use client';

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-white/80 flex items-center justify-between">
        <span>© {new Date().getFullYear()} Executive Partners</span>
        <nav className="flex gap-5">
          <Link className="hover:underline" href="/markets">Markets</Link>
          <Link className="hover:underline" href="/jobs">Jobs</Link>
          <Link className="hover:underline" href="/insights">Insights</Link>
          <Link className="hover:underline" href="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
