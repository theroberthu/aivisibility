const mentions = [
  { engine: "ChatGPT", result: "Mentioned in 2 of 5 prompts", rate: 40 },
  { engine: "Claude", result: "Mentioned in 1 of 5 prompts", rate: 20 },
  { engine: "Perplexity", result: "Mentioned in 2 of 5 prompts", rate: 40 },
  { engine: "Gemini", result: "Mentioned in 0 of 5 prompts", rate: 0 },
];

const competitors = [
  { name: "Ancient Nutrition", score: 71 },
  { name: "Vital Proteins", score: 84 },
  { name: "Sports Research", score: 62 },
];

export default function ExampleReport() {
  return (
    <section className="py-20 md:py-28 bg-light-bg border-y border-border">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted mb-3">
          Sample Output
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-dark tracking-tight leading-tight">
          AI Visibility Report
        </h2>
        <p className="mt-4 text-secondary leading-relaxed max-w-xl">
          Here&apos;s what a report looks like. We test real AI prompts across
          multiple engines and score how visible your brand is.
        </p>

        <div className="mt-10 bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
          {/* Report header */}
          <div className="px-6 py-4 border-b border-border bg-light-bg">
            <div className="flex flex-wrap gap-x-8 gap-y-1 text-sm">
              <div>
                <span className="text-muted">Brand</span>{" "}
                <span className="font-semibold text-dark">VitalGlow</span>
              </div>
              <div>
                <span className="text-muted">Category</span>{" "}
                <span className="font-semibold text-dark">
                  Collagen Peptides
                </span>
              </div>
              <div>
                <span className="text-muted">Engines tested</span>{" "}
                <span className="font-semibold text-dark">4</span>
              </div>
            </div>
          </div>

          {/* Score block */}
          <div className="px-6 py-10 border-b border-border text-center">
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-3">
              Overall Visibility Score
            </p>
            <div className="inline-flex items-baseline gap-1">
              <span className="text-6xl md:text-7xl font-extrabold text-accent tabular-nums">
                32
              </span>
              <span className="text-xl font-medium text-muted">/ 100</span>
            </div>
            <p className="mt-3 text-sm text-secondary">
              Low visibility — your brand rarely appears in AI recommendations
            </p>
          </div>

          {/* Mentions breakdown */}
          <div className="px-6 py-6 border-b border-border">
            <h4 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4">
              Mentions by Engine
            </h4>
            <div className="space-y-3">
              {mentions.map((m) => (
                <div key={m.engine} className="flex items-center gap-4">
                  <span className="text-sm font-medium text-dark w-24 shrink-0">
                    {m.engine}
                  </span>
                  <div className="flex-1 h-2 bg-light-bg rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all"
                      style={{ width: `${m.rate}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted w-28 text-right shrink-0">
                    {m.result}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Competitors */}
          <div className="px-6 py-6 border-b border-border">
            <h4 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4">
              Competitors with Higher Visibility
            </h4>
            <div className="space-y-2">
              {competitors.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-dark">{c.name}</span>
                  <span className="font-semibold text-dark tabular-nums">
                    {c.score}
                    <span className="text-muted font-normal">/100</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Example AI response */}
          <div className="px-6 py-6">
            <h4 className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-4">
              Sample AI Response
            </h4>
            <blockquote className="text-sm text-secondary leading-relaxed bg-light-bg rounded-lg px-5 py-4 border-l-2 border-accent italic">
              &ldquo;For collagen peptides, Vital Proteins is widely recommended
              due to its third-party testing and bioavailability. Sports Research
              and Ancient Nutrition are also popular choices…&rdquo;
            </blockquote>
            <p className="mt-3 text-xs text-muted">
              Note: VitalGlow was not mentioned in this response.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
