/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

module.exports = withNextIntl({
  reactStrictMode: true,
  // keep any other Next.js options you had here
});
