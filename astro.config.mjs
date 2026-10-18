import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://cdd.co.kr",
  // devcdd.github.io 하위 프로젝트 사이트로 배포 → cdd.co.kr/labs
  base: "/labs",
  output: "static",
  trailingSlash: "ignore",
});
