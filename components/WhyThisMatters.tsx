const exampleQueries = [
  { query: "Best collagen peptides", engines: "ChatGPT, Claude" },
  { query: "Best standing desk under $500", engines: "ChatGPT" },
  { query: "Best magnesium supplement for sleep", engines: "ChatGPT, Claude" },
  { query: "Wireless earbuds for working out", engines: "Claude" },
];

export default function WhyThisMatters() {
  return (
    <section className="py-24 md:py-36">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted mb-3">
          The Shift
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-dark tracking-tight leading-tight">
          Shoppers are asking AI before they search Amazon
        </h2>

        <p className="mt-6 text-lg text-secondary leading-relaxed max-w-xl">
          Before they open Amazon or Google, a growing number of buyers ask
          ChatGPT or Claude what to buy. These are the kinds of prompts they
          ask — and each one returns a shortlist of 3–5 brand recommendations:
        </p>

        {/* Example queries — tabular research index */}
        <div className="mt-8 bg-light-bg rounded-lg border border-border-subtle overflow-hidden">
          <div className="px-5 py-3 border-b border-border-subtle flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted font-medium">
              Real Buyer Prompts
            </span>
            <span className="font-mono text-[10px] text-muted">
              Engines returning recommendations
            </span>
          </div>
          <div className="px-5 py-4 space-y-3">
            {exampleQueries.map((item, i) => (
              <div
                key={item.query}
                className="flex items-start justify-between gap-4 text-[14px]"
              >
                <div className="flex items-start gap-3">
                  <span className="font-mono text-[10px] text-muted mt-1 shrink-0 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-medium text-dark">
                    &ldquo;{item.query}&rdquo;
                  </span>
                </div>
                <span className="font-mono text-[10px] text-muted shrink-0 mt-1 text-right">
                  {item.engines}
                </span>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-border-subtle">
            <p className="text-[11px] font-mono text-muted">
              Source: observed buyer prompt patterns across ChatGPT and Claude · March 2026
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-4 text-secondary leading-relaxed border-l-2 border-border pl-6">
          <p>
            When a shopper asks AI &ldquo;what should I buy,&rdquo; the response
            names 3–5 brands — not 20 links. If your brand isn&apos;t in that
            shortlist, you&apos;re invisible to a growing share of buyers who
            never make it to your Amazon listing or website.
          </p>
          <p className="font-medium text-dark">
            Most ecommerce brands have no way to see whether AI recommends them
            or their competitors. That&apos;s what this report shows you.
          </p>
        </div>
      </div>
    </section>
  );
}
