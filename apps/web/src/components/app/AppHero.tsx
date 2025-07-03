"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Search, Plus, Check } from "lucide-react";
import AuthModal from "@/components/modals/AuthModal";
import { cn } from "@repo/ui/utils";

// Mock data for project search
const MOCK_PROJECTS = [
  { slug: "frag", display: "FRAG", name: "Fragment Protocol" },
  { slug: "scroll", display: "SCROLL", name: "Scroll Network" },
  { slug: "blast", display: "BLAST", name: "Blast Network" },
  { slug: "eigen", display: "EIGEN", name: "EigenLayer" },
  { slug: "strk", display: "STRK", name: "Starknet" },
];

export default function AppHero() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownRendered, setIsDropdownRendered] = useState(false);
  const [watchlistItems, setWatchlistItems] = useState<Set<string>>(new Set());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Mock auth state
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredProjects = searchValue.trim()
    ? MOCK_PROJECTS.filter(
        (project) =>
          project.display.toLowerCase().startsWith(searchValue.toLowerCase()) ||
          project.name.toLowerCase().startsWith(searchValue.toLowerCase())
      )
    : [];

  const shouldShowDropdown =
    isSearchActive && searchValue.trim().length > 0 && filteredProjects.length > 0;

  useEffect(() => {
    setIsDropdownOpen(shouldShowDropdown);
  }, [shouldShowDropdown]);

  useEffect(() => {
    if (shouldShowDropdown) {
      setIsDropdownRendered(true);
    } else {
      const timer = setTimeout(() => {
        setIsDropdownRendered(false);
      }, 700); // Match retraction animation
      return () => clearTimeout(timer);
    }
  }, [shouldShowDropdown]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProjectSelect = (project: typeof MOCK_PROJECTS[0]) => {
    setIsDropdownOpen(false);
    setSearchValue("");
    router.push(`/project/${project.slug}`);
  };

  const handleSetupClaim = () => {
    router.push("/claim");
  };

  const handleAddToWatchlist = (projectSlug: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    setWatchlistItems((prev) => new Set(Array.from(prev).concat(projectSlug)));
  };

  return (
    <>
      <div className="text-center space-y-6 pt-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold">
            Front‑run the dump.
          </h1>
          <p className="text-lg text-muted-foreground max-w-prose mx-auto">
            Claim and liquidate your airdrop tokens in the first blocks—before the price tanks.
          </p>
        </div>

        <div className="space-y-4 max-w-xl mx-auto">
          <div className="flex justify-center">
            <div
              ref={searchRef}
              className={cn(
                "relative transition-all duration-700 ease-in-out",
                isSearchActive ? "w-full" : "w-80"
              )}
            >
              <div
                className="relative w-full h-12 cursor-text"
                onClick={() => inputRef.current?.focus()}
              >
                {/* Custom Placeholder */}
                <div
                  className={cn(
                    "absolute inset-0 flex items-center justify-center gap-2 text-muted-foreground transition-opacity duration-300 pointer-events-none",
                    isSearchActive || searchValue ? "opacity-0" : "opacity-100"
                  )}
                >
                  <Search className="h-4 w-4" />
                  <span>Search projects...</span>
                </div>

                {/* Real Input */}
                <Search
                  className={cn(
                    "absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-opacity duration-300",
                    isSearchActive ? "opacity-100" : "opacity-0"
                  )}
                />
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder={isSearchActive ? "What project are you looking for?" : ""}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setIsSearchActive(true)}
                  className="w-full h-12 pl-10 pr-4 bg-white/5 border-white/10 hover:bg-white/10 focus:bg-white/10 text-white placeholder:text-muted-foreground rounded-full outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>

              {/* Custom Dropdown */}
              {isDropdownRendered && (
                <div
                  className={cn(
                    "absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur border border-white/10 rounded-xl shadow-lg z-50 overflow-hidden origin-top transition-all duration-700 ease-in-out",
                    isDropdownOpen ? "opacity-100 transform-none" : "opacity-0 -translate-y-2"
                  )}
                >
                  <div className="max-h-64 overflow-y-auto">
                    {filteredProjects.map((project) => (
                      <div
                        key={project.slug}
                        className="flex items-center justify-between px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5 last:border-b-0"
                        onClick={() => handleProjectSelect(project)}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="font-semibold text-[--fd-primary]">
                            {project.display}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {project.name}
                          </span>
                        </div>
                        
                        <div className="relative">
                          <button
                            onClick={(e) => handleAddToWatchlist(project.slug, e)}
                            className={`w-8 h-8 rounded-full border transition-all duration-300 flex items-center justify-center ${
                              watchlistItems.has(project.slug)
                                ? "bg-white text-black border-white"
                                : "bg-[--fd-primary] text-black border-[--fd-primary] hover:bg-white hover:border-white"
                            }`}
                          >
                            {watchlistItems.has(project.slug) ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Plus className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="text-center pt-4 space-y-3">
            <h3 className="text-lg font-medium text-white/80">
              Airdrop incoming?
            </h3>
            <Button
              onClick={handleSetupClaim}
              size="lg"
              className="w-full sm:w-auto rounded-full bg-[--fd-primary] text-black hover:bg-white shadow-lg transition-colors text-lg font-semibold"
            >
              Set up your claim
            </Button>
          </div>
        </div>
      </div>
      
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onConnectWallet={() => {
          console.log("Connect wallet logic here");
          // Here you would trigger actual wallet connection
        }}
        onLoginWithEmail={() => {
          console.log("Login with email logic here");
          // Here you would open the email login modal
        }}
      />
    </>
  );
} 