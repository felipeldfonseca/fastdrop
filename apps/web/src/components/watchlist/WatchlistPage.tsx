"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Sparkles, Plus, MoreVertical, Search } from "lucide-react";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { 
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@repo/ui/command";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/popover";

// Mock project data for search suggestions
const mockProjects = [
  { id: "1", name: "Jupiter", symbol: "JUP", status: "Ready" },
  { id: "2", name: "Pyth Network", symbol: "PYTH", status: "Live checker" },
  { id: "3", name: "Wormhole", symbol: "W", status: "Announced" },
  { id: "4", name: "Tensor", symbol: "TNSR", status: "Ready" },
  { id: "5", name: "Drift Protocol", symbol: "DRIFT", status: "Live checker" },
  { id: "6", name: "Marginfi", symbol: "MFGI", status: "Announced" },
];

// Types
interface WatchlistProject {
  id: string;
  name: string;
  symbol: string;
  tokens: string;
  price: string;
  amount: string;
  status: "Ready" | "Live checker" | "Announced";
  lastUpdate: string;
  addedAt: number;
}

// Custom hook for watchlist management
const useWatchlist = () => {
  const [projects, setProjects] = useState<WatchlistProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("watchlist");
    if (stored) {
      try {
        setProjects(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to parse watchlist from localStorage:", error);
      }
    }
    setIsLoading(false);
  }, []);

  // Save to localStorage whenever projects change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("watchlist", JSON.stringify(projects));
    }
  }, [projects, isLoading]);

  const addProject = useCallback((projectId: string) => {
    const mockProject = mockProjects.find(p => p.id === projectId);
    if (!mockProject) return;

    // Check if already exists
    if (projects.some(p => p.id === projectId)) return;

    const newProject: WatchlistProject = {
      id: mockProject.id,
      name: mockProject.name,
      symbol: mockProject.symbol,
      tokens: mockProject.status === "Ready" ? "1,250" : "—",
      price: mockProject.status === "Ready" ? "$0.45" : "—",
      amount: mockProject.status === "Ready" ? "$562.50" : "—",
      status: mockProject.status as WatchlistProject["status"],
      lastUpdate: "2h ago",
      addedAt: Date.now(),
    };

    setProjects(prev => [newProject, ...prev]);
  }, [projects]);

  const removeProject = useCallback((projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
  }, []);

  return {
    projects,
    addProject,
    removeProject,
    isLoading,
  };
};

// AddBar Component
const AddBar = ({ onAddProject }: { onAddProject: (projectId: string) => void }) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(mockProjects);

  // Filter projects based on search
  useEffect(() => {
    if (!searchValue) {
      setFilteredProjects(mockProjects);
      return;
    }

    const filtered = mockProjects.filter(project =>
      project.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      project.symbol.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [searchValue]);

  const handleAddProject = (projectId: string) => {
    onAddProject(projectId);
    setSearchValue("");
    setOpen(false);
  };

  // Handle keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex w-full max-w-2xl items-center space-x-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            <div className="flex items-center">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <span className="text-muted-foreground">
                Add project by name, ticker or token address
              </span>
            </div>
            <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Search projects..."
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandList>
              <CommandEmpty>No projects found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                {filteredProjects.map((project) => (
                  <CommandItem
                    key={project.id}
                    value={project.name}
                    onSelect={() => handleAddProject(project.id)}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <span className="font-medium">{project.symbol}</span>
                        <span className="ml-2 text-sm text-muted-foreground">
                          {project.name}
                        </span>
                      </div>
                      <StatusBadge status={project.status} />
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Live checker":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Announced":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(status)}`}>
      {status}
    </span>
  );
};

// Context Menu Component
const ContextMenu = ({ 
  projectId, 
  onRemove 
}: { 
  projectId: string; 
  onRemove: (id: string) => void; 
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2" align="end">
        <div className="space-y-1">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={() => {
              // Navigate to claim page - placeholder for now
              console.log("Set claim for:", projectId);
              setOpen(false);
            }}
          >
            Set Claim
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={() => {
              onRemove(projectId);
              setOpen(false);
            }}
          >
            Remove
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={() => {
              console.log("Mute notifications for:", projectId);
              setOpen(false);
            }}
          >
            Mute
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={() => {
              console.log("Pin project:", projectId);
              setOpen(false);
            }}
          >
            Pin
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

// Watchlist Table Component
const WatchlistTable = ({ 
  projects, 
  onRemoveProject 
}: { 
  projects: WatchlistProject[]; 
  onRemoveProject: (id: string) => void; 
}) => {
  const handleRowClick = (projectId: string, event: React.MouseEvent) => {
    // Don't navigate if clicking on the context menu
    if ((event.target as HTMLElement).closest('button')) {
      return;
    }
    
    // Navigate to project page - placeholder for now
    console.log("Navigate to project:", projectId);
  };

  return (
    <div className="bg-white/5 backdrop-blur rounded-xl overflow-x-auto ring-1 ring-white/10">
      <Table>
        <TableHeader>
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead className="font-semibold">Project</TableHead>
            <TableHead className="font-semibold">Tokens</TableHead>
            <TableHead className="font-semibold">Price</TableHead>
            <TableHead className="font-semibold">Amount</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Last Update</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow
              key={project.id}
              className="border-white/10 hover:bg-white/5 cursor-pointer transition-colors"
              onClick={(e) => handleRowClick(project.id, e)}
            >
              <TableCell className="font-medium">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                    {project.symbol.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{project.symbol}</div>
                    <div className="text-sm text-muted-foreground">{project.name}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{project.tokens}</TableCell>
              <TableCell>{project.price}</TableCell>
              <TableCell>{project.amount}</TableCell>
              <TableCell>
                <StatusBadge status={project.status} />
              </TableCell>
              <TableCell className="text-muted-foreground">{project.lastUpdate}</TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <ContextMenu projectId={project.id} onRemove={onRemoveProject} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// Empty State Component
const EmptyState = () => (
  <div className="text-center py-16">
    <Sparkles className="w-8 h-8 mx-auto text-[#14f195]" />
    <p className="mt-4 text-lg font-semibold">No projects yet</p>
    <p className="text-muted-foreground">
      Search above to start tracking upcoming airdrops.
    </p>
  </div>
);

// Main Watchlist Page Component
const WatchlistPage = () => {
  const { projects, addProject, removeProject, isLoading } = useWatchlist();

  if (isLoading) {
    return (
      <div className="mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 w-full max-w-6xl">
        <div className="flex items-center justify-center py-16">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 w-full max-w-6xl">
      <header className="text-center">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-sora)] text-white">
          Your Watchlist
        </h1>
        <p className="mt-2 text-muted-foreground">
          Track your favorite airdrop projects in one place
        </p>
      </header>

      <div className="flex justify-center">
        <AddBar onAddProject={addProject} />
      </div>

      {projects.length > 0 ? (
        <WatchlistTable projects={projects} onRemoveProject={removeProject} />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default WatchlistPage; 