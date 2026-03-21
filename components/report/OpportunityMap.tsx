import { OpportunityBucket } from "@/lib/types";

const BUCKET_STYLES: Record<string, { border: string; badge: string; badgeText: string }> = {
  Difficult: {
    border: "border-l-red-300",
    badge: "bg-red-50 text-red-700 border-red-200",
    badgeText: "Difficult",
  },
  Possible: {
    border: "border-l-amber-300",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    badgeText: "Possible",
  },
  "Worth Testing": {
    border: "border-l-emerald-400",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    badgeText: "Worth Testing",
  },
};

function getBucketStyle(label: string) {
  for (const key of Object.keys(BUCKET_STYLES)) {
    if (label.startsWith(key)) return BUCKET_STYLES[key];
  }
  return BUCKET_STYLES["Possible"];
}

export default function OpportunityMap({
  buckets,
}: {
  buckets: OpportunityBucket[];
}) {
  return (
    <div className="px-6 py-6 border-b border-border">
      <h2 className="font-mono text-[10px] uppercase tracking-wider text-muted mb-4">
        Opportunity Map
      </h2>

      <div className="space-y-4">
        {buckets.map((bucket, i) => {
          const style = getBucketStyle(bucket.label);
          return (
            <div
              key={i}
              className={`border border-border border-l-2 ${style.border} rounded-lg px-4 py-3`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-dark">
                  {bucket.label}
                </span>
              </div>
              <p className="text-sm text-secondary leading-relaxed mb-3">
                {bucket.description}
              </p>
              <div className="space-y-1">
                {bucket.prompts.map((prompt, j) => (
                  <div
                    key={j}
                    className="flex items-center gap-2 text-xs text-muted"
                  >
                    <span className="font-mono text-[10px] text-muted/60 shrink-0">
                      {String(j + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono">&ldquo;{prompt}&rdquo;</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
