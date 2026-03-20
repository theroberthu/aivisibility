const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

/** Send a buyer-intent prompt to ChatGPT and return the response text. */
export async function queryChatGPT(prompt: string): Promise<string> {
  if (!OPENAI_API_KEY) throw new Error("OPENAI_API_KEY not set");

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
      temperature: 0.7,
    }),
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => "");
    throw new Error(`OpenAI API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() || "";
}

/** Send a buyer-intent prompt to Claude and return the response text. */
export async function queryClaude(prompt: string): Promise<string> {
  if (!ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY not set");

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6-20260320",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    }),
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => "");
    throw new Error(`Anthropic API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  const block = data.content?.[0];
  return block?.type === "text" ? block.text.trim() : "";
}

/** Use a cheap AI call to extract brand/company names from text. */
export async function extractBrandNames(text: string): Promise<string[]> {
  const prompt = `Extract all brand names and company names from the following text. Return ONLY a JSON array of strings, nothing else. If no brands are found, return [].

Text:
${text}`;

  try {
    const response = await queryChatGPT(prompt);
    // Parse the JSON array from the response
    const match = response.match(/\[[\s\S]*\]/);
    if (match) {
      const parsed = JSON.parse(match[0]);
      if (Array.isArray(parsed)) return parsed.filter((s: unknown) => typeof s === "string");
    }
  } catch {
    // Fallback: simple regex for capitalized multi-word patterns
  }

  return [];
}
