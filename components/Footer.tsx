import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border py-16">
      <div className="max-w-3xl mx-auto px-6 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        <div>
          <p className="text-sm text-secondary leading-relaxed max-w-md">
            Your GEO Report analyzes AI product recommendations across ChatGPT
            and Claude. Built for ecommerce brands by Robert Hu.
          </p>
          <p className="mt-3 font-mono text-[11px] text-muted">
            20 buyer-intent prompts · ChatGPT + Claude · Competitor benchmarks
          </p>
          <p className="mt-4 font-mono text-xs text-muted">
            &copy; {new Date().getFullYear()} Your GEO Report
          </p>
        </div>
        <nav className="flex flex-col gap-4 md:pt-0.5">
          <div className="flex gap-6">
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
              Get Report
            </a>
          </div>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm text-muted hover:text-secondary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted hover:text-secondary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </nav>
      </div>
    </footer>
  );
}
