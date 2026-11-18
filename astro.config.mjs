// Site estático da Kilu (spec: specs/features/landing.md). Sem JS de framework no navegador.
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.SITE_URL ?? "http://localhost:4321",
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [sitemap({ filter: (page) => !page.includes("/og/") && !page.endsWith("/404") })],
  // @vercel/og loads its fonts and wasm with require(); it must run from node_modules, not from the bundle.
  vite: { ssr: { external: ["@vercel/og"] } },
});
