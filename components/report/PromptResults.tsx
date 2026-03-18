import { PromptResult } from "@/lib/types";

const ENGINE_SHORT: Record<string, string> = {
  ChatGPT: "GPT",
  Claude: "CL",
  Perplexity: "PX",
  Gemini: "GM",
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
      <h4 className="font-mono text-[10px] uppercase tracking-wider text-muted mb-4">
        Prompt Results Matrix
      </h4>

      {/* Engine column headers */}
      <div className="flex items-center gap-3 mb-2 pl-8">
        <div className="flex-1" />
        {engines.map((engine) => (
          <span
            key={engine}
            className="font-mono text-[9px] text-muted uppercase w-8 text-center shrink-0"
          >
            {ENGINE_SHORT[engine] || engine.slice(0, 3)}
          </span>
        ))}
      </div>

      <div className="space-y-1.5">
        {results.map((result, i) => {
          const mentionedCount = result.engines.filter(
            (e) => e.mentioned
          ).length;
          return (
            <div key={result.prompt} className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-muted tabular-nums w-5 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-sm text-secondary truncate">
                {result.prompt}
              </span>
              {result.engines.map((e) => (
                <span
                  key={e.engine}
                  className="w-8 flex justify-center shrink-0"
                  title={`${e.engine}: ${
                    e.mentioned ? "Mentioned" : "Not mentioned"
                  }`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      e.mentioned ? "bg-emerald-500" : "bg-border"
                    }`}
                  />
                </span>
              ))}
            </div>
          );
        })}
      </div>

      <p className="font-mono text-[10px] text-muted mt-4">
        Showing {results.length} of {totalPrompts} prompts · Green = brand
        mentioned · Gray = not mentioned
      </p>
    </div>
  );
}
