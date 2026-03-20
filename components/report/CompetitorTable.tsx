import { Competitor } from "@/lib/types";

export default function CompetitorTable({
  competitors,
  category,
}: {
  competitors: Competitor[];
  category: string;
}) {
  return (
    <div className="px-6 py-6 border-b border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-mono text-[10px] uppercase tracking-wider text-muted">
          Category Rankings - {category}
        </h2>
        <span className="font-mono text-[10px] text-muted">vs. prior month</span>
      </div>
      <div className="space-y-0">
        {competitors.map((c) => (
          <div
            key={c.name}
            className={`flex items-center justify-between py-3 text-sm ${
              c.isSubject
                ? "bg-accent/5 -mx-3 px-3 rounded border-l-2 border-accent"
                : "border-b border-border/50 last:border-0"
            }`}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="font-mono text-xs text-muted tabular-nums w-5 shrink-0">
                #{c.rank}
              </span>
              <span
                className={`truncate ${
                  c.isSubject ? "font-semibold text-dark" : "text-dark"
                }`}
              >
                {c.name}
                {c.isSubject && (
                  <span className="ml-2 font-mono text-[10px] text-accent font-normal">
                    YOUR BRAND
                  </span>
                )}
              </span>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              {/* Score bar */}
              <div className="w-20 h-1.5 bg-border rounded-full overflow-hidden hidden sm:block">
                <div
                  className={`h-full rounded-full ${
                    c.isSubject ? "bg-accent" : "bg-muted/50"
                  }`}
                  style={{ width: `${c.score}%` }}
                />
              </div>
              <span
                className={`font-mono text-xs tabular-nums ${
                  c.delta.startsWith("+")
                    ? "text-emerald-600"
                    : c.delta.startsWith("-")
                    ? "text-red-500"
                    : "text-muted"
                }`}
              >
                {c.delta}
              </span>
              <span className="font-mono font-semibold text-dark tabular-nums w-16 text-right">
                {c.score}
                <span className="text-muted font-normal">/100</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
