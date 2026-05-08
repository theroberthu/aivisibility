import { ScorecardData } from "@/lib/mock-scorecard-data";

export default function ScorecardSample({ data }: { data: ScorecardData }) {
  return (
    <div className="bg-surface rounded-none sm:rounded-lg border border-border overflow-hidden shadow-sm">
      {/* Header bar */}
      <div className="px-6 py-3 border-b border-border bg-dark text-white/70 flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-medium">
          AI Visibility Scorecard
        </span>
        <span className="font-mono text-[10px]">Free</span>
      </div>

      {/* Metadata */}
      <div className="px-6 py-4 border-b border-border grid grid-cols-3 gap-4 bg-light-bg">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted mb-1">Brand</p>
          <p className="text-sm font-semibold text-dark">{data.brandName}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted mb-1">Category</p>
          <p className="text-sm font-semibold text-dark">{data.category}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted mb-1">Date</p>
          <p className="text-sm font-semibold text-dark font-mono tabular-nums">{data.reportDate}</p>
        </div>
      </div>

      {/* Score */}
      <div className="px-6 py-6 border-b border-border">
        <h2 className="font-mono text-[10px] uppercase tracking-wider text-muted mb-4">
          Visibility Score
        </h2>
        <div className="flex items-baseline gap-3 mb-6">
          <span className="font-mono text-6xl md:text-7xl font-bold text-dark tabular-nums leading-none">
            {data.overallScore}
          </span>
          <div>
            <span className="font-mono text-lg text-muted">/ 100</span>
            <p className="font-mono text-xs text-muted mt-0.5">
              Est. category median: {data.categoryMedian}
            </p>
          </div>
        </div>
        <div className="max-w-md">
          <div className="relative h-2.5 rounded-full overflow-hidden bg-gradient-to-r from-red-400 via-amber-400 to-emerald-400">
            <div className="absolute inset-0 bg-white/40" />
          </div>
          <div className="relative h-0 max-w-md">
            <div
              className="absolute -top-[18px] flex flex-col items-center"
              style={{ left: `${data.overallScore}%`, transform: "translateX(-50%)" }}
            >
              <div className="w-3 h-3 rounded-full bg-dark border-2 border-white shadow-sm" />
            </div>
          </div>
          <div className="relative h-0 max-w-md">
            <div
              className="absolute top-[-18px] flex flex-col items-center"
              style={{ left: `${data.categoryMedian}%`, transform: "translateX(-50%)" }}
            >
              <div className="w-px h-5 bg-muted" />
              <span className="font-mono text-[9px] text-muted mt-0.5">median</span>
            </div>
          </div>
          <div className="flex justify-between mt-5">
            <span className="font-mono text-[10px] text-muted">0 · Low</span>
            <span className="font-mono text-[10px] text-muted">50 · Moderate</span>
            <span className="font-mono text-[10px] text-muted">100 · High</span>
          </div>
        </div>
      </div>

      {/* Top 3 competitors */}
      <div className="px-6 py-6 border-b border-border">
        <h2 className="font-mono text-[10px] uppercase tracking-wider text-muted mb-4">
          Top 3 Competitors
        </h2>
        <div className="space-y-3">
          {data.topCompetitors.map((c) => (
            <div key={c.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-light-bg border border-border flex items-center justify-center font-mono text-[11px] font-semibold text-muted">
                  {c.rank}
                </span>
                <span className="text-sm font-medium text-dark">{c.name}</span>
              </div>
              <span className="font-mono text-sm font-semibold text-dark tabular-nums">
                {c.score}<span className="text-muted font-normal">/100</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="px-6 py-6 border-b border-border">
        <h2 className="font-mono text-[10px] uppercase tracking-wider text-muted mb-3">
          Summary
        </h2>
        <p className="text-sm text-secondary leading-relaxed">{data.summaryLine}</p>
      </div>

      {/* Recommendation */}
      <div className="px-6 py-6">
        <h2 className="font-mono text-[10px] uppercase tracking-wider text-muted mb-3">
          Recommended Next Action
        </h2>
        <div className="bg-light-bg rounded-lg p-4 border border-border-subtle">
          <p className="text-sm font-semibold text-dark mb-1">{data.recommendation.title}</p>
          <p className="text-xs text-secondary leading-relaxed">{data.recommendation.description}</p>
        </div>
      </div>
    </div>
  );
}
