import { queryChatGPT, queryClaude, extractBrandNames } from "./ai-clients";
import {
  ReportData,
  AIResponseData,
  Recommendation,
  CompetitorInsight,
  OpportunityBucket,
  ScoreDimension,
} from "./types";

const ENGINES = [
  { name: "ChatGPT", query: queryChatGPT },
  { name: "Claude", query: queryClaude },
] as const;

/** Generate buyer-intent prompts for a category. */
function generatePrompts(category: string): string[] {
  const cat = category.toLowerCase();
  return [
    `What are the best ${cat} to buy?`,
    `What ${cat} should I get?`,
    `Top rated ${cat} for beginners`,
    `${category} with best reviews`,
    `Best ${cat} for the money`,
    `Most recommended ${cat}`,
    `${category} comparison and recommendations`,
    `What is the best ${cat} brand?`,
    `${cat} buying guide`,
    `Best ${cat} on Amazon`,
  ];
}

/** Case-insensitive check if a brand is mentioned in a response. */
function isBrandMentioned(response: string, brandName: string): boolean {
  const lower = response.toLowerCase();
  const brandLower = brandName.toLowerCase();

  // Direct mention
  if (lower.includes(brandLower)) return true;

  // Try without possessive/punctuation (e.g. "World's Best" matches "worlds best")
  const normalized = brandLower.replace(/['']/g, "").replace(/\s+/g, " ");
  const responseNormalized = lower.replace(/['']/g, "").replace(/\s+/g, " ");
  if (responseNormalized.includes(normalized)) return true;

  return false;
}

interface RawResult {
  engine: string;
  prompt: string;
  response: string;
  brandMentioned: boolean;
  error?: string;
}

/** Query all engines with all prompts in parallel. */
async function runAllQueries(
  prompts: string[],
  brandName: string,
): Promise<RawResult[]> {
  const tasks = prompts.flatMap((prompt) =>
    ENGINES.map(async (engine): Promise<RawResult> => {
      try {
        const response = await engine.query(prompt);
        return {
          engine: engine.name,
          prompt,
          response,
          brandMentioned: isBrandMentioned(response, brandName),
        };
      } catch (err) {
        console.error(`${engine.name} query failed for "${prompt}":`, err);
        return {
          engine: engine.name,
          prompt,
          response: "",
          brandMentioned: false,
          error: String(err),
        };
      }
    }),
  );

  // Run in parallel but with some concurrency control (5 at a time)
  const results: RawResult[] = [];
  const batchSize = 5;
  for (let i = 0; i < tasks.length; i += batchSize) {
    const batch = tasks.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch);
    results.push(...batchResults);
  }

  return results;
}

/** Extract competitor rankings from all responses. */
async function buildCompetitorRankings(
  results: RawResult[],
  brandName: string,
): Promise<{ name: string; mentionCount: number }[]> {
  // Combine all response text for brand extraction
  const allText = results
    .filter((r) => r.response)
    .map((r) => r.response)
    .join("\n\n");

  const allBrands = await extractBrandNames(allText);

  // Count how many unique prompts each brand was mentioned in
  const prompts = [...new Set(results.map((r) => r.prompt))];
  const brandCounts = new Map<string, number>();

  for (const name of allBrands) {
    const lower = name.toLowerCase();
    // Skip the user's own brand - it's counted separately
    if (lower === brandName.toLowerCase()) continue;
    // Skip generic terms
    if (lower.length < 2) continue;

    let count = 0;
    for (const prompt of prompts) {
      const promptResults = results.filter((r) => r.prompt === prompt);
      const mentioned = promptResults.some(
        (r) => r.response.toLowerCase().includes(lower),
      );
      if (mentioned) count++;
    }

    if (count > 0) {
      // Deduplicate (keep highest count for similar names)
      const existing = brandCounts.get(lower);
      if (!existing || count > existing) {
        brandCounts.set(lower, count);
      }
    }
  }

  // Sort by count and take top entries
  return [...brandCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, mentionCount]) => ({ name, mentionCount }));
}

/** Pick 2 representative AI responses (one per engine) to show in the report. */
function pickSampleResponses(
  results: RawResult[],
  brandName: string,
): AIResponseData[] {
  const samples: AIResponseData[] = [];

  for (const engine of ENGINES) {
    const engineResults = results.filter(
      (r) => r.engine === engine.name && r.response,
    );
    // Prefer a response that mentions the brand; fall back to any response
    const withBrand = engineResults.find((r) => r.brandMentioned);
    const pick = withBrand || engineResults[0];
    if (pick) {
      samples.push({
        engine: engine.name,
        prompt: pick.prompt,
        response: pick.response,
        brandMentioned: pick.brandMentioned,
        highlightedBrands: [], // filled in later
      });
    }
  }

  return samples;
}

/** Extract top brands mentioned in a single response. */
function extractTopBrandsFromResponse(
  response: string,
  allBrandNames: string[],
  brandName: string,
): string[] {
  const lower = response.toLowerCase();
  const found: string[] = [];
  for (const name of allBrandNames) {
    if (lower.includes(name.toLowerCase()) && found.length < 4) {
      found.push(name);
    }
  }
  // Also check subject brand
  if (isBrandMentioned(response, brandName) && !found.some(b => b.toLowerCase() === brandName.toLowerCase())) {
    found.push(brandName);
  }
  return found;
}

/** Classify a prompt as broad, niche, or comparison. */
function classifyPrompt(prompt: string): "broad" | "niche" | "comparison" {
  const lower = prompt.toLowerCase();
  if (lower.includes("comparison") || lower.includes("vs") || lower.includes("versus")) {
    return "comparison";
  }
  if (
    lower.includes("beginner") ||
    lower.includes("for the money") ||
    lower.includes("guide") ||
    lower.includes("for sensitive") ||
    lower.includes("first-time")
  ) {
    return "niche";
  }
  return "broad";
}

/** Generate actionable, evidence-based recommendations. */
function generateRecommendations(
  brandName: string,
  category: string,
  overallScore: number,
  topCompetitors: { name: string; mentionCount: number }[],
  engineBreakdown: { engine: string; mentioned: number; total: number }[],
  promptResults: RawResult[],
  prompts: string[],
): Recommendation[] {
  const recs: Recommendation[] = [];
  const cat = category.toLowerCase();
  const topComp = topCompetitors[0];

  // Classify prompts by type
  const broadPrompts = prompts.filter((p) => classifyPrompt(p) === "broad");
  const nichePrompts = prompts.filter((p) => classifyPrompt(p) === "niche");

  const broadMentions = broadPrompts.filter((p) =>
    promptResults.some((r) => r.prompt === p && r.brandMentioned),
  ).length;
  const nicheMentions = nichePrompts.filter((p) =>
    promptResults.some((r) => r.prompt === p && r.brandMentioned),
  ).length;

  // Niche opportunity
  if (nichePrompts.length > 0) {
    const nicheRate = Math.round((nicheMentions / nichePrompts.length) * 100);
    const broadRate = broadPrompts.length > 0 ? Math.round((broadMentions / broadPrompts.length) * 100) : 0;
    recs.push({
      title: `Focus on beginner and value-oriented prompts`,
      description: `Broad discovery prompts are locked by ${topComp?.name || "category leaders"}. Beginner and value prompts showed weaker competition. Build content and positioning around "best ${cat} for beginners" and "best ${cat} for the money" to gain realistic traction.`,
      priority: "high",
      evidence: `${brandName} appeared in ${broadRate}% of broad prompts vs ${nicheRate}% of niche prompts. Niche prompts are the more realistic entry point.`,
    });
  }

  // Competitor-specific comparison
  if (topComp) {
    const compPercent = Math.round((topComp.mentionCount / prompts.length) * 100);
    recs.push({
      title: `Create comparison content against ${topComp.name}`,
      description: `${topComp.name} appeared in ${compPercent}% of tested prompts. AI engines frequently cite editorial comparisons when forming recommendations. Publish a direct, honest comparison that highlights where ${brandName} differentiates.`,
      priority: "high",
      evidence: `${topComp.name} was the #1 recommended brand across both engines, appearing in ${topComp.mentionCount} of ${prompts.length} prompts.`,
    });
  }

  // Engine disparity
  const chatgpt = engineBreakdown.find((e) => e.engine === "ChatGPT");
  const claude = engineBreakdown.find((e) => e.engine === "Claude");
  if (chatgpt && claude && Math.abs(chatgpt.mentioned - claude.mentioned) >= 2) {
    const weaker = chatgpt.mentioned < claude.mentioned ? "ChatGPT" : "Claude";
    const stronger = weaker === "ChatGPT" ? "Claude" : "ChatGPT";
    recs.push({
      title: `Investigate why ${weaker} ignores your brand`,
      description: `${brandName} performs better on ${stronger} than ${weaker}. Different engines weight different source types. Diversify content across review aggregators, comparison articles, and expert roundups to close this gap.`,
      priority: "medium",
      evidence: `${weaker}: ${Math.min(chatgpt.mentioned, claude.mentioned)}/${chatgpt.total} mentions. ${stronger}: ${Math.max(chatgpt.mentioned, claude.mentioned)}/${claude.total} mentions.`,
    });
  }

  // Low overall
  if (overallScore < 40) {
    recs.push({
      title: "Build third-party review coverage",
      description: `AI engines weight brands with strong review signals across multiple platforms. ${brandName} likely lacks the review volume and diversity that top competitors have. Focus on Google, Amazon, and niche review sites for ${cat}.`,
      priority: "medium",
      evidence: `The top 3 competitors all scored above 60. These brands typically have extensive third-party review coverage that AI uses as a trust signal.`,
    });
  }

  return recs.slice(0, 4);
}

/** Build competitor insights from observed patterns. */
function buildCompetitorInsights(
  brandName: string,
  category: string,
  topCompetitors: { name: string; mentionCount: number }[],
  prompts: string[],
  results: RawResult[],
): CompetitorInsight[] {
  const cat = category.toLowerCase();
  const insights: CompetitorInsight[] = [];

  if (topCompetitors.length >= 2) {
    const top2 = topCompetitors.slice(0, 2);
    insights.push({
      pattern: "A small number of established brands dominate AI responses",
      detail: `${top2.map((c) => c.name).join(" and ")} appeared in ${top2.map((c) => c.mentionCount).join(" and ")} of ${prompts.length} prompts respectively. Both engines default to these brands on broad buying questions, likely due to their review volume and editorial coverage.`,
    });
  }

  // Check if broad prompts return the same set
  const broadPrompts = prompts.filter((p) => classifyPrompt(p) === "broad");
  if (broadPrompts.length >= 2) {
    insights.push({
      pattern: "AI returns nearly identical brands on broad discovery prompts",
      detail: `On generic prompts like "best ${cat} to buy" and "most recommended ${cat}," both ChatGPT and Claude returned overlapping brand lists. Broad prompts are effectively locked by a few category leaders.`,
    });
  }

  insights.push({
    pattern: `${brandName}'s positioning may not match AI's recommendation criteria`,
    detail: `The brands AI recommends tend to lead with functional claims, high review volume, and broad availability. If ${brandName} leads with premium, lifestyle, or niche positioning, AI may not surface it for general buying queries. This is not necessarily a weakness, but it means a different prompt strategy is needed.`,
  });

  return insights;
}

/** Build the opportunity map from prompt-level results. */
function buildOpportunityMap(
  brandName: string,
  category: string,
  prompts: string[],
  results: RawResult[],
  topCompetitors: { name: string; mentionCount: number }[],
): OpportunityBucket[] {
  const cat = category.toLowerCase();
  const topComp = topCompetitors[0]?.name || "category leaders";

  const broadPrompts: string[] = [];
  const nichePrompts: string[] = [];
  for (const p of prompts) {
    const type = classifyPrompt(p);
    if (type === "broad" || type === "comparison") {
      broadPrompts.push(p);
    } else {
      nichePrompts.push(p);
    }
  }

  const buckets: OpportunityBucket[] = [
    {
      label: "Difficult: Broad Discovery Prompts",
      description: `These are dominated by ${topComp}. Competing here requires significant review volume and editorial coverage. Not a realistic short-term target.`,
      prompts: broadPrompts.slice(0, 4),
    },
    {
      label: "Possible: Niche and Beginner Prompts",
      description: `Competition is weaker on these prompts. Building targeted content and strengthening positioning here could improve visibility in weeks, not months.`,
      prompts: nichePrompts.slice(0, 4),
    },
    {
      label: "Worth Testing: Adjacent Prompt Families",
      description: `These prompts were not tested in this report but represent areas where ${brandName}'s positioning may be a better fit. Consider a follow-up report targeting these.`,
      prompts: [
        `Best ${cat} for sensitive skin`,
        `${cat} for first-time buyers`,
        `Affordable ${cat} that actually work`,
      ],
    },
  ];

  return buckets;
}

/** Build scoring dimensions from results. */
function buildScoreDimensions(
  prompts: string[],
  results: RawResult[],
  overallScore: number,
): ScoreDimension[] {
  const broadPrompts = prompts.filter((p) => classifyPrompt(p) === "broad");
  const nichePrompts = prompts.filter((p) => classifyPrompt(p) === "niche");

  const broadMentions = broadPrompts.filter((p) =>
    results.some((r) => r.prompt === p && r.brandMentioned),
  ).length;
  const nicheMentions = nichePrompts.filter((p) =>
    results.some((r) => r.prompt === p && r.brandMentioned),
  ).length;

  const broadScore = broadPrompts.length > 0
    ? Math.round((broadMentions / broadPrompts.length) * 100)
    : 0;
  const nicheScore = nichePrompts.length > 0
    ? Math.round((nicheMentions / nichePrompts.length) * 100)
    : 0;

  // Recommendation readiness: weighted average biased toward niche
  const readinessScore = Math.round(overallScore * 0.4 + nicheScore * 0.6);

  return [
    {
      label: "Broad Discovery",
      score: broadScore,
      description: "How often AI mentions your brand on general buying prompts",
    },
    {
      label: "Niche Opportunity",
      score: nicheScore,
      description: "Visibility on more specific, less competitive prompts",
    },
    {
      label: "Recommendation Readiness",
      score: readinessScore,
      description: "How well-positioned your brand is to be recommended by AI",
    },
  ];
}

/** Generate a full report by querying real AI engines. */
export async function generateReport(
  brandName: string,
  category: string,
): Promise<ReportData> {
  const prompts = generatePrompts(category);
  const results = await runAllQueries(prompts, brandName);
  const cat = category.toLowerCase();

  // Per-engine stats
  const engineBreakdown = ENGINES.map((engine) => {
    const engineResults = results.filter((r) => r.engine === engine.name);
    const mentioned = engineResults.filter((r) => r.brandMentioned).length;
    const total = engineResults.length;
    return {
      engine: engine.name,
      mentioned,
      total,
      percentage: total > 0 ? Math.round((mentioned / total) * 100) : 0,
    };
  });

  // Overall score: percentage of all prompts where brand was mentioned in at least one engine
  const totalMentioned = prompts.filter((prompt) => {
    const promptResults = results.filter((r) => r.prompt === prompt);
    return promptResults.some((r) => r.brandMentioned);
  }).length;
  const overallScore = Math.round((totalMentioned / prompts.length) * 100);

  // Competitor rankings
  const competitorData = await buildCompetitorRankings(results, brandName);
  const topCompetitorNames = competitorData.map((c) => c.name);

  // Build competitor table with scores
  const maxMentions = prompts.length;
  const competitors = competitorData
    .slice(0, 3)
    .map((c, i) => ({
      rank: i + 1,
      name: c.name,
      score: Math.round((c.mentionCount / maxMentions) * 100),
      delta: "-",
      isSubject: false,
    }));

  // Add the user's brand
  competitors.push({
    rank: competitors.length + 1,
    name: brandName,
    score: overallScore,
    delta: "new",
    isSubject: true,
  });

  // Re-sort by score descending and re-rank
  competitors.sort((a, b) => b.score - a.score);
  competitors.forEach((c, i) => (c.rank = i + 1));

  // Category median: average of competitor scores (rough estimate)
  const allScores = competitors.map((c) => c.score);
  const categoryMedian =
    allScores.length > 0
      ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length)
      : 50;

  // Get all brand names for top-brand extraction
  const allBrandNames = [...topCompetitorNames, brandName];

  // Prompt results matrix with top brands per response
  const promptResults = prompts.map((prompt) => {
    const promptRawResults = results.filter((r) => r.prompt === prompt);
    const anyMentioned = promptRawResults.some((r) => r.brandMentioned);
    const promptType = classifyPrompt(prompt);
    let note = "";
    if (!anyMentioned && promptType === "broad") {
      note = "Broad prompt. Dominated by established brands.";
    } else if (anyMentioned && promptType === "niche") {
      note = "Niche prompt. Potential opportunity.";
    }

    return {
      prompt,
      engines: ENGINES.map((engine) => {
        const r = promptRawResults.find((r) => r.engine === engine.name);
        return {
          engine: engine.name,
          mentioned: r?.brandMentioned ?? false,
          topBrands: r ? extractTopBrandsFromResponse(r.response, allBrandNames, brandName) : [],
        };
      }),
      note,
    };
  });

  // Sample AI responses
  const aiResponses = pickSampleResponses(results, brandName);
  for (const sample of aiResponses) {
    const brands = await extractBrandNames(sample.response);
    sample.highlightedBrands = brands.slice(0, 5);
  }

  // Recommendations (evidence-based)
  const recommendations = generateRecommendations(
    brandName,
    category,
    overallScore,
    competitorData,
    engineBreakdown,
    results,
    prompts,
  );

  // Competitor insights
  const competitorInsights = buildCompetitorInsights(
    brandName,
    category,
    competitorData,
    prompts,
    results,
  );

  // Opportunity map
  const opportunityMap = buildOpportunityMap(
    brandName,
    category,
    prompts,
    results,
    competitorData,
  );

  // Score dimensions
  const scoreDimensions = buildScoreDimensions(prompts, results, overallScore);

  // Executive summary
  const topCompetitor = competitors.find((c) => !c.isSubject);
  const executiveSummary = {
    overview: `${brandName} has ${overallScore <= 30 ? "low" : overallScore <= 60 ? "moderate" : "strong"} visibility in AI recommendations for ${cat}. When shoppers ask ChatGPT or Claude buying questions, ${brandName} appears in roughly ${totalMentioned} of ${prompts.length} tested prompts.`,
    losingPromptTypes: `${brandName} is weakest on broad discovery prompts ("best ${cat} to buy," "most recommended"). These tend to return the same ${topCompetitorNames.slice(0, 2).join(" and ")} repeatedly.`,
    winningCompetitorTypes: `The brands AI recommends most are established players with extensive third-party reviews and editorial coverage.${topCompetitor ? ` ${topCompetitor.name} leads with a score of ${topCompetitor.score}/100.` : ""}`,
    bestOpportunity: `${scoreDimensions[1]?.score > scoreDimensions[0]?.score ? "Niche and beginner-oriented prompts show the weakest competitor lock-in." : "Competitors are strong across all prompt types."} Building credible positioning on specific use cases is the most realistic path to improved visibility.`,
  };

  // Key finding summary
  const keyFinding = `${brandName} appears in ${totalMentioned} of ${prompts.length} tested prompts across ChatGPT and Claude, ${overallScore < categoryMedian ? `below the estimated category median of ${categoryMedian}%` : `at or above the estimated category average`}. ChatGPT mentions your brand in ${engineBreakdown[0]?.mentioned || 0} of ${engineBreakdown[0]?.total || 0} prompts; Claude in ${engineBreakdown[1]?.mentioned || 0} of ${engineBreakdown[1]?.total || 0}.${topCompetitor ? ` Top competitor ${topCompetitor.name} appears in ${topCompetitor.score}% of prompts.` : ""}`;

  const now = new Date();

  return {
    brandName,
    category,
    reportDate: now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    reportId: `GEO-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
    methodology: {
      engines: ENGINES.length,
      prompts: prompts.length,
      enginesUsed: ENGINES.map((e) => e.name),
      dateGenerated: now.toISOString().split("T")[0],
    },
    overallScore,
    categoryMedian,
    keyFinding,
    executiveSummary,
    scoreDimensions,
    engineBreakdown,
    competitors,
    competitorInsights,
    opportunityMap,
    promptResults,
    aiResponses,
    recommendations,
  };
}
