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
  executiveSummary?: {
    overview: string;
    bestOpportunity: string;
  };
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
  promptResults?: Array<{
    prompt: string;
    engines: Array<{
      engine: string;
      mentioned: boolean;
    }>;
    topBrands: string[];
  }>;
  recommendations: Array<{
    title: string;
    description: string;
    priority: "high" | "medium" | "low";
    evidence: string;
  }>;
}

export default function GeoReportEmail({
  brandName,
  category,
  overallScore,
  categoryMedian,
  reportUrl,
  keyFinding,
  executiveSummary,
  competitors,
  recommendations,
}: GeoReportEmailProps) {
  const top3 = competitors.filter((c) => !c.isSubject).slice(0, 3);
  const topRec = recommendations[0];

  return (
    <Html>
      <Head />
      <Preview>
        {`Your AI Visibility Scorecard for ${brandName} · Score: ${overallScore}/100`}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logoText}>YOUR GEO REPORT</Text>
          </Section>

          {/* Title */}
          <Section style={section}>
            <Text style={heading}>AI Visibility Scorecard</Text>
            <Text style={subheading}>
              {brandName} · {category}
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Executive Summary */}
          {executiveSummary && (
            <>
              <Section style={section}>
                <Text style={sectionTitle}>WHAT WE FOUND</Text>
                <Text style={bodyText}>{executiveSummary.overview}</Text>
                <Text style={{ ...bodyText, fontWeight: "600", color: "#059669" }}>
                  Best opportunity: {executiveSummary.bestOpportunity}
                </Text>
              </Section>
              <Hr style={divider} />
            </>
          )}

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

          {/* Top 3 Competitors */}
          <Section style={section}>
            <Text style={sectionTitle}>TOP 3 COMPETITORS</Text>
            {top3.map((c, i) => (
              <Text key={c.name} style={bodyText}>
                #{i + 1} {c.name} · {c.score}/100
              </Text>
            ))}
          </Section>

          <Hr style={divider} />

          {/* Top Recommendation */}
          {topRec && (
            <>
              <Section style={section}>
                <Text style={sectionTitle}>RECOMMENDED NEXT ACTION</Text>
                <Section style={recCard}>
                  <Text style={recHeader}>{topRec.title}</Text>
                  <Text style={recDescription}>{topRec.description}</Text>
                </Section>
              </Section>
              <Hr style={divider} />
            </>
          )}

          {/* View Scorecard CTA */}
          <Section style={{ ...section, textAlign: "center" as const }}>
            <Link href={reportUrl} style={ctaButtonSecondary}>
              View Your Scorecard Online
            </Link>
          </Section>

          <Hr style={divider} />

          {/* Audit Upsell */}
          <Section style={upsellSection}>
            <Text style={upsellHeading}>Want the full picture?</Text>
            <Text style={bodyText}>
              The Brand AI Visibility Audit ($500) includes everything in your
              scorecard, plus:
            </Text>
            <Text style={upsellList}>
              • 10+ prompts tested per engine with results{"\n"}
              • Engine-by-engine breakdown (ChatGPT vs Claude){"\n"}
              • Competitor insights &amp; analysis{"\n"}
              • Opportunity map showing where to win{"\n"}
              • 4–6 prioritized recommendations with evidence{"\n"}
              • Actual AI response transcripts{"\n"}
              • 30-minute review call with Robert
            </Text>
            <Text style={{ textAlign: "center" as const, margin: "16px 0 0" }}>
              <Link
                href="https://theroberthu.com/free-strategy-session?utm_source=yourgeoreport&utm_medium=email&utm_campaign=paid-audit"
                style={ctaButton}
              >
                Get Your Full Audit · $500
              </Link>
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Your GEO Report · AI Visibility Scorecard
            </Text>
            <Text style={footerText}>
              This scorecard is based on sampled buyer-intent prompts and current AI
              responses. Results are directional and may vary as AI systems update.
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

const recCard = {
  backgroundColor: "#f9fafb",
  borderRadius: "8px",
  padding: "16px 20px",
  marginBottom: "12px",
};

const recHeader = {
  fontSize: "14px",
  fontWeight: "600" as const,
  color: "#111",
  margin: "0 0 8px",
  lineHeight: "1.4",
};

const recDescription = {
  fontSize: "13px",
  color: "#333",
  lineHeight: "1.6",
  margin: "0",
};

const ctaButton = {
  display: "inline-block",
  backgroundColor: "#111",
  color: "#fff",
  padding: "12px 32px",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "600" as const,
  textDecoration: "none",
};

const ctaButtonSecondary = {
  display: "inline-block",
  backgroundColor: "#fff",
  color: "#111",
  padding: "10px 28px",
  borderRadius: "8px",
  fontSize: "13px",
  fontWeight: "500" as const,
  textDecoration: "none",
  border: "1px solid #ddd",
};

const upsellSection = {
  padding: "0 40px",
  backgroundColor: "#f0f4ff",
  margin: "0 0",
  borderRadius: "0",
  paddingTop: "24px",
  paddingBottom: "24px",
};

const upsellHeading = {
  fontSize: "18px",
  fontWeight: "700" as const,
  color: "#111",
  margin: "0 0 8px",
};

const upsellList = {
  fontSize: "13px",
  color: "#333",
  lineHeight: "1.8",
  margin: "8px 0 0",
  whiteSpace: "pre-line" as const,
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
