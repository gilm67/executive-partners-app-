import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({requestLocale}) => {
  const supported = ['en','fr','de'] as const;
  const fallback = 'en';

  const locale = (await requestLocale) || fallback;
  const active = (supported as readonly string[]).includes(locale) ? locale : fallback;

  try {
    const messages = (await import(`../messages/${active}.json`)).default;
    return {locale: active, messages};
  } catch {
    const messages = (await import('../messages/en.json')).default;
    return {locale: fallback, messages};
  }
});
