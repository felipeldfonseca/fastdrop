const steps = [
  {
    title: "1. Connect",
    body: "Link your Phantom or Backpack wallet and choose what % of each airdrop to auto-sell.",
  },
  {
    title: "2. Listen",
    body: "Fast Drop's claim engine monitors on-chain events and Discord/Twitter feeds for \"claim enabled\".",
  },
  {
    title: "3. Cash-Out",
    body: "We submit an atomic claim + Jupiter swap with priority fee, then send you a Telegram/Email receipt.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 sm:py-32">
      <div className="text-center">
        <h2 className="text-3xl font-bold">How It Works</h2>
      </div>
      <div className="mt-12 grid gap-8 sm:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-lg"
          >
            <h3 className="mb-2 font-semibold text-xl">{step.title}</h3>
            <p className="text-sm text-[--brand-muted]">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks; 