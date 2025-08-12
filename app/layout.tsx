// app/layout.tsx
import "./globals.css";
import Link from "next/link";
import { ReactNode } from "react";

export const metadata = {
  title: "Executive Partners",
  description: "Private Banking & Wealth Management Recruitment",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 text-gray-900" suppressHydrationWarning>
        {/* HEADER */}
        <header className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
            <Link href="/" className="text-lg font-bold text-gray-800">
              Executive Partners
            </Link>
            <nav className="flex gap-6 text-sm font-medium">
              <Link href="/candidates">Candidates</Link>
              <Link href="/hiring-managers">Hiring Managers</Link>
              <Link href="/bp-simulator">BP Simulator</Link>
              <Link href="/jobs">Jobs</Link>
              <Link href="/top-talent">Top Talent</Link>
            </nav>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="bg-gray-100 border-t mt-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 text-xs text-gray-500 flex justify-between">
            <p>© 2025 Executive Partners — Geneva</p>
            <div className="flex gap-4">
              <Link href="/privacy">Privacy</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

