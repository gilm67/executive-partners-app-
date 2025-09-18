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
      <body
        style={{
          margin: 0,
          background: "#ffffff",
          color: "#111111",
          fontFamily:
            'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        <div
          id="safe-test-banner"
          style={{
            background: "#FFFAE6",
            color: "#1A1A1A",
            borderBottom: "2px solid #F5D56E",
            padding: "16px",
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          ✅ SAFE TEST BANNER (layout.tsx) — if you can read this, layout rendered.
        </div>
        <div style={{ maxWidth: 1100, margin: "24px auto", padding: "0 16px" }}>
          {children}
        </div>
      </body>
    </html>
  );
}
