# Fast Drop — **App Index Page** Overview

*Audience: product/design discussion & high‑level prompt for an LLM. Focus on what the user sees and does, ****not**** the code details.*

---

## 1. Why this page exists

After launching the app, logging in or returning from a project, users land on the **App Index Page**.  Here they can, at a glance:

1. **Search** for any airdrop project and jump to its dedicated hub.
2. **Scan what’s trending** right now and dive deeper with a single click.
3. Head straight to the **generic Claim setup** if they already know what they want to do.

The mantra is *“one project → one hub → one action.”*  This page is the **launch pad** for that journey.

---

## 2. User journey in plain words

1. **Spot the headline** “Front‑run the dump.”  They instantly get the promise.
2. **Type** a ticker (e.g. `FRAG`), project name, or mint an address into the always‑focused search bar.
   - Autocomplete suggests matches; **Enter** or click sends them to `/project/FRAG…`.
3. **OR** glance at the **Trending Tokens** table below; click a row to reach the same project hub.
4. **OR** hit the persistent **“Set up your claim”** button to open the generic Claim Page if they just want to configure a job.
5. Scroll past the table they’ll see a tiny disclaimer and, further down, the familiar social footer.

At every step, the nav bar (logo, Claims, Watchlist, News, Docs, Connect) stays sticky for instant context switching.

---

## 3. Visual Sketch (Markdown / ASCII)

```plaintext
┌────────────────────────────── NAV BAR ──────────────────────────────┐
│ [Logo]            Claims  Watchlist  News  Docs           ○ Connect │      
└─────────────────────────────────────────────────────────────────────┘

                        Front‑run the dump.
     Claim and liquidate airdrops before the price tanks.

   [ Search  │ What project are you looking for? ]  
                  
                  [Set up your claim]

┌──────────────  TRENDING TOKENS  ─────────────────┐
│ Project | Tokens | Price | Amount | Status       │
├─────────┼────────┼───────┼────────┼──────────────┤
│ FRAG    | 5 409  | $0.012| $65.10 | Ready 💚     │
│ METRIC  | 1 200  | $0.085| $102.0 | Live🟠       │
│ …       |  …     |   …   |   …    | Announced ⚪ │
└──────────────────────────────────────────────────┘

      *Prices for unreleased tokens are estimates from pre‑market feeds.*

──────────────────   Social icons · Privacy · ©2025 Fast Drop ─────────
```



---

## 4. Little touches that matter (non‑technical)

- **Always‑on search focus** & `⌘/Ctrl K` shortcut mean power users never reach for the mouse.
- **Unread dot** on “News” in the nav hints at fresh intel without shouting.
- Trending rows **silently refresh** every hour, so numbers don’t jump around and gas stays cheap.
- If a project in the search is already **claimed & sold**, it appears greyed out—no more dead ends.
- On small screens, the table scrolls sideways. The Search + CTA always stack vertically with comfy spacing.
- Poking “Set up your claim” from here lands on `/claim` blank but ready—perfect for users who already have the mint in mind.

---

## 5. Voice & tone cues

- **Punchy & confident** headline, supportive but concise sub‑copy.
- Micro‑copy stays action‑oriented: *“Jump to project”*, *“Add to Watchlist”*, *“Set up claim”*.
- Disclaimers are plain‑English, no legalese.

---

*End of Overview – pair with the “Main App Page Styling Instructions” for full build details.*

