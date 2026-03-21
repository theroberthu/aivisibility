export interface EngineResult {
  engine: string;
  mentioned: number;
  total: number;
  percentage: number;
}

export interface Competitor {
  rank: number;
  name: string;
  score: number;
  delta: string;
  isSubject: boolean;
}

export interface PromptResult {
  prompt: string;
  engines: Array<{
    engine: string;
    mentioned: boolean;
    topBrands: string[];
  }>;
  note: string;
}

export interface AIResponseData {
  engine: string;
  prompt: string;
  response: string;
  brandMentioned: boolean;
  highlightedBrands: string[];
}

export interface Recommendation {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  evidence: string;
}

export interface ScoreDimension {
  label: string;
  score: number;
  description: string;
}

export interface OpportunityBucket {
  label: string;
  description: string;
  prompts: string[];
}

export interface CompetitorInsight {
  pattern: string;
  detail: string;
}

export interface ReportData {
  brandName: string;
  category: string;
  reportDate: string;
  reportId: string;
  methodology: {
    engines: number;
    prompts: number;
    enginesUsed: string[];
    dateGenerated: string;
  };
  overallScore: number;
  categoryMedian: number;
  keyFinding: string;
  executiveSummary: {
    overview: string;
    losingPromptTypes: string;
    winningCompetitorTypes: string;
    bestOpportunity: string;
  };
  scoreDimensions: ScoreDimension[];
  engineBreakdown: EngineResult[];
  competitors: Competitor[];
  competitorInsights: CompetitorInsight[];
  opportunityMap: OpportunityBucket[];
  promptResults: PromptResult[];
  aiResponses: AIResponseData[];
  recommendations: Recommendation[];
}
