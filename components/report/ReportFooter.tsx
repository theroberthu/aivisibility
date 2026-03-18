import { ReportData } from "@/lib/types";

export default function ReportFooter({ data }: { data: ReportData }) {
  return (
    <div className="px-6 py-3 bg-light-bg flex items-center justify-between">
      <span className="font-mono text-[10px] text-muted">
        yourgeoreport.com
      </span>
      <span className="font-mono text-[10px] text-muted">
        Generated {data.reportDate} · v1.0
      </span>
    </div>
  );
}
