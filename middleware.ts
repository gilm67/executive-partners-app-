import createMiddleware from 'next-intl/middleware';

// Keep this in sync with next-intl.config.mjs
export default createMiddleware({
  locales: ['en', 'fr', 'de'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: true
});

export const config = {
  // Run middleware on the homepage and any localized path
  matcher: ['/', '/(en|fr|de)/:path*']
};
