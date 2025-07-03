"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
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

  // Initialize underline position on mount and pathname change
  useEffect(() => {
    if (isAppPage) {
      const timer = setTimeout(() => {
        const activeItem = document.querySelector(`[href="${pathname}"]`) as HTMLElement;
        const underline = document.getElementById('nav-underline');
        if (activeItem && underline) {
          // Set initial transition duration
          underline.style.transitionDuration = '600ms';
          const rect = activeItem.getBoundingClientRect();
          const parent = activeItem.parentElement?.getBoundingClientRect();
          if (parent) {
            const left = rect.left - parent.left;
            const width = rect.width;
            underline.style.left = `${left}px`;
            underline.style.width = `${width}px`;
          }
        }
      }, 100); // Small delay to ensure DOM is ready
      
      return () => clearTimeout(timer);
    }
  }, [pathname, isAppPage]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur border-b border-white/10">
      <nav className="mx-auto flex h-16 max-w-6xl items-center px-6 text-sm text-[--brand-fg]">
        {/* Logo - Left side */}
        <div className="flex-shrink-0">
          <Link href="/" className="font-black tracking-tight text-lg">
            Fast<span className="text-[--brand-accent]">Drop</span>
          </Link>
        </div>

        {/* Navigation items - Centered */}
        <div className="flex-1 flex justify-center">
          {isAppPage ? (
            // App navigation items with animated underline
            <div 
              className="hidden md:flex items-center space-x-8 relative"
              onMouseLeave={() => {
                // Slower return to active page position when leaving the entire nav area
                const activeItem = document.querySelector(`[href="${pathname}"]`) as HTMLElement;
                const underline = document.getElementById('nav-underline');
                if (activeItem && underline) {
                  // Slower transition for return to default
                  underline.style.transitionDuration = '600ms';
                  const rect = activeItem.getBoundingClientRect();
                  const parent = activeItem.parentElement?.getBoundingClientRect();
                  if (parent) {
                    const left = rect.left - parent.left;
                    const width = rect.width;
                    underline.style.left = `${left}px`;
                    underline.style.width = `${width}px`;
                  }
                }
              }}
            >
              {/* Animated underline */}
              <div className="absolute bottom-0 h-0.5 bg-[--brand-accent] transition-all ease-out opacity-100" id="nav-underline"></div>
              
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-colors duration-300 ease-out nav-item",
                    pathname === item.href
                      ? "text-[--brand-accent]"
                      : "text-[--brand-fg] hover:text-[--brand-accent]"
                  )}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  data-index={index}
                  onMouseEnter={(e) => {
                    const underline = document.getElementById('nav-underline');
                    const rect = e.currentTarget.getBoundingClientRect();
                    const parent = e.currentTarget.parentElement?.getBoundingClientRect();
                    if (underline && parent) {
                      // Fast transition for button-to-button movement
                      underline.style.transitionDuration = '300ms';
                      const left = rect.left - parent.left;
                      const width = rect.width;
                      underline.style.left = `${left}px`;
                      underline.style.width = `${width}px`;
                    }
                  }}
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
            <div className="hidden md:flex items-center">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="hover:text-[--brand-accent-2]"
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Action button - Right side */}
        <div className="flex-shrink-0">
          {isAppPage ? (
            // Connect wallet button for app pages
            <Button className="rounded-full px-4 py-2 text-sm font-semibold shadow-lg bg-[--brand-accent] text-black hover:bg-white hover:text-black border border-[--brand-accent]">
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