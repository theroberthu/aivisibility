import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs tracking-widest text-muted mb-4">
          404
        </p>
        <h1 className="text-2xl font-bold text-dark mb-3">
          Report not found
        </h1>
        <p className="text-secondary text-sm leading-relaxed mb-8">
          This report may have expired or the link may be incorrect. If you
          received this link by email, try requesting a new report.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/#get-report"
            className="bg-dark hover:bg-primary text-white font-medium py-2.5 px-6 rounded-lg text-sm transition-colors"
          >
            Get a New Report
          </Link>
          <Link
            href="/"
            className="text-sm text-secondary hover:text-dark transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
