// 사이트가 배포되는 하위 경로(astro.config 의 base)를 붙인 내부 링크
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
export const url = (path = "/") => `${BASE}${path.startsWith("/") ? path : `/${path}`}`;

export const SITE = {
  name: "LABS",
  title: "LABS — 개인 연구소",
  description: "계획과 기획, 실험을 기록하고 관리하는 개인 연구소.",
  nav: [
    { label: "문서", href: "/entries" },
    { label: "태그", href: "/tags" },
    { label: "소개", href: "/about" },
  ],
};
