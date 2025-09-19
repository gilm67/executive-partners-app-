import {defineConfig} from 'next-intl';

export default defineConfig({
  // Locales you actually use
  locales: ['en', 'fr', 'de'],
  defaultLocale: 'en',

  // Optional, but keeps URLs tidy; adjust if you prefer '/en'
  localePrefix: 'as-needed'
});
