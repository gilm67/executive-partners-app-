'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
// If you use next-intl:
import { NextIntlClientProvider } from 'next-intl';

type Props = PropsWithChildren<{
  locale: string;
  messages?: Record<string, any> | null;
}>;

/**
 * Safe client-only provider wrapper.
 * - If messages are missing/malformed, we still render children.
 * - Add any other client providers here later (Theme, QueryClient, etc.)
 */
export default function ProvidersClient({ locale, messages, children }: Props) {
  // Optional: ensure we're mounted before rendering to avoid hydration warnings
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <>{children}</>;

  try {
    return (
      <NextIntlClientProvider
        locale={locale}
        messages={messages ?? undefined}
      >
        {children}
      </NextIntlClientProvider>
    );
  } catch (_e) {
    // Failsafe: if anything in providers throws, still show the app
    return <>{children}</>;
  }
}
