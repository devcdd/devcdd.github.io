import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import postEditor from "./editor/integration.mjs";

export default defineConfig({
  site: "https://cdd.co.kr",
  output: "static",
  trailingSlash: "ignore",
  integrations: [postEditor(), sitemap()],
});
