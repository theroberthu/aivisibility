import VisibilityForm from "./VisibilityForm";

export default function Hero() {
  return (
    <section id="get-report" className="border-b border-border-subtle">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-start">
          {/* Left column — copy */}
          <div className="md:pt-4">
            <div className="flex items-center gap-3 mb-4">
              <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-muted font-medium">
                Your GEO Report
              </p>
              <span className="w-1 h-1 rounded-full bg-border" />
              <p className="font-mono text-[11px] text-muted tabular-nums">
                Edition 03 · March 2026
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-dark leading-[1.1] tracking-tight">
              Is AI recommending
              <br />
              your brand?
            </h1>
            <p className="mt-4 text-lg md:text-xl font-semibold text-dark">
              Find out in 24 hours. Free.
            </p>
            <p className="mt-4 text-lg text-secondary leading-relaxed max-w-md">
              When buyers ask ChatGPT or Claude what to buy,
              does your brand appear? We test real buyer-intent prompts across
              both engines and score your visibility.
            </p>
            <p className="mt-3 text-[15px] text-dark font-medium max-w-md">
              Built for ecommerce brands that want to know when AI recommends
              competitors instead.
            </p>

            <div className="w-full h-px bg-border my-8" />

            {/* Methodology strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-4 gap-x-6">
              <div>
                <p className="font-mono text-[22px] font-semibold text-dark tabular-nums leading-none">2</p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted mt-1.5">AI engines</p>
              </div>
              <div>
                <p className="font-mono text-[22px] font-semibold text-dark tabular-nums leading-none">10+</p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted mt-1.5">Prompts tested</p>
              </div>
              <div>
                <p className="font-mono text-[22px] font-semibold text-dark tabular-nums leading-none">5+</p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted mt-1.5">Competitors ranked</p>
              </div>
              <div>
                <p className="font-mono text-[22px] font-semibold text-dark tabular-nums leading-none">24h</p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted mt-1.5">Delivery</p>
              </div>
            </div>

            {/* What you receive */}
            <div className="mt-8 border-l-2 border-border pl-5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted mb-3">What you receive</p>
              <ul className="space-y-2 text-sm text-secondary">
                <li className="flex items-start gap-2">
                  <span className="font-mono text-[10px] text-muted mt-1 shrink-0">01</span>
                  Visibility score benchmarked against category competitors
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-[10px] text-muted mt-1 shrink-0">02</span>
                  Engine-by-engine breakdown of brand mentions
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-[10px] text-muted mt-1 shrink-0">03</span>
                  Competitor ranking — who AI recommends instead of you
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-[10px] text-muted mt-1 shrink-0">04</span>
                  Actual AI responses showing how your brand is (or isn&apos;t) cited
                </li>
              </ul>
            </div>
          </div>

          {/* Right column — form */}
          <div>
            <VisibilityForm />
          </div>
        </div>
      </div>
    </section>
  );
}
