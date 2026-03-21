import { PromptResult } from "@/lib/types";

const ENGINE_SHORT: Record<string, string> = {
  ChatGPT: "GPT",
  Claude: "CL",
};

export default function PromptResults({
  results,
  totalPrompts,
}: {
  results: PromptResult[];
  totalPrompts: number;
}) {
  const engines = results[0]?.engines.map((e) => e.engine) ?? [];

  return (
    <div className="px-6 py-6 border-b border-border">
      <h2 className="font-mono text-[10px] uppercase tracking-wider text-muted mb-1">
        Prompt-Level Results
      </h2>
      <p className="text-xs text-muted mb-4">
        Every prompt tested, with the exact results per engine.
      </p>

      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left font-mono text-[10px] uppercase tracking-wider text-muted pb-2 pr-3">
                Prompt
              </th>
              {engines.map((engine) => (
                <th
                  key={engine}
                  className="font-mono text-[10px] uppercase tracking-wider text-muted pb-2 px-2 text-center w-16"
                >
                  {ENGINE_SHORT[engine] || engine.slice(0, 3)}
                </th>
              ))}
              <th className="text-left font-mono text-[10px] uppercase tracking-wider text-muted pb-2 pl-3 w-48">
                Top Brands
              </th>
              <th className="text-left font-mono text-[10px] uppercase tracking-wider text-muted pb-2 pl-3 w-48">
                Notes
              </th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, i) => (
              <tr key={result.prompt} className="border-b border-border/30 last:border-0">
                <td className="py-2.5 pr-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-muted tabular-nums shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-secondary text-sm">
                      {result.prompt}
                    </span>
                  </div>
                </td>
                {result.engines.map((e) => (
                  <td key={e.engine} className="py-2.5 px-2 text-center">
                    <span
                      className={`inline-block w-6 text-center font-mono text-xs font-medium ${
                        e.mentioned
                          ? "text-emerald-600"
                          : "text-muted/40"
                      }`}
                      title={`${e.engine}: ${e.mentioned ? "Mentioned" : "Not mentioned"}`}
                    >
                      {e.mentioned ? "Yes" : "No"}
                    </span>
                  </td>
                ))}
                <td className="py-2.5 pl-3">
                  <div className="flex flex-wrap gap-1">
                    {getAllTopBrands(result).slice(0, 3).map((brand) => (
                      <span
                        key={brand}
                        className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-light-bg text-muted"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-2.5 pl-3">
                  {result.note && (
                    <span className="text-xs text-muted italic">
                      {result.note}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-3">
        {results.map((result, i) => {
          const topBrands = getAllTopBrands(result);
          return (
            <div key={result.prompt} className="border border-border rounded-lg px-3 py-2.5">
              <div className="flex items-start gap-2 mb-2">
                <span className="font-mono text-[10px] text-muted tabular-nums mt-0.5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-secondary">{result.prompt}</span>
              </div>
              <div className="flex items-center gap-3 ml-5">
                {result.engines.map((e) => (
                  <span
                    key={e.engine}
                    className={`font-mono text-[10px] ${
                      e.mentioned ? "text-emerald-600" : "text-muted/40"
                    }`}
                  >
                    {ENGINE_SHORT[e.engine] || e.engine}: {e.mentioned ? "Yes" : "No"}
                  </span>
                ))}
              </div>
              {topBrands.length > 0 && (
                <div className="flex flex-wrap gap-1 ml-5 mt-1.5">
                  {topBrands.slice(0, 3).map((brand) => (
                    <span
                      key={brand}
                      className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-light-bg text-muted"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              )}
              {result.note && (
                <p className="text-[10px] text-muted italic ml-5 mt-1">
                  {result.note}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <p className="font-mono text-[10px] text-muted mt-4">
        Showing {results.length} of {totalPrompts} prompts tested
      </p>
    </div>
  );
}

/** Deduplicate top brands across engines for a single prompt. */
function getAllTopBrands(result: PromptResult): string[] {
  const seen = new Set<string>();
  const brands: string[] = [];
  for (const engine of result.engines) {
    for (const brand of engine.topBrands || []) {
      const key = brand.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        brands.push(brand);
      }
    }
  }
  return brands;
}
