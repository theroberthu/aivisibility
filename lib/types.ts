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
  engines: Array<{ engine: string; mentioned: boolean }>;
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
}

export interface ReportData {
  brandName: string;
  category: string;
  reportDate: string;
  reportId: string;
  methodology: { engines: number; prompts: number };
  overallScore: number;
  categoryMedian: number;
  keyFinding: string;
  engineBreakdown: EngineResult[];
  competitors: Competitor[];
  promptResults: PromptResult[];
  aiResponses: AIResponseData[];
  recommendations: Recommendation[];
}
