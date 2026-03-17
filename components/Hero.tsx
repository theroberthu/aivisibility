import VisibilityForm from "./VisibilityForm";

export default function Hero() {
  return (
    <section className="border-b border-border-subtle">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-start">
          {/* Left column — copy */}
          <div className="md:pt-4">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted mb-4">
              AI Visibility Intelligence
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-dark leading-[1.1] tracking-tight">
              Is AI recommending
              <br />
              your brand?
            </h1>
            <p className="mt-6 text-lg text-secondary leading-relaxed max-w-md">
              Buyers are asking ChatGPT, Claude, and Perplexity what to buy —
              before they ever search Amazon. Find out if your brand appears in
              those answers.
            </p>
            <div className="mt-8 flex items-center gap-6 text-sm text-muted">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                Free report
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                24-hour delivery
              </span>
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
