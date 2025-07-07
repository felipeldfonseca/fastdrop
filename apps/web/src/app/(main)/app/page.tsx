import { Suspense } from "react";
import AppHero from "@/components/app/AppHero";
import RecentlyLaunchedTokens from "@/components/app/RecentlyLaunchedTokens";

export default function AppPage() {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-6xl grid gap-12">
      <AppHero />
      <Suspense fallback={<div className="animate-pulse h-64 bg-white/5 rounded-xl" />}>
        <RecentlyLaunchedTokens />
      </Suspense>
    </div>
  );
} 