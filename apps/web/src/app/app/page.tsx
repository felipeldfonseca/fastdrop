import { Suspense } from "react";
import AppHero from "@/components/app/AppHero";
import TrendingTokens from "@/components/app/TrendingTokens";
import AppDisclaimer from "@/components/app/AppDisclaimer";

export default function AppPage() {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-6xl grid gap-12">
      <AppHero />
      <Suspense fallback={<div className="animate-pulse h-64 bg-white/5 rounded-xl" />}>
        <TrendingTokens />
      </Suspense>
      <AppDisclaimer />
    </div>
  );
} 