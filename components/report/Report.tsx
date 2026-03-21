import { ReportData } from "@/lib/types";
import ReportHeader from "./ReportHeader";
import ExecutiveSummary from "./ExecutiveSummary";
import ScoringDimensions from "./ScoringDimensions";
import EngineBreakdown from "./EngineBreakdown";
import PromptResults from "./PromptResults";
import CompetitorTable from "./CompetitorTable";
import CompetitorInsights from "./CompetitorInsights";
import OpportunityMap from "./OpportunityMap";
import AIResponse from "./AIResponse";
import Recommendations from "./Recommendations";
import MethodologyNote from "./MethodologyNote";
import CollapsibleSection from "./CollapsibleSection";

export default function Report({ data }: { data: ReportData }) {
  return (
    <div className="bg-surface rounded-none sm:rounded-lg border border-border overflow-hidden shadow-sm">
      <ReportHeader data={data} />

      {/* A. Executive Summary */}
      <ExecutiveSummary summary={data.executiveSummary} />

      {/* B. Visibility Score Summary */}
      <ScoringDimensions
        overall={data.overallScore}
        median={data.categoryMedian}
        dimensions={data.scoreDimensions}
      />
      <EngineBreakdown engines={data.engineBreakdown} />

      {/* C. Prompt-Level Results Table */}
      <PromptResults
        results={data.promptResults}
        totalPrompts={data.methodology.prompts}
      />

      {/* D. Competitors AI Recommended Most Often */}
      <CompetitorTable
        competitors={data.competitors}
        category={data.category}
      />

      {/* E. Why Competitors Are Winning */}
      <CompetitorInsights insights={data.competitorInsights} />

      {/* F. Opportunity Map */}
      <OpportunityMap buckets={data.opportunityMap} />

      {/* G. Recommended Next Actions */}
      <Recommendations recommendations={data.recommendations} />

      {/* Sample AI Responses (collapsible) */}
      <CollapsibleSection title="Actual AI Responses">
        <AIResponse responses={data.aiResponses} brandName={data.brandName} hideTitle />
      </CollapsibleSection>

      {/* H. Methodology / Disclaimer */}
      <MethodologyNote data={data} />
    </div>
  );
}
