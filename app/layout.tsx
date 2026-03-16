import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Visibility Checker — Does AI Recommend Your Brand?",
  description:
    "Check whether AI tools like ChatGPT, Claude, and Perplexity recommend your brand when buyers ask what to buy. Built for Amazon sellers and physical product brands.",
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans text-dark bg-white antialiased">
        {children}
      </body>
    </html>
  );
}
