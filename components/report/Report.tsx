import { ReportData } from "@/lib/types";
import ReportHeader from "./ReportHeader";
import ScoreGauge from "./ScoreGauge";
import EngineBreakdown from "./EngineBreakdown";
import CompetitorTable from "./CompetitorTable";
import PromptResults from "./PromptResults";
import AIResponse from "./AIResponse";
import Recommendations from "./Recommendations";
import ReportFooter from "./ReportFooter";
import CollapsibleSection from "./CollapsibleSection";

export default function Report({ data }: { data: ReportData }) {
  return (
    <div className="bg-surface rounded-none sm:rounded-lg border border-border overflow-hidden shadow-sm">
      <ReportHeader data={data} />

      {/* Key finding callout */}
      <div className="px-6 py-5 border-b border-border bg-accent/5">
        <p className="font-mono text-[10px] uppercase tracking-wider text-accent mb-2 font-medium">
          Key Finding
        </p>
        <p className="text-sm text-dark leading-relaxed">{data.keyFinding}</p>
      </div>

      <ScoreGauge score={data.overallScore} median={data.categoryMedian} />
      <EngineBreakdown engines={data.engineBreakdown} />
      <CompetitorTable
        competitors={data.competitors}
        category={data.category}
      />
      <PromptResults
        results={data.promptResults}
        totalPrompts={data.methodology.prompts}
      />

      <CollapsibleSection title="Actual AI Responses">
        <AIResponse responses={data.aiResponses} brandName={data.brandName} hideTitle />
      </CollapsibleSection>

      <CollapsibleSection title="Recommendations">
        <Recommendations recommendations={data.recommendations} hideTitle />
      </CollapsibleSection>

      <ReportFooter data={data} />
    </div>
  );
}
