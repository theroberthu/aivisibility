import { NextRequest, NextResponse } from "next/server";

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  "Arts, Crafts & Sewing": [
    "craft", "sewing", "knitting", "crochet", "scrapbook", "art supply",
    "fabric", "yarn", "embroidery", "quilting", "painting supplies", "beading",
  ],
  Automotive: [
    "automotive", "car", "vehicle", "auto parts", "motor", "tire", "brake",
    "engine", "dashboard", "car care", "truck", "motorcycle",
  ],
  "Baby Products": [
    "baby", "infant", "toddler", "newborn", "nursery", "diaper", "stroller",
    "pacifier", "baby food", "teething", "crib", "car seat",
  ],
  "Beauty & Personal Care": [
    "beauty", "skincare", "skin care", "cosmetics", "makeup", "serum",
    "moisturizer", "hair care", "haircare", "fragrance", "personal care",
    "lipstick", "foundation", "cleanser", "sunscreen", "collagen",
    "anti-aging", "retinol", "shampoo", "conditioner",
  ],
  Books: [
    "book", "publishing", "author", "novel", "ebook", "bookstore",
    "literature", "reading", "publisher",
  ],
  "Cell Phones & Accessories": [
    "phone case", "screen protector", "phone accessory", "smartphone",
    "cell phone", "mobile accessory", "charging cable", "phone mount",
  ],
  "Clothing, Shoes & Jewelry": [
    "clothing", "apparel", "fashion", "shoes", "jewelry", "dress", "shirt",
    "pants", "sneakers", "boots", "necklace", "ring", "bracelet", "watch",
    "handbag", "accessories", "outfit", "wear",
  ],
  Electronics: [
    "electronics", "gadget", "laptop", "computer", "tech", "device",
    "speaker", "headphone", "monitor", "tablet", "charger", "bluetooth",
    "wireless", "camera", "audio", "usb", "smart home",
  ],
  "Grocery & Gourmet Food": [
    "grocery", "food", "gourmet", "snack", "organic food", "coffee", "tea",
    "spice", "sauce", "chocolate", "pantry", "beverage", "drink",
  ],
  "Health & Household": [
    "health", "supplement", "vitamin", "wellness", "nutrition", "protein",
    "probiotic", "immune", "household", "cleaning", "first aid", "medicine",
    "omega", "magnesium", "zinc", "turmeric",
  ],
  "Home & Kitchen": [
    "home", "kitchen", "furniture", "decor", "bedding", "towel", "curtain",
    "pillow", "rug", "storage", "organizer", "candle", "lighting", "vase",
  ],
  "Industrial & Scientific": [
    "industrial", "scientific", "laboratory", "lab equipment", "safety gear",
    "janitorial", "manufacturing", "test equipment",
  ],
  "Kitchen & Dining": [
    "cookware", "bakeware", "utensil", "knife set", "cutting board",
    "dinnerware", "glassware", "kitchen gadget", "blender", "mixer",
    "coffee maker", "toaster",
  ],
  "Musical Instruments": [
    "guitar", "piano", "drum", "musical instrument", "microphone", "violin",
    "keyboard", "amplifier", "bass", "ukulele", "music gear",
  ],
  "Office Products": [
    "office", "desk", "printer", "paper", "stationery", "pen", "notebook",
    "office supply", "filing", "binder", "label",
  ],
  "Patio, Lawn & Garden": [
    "garden", "patio", "lawn", "outdoor", "plant", "grill", "barbecue",
    "landscaping", "fertilizer", "seed", "planter", "mower",
  ],
  "Pet Supplies": [
    "pet", "dog", "cat", "puppy", "kitten", "pet food", "pet supplies",
    "veterinary", "aquarium", "fish", "bird", "treats", "leash", "collar",
  ],
  Software: [
    "software", "saas", "app", "platform", "tool", "automation",
    "productivity", "cloud", "analytics", "crm", "erp", "devtools",
  ],
  "Sports & Outdoors": [
    "sports", "fitness", "gym", "workout", "exercise", "outdoor", "camping",
    "hiking", "cycling", "running", "yoga", "training", "athletic",
  ],
  "Tools & Home Improvement": [
    "tool", "drill", "saw", "hammer", "home improvement", "hardware",
    "plumbing", "electrical", "paint", "wrench", "screw",
  ],
  "Toys & Games": [
    "toy", "game", "puzzle", "lego", "board game", "action figure", "doll",
    "stuffed animal", "building blocks", "educational toy", "play",
  ],
  "Video Games": [
    "video game", "gaming", "console", "playstation", "xbox", "nintendo",
    "steam", "esports", "controller", "pc gaming",
  ],
};

function extractMeta(html: string, nameOrProperty: string): string {
  const escaped = nameOrProperty.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re1 = new RegExp(
    `<meta[^>]+(?:name|property)=["']${escaped}["'][^>]+content=["']([^"']*)["']`,
    "i",
  );
  const re2 = new RegExp(
    `<meta[^>]+content=["']([^"']*)["'][^>]+(?:name|property)=["']${escaped}["']`,
    "i",
  );
  return (html.match(re1)?.[1] || html.match(re2)?.[1] || "").trim();
}

function extractTitle(html: string): string {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return (match?.[1] || "").trim();
}

function scoreCategories(text: string): string | null {
  const lower = text.toLowerCase();
  let bestCategory: string | null = null;
  let bestScore = 0;

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    let score = 0;
    for (const keyword of keywords) {
      if (lower.includes(keyword)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      bestCategory = category;
    }
  }

  return bestScore >= 2 ? bestCategory : null;
}

/** Detect Amazon-specific product category from breadcrumbs or department links. */
function extractAmazonCategory(html: string): string | null {
  // Amazon breadcrumb patterns (e.g., "Electronics › Computers & Accessories")
  const breadcrumbMatch = html.match(
    /id="wayfinding-breadcrumbs_feature_div"[^>]*>([\s\S]*?)<\/div>/i,
  );
  const breadcrumbText = breadcrumbMatch?.[1]?.replace(/<[^>]+>/g, " ") || "";

  // Also check the #nav-subnav department or the dp-container category
  const deptMatch =
    html.match(/data-category="([^"]+)"/i) ||
    html.match(/"department":\s*"([^"]+)"/i);
  const deptText = deptMatch?.[1] || "";

  const combined = `${breadcrumbText} ${deptText}`.toLowerCase();
  if (!combined.trim()) return null;

  // Score against our categories using the combined Amazon-specific text
  // Use a lower threshold since this is targeted extraction
  const lower = combined;
  let bestCategory: string | null = null;
  let bestScore = 0;

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    let score = 0;
    for (const keyword of keywords) {
      if (lower.includes(keyword)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      bestCategory = category;
    }
  }

  return bestScore >= 1 ? bestCategory : null;
}

/** Known marketplace/retailer short-link domains and their canonical hosts. */
const MARKETPLACE_HOSTS: Record<string, string> = {
  "a.co": "amazon.com",
  "amzn.to": "amazon.com",
  "amzn.com": "amazon.com",
};

/** Check if a URL belongs to a known marketplace. */
function getMarketplaceHost(url: string): string | null {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, "");
    if (hostname.includes("amazon.")) return "amazon.com";
    return MARKETPLACE_HOSTS[hostname] || null;
  } catch {
    return null;
  }
}

function extractBrand(
  html: string,
  url: string,
): string | null {
  const siteName = extractMeta(html, "og:site_name");
  if (siteName) return siteName;

  const title = extractTitle(html);
  if (title) {
    const separators = [" | ", " - ", " — ", " :: ", " · "];
    for (const sep of separators) {
      if (title.includes(sep)) {
        return title.split(sep)[0].trim();
      }
    }
  }

  try {
    const hostname = new URL(url).hostname
      .replace(/^www\./, "")
      .split(".")[0];
    if (hostname.length > 1) {
      return hostname.charAt(0).toUpperCase() + hostname.slice(1);
    }
  } catch {
    // ignore
  }

  return null;
}

/** Extract the brand/seller name from an Amazon product page. */
function extractAmazonBrand(html: string): string | null {
  // "by BrandName" pattern near the title
  const bylineMatch = html.match(
    /id="bylineInfo"[^>]*>[\s\S]*?(?:Visit the |Brand:\s*)?([^<]+)</i,
  );
  if (bylineMatch?.[1]) {
    const cleaned = bylineMatch[1]
      .replace(/Visit the\s+/i, "")
      .replace(/\s+Store$/i, "")
      .trim();
    if (cleaned) return cleaned;
  }

  // "brand":"BrandName" in JSON-LD or inline data
  const brandJsonMatch = html.match(/"brand"\s*:\s*(?:\{[^}]*"name"\s*:\s*)?["']([^"']+)["']/i);
  if (brandJsonMatch?.[1]) return brandJsonMatch[1].trim();

  return null;
}

export async function POST(request: NextRequest) {
  let url: string;
  try {
    const body = await request.json();
    url = body.url;
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "URL required" }, { status: 400 });
  }

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = `https://${url}`;
  }

  try {
    new URL(url);
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(8000),
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      redirect: "follow",
    });

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) {
      return NextResponse.json({ category: null, brand: null });
    }

    // Use the final URL after redirects for marketplace detection
    const finalUrl = res.url || url;
    const isAmazon = getMarketplaceHost(finalUrl) === "amazon.com" || getMarketplaceHost(url) === "amazon.com";

    // Allow more HTML for Amazon product pages (they're large)
    const html = (await res.text()).slice(0, isAmazon ? 200000 : 50000);

    const title = extractTitle(html);
    const description = extractMeta(html, "description");
    const ogTitle = extractMeta(html, "og:title");
    const ogDescription = extractMeta(html, "og:description");
    const keywords = extractMeta(html, "keywords");

    const combinedText = [title, description, ogTitle, ogDescription, keywords].join(" ");

    // For Amazon URLs, try Amazon-specific extraction first
    let category = scoreCategories(combinedText);
    let brand: string | null = null;

    if (isAmazon) {
      if (!category) category = extractAmazonCategory(html);
      brand = extractAmazonBrand(html);
    }

    if (!brand) brand = extractBrand(html, finalUrl);

    return NextResponse.json({ category, brand });
  } catch {
    return NextResponse.json({ category: null, brand: null });
  }
}
