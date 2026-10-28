import { getCollection, type CollectionEntry } from "astro:content";

export type Conference = CollectionEntry<"conferences">;
export type Session = CollectionEntry<"sessions">;

// draft 는 편집 중 미리보기를 위해 dev 서버에서만 포함
const visible = (e: { data: { draft: boolean } }) => import.meta.env.DEV || !e.data.draft;

/** 최신 행사순 */
export async function getConferences() {
  const all: Conference[] = await getCollection("conferences", visible);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** 행사 id → 시간순 세션 목록 */
export async function getSessionsByConference() {
  const all: Session[] = await getCollection("sessions", visible);
  const groups = new Map<string, Session[]>();
  for (const s of all) {
    const key = conferenceId(s);
    groups.set(key, [...(groups.get(key) ?? []), s]);
  }
  for (const list of groups.values()) list.sort((a, b) => a.data.time.localeCompare(b.data.time));
  return groups;
}

export const conferenceId = (s: Session) => s.id.split("/")[0];
export const sessionSlug = (s: Session) => s.id.split("/").slice(1).join("/");
