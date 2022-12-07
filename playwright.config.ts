import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testMatch: ['tests/*.spec.ts'],
  use: {
    headless: false,
    screenshot: 'on',
    video: 'on',
  },

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
      },
    ],
  ],
};

export default config;
