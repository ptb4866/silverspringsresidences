import { defineConfig } from "@playwright/test";
import config from "./playwright.config.js";

export default defineConfig({
  ...config,
  use: { ...config.use, baseURL: "http://127.0.0.1:4173" },
  testMatch: "**/production.spec.js",
  testIgnore: [],
  outputDir: "test-results-preview",
  reporter: [["list"], ["html", { open: "never", outputFolder: "playwright-report-preview" }]],
  webServer: {
    command: "npm run preview -- --host 127.0.0.1 --port 4173 --strictPort",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
  },
});
