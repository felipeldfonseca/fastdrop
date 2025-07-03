"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Search, Plus, Check } from "lucide-react";
import AuthModal from "@/components/modals/AuthModal";

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
  const [watchlistItems, setWatchlistItems] = useState<Set<string>>(new Set());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Mock auth state
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global keyboard shortcut for search
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
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

    setWatchlistItems(prev => new Set(Array.from(prev).concat(projectSlug)));
    // Here you would also make an API call to add to actual watchlist
  };

  const filteredProjects = searchValue.trim() 
    ? MOCK_PROJECTS.filter(
        (project) =>
          project.display.toLowerCase().startsWith(searchValue.toLowerCase()) ||
          project.name.toLowerCase().startsWith(searchValue.toLowerCase())
      )
    : [];

  const shouldShowDropdown = searchValue.trim().length > 0 && filteredProjects.length > 0;

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
          <div className="relative" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                ref={inputRef}
                type="text"
                placeholder="What project are you looking for?"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  setIsDropdownOpen(e.target.value.trim().length > 0);
                }}
                onFocus={() => {
                  if (searchValue.trim().length > 0) {
                    setIsDropdownOpen(true);
                  }
                }}
                className="w-full h-12 pl-10 pr-4 bg-white/5 border-white/10 hover:bg-white/10 focus:bg-white/10 text-white placeholder:text-muted-foreground rounded-full"
              />
            </div>

            {/* Custom Dropdown */}
            {shouldShowDropdown && isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur border border-white/10 rounded-xl shadow-lg z-50 overflow-hidden animate-in slide-in-from-top-2 duration-300">
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