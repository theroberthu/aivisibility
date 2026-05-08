import { generateMockReport } from "@/lib/mock-report-data";
import { generateMockScorecard } from "@/lib/mock-scorecard-data";
import Report from "@/components/report/Report";
import ScorecardSample from "@/components/ScorecardSample";
import ComparisonTable from "@/components/ComparisonTable";

const sampleReport = generateMockReport("VitalGlow", "Collagen Peptides");
const sampleScorecard = generateMockScorecard("VitalGlow", "Collagen Peptides");

export default function ExampleReport() {
  return (
    <section className="py-20 md:py-28 bg-light-bg border-y border-border">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted mb-3">
          Sample Scorecard
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-dark tracking-tight leading-tight">
          Here&apos;s what you get
        </h2>
        <p className="mt-4 text-secondary leading-relaxed max-w-xl">
          See a sample of the free scorecard every customer receives, plus a
          preview of our full paid audit.
        </p>

        {/* Free Scorecard Sample */}
        <div className="mt-10">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted mb-3">
            Free Scorecard Sample
          </p>
          <p className="text-xs text-muted mb-4">
            Below is an illustrative scorecard for a fictional brand.
          </p>
          <ScorecardSample data={sampleScorecard} />
        </div>

        {/* Comparison Table */}
        <div className="mt-16">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted mb-3">
            Compare Plans
          </p>
          <h3 className="text-2xl font-bold text-dark tracking-tight mb-6">
            Free scorecard vs. paid audit
          </h3>
          <div className="bg-surface rounded-lg border border-border p-6">
            <ComparisonTable />
          </div>
        </div>

        {/* Paid Audit Sample */}
        <div className="mt-16">
          <p className="font-mono text-[10px] uppercase tracking-wider text-accent mb-3">
            Paid Audit Sample · $500
          </p>
          <h3 className="text-2xl font-bold text-dark tracking-tight">
            Here&apos;s what the full audit includes
          </h3>
          <p className="mt-3 text-secondary leading-relaxed max-w-xl">
            Comprehensive AI visibility analysis with prompt-level evidence and
            prioritized recommendations. Delivered in 5–7 business days with a
            30-minute review call.
          </p>
          <p className="mt-3 text-xs text-muted">
            Below is an illustrative audit for a fictional brand.
          </p>
          <div className="mt-6">
            <Report data={sampleReport} />
          </div>
          <div className="mt-10 text-center border border-border rounded-lg p-8 bg-surface">
            <p className="text-lg font-semibold text-dark mb-2">
              Ready for the full picture?
            </p>
            <p className="text-sm text-secondary mb-6">
              Get your Brand AI Visibility Audit with a 30-minute review call.
            </p>
            <a
              href="https://theroberthu.com/free-strategy-session?utm_source=yourgeoreport&utm_medium=sample&utm_campaign=paid-audit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-dark hover:bg-primary text-white font-medium py-3 px-8 rounded-lg text-sm transition-colors"
            >
              Get the Full Audit · $500
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
