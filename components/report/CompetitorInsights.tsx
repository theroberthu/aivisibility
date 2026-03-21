import { CompetitorInsight } from "@/lib/types";

export default function CompetitorInsights({
  insights,
}: {
  insights: CompetitorInsight[];
}) {
  return (
    <div className="px-6 py-6 border-b border-border">
      <h2 className="font-mono text-[10px] uppercase tracking-wider text-muted mb-4">
        Why Competitors Are Showing Up Instead
      </h2>

      <div className="space-y-4">
        {insights.map((insight, i) => (
          <div
            key={i}
            className="border border-border rounded-lg px-4 py-3"
          >
            <p className="text-sm font-semibold text-dark mb-1.5">
              {insight.pattern}
            </p>
            <p className="text-sm text-secondary leading-relaxed">
              {insight.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
