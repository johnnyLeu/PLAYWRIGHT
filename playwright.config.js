// @ts-check
// JENKINS CREDENTIAL:ADMIN - fd8748b3b56e40849df4ca1aba005993
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
    screenshot: 'off', // on, only-on-failure
    trace: 'off', // on, retain-on-failure
  },

};

module.exports = config;

