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
pnpm install
pnpm dev            # Next dev server on http://localhost:1113
pnpm build
pnpm start

pnpm lint           # ultracite check
pnpm fix            # ultracite fix
pnpm dlx ultracite doctor
```

## Conventions (Project-Specific)

- Package manager: `pnpm` (`packageManager`: `pnpm@10.28.2`).
- TypeScript: strict, noEmit; path aliases `@/*` and `@semantic/*` -> `src/*` (`tsconfig.json`).
- MDX: enabled via `@next/mdx` (`next.config.ts`); MDX components wired in `mdx-components.tsx`.
- Styling: Tailwind CSS v4 via PostCSS plugin (`postcss.config.js`).
- Lint/format: Ultracite (Biome underneath) (`biome.jsonc` extends `ultracite/biome/core` + `ultracite/biome/next`).
- Pre-commit: lint-staged runs `pnpm dlx ultracite fix` on staged files (`package.json`).

## Anti-Patterns (This Repo)

- Don’t bypass Ultracite/Biome; run `pnpm fix` before committing.
- Don’t use `as any` / `@ts-ignore` / `@ts-expect-error` to suppress type issues.
- Don’t use raw `<img>` for content images; prefer Next `<Image>`.

## Ultracite Standards (Short)

- Prefer explicit, type-safe code; avoid `any`.
- No stray `console.log`, `debugger`, `alert` in production code.
- React: hooks at top level, correct deps, semantic HTML + accessibility.
- Next.js: prefer App Router metadata APIs; use Server Components for data fetching when possible.
