import VisibilityForm from "./VisibilityForm";

export default function Hero() {
  return (
    <section className="bg-light-bg border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left column — copy */}
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark leading-tight tracking-tight">
              Check If AI Recommends Your Brand
            </h1>
            <p className="mt-4 text-lg text-secondary leading-relaxed max-w-lg">
              More buyers are asking AI tools what to buy before they search
              Amazon. See whether your brand shows up in AI-generated product
              recommendations.
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
