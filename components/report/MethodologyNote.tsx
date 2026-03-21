import { ReportData } from "@/lib/types";

export default function MethodologyNote({
  data,
}: {
  data: ReportData;
}) {
  return (
    <div className="px-6 py-5 bg-light-bg space-y-3">
      <h2 className="font-mono text-[10px] uppercase tracking-wider text-muted mb-2">
        Methodology
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
        <div>
          <p className="font-mono text-[10px] text-muted/70 uppercase">Engines</p>
          <p className="text-sm text-secondary font-mono">
            {data.methodology.enginesUsed?.join(", ") || `${data.methodology.engines} engines`}
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] text-muted/70 uppercase">Prompts</p>
          <p className="text-sm text-secondary font-mono">
            {data.methodology.prompts} buyer-intent
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] text-muted/70 uppercase">Date</p>
          <p className="text-sm text-secondary font-mono">
            {data.methodology.dateGenerated || data.reportDate}
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] text-muted/70 uppercase">Report ID</p>
          <p className="text-sm text-secondary font-mono">{data.reportId}</p>
        </div>
      </div>

      <p className="text-[11px] text-muted/70 leading-relaxed">
        This report tests real buyer-style prompts across {data.methodology.enginesUsed?.join(" and ") || "ChatGPT and Claude"} as
        they respond at the time of analysis. Results are directional and based
        on a sample of {data.methodology.prompts} prompts. AI responses change
        as models update and training data evolves. Scores reflect relative
        visibility within this sample, not a guarantee of future performance.
      </p>

      <div className="flex items-center justify-between pt-2">
        <span className="font-mono text-[10px] text-muted">
          yourgeoreport.com
        </span>
        <span className="font-mono text-[10px] text-muted">
          Generated {data.reportDate} · v2.0
        </span>
      </div>
    </div>
  );
}
