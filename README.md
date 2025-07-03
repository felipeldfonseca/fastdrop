# FastDrop

**FastDrop: A lightning-fast web interface to claim and liquidate newly-airdropped tokens in the very first blocks, so you don't get caught in the post-airdrop dump.**

---

### Key Concepts

- **Wallet Support:** Designed to work with standard wallet adapters.
- **Claim & Liquidate:** The core goal is to enable users to claim and sell their airdropped tokens as quickly as possible.
- **User-Friendly Interface:** A clean, responsive UI for managing your airdrops.

### Tech Stack

- **Next.js 14:** Using the App Router and React 18.
- **Turborepo:** High-performance build system for monorepos.
- **TypeScript:** For end-to-end type safety.
- **Tailwind CSS & shadcn/ui:** For a clean, modern, and responsive UI.

### Project Structure (Monorepo)

```
.
├─ apps/
│  └─ web/        # Next.js front-end application
├─ packages/
│  ├─ core/       # Core business logic (pure TS)
│  ├─ ui/         # Shared React components
│  └─ tsconfig/   # Shared TypeScript configurations
└─ docs/
   └─ ...         # Project documentation and ideas
```

### Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-org/FastDrop.git
    cd FastDrop
    ```

2.  **Install dependencies:**
    *(This project uses pnpm for package management. Ensure you have it installed: `npm install -g pnpm`)*
    ```bash
    pnpm install
    ```

3.  **Launch the development server:**
    ```bash
    pnpm --filter web dev
    ```

The application will be available at `http://localhost:3000`.

### Disclaimer

This software is experimental. Use at your own risk. The maintainers are not responsible for any financial losses.

### License

MIT