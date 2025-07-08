"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
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
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Window resize detection and animation trigger
  useEffect(() => {
    const checkScreenSize = () => {
      const isLarge = window.innerWidth >= 1024;
      const wasSmall = !isLargeScreen;
      
      setIsLargeScreen(isLarge);
      
      // Trigger animation when transitioning from mobile to desktop
      if (isLarge && wasSmall) {
        setIsAnimating(true);
        setMobileMenuOpen(false); // Close drawer smoothly

        // Hide underline before starting animations
        setUnderlineStyle(s => ({ ...s, opacity: 0 }));
        
        // Start the wipe-in animation with staggered delays
        setTimeout(() => {
          const navItems = document.querySelectorAll('.nav-item');
          
          navItems.forEach((item, index) => {
            const element = item as HTMLElement;
            element.style.transitionDelay = `${index * 60}ms`;
            element.style.transform = 'translateX(0)';
            element.style.opacity = '1';
          });
          
          // Phase 2: Underline Grow animation after buttons appear
          const totalButtonAnimationTime = (navItems.length - 1) * 60 + 300;
          setTimeout(() => {
            const activeItem = document.querySelector(`[href="${pathname}"]`) as HTMLElement;
            if (activeItem) {
              const rect = activeItem.getBoundingClientRect();
              const parent = activeItem.parentElement?.getBoundingClientRect();
              if (parent) {
                setUnderlineStyle({
                  left: rect.left - parent.left,
                  width: rect.width,
                  opacity: 1,
                });
              }
            }
          }, totalButtonAnimationTime);

        }, 50); // Small delay to ensure DOM is updated
        
        // Reset animation state after completion
        const totalAnimationTime = (navigation.length - 1) * 60 + 300 + 200; // buttons + underline
        setTimeout(() => {
          setIsAnimating(false);
          const navItems = document.querySelectorAll('.nav-item');
          navItems.forEach((item) => {
            const element = item as HTMLElement;
            element.style.transitionDelay = '0ms';
          });
        }, totalAnimationTime);
      }
    };

    // Set initial state
    checkScreenSize();
    
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [isLargeScreen, mobileMenuOpen, isAppPage, pathname, navigation.length]);

  // Initialize underline position on mount and pathname change
  useEffect(() => {
    if (!isAnimating) {
      const timer = setTimeout(() => {
        const activeItem = navContainerRef.current?.querySelector(`[href="${pathname}"]`) as HTMLElement;
        if (activeItem) {
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
      }, 100); // Small delay to ensure DOM is ready
      
      return () => clearTimeout(timer);
    }
  }, [pathname, isAnimating]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 backdrop-blur border-b border-white/10">
        <nav className="mx-auto flex h-16 max-w-6xl items-center px-6 text-sm text-[--brand-fg]">
          {/* Left section - Hamburger + Logo */}
          <div className="flex items-center space-x-4">
            {/* Hamburger Menu Button - Left side for mobile */}
            {(isAppPage || navigation.length > 0) && (
              <button
                className="lg:hidden p-2 rounded-md hover:bg-white/10 transition-colors"
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
              className="hidden lg:flex items-center space-x-8 relative"
              onMouseLeave={() => {
                if (!isAnimating) {
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
                }
              }}
            >
              {/* Animated underline */}
              <div
                className="absolute bottom-0 h-0.5 bg-[--brand-accent] transition-all"
                id="nav-underline"
                style={{
                  ...underlineStyle,
                  transition: 'left 600ms, width 600ms',
                }}
              ></div>

              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium nav-item",
                    pathname === item.href
                      ? "text-[--brand-accent]"
                      : "text-[--brand-fg] hover:text-[--brand-accent]"
                  )}
                  style={{
                    transform: isAnimating ? 'translateX(-20px)' : 'translateX(0)',
                    opacity: isAnimating ? 0 : 1,
                    transition: 'transform 300ms linear, opacity 300ms linear',
                  }}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  data-index={index}
                  onMouseEnter={(e) => {
                    if (!isAnimating) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const parent = navContainerRef.current?.getBoundingClientRect();
                      if (parent) {
                        setUnderlineStyle({
                          left: rect.left - parent.left,
                          width: rect.width,
                          opacity: 1,
                        });
                      }
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