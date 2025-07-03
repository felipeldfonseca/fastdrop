# Fast Drop — **Claim Page** UI / Styling Spec

This spec turns the hand‑drawn wireframe into a production‑ready **Next.js (+ Tailwind + shadcn/ui)** page. Copy it into Claude (or other LLM) so it can generate the React components, state logic and styling.

---

## 0. High‑Level UX

| Goal             | Details                                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------------------- |
| **Primary**      | Let the user configure an **auto‑claim + swap** job for one project.                                          |
| **Secondary**    | Provide clarity on current project state (pre‑launch vs launched) & educate via FAQ.                          |
| **Entry Points** | 1) "Set up your claim" button from landing/project page → passes `?project=<slug>`.2) Direct nav to `/claim`. |

> **Dynamic logic**
>
> - If the query param or search resolves to a launched project with a claimable balance → show **L a u n c h e d** flow.
> - Otherwise, assume **Pre‑launched** → ask for schedule window.
> - If the user selects **I’m not sure**, keep only the search input visible until a project is identified.

---

## 1. Page Layout

```
<RootGrid>
  ├─ <Navbar />          # reused component
  ├─ <Header />          # "Secure your gains."
  ├─ <HowItWorksSteps /> # optional collapse on mobile
  ├─ <StateSelector />   # segmented control  ⟪ Pre‑Launched│Launched│Not sure ⟫
  ├─ <ClaimConfigurator />
  │     ├─ <WatchlistDropdown />   # variant depends on state
  │     ├─ <SearchInput />        # hidden until "Not sure" or fallback
  │     ├─ <ClaimForm />          # appears once project picked
  │     └─ <SubmitButton />       # label varies
  ├─ <FaqAccordion />   # same component reused across pages
  └─ <Footer />         # identical to landing
</RootGrid>
```

### Tailwind Grid

```ts
"max-w-5xl mx-auto px-4 grid gap-8 lg:gap-12"
```

Navbar sticks top (`sticky top-0 z-20 backdrop-blur bg-black/40`).

---

## 2. Components & State

### 2.1 StateSelector ⟪Segmented⟫

- **Implementation**: `@/components/ui/toggle-group` (shadcn).
- Values: `pre`, `live`, `unknown`.
- On change → `setClaimState()` in Zustand store.

### 2.2 WatchlistDropdown / TokensIdentifiedDropdown

| Mode     | Data source                                                                              |
| -------- | ---------------------------------------------------------------------------------------- |
| **pre**  | `useWatchlist()` → array `{ mint, symbol, status }` saved in localStorage.               |
| **live** | `useClaimableBalances()` (RPC call) returns SPL tokens with >0 balance & known programs. |

Both dropdowns share a generic `<ProjectDropdown>` component.

### 2.3 SearchInput

- Uses **Fuse.js** fuzzy search against on‑chain project index.
- Render as `Combobox` (`role="combobox" aria-expanded`).

### 2.4 ClaimForm

| Field                          | UI                                                      | Notes                            |
| ------------------------------ | ------------------------------------------------------- | -------------------------------- |
| **Amount slider**              | `type="range"` + `%` ticks 0‑100                        | Bi‑directional w/ numeric input. |
| **Out token toggle**           | `RadioGroup` → USDC / USDT                              | Default USDC.                    |
| **Slippage**                   | `Input` with `%` suffix + `HelpCircle` icon tooltip.    | Default pulled from env (3%).    |
| **Schedule (pre‑launch only)** | `DatePicker` + `TimeRangePicker` + `Select` (timezone). | Show reason tooltip.             |

Validation via **zod schema → react‑hook‑form**.

### 2.5 SubmitButton

- Label: **“Set the claim”** (pre) or **“Claim and sell now”** (live).
- Disabled until `isValid` && wallet connected.

---

## 3. Visual Style Guide

| Token            | Value                 | Usage                                         |
| ---------------- | --------------------- | --------------------------------------------- |
| `--fd-primary`   | `#14f195`             | Solana green accents (buttons, active chips). |
| `--fd-secondary` | `#9945ff`             | Secondary accents / hover.                    |
| `--fd-bg`        | `#0b0124`             | Page background.                              |
| `font-display`   | `"Sora", sans-serif`  | Headlines.                                    |
| `font-body`      | `"Inter", sans-serif` | Paragraphs/forms.                             |

Forms live inside a glass‑card: `rounded-2xl bg-white/5 backdrop-blur-md p-6 ring-1 ring-white/10`.

---

## 4. Responsive & a11y

- **Breakpoints**: Stack form fields into single column on `< md`.
- **Keyboard**: Tab order — state selector → dropdown/search → form fields → button.
- **aria‑live**: announce status chips & balance loads.

---

## 5. Code Checklist for LLM

1. Generate **directory tree** starting `apps/dashboard/app/claim/[state]/page.tsx`.
2. Create reusable hooks in `packages/core/hooks` (`useClaimSetup`, `useWatchlist`).
3. Provide sample **mock RPC** for dev: `mocks/claimable.json`.
4. Include **unit test** for `preLaunchScheduleSchema` (Vitest).
5. Show `README_claim.md` with run instructions.

> **Done criteria**: Form submits a mock object to console & shows success toast.

---

### End of spec

