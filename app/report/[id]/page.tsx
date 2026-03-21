import { notFound } from "next/navigation";
import Image from "next/image";
import { getSupabaseServer } from "@/lib/supabase-server";
import ReportLoader from "@/components/report/ReportLoader";

export const metadata = {
  title: "Your AI Visibility Report · Your GEO Report",
  description: "Your personalized AI visibility analysis across ChatGPT and Claude.",
};

export default async function ReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: submission, error } = await getSupabaseServer()
    .from("submissions")
    .select("brand_name, product_category, report_data")
    .eq("id", id)
    .single();

  if (error || !submission) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-light-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <ReportLoader
          submissionId={id}
          brandName={submission.brand_name}
          category={submission.product_category}
          cachedReport={submission.report_data}
        />

        <div className="mt-12 border border-border rounded-lg px-6 py-5 bg-surface flex items-center gap-4">
          <Image
            src="/roberthu.PNG"
            alt="Robert Hu"
            width={48}
            height={48}
            className="rounded-full shrink-0"
          />
          <div>
            <p className="text-sm text-dark font-medium">
              Want help acting on this report?
            </p>
            <p className="text-xs text-secondary mt-0.5 leading-relaxed">
              I help brands improve their AI visibility — from content strategy
              to technical positioning. Happy to walk through your results.
            </p>
            <a
              href="https://theroberthu.com/free-strategy-session?utm_source=yourgeoreport&utm_medium=report&utm_campaign=free-strategy-session"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-1.5 text-sm text-accent hover:underline"
            >
              Book a free strategy session
            </a>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-muted">
            Questions about your report?{" "}
            <a href="mailto:robert@yourgeoreport.com" className="text-accent hover:underline">
              robert@yourgeoreport.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
