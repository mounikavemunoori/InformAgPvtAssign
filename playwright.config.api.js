import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './api',
  timeout: 30 * 1000,
  use: {
    baseURL: 'http://localhost:3000',  // for your local API server
  },
  reporter: [['html', { open: 'never' }]],
});
