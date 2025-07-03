# Fast Drop — **News Page** UI / Styling Spec

This spec turns the wireframe of the **News** view (`/news`) into a production‑ready screen using **Next.js 14 + TailwindCSS 3 + shadcn/ui**.  Pair it later with the forthcoming *News Page Overview* for narrative context.

> Goal: surface real‑time updates from projects the user follows **and** broader market trends, in a feed that’s easy to scan on desktop and mobile.

---

## 0 · High‑Level UX Goals

| Goal                       | Details                                                                                                                        |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Quick context switch       | Two tabs: **Followed Projects** and **Trending Topics**.  Default to Followed if the user has ≥1 watchlisted project.          |
| Scan‑friendly cards        | Each update shows: project badge, platform icon (X, Discord, YouTube, On‑chain), truncated content, relative time (“2 m ago”). |
| Low cognitive load filters | Pill filter row: `All · Announcements · Price Alerts · Videos`. Persist last choice in localStorage.                           |
| Light on resources         | Backend aggregates & caches sources; front‑end fetches first 20 items SSR, then client polls every **5 min** via SWR.          |

---

## 1 · Layout Overview (Desktop ≥ md)

```plaintext
┌────────────────────────── NAVBAR ───────────────────────────┐
│ [Logo]        Claims Watchlist News* Docs       [Connected] │
└─────────────────────────────────────────────────────────────┘

┌──────────── sliding‑railtab bar ────────────┐  <md: becomes dropdown
│  ● Followed (12)   ○ Trending               │
└─────────────────────────────────────────────┘

┌── Filter pills ────────────────────────────────────────────┐
│ All  Announcements  Price Alerts  Videos  Technical Logs   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────── FEED COLUMN ────────────────────────┐
│  ┌ card ────────────────────────────────────────────────┐  │
│  │  🟢 FRAG  |  X   ·  2 m ago                          │  │
│  │  “Checker is **LIVE**! ‑ here’s the link …”          │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌ card …                                                  │
│  └──────────────────────────────────────────────────────┘  │ 
│                         ↑ infinite scroll                  │
└────────────────────────────────────────────────────────────┘
                       [Mark all read]
                       
               Footer – GitHub · X · Discord • Legal              
```

---

## 2 · Key Components

### 2.1 Tab Bar  — sliding rail variant

| Prop / Part      | Implementation                                                                                                                          | Notes                                                                                           |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **Sliding rail** | `relative` parent; add `::after` pseudo with `absolute bottom-0 h-0.5 bg-primary rounded-full transition-all`.                          | Width = 65 % of tab label; start under **Followed**, animates via `translate-x-full` on change. |
| **Active label** | `text-primary font-semibold`                                                                                                            | Non‑active: `text-muted-foreground`.                                                            |
| **Interaction**  | Click or arrow‑keys (`role="tablist"`); on change: swap active index, update `transform` of rail with Tailwind `duration-300 ease-out`. |                                                                                                 |
| **Badge count**  | Small pill `bg-primary/20 text-primary text-xs px-1.5 rounded` right of label                                                           | Shows number of unseen items after filters.                                                     |
| **Mobile**       | Below `md`, replace with `<Select>` using same options; rail is hidden.                                                                 |                                                                                                 |

### 2.2 Filter Pills

| Pill           | Styles                           | Notes                          |
| -------------- | -------------------------------- | ------------------------------ |
| All            | `btn-ghost`                      | Always first                   |
| Announcements  | `btn-outline`                    | Maps `type === 'announcement'` |
| Price Alerts   | `btn-outline`                    | Maps `type === 'price'`        |
| Videos         | `btn-outline`                    | YouTube embeds                 |
| Technical Logs | `btn-outline` `hidden lg:inline` | On‑chain program log items     |

### 2.3 Feed Card

| Section   | Tailwind / UI                                     | Content                                              |
| --------- | ------------------------------------------------- | ---------------------------------------------------- |
| Header    | flex row gap‑2                                    | • Project badge (logo) • Platform icon • time‑ago    |
| Body      | `prose-sm`                                        | Truncated Markdown (max 200 chars)                   |
| Footer    | text‑muted‑fg                                     | “Open original ↗︎” • if relevant → “Jump to project” |
| Animation | `animate‑pulse` for 400 ms when item first mounts |                                                      |

### 2.4 Empty & Loading States

- **Loading**: 5 skeleton cards SSR + shimmer.  Replace as data streams in.
- **Empty Followed**: Illustration + CTA “Add projects to your Watchlist to see tailored news.”
- **Empty Trending**: “No big stories right now — check back later.”

### 2.5 Actions Row

Right‑aligned small button: **Mark all as read** – clears highlight state stored in Zustand.

---

## 3 · Colour & Type Tokens

| Token           | Value                    |
| --------------- | ------------------------ |
| `--fd-primary`  | `#14F195` (Solana green) |
| `--fd-surface`  | `#121212`                |
| `--fd-muted-fg` | `#A0A0A0`                |
| Font headings   | Inter ‑w700              |
| Font body       | Inter ‑w400              |

---

## 4 · Responsiveness & A11y Checklist

- Tab bar collapses to dropdown below `md`.
- Feed cards full‑width on mobile (`w-full`) with `p-3`.
- `aria-live="polite"` on feed container so screen readers announce new cards.
- Keyboard ‑ arrow‑up/down scroll lock on feed for accessibility.

---

## 5 · Implementation Hints for the LLM

1. Pre‑fetch first page SSR (`getStaticProps` or RSC) so content appears instantly.
2. Use SWR mutate every 5 min; diff new IDs to mark `isNew`.
3. Persist `filters` and `tab` in `localStorage` for return visits.
4. Deduplicate posts by `hash(title + timestamp)` before state update.

Ready for build — hand this plus the upcoming Overview to Claude or your favourite LLM and generate the full React page!

