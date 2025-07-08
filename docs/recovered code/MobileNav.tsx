"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@repo/ui/sheet";
import { cn } from "@repo/ui/utils";

interface NavigationItem {
  name: string;
  href: string;
  external?: boolean;
}

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  navigation?: NavigationItem[];
}

export default function MobileNav({ open, onOpenChange, navigation = [] }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-64 p-6 space-y-4 bg-[--fd-surface]">
        <SheetHeader>
          <SheetTitle className="text-left">
            <Link href="/" className="font-black tracking-tight text-lg">
              <span className="text-white">Fast</span><span className="text-[--fd-primary]">Drop</span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col space-y-4" role="navigation" aria-label="Site navigation">
          {navigation.map((item) => (
            <div key={item.name} className="relative group">
              <Link
                href={item.href}
                className={cn(
                  "block px-3 py-2 text-sm font-medium transition-colors hover:text-[--fd-primary] rounded-md",
                  pathname === item.href
                    ? "text-[--fd-primary] bg-[--fd-primary]/10"
                    : "text-muted-foreground"
                )}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                onClick={() => onOpenChange(false)} // Close drawer on link click
              >
                {item.name}
                {item.name === "News" && (
                  <span className="ml-2 h-2 w-2 bg-[--fd-primary] rounded-full animate-pulse" />
                )}
              </Link>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[--brand-accent] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
} 