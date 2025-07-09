// A simple, elegant pattern of concentric circles
const Image1 = () => (
  <svg width="100%" height="100%" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="200" cy="150" r="140" stroke="rgba(0, 255, 153, 0.1)" strokeWidth="10"/>
    <circle cx="200" cy="150" r="100" stroke="rgba(0, 255, 153, 0.2)" strokeWidth="10"/>
    <circle cx="200" cy="150" r="60" stroke="rgba(0, 255, 153, 0.4)" strokeWidth="10"/>
    <circle cx="200" cy="150" r="20" fill="rgba(0, 255, 153, 0.8)"/>
  </svg>
);

// An abstract representation of a wallet with a fading echo
const Image2 = () => (
  <svg width="100%" height="100%" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(-20, 20)">
      <rect x="100" y="100" width="200" height="120" rx="20" fill="rgba(0, 255, 153, 0.1)"/>
      <path d="M100 120 C100 108.954 108.954 100 120 100 H280 C291.046 100 300 108.954 300 120 V 140 H100 V 120 Z" fill="rgba(0, 255, 153, 0.15)"/>
    </g>
    <g transform="translate(-10, 10)">
      <rect x="100" y="100" width="200" height="120" rx="20" fill="rgba(0, 255, 153, 0.2)"/>
      <path d="M100 120 C100 108.954 108.954 100 120 100 H280 C291.046 100 300 108.954 300 120 V 140 H100 V 120 Z" fill="rgba(0, 255, 153, 0.3)"/>
    </g>
    <g>
      <rect x="100" y="100" width="200" height="120" rx="20" fill="#4ade80"/>
      <path d="M100 120 C100 108.954 108.954 100 120 100 H280 C291.046 100 300 108.954 300 120 V 140 H100 V 120 Z" fill="#22c55e"/>
      <circle cx="280" cy="165" r="8" fill="rgb(255, 255, 255)"/>
    </g>
  </svg>
);

// A grid of fading dots
const Image3 = () => (
  <svg width="100%" height="100%" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="15" fill="rgba(0, 255, 153, 0.8)"/>
    <circle cx="200" cy="100" r="15" fill="rgba(0, 255, 153, 0.6)"/>
    <circle cx="300" cy="100" r="15" fill="rgba(0, 255, 153, 0.4)"/>
    <circle cx="100" cy="150" r="15" fill="rgba(0, 255, 153, 0.6)"/>
    <circle cx="200" cy="150" r="15" fill="rgba(0, 255, 153, 0.4)"/>
    <circle cx="300" cy="150" r="15" fill="rgba(0, 255, 153, 0.2)"/>
    <circle cx="100" cy="200" r="15" fill="rgba(0, 255, 153, 0.4)"/>
    <circle cx="200" cy="200" r="15" fill="rgba(0, 255, 153, 0.2)"/>
    <circle cx="300" cy="200" r="15" fill="rgba(0, 255, 153, 0.1)"/>
  </svg>
);

const steps = [
  {
    title: "Connect Your Wallet",
    body: "Link your Phantom or Backpack wallet and choose what percentage of each airdrop to automatically sell. Your keys never leave your secure environment.",
    image: <Image2 />,
  },
  {
    title: "Monitor the Chain",
    body: "Fast Drop's proprietary engine monitors on-chain events and social feeds for the exact moment a \"claim is enabled\" function is called for your tracked airdrops.",
    image: <Image1 />,
  },
  {
    title: "Atomic Claim & Swap",
    body: "The instant a claim is live, we submit a high-priority atomic transaction that claims your tokens and swaps them on Jupiter—all in a single, lightning-fast execution.",
    image: <Image3 />,
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="pt-24 sm:pt-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[--brand-fg] sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-6 text-lg leading-8 text-[--brand-muted]">
            In three simple steps, go from chasing airdrops to cashing them out the moment they launch.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-4xl space-y-16">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="flex flex-col md:flex-row items-center gap-8 rounded-2xl bg-white/5 p-8 md:p-12"
            >
              <div className={`w-full md:w-1/2 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                {step.image}
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-bold text-[--brand-accent]">{step.title}</h3>
                <hr className="my-4 border-white/10" />
                <p className="mt-4 text-lg text-[--brand-muted]">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 