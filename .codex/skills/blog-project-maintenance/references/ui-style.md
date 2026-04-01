# UI Style

## Direction

- Keep the interface flat.
- Prefer borders, spacing, and typography over shadowed cards.
- Preserve the white + navy identity.
- In dark mode, keep the accent in a brighter blue range.

## Tokens

Defined in `css/tailwind.css`.

Light mode anchors:
- `--page-background: #ffffff`
- `--page-foreground: #0f172a`
- `--border: #dbe3f4`

Dark mode anchors:
- `--page-background: #07111f`
- `--surface: #0f1b2f`
- `--border: #21385f`

## Fonts

Configured in `tailwind.config.js`.

Current stack:
- primary Latin/number look: `JetBrains Mono Variable`
- Korean fallback: `Pretendard Variable`, `Pretendard`

Main page uses `font-mono` directly in `app/Main.tsx`.

## Spacing Adjustment

Pretendard felt too loose for Korean text, so global body spacing was tightened:

- `body { word-spacing: -0.06em; }`

Excluded from this rule:
- `code`
- `pre`
- `input`
- `textarea`
- `button`
- `select`
- `option`

If this changes, check paragraph readability across Korean-heavy pages before shipping.

## Home Page Rules

- Keep the hero simple.
- Keep only two CTA buttons.
- `Snapshot` should stay minimal unless there is a strong reason.
- Recent posts list should remain compact.

## Mobile Rules

- Avoid horizontal scrolling in article bodies.
- Code blocks are allowed to wrap on mobile.
- Tables should degrade gracefully with wrapping.
- Mobile horizontal padding has already been reduced from the earlier version.

## Avoid Regressions

- Do not reintroduce default rounded cards with prominent shadows everywhere.
- Do not add noisy metadata like reading time back by default.
- Do not make the home page dense again unless the product direction changes.
