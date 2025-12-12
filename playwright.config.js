// @ts-nocheck
import { defineConfig } from '@playwright/test';
import { dir } from 'console';
//import { on } from 'events';
//import { trace } from 'console';

const config = {
  testDir: './tests',
  retires: 3,

  // Override on the by default timeout
  timeout: 60 * 1000,
  expect: {
    timeout: 30000,
  },
  // if want HTML Report
  reporter: 'html',
  projects: [
    {
      name: 'Safari',
      use: {
        browserName: 'webkit',
        headless: false,
      }
    },
    {
      name: 'Chrome',
      use: {

        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        trace: 'on',
        viewport: null,
        launchOptions: {
          args: ['--start-maximized']
        },



        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

      }
    }]

};
module.exports = config
