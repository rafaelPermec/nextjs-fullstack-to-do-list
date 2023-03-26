import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
      baseUrl: "http://localhost:3000",
      video: false,
      screenshotOnRunFailure: false,
      execTimeout: 5000,
      specPattern: "**/*.spec.ts",
      taskTimeout: 5000,
  },
});
