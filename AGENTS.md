# semantic

Next.js (App Router) + MDX blog starter. Content lives in `src/app/**` with MDX articles and static routes for RSS/sitemap.

## Structure

```
./
├── src/
│   ├── app/                      # Next.js App Router pages/routes + content
│   ├── components/               # UI + icons + client-only helpers
│   ├── constants/                # site metadata/menu/profile constants
│   ├── styles/                   # global styles (Tailwind)
│   ├── types/                    # shared TS types
│   └── utils/                    # text/post helpers
├── assets/images/posts/          # per-post images (slug folders)
├── public/                       # public static assets
├── next.config.ts                # MDX + Next config
├── mdx-components.tsx            # MDX component mapping
├── biome.jsonc                   # Ultracite/Biome config
└── package.json                  # scripts + deps (pnpm)
```

## Where To Look

| Task | Location | Notes |
| --- | --- | --- |
| Add/edit a post | `src/app/posts/_articles/*.mdx` | Each MDX exports `metadata` (title/subtitle/dates/coverImage/category/tags/comments). |
| Post images | `assets/images/posts/<slug>/...` | `coverImage` in MDX points here (e.g. `posts/<slug>/cover.webp`). |
| About page content | `src/app/about/_content/about.mdx` | Rendered by `src/app/about/page.tsx`. |
| Site shell + providers | `src/app/layout.tsx` | ThemeProvider (next-themes), global styles, fonts. |
| Home/posts/category/tag pages | `src/app/**/page.tsx` | App Router route segments live here. |
| RSS feed | `src/app/rss.xml/route.ts` | Generates RSS XML from posts. |
| Sitemap | `src/app/sitemap.xml/route.ts` | Generates sitemap XML. |
| MDX component styling | `mdx-components.tsx` | Delegates to `src/components/ui/mdx-component`. |
| Navigation + metadata | `src/constants/*` | `menu.ts`, `metadata.ts`, `profile.ts` are the main knobs. |

## Commands

```bash
pnpm install            # Install dependencies
pnpm dev               # Next dev server on http://localhost:1113
pnpm build             # Build for production
pnpm start             # Start production server

# Lint & format (Ultracite powered by Biome)
pnpm lint              # Run linter (ultracite check)
pnpm fix               # Auto-fix formatting and lint issues (ultracite fix)
pnpm dlx ultracite doctor  # Diagnose Ultracite setup
```

## Conventions (Project-Specific)

### Package Management
- **Package manager**: `pnpm@10.28.2` (configured in `package.json`).
- Use `pnpm` for all dependency operations (install, add, remove).
- `pnpm-lock.yaml` is committed; regenerate via `pnpm install`.

### TypeScript
- **Configuration**: strict mode, noEmit (`tsconfig.json`).
- **Path aliases**: `@/*` and `@semantic/*` resolve to `src/*`.
- **Type imports**: Import types directly from their source (e.g., `@/types/content`), not from utility re-exports.

### MDX
- **Framework**: `@next/mdx` (configured in `next.config.ts`).
- **Components**: MDX components mapped in `mdx-components.tsx`.
- **GFM support**: `remark-gfm` plugin enabled for GitHub Flavored Markdown.

### Styling
- **Framework**: Tailwind CSS v4 via PostCSS plugin (`postcss.config.js`).
- **Global styles**: `@semantic/styles/globals.css`.
- **Font**: Geist Mono (code), Pretendard (body) via `src/app/_fonts`.

### Code Quality (Ultracite)
- **Engine**: Ultracite (built on Biome) with project-specific config.
- **Config**: `biome.jsonc` extends `ultracite/biome/core` + `ultracite/biome/next`.
- **Pre-commit**: `lint-staged` runs `pnpm dlx ultracite fix` on staged files automatically.
- **Exceptions**: `noUnknownTypeSelector` and `useFilenamingConvention` rules disabled in `biome.jsonc`.

## Anti-Patterns (This Repo)

- **Never bypass lint/format**: Always run `pnpm fix` before committing.
- **No type suppression**: Avoid `as any`, `@ts-ignore`, `@ts-expect-error`.
- **Image handling**: Use Next `<Image>` component instead of raw `<img>` for content.
- **Type imports**: Don't import types from utility re-exports; import from source directly.

## Code Standards

### General
- Prefer explicit, type-safe code; avoid `any` and implicit types.
- Use `unknown` instead of `any` when type is genuinely unknown.
- Leverage TypeScript's type narrowing instead of type assertions.
- Extract constants for magic numbers with descriptive names.

### React
- Call hooks only at top level, never conditionally.
- Specify all dependencies correctly in hook dependency arrays.
- Use semantic HTML (`<button>`, `<nav>`) instead of divs with ARIA roles.
- Provide meaningful alt text for images and proper heading hierarchy.
- Use `key` prop with unique IDs (not array indices) for iterables.

### Next.js
- Prefer App Router metadata APIs over legacy `<head>` manipulation.
- Use Server Components for async data fetching (avoid async Client Components).
- Use `next/image` for optimized images with proper `sizes` and `quality`.

### Error Handling
- Remove `console.log`, `debugger`, `alert` from production code.
- Throw `Error` objects with descriptive messages, not strings.
- Use `try-catch` blocks meaningfully; prefer early returns over nested conditionals.

### Performance
- Avoid spread syntax in accumulators within loops.
- Use top-level regex literals instead of creating them in loops.
- Prefer specific imports over namespace imports (tree-shaking).
- Avoid barrel files that re-export everything unnecessarily.
