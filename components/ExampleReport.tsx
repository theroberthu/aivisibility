const mentions = [
  { engine: "ChatGPT", mentioned: 2, total: 5 },
  { engine: "Claude", mentioned: 1, total: 5 },
  { engine: "Perplexity", mentioned: 2, total: 5 },
  { engine: "Gemini", mentioned: 0, total: 5 },
];

const competitors = [
  { rank: 1, name: "Vital Proteins", score: 84 },
  { rank: 2, name: "Ancient Nutrition", score: 71 },
  { rank: 3, name: "Sports Research", score: 62 },
  { rank: 4, name: "VitalGlow", score: 32, isSubject: true },
];

export default function ExampleReport() {
  return (
    <section className="py-20 md:py-28 bg-light-bg border-y border-border">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted mb-3">
          Sample Output
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-dark tracking-tight leading-tight">
          Sample GEO Report
        </h2>
        <p className="mt-4 text-secondary leading-relaxed max-w-xl">
          Here&apos;s what your GEO report looks like. We test real AI prompts
          across multiple engines and score how visible your brand is.
        </p>

        {/* Report document */}
        <div className="mt-10 bg-surface rounded-none sm:rounded-lg border border-border border-t-[3px] border-t-accent overflow-hidden">
          {/* Report masthead */}
          <div className="px-6 py-3 border-b border-divider bg-light-bg flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted font-medium">
              Your GEO Report
            </span>
            <span className="font-mono text-[10px] text-muted">
              Report ID: VG-2026-03
            </span>
          </div>

          {/* Report metadata */}
          <div className="px-6 py-4 border-b border-border grid grid-cols-3 gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted mb-1">
                Brand
              </p>
              <p className="text-sm font-semibold text-dark">VitalGlow</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted mb-1">
                Category
              </p>
              <p className="text-sm font-semibold text-dark">
                Collagen Peptides
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted mb-1">
                Engines Tested
              </p>
              <p className="text-sm font-semibold text-dark">4</p>
            </div>
          </div>

          {/* Score block — benchmark index */}
          <div className="px-6 py-10 border-b border-border">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted mb-4">
              Overall Visibility Score
            </p>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-7xl md:text-8xl font-bold text-dark tabular-nums leading-none">
                32
              </span>
              <span className="font-mono text-lg text-muted">/ 100</span>
            </div>

            {/* Benchmark scale bar */}
            <div className="mt-6 max-w-sm">
              <div className="relative h-[3px] bg-border rounded-full">
                <div
                  className="absolute left-0 top-0 h-full bg-accent rounded-full"
                  style={{ width: "32%" }}
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="font-mono text-[10px] text-muted">Low</span>
                <span className="font-mono text-[10px] text-muted">
                  Moderate
                </span>
                <span className="font-mono text-[10px] text-muted">High</span>
              </div>
            </div>

            <p className="mt-4 text-sm text-secondary">
              Below category median. Brand appears in 25% of tested prompts.
            </p>
          </div>

          {/* Mentions by engine — data table */}
          <div className="px-6 py-6 border-b border-border">
            <h4 className="font-mono text-[10px] uppercase tracking-wider text-muted mb-4">
              Mentions by Engine
            </h4>
            <div className="space-y-3">
              {mentions.map((m) => (
                <div key={m.engine} className="flex items-center gap-4">
                  <span className="font-mono text-sm text-dark w-24 shrink-0">
                    {m.engine}
                  </span>
                  <span className="font-mono text-sm text-dark tabular-nums w-12 shrink-0">
                    {m.mentioned} / {m.total}
                  </span>
                  <div className="flex-1 h-[2px] bg-border-subtle rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent/60 rounded-full"
                      style={{
                        width: `${(m.mentioned / m.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Competitors — ranked list */}
          <div className="px-6 py-6 border-b border-border">
            <h4 className="font-mono text-[10px] uppercase tracking-wider text-muted mb-4">
              Category Rankings
            </h4>
            <div className="space-y-0">
              {competitors.map((c) => (
                <div
                  key={c.name}
                  className={`flex items-center justify-between py-2.5 text-sm ${
                    c.isSubject
                      ? "bg-accent-subtle/50 -mx-3 px-3 rounded border-l-2 border-accent"
                      : "border-b border-border-subtle last:border-0"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-muted tabular-nums w-5">
                      #{c.rank}
                    </span>
                    <span
                      className={`${c.isSubject ? "font-semibold text-dark" : "text-dark"}`}
                    >
                      {c.name}
                    </span>
                  </div>
                  <span className="font-mono font-semibold text-dark tabular-nums">
                    {c.score}
                    <span className="text-muted font-normal">/100</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Example AI response */}
          <div className="px-6 py-6 border-b border-border">
            <h4 className="font-mono text-[10px] uppercase tracking-wider text-muted mb-3">
              Sample AI Response
            </h4>
            <p className="font-mono text-xs text-muted mb-2">
              Prompt tested: &ldquo;What are the best collagen peptide
              supplements?&rdquo;
            </p>
            <div className="text-sm text-secondary leading-relaxed bg-light-bg rounded-lg px-5 py-4 border border-border-subtle">
              &ldquo;For collagen peptides, Vital Proteins is widely recommended
              due to its third-party testing and bioavailability. Sports Research
              and Ancient Nutrition are also popular choices…&rdquo;
            </div>
            <p className="mt-3 text-xs text-muted">
              Note: VitalGlow was not mentioned in this response.
            </p>
          </div>

          {/* Report footer */}
          <div className="px-6 py-3 bg-light-bg flex items-center justify-between">
            <span className="font-mono text-[10px] text-muted">
              yourgeoreport.com
            </span>
            <span className="font-mono text-[10px] text-muted">
              Generated March 2026
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
