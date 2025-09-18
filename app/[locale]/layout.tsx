import "../globals.css";
import TopNavSafe from "@/components/TopNavSafe";

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
      <body className="bg-neutral-950 text-white antialiased">
        <TopNavSafe />
        <div
          id="safe-test-banner"
          className="bg-yellow-100 text-neutral-900 border-b-2 border-yellow-300 py-3 text-center font-semibold"
        >
          ✅ SAFE TEST BANNER — layout + TopNavSafe
        </div>
        <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
