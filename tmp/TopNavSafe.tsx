'use client';

import Link from "next/link";

export default function TopNavSafe() {
  return (
    <header className="sticky top-0 z-40 bg-neutral-950 text-white border-b border-neutral-800">
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/en" className="font-semibold tracking-wide">Executive Partners</Link>
        <div className="flex gap-4 text-sm">
          <Link href="/jobs" className="opacity-90 hover:opacity-100">Jobs</Link>
          <Link href="/candidates" className="opacity-90 hover:opacity-100">Candidates</Link>
          <Link href="/hiring-managers" className="opacity-90 hover:opacity-100">Hiring Managers</Link>
          <Link href="/contact" className="opacity-90 hover:opacity-100">Contact</Link>
        </div>
      </nav>
    </header>
  );
}
