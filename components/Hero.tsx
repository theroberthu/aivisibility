import VisibilityForm from "./VisibilityForm";

export default function Hero() {
  return (
    <section id="get-report" className="border-b border-border-subtle">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-start">
          {/* Left column — copy */}
          <div className="md:pt-4 contents md:block">
            {/* Hero text + stats — order 1 on mobile (appears first) */}
            <div className="order-1 md:order-none">
              <div className="flex items-center gap-3 mb-4">
                <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-muted font-medium">
                  Your GEO Report
                </p>
                <span className="w-1 h-1 rounded-full bg-border" />
                <p className="font-mono tabular-nums text-[12px] bg-accent-subtle text-accent px-2.5 py-1 rounded-full font-medium md:text-[11px] md:bg-transparent md:text-muted md:px-0 md:py-0 md:rounded-none md:font-normal">
                  Edition 03 · March 2026
                </p>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-dark leading-[1.1] tracking-tight">
                See which competitors
                <br />
                AI recommends instead
                <br className="hidden md:inline" />
                {" "}of your brand
              </h1>
              <p className="mt-4 text-lg md:text-xl font-semibold text-dark">
                Free report. Delivered in 24 hours.
              </p>
              <p className="mt-4 text-lg text-secondary leading-relaxed max-w-md">
                When shoppers ask ChatGPT or Claude what to buy, AI recommends
                3–5 brands, not a page of links. We test the prompts your buyers
                actually ask and show you who AI recommends instead of you.
              </p>
              <p className="mt-3 text-[13px] font-mono text-muted tracking-wide uppercase">
                For Amazon and DTC product brands
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
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted mt-1.5">Buyer prompts tested</p>
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
            </div>

            {/* What you receive — order 3 on mobile (appears after form) */}
            <div className="order-3 md:order-none mt-8">
              <div className="border-l-2 border-border pl-5">
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted mb-3">What you receive</p>
                <ul className="space-y-2 text-sm text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-[10px] text-muted mt-1 shrink-0">01</span>
                    Whether AI mentions your brand, and how often
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-[10px] text-muted mt-1 shrink-0">02</span>
                    Which competitors AI recommends instead of you
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-[10px] text-muted mt-1 shrink-0">03</span>
                    Which buyer prompts you miss entirely
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-[10px] text-muted mt-1 shrink-0">04</span>
                    What to fix first to start showing up
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right column — form (order 2 on mobile, appears after hero text) */}
          <div className="order-2 md:order-none">
            <VisibilityForm />
          </div>
        </div>
      </div>
    </section>
  );
}
