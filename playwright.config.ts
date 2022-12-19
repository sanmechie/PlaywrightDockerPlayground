import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import { trace } from 'console';

const config: PlaywrightTestConfig = {
  testMatch: ['tests/*.spec.ts'],
  use: {
    headless: false,
    screenshot: 'on',
    video: 'on',
    trace: 'on-first-retry'
  },
  timeout: 200000,
  retries: 1,
  reporter: [
    [
      'json',
      {
        outputFile: 'jsonReporter/report.json',
      },
    ],
    [
      'html',
      {
        outputFile: 'htmlReporter/htmlreport.json',
        open: 'never'
      },
    ],
  
  ],




};

export default config;
