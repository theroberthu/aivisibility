export default function WhyIBuiltThis() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted mb-3">
          About the Index
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-dark tracking-tight leading-tight">
          Why I built this
        </h2>

        <div className="mt-8 space-y-5 text-[17px] text-secondary leading-relaxed">
          <p>
            I&apos;ve spent years working with e-commerce brands and Amazon
            sellers.
          </p>
          <p>
            Recently, I noticed something new: more buyers are asking AI tools
            what to buy before they ever search Amazon. But brands have no clear
            way to measure whether they appear in those recommendations.
          </p>
          <p>
            So I built a simple tool to test it — run real prompts across
            multiple AI engines, and surface whether your brand shows up.
          </p>
        </div>

        <div className="mt-10 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-dark text-white flex items-center justify-center text-sm font-semibold border border-border">
            RH
          </div>
          <div>
            <p className="text-sm font-semibold text-dark">Robert Hu</p>
            <p className="text-xs text-muted">
              E-commerce operator &amp; builder
            </p>
            <p className="text-xs font-mono text-muted">aivisibility.com</p>
          </div>
        </div>
      </div>
    </section>
  );
}
