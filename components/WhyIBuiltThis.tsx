export default function WhyIBuiltThis() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted mb-3">
          About This Project
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-dark tracking-tight leading-tight">
          Why This Exists
        </h2>

        <div className="mt-8 space-y-5 text-[17px] text-secondary leading-relaxed">
          <p>
            I&apos;ve spent years working in ecommerce and marketplace
            environments where small visibility changes can have a real impact
            on discovery and sales.
          </p>
          <p>
            As AI starts shaping product recommendations, brands need a way to
            see whether they&apos;re being recommended or replaced by
            competitors.
          </p>
          <p>
            Your GEO Report was built to make that shift visible for ecommerce
            brands.
          </p>
        </div>

        <div className="mt-10 flex items-center gap-4">
          <a href="https://www.linkedin.com/in/theroberthu/" target="_blank" rel="noopener noreferrer">
            <img
              src="/roberthu.PNG"
              alt="Robert Hu"
              className="w-10 h-10 rounded-full object-cover border border-border"
            />
          </a>
          <div>
            <a href="https://www.linkedin.com/in/theroberthu/" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-dark hover:text-accent transition-colors">
              Robert Hu
            </a>
            <p className="text-xs text-muted">
              E-commerce operator &amp; builder
            </p>
            <a href="https://theroberthu.com" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-muted hover:text-accent transition-colors">
              theroberthu.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
