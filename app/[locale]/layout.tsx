'use client';

import "../globals.css";
import HydratedSplash from "@/components/HydratedSplash";

export default function LocaleLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        style={{
          margin: 0,
          background: "#ffffff",
          color: "#111111",
          fontFamily:
            'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        {/* Keep the splash – it's client-only and safe */}
        <HydratedSplash />

        {/* Keep the temporary banner for now so we know this layout renders */}
        <div
          style={{
            background: "#FFFAE6",
            color: "#1A1A1A",
            borderBottom: "2px solid #F5D56E",
            padding: "12px 16px",
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          ✅ [locale]/layout is client-only (no SSR). If you see this, SSR is not involved.
        </div>

        <div style={{ maxWidth: 1100, margin: "24px auto", padding: "0 16px" }}>
          {children}
        </div>
      </body>
    </html>
  );
}
