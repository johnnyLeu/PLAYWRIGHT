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


  // To run the tests with this config use : 
  // --config nameOfConfigFile.js --project=nameOfProject(Safari execution)
  reporter: 'html',
  projects:[ 
    {
  // Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. 
  // qui vanno tutte le preferene di esecuzione (es. il browser)
      name: "Safari execution",
      use: {
        browserName: 'webkit', // safari
        headless: false, // true
        screenshot: 'only-on-failure', // on, off
        trace: 'retain-on-failure', // on, off
        // change size of the web's page test 
        // viewport: {weight:xxx, height:xxx} 
        // for mobile
        ...devices['iPhone 11'],
        ignoreHttpsErrors: true,
        permission:['geolocation'],
        // screen recording
        video:'retain-on-failure'
      }
    },
    {
      name: "Chrome execution",
      use: {
        browserName: 'chromium', // chrome
        headless: false, // true
        screenshot: 'only-on-failure', // on, off
        trace: 'retain-on-failure' // on, off
      }
    }
  ]

};

module.exports = config;

