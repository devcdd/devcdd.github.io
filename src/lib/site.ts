// 사이트가 배포되는 하위 경로(astro.config 의 base)를 붙인 내부 링크
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
export const url = (path = "/") => `${BASE}${path.startsWith("/") ? path : `/${path}`}`;

export const SITE = {
  name: "디디랩스",
  tagline: "디디의 아이디어 보관소",
  title: "디디랩스 — 디디의 아이디어 보관소",
  // 헤더 워드마크로 그리는 글자. 검색·공유에 쓰는 이름은 name
  logo: "LABS",
  author: "디디",
  description: "계획과 기획, 실험을 기록하고 관리하는 개인 연구소.",
  nav: [
    { label: "끄적끄적", href: "/posts" },
    { label: "뚝딱뚝딱", href: "/entries" },
    { label: "차곡차곡", href: "/notes" },
    { label: "기웃기웃", href: "/conferences" },
    { label: "태그", href: "/tags" },
    { label: "소개", href: "/about" },
  ],
};

// 색면 위 글자색은 모든 섹션이 검정. 파랑도 이 글자와 대비 4.5:1 이상이 되는 밝기로 고름
const INK = "#111214";

// 홈 카드와 각 목록 페이지 머리말에 같은 문구와 색을 씀.
// color·ink는 색면 배경과 그 위 글자색이고 라이트·다크 모드 모두 같은 값. 기웃기웃은 배민 민트.
// mark는 중립 배경 위에 긋는 강조선 색이고, 오프화이트는 흰 배경에서 안 보여 본문 글자색을 씀
export const SECTIONS = {
  posts: {
    label: "끄적끄적", href: "/posts", caption: "잡념, 푸념, 공상, 상상, 망상까지 블로그스러운 글 모음",
    color: "#eeece6", ink: INK, mark: "var(--ink)", outlined: true,
  },
  entries: {
    label: "뚝딱뚝딱", href: "/entries", caption: "생산적인 무언가를 위한 스케치 혹은 기록",
    color: "#ffe600", ink: INK, mark: "#ffe600", outlined: false,
  },
  notes: {
    label: "차곡차곡", href: "/notes", caption: "지식은 티끌모아 태산이거든여",
    color: "#3d7bff", ink: INK, mark: "#3d7bff", outlined: false,
  },
  conferences: {
    label: "기웃기웃", href: "/conferences", caption: "개발 행사 같은 거 가서 들은 것들 정리",
    color: "#2ac1bc", ink: INK, mark: "#2ac1bc", outlined: false,
  },
} as const;

export type SectionKey = keyof typeof SECTIONS;

// 홈 카드와 목록 머리말에 넘기는 섹션 색 CSS 변수
export const sectionStyle = (key: SectionKey) => {
  const s = SECTIONS[key];
  return `--card:${s.color};--card-ink:${s.ink}`;
};
