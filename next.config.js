/** Make next-intl optional so we can deploy mobile fixes even if i18n misconfig exists */
const enableI18N = process.env.ENABLE_I18N === "1";

let withNextIntl = (cfg) => cfg;
if (enableI18N) {
  const createNextIntlPlugin = require("next-intl/plugin");
  withNextIntl = createNextIntlPlugin("./i18n/request.ts");
}

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withNextIntl(nextConfig);