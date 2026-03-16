const exampleQueries = [
  "Best collagen peptides",
  "Best standing desk under $500",
  "Best magnesium supplement for sleep",
];

export default function WhyThisMatters() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-dark tracking-tight">
          Why This Matters
        </h2>

        <div className="mt-6 space-y-4 text-secondary leading-relaxed">
          <p>Product discovery is changing.</p>
          <p>
            Instead of starting on search engines or marketplaces, more buyers
            are asking AI what to buy.
          </p>
        </div>

        {/* Example queries */}
        <div className="mt-8 grid sm:grid-cols-3 gap-3">
          {exampleQueries.map((query) => (
            <div
              key={query}
              className="bg-light-bg border border-border rounded-xl px-4 py-3 text-sm text-dark font-medium"
            >
              &ldquo;{query}&rdquo;
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-4 text-secondary leading-relaxed">
          <p>AI tools are becoming a new layer of product discovery.</p>
          <p>
            But most brands have no idea whether they appear in those answers.
          </p>
        </div>
      </div>
    </section>
  );
}
