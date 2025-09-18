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
          style={{
            background: "#FFFAE6",
            color: "#1A1A1A",
            borderBottom: "2px solid #F5D56E",
            padding: "16px",
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          ✅ Temporary safe layout (no Splash, no providers).
        </div>
        <div style={{ maxWidth: 1100, margin: "24px auto", padding: "0 16px" }}>
          {children}
        </div>
      </body>
    </html>
  );
}
