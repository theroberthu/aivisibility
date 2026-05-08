"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [formOutOfView, setFormOutOfView] = useState(false);

  useEffect(() => {
    const formEl = document.getElementById("get-scorecard");
    if (!formEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFormOutOfView(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(formEl);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="border-b border-border-subtle bg-white sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo.png"
              alt="YourGEOReport"
              width={180}
              height={40}
              className="brightness-[1.03] contrast-[1.05] mix-blend-multiply"
              priority
            />
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/insights"
              className="text-sm text-secondary hover:text-dark transition-colors"
            >
              Insights
            </Link>
            {/* Desktop: always show. Mobile: only show when form is out of view */}
            <a
              href="/#get-scorecard"
              className={`text-sm font-medium text-dark hover:text-accent transition-all duration-300 ${
                formOutOfView
                  ? "opacity-100 translate-y-0"
                  : "md:opacity-100 md:translate-y-0 opacity-0 -translate-y-1 pointer-events-none md:pointer-events-auto"
              }`}
              aria-hidden={!formOutOfView ? "true" : undefined}
            >
              Get Scorecard
            </a>
          </nav>
        </div>
      </header>

      {/* Sticky mobile CTA — only visible on mobile when form is out of view */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-all duration-300 ${
          formOutOfView
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 pointer-events-none"
        }`}
        role="complementary"
        aria-label="Get your free scorecard"
      >
        <div className="shadow-[0_-2px_8px_rgba(0,0,0,0.08)] bg-white px-4 py-3">
          <a
            href="/#get-scorecard"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("get-scorecard")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="block w-full bg-dark hover:bg-primary text-white font-medium py-3 px-6 rounded-lg text-center text-sm transition-colors"
          >
            Check My AI Visibility
          </a>
        </div>
      </div>
    </>
  );
}
