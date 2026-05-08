import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";

const SITE_URL = "https://yourgeoreport.com";

export const metadata: Metadata = {
  title: "YourGEOReport | AI Visibility Scorecards & Audits for Ecommerce Brands",
  description:
    "See whether ChatGPT and Claude recommend your brand when shoppers ask what to buy. Get your free AI visibility scorecard in 24 hours.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "YourGEOReport | AI Visibility Scorecards & Audits for Ecommerce Brands",
    description:
      "See whether ChatGPT and Claude recommend your brand when shoppers ask what to buy. Free scorecard in 24 hours.",
    url: SITE_URL,
    siteName: "YourGEOReport",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YourGEOReport | AI Visibility Scorecards & Audits for Ecommerce Brands",
    description:
      "See whether ChatGPT and Claude recommend your brand when shoppers ask what to buy. Free scorecard in 24 hours.",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "YourGEOReport",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "AI visibility scorecards and audits for ecommerce brands. See whether ChatGPT and Claude recommend your brand when shoppers ask what to buy.",
  founder: {
    "@type": "Person",
    name: "Robert Hu",
    url: "https://theroberthu.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,450;14..32,500;14..32,600;14..32,700;14..32,800&family=JetBrains+Mono:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body className="font-sans text-dark bg-white antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
