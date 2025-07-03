# Fast Drop — Landing Page UI / Styling Spec

These guidelines tell an LLM (Claude Sonnet 4 or other) exactly **how** to translate the copy found in *“Landing Page – Fast Drop”* into a production‑ready Next.js + TailwindCSS page.

> **TL;DR** Build a minimal, snappy Solana‑styled marketing site that routes users either to the docs (GitHub) or the dApp dashboard.

---

## 1. Tech choices

| Area      | Decision                                                          |
| --------- | ----------------------------------------------------------------- |
| Framework | **Next.js 14** – app router, `/src/app` + server components       |
| Styling   | **Tailwind CSS** (no additional UI kit) + CSS variables for theme |
| Animation | **Framer Motion** for fade‑ins & slide‑ups                        |
| Icons     | **lucide‑react**                                                  |
| Deploy    | Vercel (edge‑optimized)                                           |

---

## 2. Brand Tokens

```css
:root {
  --brand‑bg:      #0d0f14;   /* dark navy */
  --brand‑fg:      #fcfcfd;   /* near‑white */
  --brand‑accent:  #02d27f;   /* Solana green */
  --brand‑accent‑2:#8247e5;   /* Solana purple */
  --brand‑muted:   #9ca3af;   /* gray‑400 */
}
```

Font stack: `Inter, Roboto, "Helvetica Neue", Arial, sans‑serif` (weights 400/600/800).

---

## 3. Layout Grid

```txt
┌─────────────────────────────────────────────┐
│ Navbar (fixed, backdrop‑blur)              │
├─────────────────────────────────────────────┤
│ Main (max‑w‑6xl mx‑auto px‑6)               │
│  ├─ Hero Section                            │
│  ├─ How It Works                            │
│  ├─ Why Fast Drop                           │
│  ├─ Dashboard Mockup                        │
│  ├─ Case Study                              │
│  ├─ Pricing                                 │
│  ├─ FAQ                                     │
│  └─ CTA + Footer                            │
└─────────────────────────────────────────────┘
```

---

## 4. **Navbar** implementation

```tsx
// src/components/Navbar.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="fixed inset‑x‑0 top‑0 z‑50 backdrop‑blur border‑b border‑white/10">
      <nav className="mx‑auto flex h‑16 max‑w‑6xl items‑center justify‑between px‑6 text‑sm text‑brand‑fg">
        {/* LOGO → always home */}
        <Link href="/" className="font‑black tracking‑tight text‑lg">
          Fast<span className="text‑brand‑accent">Drop</span>
        </Link>

        <div className="flex items‑center gap‑6">
          {/* DOCS → GitHub repo */}
          <Link href="https://github.com/your‑org/fast‑drop" className="hover:text‑brand‑accent‑2">
            Docs
          </Link>

          {/* LAUNCH APP → dashboard */}
          <Button asChild className="rounded‑full px‑4 py‑2 text‑sm font‑semibold shadow‑lg">
            <Link href="https://app.fastdrop.xyz">Launch App</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
```

### Notes

* The `<Button>` comes from **shadcn/ui**; it already pulls Tailwind styles.
* Replace GitHub and app URLs once live.
* `backdrop‑blur` + a subtle border keeps nav readable over hero.

---

## 5. Hero Section styles

```tsx
<section className="flex min‑h‑[80vh] flex‑col items‑center justify‑center gap‑6 text‑center">
  <h1 className="max‑w‑3xl text‑4xl font‑black sm:text‑6xl">
    Claim&nbsp;& Cash‑Out Your <span className="text‑brand‑accent">Solana Airdrops</span> in the First Block
  </h1>
  <p className="max‑w‑2xl text‑lg text‑brand‑muted">
    Fast Drop watches the chain 24/7 and fires an atomic claim + market‑sell transaction the second an airdrop goes live—so
    you keep the profits, not the bag‑holders.
  </p>
  <div className="flex gap‑4">
    <Button size="lg" className="rounded‑full px‑8 py‑4">Get Early Access</Button>
    <button className="flex items‑center gap‑2 text‑brand‑muted hover:text‑brand‑fg">
      <PlayIcon className="h‑5 w‑5" /> Watch Demo
    </button>
  </div>
</section>
```

---

## 6. Section headings & cards

Use semantic `<section id="how‑it‑works">`, etc. Each section gets padding `py‑24` (desktop) / `py‑16` (mobile). Headings: `text‑3xl font‑bold` with a gradient underline via `bg‑clip‑text`.

Example card grid:

```tsx
<div className="grid gap‑8 sm:grid‑cols‑3">
  {steps.map((s) => (
    <div key={s.title} className="rounded‑2xl border border‑white/10 bg‑white/2 p‑6 shadow‑hover">
      <h3 className="mb‑2 font‑semibold text‑xl">{s.title}</h3>
      <p className="text‑sm text‑brand‑muted">{s.body}</p>
    </div>
  ))}
</div>
```

---

## 7. Dark mode (default)

Site ships in dark; but wrap Tailwind with `dark:` variants if you intend to add a toggle later. Primary accent (`--brand‑accent`) should pass WCAG AA (>4.5:1) on `--brand‑bg`.

---

## 8. Responsive breakpoints

* Mobile‑first; break at `sm:` (640 px) for grid → two columns.
* Hero text scales: `text‑4xl sm:text‑6xl lg:text‑7xl`.
* Buttons: `w‑full sm:w‑auto` inside vertical stacks on mobile.

---

## 9. Footer

```tsx
<footer className="mx‑auto max‑w‑6xl px‑6 py‑12 text‑xs text‑brand‑muted">
  <div className="flex flex‑col gap‑4 sm:flex‑row sm:justify‑between">
    <span>© 2025 Fast Drop.</span>
    <span>Solana ≠ financial advice.</span>
    <span>MIT License.</span>
  </div>
</footer>
```

---

## 10. Linting & formatting rules

* ESLint + Prettier, Airbnb base.
* Commitlint conventional commits.
* Husky pre‑commit: `lint:fix` + `test`.

---

## 11. Deployment check list

1. `npm run build` (or `pnpm`) → ensure no type errors.
2. Push to `main` → GitHub Action deploys to Vercel.
3. Add custom domain `fastdrop.xyz` in Vercel dashboard.
4. Point DNS A/AAAA to Vercel.

---

## 12. Handoff

1. LLM should start by scaffolding `/src/app/layout.tsx` with the brand tokens in a global CSS.
2. Implement `<Navbar>` per section 4, then each content section.
3. Ensure all links open in new tab **except** logo & launch app.
4. Provide a screenshot (playwright or puppeteer) after build passes CI.

---

> **Feel free to extend**: gradients, parallax, extra testimonials — just keep perf budget ≤ 150 kB JS, 40 kB CSS.
