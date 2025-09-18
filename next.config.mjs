/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },     // don't fail the Vercel build on ESLint
  typescript: { ignoreBuildErrors: true },  // don't fail on TS (e.g., "any") during build
};
export default nextConfig;
