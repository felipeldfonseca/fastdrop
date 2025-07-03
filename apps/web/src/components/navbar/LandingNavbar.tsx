"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@repo/ui/button";
import { cn } from "@repo/ui/utils";

const landingNavigation = [
  { name: "Docs", href: "https://github.com/your-org/fast-drop", external: true },
];

const appNavigation = [
  { name: "Home", href: "/app" },
  { name: "Claims", href: "/claim" },
  { name: "Watchlist", href: "/watchlist" },
  { name: "News", href: "/news" },
  { name: "Docs", href: "https://github.com/your-org/fast-drop", external: true },
];

export default function LandingNavbar() {
  const pathname = usePathname();
  const isAppPage = pathname.startsWith("/app") || pathname.startsWith("/claim") || pathname.startsWith("/watchlist") || pathname.startsWith("/news");
  const navigation = isAppPage ? appNavigation : landingNavigation;

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur border-b border-white/10">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 text-sm text-[--brand-fg]">
        <Link href="/" className="font-black tracking-tight text-lg">
          Fast<span className="text-[--brand-accent]">Drop</span>
        </Link>

        <div className="flex items-center gap-6">
          {isAppPage ? (
            // App navigation items
            <div className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-colors hover:text-[--brand-accent]",
                    pathname === item.href
                      ? "text-[--brand-accent] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[--brand-accent] after:content-['']"
                      : "text-[--brand-fg] hover:text-[--brand-accent]"
                  )}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                >
                  {item.name}
                  {item.name === "News" && (
                    <span className="ml-1 h-2 w-2 bg-[--brand-accent] rounded-full animate-pulse" />
                  )}
                </Link>
              ))}
            </div>
          ) : (
            // Landing page navigation items
            navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="hover:text-[--brand-accent-2]"
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
              >
                {item.name}
              </Link>
            ))
          )}

          {isAppPage ? (
            // Connect wallet button for app pages
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-[--brand-accent] text-[--brand-accent] hover:bg-[--brand-accent] hover:text-black"
            >
              Connect
            </Button>
          ) : (
            // Launch App button for landing page
            <Button asChild className="rounded-full px-4 py-2 text-sm font-semibold shadow-lg">
              <Link href="/app">Launch App</Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
} 