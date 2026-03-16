const competitors = [
  "Ancient Nutrition",
  "Vital Proteins",
  "Sports Research",
];

const mentions = [
  { engine: "Claude", result: "Mentioned in 1 of 5 prompts" },
  { engine: "Perplexity", result: "Mentioned in 2 of 5 prompts" },
];

export default function ExampleReport() {
  return (
    <section className="py-16 md:py-24 bg-light-bg border-y border-border">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-dark tracking-tight">
          Example AI Visibility Report
        </h2>

        <div className="mt-8 bg-white rounded-xl border border-border shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-border">
            <div className="flex flex-wrap gap-x-8 gap-y-1 text-sm">
              <div>
                <span className="text-secondary">Brand:</span>{" "}
                <span className="font-medium text-dark">VitalGlow</span>
              </div>
              <div>
                <span className="text-secondary">Category:</span>{" "}
                <span className="font-medium text-dark">
                  Collagen Peptides
                </span>
              </div>
            </div>
          </div>

          {/* Score */}
          <div className="px-6 py-8 border-b border-border text-center">
            <p className="text-sm font-medium text-secondary uppercase tracking-wide mb-2">
              Visibility Score
            </p>
            <div className="text-5xl font-bold text-primary">
              32{" "}
              <span className="text-lg font-normal text-secondary">/ 100</span>
            </div>
          </div>

          {/* Mentions */}
          <div className="px-6 py-5 border-b border-border">
            <h4 className="text-sm font-medium text-dark mb-3">
              Mentions Across AI Engines
            </h4>
            <div className="space-y-2">
              {mentions.map((m) => (
                <div
                  key={m.engine}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-dark font-medium">{m.engine}</span>
                  <span className="text-secondary">{m.result}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Competitors */}
          <div className="px-6 py-5 border-b border-border">
            <h4 className="text-sm font-medium text-dark mb-3">
              Competitors Appearing More Often
            </h4>
            <div className="flex flex-wrap gap-2">
              {competitors.map((c) => (
                <span
                  key={c}
                  className="bg-light-bg text-secondary text-sm px-3 py-1 rounded-lg border border-border"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Example AI response */}
          <div className="px-6 py-5">
            <h4 className="text-sm font-medium text-dark mb-3">
              Example AI Response
            </h4>
            <blockquote className="text-sm text-secondary italic bg-light-bg rounded-lg px-4 py-3 border-l-2 border-primary">
              &ldquo;Vital Proteins is widely recommended for collagen
              supplementation…&rdquo;
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
