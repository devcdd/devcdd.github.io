import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;

export const CATEGORY_LABEL = {
  frontend: "프론트엔드",
  backend: "백엔드",
  retrospect: "회고",
} as const;

/** 최신순 글 목록. draft 는 편집 중 미리보기를 위해 dev 서버에서만 포함 */
export async function getPosts() {
  const all = await getCollection("posts", (p) => import.meta.env.DEV || !p.data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
