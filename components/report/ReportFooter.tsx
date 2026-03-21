import { ReportData } from "@/lib/types";

export default function ReportFooter({ data }: { data: ReportData }) {
  return (
    <div className="px-6 py-4 bg-light-bg space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] text-muted">
          yourgeoreport.com
        </span>
        <span className="font-mono text-[10px] text-muted">
          Generated {data.reportDate} · v1.0
        </span>
      </div>
      <p className="text-[11px] text-muted/70 leading-relaxed">
        This report tests real buyer-style prompts across ChatGPT and Claude
        as they respond at the time of analysis. Results are directional, a
        snapshot of current AI recommendations, not a guarantee of future
        visibility or sales performance. AI responses change as models and
        sources evolve.
      </p>
    </div>
  );
}
