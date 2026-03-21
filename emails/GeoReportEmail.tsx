import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Hr,
  Preview,
} from "@react-email/components";
import * as React from "react";

interface GeoReportEmailProps {
  brandName: string;
  category: string;
  overallScore: number;
  categoryMedian: number;
  reportUrl: string;
  keyFinding: string;
  engineBreakdown: Array<{
    engine: string;
    mentioned: number;
    total: number;
    percentage: number;
  }>;
  competitors: Array<{
    rank: number;
    name: string;
    score: number;
    isSubject: boolean;
  }>;
  recommendations: Array<{
    title: string;
    priority: "high" | "medium" | "low";
  }>;
}

export default function GeoReportEmail({
  brandName,
  category,
  overallScore,
  categoryMedian,
  reportUrl,
  keyFinding,
  engineBreakdown,
  competitors,
  recommendations,
}: GeoReportEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        {`Your GEO Report for ${brandName} · AI Visibility Score: ${overallScore}/100`}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logoText}>YOUR GEO REPORT</Text>
          </Section>

          {/* Title */}
          <Section style={section}>
            <Text style={heading}>AI Visibility Report</Text>
            <Text style={subheading}>
              {brandName} · {category}
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Score */}
          <Section style={scoreSection}>
            <Text style={scoreLabel}>VISIBILITY SCORE</Text>
            <Text style={scoreValue}>{overallScore}</Text>
            <Text style={scoreContext}>
              out of 100 · Category median: {categoryMedian}
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Key Finding */}
          <Section style={section}>
            <Text style={sectionTitle}>KEY FINDING</Text>
            <Text style={bodyText}>{keyFinding}</Text>
          </Section>

          <Hr style={divider} />

          {/* Engine Breakdown */}
          <Section style={section}>
            <Text style={sectionTitle}>ENGINE BREAKDOWN</Text>
            {engineBreakdown.map((engine) => (
              <Text key={engine.engine} style={bodyText}>
                <strong>{engine.engine}:</strong> mentioned in {engine.mentioned} of{" "}
                {engine.total} prompts ({engine.percentage}%)
              </Text>
            ))}
          </Section>

          <Hr style={divider} />

          {/* Competitor Ranking */}
          <Section style={section}>
            <Text style={sectionTitle}>COMPETITOR RANKING</Text>
            {competitors.map((c) => (
              <Text
                key={c.name}
                style={c.isSubject ? highlightRow : bodyText}
              >
                #{c.rank} {c.name} · {c.score}/100
                {c.isSubject ? " (your brand)" : ""}
              </Text>
            ))}
          </Section>

          <Hr style={divider} />

          {/* Recommendations */}
          <Section style={section}>
            <Text style={sectionTitle}>TOP RECOMMENDATIONS</Text>
            {recommendations.map((rec, i) => (
              <Text key={i} style={bodyText}>
                {i + 1}. {rec.title}{" "}
                <span style={priorityBadge(rec.priority)}>
                  {rec.priority}
                </span>
              </Text>
            ))}
          </Section>

          <Hr style={divider} />

          {/* CTA */}
          <Section style={{ ...section, textAlign: "center" as const }}>
            <Text style={bodyText}>
              View your full report with AI responses, prompt-level results, and
              detailed recommendations:
            </Text>
            <Link href={reportUrl} style={ctaButton}>
              View Full Report
            </Link>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Your GEO Report · AI Visibility Analysis
            </Text>
            <Text style={footerText}>
              This report is based on sampled buyer-intent prompts and current AI
              responses. Results may vary as AI systems change over time.
            </Text>
            <Text style={footerText}>
              Questions?{" "}
              <Link href="mailto:robert@yourgeoreport.com" style={footerLink}>
                robert@yourgeoreport.com
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f6f6",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const container = {
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
};

const header = {
  padding: "32px 40px 16px",
};

const logoText = {
  fontFamily: '"SF Mono", "Fira Code", "Fira Mono", Menlo, Consolas, monospace',
  fontSize: "10px",
  letterSpacing: "0.2em",
  color: "#999",
  margin: "0",
};

const section = {
  padding: "0 40px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "700" as const,
  color: "#111",
  margin: "0 0 4px",
  lineHeight: "1.3",
};

const subheading = {
  fontSize: "14px",
  color: "#666",
  margin: "0 0 8px",
};

const divider = {
  borderColor: "#eee",
  margin: "24px 40px",
};

const scoreSection = {
  padding: "0 40px",
  textAlign: "center" as const,
};

const scoreLabel = {
  fontFamily: '"SF Mono", "Fira Code", Menlo, Consolas, monospace',
  fontSize: "10px",
  letterSpacing: "0.15em",
  color: "#999",
  margin: "0 0 8px",
};

const scoreValue = {
  fontSize: "48px",
  fontWeight: "700" as const,
  color: "#111",
  margin: "0",
  lineHeight: "1",
};

const scoreContext = {
  fontSize: "13px",
  color: "#999",
  margin: "8px 0 0",
};

const sectionTitle = {
  fontFamily: '"SF Mono", "Fira Code", Menlo, Consolas, monospace',
  fontSize: "10px",
  letterSpacing: "0.15em",
  color: "#999",
  margin: "0 0 12px",
};

const bodyText = {
  fontSize: "14px",
  color: "#333",
  lineHeight: "1.6",
  margin: "0 0 8px",
};

const highlightRow = {
  fontSize: "14px",
  color: "#111",
  lineHeight: "1.6",
  margin: "0 0 8px",
  fontWeight: "600" as const,
};

function priorityBadge(priority: string) {
  const colors: Record<string, string> = {
    high: "#dc2626",
    medium: "#d97706",
    low: "#059669",
  };
  return {
    fontSize: "10px",
    color: colors[priority] || "#999",
    textTransform: "uppercase" as const,
    fontWeight: "600" as const,
  };
}

const ctaButton = {
  display: "inline-block",
  backgroundColor: "#111",
  color: "#fff",
  padding: "12px 32px",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "600" as const,
  textDecoration: "none",
  marginTop: "12px",
};

const footer = {
  padding: "0 40px 32px",
};

const footerText = {
  fontSize: "11px",
  color: "#999",
  lineHeight: "1.5",
  margin: "0 0 4px",
};

const footerLink = {
  color: "#666",
  textDecoration: "underline",
};
