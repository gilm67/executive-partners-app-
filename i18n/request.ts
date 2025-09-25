import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(({ locale }: { locale?: string }) => ({
  locale: locale ?? 'en',
  messages: {}
}));
