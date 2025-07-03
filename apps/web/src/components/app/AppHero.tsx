"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@repo/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/popover";
import { Search } from "lucide-react";

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
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Global keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleProjectSelect = (project: typeof MOCK_PROJECTS[0]) => {
    setSearchOpen(false);
    setSearchValue("");
    router.push(`/project/${project.slug}`);
  };

  const handleSetupClaim = () => {
    router.push("/claim");
  };

  const filteredProjects = MOCK_PROJECTS.filter(
    (project) =>
      project.display.toLowerCase().includes(searchValue.toLowerCase()) ||
      project.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="text-center space-y-8 py-16">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-display font-bold">
          Front‑run the dump.
        </h1>
        <p className="text-lg text-muted-foreground max-w-prose mx-auto">
          Claim and liquidate your airdrop tokens in the first blocks—before the price tanks.
        </p>
      </div>

      <div className="space-y-6 max-w-2xl mx-auto">
        <Popover open={searchOpen} onOpenChange={setSearchOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={searchOpen}
              className="w-full justify-start text-left font-normal h-12 bg-white/5 border-white/10 hover:bg-white/10"
            >
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <span className="text-muted-foreground">
                What project are you looking for?
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0 bg-black/90 border-white/10" align="start">
            <Command>
              <CommandInput
                placeholder="Search projects..."
                value={searchValue}
                onValueChange={setSearchValue}
                className="h-12"
              />
              <CommandList>
                <CommandEmpty>No projects found.</CommandEmpty>
                <CommandGroup>
                  {filteredProjects.map((project) => (
                    <CommandItem
                      key={project.slug}
                      onSelect={() => handleProjectSelect(project)}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-[--fd-primary]">
                          {project.display}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {project.name}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Button
          onClick={handleSetupClaim}
          variant="secondary"
          size="lg"
          className="w-full sm:w-auto"
        >
          Set up your claim
        </Button>
      </div>
    </div>
  );
} 