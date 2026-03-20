import { Recommendation } from "@/lib/types";

const PRIORITY_STYLES = {
  high: "bg-red-50 text-red-700 border-red-200",
  medium: "bg-amber-50 text-amber-700 border-amber-200",
  low: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export default function Recommendations({
  recommendations,
}: {
  recommendations: Recommendation[];
}) {
  return (
    <div className="px-6 py-6 border-b border-border">
      <h2 className="font-mono text-[10px] uppercase tracking-wider text-muted mb-4">
        Recommendations
      </h2>
      <div className="space-y-3">
        {recommendations.map((rec, i) => (
          <div
            key={i}
            className="border border-border rounded-lg px-4 py-3"
          >
            <div className="flex items-start gap-3">
              <span className="font-mono text-[10px] text-muted tabular-nums mt-1 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-sm font-semibold text-dark">
                    {rec.title}
                  </span>
                  <span
                    className={`font-mono text-[9px] uppercase px-1.5 py-0.5 rounded border ${PRIORITY_STYLES[rec.priority]}`}
                  >
                    {rec.priority}
                  </span>
                </div>
                <p className="text-sm text-secondary leading-relaxed">
                  {rec.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
