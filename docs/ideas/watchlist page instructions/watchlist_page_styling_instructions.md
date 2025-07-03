# Fast Drop — **Watchlist Page** UI / Styling Spec

This spec converts the wireframe of the **Watchlist** view (`/watchlist`) into a production‑ready **Next.js + Tailwind + shadcn/ui** page.  Pair it later with the *Watchlist Page Overview* for narrative context.

---

## 0 · High‑Level UX Goals

| Goal             | Details                                                                                                                                                                                                                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Instant add**  | Single search + add bar lets users drop projects into the list with zero modal friction.                                                                                                                                                                                                                                             |
| **Glance value** | Table surfaces key signal: token name, token balance if any, token price (if any -live or from whales market), amount in dollars, status (Announced · Live checker · Ready), last update. Also, let's add a context menu to include additional actions like: set claim, remove the project, pin the project, and mute notifications. |
| **Action quick** | Row click goes straight to `/project/[slug]`; context menu enables “Set claim” / “Remove.”                                                                                                                                                                                                                                           |
| **Scalable**     | Works with 3 or 300 entries: filter pills & h‑scroll on mobile.                                                                                                                                                                                                                                                                      |

---

## 1 · Page Layout Skeleton

```plaintext
<RootGrid max‑w‑6xl>
  ├─ <Navbar />               # same component
  ├─ <Header> “Your Watchlist”
  ├─ <AddBar />               # search + add
  ├─ <WatchlistTable />       # dynamic rows
  ├─ <EmptyState />           # if list.length === 0
  └─ <Footer />
</RootGrid>
```

Grid util: `"mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 w-full max-w-6xl"`

Navbar remains sticky (`top-0 backdrop-blur bg-black/40 z-20`).

---

## 2 · Components & State

### 2.1 AddBar (Search + Add)

| Element            | Implementation                                         | Notes                                                         |
| ------------------ | ------------------------------------------------------ | ------------------------------------------------------------- |
| **Input**          | `Combobox` w/ Fuse.js fuzzy search over project index  | Placeholder: *“Add project by name, ticker or token address”* |
| **Add button**     | `IconButton` with `Plus` icon (`variant="ghost"`)      | Enter or click => `addToWatchlist(slug)`                      |
| **Keyboard**       | Shortcut **⌘/Ctrl K** focuses the input                | Power‑user flow                                               |
| **Inline results** | Dropdown list under input showing symbol + status chip | Select adds & clears input                                    |

> After addition, row appears at top of table with highlight `bg‑primary/10` for 600 ms.

### 2.2 Watchlist Table

Data hook: `useWatchlist()` → SWR localStorage + server sync.

| Column      | Details                                              |   |   |
| ----------- | ---------------------------------------------------- | - | - |
| **Project** | Logo + symbol + name                                 |   |   |
| **Tokens**  | Balance for claimable tokens (`—` if none yet)       |   |   |
| **Price**   | Recency label ( “2 h ago” ) + tooltip absolute UTC   |   |   |
| **Status**  | Pill: Ready / Live checker / Announced               |   |   |
| **Actions** | • Set Claim • Remove • Mute • Pin (context menu / ⋮) |   |   |

- **Row click**: navigate to `/project/[slug]`.  Use `animate-highlight` class on arrival.
- **Drag‑reorder**: `<SortableContext>` optional; persists `order` in localStorage.
- Poll backend every **1 hour**; silent refresh (no flash).
- Long lists (>25) expose filter pill bar (`All · Ready · Live · Announced`).

### 2.3 EmptyState

```html
<div class="text-center py-16">
  <Sparkles class="w-8 h-8 mx-auto text-fd-primary" />
  <p class="mt-4 text-lg font-semibold">No projects yet</p>
  <p class="text-muted-foreground">Search above to start tracking upcoming airdrops.</p>
</div>
```

---

## 3 · Visual Tokens

| Token          | Value       | Usage                     |
| -------------- | ----------- | ------------------------- |
| `--fd-primary` | `#14f195`   | Add button, active pills  |
| `--fd-bgCard`  | `#ffffff0d` | Table row BG, glass cards |
| `font-display` | `Sora`      | Page title                |
| `font-body`    | `Inter`     | Everything else           |

Table: `bg-[--fd-bgCard] backdrop-blur rounded-xl overflow-x-auto ring-1 ring-white/10`.

---

## 4 · Responsiveness & a11y

- Input + button wrap to 100 % width on `< md`; button shrinks to icon‑only.
- Table becomes `overflow-x-auto` on mobile; header sticks top of scroll.
- `role="table"`, `aria-sort` & live region for balance updates.

---

## 5 · Code Checklist for LLM

1. Scaffold under `app/(main)/watchlist/page.tsx`.
2. Implement `useWatchlist()` with mock data + localStorage fallback.
3. Build `<AddBar>`, `<WatchlistTable>`, `<EmptyState>` components.
4. Add unit test for `addToWatchlist` util (handles dedupe, order).
5. Lint & test pass (`eslint`, `pnpm test`).

> **Done criteria**: User can add/remove projects in‑browser (localStorage), reorder rows, and click through to hub pages.

---

### End of spec

