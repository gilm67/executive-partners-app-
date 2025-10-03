// Minimal shim to avoid next-intl dependency during build.
// If you add real i18n later, restore next-intl here.
export default function getRequestConfig(_: any) {
  return { locale: 'en', messages: {} };
}
