# Tooling And Deploy

## Package Manager

- Use `pnpm`
- `packageManager` is pinned in `package.json`
- This repo is `private`, so `pnpm publish` is not the deployment path

Deployment flow:

- `pnpm build`
- `pnpm deploy`

## Main Commands

- `pnpm dev`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`
- `pnpm serve`
- `pnpm deploy`
- `pnpm blog`

## `pnpm blog`

Implemented in `scripts/blog.mjs`.

Top-level actions:

- `Post`
- `Paste`

### Post Flow

- choose `Blog` or `Project`
- if `Blog`, choose one of:
  - `frontend`
  - `backend`
  - `retrospect`
- enter title
- create MDX from template

Templates:

- `templates/blog.mdx.tpl`
- `templates/project.mdx.tpl`

### Paste Flow

- select from the 5 most recently modified blog/project MDX documents
- enter a filename, or leave blank for a random stem
- save the clipboard image
- print an MDX `<img />` snippet

## Clipboard Image Saver

Files:

- `scripts/blog.mjs`
- `scripts/save-clipboard-image.swift`

Behavior:

- saves into `public/static/images/posts/<category>/<slug>/...` or `public/static/images/projects/<slug>/...`
- reads image data from macOS clipboard via `NSPasteboard`
- prints an MDX `<Image />` snippet with a document-relative `src`

Migration:

- run `pnpm image:migrate` to move legacy `/static/images/posts/...` or `/static/images/projects/...` references into document-scoped folders and rewrite MDX to relative paths

Current constraint:

- clipboard paste is macOS-only

It should work on another Mac if:

- the repo is present
- `pnpm install` has been run
- `swift` is available
- the clipboard actually contains an image

## Static Export Constraints

From `next.config.js`:

- production uses `output: 'export'`
- images are `unoptimized`
- trailing slash is enabled

Implications:

- avoid features that require a server runtime
- verify route generation and contentlayer output with `pnpm build`
- be careful when adding libraries that assume Node/Edge runtime during requests

## Validation Rules

Run at least:

- `pnpm lint` for ordinary edits
- `pnpm build` for route/content/schema/static-export changes

Changes that should trigger a full build:

- `contentlayer.config.ts`
- routes in `app/`
- project/blog document schema
- templates or authoring flow that affect generated content
