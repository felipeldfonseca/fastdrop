"use client";

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="pt-24 sm:pt-32 pb-24 sm:pb-32">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 className="text-3xl font-bold">FAQs</h2>
      </div>
      <div className="mx-auto mt-12 max-w-4xl px-6 lg:px-8">
        <dl className="divide-y divide-white/10 border-b border-white/10">
          {faqs.map((faq, index) => (
            <div key={faq.question}>
              <dt>
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-start justify-between py-6 text-left"
                >
                  <span className="text-lg font-semibold leading-7">{faq.question}</span>
                  <span className="ml-6 flex h-7 items-center">
                    {openIndex === index ? (
                      <Minus className="h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Plus className="h-6 w-6" aria-hidden="true" />
                    )}
                  </span>
                </button>
              </dt>
              <dd
                className={`grid transition-all duration-500 ease-in-out ${
                  openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pb-6 text-base leading-7 text-[--brand-muted]">
                    {faq.answer}
                  </p>
                </div>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default FAQ; 