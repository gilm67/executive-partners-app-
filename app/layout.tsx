// app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "International & Swiss Private Banking — HNW/UHNWI | Executive Partners",
  description:
    "Executive Partners connects top Private Bankers, Wealth Managers,senior executives and Compliance Officers with leading banks and wealth management firms in Switzerland and worldwide.",
  icons: { icon: "/favicon.ico" },
};

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="px-3 py-1 text-sm font-medium text-neutral-100/90 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
    >
      {children}
    </Link>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-neutral-950 text-neutral-100 antialiased">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-900/75 backdrop-blur supports-[backdrop-filter]:bg-neutral-900/55">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
            <Link
              href="/"
              className="group flex items-baseline gap-3 whitespace-nowrap"
            >
              <span className="text-base font-semibold tracking-tight text-white group-hover:text-white">
                Executive Partners
              </span>
              <span className="hidden text-[12px] text-neutral-300/80 sm:inline">
                International & Swiss Private Banking — HNW/UHNWI
              </span>
            </Link>

            <nav className="flex items-center gap-1">
              <NavLink href="/candidates">Candidates</NavLink>
              <NavLink href="/hiring-managers">Hiring Managers</NavLink>
              <NavLink href="/bp-simulator">BP Simulator</NavLink>
              <NavLink href="/jobs">Jobs</NavLink>
              <NavLink href="/top-talent">Top Talent</NavLink>
            </nav>
          </div>
        </header>

        {/* Page */}
        <main className="mx-auto w-full max-w-6xl px-4 py-10">{children}</main>

        {/* Footer */}
        <footer className="border-t border-neutral-900 bg-neutral-950/95">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 text-xs text-neutral-400">
            <span>© 2025 Executive Partners — Geneva</span>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-neutral-200">
                Privacy
              </Link>
              <Link href="/contact" className="hover:text-neutral-200">
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
