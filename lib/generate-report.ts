import { queryChatGPT, queryClaude, extractBrandNames } from "./ai-clients";
import { ReportData, AIResponseData, Recommendation } from "./types";

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
    // Skip the user's own brand — it's counted separately
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

/** Generate actionable recommendations based on results. */
function generateRecommendations(
  brandName: string,
  category: string,
  overallScore: number,
  topCompetitors: string[],
  engineBreakdown: { engine: string; mentioned: number; total: number }[],
): Recommendation[] {
  const recs: Recommendation[] = [];
  const cat = category.toLowerCase();

  // Low overall visibility
  if (overallScore < 40) {
    recs.push({
      title: "Build review coverage across platforms",
      description: `${brandName} has limited visibility in AI responses. AI engines rely on aggregated review data and authoritative sources. Focus on generating authentic reviews on Google, Amazon, and niche review sites relevant to ${cat}.`,
      priority: "high",
    });
  }

  // Missing from one engine more than the other
  const chatgpt = engineBreakdown.find((e) => e.engine === "ChatGPT");
  const claude = engineBreakdown.find((e) => e.engine === "Claude");
  if (chatgpt && claude && Math.abs(chatgpt.mentioned - claude.mentioned) >= 2) {
    const weaker = chatgpt.mentioned < claude.mentioned ? "ChatGPT" : "Claude";
    recs.push({
      title: `Improve visibility on ${weaker}`,
      description: `${brandName} appears less frequently in ${weaker} responses. Different AI engines weight different sources. Diversify your content presence across review sites, comparison articles, and expert roundups.`,
      priority: "high",
    });
  }

  // Competitor gap
  if (topCompetitors.length > 0) {
    recs.push({
      title: 'Create comparison and "best of" content',
      description: `Publish detailed comparison content that positions ${brandName} against ${topCompetitors.slice(0, 2).join(" and ")}. AI engines frequently cite editorial comparisons when forming product recommendations.`,
      priority: "high",
    });
  }

  // Structured data
  recs.push({
    title: "Strengthen structured data markup",
    description: `Ensure your product pages include comprehensive schema markup (Product, Review, AggregateRating). This helps AI engines extract and cite your product information accurately.`,
    priority: "medium",
  });

  // Long-tail queries
  if (overallScore < 60) {
    recs.push({
      title: "Target long-tail buyer-intent queries",
      description: `${brandName} is absent from niche prompts like "best ${cat} for beginners." Create content that directly addresses specific use cases to increase coverage in AI responses.`,
      priority: "medium",
    });
  }

  return recs.slice(0, 4);
}

/** Generate a full report by querying real AI engines. */
export async function generateReport(
  brandName: string,
  category: string,
): Promise<ReportData> {
  const prompts = generatePrompts(category);
  const results = await runAllQueries(prompts, brandName);

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
  const maxMentions = prompts.length; // max possible mentions
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

  // Prompt results matrix
  const promptResults = prompts.map((prompt) => ({
    prompt,
    engines: ENGINES.map((engine) => ({
      engine: engine.name,
      mentioned: results.some(
        (r) =>
          r.prompt === prompt &&
          r.engine === engine.name &&
          r.brandMentioned,
      ),
    })),
  }));

  // Sample AI responses
  const aiResponses = pickSampleResponses(results, brandName);
  // Fill in highlighted brands
  for (const sample of aiResponses) {
    const brands = await extractBrandNames(sample.response);
    sample.highlightedBrands = brands.slice(0, 5);
  }

  // Recommendations
  const recommendations = generateRecommendations(
    brandName,
    category,
    overallScore,
    topCompetitorNames,
    engineBreakdown,
  );

  // Key finding summary
  const topCompetitor = competitors.find((c) => !c.isSubject);
  const keyFinding = `${brandName} appears in ${totalMentioned} of ${prompts.length * ENGINES.length} tested prompts across ChatGPT and Claude, ${overallScore < categoryMedian ? `below the estimated category median of ${categoryMedian}%` : `at or above the estimated category average`}. ChatGPT mentions your brand in ${engineBreakdown[0]?.mentioned || 0} of ${engineBreakdown[0]?.total || 0} prompts; Claude in ${engineBreakdown[1]?.mentioned || 0} of ${engineBreakdown[1]?.total || 0}.${topCompetitor ? ` Top competitor ${topCompetitor.name} appears in ${topCompetitor.score}% of prompts.` : ""}`;

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
    methodology: { engines: ENGINES.length, prompts: prompts.length },
    overallScore,
    categoryMedian,
    keyFinding,
    engineBreakdown,
    competitors,
    promptResults,
    aiResponses,
    recommendations,
  };
}
