import { ReportData } from "@/lib/types";

export default function ExecutiveSummary({
  summary,
}: {
  summary: ReportData["executiveSummary"];
}) {
  return (
    <div className="px-6 py-6 border-b border-border">
      <h2 className="font-mono text-[10px] uppercase tracking-wider text-muted mb-4">
        Executive Summary
      </h2>

      <p className="text-sm text-dark leading-relaxed mb-4">
        {summary.overview}
      </p>

      <div className="space-y-3">
        <div className="border-l-2 border-red-300 pl-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted mb-1">
            Where you are losing
          </p>
          <p className="text-sm text-secondary leading-relaxed">
            {summary.losingPromptTypes}
          </p>
        </div>

        <div className="border-l-2 border-amber-300 pl-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted mb-1">
            Why competitors are winning
          </p>
          <p className="text-sm text-secondary leading-relaxed">
            {summary.winningCompetitorTypes}
          </p>
        </div>

        <div className="border-l-2 border-emerald-400 pl-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted mb-1">
            Your best opportunity
          </p>
          <p className="text-sm text-secondary leading-relaxed">
            {summary.bestOpportunity}
          </p>
        </div>
      </div>
    </div>
  );
}
