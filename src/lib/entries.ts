import { getCollection, type CollectionEntry } from "astro:content";
import { marked, type Tokens } from "marked";

export type Entry = CollectionEntry<"entries">;

export const STATUS_META = {
  idea: { label: "아이디어" },
  building: { label: "진행중" },
  done: { label: "완성" },
  dropped: { label: "중단" },
} as const;

export const TYPE_LABEL = {
  service: "서비스 기획",
  life: "인생 업그레이드",
  etc: "기타",
} as const;

export const lastTouched = (e: Entry) => e.data.updated ?? e.data.created;

/** draft 를 제외하고 최근 수정순으로 정렬된 문서 목록 */
export async function getEntries() {
  const all = await getCollection("entries", (e) => !e.data.draft);
  return all.sort((a, b) => lastTouched(b).valueOf() - lastTouched(a).valueOf());
}

export function getTags(entries: Entry[]) {
  const counts = new Map<string, number>();
  for (const e of entries) for (const t of e.data.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

export function countBy<K extends string>(entries: Entry[], pick: (e: Entry) => K) {
  const counts = {} as Record<K, number>;
  for (const e of entries) counts[pick(e)] = (counts[pick(e)] ?? 0) + 1;
  return counts;
}

export const formatDate = (d: Date) =>
  `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;

export const pad2 = (n: number) => String(n).padStart(2, "0");

marked.use({
  renderer: {
    // id 는 renderWithToc 가 토큰에 미리 달아 둠
    heading(token) {
      const { tokens, depth, id } = token as Tokens.Heading & { id?: string };
      return `<h${depth}${id ? ` id="${id}"` : ""}>${this.parser.parseInline(tokens)}</h${depth}>\n`;
    },
    // 외부 링크(구매 링크 등)는 새 탭으로 열기
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const external = /^https?:\/\//.test(href);
      const attrs = external ? ' target="_blank" rel="noopener"' : "";
      return `<a href="${href}"${title ? ` title="${title}"` : ""}${attrs}>${text}</a>`;
    },
    // 칸마다 열 제목을 data-label 로 달아 두면 모바일에서 행을 카드처럼 쌓아 보여줄 수 있음
    table({ header, rows }) {
      const labels = header.map((c) => c.text.replace(/"/g, "&quot;"));
      const align = (a: string | null) => (a ? ` align="${a}"` : "");
      const head = header.map((c) => `<th${align(c.align)}>${this.parser.parseInline(c.tokens)}</th>`).join("");
      const body = rows
        .map((r) => {
          // 내용을 span 하나로 감싸야 <br> 이 있어도 모바일 격자에서 한 칸으로 유지됨
          const cells = r.map((c, i) => {
            const html = this.parser.parseInline(c.tokens);
            return `<td data-label="${labels[i]}"${align(c.align)}>${html && `<span>${html}</span>`}</td>`;
          });
          return `<tr>${cells.join("")}</tr>`;
        })
        .join("\n");
      return `<table>\n<thead><tr>${head}</tr></thead>\n<tbody>${body}</tbody>\n</table>\n`;
    },
  },
});

export const renderMarkdown = (src: string) => marked.parse(src, { async: false });

/** h2·h3 에 id 를 달아 렌더하고, 같은 순서의 목차를 함께 돌려줌 */
export function renderWithToc(src: string) {
  const tokens = marked.lexer(src);
  const seen = new Map<string, number>();
  const toc: { id: string; text: string; depth: 2 | 3 }[] = [];
  for (const token of tokens) {
    if (token.type !== "heading" || (token.depth !== 2 && token.depth !== 3)) continue;
    const text = token.text.replace(/[`*_]/g, "");
    const base = text.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, "").trim().replace(/\s+/g, "-") || "section";
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    const id = n ? `${base}-${n}` : base;
    (token as Tokens.Heading & { id: string }).id = id;
    toc.push({ id, text, depth: token.depth });
  }
  return { html: marked.parser(tokens), toc };
}

/** 본문을 `## 제목` 단위로 나눠 목차·번호를 붙일 수 있게 함 */
export function splitSections(entry: Entry) {
  const sections: { heading: string; body: string }[] = [];
  for (const token of marked.lexer(entry.body ?? "")) {
    if (token.type === "heading" && token.depth === 2) sections.push({ heading: token.text, body: "" });
    else if (sections.length) sections.at(-1)!.body += token.raw;
    // 첫 `##` 앞의 글은 들어갈 섹션이 없어 조용히 사라지므로 빌드를 실패시킴
    else if (token.type !== "space") throw new Error(`${entry.id}: 본문은 \`## 제목\` 으로 시작해야 합니다.`);
  }
  return sections;
}
