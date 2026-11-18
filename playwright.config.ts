import { defineConfig, devices } from "@playwright/test";

const PORT = 4400;

export default defineConfig({
  testDir: "./e2e",
  testMatch: "**/*.e2e.ts",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: { baseURL: `http://localhost:${PORT}` },
  projects: [
    // RNF02: legível em 360px.
    {
      name: "mobile-360",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 360, height: 740 },
        isMobile: true,
        hasTouch: true,
      },
    },
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    // The tests run against the real static build.
    command: `npm run build && PORT=${PORT} node e2e/serve.mjs`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    env: {
      SITE_URL: "https://kilu.example",
      PUBLIC_APP_URL: "https://app.kilu.example",
      PUBLIC_API_URL: "https://api.kilu.example",
    },
  },
});
