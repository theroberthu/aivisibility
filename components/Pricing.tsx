const tiers = [
  {
    name: "Free Scorecard",
    price: "Free",
    description: "Your AI visibility score, top 3 competitors, summary, and one next action.",
    features: [
      "AI Visibility Score (0–100)",
      "Top 3 competitors named",
      "1-sentence summary",
      "1 recommended next action",
      "Delivered in 24 hours",
    ],
    cta: "Get My Free Scorecard",
    href: "/#get-scorecard",
    highlighted: false,
    external: false,
  },
  {
    name: "Brand AI Visibility Audit",
    price: "$500",
    description: "Full report with prompt-level evidence, competitor analysis, and a review call.",
    features: [
      "Everything in the free scorecard",
      "10+ prompts tested per engine",
      "Prompt-by-prompt results",
      "Engine breakdown (ChatGPT vs Claude)",
      "Competitor insights & analysis",
      "Opportunity map",
      "4–6 prioritized recommendations with evidence",
      "Actual AI response transcripts",
      "30-minute review call with Robert",
      "Delivered in 5–7 business days",
    ],
    cta: "Book Your Audit",
    href: "https://theroberthu.com/free-strategy-session?utm_source=yourgeoreport&utm_medium=pricing&utm_campaign=paid-audit",
    highlighted: true,
    external: true,
  },
  {
    name: "Custom Consulting",
    price: "Let’s talk",
    description: "Ongoing AI visibility monitoring, content strategy, and technical positioning.",
    features: [
      "Recurring AI visibility tracking",
      "Content strategy for AI discovery",
      "Technical positioning guidance",
      "Custom prompt testing",
    ],
    cta: "Learn More",
    href: "https://theroberthu.com",
    highlighted: false,
    external: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted mb-3">
          Pricing
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-dark tracking-tight leading-tight">
          From free scorecard to full visibility strategy
        </h2>
        <p className="mt-4 text-secondary leading-relaxed max-w-xl">
          Start with a free scorecard. Upgrade when you need the complete picture.
        </p>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-xl p-6 flex flex-col ${
                tier.highlighted
                  ? "border-2 border-accent bg-surface shadow-sm"
                  : "border border-border bg-surface"
              }`}
            >
              {tier.highlighted && (
                <p className="font-mono text-[10px] uppercase tracking-wider text-accent font-medium mb-3">
                  Most popular
                </p>
              )}
              <h3 className="text-lg font-semibold text-dark">{tier.name}</h3>
              <p className="mt-1 font-mono text-2xl font-bold text-dark">{tier.price}</p>
              <p className="mt-3 text-sm text-secondary leading-relaxed">{tier.description}</p>

              <ul className="mt-5 space-y-2 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-secondary">
                    <svg className="w-4 h-4 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={tier.href}
                target={tier.external ? "_blank" : undefined}
                rel={tier.external ? "noopener noreferrer" : undefined}
                className={`mt-6 block text-center py-3 px-6 rounded-lg text-sm font-medium transition-colors ${
                  tier.highlighted
                    ? "bg-dark hover:bg-primary text-white"
                    : "border border-border text-dark hover:bg-light-bg"
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
