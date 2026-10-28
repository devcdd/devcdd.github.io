import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

export const ENTRY_TYPES = ["service", "life", "etc"] as const;
// 진행 단계 — 순서대로 아이디어 → 진행중 → 완성, 중간에 접으면 중단
export const ENTRY_STATUSES = ["idea", "building", "done", "dropped"] as const;

const entries = defineCollection({
  // content/entries/**/*.md → 파일명이 URL slug 가 됩니다.
  loader: glob({ pattern: "**/[^_]*.md", base: "./content/entries" }),
  schema: z.object({
    code: z.string(), // 연구 번호. 예: LAB-001
    title: z.string(),
    type: z.enum(ENTRY_TYPES),
    status: z.enum(ENTRY_STATUSES),
    created: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    summary: z.string(),
    hypothesis: z.string().optional(),
    // 핵심 수치/사양을 카드로 보여줍니다.
    specs: z
      .array(z.object({ label: z.string(), value: z.string(), note: z.string().optional() }))
      .default([]),
    // 동작 흐름을 단계별 다이어그램으로 보여줍니다.
    flow: z
      .array(z.object({ label: z.string(), detail: z.string().optional() }))
      .default([]),
    goals: z.array(z.string()).default([]),
    milestones: z
      .array(
        z.object({
          title: z.string(),
          due: z.coerce.date().optional(),
          done: z.boolean().default(false),
        }),
      )
      .default([]),
    links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
    draft: z.boolean().default(false),
  }),
});

export const POST_CATEGORIES = ["frontend", "backend", "retrospect"] as const;

const postSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  category: z.enum(POST_CATEGORIES),
  tags: z.array(z.string()).default([]),
  summary: z.string(),
  draft: z.boolean().default(false),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./content/posts" }),
  schema: postSchema,
});

const notes = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./content/notes" }),
  schema: postSchema,
});

// content/conferences/<행사>.md 는 행사 소개, 같은 이름 폴더 안의 .md 는 그 행사의 세션 글
const conferences = defineCollection({
  loader: glob({ pattern: "*.md", base: "./content/conferences" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    place: z.string().optional(),
    tags: z.array(z.string()).default([]),
    summary: z.string().default(""),
    links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
    // 행사 전체 시간표. 들은 세션은 time·track 이 같은 세션 글과 짝지어 강조됨
    timetable: z
      .array(
        z.object({
          time: z.string(),
          track: z.string().optional(), // 비우면 키노트처럼 모든 트랙에 걸친 칸
          title: z.string(),
          speakers: z.array(z.string()).default([]),
        }),
      )
      .default([]),
    draft: z.boolean().default(false),
  }),
});

const sessions = defineCollection({
  loader: glob({ pattern: "*/[^_]*.md", base: "./content/conferences" }),
  schema: z.object({
    title: z.string(),
    time: z.string(), // 예: 10:50-11:30, 세션 순서도 이 값으로 정함
    track: z.string().optional(),
    speakers: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    // 듣기 전에 틀만 만들어 두는 경우가 있어 비워 둘 수 있음
    summary: z.string().default(""),
    draft: z.boolean().default(false),
  }),
});

export const collections = { entries, posts, notes, conferences, sessions };
