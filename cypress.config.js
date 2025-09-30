const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: "https://front.serverest.dev",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
