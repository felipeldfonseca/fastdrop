"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@repo/ui/button";
import { cn } from "@repo/ui/utils";

const navigation = [
  { name: "Home", href: "/app" },
  { name: "Claims", href: "/claim" },
  { name: "Watchlist", href: "/watchlist" },
  { name: "News", href: "/news" },
  { name: "Docs", href: "https://github.com/your-org/fast-drop", external: true },
];

export default function AppNavbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-black/40 border-b border-white/10">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 text-sm">
        <Link href="/" className="font-black tracking-tight text-lg">
          Fast<span className="text-[--fd-primary]">Drop</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "relative px-3 py-2 text-sm font-medium transition-colors hover:text-[--fd-primary]",
                pathname === item.href
                  ? "text-[--fd-primary] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[--fd-primary] after:content-['']"
                  : "text-muted-foreground"
              )}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
            >
              {item.name}
              {item.name === "News" && (
                <span className="ml-1 h-2 w-2 bg-[--fd-primary] rounded-full animate-pulse" />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-[--fd-primary] text-[--fd-primary] hover:bg-[--fd-primary] hover:text-black"
          >
            Connect
          </Button>
        </div>
      </nav>
    </header>
  );
} 