import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // add/remove locales as you need
  locales: ['en', 'fr'],
  defaultLocale: 'en'
});

export const config = {
  matcher: ['/', '/(en|fr)/:path*']
};
