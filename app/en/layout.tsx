'use client';
import "../globals.css";
import HydratedSplash from "@/components/HydratedSplash";

export default function EnLayout({ children }: { children: React.ReactNode }) {
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
        <HydratedSplash />
        <div style={{ maxWidth: 1100, margin: "24px auto", padding: "0 16px" }}>
          {children}
        </div>
      </body>
    </html>
  );
}
