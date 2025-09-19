import {defineConfig} from 'next-intl';

export default defineConfig({
  locales: ['en', 'fr', 'de'],
  defaultLocale: 'en',
  // Use 'as-needed' if you want "/" to be English and prefixes only for non-default locales
  localePrefix: 'as-needed'
});
