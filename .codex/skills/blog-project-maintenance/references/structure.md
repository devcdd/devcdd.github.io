# Structure

## Top Level

- `app/`: App Router pages and metadata
- `articles/`: source content and site metadata
- `components/`: shared UI pieces
- `layouts/`: blog/project layouts
- `css/`: global Tailwind and prose styling
- `scripts/`: authoring and build helpers
- `templates/`: MDX templates for blog/project creation
- `public/static/images/`: image storage for posts and projects

## Content Tree

- `articles/blog/frontend/*.mdx`
- `articles/blog/backend/*.mdx`
- `articles/blog/retrospect/*.mdx`
- `articles/project/*.mdx`
- `articles/authors/*.mdx`
- `articles/siteMetadata.js`

## Route Mapping

- `/` -> home
- `/blog` -> blog index
- `/blog/[...slug]` -> blog detail
- `/projects` -> project index
- `/projects/[...slug]` -> project detail
- `/tags` and `/tags/[tag]` -> tag pages

Project detail is generated from `articles/project/*.mdx`.
Example:
- `articles/project/payboard.mdx` -> `/projects/payboard`

## Files To Inspect First

- `contentlayer.config.ts`
  - document type definitions
  - search index generation
  - tag count generation
- `next.config.js`
  - static export and image config
- `app/Main.tsx`
  - home page composition
- `layouts/PostLayout.tsx`
  - blog detail layout
- `layouts/ProjectLayout.tsx`
  - project detail layout

## Important Current Decisions

- `data/` is no longer the content source.
- Project list data is no longer stored in `data/projectsData.ts`.
- `siteMetadata` is imported from `articles/siteMetadata`.
- Home is intentionally simplified:
  - snapshot only shows `Posts` and `Tags`
  - recent posts only shows 4 items
