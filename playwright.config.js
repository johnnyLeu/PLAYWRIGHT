// @ts-check
const { devices } = require('@playwright/test');

  const config = {
    testDir: './tests',
    // if the tests fail this option re-run it again , N times
    retries: 2,
    // Maximum time one test can run for
    timeout: 30 * 1000,
    expect: {
      timeout: 5000
    },

  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  // qui vanno tutte le preferene di esecuzione (es. il browser)
  use: {
    
    browserName: 'chromium',
    headless: false,
    screenshot: 'only-on-failure', // on, off
    trace: 'retain-on-failure', // on, off
  },

};

module.exports = config;

