import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border py-16">
      <div className="max-w-3xl mx-auto px-6 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        <div>
          <p className="text-sm text-secondary leading-relaxed max-w-md">
            AI Visibility Index is built by Robert Hu — an e-commerce operator
            focused on how AI is changing product discovery.
          </p>
          <p className="mt-4 font-mono text-xs text-muted">
            &copy; {new Date().getFullYear()} AI Visibility
          </p>
        </div>
        <nav className="flex gap-6 md:pt-0.5">
          <Link
            href="/insights"
            className="text-sm text-secondary hover:text-dark transition-colors"
          >
            Insights
          </Link>
          <a
            href="/#get-report"
            className="text-sm text-secondary hover:text-dark transition-colors"
          >
            Request Report
          </a>
        </nav>
      </div>
    </footer>
  );
}
