const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('@cypress/code-coverage/task')(on, config);
      return config;
    },
    defaultCommandTimeout: 60000,
    videoUploadOnPasses: false,
    chromeWebSecurity: false,
    watchForFileChanges: false,
    trashAssetsBeforeRuns: true
  },
  env: {
    homepage: 'https://woocommerce.showcase-wallee.com/',
    hideXHR : true
  }
});
