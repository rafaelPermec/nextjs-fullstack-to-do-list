import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
      baseUrl: "http://localhost:3000",
      video: false,
      screenshotOnRunFailure: false,
      execTimeout: 500000,
      specPattern: "**/*.spec.ts",
      taskTimeout: 50000,
      requestTimeout: 50000,
      responseTimeout: 50000,
      pageLoadTimeout: 50000,
  },
});
