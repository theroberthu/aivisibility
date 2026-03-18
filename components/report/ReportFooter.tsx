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
        This report is based on sampled prompts and responses from the AI
        engines tested at the time of analysis. Results are directional, not
        exhaustive, and may change as models, sources, and recommendation
        behavior evolve. This report is intended as a visibility benchmark,
        not a guarantee of recommendation or sales performance.
      </p>
    </div>
  );
}
