/**
 * Minimal config used by next-intl on the server for [locale] routes.
 * Keep this at the project root so the runtime can find it.
 */
export default {
  locales: ['en', 'fr', 'de'],
  defaultLocale: 'en',
  // Optional but nice: don't force locale prefix for the default
  localePrefix: 'as-needed'
};
