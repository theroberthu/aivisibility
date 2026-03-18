import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { generateMockReport } from "@/lib/mock-report-data";
import Report from "@/components/report/Report";

export const metadata = {
  title: "Your AI Visibility Report — Your GEO Report",
  description: "Your personalized AI visibility analysis across ChatGPT, Claude, Perplexity, and Gemini.",
};

export default async function ReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: submission, error } = await supabase
    .from("submissions")
    .select("brand_name, product_category, website_url, created_at")
    .eq("id", id)
    .single();

  if (error || !submission) {
    notFound();
  }

  const reportData = generateMockReport(
    submission.brand_name,
    submission.product_category
  );

  return (
    <main className="min-h-screen bg-light-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="mb-8">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted mb-2">
            AI Visibility Analysis
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-dark tracking-tight">
            Report for {submission.brand_name}
          </h1>
          <p className="mt-2 text-sm text-secondary">
            {submission.product_category} · Generated from {reportData.methodology.engines} AI engines × {reportData.methodology.prompts} buyer-intent prompts
          </p>
        </div>

        <Report data={reportData} />

        <div className="mt-8 text-center">
          <p className="text-sm text-muted">
            Questions about your report?{" "}
            <a href="mailto:robert@yourgeoreport.com" className="text-accent hover:underline">
              Get in touch
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
