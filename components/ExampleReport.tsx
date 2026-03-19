import { generateMockReport } from "@/lib/mock-report-data";
import Report from "@/components/report/Report";

const sampleData = generateMockReport("VitalGlow", "Collagen Peptides");

export default function ExampleReport() {
  return (
    <section className="py-20 md:py-28 bg-light-bg border-y border-border">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted mb-3">
          Sample Output
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-dark tracking-tight leading-tight">
          What your report looks like
        </h2>
        <p className="mt-4 text-secondary leading-relaxed max-w-xl">
          Each report tests a focused set of buyer-intent prompts across
          ChatGPT and Claude — then scores your brand against category
          competitors.
        </p>

        <div className="mt-10">
          <Report data={sampleData} />
        </div>
      </div>
    </section>
  );
}
