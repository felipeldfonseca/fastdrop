# Fast Drop — **Main App Page** (Landing/Dashboard) UI / Styling Spec

This spec converts the hand‑drawn wireframe of the \*\*first page users see after launching the app \*\*\`\` into a production‑ready **Next.js + Tailwind + shadcn/ui** screen.

> Use this side‑by‑side with the upcoming *App Page Overview* so an LLM has both the “how it feels” and the “how to build it”.

---

## 0. High‑Level UX Goals

| Goal               | Details                                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------------------ |
| **Instant Search** | Encourage users to type a project ticker/mint and jump straight to its hub page ( `/project/[slug]` ). |
| **Focus Actions**  | Secondary CTA: Trending Tokens → quick scan → click row to open hub.                                   |
| **Always Ready**   | Wallet `Connect` button persists in nav; table & search work even if no wallet (read‑only).            |
| **Brand Cohesion** | Same dark glass aesthetic, Solana green accents, sticky translucent navbar.                            |

---

## 1. Page Layout Skeleton

```plaintext
<RootGrid max‑w‑6xl>
  ├─ <Navbar />                           # [Logo] Claims Watchlist News Docs ○Connect
  ├─ <Hero />                             # Headline + sub + search + CTA button
  ├─ <TrendingTokens />                   # Live table (sticky header)
  ├─ <Disclaimer />                       # Small text under table
  ├─ <SocialFooter />                     # Icons + legal links (reuse)
</RootGrid>
```

### Tailwind container

```ts
"mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-6xl grid gap-12"
```

Navbar: `sticky top-0 z-20 backdrop-blur bg-black/40`

---

## 2. Component Details & State

### 2.1 Navbar

- **Active link underline** (`after:content-[''] w-full h-0.5 bg-fd-primary`).
- `Connect` → WalletKit modal; once connected show `0x123…abcd ▾` dropdown (copy, disconnect).
- Unread dot on "News" when there are fresh items (global SWR key `news/unread`).

### 2.2 Hero — App Index version

| Element           | Implementation                                                                                                                                     | Notes                                                                                                      |   |   |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | - | - |
| **Headline**      | `<h1 className="text-4xl md:text-5xl font-display">Front‑run the dump.</h1>`                                                                       | Single, punchy line taken from the sketch.                                                                 |   |   |
| **Sub‑copy**      | `<p className="text-lg text-muted-foreground max-w-prose">Claim and liquidate your airdrop tokens in the first blocks—before the price tanks.</p>` | Keep it to \~90 chars so it sits on two lines max on desktop.                                              |   |   |
| **Search**        | Re‑use the `Combobox` component (ticker/mint fuzzy search). Autofocus on mount, global shortcut **⌘/Ctrl K**. Emits `{ slug, display }` on select. | Placeholder: *“What project are you looking for?”*                                                         |   |   |
| **Primary CTA**   | `<Button variant="secondary">Set up your claim</Button>` → `router.push('/claim')`.                                                                | Always enabled; jumps straight to the generic Claim page where the user can pick or paste a project later. |   |   |
| **Keyboard flow** | Enter inside Search triggers and jumps straight to the token's hub page                                                                            | Reduces one click for power users.                                                                         |   |   |
| **Responsive**    | Stack Search and CTA vertically on `< md`.                                                                                                         | Maintain 24 px gap (`space-y-6`) between elements.                                                         |   |   |

### 2.3 TrendingTokens table TrendingTokens table

- Component path: `components/TrendingTokens.tsx`.
- Data hook: `useTrendingTokens()` (SWR to `/api/trending?limit=10`).
- Columns: **Project • Tokens • Price • Amount (≈\$) • Status pill**.
- **Row click** → router push `/project/[slug]`.
- **Status pill colours**: ready=green, live=amber, announced=slate.
- Skeleton rows (`animate-pulse`) while loading.
- Poll every **1 hour**; refresh silently without row‑flash to keep RPC costs low.(`bg-primary/10` for 1 s).

### 2.4 Disclaimer

```html
<p class="text-xs text-muted-foreground mt-4">
  Tokens not yet launched display estimated prices from pre‑market platforms; they are not guaranteed.
</p>
```

### 2.5 Footer

Reuse global `<Footer />` – icons (GitHub, X, Discord), links (Help Center, Privacy, ©2025 Fast Drop).

---

## 3. Style Tokens (Tailwind CSS custom properties)

| Token          | Value     | Where used                 |
| -------------- | --------- | -------------------------- |
| `--fd-primary` | `#14f195` | Links, active nav, buttons |
| `--fd-accent`  | `#9945ff` | Hover gradients, pills     |
| `--fd-bg`      | `#0b0124` | Body background            |
| `font-display` | `"Sora"`  | Headlines                  |
| `font-body`    | `"Inter"` | Body / table               |

Cards & table rows sit on `bg-white/5 backdrop-blur rounded-xl ring-1 ring-white/10`.

---

## 4. Responsive & Accessibility

- On `< md` breakpoint:
  - Navbar menu collapses into hamburger; `Connect` stays visible right‑aligned.
  - Hero search bar becomes full‑width, CTA stack below.
  - Trending table becomes **h‑scroll** (`overflow-x-auto`) with min‑width columns.
- `role="table"` / `role="row"` markup for assistive tech.
- `aria-live="polite"` on price cells so screen readers announce changes.

---

## 5. Code Checklist for LLM

1. **Directory tree** starting `apps/dashboard/app/(main)/page.tsx`.
2. Implement `useTrendingTokens()` hook with mock JSON fallback.
3. Provide `Navbar`, `Hero`, `TrendingTokens`, `Footer` components.
4. Add unit test for the price‑flash diff util (`diffFlash.ts`) using Vitest.
5. Ensure page passes `eslint --max-warnings 0` & `pnpm test`.

> **Done criteria**: Search navigates to `/project/[slug]`; clicking a trending row does the same; table updates every hour with mock API.

---

### End of spec

