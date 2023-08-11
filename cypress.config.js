const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    defaultcommandTimeout: 10000,
    watchForFileChanges: false,
    'baseUrl': 'https://pushing-front.vercel.app/',
  },
});
