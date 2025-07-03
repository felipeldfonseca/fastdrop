# Fast Drop — **Claim Page** Overview

*Audience: product/design discussion & high‑level prompt for an LLM.  Focus on what the user sees and does, ****not**** the code implementation.*

---

## 1. Purpose

The Claim Page is where a hunter actually **tells Fast Drop what to do** for a specific airdrop:

1. Pick the token (live or upcoming).
2. Choose how much to market‑sell and the basic safety rails (slippage, time window).
3. Fire off the job and relax.

Everything else (fancy analytics, logs) lives elsewhere.  This screen is deliberately focused and linear so users don’t overthink.

---

## 2. User Flow in Plain Words

1. **Pick your scenario** – a three‑way toggle at the top:
   - **Pre‑Launched** – token isn’t live yet; schedule a claim window.
   - **Launched** – claim is open now; sell the balance immediately.
   - **I’m Not Sure** – don’t know the status; search will figure it out.
2. **Select the token**
   - If you chose *Pre‑Launched*: open the **Watchlist** dropdown (projects you bookmarked).  Can’t find it? Type in the search bar and add it.
   - If you chose *Launched*: open **Tokens Identified** (wallet scan of claimable mints).  Again, search bar as fallback.
3. **Configure the job** (appears only after a token is locked‑in)
   - **Amount slider + input** – drag from 0‑100 % or type an exact number.
   - **Payout token switch** – USDC or USDT.
   - **Slippage field** – tiny help‑icon explains why this matters.
   - **For Pre‑Launched only:** pick **day** & **2 h watch window** (or toggle *24 h watch*).
4. **Submit**
   - Button label changes by mode: `Set the Claim` *or* `Claim & Sell Now`.
   - Progress banner shows *Waiting → Signing → Sent* and links to Solscan.

---

## 3. Visual Sketch (Markdown) - Pre-Launched Mode

```plaintext
┌──────────────────── NAV BAR (unchanged) ───────────────────────────┐
│  [Logo]  Claims  Watchlist  News  Docs            [Connect] (btn) │
└─────────────────────────────────────────────────────────────────────┘

                 Secure your gains.  <small tagline>

   ┌──── Segmented Control ──────────────────────────────────────┐
   │  ● Pre‑Launched   ○ Launched   ○ I’m Not Sure              │
   └─────────────────────────────────────────────────────────────┘

   ▼ If Pre‑Launched                                        ▼ If Launched
   ┌──── Watchlist ▼ ─────────────┐                       ┌──── Tokens Identified ▼ ─┐
   │  [SOL21]  Solend …           │                       │  [FRAG]  Fragmetric      │
   │  [HONEY]  Hivemapper         │                       │  [PYTH]  Pyth Network    │
   └──────────────────────────────┘                       └───────────────────────────┘
   (Search bar pops up under either list when user types)

   ── After token chosen ─────────────────────────────────────────────
   [Token logo]  **PROJECT NAME**  (status chip)

   Amount to sell      (USDC • USDT toggle)
   ┌────────────────────────┐      ┌──────────────────────┐
   │  1234.5678  TOKEN      │      │  678.90  USDC        │
   └────────────────────────┘      └──────────────────────┘
                0%   |——— slider ———|   100 %

   Slippage tolerance  [%] (tooltip “why this matters”)   

   [Calendar ▾]   [00:00‑02:00 ▾]  [UTC ▾]   ← only for Pre‑Launched

   ┌───────────────────────────────┐
   │   Claim & Sell Now            │   OR   │   Set the Claim           │
   └───────────────────────────────┘

Progress bar / banner with live tx status

FAQ accordion  |  Same global footer
```

*(Tip for the LLM: treat the left and right columns as conditional renders, not separate pages.)*

---

### Visual Sketch — *Launched* Mode

```plaintext
┌──────────────────── NAV BAR ───────────────────────────────┐
│  [Logo] Claims Watchlist News Docs         [Connected ✔]  │
└─────────────────────────────────────────────────────────────┘

          Secure your gains before the dump hits.

   ┌── Segmented Control ────────────────────────────────┐
   │  ○ Pre‑Launched   ● Launched   ○ I’m Not Sure       │
   └──────────────────────────────────────────────────────┘

   ▼ Tokens Identified
   ┌──────────────────────────────────────────────────────┐
   │   [FRAG] Fragmetric                                 │
   │   [JTO]  Jito                                       │
   │   [PYTH] Pyth Network                               │
   └──────────────────────────────────────────────────────┘

   (search fallback input appears here if needed)

   ── After selecting **FRAG** ────────────────────────────
   [Logo] **FRAGMETRIC**   🟢 Ready to Claim

   Amount to sell  (Payout: USDC • USDT)
   ┌──────────────────────────┐  → user’s FRAG balance
   │  5 409.8981  FRAG        │
   └──────────────────────────┘
          0% |—— slider ——| 100 %

   Slippage tolerance  [%]  (ℹ︎ Why this matters)

   ┌─────────────── Claim & Sell Now ───────────────┐
   │   (disabled until wallet + form are valid)     │
   └─────────────────────────────────────────────────┘

Progress banner
[ Waiting… ]  →  [ Signing… ]  →  [ Sent ✅  View on Solscan ]

FAQ accordion  |  Same global footer
```

*(Tip for the LLM: this sketch shows ONLY the Launched path; the Pre‑Launched path has its own sketch above.)*

## 4. Tone & Micro‑Copy

- Friendly but pragmatic (“Secure your gains”, “Grab profit before the dump”).
- Replace jargon with tooltips; beginners feel guided, pros skip ahead.
- Disable primary button until wallet **and** form are valid, but keep it visible (greyed‑out) so the CTA location never jumps.

---

## 5. Tiny UX Nudges (non‑technical)

- Remember last mode (Pre‑Launched, etc.) per device so returning users start where they left off.
- If `status = Ready to Claim` and no job exists, make the status pill pulse gently for 5 min → subtle call‑to‑action.
- After submission, keep the form state frozen & display a success card rather than resetting everything (prevents “Did it work?” anxiety).

---

*Now pair this overview with the technical ****Claim Page Styling Spec**** so the LLM has both the narrative and the implementation blueprint.*

