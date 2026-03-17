import VisibilityForm from "./VisibilityForm";

export default function Hero() {
  return (
    <section id="get-report" className="border-b border-border-subtle">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-start">
          {/* Left column — copy */}
          <div className="md:pt-4">
            <p className="font-mono text-xs text-muted tabular-nums mb-1">
              Report Edition — March 2026
            </p>
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
            <div className="w-12 h-px bg-border my-6" />
            <p className="font-mono text-xs text-muted">
              4 AI engines tested&nbsp;&nbsp;/&nbsp;&nbsp;20 prompts per report&nbsp;&nbsp;/&nbsp;&nbsp;24h delivery
            </p>
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
