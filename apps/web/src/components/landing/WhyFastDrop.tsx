"use client";

import { useEffect, useState } from "react";
import {
  BoltIcon,
  CubeTransparentIcon,
  FunnelIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Milliseconds Matter",
    description:
      "Our TX builder sits on bare-metal close to main RPC clusters and signs before the crowd.",
    icon: BoltIcon,
    color: "text-sky-400",
  },
  {
    name: "Modular Claim Engine",
    description:
      "New airdrop? Drop in a ClaimAdapter plugin, no code refactor.",
    icon: CubeTransparentIcon,
    color: "text-purple-400",
  },
  {
    name: "Triple Route Fallback",
    description: "Jupiter → Meteora → Orca; never miss liquidity.",
    icon: FunnelIcon,
    color: "text-blue-500",
  },
  {
    name: "Security-First",
    description: "Hot key is AES-encrypted; you alone approve spending caps.",
    icon: ShieldCheckIcon,
    color: "text-teal-400",
  },
];

const WhyFastDrop = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <section id="why-fast-drop" className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Why Fast Drop?
        </h2>
      </div>
      <div className="mx-auto mt-16 max-w-4xl space-y-8 px-6 lg:px-8">
        {features.map((feature) => (
          <div
            key={feature.name}
            className="flex w-full items-stretch rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg"
          >
            <div className="flex w-72 flex-shrink-0 items-center border-r border-white/10 pr-8">
              <div className="flex-shrink-0">
                <feature.icon
                  className={`h-7 w-7 ${feature.color}`}
                  aria-hidden="true"
                />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold leading-6">
                  {feature.name}
                </h3>
              </div>
            </div>
            <div className="ml-8 flex-1">
              <p className="text-base text-left text-white/70">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyFastDrop; 