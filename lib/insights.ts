export type InsightCategory = "AI Discovery Index" | "GEO Rankings" | "Guide";

export interface InsightPost {
  slug: string;
  title: string;
  date: string;
  category: InsightCategory;
  excerpt: string;
  body: string[];
}

export const insightPosts: InsightPost[] = [
  {
    slug: "ai-discovery-index-collagen-supplements-march-2026",
    title: "AI Discovery Index: Collagen Supplements, March 2026",
    date: "2026-03-15",
    category: "AI Discovery Index",
    excerpt:
      "Which collagen brands are AI engines recommending? Our monthly index tracks visibility across ChatGPT and Claude.",
    body: [
      "Every month, we run a standardized set of buyer prompts across ChatGPT and Claude to track which brands appear in AI-generated product recommendations. This edition covers the collagen supplements category, one of the most actively queried supplement categories in AI-powered discovery.",
      "Vital Proteins continues to dominate AI recommendations, appearing in over 80% of tested prompts across both engines. The brand's strong presence in third-party reviews, clinical study citations, and retailer listings gives it significant advantages in how AI models construct their answers.",
      "Ancient Nutrition and Sports Research hold steady in the second and third positions respectively. Both brands benefit from distinctive product positioning: Ancient Nutrition with its multi-collagen approach and Sports Research with its value-oriented messaging.",
      "The long tail remains largely invisible. Brands outside the top five appeared in fewer than 10% of AI responses. For newer or smaller collagen brands, the gap between organic search visibility and AI visibility is significant and growing.",
      "Key takeaway: AI engines are compressing buyer consideration sets. In traditional search, a buyer might see 20+ options on a results page. In an AI conversation, they typically receive 3-5 recommendations. If your brand isn't in that shortlist, the discoverability gap is real.",
    ],
  },
  {
    slug: "brands-winning-ai-powered-product-discovery",
    title: "Which Brands Are Winning in AI-Powered Product Discovery?",
    date: "2026-03-10",
    category: "GEO Rankings",
    excerpt:
      "We analyzed AI recommendations across 50 product categories to identify which brands consistently appear in AI-generated buying advice.",
    body: [
      "We tested over 1,000 buyer-intent prompts across 50 product categories to understand which brands are winning the AI discovery layer. The results reveal clear patterns in how AI engines select and prioritize brand recommendations.",
      "Brands with strong editorial coverage (reviews in publications like Wirecutter, Consumer Reports, and category-specific outlets) appeared in AI recommendations at nearly 3x the rate of brands relying primarily on marketplace optimization.",
      "Amazon Best Seller status alone does not guarantee AI visibility. Several top-selling Amazon brands were absent from AI recommendations entirely, while DTC brands with strong owned content and press coverage appeared consistently.",
      "Category matters significantly. In categories where buyers typically do extensive research (supplements, electronics, mattresses), AI engines provide more detailed and differentiated recommendations. In commodity categories, AI responses tend to default to the two or three most widely recognized names.",
      "The brands seeing the highest AI visibility scores share three traits: strong review coverage across multiple authoritative sources, clear product differentiation that AI can articulate, and consistent brand messaging across the web that gives AI engines confidence in their recommendations.",
    ],
  },
  {
    slug: "what-is-geo-guide-ecommerce-brands",
    title: "What Is GEO? A Guide for Ecommerce Brands",
    date: "2026-03-05",
    category: "Guide",
    excerpt:
      "Generative Engine Optimization is the practice of optimizing your brand's presence in AI-generated answers. Here's what ecommerce brands need to know.",
    body: [
      "Generative Engine Optimization (GEO) is an emerging practice focused on improving how your brand appears in AI-generated responses. While SEO optimizes for search engine rankings, GEO addresses a fundamentally different question: when a buyer asks an AI tool what to buy, does your brand appear in the answer?",
      "The distinction matters because AI engines don't work like search engines. They don't return a ranked list of links. Instead, they synthesize information from across the web and present a curated recommendation, often naming just 3-5 brands. The mechanics of how they select those brands are different from traditional ranking factors.",
      "What influences AI recommendations? Based on our analysis across thousands of prompts, the most significant factors include: presence in authoritative review content, consistency of brand messaging and product claims across sources, volume and quality of expert citations, and clear product differentiation that AI can articulate in natural language.",
      "What doesn't seem to matter as much: Amazon ranking alone, paid advertising presence, social media follower counts, or traditional keyword optimization. AI engines are drawing from a different layer of the web than search engines typically prioritize.",
      "For ecommerce brands, the practical first step is measurement. You can't optimize what you can't see. Understanding your current AI visibility baseline (which engines mention you, for which queries, and how you compare to competitors) is the foundation for any GEO strategy.",
    ],
  },
];

export function getPostBySlug(slug: string): InsightPost | undefined {
  return insightPosts.find((p) => p.slug === slug);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
