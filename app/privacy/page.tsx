import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Your GEO Report",
  description:
    "How Your GEO Report collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <>
      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted mb-3">
          Legal
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-dark tracking-tight leading-tight">
          Privacy Policy
        </h1>
        <p className="mt-2 font-mono text-xs text-muted">
          Last updated: March 18, 2026
        </p>
        <div className="mt-6 border-b border-border" />

        <div className="mt-10 space-y-10 text-secondary text-[15px] leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-dark mb-3">
              1. Information We Collect
            </h2>
            <p>
              When you request an AI visibility report, we collect the following
              information:
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-1.5">
              <li>
                <strong>Brand name</strong> — the name of the brand you want
                analyzed.
              </li>
              <li>
                <strong>Website URL</strong> — used to identify your brand and
                product category.
              </li>
              <li>
                <strong>Product category</strong> — the category your product
                competes in.
              </li>
              <li>
                <strong>Email address</strong> — used to deliver your report and
                communicate with you about the service.
              </li>
            </ul>
            <p className="mt-3">
              We do not collect payment information, passwords, or any data
              beyond what is listed above.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-dark mb-3">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>To generate and deliver your AI visibility report.</li>
              <li>
                To communicate with you about your report or service updates.
              </li>
              <li>
                To improve our service, including prompt design and category
                coverage.
              </li>
            </ul>
            <p className="mt-3">
              We do not sell, rent, or share your personal information with third
              parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-dark mb-3">
              3. Data Storage
            </h2>
            <p>
              Your data is stored securely using Supabase, a hosted PostgreSQL
              database with encryption at rest and in transit. We retain your
              submission data for as long as necessary to provide the service.
              You may request deletion of your data at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-dark mb-3">
              4. Third-Party Services
            </h2>
            <p>We use the following third-party services:</p>
            <ul className="mt-3 list-disc pl-5 space-y-1.5">
              <li>
                <strong>Supabase</strong> — database hosting and storage.
              </li>
              <li>
                <strong>Vercel</strong> — website hosting and deployment.
              </li>
              <li>
                <strong>OpenAI (ChatGPT) and Anthropic (Claude)</strong> — to
                generate AI product recommendation queries as part of the
                analysis.
              </li>
            </ul>
            <p className="mt-3">
              These services have their own privacy policies. We only share the
              minimum data necessary for them to function.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-dark mb-3">
              5. Cookies
            </h2>
            <p>
              We do not use tracking cookies or third-party analytics. We may
              use essential cookies required for the website to function
              properly.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-dark mb-3">
              6. Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="mt-3 list-disc pl-5 space-y-1.5">
              <li>Request a copy of the data we hold about you.</li>
              <li>Request correction or deletion of your data.</li>
              <li>Withdraw consent for future communications.</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email us at{" "}
              <a
                href="mailto:robert@yourgeoreport.com"
                className="text-accent hover:underline"
              >
                robert@yourgeoreport.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-dark mb-3">
              7. Changes to This Policy
            </h2>
            <p>
              We may update this privacy policy from time to time. Changes will
              be posted on this page with an updated revision date. Continued
              use of the service after changes constitutes acceptance of the
              revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-dark mb-3">
              8. Contact
            </h2>
            <p>
              If you have questions about this policy, contact us at{" "}
              <a
                href="mailto:robert@yourgeoreport.com"
                className="text-accent hover:underline"
              >
                robert@yourgeoreport.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
