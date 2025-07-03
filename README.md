Solana Airdrop Fast‑Sell Dashboard
Fast Drop: A lightning‑fast web interface that claims and liquidates newly‑airdropped SPL tokens on Solana in the very first blocks, so you don't get caught in the post‑airdrop dump.

✨ Key Features
Category
Details
Wallet support
Phantom, Backpack & any Wallet‑Standard adapter (connect/disconnect, sign)
Atomic claim + swap
Pre‑build claim + Jupiter swap instructions in a single transaction with priority fee
Modular claim engine
Each airdrop lives in its own plugin that implements a ClaimAdapter interface → drop‑in support for new token distributions
Fallback routes
Automatic fail‑over from Jupiter → Meteora → Orca
Simulation mode
Dry‑run transactions for testing risk‑free
Real‑time logs
WebSocket feed of transaction status & P/L

🏗️ Tech Stack
	•	Next.js 14 (app router, React 18, Turbopack)
	•	TypeScript end‑to‑end
	•	Tailwind CSS + shadcn/ui for a clean, responsive UI
	•	Solana web3.js v1.97 for wallet, transaction building & sending
	•	Jupiter Quote & Swap API v6 for best‑route discovery
	•	Zustand for global state management
	•	tRPC for typesafe API routes (optional Supabase edge functions)
	•	Vitest + Testing Library for unit & component tests

📂 Project Structure (Monorepo)
.
├─ apps/
│  └─ web/                      # Next.js front‑end
├─ packages/
│  └─ core/                     # Claim & swap logic (pure TS)
│      ├─ claim.ts
│      ├─ swap.ts
│      └─ utils.ts
├─ scripts/                     # CLI helpers (simulate, airdrop‑watcher)
└─ docs/
    └─ architecture.mmd         # mermaid diagrams

🛠️ Getting Started
# 1. Clone & install (pnpm recommended)
git clone https://github.com/your‑org/sol‑airdrop‑fast‑sell.git
cd sol‑airdrop‑fast‑sell
pnpm install

# 2. Copy env → fill in credentials
cp .env.example .env.local

# 3. Launch dev server
pnpm --filter web dev
Required ENV vars (.env.local)
Key
Example
Purpose
NEXT_PUBLIC_RPC_URL
https://rpc.ankr.com/solana
Solana RPC endpoint
NEXT_PUBLIC_JUPITER_ENDPOINT
https://quote-api.jup.ag/v6
Jupiter Quote API
HOT_PRIVATE_KEY
["12","34",…]
Base58/JSON private key for hot wallet
DEFAULT_SLIPPAGE_BPS
300
3 % slippage
TELEGRAM_BOT_TOKEN
123:ABC
(optional) alerts
TELEGRAM_CHAT_ID
‑100123
–

🏃‍♂️ Usage Workflow
	1	Connect your wallet ➜ grant signature rights for hot key.
	2	Select the airdrop (auto‑detected via on‑chain program IDs or manual mint entry).
	3	Choose percentage to market‑sell & slippage.
	4	Hit Enable Auto‑Sell → bot listens; when claim opens it submits the pre‑built tx.
	5	View live logs & PnL; download signed tx for audit if desired.
📈 FRAG Test Scenario
For the FRAGmetric airdrop already claimed:
pnpm cli:swap \
  --mint FRAGXxXxXxXxXxXxXxXxXxXxXxXxXxXxX \
  --amount 5409.89812 \
  --out "USDC" \
  --slippage 5 \
  --priority 200000
Check the result on Jupiter TX lookup.

🛣️ Roadmap
	•	Integrate Jito block engine for even higher priority
	•	UI presets (Full exit / 50 % / ladder)
	•	Historical charts & analytics
	•	Cross‑chain expansion

⚠️ Disclaimer
This software is experimental. Transactions on Solana are irreversible; use at your own risk. The maintainers are not responsible for financial losses.

📜 License
MIT © 2025‑present SolAirdrop Contributors