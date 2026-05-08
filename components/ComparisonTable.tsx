const rows = [
  { feature: "Format", free: "1-page scorecard", paid: "Full report" },
  { feature: "Delivery", free: "24 hours", paid: "5–7 business days" },
  { feature: "Visibility score", free: true, paid: true },
  { feature: "Top competitors", free: "Top 3 named", paid: "All competitors ranked" },
  { feature: "Prompt-level results", free: "Summary only", paid: "Every prompt tested with engine results" },
  { feature: "Mentions by engine", free: false, paid: true },
  { feature: "Recommendations", free: "1 high-level", paid: "4–6 prioritized actions with evidence" },
  { feature: "Opportunity map", free: false, paid: true },
  { feature: "Review call", free: false, paid: "30-min call with Robert" },
];

function Cell({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    );
  }
  if (value === false) {
    return <span className="text-muted">&mdash;</span>;
  }
  return <span className="text-sm text-dark">{value}</span>;
}

export default function ComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b-2 border-border">
            <th className="py-3 pr-4 font-mono text-[10px] uppercase tracking-wider text-muted font-medium">
              What you get
            </th>
            <th className="py-3 px-4 font-mono text-[10px] uppercase tracking-wider text-muted font-medium">
              Free Scorecard
            </th>
            <th className="py-3 pl-4 font-mono text-[10px] uppercase tracking-wider text-accent font-medium">
              Paid Audit ($500)
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.feature} className="border-b border-border-subtle">
              <td className="py-3 pr-4 text-sm text-secondary">{row.feature}</td>
              <td className="py-3 px-4"><Cell value={row.free} /></td>
              <td className="py-3 pl-4"><Cell value={row.paid} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
