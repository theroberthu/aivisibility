import type { Metadata } from "next";
import Link from "next/link";
import { insightPosts, formatDate } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights | Your GEO Report",
  description:
    "Weekly AI visibility rankings, GEO analysis, and intelligence for ecommerce brands.",
  openGraph: {
    title: "Insights | Your GEO Report",
    description:
      "Weekly AI visibility rankings, GEO analysis, and intelligence for ecommerce brands.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights | Your GEO Report",
    description:
      "Weekly AI visibility rankings, GEO analysis, and intelligence for ecommerce brands.",
  },
};

export default function InsightsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <div className="mb-12">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted mb-3">
          Insights
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-dark tracking-tight leading-tight">
          Insights by Your GEO Report
        </h1>
        <p className="mt-4 text-secondary leading-relaxed max-w-xl">
          Weekly rankings, category analysis, and research on how AI engines are
          reshaping product discovery.
        </p>
        <div className="mt-6 border-b border-border" />
      </div>

      <div>
        {insightPosts.map((post, i) => (
          <article
            key={post.slug}
            className={`py-8 ${i < insightPosts.length - 1 ? "border-b border-border-subtle" : ""}`}
          >
            <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-medium">
              {post.category}
            </span>
            <h2 className="mt-2">
              <Link
                href={`/insights/${post.slug}`}
                className="text-xl font-semibold text-dark hover:text-accent transition-colors"
              >
                {post.title}
              </Link>
            </h2>
            <time className="block mt-1.5 font-mono text-xs text-muted">
              {formatDate(post.date)}
            </time>
            <p className="mt-2 text-secondary text-[15px] leading-relaxed max-w-2xl">
              {post.excerpt}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
