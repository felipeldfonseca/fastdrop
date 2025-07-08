"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "@repo/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@repo/ui/utils";
import MobileNav from "./MobileNav";

const landingNavigation = [
  { name: "About", href: "/", external: false },
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Debounced resize handler
  const handleResize = useDebouncedCallback(() => {
    setIsLargeScreen(window.innerWidth >= 1024);
  }, 150);
  
  // Set initial size and add resize listener
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);
  
  // Animation logic reacting to isLargeScreen state change
  useEffect(() => {
    const navContainer = navContainerRef.current;
    if (!navContainer) return;

    if (isLargeScreen) {
      // Transition to Desktop: Animate nav items in
      navContainer.style.display = 'flex';
      setMobileMenuOpen(false);

      const navItems = navContainer.querySelectorAll('.nav-item');
      navItems?.forEach((item, index) => {
        const element = item as HTMLElement;
        element.style.transition = 'opacity 300ms, transform 300ms';
        element.style.transitionDelay = `${index * 80}ms`;
        element.style.transform = 'translateX(0)';
        element.style.opacity = '1';
      });

    } else {
      // Transition to Mobile: Animate nav items out
      const navItems = navContainer.querySelectorAll('.nav-item');
      if (navItems.length === 0) return;

      // Animate underline out to the left
      setUnderlineStyle(s => ({ ...s, opacity: 0, left: s.left - 20 }));

      navItems.forEach((item, index) => {
        const element = item as HTMLElement;
        const delay = (navItems.length - 1 - index) * 80;
        element.style.transition = `opacity 300ms, transform 300ms`;
        element.style.transitionDelay = `${delay}ms`;
        element.style.transform = 'translateX(-20px)';
        element.style.opacity = '0';
      });

      const totalAnimationTime = (navItems.length - 1) * 80 + 300;
      setTimeout(() => {
        if (navContainerRef.current) {
          navContainerRef.current.style.display = 'none';
        }
      }, totalAnimationTime);
    }
  }, [isLargeScreen]);

  // Effect for the "active" underline position
  useEffect(() => {
    const timer = setTimeout(() => {
      const activeItem = navContainerRef.current?.querySelector(`[href="${pathname}"]`) as HTMLElement;
      if (activeItem && isLargeScreen) {
        const rect = activeItem.getBoundingClientRect();
        const parent = navContainerRef.current?.getBoundingClientRect();
        if (parent) {
          setUnderlineStyle({
            left: rect.left - parent.left,
            width: rect.width,
            opacity: 1
          });
        }
      } else {
        setUnderlineStyle({ left: 0, width: 0, opacity: 0 });
      }
    }, 50); // Small delay to wait for layout to stabilize

    return () => clearTimeout(timer);
  }, [pathname, isLargeScreen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 backdrop-blur border-b border-white/10">
        <nav className="mx-auto flex h-16 max-w-6xl items-center px-6 text-sm text-[--brand-fg]">
          {/* Left section - Hamburger + Logo */}
          <div className="flex items-center space-x-4">
            {/* Hamburger Menu Button - Left side for mobile */}
            {(isAppPage || navigation.length > 0) && !isLargeScreen && (
              <button
                className="p-2 rounded-md hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="font-black tracking-tight text-lg">
                Fast<span className="text-[--brand-accent]">Drop</span>
              </Link>
            </div>
          </div>

          {/* Navigation items - Centered */}
          <div className="flex-1 flex justify-center">
            <div
              ref={navContainerRef}
              className="flex items-center space-x-8 relative"
              onMouseLeave={() => {
                const activeItem = navContainerRef.current?.querySelector(`[href="${pathname}"]`) as HTMLElement;
                if (activeItem) {
                  const rect = activeItem.getBoundingClientRect();
                  const parent = navContainerRef.current?.getBoundingClientRect();
                  if (parent) {
                    setUnderlineStyle({
                      left: rect.left - parent.left,
                      width: rect.width,
                      opacity: 1,
                    });
                  }
                } else {
                  setUnderlineStyle(s => ({ ...s, opacity: 0 }));
                }
              }}
            >
              {/* Animated underline */}
              <div
                className="absolute bottom-0 h-0.5 bg-[--brand-accent] transition-all"
                id="nav-underline"
                style={{
                  ...underlineStyle,
                  transition: 'left 300ms, width 300ms, opacity 300ms',
                }}
              ></div>

              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium nav-item",
                    pathname === item.href
                      ? "text-[--brand-accent]"
                      : "text-[--brand-fg] hover:text-[--brand-accent]"
                  )}
                  style={{ opacity: 0, transform: 'translateX(20px)' }} // Start off-screen to the right
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const parent = navContainerRef.current?.getBoundingClientRect();
                    if (parent) {
                      setUnderlineStyle({
                        left: rect.left - parent.left,
                        width: rect.width,
                        opacity: 1
                      });
                    }
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
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

      {/* Mobile Navigation */}
      {(isAppPage || navigation.length > 0) && (
        <MobileNav 
          open={mobileMenuOpen} 
          onOpenChange={setMobileMenuOpen} 
          navigation={navigation} 
        />
      )}
    </>
  );
} 