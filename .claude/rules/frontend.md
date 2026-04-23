# Frontend Rules — Next.js 16 / React 19 / TypeScript / Tailwind v4

## File Size Limit

- **Hard cap: 150 lines per file** — pages, components, hooks, utils, all of it.
- When a file approaches the limit, split before it breaches — not after.
- Splitting strategy (in order of preference):
  1. Extract a child component into its own file
  2. Extract logic into a custom hook (`hooks/use-*.ts`)
  3. Extract pure helpers into `lib/` or `utils/`
  4. Extract constants into `constants/`

## Separation of Concerns

Every file must have **one clear job**. The four layers:

| Layer | Where | What lives here |
|---|---|---|
| UI | `components/` | JSX, styling, event wiring |
| Logic | `hooks/` | State, effects, derived values, handlers |
| Data | `services/` or `app/api/` | Fetch calls, cache, mutations |
| Types | `types/` | Interfaces, enums, Zod schemas |

Rules:
- No fetch calls inside components — move them to a service or a server component.
- No business logic inside JSX — extract to a hook or util.
- No inline type definitions for anything shared — put them in `types/`.
- Props interfaces go at the top of the component file (they are local, not shared).

## Component Rules

- One component per file. File name matches the component name in kebab-case (`user-card.tsx` → `UserCard`).
- Prefer **Server Components** by default. Add `'use client'` only when the component needs browser APIs, event handlers, or React state/effects.
- Never put `'use client'` on a layout or a page that doesn't need it — push it down to the smallest interactive leaf.
- Destructure props at the function signature, never inside the body.
- Do not pass more than 5 props. If you need more, introduce a typed config object or a context.
- No inline styles — Tailwind classes only. No arbitrary values unless there is no token equivalent.

## TypeScript Rules

- `strict: true` is non-negotiable — never turn off strict flags to silence errors.
- No `any`. Use `unknown` and narrow, or model the type properly.
- No non-null assertions (`!`) unless you can prove the value can never be null at that callsite — add a comment explaining why.
- Export types separately from values (`export type { Foo }`).
- Prefer `interface` for object shapes, `type` for unions and intersections.

## Next.js App Router Rules

- Pages (`app/**/page.tsx`) are Server Components unless they explicitly need client state.
- Keep pages thin — they compose sections, they do not contain UI primitives.
- Use `generateMetadata` for per-page SEO. Never leave title/description as the default.
- Always use `next/image` for images (never raw `<img>`).
- Always use `next/font` for fonts — never a `<link>` to Google Fonts.
- Use `next/link` for internal navigation — never `<a href>` to internal routes.
- Error boundaries: every route segment gets a `error.tsx`. Layouts get a `global-error.tsx`.
- Loading states: every data-dependent route segment gets a `loading.tsx`.

## Data Fetching

- Server Components fetch directly (no `useEffect`/`useState` for remote data).
- Client-side mutations use Server Actions or an API route — not a raw `fetch` in a `useEffect`.
- Never expose secrets in Client Components or `'use client'` files — API keys, tokens, DB URLs stay server-side.
- Always handle loading, error, and empty states — never assume a happy path.

## Naming Conventions

- Files: `kebab-case.tsx`
- Components: `PascalCase`
- Hooks: `useCamelCase` in `hooks/use-camel-case.ts`
- Event handlers: `handleX` (e.g. `handleSubmit`, `handleClose`)
- Booleans: `is*`, `has*`, `can*`, `should*` (e.g. `isLoading`, `hasError`)
- Constants: `SCREAMING_SNAKE_CASE` in `constants/`

## Code Hygiene

- No dead code. Remove unused imports, variables, components, and types immediately.
- No commented-out code committed to the repo — use git history.
- No `console.log` in committed code. Use a logger utility or remove before committing.
- No magic numbers or strings — name them in `constants/`.
- Prefer early returns over nested conditionals.
- Co-locate related files: a component and its dedicated hook/types can sit in a folder together if they are not reused elsewhere.

## Accessibility

- Every interactive element must be keyboard-accessible and have an ARIA label if its purpose is not conveyed by visible text.
- Images must have meaningful `alt` text (empty string `""` for decorative images).
- Color alone must never convey meaning.
- Use semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`) before reaching for `<div>`.

## Performance

- Lazy-load components below the fold with `next/dynamic`.
- Never import an entire library when a single function is needed.
- Memoize expensive computations with `useMemo`; stabilize callbacks passed to child components with `useCallback`.
- Keep the critical path (above-the-fold render) free of client-side waterfalls.
