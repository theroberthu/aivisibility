import { ReportData } from "./types";

const ENGINES = ["ChatGPT", "Claude"];

const CATEGORY_COMPETITORS: Record<string, string[]> = {
  "Collagen Peptides": ["Vital Proteins", "Ancient Nutrition", "Sports Research"],
  "Protein Powder": ["Optimum Nutrition", "Dymatize", "Garden of Life"],
  "Vitamins & Supplements": ["Nature Made", "Garden of Life", "NOW Foods"],
  "Skincare": ["CeraVe", "The Ordinary", "Paula's Choice"],
  "Hair Care": ["Olaplex", "Moroccanoil", "Briogeo"],
  "Coffee": ["Lavazza", "Peet's Coffee", "Blue Bottle"],
  "Pet Food": ["Blue Buffalo", "Purina Pro Plan", "Hill's Science Diet"],
  "Baby Products": ["Pampers", "Huggies", "Honest Company"],
  "Fitness Equipment": ["Peloton", "Bowflex", "NordicTrack"],
  "Mattress": ["Casper", "Purple", "Tempur-Pedic"],
  "Cookware": ["Le Creuset", "All-Clad", "Lodge"],
  "Cleaning Products": ["Mrs. Meyer's", "Method", "Seventh Generation"],
  "Oral Care": ["Oral-B", "Colgate", "Sensodyne"],
  "Electronics & Gadgets": ["Anker", "Belkin", "JBL"],
  "Outdoor Gear": ["REI Co-op", "Patagonia", "The North Face"],
  "Home Fragrance": ["Yankee Candle", "Diptyque", "Bath & Body Works"],
  "Snacks & Food": ["KIND", "RXBAR", "Clif Bar"],
  "Activewear": ["Lululemon", "Nike", "Gymshark"],
};

const DEFAULT_COMPETITORS = ["MarketLeader Pro", "CategoryKing", "TopBrand Co"];

function getCompetitors(category: string): string[] {
  return CATEGORY_COMPETITORS[category] || DEFAULT_COMPETITORS;
}

function generatePrompts(category: string): string[] {
  return [
    `Best ${category.toLowerCase()} to buy`,
    `What ${category.toLowerCase()} should I get?`,
    `Top rated ${category.toLowerCase()} for beginners`,
    `${category} with best reviews`,
    `Best ${category.toLowerCase()} for the money`,
    `Most recommended ${category.toLowerCase()}`,
    `${category} comparison and recommendations`,
    `What is the best ${category.toLowerCase()} brand?`,
    `${category.toLowerCase()} buying guide`,
    `Best ${category.toLowerCase()} on Amazon`,
  ];
}

export function generateMockReport(
  brandName: string,
  category: string
): ReportData {
  const competitors = getCompetitors(category);
  const prompts = generatePrompts(category);
  const now = new Date();
  const reportDate = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const dateGenerated = now.toISOString().split("T")[0];

  const overallScore = 32;
  const categoryMedian = 48;

  const engineBreakdown = [
    { engine: "ChatGPT", mentioned: 3, total: prompts.length, percentage: 30 },
    { engine: "Claude", mentioned: 2, total: prompts.length, percentage: 20 },
  ];

  const competitorData = [
    { rank: 1, name: competitors[0], score: 84, delta: "+12", isSubject: false },
    { rank: 2, name: competitors[1], score: 71, delta: "+3", isSubject: false },
    { rank: 3, name: competitors[2], score: 62, delta: "-5", isSubject: false },
    { rank: 4, name: brandName, score: overallScore, delta: "new", isSubject: true },
  ];

  // Enhanced prompt results with top brands and notes
  const promptResults = prompts.slice(0, 10).map((prompt, i) => ({
    prompt,
    engines: ENGINES.map((engine) => ({
      engine,
      mentioned: engine === "Claude" ? i < 2 : i < 3,
      topBrands:
        engine === "ChatGPT"
          ? [competitors[0], competitors[1], ...(i < 3 ? [brandName] : [competitors[2]])]
          : [competitors[0], ...(i < 2 ? [brandName, competitors[2]] : [competitors[1], competitors[2]])],
    })),
    note:
      i === 0
        ? "Broad discovery prompt. Large brands dominate."
        : i === 2
          ? "Beginner prompt. Potential niche opening."
          : i === 4
            ? "Value prompt. Price-competitive brands favored."
            : "",
  }));

  const aiResponses = [
    {
      engine: "ChatGPT",
      prompt: `What are the best ${category.toLowerCase()}?`,
      response: `For ${category.toLowerCase()}, ${competitors[0]} is widely recommended due to its quality and strong reviews. ${competitors[2]} and ${competitors[1]} are also popular choices among consumers. Look for products with verified reviews and third-party testing for the best results.`,
      brandMentioned: false,
      highlightedBrands: [competitors[0], competitors[1], competitors[2]],
    },
    {
      engine: "Claude",
      prompt: `Best ${category.toLowerCase()} to buy right now`,
      response: `Based on recent reviews and expert recommendations, the top ${category.toLowerCase()} include ${competitors[0]} (rated highest overall), ${competitors[1]}, and ${brandName}. ${brandName} has been gaining traction for its value proposition, though it still trails the category leaders in overall visibility.`,
      brandMentioned: true,
      highlightedBrands: [competitors[0], competitors[1], brandName],
    },
  ];

  const recommendations = [
    {
      title: `Strengthen positioning on beginner and value prompts`,
      description: `AI favored ${competitors[0]} and ${competitors[1]} on broad discovery prompts, but beginner and value-oriented prompts showed weaker competition. If ${brandName} can credibly position on "best for beginners" or "best value," these prompt families are the most realistic entry points.`,
      priority: "high" as const,
      evidence: `${brandName} appeared in 0 of 4 broad discovery prompts but was mentioned in 2 beginner-adjacent prompts on Claude.`,
    },
    {
      title: `Create comparison content against ${competitors[0]}`,
      description: `${competitors[0]} appeared in ${Math.round(84)}% of tested prompts. AI engines frequently cite editorial comparisons when forming recommendations. Publish a direct, honest comparison that highlights where ${brandName} differentiates.`,
      priority: "high" as const,
      evidence: `${competitors[0]} was the #1 brand across both engines, appearing in 8 of 10 prompts tested.`,
    },
    {
      title: "Build third-party review coverage",
      description: `AI engines appear to weight brands with strong review signals across multiple platforms. ${brandName} likely lacks the review volume and diversity that top competitors have on Google, Amazon, and niche review sites for ${category.toLowerCase()}.`,
      priority: "medium" as const,
      evidence: `The top 3 competitors all have scores above 60. These brands typically have extensive third-party review coverage that AI uses as a trust signal.`,
    },
    {
      title: `Test narrower prompt families around specific use cases`,
      description: `Broad "${category.toLowerCase()}" prompts are dominated by established players. Consider building content and positioning around narrower use cases where ${brandName} has a stronger claim. Prompts like "best ${category.toLowerCase()} for [specific need]" may offer more realistic openings.`,
      priority: "medium" as const,
      evidence: `${brandName} scored 0% on 7 of 10 broad prompts. Niche positioning may yield better results than competing head-on.`,
    },
  ];

  const executiveSummary = {
    overview: `${brandName} has low visibility in AI recommendations for ${category.toLowerCase()}. When shoppers ask ChatGPT or Claude buying questions about ${category.toLowerCase()}, ${brandName} appears in roughly 1 in 4 prompts. The category is currently dominated by a few established brands with deep review coverage.`,
    losingPromptTypes: `${brandName} is absent from broad discovery prompts ("best ${category.toLowerCase()} to buy," "most recommended") and comparison prompts. These tend to return the same 2-3 large brands repeatedly.`,
    winningCompetitorTypes: `The brands AI recommends most are established, mass-market players with extensive third-party reviews and editorial coverage. ${competitors[0]} and ${competitors[1]} appear in nearly every response.`,
    bestOpportunity: `Beginner-oriented and value-focused prompts show the weakest competitor lock-in. If ${brandName} can build credible positioning in these prompt families ("top rated for beginners," "best for the money"), there is a realistic path to AI visibility without competing head-on against category leaders.`,
  };

  const scoreDimensions = [
    {
      label: "Broad Discovery",
      score: 15,
      description: "How often AI mentions your brand on general buying prompts",
    },
    {
      label: "Niche Opportunity",
      score: 40,
      description: "Visibility on more specific, less competitive prompts",
    },
    {
      label: "Recommendation Readiness",
      score: 35,
      description: "How well-positioned your brand is to be recommended by AI",
    },
  ];

  const competitorInsights = [
    {
      pattern: "Mass-market brands with deep review coverage dominate",
      detail: `${competitors[0]} and ${competitors[1]} appeared in 8 and 7 of 10 prompts respectively. Both brands have extensive reviews on Amazon, Google, and third-party comparison sites. AI engines use this signal density to form recommendations.`,
    },
    {
      pattern: "AI defaults to the same 2-3 brands on broad prompts",
      detail: `On generic prompts like "best ${category.toLowerCase()} to buy" and "most recommended," both engines returned nearly identical brand lists. This suggests that broad prompts are effectively locked by a few established players.`,
    },
    {
      pattern: `${brandName}'s positioning may not match what AI looks for`,
      detail: `The brands AI recommends tend to lead with functional claims and high review volume. If ${brandName} leads with lifestyle, premium, or aesthetic positioning, AI may not surface it for functional buying queries.`,
    },
  ];

  const opportunityMap = [
    {
      label: "Difficult: Broad Discovery Prompts",
      description: `These are dominated by ${competitors[0]} and ${competitors[1]}. Competing here requires significant review volume and editorial coverage. Not a realistic short-term target.`,
      prompts: [
        `Best ${category.toLowerCase()} to buy`,
        `Most recommended ${category.toLowerCase()}`,
        `What is the best ${category.toLowerCase()} brand?`,
      ],
    },
    {
      label: "Possible: Niche and Beginner Prompts",
      description: `Competition is weaker on these prompts. ${brandName} appeared in some of these on Claude. Building targeted content here could improve visibility within weeks, not months.`,
      prompts: [
        `Top rated ${category.toLowerCase()} for beginners`,
        `Best ${category.toLowerCase()} for the money`,
        `${category.toLowerCase()} buying guide`,
      ],
    },
    {
      label: "Worth Testing: Adjacent Prompt Families",
      description: `These prompts were not tested in this report but represent areas where ${brandName}'s positioning may be a better fit. Consider requesting a follow-up report targeting these.`,
      prompts: [
        `Best ${category.toLowerCase()} for sensitive skin`,
        `${category.toLowerCase()} for first-time buyers`,
        `Affordable ${category.toLowerCase()} that actually work`,
      ],
    },
  ];

  const keyFinding = `${brandName} appears in 5 of ${prompts.length * ENGINES.length} tested prompts across ChatGPT and Claude, below the estimated category median of ${categoryMedian}%. ChatGPT mentions your brand in 3 of ${prompts.length} prompts; Claude in 2 of ${prompts.length}. Top competitor ${competitors[0]} appears in 80% of prompts.`;

  return {
    brandName,
    category,
    reportDate,
    reportId: `GEO-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
    methodology: {
      engines: ENGINES.length,
      prompts: prompts.length,
      enginesUsed: [...ENGINES],
      dateGenerated,
    },
    overallScore,
    categoryMedian,
    keyFinding,
    executiveSummary,
    scoreDimensions,
    engineBreakdown,
    competitors: competitorData,
    competitorInsights,
    opportunityMap,
    promptResults,
    aiResponses,
    recommendations,
  };
}
