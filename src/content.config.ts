import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

export const ENTRY_TYPES = ["service", "life", "etc"] as const;
// 진행 단계 — 순서대로 아이디어 → 진행중 → 완성
export const ENTRY_STATUSES = ["idea", "building", "done"] as const;

const entries = defineCollection({
  // content/entries/**/*.yaml → 파일명이 URL slug 가 됩니다.
  loader: glob({ pattern: "**/[^_]*.{yaml,yml}", base: "./content/entries" }),
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
    // 본문은 섹션 단위로 작성하고, body 는 Markdown 을 지원합니다.
    sections: z
      .array(
        z.object({
          heading: z.string(),
          body: z.string(),
          beforeMilestones: z.boolean().default(false), // true 면 Milestones 위에 표시
        }),
      )
      .default([]),
    links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { entries };
