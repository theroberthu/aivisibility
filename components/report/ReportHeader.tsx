import { ReportData } from "@/lib/types";

export default function ReportHeader({ data }: { data: ReportData }) {
  return (
    <>
      <div className="px-6 py-3 border-b border-border bg-dark text-white/70 flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-medium">
          AI Visibility Report
        </span>
        <span className="font-mono text-[10px]">ID: {data.reportId}</span>
      </div>

      <div className="px-6 py-4 border-b border-border grid grid-cols-2 sm:grid-cols-4 gap-4 bg-light-bg">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted mb-1">
            Brand
          </p>
          <p className="text-sm font-semibold text-dark">{data.brandName}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted mb-1">
            Category
          </p>
          <p className="text-sm font-semibold text-dark">{data.category}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted mb-1">
            Report Date
          </p>
          <p className="text-sm font-semibold text-dark font-mono tabular-nums">
            {data.reportDate}
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted mb-1">
            Methodology
          </p>
          <p className="text-sm font-semibold text-dark font-mono tabular-nums">
            {data.methodology.engines} engines · {data.methodology.prompts}{" "}
            prompts
          </p>
        </div>
      </div>
    </>
  );
}
