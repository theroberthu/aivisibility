import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase-server";
import { generateReport } from "@/lib/generate-report";

export const maxDuration = 60; // Allow up to 60s for AI API calls

export async function POST(request: NextRequest) {
  let body: { submissionId: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { submissionId } = body;
  if (!submissionId) {
    return NextResponse.json({ error: "submissionId required" }, { status: 400 });
  }

  // Read submission
  const { data: submission, error: readError } = await getSupabaseServer()
    .from("submissions")
    .select("brand_name, product_category, report_data")
    .eq("id", submissionId)
    .single();

  if (readError || !submission) {
    return NextResponse.json({ error: "Submission not found" }, { status: 404 });
  }

  // If report already generated, return cached data
  if (submission.report_data) {
    return NextResponse.json({ report: submission.report_data });
  }

  try {
    const report = await generateReport(
      submission.brand_name,
      submission.product_category,
    );

    // Cache in Supabase
    await getSupabaseServer()
      .from("submissions")
      .update({ report_data: report })
      .eq("id", submissionId);

    return NextResponse.json({ report });
  } catch (err) {
    console.error("Report generation failed:", err);
    return NextResponse.json(
      { error: "Report generation failed. Please try again." },
      { status: 500 },
    );
  }
}
