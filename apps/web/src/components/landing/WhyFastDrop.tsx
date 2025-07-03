const features = [
  {
    name: "Milliseconds Matter",
    description:
      "Our TX builder sits on bare-metal close to main RPC clusters and signs before the crowd.",
  },
  {
    name: "Modular Claim Engine",
    description:
      "New airdrop? Drop in a ClaimAdapter plugin, no code refactor.",
  },
  {
    name: "Triple Route Fallback",
    description: "Jupiter → Meteora → Orca; never miss liquidity.",
  },
  {
    name: "Simulation Mode",
    description: "Dry-run every strategy without risking a single lamport.",
  },
  {
    name: "Security-First",
    description: "Hot key is AES-encrypted; you alone approve spending caps.",
  },
];

const WhyFastDrop = () => {
  return (
    <section id="why-fast-drop" className="py-24 sm:py-32">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Why Fast Drop?</h2>
      </div>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.name}
            className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-lg"
          >
            <h3 className="mb-2 font-semibold text-xl">{feature.name}</h3>
            <p className="text-sm text-[--brand-muted]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-20">
        <blockquote className="text-center text-xl italic leading-8 sm:text-2xl sm:leading-9">
          <p>
            "I wish I had Fast Drop to sell all my airdrop tokens in the first
            15 seconds—I would've made 9× more than what I've made after the
            price dumped. All my hard work would've been paid off."
          </p>
        </blockquote>
        <figcaption className="mt-10">
          <div className="mt-4 flex items-center justify-center space-x-3 text-base">
            <div className="font-semibold text-white/70">
              — Crypto Community Member
            </div>
          </div>
        </figcaption>
      </div>
    </section>
  );
};

export default WhyFastDrop; 