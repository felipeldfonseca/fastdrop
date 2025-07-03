# Fast Drop — **News Page** Overview

*Audience: product/design discussion & narrative prompt for an LLM.  Describe the experience, ****not**** the code.*

---

## 1 · Purpose

Airdrop hunters juggle Discord pings, X threads and random YouTube alphas.  The **News** page pulls all that noise into one quiet place so they can answer:

- “What did the projects **I** care about just announce?”
- “What’s buzzing across Solana right now?”

Two feeds, one scroll, zero FOMO.

---

## 2 · Journey in Two Clicks

1. **Pick a lens** – Tabs at the top let the user flip between **Followed Projects** and **Trending Topics**.  A coloured rail glides under the active tab (just like Aave’s Supply / Borrow switch) so the change feels instant and tactile.
2. **Scan & act** – Cards stream in reverse‑chronological order.  Each shows the project badge, the platform icon (X, Discord, YouTube, On‑chain), a timestamp like “5 m ago”, and a one‑line teaser.  Click → original post opens in a new tab, and a *“Jump to project”* link zips them straight to the hub if action is needed.

A filter pill row lets them narrow the fire‑hose to **Announcements**, **Price Alerts**, **Videos**, or even **Technical Logs** for on‑chain nerds.

---

## 3 · Visual Sketch (Markdown / ASCII)

```plaintext
┌────────────────────────── NAVBAR ───────────────────────────┐
│ [Logo]      Claims  Watchlist  News*  Docs       [Connected]│
└─────────────────────────────────────────────────────────────┘

┌────── sliding‑rail tab bar ───────┐  <md: dropdown
│  ● Followed (12)   ○ Trending    │
└───────────────────────────────────┘

         All  Announcements  Price  Videos  Logs   

┌ card ───────────────────────────────────────────────────┐
│  🟢 FRAG  |  X  ·  2 m ago                              │
│  “Checker is **LIVE**!  Here’s the link …”              │
└─────────────────────────────────────────────────────────┘
┌ card … (infinite scroll)                                │
└─────────────────────────────────────────────────────────┘
                         [Mark all read]
                         
              Footer – GitHub · X · Discord • Legal
```

*Rail animates 250 ms when tab changes; new cards fade in with a subtle pulse.*

---

## 4 · Little UX Touches (non‑technical)

- **Unread dot** on the *News* nav item disappears once the user opens the page.
- **Relative times** ("just now", "3 h ago") keep cognitive load low; exact UTC on hover.
- **Mute or Pin** any feed item via ⋮ menu so noisy threads disappear and golden nuggets stay on top.
- **Mark all read** button clears the green highlights and the unread badge count.
- Infinite scroll auto‑loads the next 20 posts; a *“Jump to newest”* button floats in the corner when scrolled far down.
- Empty Followed feed shows an illustration + "Add projects to your Watchlist to get a tailored feed".

---

## 5 · Where users go next

- **Open original ↗︎** – read / like / reply on the source platform.
- **Jump to project** – land on `/project/[slug]` ready to set a claim.

The News page is the **conversation layer** of Fast Drop: one look, one click, back to hunting profits.

---

*Pair this overview with the “News Page Styling Instructions” to give an LLM both story and blueprint.*

