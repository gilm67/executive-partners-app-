import { defineConfig } from '@playwright/test';

const useProd = !!process.env.BASE_URL;

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
  },
  // If testing locally, start the dev server. If BASE_URL is set (prod), skip webServer.
  webServer: useProd
    ? undefined
    : {
        command: 'npm run dev',
        port: 3000,
        reuseExistingServer: true,
      },
});
