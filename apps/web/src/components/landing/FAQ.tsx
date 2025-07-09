const faqs = [
  {
    question: "Is my private key safe?",
    answer:
      "Your spending key is encrypted client-side; servers only see signed TX.",
  },
  {
    question: "What if the pool has no liquidity?",
    answer:
      "Fast Drop retries with fallback routes; if all fail, nothing is sold.",
  },
  {
    question: "Which airdrops are supported?",
    answer:
      "Any SPL token with a public claim program—just add a plugin or request one.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
      </div>
      <div className="mx-auto mt-12 max-w-4xl px-6 lg:px-8">
        <dl className="space-y-8">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <dt className="text-lg font-semibold leading-7">{faq.question}</dt>
              <dd className="mt-2 text-base leading-7 text-[--brand-muted]">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default FAQ; 