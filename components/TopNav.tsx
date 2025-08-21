// components/TopNav.tsx
import Link from "next/link";

export default function TopNav() {
  return (
    <header className="sticky top-0 z-50 bg-black/85 backdrop-blur supports-[backdrop-filter]:bg-black/70 border-b border-white/10">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-baseline gap-3">
          <span className="text-white font-extrabold tracking-tight">
            Executive Partners
          </span>
          <span className="hidden sm:inline text-xs text-neutral-300">
            International &amp; Swiss Private Banking — HNW/UHNWI
          </span>
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link href="/jobs" className="text-neutral-300 hover:text-white">
            Jobs
          </Link>
          <Link href="/candidates" className="text-neutral-300 hover:text-white">
            Candidates
          </Link>
          <Link href="/hiring-managers" className="text-neutral-300 hover:text-white">
            Hiring Managers
          </Link>
          <Link href="/bp-simulator" className="text-neutral-300 hover:text-white">
            BP Simulator
          </Link>
          <Link href="/contact" className="text-neutral-300 hover:text-white">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
