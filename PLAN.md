# Lament — Build Plan

**Design style:** Dark Minimal (deep dark navy background, purple/violet primary accent, white text, yellow star ratings)
**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind v4 · App Router
**Platform:** Web application — responsive, desktop + mobile

---

## Product Constraints

**Technical requirements:**
- No user authentication or accounts
- Anonymous posting tied to randomly generated avatars and usernames (new identity per review)
- Voice recording with real-time voice modification (pitch-shift for anonymity)
- Fast, simple client-side search and filter (no external search service)
- Anonymous, randomized username generation for each review submission

**MVP scope — build only these, nothing more:**
- Organization listing + search + industry filter
- Review submission (text + optional voice note)
- Anonymity system (random username/avatar at post time)
- Home feed (latest reviews across all orgs)
- Organization detail (all reviews for one org)

**Explicitly out of scope for MVP:**
- Admin dashboards or moderation tools
- User accounts, login, or sessions
- Notifications or real-time push
- External GIF/sticker APIs (use preset local stickers only)
- Complex analytics or reporting

---

## Phase 1 — Foundation

- [x] **1.1 Design tokens & global CSS**
  - Set CSS variables for color palette: `--bg-base` (dark navy ~`#0A0A14`), `--bg-surface` (card ~`#111122`), `--accent` (purple ~`#7C3AED`), `--accent-hover`, `--text-primary` (white), `--text-muted` (gray), `--star` (amber yellow)
  - Apply base background + font stack in `globals.css`
  - Configure Tailwind v4 theme to consume those vars

- [x] **1.2 Types layer** (`types/`)
  - `Review` — id, orgId, username, avatar, rating, heading, body, emoji?, voiceUrl?, timestamp, likes, dislikes
  - `Organization` — id, name, logo, industry, averageRating, reviewCount
  - `Industry` enum — Tech, Banking, Fintech, Telecom, Agriculture, Education, Healthcare
  - `SortOrder` type — Latest | Top | Lowest

- [x] **1.3 Mock data store** (`lib/store.ts`)
  - In-memory arrays for organizations (10–12 seeded entries) and reviews (20+ seeded entries)
  - Helper: `getOrgById`, `getReviewsByOrgId`, `getLatestReviews`, `addReview`, `addOrganization`
  - Avatar + username generator (random animal names + colorful avatar seeds)

- [x] **1.4 Root layout & font**
  - Import font via `next/font` (e.g., Inter or Geist)
  - Root shell: full-width dark bg, content centered up to `max-w-5xl` on desktop
  - Add `generateMetadata` for global title/description

- [x] **1.5 Responsive layout breakpoints**
  - `sm` (640px) — single column, bottom nav
  - `md` (768px) — sidebar appears, bottom nav hidden
  - `lg` (1024px) — wider content, org grid expands to 3 cols
  - `xl` (1280px) — feed gets a right sidebar panel (trending orgs)

---

## Phase 2 — Shell & Navigation

- [x] **2.1 Bottom navigation bar** (`components/bottom-nav.tsx`)
  - Mobile only (`md:hidden`): fixed bottom bar, three tabs — Home · Review · Organizations
  - Active tab highlighted with accent color + fill icon
  - Safe-area padding for mobile browsers

- [x] **2.2 Sidebar navigation** (`components/sidebar-nav.tsx`)
  - Desktop only (`hidden md:flex`): fixed left column (~220px wide)
  - Lament wordmark at top
  - Vertical nav links: Home · Organizations · Write a Review
  - Active link highlighted with accent color + left border
  - "100% Anonymous" badge pinned to bottom of sidebar

- [x] **2.3 App shell layout** (`app/(main)/layout.tsx`)
  - Mobile: full-width content + bottom nav
  - Desktop: `flex` row — sidebar (fixed, 220px) + scrollable main content area
  - Main content: `max-w-2xl` centered within its column (keeps feed readable at large widths)

- [x] **2.4 Top header** (`components/header.tsx`)
  - Mobile: sticky top bar — Lament wordmark + bell icon
  - Desktop: header hidden (sidebar handles branding); page-level titles shown inline
  - Search bar visible in header on desktop org pages

- [x] **2.5 Right panel** (`components/right-panel.tsx`) — desktop `xl` only
  - `hidden xl:block` fixed right column (~280px)
  - "Top Organizations This Week" — ranked list of 5 orgs by avg rating
  - Static for MVP (derived from mock store at render time)

---

## Phase 3 — Home Feed

- [x] **3.1 Review card** (`components/review-card.tsx`)
  - Avatar (colored circle + random animal username)
  - Timestamp (e.g., "2m ago")
  - Org name + star rating in accent/yellow
  - Review heading (bold) + body (2-line clamp, expandable)
  - Emoji reaction (optional, shown if present)
  - Like / Dislike / Share / Bookmark row

- [x] **3.2 Star rating display** (`components/star-rating.tsx`)
  - Filled/half/empty stars; size prop; read-only vs interactive variant

- [x] **3.3 Home feed page** (`app/(main)/page.tsx`)
  - Header + scrollable list of `<ReviewCard />`
  - Sorted by latest by default
  - Empty state if no reviews

- [x] **3.4 `loading.tsx`** for the home segment

---

## Phase 4 — Organizations Tab

- [x] **4.1 Organization card** (`components/org-card.tsx`)
  - Logo (colored square icon or `next/image`), name, avg rating, review count
  - Grid: 2 cols mobile → 3 cols `lg` → 4 cols `xl`

- [x] **4.2 Search bar** (`components/search-bar.tsx`)
  - Controlled input, filters org list client-side
  - Magnifier icon, clear button

- [x] **4.3 Industry filter chips** (`components/filter-chips.tsx`)
  - Horizontal scrollable row: All · Tech · Banking · Fintech · Telecom · Agriculture · Education · Healthcare
  - Active chip filled in accent color

- [x] **4.4 Organizations page** (`app/(main)/organizations/page.tsx`)
  - Search bar + filter chips + org grid
  - Client component for search/filter interactivity
  - `useOrganizations` hook (`hooks/use-organizations.ts`) — filtered/sorted list

- [x] **4.5 `loading.tsx`** for organizations segment

---

## Phase 5 — Organization Detail Page

- [x] **5.1 Detail page route** (`app/organizations/[id]/page.tsx`)
  - Back arrow + share icon in header
  - Org logo, name, avg rating (large stars), review count
  - Sort tabs: Latest · Top · Lowest
  - Scrollable review list (`<ReviewCard />`)
  - Sticky "Write Anonymous Review" CTA button at bottom

- [x] **5.2 Sort hook** (`hooks/use-sort.ts`)
  - Takes array of reviews + sort order, returns sorted copy

- [x] **5.3 `error.tsx`** for orgs/[id] segment

---

## Phase 6 — Review Flow (multi-step)

- [x] **6.1 Review flow container** (`components/review/review-flow-container.tsx`)
  - **Mobile:** full-page step-by-step flow (routed via `app/(main)/review/page.tsx`)
  - **Desktop:** rendered as a centered modal/dialog (`max-w-lg`, backdrop blur) triggered from the sidebar "Write a Review" link or org detail CTA — no full page navigation needed
  - Use a `isDesktop` media-query hook to switch between the two modes

- [x] **6.2 Review flow state** (`hooks/use-review-flow.ts`)
  - Steps: 1 SelectOrg → 2 WriteTitle → 3 WriteBody → 4 AddExtras (emoji/voice) → 5 Confirm
  - `formData` accumulator, `goNext` / `goBack`, `isOpen` / `onClose` for modal mode
  - Submit: push to store, reset, close modal (desktop) or redirect to home (mobile)

- [x] **6.3 Step 1 — Select Organization** (`components/review/step-select-org.tsx`)
  - Search input + scrollable popular org list with radio selection
  - "+ Add New Organization" option at bottom (inline mini-form: name + industry)

- [x] **6.4 Step 2 — Write a Title** (`components/review/step-title.tsx`)
  - Single text input, char counter (max 80)

- [x] **6.5 Step 3 — Write Your Review** (`components/review/step-body.tsx`)
  - Textarea, char counter (max 500)

- [x] **6.6 Step 4 — Add Extras (Optional)** (`components/review/step-extras.tsx`)
  - **Emoji picker row** — tap to append emoji to review
  - **GIF/Sticker row** — static picker with 8 preset reaction stickers (no external API needed for MVP)
  - **Star rating selector** — tap 1–5 stars (required before posting)
  - **Voice note** (`components/review/voice-recorder.tsx`):
    - Record button → waveform animation while recording → stop
    - Audio stored as `Blob` URL in state
    - "Voice will be modified for anonymity" label (modification is cosmetic in MVP — just a UI promise)

- [x] **6.7 Step 5 — Confirm & Post** (`components/review/step-confirm.tsx`)
  - Preview card (org name, rating, title, body, emoji)
  - "Post Review Anonymously" primary button
  - "100% Anonymous. No one knows it's you." reassurance line
  - Assigns random username + avatar at submission

- [x] **6.8 Step progress bar** (`components/review/step-progress.tsx`)
  - "Step X of 5" + filled dots indicator

- [x] **6.9 Review page** (`app/(main)/review/page.tsx`)
  - Mobile: hosts step machine full-page
  - Desktop: modal overlay with backdrop blur auto-renders on page load

---

## Phase 7 — Anonymous Identity System

- [x] **7.1 Avatar generator** (`lib/avatar.ts`)
  - 20 animal-word usernames (e.g., MysticOwl, SilentWolf, CalmTiger)
  - Deterministic color from username hash (6 distinct palette colors matching design)
  - Returns `{ username, color, initials }` — render as colored circle with initials

- [x] **7.2 `<Avatar />` component** (`components/avatar.tsx`)
  - Size prop (sm/md/lg), colored background, initials or emoji face

---

## Phase 8 — Polish & Accessibility

- [x] **8.1 Animations** — look up scroll-reveal / card entrance via animation-workflow MCP before implementing

- [x] **8.2 Empty states**
  - Home: no reviews yet
  - Org detail: no reviews for this org
  - Organizations: no search results

- [x] **8.3 Accessibility pass**
  - All interactive elements keyboard-accessible + ARIA labels
  - Semantic HTML throughout (`<main>`, `<nav>`, `<article>`, `<section>`)
  - Star rating interactive variant uses `role="radiogroup"`

- [x] **8.4 SEO**
  - `generateMetadata` on org detail page (org name in title)
  - Global `metadata` in root layout

- [x] **8.5 Error boundaries**
  - `error.tsx` per route segment
  - `global-error.tsx` on root layout

- [x] **8.6 `not-found.tsx`** for unknown org IDs

---

## Design Reference (Dark Minimal)

| Token | Value |
|---|---|
| Background base | `#0A0A14` |
| Surface (cards) | `#111126` |
| Surface elevated | `#1A1A30` |
| Accent (purple) | `#7C3AED` |
| Accent hover | `#6D28D9` |
| Text primary | `#FFFFFF` |
| Text muted | `#8B8BA7` |
| Star yellow | `#F59E0B` |
| Positive (like) | `#10B981` |
| Danger (dislike) | `#EF4444` |
| Border | `#2A2A45` |

---

## File Structure (target)

```
app/
  (main)/
    layout.tsx          ← shell + bottom nav
    page.tsx            ← Home Feed
    organizations/
      page.tsx
      loading.tsx
    review/
      page.tsx
  organizations/
    [id]/
      page.tsx
      error.tsx
  layout.tsx            ← root layout, font, metadata
  globals.css
  error.tsx
  global-error.tsx
  not-found.tsx

components/
  avatar.tsx
  bottom-nav.tsx          ← mobile only
  sidebar-nav.tsx         ← desktop only
  right-panel.tsx         ← xl+ only
  filter-chips.tsx
  header.tsx
  org-card.tsx
  review-card.tsx
  search-bar.tsx
  star-rating.tsx
  review/
    review-flow-container.tsx   ← switches modal vs full-page
    step-select-org.tsx
    step-title.tsx
    step-body.tsx
    step-extras.tsx
    step-confirm.tsx
    step-progress.tsx
    voice-recorder.tsx

hooks/
  use-is-desktop.ts       ← media query hook for md breakpoint
  use-organizations.ts
  use-review-flow.ts
  use-sort.ts

lib/
  avatar.ts
  store.ts

types/
  index.ts

constants/
  industries.ts
```
