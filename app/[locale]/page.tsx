// app/[locale]/page.tsx
import { redirect, notFound } from 'next/navigation';

// "de" is intentionally excluded: there is no app/de/page.tsx homepage,
// only standalone pages (headhunter-genf, insights). Redirecting /de here
// would point to a non-existent page. Direct links to /de/headhunter-genf
// and /de/insights are unaffected by this file.
const SUPPORTED_LOCALES = ["en", "fr"];

export default function LocaleEntry({ params }: { params: { locale: string } }) {
  const { locale } = params;

  // Only redirect for genuinely supported locale codes.
  // Any other value (e.g. a broken/unknown URL) should 404, not redirect to /en.
  if (SUPPORTED_LOCALES.includes(locale)) {
    redirect(`/${locale}`);
  }

  notFound();
}
