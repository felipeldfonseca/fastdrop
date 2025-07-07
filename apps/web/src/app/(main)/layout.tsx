import Link from "next/link";
import { Button } from "@repo/ui/button";
import Footer from "@/components/landing/Footer";

function AppNavbar() {
  return (
    <header className="sticky top-0 backdrop-blur bg-black/40 z-20 border-b border-white/10">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 text-sm">
        <Link href="/" className="font-black tracking-tight text-lg text-white">
          Fast<span className="text-[#14f195]">Drop</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/app"
            className="text-muted-foreground hover:text-white transition-colors"
          >
            Claims
          </Link>
          <Link
            href="/watchlist"
            className="text-muted-foreground hover:text-white transition-colors"
          >
            Watchlist
          </Link>
          <Link
            href="/news"
            className="text-muted-foreground hover:text-white transition-colors"
          >
            News
          </Link>
          <Link
            href="/docs"
            className="text-muted-foreground hover:text-white transition-colors"
          >
            Docs
          </Link>

          <Button size="sm" className="bg-[#14f195] hover:bg-[#14f195]/90 text-black font-semibold">
            Connect Wallet
          </Button>
        </div>
      </nav>
    </header>
  );
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[--brand-bg] text-[--brand-fg] flex flex-col">
      <AppNavbar />
      <main className="py-8 pt-24 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
} 