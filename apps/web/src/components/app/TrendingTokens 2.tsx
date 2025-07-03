"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui/table";
import { Card } from "@repo/ui/card";

// Mock data for trending tokens
const MOCK_TRENDING_TOKENS = [
  {
    slug: "frag",
    project: "FRAG",
    tokens: "5,409",
    price: "$0.012",
    amount: "$65.10",
    status: "ready",
    statusLabel: "Ready 💚"
  },
  {
    slug: "scroll",
    project: "SCROLL",
    tokens: "1,200",
    price: "$0.085",
    amount: "$102.0",
    status: "live",
    statusLabel: "Live 🟠"
  },
  {
    slug: "blast",
    project: "BLAST",
    tokens: "2,500",
    price: "$0.045",
    amount: "$112.5",
    status: "announced",
    statusLabel: "Announced ⚪"
  },
  {
    slug: "eigen",
    project: "EIGEN",
    tokens: "850",
    price: "$0.156",
    amount: "$132.6",
    status: "ready",
    statusLabel: "Ready 💚"
  },
  {
    slug: "strk",
    project: "STRK",
    tokens: "3,200",
    price: "$0.089",
    amount: "$284.8",
    status: "live",
    statusLabel: "Live 🟠"
  }
];

export default function TrendingTokens() {
  const router = useRouter();
  const [tokens, setTokens] = useState(MOCK_TRENDING_TOKENS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Simulate periodic updates (every hour in production)
  useEffect(() => {
    const interval = setInterval(() => {
      // In production, this would fetch from API
      // For now, just simulate small price changes
      setTokens(prev => prev.map(token => ({
        ...token,
        price: `$${(parseFloat(token.price.slice(1)) * (0.95 + Math.random() * 0.1)).toFixed(3)}`,
      })));
    }, 60000); // Update every minute for demo (would be 1 hour in production)

    return () => clearInterval(interval);
  }, []);

  const handleRowClick = (slug: string) => {
    router.push(`/project/${slug}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "live":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "announced":
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  if (loading) {
    return (
      <Card className="bg-white/5 backdrop-blur border-white/10">
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-white/10 rounded w-48"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex space-x-4">
                <div className="h-4 bg-white/10 rounded w-16"></div>
                <div className="h-4 bg-white/10 rounded w-20"></div>
                <div className="h-4 bg-white/10 rounded w-16"></div>
                <div className="h-4 bg-white/10 rounded w-20"></div>
                <div className="h-4 bg-white/10 rounded w-24"></div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white/5 backdrop-blur border-white/10">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Trending Tokens</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-left">Project</TableHead>
                <TableHead className="text-right">Tokens</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tokens.map((token) => (
                <TableRow
                  key={token.slug}
                  className="border-white/10 hover:bg-white/5 cursor-pointer transition-colors"
                  onClick={() => handleRowClick(token.slug)}
                >
                  <TableCell className="font-medium">{token.project}</TableCell>
                  <TableCell className="text-right font-mono">{token.tokens}</TableCell>
                  <TableCell className="text-right font-mono">{token.price}</TableCell>
                  <TableCell className="text-right font-mono font-semibold">{token.amount}</TableCell>
                  <TableCell className="text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(token.status)}`}>
                      {token.statusLabel}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
} 