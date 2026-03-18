import { AIResponseData } from "@/lib/types";

export default function AIResponse({
  responses,
  brandName,
}: {
  responses: AIResponseData[];
  brandName: string;
}) {
  return (
    <div className="px-6 py-6 border-b border-border">
      <h4 className="font-mono text-[10px] uppercase tracking-wider text-muted mb-4">
        Actual AI Responses
      </h4>
      <div className="space-y-4">
        {responses.map((r, i) => (
          <div
            key={i}
            className="border border-border rounded-lg overflow-hidden"
          >
            {/* Response header */}
            <div className="px-4 py-2 bg-light-bg border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-dark">
                  {r.engine}
                </span>
                <span
                  className={`inline-flex items-center gap-1 font-mono text-[10px] px-1.5 py-0.5 rounded-full ${
                    r.brandMentioned
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      r.brandMentioned ? "bg-emerald-500" : "bg-red-400"
                    }`}
                  />
                  {r.brandMentioned ? "Mentioned" : "Not mentioned"}
                </span>
              </div>
            </div>

            {/* Prompt */}
            <div className="px-4 py-2 border-b border-border/50">
              <p className="font-mono text-[10px] text-muted">
                Prompt: &ldquo;{r.prompt}&rdquo;
              </p>
            </div>

            {/* Response text */}
            <div className="px-4 py-3">
              <p className="text-sm text-secondary leading-relaxed font-mono text-[13px]">
                &ldquo;
                {renderHighlightedResponse(r.response, r.highlightedBrands, brandName)}
                &rdquo;
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function renderHighlightedResponse(
  text: string,
  highlightedBrands: string[],
  brandName: string
) {
  const parts: Array<{ text: string; isBrand: boolean; isSubject: boolean }> = [];
  let remaining = text;

  while (remaining.length > 0) {
    let earliestIndex = remaining.length;
    let matchedBrand = "";

    for (const brand of highlightedBrands) {
      const idx = remaining.indexOf(brand);
      if (idx !== -1 && idx < earliestIndex) {
        earliestIndex = idx;
        matchedBrand = brand;
      }
    }

    if (matchedBrand && earliestIndex < remaining.length) {
      if (earliestIndex > 0) {
        parts.push({ text: remaining.slice(0, earliestIndex), isBrand: false, isSubject: false });
      }
      parts.push({
        text: matchedBrand,
        isBrand: true,
        isSubject: matchedBrand === brandName,
      });
      remaining = remaining.slice(earliestIndex + matchedBrand.length);
    } else {
      parts.push({ text: remaining, isBrand: false, isSubject: false });
      break;
    }
  }

  return parts.map((part, i) => {
    if (part.isSubject) {
      return (
        <span key={i} className="text-accent font-semibold">
          {part.text}
        </span>
      );
    }
    if (part.isBrand) {
      return (
        <span key={i} className="text-dark font-medium">
          {part.text}
        </span>
      );
    }
    return <span key={i}>{part.text}</span>;
  });
}
