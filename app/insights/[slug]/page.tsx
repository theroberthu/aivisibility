import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { insightPosts, getPostBySlug, formatDate } from "@/lib/insights";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return insightPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} | Your GEO Report`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Your GEO Report`,
      description: post.excerpt,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Your GEO Report`,
      description: post.excerpt,
    },
  };
}

export default async function InsightArticle({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Robert Hu",
      url: "https://theroberthu.com",
    },
    publisher: {
      "@type": "Organization",
      name: "YourGEOReport",
      url: "https://yourgeoreport.com",
    },
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Link
        href="/insights"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-dark font-mono transition-colors"
      >
        &larr; Back to Insights
      </Link>

      <div className="mt-8">
        <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-medium">
          {post.category}
        </span>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold text-dark tracking-tight leading-tight">
          {post.title}
        </h1>
        <time className="block mt-3 font-mono text-sm text-muted">
          {formatDate(post.date)}
        </time>
      </div>

      <hr className="border-border my-8" />

      <div className="space-y-5">
        {post.body.map((paragraph, i) => (
          <p
            key={i}
            className="text-[17px] text-secondary leading-relaxed"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 border-t-2 border-accent bg-light-bg rounded-lg p-8">
        <h3 className="text-lg font-semibold text-dark">
          Get your free GEO report
        </h3>
        <p className="mt-2 text-sm text-secondary">
          See how AI engines recommend your brand across real buyer prompts.
          Free, no credit card required.
        </p>
        <Link
          href="/#get-report"
          className="inline-block mt-4 bg-dark hover:bg-primary text-white font-medium py-2.5 px-6 rounded-lg text-sm transition-colors"
        >
          Get My GEO Report
        </Link>
      </div>
    </main>
  );
}
