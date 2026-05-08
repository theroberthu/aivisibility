import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseServer } from "@/lib/supabase-server";
import { generateReport } from "@/lib/generate-report";
import { generateMockReport } from "@/lib/mock-report-data";
import GeoReportEmail from "@/emails/GeoReportEmail";
import { ReportData } from "@/lib/types";

const resend = new Resend(process.env.RESEND_API_KEY);

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  let body: { email: string; brandName: string; category: string; reportId: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { email, brandName, category, reportId } = body;

  if (!email || !brandName || !category || !reportId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Try to get or generate real report data
  let report: ReportData;
  const hasAiKeys = process.env.OPENAI_API_KEY && process.env.ANTHROPIC_API_KEY;

  if (hasAiKeys) {
    // Check if report was already generated
    const { data: submission } = await getSupabaseServer()
      .from("submissions")
      .select("report_data")
      .eq("id", reportId)
      .single();

    if (submission?.report_data) {
      report = submission.report_data as ReportData;
    } else {
      try {
        report = await generateReport(brandName, category);
        // Cache it
        await getSupabaseServer()
          .from("submissions")
          .update({ report_data: report })
          .eq("id", reportId);
      } catch (err) {
        console.error("Real report generation failed for email, using mock:", err);
        report = generateMockReport(brandName, category);
      }
    }
  } else {
    report = generateMockReport(brandName, category);
  }

  const requestUrl = new URL(request.url);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `${requestUrl.protocol}//${requestUrl.host}`;
  const reportUrl = `${baseUrl}/report/${reportId}`;

  try {
    const { error } = await resend.emails.send({
      from: "Robert from Your GEO Report <robert@yourgeoreport.com>",
      to: email,
      subject: `AI Visibility Scorecard for ${brandName} · Score: ${report.overallScore}/100`,
      react: GeoReportEmail({
        brandName: report.brandName,
        category: report.category,
        overallScore: report.overallScore,
        categoryMedian: report.categoryMedian,
        reportUrl,
        keyFinding: report.keyFinding,
        executiveSummary: report.executiveSummary
          ? {
              overview: report.executiveSummary.overview,
              bestOpportunity: report.executiveSummary.bestOpportunity,
            }
          : undefined,
        promptResults: report.promptResults?.map((p) => ({
          prompt: p.prompt,
          engines: p.engines.map((e) => ({
            engine: e.engine,
            mentioned: e.mentioned,
          })),
          topBrands: [...new Set(p.engines.flatMap((e) => e.topBrands || []))].slice(0, 3),
        })),
        engineBreakdown: report.engineBreakdown,
        competitors: report.competitors.map((c) => ({
          rank: c.rank,
          name: c.name,
          score: c.score,
          isSubject: c.isSubject,
        })),
        recommendations: report.recommendations.map((r) => ({
          title: r.title,
          description: r.description,
          priority: r.priority,
          evidence: r.evidence,
        })),
      }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
