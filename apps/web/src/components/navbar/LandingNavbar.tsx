import Link from "next/link";
import { Button } from "@repo/ui/button";

export default function LandingNavbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur border-b border-white/10">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 text-sm text-[--brand-fg]">
        <Link href="/" className="font-black tracking-tight text-lg">
          Fast<span className="text-[--brand-accent]">Drop</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="https://github.com/your-org/fast-drop"
            className="hover:text-[--brand-accent-2]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Docs
          </Link>

          <Button asChild className="rounded-full px-4 py-2 text-sm font-semibold shadow-lg">
            <Link href="/app">Launch App</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
} 