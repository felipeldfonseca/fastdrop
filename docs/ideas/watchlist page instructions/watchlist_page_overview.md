# Fast Drop — **Watchlist Page** Overview

*Audience: product/design discussion & narrative prompt for an LLM.  Emphasise what the user sees, feels and achieves – ****not**** the code.*

---

## 1 · Purpose

The Watchlist is the hunter’s personalised radar.  It answers, at a glance:

- *“Where do my chosen airdrops stand right now?”*
- *“Which of them need action?”*

Users come here after they’ve discovered projects on the **App Index** or **Project hub** and decided “Yes, keep an eye on this one.”  From then on, the Watchlist is their daily check‑in page.

---

## 2 · Journey in Three Simple Steps

1. **Add**  – Search or pick from auto‑suggest and press the “+” icon.  The project slides into the table with a gentle highlight so the user sees it was added.
2. **Scan** – Column pills (Status, Price, Amount) tell the story: *Ready to claim*, *Live checker*, or *Announced* in grey.  Rows can be re‑ordered via drag‑handle so the user keeps priorities on top.
3. **Act**  – Hover the row and a context menu (⋮) appears with: **Set Claim · Remove · Mute · Pin**.  Clicking **Set Claim** jumps straight to the Claim page with that project pre‑selected.

---

## 3 · Visual Sketch (Markdown ASCII)

```plaintext
┌────────────────────────── NAVBAR ───────────────────────────┐
│ [Logo]       Claims  Watchlist*  News  Docs       [Connect] │
└─────────────────────────────────────────────────────────────┘

              Add a project you want to follow
   ┌────────────────────────────────────────────────┐  
   │  🔍  Type ticker, name, or mint address…    [+]│ 
   └────────────────────────────────────────────────┘  

   (Inline suggestions drop down here as the user types)

┌──────────────────────────────────────────────────────────────────┐
│                          MY WATCHLIST                            │
├──────────┬────────┬─────────┬──────────────────┬─────────────────┤
│ Project  │ Tokens │ Price   │ Amount Held      │ Status          │
├──────────┼────────┼─────────┼──────────────────┼─────────────┐───┤
│ FRAG     │  0.012 │ 5 409.9 │ $ tokens x price │ Ready 🟢    │ ⋮ │
│ ZRO      │  —     │ 0       │        -         │Announced ⚪ │ ⋮ │
│ VOID     │  0.42  │ 980     │ $ tokens x price │Live chk 🟠  │ ⋮ │
└──────────┴────────┴─────────┴──────────────────┴─────────────┴───┘
      Drag‑handle         Pill colours map urgency            

Footer – GitHub · X · Discord • Legal links                  
```

---

## 4 · Little UX Touches that Matter

- **Keyboard shortcut**  – `⌘/Ctrl + K` jumps focus to the Add‑search bar.
- **Row highlight on update**  – If Status shifts to *Ready*, the row pulses a light green once so the user notices.
- **Empty state**  – Illustration + copy: “Nothing here yet. Search above to start tracking drops.”
- **Long lists**  – If rows > 25, a filter pill (`All · Ready · Live · Announced`) appears above the table. Let the user order by status at all times.
- **Persistence** – Watchlist lives in backend **and** localStorage so guests can build it before connecting a wallet.

---

## 5 · Where can users go next?

- **Click project name**  → Project hub `/project/[slug]`
- **Context menu › Set Claim** → Claim page with project pre‑loaded `/claim?project=slug`
- **Context menu › Set Claim / Remove / Mute / Pin**  manage the list without leaving the page.

That’s it – a single, focused surface where hunters keep tabs on the drops that matter to them, ready to strike when status flips to *Ready to claim*.  Keep it swift, scannable, and distraction‑free.

