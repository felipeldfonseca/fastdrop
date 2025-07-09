import { Button } from "@repo/ui/button";
import { PlayIcon } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <h1 className="max-w-4xl text-4xl font-black leading-[2] sm:text-6xl">
        <span className="text-[--brand-accent]">Claim the airdrop</span>
        <br />
        Beat the dump
        <br />
        <span className="text-[--brand-accent]">Lock in gains</span>
      </h1>
      <p className="max-w-2xl text-lg text-[--brand-muted]">
        Fast Drop watches the chain 24/7 and fires an atomic claim +
        market-sell transaction the second an airdrop goes live—so you keep the
        profits, not the bag-holders.
      </p>
      <div className="flex gap-4">
        <Link href="/app">
          <Button size="lg" className="rounded-full px-8 py-4 bg-[--brand-accent] text-black hover:bg-white hover:text-black border border-[--brand-accent] font-bold">
            Get Early Access
          </Button>
        </Link>
        <button className="flex items-center gap-2 text-[--brand-muted] hover:text-[--brand-fg]">
          <PlayIcon className="h-5 w-5" /> Watch Demo
        </button>
      </div>
    </section>
  );
};

export default Hero; 