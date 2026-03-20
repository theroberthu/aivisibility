"use client";

import { useEffect, useState } from "react";
import { ReportData } from "@/lib/types";
import Report from "./Report";

interface Props {
  submissionId: string;
  brandName: string;
  category: string;
  cachedReport: ReportData | null;
}

export default function ReportLoader({
  submissionId,
  brandName,
  category,
  cachedReport,
}: Props) {
  const [report, setReport] = useState<ReportData | null>(cachedReport);
  const [loading, setLoading] = useState(!cachedReport);
  const [error, setError] = useState("");

  useEffect(() => {
    if (cachedReport) return;

    let cancelled = false;

    async function generate() {
      try {
        const res = await fetch("/api/generate-report", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ submissionId }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || `Failed (${res.status})`);
        }

        const { report } = await res.json();
        if (!cancelled) {
          setReport(report);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Report generation failed");
          setLoading(false);
        }
      }
    }

    generate();
    return () => { cancelled = true; };
  }, [submissionId, cachedReport]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin mb-4" />
        <p className="text-sm text-secondary font-medium">
          Generating your AI visibility report...
        </p>
        <p className="text-xs text-muted mt-2">
          Querying ChatGPT and Claude with buyer-intent prompts for {category.toLowerCase()}
        </p>
        <p className="text-xs text-muted mt-1">This usually takes 15–30 seconds</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-sm text-red-600 font-medium">{error}</p>
        <button
          onClick={() => {
            setError("");
            setLoading(true);
            setReport(null);
            // Re-trigger by forcing a re-mount via key change
            window.location.reload();
          }}
          className="mt-4 text-sm text-accent hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!report) return null;

  return (
    <>
      <div className="mb-8">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted mb-2">
          AI Visibility Analysis
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-dark tracking-tight">
          Report for {brandName}
        </h1>
        <p className="mt-2 text-sm text-secondary">
          {category} · Generated from {report.methodology.engines} AI engines ×{" "}
          {report.methodology.prompts} buyer-intent prompts
        </p>
      </div>

      <Report data={report} />
    </>
  );
}
