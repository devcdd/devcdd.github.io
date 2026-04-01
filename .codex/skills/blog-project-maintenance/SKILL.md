---
name: blog-project-maintenance
description: Use this skill when editing or extending this specific blog repo. Covers the `articles` content structure, blog/project MDX frontmatter, flat UI rules, `pnpm blog` and image paste workflow, and static-export deployment constraints.
---

# Blog Project Maintenance

Use this skill when working on this repository's content model, page structure, styling, or authoring tooling.

## Quick Start

1. Pick the area you are changing.
2. Read only the matching reference file.
3. Make the change.
4. Validate with the smallest relevant command.
5. If routing, contentlayer, or static export changed, always run `pnpm build`.

## Which Reference To Read

- Repository layout, routes, and key files:
  See `references/structure.md`
- Blog/project MDX schema, frontmatter, and content rules:
  See `references/content-model.md`
- Visual direction, fonts, spacing, and mobile behavior:
  See `references/ui-style.md`
- `pnpm blog`, clipboard image paste, and deployment constraints:
  See `references/tooling-and-deploy.md`

## Repo-Specific Rules

- Content root is `articles`, not `data`.
- Projects live in `articles/project/*.mdx`, not a TS data file.
- Keep the flat visual language. Prefer borders and spacing over cards and shadows.
- This app is built for static export in production. Avoid changes that require a server runtime unless the deployment strategy is explicitly changing.
- For project links:
  - `href` is the live/service link
  - `repo` is the project repository link
- After changing contentlayer, routes, templates, or project/blog frontmatter handling, run `pnpm build`.

## Validation Shortcuts

- General UI/code change: `pnpm lint`
- Type-sensitive change: `pnpm typecheck`
- Route/content/export change: `pnpm build`

## Files Usually Involved

- `contentlayer.config.ts`
- `app/Main.tsx`
- `app/blog/[...slug]/page.tsx`
- `app/projects/page.tsx`
- `app/projects/[...slug]/page.tsx`
- `layouts/PostLayout.tsx`
- `layouts/ProjectLayout.tsx`
- `css/tailwind.css`
- `tailwind.config.js`
- `scripts/blog.mjs`
- `scripts/save-clipboard-image.swift`
- `templates/blog.mdx.tpl`
- `templates/project.mdx.tpl`
