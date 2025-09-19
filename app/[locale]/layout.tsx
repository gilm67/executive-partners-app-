import TopNavClient from "@/components/TopNavClient";
import HydratedSplash from "@/components/HydratedSplash";

// ✅ SAFE NextIntl provider (won't crash if messages are missing)
import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params?.locale ?? "en";

  // Try to load locale messages, but never crash if not configured
  let messages: any = {};
  try {
    messages = await getMessages();
  } catch {
    messages = {}; // fallback to empty messages
  }

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
            padding: "12px 16px",
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          ✅ Temporary safe layout (Splash on, TopNav client-only, NextIntl on).
        </div>

        {/* Splash overlay (client) */}
        <HydratedSplash />

        {/* Client-only navigation */}
        <TopNavClient />

        {/* ✅ Wrap the app with NextIntl so pages using next-intl won't crash */}
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div style={{ maxWidth: 1100, margin: "24px auto", padding: "0 16px" }}>
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
