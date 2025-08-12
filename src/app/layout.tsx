import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Executive Partners",
  description: "Private Banking & Wealth Management Executive Search",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 text-gray-900">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Executive Partners</h1>
            <a
              href="/contact"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Book a confidential intro
            </a>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>

        <footer className="border-t py-8 text-sm text-neutral-500">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Executive Partners — Geneva</p>
            <div className="flex gap-4">
              <a href="/privacy" className="hover:text-neutral-800">Privacy</a>
              <a href="/contact" className="hover:text-neutral-800">Contact</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}