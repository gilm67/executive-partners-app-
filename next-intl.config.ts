import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(() => ({
  locales: ['en', 'fr', 'de'],
  defaultLocale: 'en'
}));
