/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  async redirects() {
    // TEMP: disable everything while we debug the /markets pages
    return [];
  },
};
module.exports = nextConfig;
