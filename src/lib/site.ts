// 사이트가 배포되는 하위 경로(astro.config 의 base)를 붙인 내부 링크
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
export const url = (path = "/") => `${BASE}${path.startsWith("/") ? path : `/${path}`}`;

export const SITE = {
  name: "LABS",
  title: "LABS — 개인 연구소",
  description: "계획과 기획, 실험을 기록하고 관리하는 개인 연구소.",
  nav: [
    { label: "끄적끄적", href: "/posts" },
    { label: "뚝딱뚝딱", href: "/entries" },
    { label: "차곡차곡", href: "/notes" },
    { label: "태그", href: "/tags" },
    { label: "소개", href: "/about" },
  ],
};

// 홈 진입점과 각 목록 페이지 머리에 같은 문구를 씀
export const SECTIONS = {
  posts: { label: "끄적끄적", href: "/posts", caption: "잡념, 푸념, 공상, 상상, 망상까지 블로그스러운 글 모음" },
  entries: { label: "뚝딱뚝딱", href: "/entries", caption: "생산적인 무언가를 위한 스케치 혹은 기록" },
  notes: { label: "차곡차곡", href: "/notes", caption: "지식은 티끌모아 태산이거든여" },
} as const;
