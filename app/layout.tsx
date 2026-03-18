import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Your GEO Report — AI Visibility Reports for Ecommerce Brands",
  description:
    "Find out if ChatGPT and Claude recommend your brand when buyers ask what to buy. Free AI visibility reports for ecommerce brands.",
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
