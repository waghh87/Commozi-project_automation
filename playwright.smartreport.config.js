// @ts-nocheck
import { defineConfig } from '@playwright/test';
import { dir } from 'console';
//import { on } from 'events';
//import { trace } from 'console';
const outputDir = process.env.PLAYWRIGHT_BLOB_OUTPUT_DIR || 'blob-report';

const config = {
  testDir: './tests',
  timeout: 60* 1000,
  expect: {
    timeout: 60000,
  },

  reporter: [
    ['list'],
    ['playwright-smart-reporter', {
      outputFile: '../playwright-report/smart-report/smart-report.html',
      historyFile: '../playwright-report/smart-report/test-history.json',
      maxHistoryRuns: 10,
      performanceThreshold: 1.2,
    }],
  ],
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
