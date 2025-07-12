import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './ui',
  timeout: 30 * 1000,
  use: {
    browserName: 'chromium',
    baseURL: 'http://localhost:3000', // or your web app URL
    headless: false,
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
      viewport: {width: 1440, height: 806}, 
    },
  ],
});
