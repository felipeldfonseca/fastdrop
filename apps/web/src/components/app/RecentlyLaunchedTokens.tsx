"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui/table";
import { Card } from "@repo/ui/card";
import { Button } from "@repo/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@repo/ui/command";
import { Check, Settings2 } from "lucide-react";
import { cn } from "@repo/ui/utils";

// Sparkline component for mini charts
const Sparkline = ({ data, color = "#ef4444" }: { data: number[]; color?: string }) => {
  if (!data || data.length === 0) return <span className="text-xs text-muted-foreground">No data</span>;

  const width = 60;
  const height = 20;
  const padding = 2;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;

  // Handle edge case where all values are the same
  if (range === 0) {
    const y = height / 2;
    const points = data.map((_, index) => {
      const x = (index / (data.length - 1)) * (width - padding * 2) + padding;
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <svg 
        width={width} 
        height={height} 
        className="inline-block"
        viewBox={`0 0 ${width} ${height}`}
      >
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    );
  }

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * (width - padding * 2) + padding;
    const y = height - padding - ((value - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg 
      width={width} 
      height={height} 
      className="inline-block" 
      style={{ minWidth: '60px' }}
      viewBox={`0 0 ${width} ${height}`}
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

// Define available columns (only optional columns that can be toggled)
const OPTIONAL_COLUMNS = [
  { key: 'thousandDollarWorth', label: '$1k Airdrop Now Worth' },
  { key: 'performance', label: 'Performance (7d)' },
];

// Mock data for recently launched tokens showing the "dump" story
const MOCK_RECENTLY_LAUNCHED_TOKENS = [
  {
    slug: "dump",
    token: "DUMP",
    launchPrice: "$2.50",
    priceAfter1h: "$0.80",
    currentPrice: "$0.45",
    postLaunchDrop: "-82%",
    thousandDollarWorth: "$180",
    sparklineData: [2.50, 2.30, 1.80, 1.20, 0.90, 0.70, 0.60, 0.50, 0.45, 0.42, 0.45],
    launchDate: "2024-01-15"
  },
  {
    slug: "bleed",
    token: "BLEED",
    launchPrice: "$1.00",
    priceAfter1h: "$0.95",
    currentPrice: "$0.60",
    postLaunchDrop: "-40%",
    thousandDollarWorth: "$600",
    sparklineData: [1.00, 0.95, 0.92, 0.88, 0.85, 0.80, 0.75, 0.70, 0.65, 0.62, 0.60],
    launchDate: "2024-01-12"
  },
  {
    slug: "crash",
    token: "CRASH",
    launchPrice: "$5.20",
    priceAfter1h: "$1.80",
    currentPrice: "$0.95",
    postLaunchDrop: "-82%",
    thousandDollarWorth: "$183",
    sparklineData: [5.20, 4.80, 2.50, 1.80, 1.50, 1.30, 1.20, 1.10, 1.05, 0.98, 0.95],
    launchDate: "2024-01-10"
  },
  {
    slug: "tank",
    token: "TANK",
    launchPrice: "$0.75",
    priceAfter1h: "$0.35",
    currentPrice: "$0.18",
    postLaunchDrop: "-76%",
    thousandDollarWorth: "$240",
    sparklineData: [0.75, 0.65, 0.45, 0.35, 0.30, 0.25, 0.22, 0.20, 0.19, 0.18, 0.18],
    launchDate: "2024-01-08"
  },
  {
    slug: "plunge",
    token: "PLUNGE",
    launchPrice: "$3.10",
    priceAfter1h: "$1.20",
    currentPrice: "$0.62",
    postLaunchDrop: "-80%",
    thousandDollarWorth: "$200",
    sparklineData: [3.10, 2.80, 1.90, 1.20, 1.00, 0.85, 0.75, 0.70, 0.65, 0.62, 0.62],
    launchDate: "2024-01-05"
  },
  {
    slug: "dive",
    token: "DIVE",
    launchPrice: "$1.85",
    priceAfter1h: "$0.95",
    currentPrice: "$0.37",
    postLaunchDrop: "-80%",
    thousandDollarWorth: "$200",
    sparklineData: [1.85, 1.60, 1.20, 0.95, 0.80, 0.65, 0.55, 0.45, 0.40, 0.37, 0.37],
    launchDate: "2024-01-03"
  }
];

export default function RecentlyLaunchedTokens() {
  const router = useRouter();
  const [tokens, setTokens] = useState(MOCK_RECENTLY_LAUNCHED_TOKENS);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  
  // Column visibility state - only for optional columns, all visible by default
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
    OPTIONAL_COLUMNS.reduce((acc, col) => ({ ...acc, [col.key]: true }), {})
  );

  // Memoize filtered columns to prevent unnecessary re-renders
  const filteredColumns = useMemo(() => {
    if (!searchValue.trim()) return OPTIONAL_COLUMNS;
    
    const searchTerm = searchValue.toLowerCase();
    
    // Filter and sort: prioritize items that start with the search term
    const filtered = OPTIONAL_COLUMNS.filter(column =>
      column.label.toLowerCase().includes(searchTerm)
    );
    
    // Sort by: 1) starts with search term, 2) alphabetical
    return filtered.sort((a, b) => {
      const aLabel = a.label.toLowerCase();
      const bLabel = b.label.toLowerCase();
      
      const aStartsWith = aLabel.startsWith(searchTerm);
      const bStartsWith = bLabel.startsWith(searchTerm);
      
      // If one starts with search term and other doesn't, prioritize the one that starts with it
      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;
      
      // If both start with search term or both don't, sort alphabetically
      return aLabel.localeCompare(bLabel);
    });
  }, [searchValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleRowClick = (slug: string) => {
    router.push(`/claim/${slug}`);
  };

  const toggleColumn = (columnKey: string) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnKey]: !prev[columnKey]
    }));
  };

  const toggleAll = () => {
    const allVisible = OPTIONAL_COLUMNS.every(col => visibleColumns[col.key]);
    const newState = OPTIONAL_COLUMNS.reduce((acc, col) => ({ ...acc, [col.key]: !allVisible }), {});
    setVisibleColumns(newState);
  };

  const clearAll = () => {
    const newState = OPTIONAL_COLUMNS.reduce((acc, col) => ({ ...acc, [col.key]: false }), {});
    setVisibleColumns(newState);
  };

  if (loading) {
    return (
      <Card className="bg-white/5 backdrop-blur border-white/10">
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-white/10 rounded w-48"></div>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex space-x-4">
                <div className="h-4 bg-white/10 rounded w-16"></div>
                <div className="h-4 bg-white/10 rounded w-20"></div>
                <div className="h-4 bg-white/10 rounded w-16"></div>
                <div className="h-4 bg-white/10 rounded w-20"></div>
                <div className="h-4 bg-white/10 rounded w-16"></div>
                <div className="h-4 bg-white/10 rounded w-24"></div>
                <div className="h-4 bg-white/10 rounded w-12"></div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="mt-8">
      <Card className="bg-white/5 backdrop-blur border-white/10">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recently Launched Tokens</h2>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 border-white/10 hover:bg-white/10 flex items-center justify-center">
                  <Settings2 className="mr-2 h-4 w-4" />
                  Columns
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0" align="end">
                <Command shouldFilter={false}>
                  <CommandInput 
                    placeholder="Search columns..." 
                    value={searchValue}
                    onValueChange={setSearchValue}
                  />
                  <CommandList>
                    <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
                      <CommandItem onSelect={toggleAll} className="flex-1 justify-center p-0">
                        <span className="text-sm">Toggle all</span>
                      </CommandItem>
                      <div className="w-px h-4 bg-white/10 mx-2"></div>
                      <CommandItem onSelect={clearAll} className="flex-1 justify-center p-0">
                        <span className="text-sm">Clear</span>
                      </CommandItem>
                    </div>
                    <CommandGroup>
                      {filteredColumns.length === 0 ? (
                        <CommandEmpty>No columns found.</CommandEmpty>
                      ) : (
                        filteredColumns.map((column) => (
                          <CommandItem key={column.key} onSelect={() => toggleColumn(column.key)}>
                            <div className="flex items-center space-x-2">
                              <div className="w-4 h-4 border border-white/20 rounded flex items-center justify-center">
                                {visibleColumns[column.key] && (
                                  <Check className="h-3 w-3" />
                                )}
                              </div>
                              <span>{column.label}</span>
                            </div>
                          </CommandItem>
                        ))
                      )}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] text-center">Token</TableHead>
                  <TableHead className="text-center flex-1">Launch Price</TableHead>
                  <TableHead className="text-center flex-1">Price (1h)</TableHead>
                  <TableHead className="text-center flex-1">Current Price</TableHead>
                  <TableHead className="text-center flex-1">Post-Launch Drop</TableHead>
                  {visibleColumns.thousandDollarWorth && <TableHead className="text-center flex-1">$1k Airdrop Now Worth</TableHead>}
                  {visibleColumns.performance && <TableHead className="text-center flex-1">Performance (7d)</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {tokens.map((token) => (
                  <TableRow
                    key={token.slug}
                    className="border-white/10 hover:bg-white/5 cursor-pointer transition-colors"
                    onClick={() => handleRowClick(token.slug)}
                  >
                    <TableCell className="font-medium font-mono text-center w-[100px]">{token.token}</TableCell>
                    <TableCell className="text-center font-mono text-muted-foreground flex-1">{token.launchPrice}</TableCell>
                    <TableCell className="text-center font-mono text-muted-foreground flex-1">{token.priceAfter1h}</TableCell>
                    <TableCell className="text-center font-mono flex-1">{token.currentPrice}</TableCell>
                    <TableCell className="text-center font-mono font-semibold text-red-400 flex-1">{token.postLaunchDrop}</TableCell>
                    {visibleColumns.thousandDollarWorth && <TableCell className="text-center font-mono font-semibold text-red-400 flex-1">{token.thousandDollarWorth}</TableCell>}
                    {visibleColumns.performance && (
                      <TableCell className="text-center flex-1">
                        <Sparkline data={token.sparklineData} color="rgb(239, 68, 68)" />
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
    </div>
  );
} 