'use client';
import type { PropsWithChildren } from 'react';

/**
 * Minimal client provider: no-op wrapper to avoid next-intl dependency.
 * If you add i18n later, wire it up here.
 */
export default function ProvidersClient({ children }: PropsWithChildren) {
  return <>{children}</>;
}
