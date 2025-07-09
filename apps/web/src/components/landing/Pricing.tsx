const plans = [
  {
    name: "Free",
    description: "First-timers (< $100 claim)",
    fee: "0.5% of swap",
  },
  {
    name: "Pro",
    description: "Seasoned hunters",
    fee: "$19/mo + 0.25%",
  },
  {
    name: "Guild",
    description: "DAO / multisig",
    fee: "Custom — talk to us",
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 className="text-3xl font-bold">Plans & Pricing</h2>
      </div>
      <div className="mt-12 flow-root">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden shadow ring-1 ring-white/10 sm:rounded-lg">
              <table className="min-w-full divide-y divide-white/10">
                <thead className="bg-white/5">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6"
                    >
                      Plan
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold"
                    >
                      Who it's for
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold"
                    >
                      Fee
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {plans.map((plan) => (
                    <tr key={plan.name}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                        {plan.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-[--brand-muted]">
                        {plan.description}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-[--brand-muted]">
                        {plan.fee}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing; 