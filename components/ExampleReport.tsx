import { generateMockReport } from "@/lib/mock-report-data";
import Report from "@/components/report/Report";

const sampleData = generateMockReport("VitalGlow", "Collagen Peptides");

export default function ExampleReport() {
  return (
    <section className="py-20 md:py-28 bg-light-bg border-y border-border">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted mb-3">
          Sample Report
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-dark tracking-tight leading-tight">
          Here&apos;s what one report tells you
        </h2>
        <p className="mt-4 text-secondary leading-relaxed max-w-xl">
          We test the prompts shoppers actually ask ChatGPT and Claude, then
          show you exactly where your brand stands. Each report covers:
        </p>

        <ul className="mt-5 space-y-2 text-sm text-dark max-w-xl">
          <li className="flex items-start gap-2.5">
            <span className="font-mono text-[10px] text-accent mt-1 shrink-0">&#x25CF;</span>
            Whether AI mentions your brand, and how often
          </li>
          <li className="flex items-start gap-2.5">
            <span className="font-mono text-[10px] text-accent mt-1 shrink-0">&#x25CF;</span>
            Which competitors it recommends instead
          </li>
          <li className="flex items-start gap-2.5">
            <span className="font-mono text-[10px] text-accent mt-1 shrink-0">&#x25CF;</span>
            Which buyer prompts you miss entirely
          </li>
          <li className="flex items-start gap-2.5">
            <span className="font-mono text-[10px] text-accent mt-1 shrink-0">&#x25CF;</span>
            What to fix first to start showing up
          </li>
        </ul>

        <p className="mt-4 text-xs text-muted">
          Below is an illustrative sample report for a fictional brand.
        </p>

        <div className="mt-10">
          <Report data={sampleData} />
        </div>
      </div>
    </section>
  );
}
