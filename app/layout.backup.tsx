export const metadata = {
  title: "Executive Partners",
  description: "Private Banking & Wealth Management Executive Search",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <header className="bg-white border-b">
          <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
            <a href="/" className="text-lg sm:text-xl font-semibold">
              Executive Partners
            </a>

            <nav className="flex items-center gap-2 sm:gap-3">
              {/* 👉 New Top Talent button */}
              <a
                href="/top-talent"
                className="rounded-lg border px-3 py-2 text-sm font-medium hover:bg-neutral-100"
              >
                Top Talent
              </a>

              {/* Your existing CTA (keep/edit as you wish) */}
              <a
                href="/contact"
                className="rounded-lg bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-800"
              >
                Book a confidential intro
              </a>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>

        <footer className="border-t py-8 text-sm text-neutral-500">
          <div className="mx-auto max-w-7xl flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between px-4">
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