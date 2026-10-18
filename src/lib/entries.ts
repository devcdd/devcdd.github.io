import { getCollection, type CollectionEntry } from "astro:content";
import { marked } from "marked";

export type Entry = CollectionEntry<"entries">;

export const STATUS_META = {
  idea: { label: "아이디어" },
  building: { label: "진행중" },
  done: { label: "완성" },
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
    // 외부 링크(구매 링크 등)는 새 탭으로 열기
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const external = /^https?:\/\//.test(href);
      const attrs = external ? ' target="_blank" rel="noopener"' : "";
      return `<a href="${href}"${title ? ` title="${title}"` : ""}${attrs}>${text}</a>`;
    },
  },
});

export const renderMarkdown = (src: string) => marked.parse(src, { async: false });
