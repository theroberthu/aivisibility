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

  const overallScore = 32;
  const categoryMedian = 48;

  const engineBreakdown = [
    { engine: "ChatGPT", mentioned: 3, total: 10, percentage: 30 },
    { engine: "Claude", mentioned: 2, total: 10, percentage: 20 },
  ];

  const competitorData = [
    { rank: 1, name: competitors[0], score: 84, delta: "+12", isSubject: false },
    { rank: 2, name: competitors[1], score: 71, delta: "+3", isSubject: false },
    { rank: 3, name: competitors[2], score: 62, delta: "-5", isSubject: false },
    { rank: 4, name: brandName, score: overallScore, delta: "new", isSubject: true },
  ];

  const promptResults = prompts.slice(0, 10).map((prompt, i) => ({
    prompt,
    engines: ENGINES.map((engine) => ({
      engine,
      mentioned:
        engine === "Claude"
          ? i < 2
          : i < 3,
    })),
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
      title: "Build review coverage across platforms",
      description: `${brandName} has limited reviews on major platforms. AI engines rely heavily on aggregated review data to form recommendations. Focus on generating authentic reviews on Google, Amazon, and niche review sites relevant to ${category.toLowerCase()}.`,
      priority: "high" as const,
    },
    {
      title: "Create comparison and \"best of\" content",
      description: `Publish detailed comparison content that positions ${brandName} against ${competitors[0]} and ${competitors[1]}. AI engines frequently cite editorial comparisons when forming product recommendations.`,
      priority: "high" as const,
    },
    {
      title: "Strengthen structured data markup",
      description: `Ensure your product pages include comprehensive schema markup (Product, Review, AggregateRating). This helps AI engines extract and cite your product information accurately.`,
      priority: "medium" as const,
    },
    {
      title: "Target long-tail buyer-intent queries",
      description: `${brandName} is absent from niche prompts like "best ${category.toLowerCase()} for beginners." Create content that directly addresses these specific use cases to increase coverage in AI responses.`,
      priority: "medium" as const,
    },
  ];

  const keyFinding = `${brandName} appears in 5 of 20 tested prompts across ChatGPT and Claude — below the category median of ${categoryMedian}%. ChatGPT mentions your brand in 3 of 10 prompts; Claude in 2 of 10. Top competitor ${competitors[0]} appears in 80% of prompts.`;

  return {
    brandName,
    category,
    reportDate,
    reportId: `GEO-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
    methodology: { engines: 2, prompts: 20 },
    overallScore,
    categoryMedian,
    keyFinding,
    engineBreakdown,
    competitors: competitorData,
    promptResults,
    aiResponses,
    recommendations,
  };
}
