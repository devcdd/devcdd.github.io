# Content Model

## Blog Documents

Locations:
- `articles/blog/frontend`
- `articles/blog/backend`
- `articles/blog/retrospect`

Template:

```mdx
---
title: '제목'
date: '2026-03-31'
tags: []
draft: false
summary: ''
---

## 서론

<TOCInline toc={props.toc} exclude="서론" />
```

Main fields:
- `title`
- `date`
- `tags`
- `draft`
- `summary`
- `images`
- `authors`
- `layout`
- `bibliography`
- `canonicalUrl`

## Project Documents

Location:
- `articles/project/*.mdx`

Template:

```mdx
---
title: '프로젝트명'
summary: ''
images: []
href: ''
repo: ''
self: true
order: 0
tags: []
---
```

Main fields:
- `title`: required
- `summary`: required
- `images`: hero/OG images
- `href`: live or promo link
- `repo`: GitHub or source repository link
- `self`: used for link behavior in cards
- `order`: list sort priority
- `tags`
- `draft`

## Link Semantics

In project detail pages:
- `href` renders as `라이브 보기`
- `repo` renders as `GitHub에서 보기`

Footer `문서 원본 보기` is different:
- it points to the blog repository file for the MDX document itself
- it is not the app/project source repository

## Sorting

- Blog posts follow the existing pliny/contentlayer sorting flow.
- Projects are sorted by:
  1. `order` descending
  2. `title` ascending with Korean locale

## Search And Tags

- Current search index includes blog documents only.
- Current tag count includes blog tags only.
- Project tags are visible in project pages but are not folded into the global tag pages.

If you want projects included in search or tag aggregation, update the `onSuccess` logic in `contentlayer.config.ts`.

## Image Paths

- Blog images should live under `public/static/images/posts/...`
- Project images should live under `public/static/images/projects/...`
