// app/[locale]/page.tsx
import { redirect, notFound } from 'next/navigation';

const SUPPORTED_LOCALES = ["en", "fr", "de"];

export default function LocaleEntry({ params }: { params: { locale: string } }) {
  const { locale } = params;

  // Only redirect for genuinely supported locale codes.
  // Any other value (e.g. a broken/unknown URL) should 404, not redirect to /en.
  if (SUPPORTED_LOCALES.includes(locale)) {
    redirect(`/${locale}`);
  }

  notFound();
}
