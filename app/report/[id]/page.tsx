import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
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

  const { data: submission, error } = await supabase
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
