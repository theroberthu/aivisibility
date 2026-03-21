import { render } from "@react-email/components";
import React from "react";
import GeoReportEmail from "../emails/GeoReportEmail";
import { generateMockReport } from "../lib/mock-report-data";
import fs from "fs";

async function main() {
  const report = generateMockReport("GlowNaturals", "Skincare");

  const html = await render(
    React.createElement(GeoReportEmail, {
      brandName: report.brandName,
      category: report.category,
      overallScore: report.overallScore,
      categoryMedian: report.categoryMedian,
      reportUrl: "https://yourgeoreport.com/report/demo-123",
      keyFinding: report.keyFinding,
      executiveSummary: {
        overview: report.executiveSummary.overview,
        bestOpportunity: report.executiveSummary.bestOpportunity,
      },
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
    })
  );

  fs.mkdirSync("public/preview", { recursive: true });
  fs.writeFileSync("public/preview/email.html", html);
  console.log("Written to public/preview/email.html");
}

main();
