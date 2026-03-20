import { EngineResult } from "@/lib/types";

export default function EngineBreakdown({
  engines,
}: {
  engines: EngineResult[];
}) {
  return (
    <div className="px-6 py-6 border-b border-border">
      <h2 className="font-mono text-[10px] uppercase tracking-wider text-muted mb-4">
        Mentions by Engine
      </h2>
      <div className="space-y-3">
        {engines.map((m) => (
          <div key={m.engine} className="flex items-center gap-4">
            <div className="flex items-center gap-2 w-28 shrink-0">
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  m.percentage > 0 ? "bg-emerald-500" : "bg-red-400"
                }`}
              />
              <span className="font-mono text-sm text-dark">{m.engine}</span>
            </div>
            <span className="font-mono text-sm text-dark tabular-nums w-12 shrink-0">
              {m.mentioned}/{m.total}
            </span>
            <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  m.percentage > 0 ? "bg-accent/70" : ""
                }`}
                style={{ width: `${m.percentage}%` }}
              />
            </div>
            <span className="font-mono text-xs text-muted tabular-nums w-10 text-right">
              {m.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
