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
};

const DEFAULT_COMPETITORS = ["MarketLeader Pro", "CategoryKing", "TopBrand Co"];

export interface ScorecardData {
  brandName: string;
  category: string;
  reportDate: string;
  overallScore: number;
  categoryMedian: number;
  topCompetitors: Array<{ rank: number; name: string; score: number }>;
  summaryLine: string;
  recommendation: { title: string; description: string };
}

export function generateMockScorecard(
  brandName: string,
  category: string
): ScorecardData {
  const competitors = CATEGORY_COMPETITORS[category] || DEFAULT_COMPETITORS;
  const now = new Date();
  const reportDate = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return {
    brandName,
    category,
    reportDate,
    overallScore: 32,
    categoryMedian: 48,
    topCompetitors: [
      { rank: 1, name: competitors[0], score: 84 },
      { rank: 2, name: competitors[1], score: 71 },
      { rank: 3, name: competitors[2], score: 62 },
    ],
    summaryLine: `${brandName} has low visibility in AI recommendations for ${category.toLowerCase()}. When shoppers ask ChatGPT or Claude what to buy, your brand appears in roughly 1 in 4 prompts, while ${competitors[0]} dominates at 84%.`,
    recommendation: {
      title: "Strengthen positioning on beginner and value prompts",
      description: `AI showed weaker competitor lock-in on beginner and value-oriented prompts, making them the most realistic entry point for ${brandName} to gain AI visibility.`,
    },
  };
}
