const exampleQueries = [
  "Best collagen peptides",
  "Best standing desk under $500",
  "Best magnesium supplement for sleep",
];

export default function WhyThisMatters() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted mb-3">
          The Shift
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-dark tracking-tight leading-tight">
          Product discovery is changing
        </h2>

        <p className="mt-6 text-lg text-secondary leading-relaxed max-w-xl">
          Instead of starting on search engines or marketplaces, more buyers
          are asking AI what to buy. Queries like these are becoming the new
          front door to purchase decisions:
        </p>

        {/* Example queries */}
        <div className="mt-8 space-y-3">
          {exampleQueries.map((query) => (
            <div
              key={query}
              className="flex items-center gap-3 text-[15px] text-dark"
            >
              <span className="text-muted select-none">&rarr;</span>
              <span className="font-medium">&ldquo;{query}&rdquo;</span>
            </div>
          ))}
        </div>

        <div className="mt-10 space-y-4 text-secondary leading-relaxed border-l-2 border-border pl-6">
          <p>
            AI tools are becoming a new layer of product discovery — one that
            most brands can&apos;t see into.
          </p>
          <p className="font-medium text-dark">
            If you&apos;re not in the AI answer, you&apos;re invisible to a
            growing segment of buyers.
          </p>
        </div>
      </div>
    </section>
  );
}
