import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { generateMockReport } from "@/lib/mock-report-data";
import GeoReportEmail from "@/emails/GeoReportEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

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

  const report = generateMockReport(brandName, category);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yourgeoreport.com";
  const reportUrl = `${baseUrl}/report/${reportId}`;

  try {
    const { error } = await resend.emails.send({
      from: "Your GEO Report <report@yourgeoreport.com>",
      to: email,
      subject: `AI Visibility Report for ${brandName} — Score: ${report.overallScore}/100`,
      react: GeoReportEmail({
        brandName: report.brandName,
        category: report.category,
        overallScore: report.overallScore,
        categoryMedian: report.categoryMedian,
        reportUrl,
        keyFinding: report.keyFinding,
        engineBreakdown: report.engineBreakdown,
        competitors: report.competitors.map((c) => ({
          rank: c.rank,
          name: c.name,
          score: c.score,
          isSubject: c.isSubject,
        })),
        recommendations: report.recommendations.map((r) => ({
          title: r.title,
          priority: r.priority,
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
