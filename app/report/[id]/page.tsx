import { notFound } from "next/navigation";
import Image from "next/image";
import { getSupabaseServer } from "@/lib/supabase-server";
import Scorecard from "@/components/Scorecard";

export const metadata = {
  title: "Your AI Visibility Scorecard · Your GEO Report",
  description: "Your personalized AI visibility scorecard across ChatGPT and Claude.",
};

export default async function ReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = getSupabaseServer();
  const { data: submission, error } = await supabase
    .from("submissions")
    .select("brand_name, product_category, report_data")
    .eq("id", id)
    .single();

  if (error || !submission) {
    return (
      <main className="min-h-screen bg-light-bg flex items-center justify-center">
        <pre className="bg-white p-8 rounded-lg shadow text-sm max-w-xl overflow-auto">
          {JSON.stringify({ id, error: error?.message, code: error?.code, details: error?.details, hint: error?.hint, hasSubmission: !!submission }, null, 2)}
        </pre>
      </main>
    );
  }

  const reportData = submission.report_data;

  return (
    <main className="min-h-screen bg-light-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        {reportData ? (
          <>
            <div className="mb-8">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted mb-2">
                AI Visibility Scorecard
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-dark tracking-tight">
                Scorecard for {submission.brand_name}
              </h1>
              <p className="mt-2 text-sm text-secondary">
                {submission.product_category} · Generated from {reportData.methodology.engines} AI engines ×{" "}
                {reportData.methodology.prompts} buyer-intent prompts
              </p>
            </div>

            <Scorecard data={reportData} />
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-sm text-secondary font-medium">
              Your scorecard is being prepared. Check back soon.
            </p>
          </div>
        )}

        {/* Audit upsell */}
        <div className="mt-10 border-2 border-accent rounded-lg p-6 bg-surface text-center">
          <p className="text-lg font-semibold text-dark mb-2">
            Want the complete analysis?
          </p>
          <p className="text-sm text-secondary mb-1 max-w-md mx-auto">
            The Brand AI Visibility Audit ($500) includes prompt-level results,
            competitor insights, opportunity map, 4–6 prioritized recommendations,
            and a 30-minute review call with Robert.
          </p>
          <a
            href="https://theroberthu.com/free-strategy-session?utm_source=yourgeoreport&utm_medium=scorecard&utm_campaign=paid-audit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 bg-dark hover:bg-primary text-white font-medium py-3 px-8 rounded-lg text-sm transition-colors"
          >
            Get the Full Audit · $500
          </a>
        </div>

        {/* Help box */}
        <div className="mt-6 border border-border rounded-lg px-6 py-5 bg-surface flex items-center gap-4">
          <Image
            src="/roberthu.PNG"
            alt="Robert Hu"
            width={48}
            height={48}
            className="rounded-full shrink-0"
          />
          <div>
            <p className="text-sm text-dark font-medium">
              Want help acting on these results?
            </p>
            <p className="text-xs text-secondary mt-0.5 leading-relaxed">
              I help brands improve their AI visibility — from content strategy
              to technical positioning. Happy to walk through your results.
            </p>
            <div className="flex items-center gap-3 mt-1.5">
              <a
                href="https://theroberthu.com/free-strategy-session?utm_source=yourgeoreport&utm_medium=report&utm_campaign=free-strategy-session"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent hover:underline"
              >
                Book a free strategy session
              </a>
              <span className="text-muted">·</span>
              <a
                href="https://www.linkedin.com/in/theroberthu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent hover:underline"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
