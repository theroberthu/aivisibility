import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";

const SITE_URL = "https://yourgeoreport.com";

export const metadata: Metadata = {
  title: "YourGEOReport | AI Visibility Reports for Ecommerce Brands",
  description:
    "See whether ChatGPT and Claude recommend your brand when shoppers ask what to buy. Get your AI visibility report in 24 hours.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "YourGEOReport | AI Visibility Reports for Ecommerce Brands",
    description:
      "See whether ChatGPT and Claude recommend your brand when shoppers ask what to buy.",
    url: SITE_URL,
    siteName: "YourGEOReport",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YourGEOReport | AI Visibility Reports for Ecommerce Brands",
    description:
      "See whether ChatGPT and Claude recommend your brand when shoppers ask what to buy.",
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
      </head>
      <body className="font-sans text-dark bg-white antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
