import "../globals.css";

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params?.locale ?? "en";
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="bg-white text-neutral-900 antialiased">
        <div
          id="safe-test-banner"
          className="bg-yellow-100 text-neutral-900 border-b-2 border-yellow-300 py-4 text-center font-semibold"
        >
          ✅ SAFE TEST BANNER — layout rendered (with globals.css)
        </div>
        <div className="max-w-5xl mx-auto px-4 py-6">{children}</div>
      </body>
    </html>
  );
}
