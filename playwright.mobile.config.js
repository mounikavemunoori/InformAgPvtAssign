// playwright.mobile.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './mobile-web',
  use: {
    browserName: 'chromium',
    ...devices['Pixel 5'],   // Or any device from devices list
    headless: false,
  },
  projects: [
    {
      name: 'Mobile Chrome - Pixel 5',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari - iPhone 12',
      use: { ...devices['iPhone 12'] },
    },
  ],
});
