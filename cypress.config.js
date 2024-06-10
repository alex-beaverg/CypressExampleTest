const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'yisy5p',
  e2e: {
    setupNodeEvents(on, config) {      
    },
    viewportWidth: 1100,
  },
});
