const mentions = [
  { engine: "ChatGPT", mentioned: 2, total: 5, pct: 40 },
  { engine: "Claude", mentioned: 1, total: 5, pct: 20 },
  { engine: "Perplexity", mentioned: 2, total: 5, pct: 40 },
  { engine: "Gemini", mentioned: 0, total: 5, pct: 0 },
];

const competitors = [
  { rank: 1, name: "Vital Proteins", score: 84, delta: "+12" },
  { rank: 2, name: "Ancient Nutrition", score: 71, delta: "+3" },
  { rank: 3, name: "Sports Research", score: 62, delta: "-5" },
  { rank: 4, name: "VitalGlow", score: 32, delta: "new", isSubject: true },
];

const promptsTested = [
  "Best collagen peptide supplements",
  "What collagen powder should I buy?",
  "Collagen supplements with best bioavailability",
  "Best collagen for skin and joints",
  "Top rated collagen peptides on Amazon",
];

export default function ExampleReport() {
  return (
    <section className="py-20 md:py-28 bg-light-bg border-y border-border">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted mb-3">
          Sample Output
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-dark tracking-tight leading-tight">
          What your report looks like
        </h2>
        <p className="mt-4 text-secondary leading-relaxed max-w-xl">
          Each report tests 20 buyer-intent prompts across ChatGPT, Claude,
          Perplexity, and Gemini — then scores your brand against category
          competitors.
        </p>

        {/* Report document */}
        <div className="mt-10 bg-surface rounded-none sm:rounded-lg border border-border overflow-hidden shadow-sm">
          {/* Report masthead */}
          <div className="px-6 py-3 border-b border-border bg-dark text-white/70 flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-medium">
              Your GEO Report
            </span>
            <span className="font-mono text-[10px]">
              ID: VG-2026-03-R1
            </span>
          </div>

          {/* Report metadata — 4 columns */}
          <div className="px-6 py-4 border-b border-border grid grid-cols-2 sm:grid-cols-4 gap-4 bg-light-bg">
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
                Report Date
              </p>
              <p className="text-sm font-semibold text-dark font-mono tabular-nums">Mar 15, 2026</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted mb-1">
                Methodology
              </p>
              <p className="text-sm font-semibold text-dark font-mono tabular-nums">4 engines · 20 prompts</p>
            </div>
          </div>

          {/* Key finding callout */}
          <div className="px-6 py-5 border-b border-border bg-accent-subtle/30">
            <p className="font-mono text-[10px] uppercase tracking-wider text-accent mb-2 font-medium">
              Key Finding
            </p>
            <p className="text-sm text-dark leading-relaxed">
              VitalGlow appears in <span className="font-semibold">25% of tested prompts</span> — below
              the category median of 48%. Your brand is mentioned by 2 of 4 engines, but absent from
              Gemini entirely. Top competitor Vital Proteins appears in 80% of prompts.
            </p>
          </div>

          {/* Score block — benchmark index */}
          <div className="px-6 py-10 border-b border-border">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted mb-4">
              Overall Visibility Score
            </p>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-7xl md:text-8xl font-bold text-dark tabular-nums leading-none">
                32
              </span>
              <div>
                <span className="font-mono text-lg text-muted">/ 100</span>
                <p className="font-mono text-xs text-muted mt-0.5">Category median: 48</p>
              </div>
            </div>

            {/* Benchmark scale bar */}
            <div className="mt-6 max-w-sm">
              <div className="relative h-[3px] bg-border rounded-full">
                <div
                  className="absolute left-0 top-0 h-full bg-accent rounded-full"
                  style={{ width: "32%" }}
                />
                {/* Median marker */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-px h-3 bg-muted"
                  style={{ left: "48%" }}
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="font-mono text-[10px] text-muted">0 — Low</span>
                <span className="font-mono text-[10px] text-muted">
                  50 — Moderate
                </span>
                <span className="font-mono text-[10px] text-muted">100 — High</span>
              </div>
            </div>

            <p className="mt-5 text-sm text-secondary">
              Score reflects the percentage of buyer-intent prompts where your brand was
              mentioned or recommended, weighted by engine and prompt relevance.
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
                  <span className="font-mono text-sm text-dark tabular-nums w-16 shrink-0">
                    {m.mentioned} / {m.total}
                  </span>
                  <div className="flex-1 h-[3px] bg-border-subtle rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent/60 rounded-full"
                      style={{
                        width: `${m.pct}%`,
                      }}
                    />
                  </div>
                  <span className="font-mono text-xs text-muted tabular-nums w-10 text-right">
                    {m.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Competitors — ranked list */}
          <div className="px-6 py-6 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-mono text-[10px] uppercase tracking-wider text-muted">
                Category Rankings — Collagen Peptides
              </h4>
              <span className="font-mono text-[10px] text-muted">vs. prior month</span>
            </div>
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
                      {c.isSubject && (
                        <span className="ml-2 font-mono text-[10px] text-accent font-normal">YOUR BRAND</span>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-muted tabular-nums">
                      {c.delta}
                    </span>
                    <span className="font-mono font-semibold text-dark tabular-nums">
                      {c.score}
                      <span className="text-muted font-normal">/100</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prompts tested */}
          <div className="px-6 py-6 border-b border-border">
            <h4 className="font-mono text-[10px] uppercase tracking-wider text-muted mb-3">
              Sample Prompts Tested
            </h4>
            <div className="space-y-2">
              {promptsTested.map((prompt, i) => (
                <div key={prompt} className="flex items-start gap-3 text-sm">
                  <span className="font-mono text-[10px] text-muted tabular-nums mt-1 shrink-0 w-4">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-secondary">
                    &ldquo;{prompt}&rdquo;
                  </span>
                </div>
              ))}
            </div>
            <p className="font-mono text-[10px] text-muted mt-3">
              Showing 5 of 20 prompts · Full prompt list included in report
            </p>
          </div>

          {/* Example AI response */}
          <div className="px-6 py-6 border-b border-border">
            <h4 className="font-mono text-[10px] uppercase tracking-wider text-muted mb-3">
              Actual AI Response — ChatGPT
            </h4>
            <p className="font-mono text-[10px] text-muted mb-2">
              Prompt: &ldquo;What are the best collagen peptide supplements?&rdquo;
            </p>
            <div className="text-sm text-secondary leading-relaxed bg-light-bg rounded-lg px-5 py-4 border border-border-subtle font-mono text-[13px]">
              &ldquo;For collagen peptides, <span className="text-dark font-medium">Vital Proteins</span> is widely recommended
              due to its third-party testing and bioavailability. <span className="text-dark font-medium">Sports Research</span>{" "}
              and <span className="text-dark font-medium">Ancient Nutrition</span> are also popular choices. Look for
              hydrolyzed collagen peptides with Types I and III for best absorption…&rdquo;
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
              <p className="text-xs text-muted">
                VitalGlow was not mentioned in this response
              </p>
            </div>
          </div>

          {/* Report footer */}
          <div className="px-6 py-3 bg-light-bg flex items-center justify-between">
            <span className="font-mono text-[10px] text-muted">
              yourgeoreport.com
            </span>
            <span className="font-mono text-[10px] text-muted">
              Generated Mar 15, 2026 · v1.0
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
