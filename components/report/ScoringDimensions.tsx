import { ScoreDimension } from "@/lib/types";

export default function ScoringDimensions({
  overall,
  median,
  dimensions,
}: {
  overall: number;
  median: number;
  dimensions: ScoreDimension[];
}) {
  return (
    <div className="px-6 py-6 border-b border-border">
      <h2 className="font-mono text-[10px] uppercase tracking-wider text-muted mb-4">
        Visibility Score Summary
      </h2>

      {/* Overall score */}
      <div className="flex items-baseline gap-3 mb-6">
        <span className="font-mono text-6xl md:text-7xl font-bold text-dark tabular-nums leading-none">
          {overall}
        </span>
        <div>
          <span className="font-mono text-lg text-muted">/ 100</span>
          <p className="font-mono text-xs text-muted mt-0.5">
            Est. category median: {median}
          </p>
        </div>
      </div>

      {/* Gradient bar */}
      <div className="max-w-md mb-8">
        <div className="relative h-2.5 rounded-full overflow-hidden bg-gradient-to-r from-red-400 via-amber-400 to-emerald-400">
          <div className="absolute inset-0 bg-white/40" />
        </div>
        <div className="relative h-0 max-w-md">
          <div
            className="absolute -top-[18px] flex flex-col items-center"
            style={{ left: `${overall}%`, transform: "translateX(-50%)" }}
          >
            <div className="w-3 h-3 rounded-full bg-dark border-2 border-white shadow-sm" />
          </div>
        </div>
        <div className="relative h-0 max-w-md">
          <div
            className="absolute top-[-18px] flex flex-col items-center"
            style={{ left: `${median}%`, transform: "translateX(-50%)" }}
          >
            <div className="w-px h-5 bg-muted" />
            <span className="font-mono text-[9px] text-muted mt-0.5">
              median
            </span>
          </div>
        </div>
        <div className="flex justify-between mt-5">
          <span className="font-mono text-[10px] text-muted">0 · Low</span>
          <span className="font-mono text-[10px] text-muted">50 · Moderate</span>
          <span className="font-mono text-[10px] text-muted">100 · High</span>
        </div>
      </div>

      {/* Dimension breakdown */}
      <div className="space-y-4">
        {dimensions.map((dim) => (
          <div key={dim.label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-dark">{dim.label}</span>
              <span className="font-mono text-sm font-semibold text-dark tabular-nums">
                {dim.score}
                <span className="text-muted font-normal">/100</span>
              </span>
            </div>
            <div className="h-2 bg-border rounded-full overflow-hidden mb-1">
              <div
                className={`h-full rounded-full ${
                  dim.score >= 60
                    ? "bg-emerald-500/70"
                    : dim.score >= 30
                      ? "bg-amber-400/70"
                      : "bg-red-400/70"
                }`}
                style={{ width: `${dim.score}%` }}
              />
            </div>
            <p className="text-xs text-muted">{dim.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
