import { ReportData } from "@/lib/types";

export default function ScoreGauge({
  score,
  median,
}: {
  score: ReportData["overallScore"];
  median: ReportData["categoryMedian"];
}) {
  return (
    <div className="px-6 py-10 border-b border-border">
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted mb-4">
        Overall Visibility Score
      </p>
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-7xl md:text-8xl font-bold text-dark tabular-nums leading-none">
          {score}
        </span>
        <div>
          <span className="font-mono text-lg text-muted">/ 100</span>
          <p className="font-mono text-xs text-muted mt-0.5">
            Est. category median: {median}
          </p>
        </div>
      </div>

      <div className="mt-6 max-w-md">
        {/* Gradient bar */}
        <div className="relative h-2.5 rounded-full overflow-hidden bg-gradient-to-r from-red-400 via-amber-400 to-emerald-400">
          {/* Dark overlay to mute the gradient */}
          <div className="absolute inset-0 bg-white/40" />
        </div>

        {/* Brand score marker */}
        <div className="relative h-0 max-w-md">
          <div
            className="absolute -top-[18px] flex flex-col items-center"
            style={{ left: `${score}%`, transform: "translateX(-50%)" }}
          >
            <div className="w-3 h-3 rounded-full bg-dark border-2 border-white shadow-sm" />
          </div>
        </div>

        {/* Median marker */}
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
          <span className="font-mono text-[10px] text-muted">
            50 · Moderate
          </span>
          <span className="font-mono text-[10px] text-muted">100 · High</span>
        </div>
      </div>

      <p className="mt-5 text-sm text-secondary">
        Your score reflects how often AI mentions your brand when shoppers ask
        buying questions, across both ChatGPT and Claude.
      </p>
    </div>
  );
}
