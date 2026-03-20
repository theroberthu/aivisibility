import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Your GEO Report",
  description: "Terms and conditions for using Your GEO Report.",
  openGraph: {
    title: "Terms of Service | Your GEO Report",
    description: "Terms and conditions for using Your GEO Report.",
  },
};

export default function TermsPage() {
  return (
    <>
      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted mb-3">
          Legal
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-dark tracking-tight leading-tight">
          Terms of Service
        </h1>
        <p className="mt-2 font-mono text-xs text-muted">
          Last updated: March 18, 2026
        </p>
        <div className="mt-6 border-b border-border" />

        <div className="mt-10 space-y-10 text-secondary text-[15px] leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-dark mb-3">
              1. Service Description
            </h2>
            <p>
              Your GEO Report (&ldquo;the Service&rdquo;) provides AI
              visibility reports that analyze how AI-powered assistants
              (ChatGPT, Claude) recommend ecommerce brands in response to
              buyer-intent prompts. Reports include visibility scores, competitor
              benchmarks, and actionable recommendations.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-dark mb-3">
              2. Acceptance of Terms
            </h2>
            <p>
              By submitting a report request or using the Service, you agree to
              these Terms of Service. If you do not agree, do not use the
              Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-dark mb-3">
              3. Report Accuracy
            </h2>
            <p>
              AI recommendations are inherently dynamic. The data in your report
              reflects a snapshot of AI outputs at the time of analysis. We do
              not guarantee that results will remain consistent over time or
              match your own queries to ChatGPT or Claude. Reports are provided
              for informational purposes only and should not be the sole basis
              for business decisions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-dark mb-3">
              4. Use of Data
            </h2>
            <p>
              You grant us permission to query AI engines using your brand name
              and product category to generate your report. We may also use
              aggregated, anonymized data from reports to publish category-level
              insights and rankings. Your individual brand data will not be
              publicly identified without your consent.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-dark mb-3">
              5. Intellectual Property
            </h2>
            <p>
              The report content, methodology, scoring system, and website
              content are the intellectual property of Your GEO Report. You may
              use your report internally and share it within your organization.
              You may not resell reports or use our methodology to create a
              competing service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-dark mb-3">
              6. Limitation of Liability
            </h2>
            <p>
              The Service is provided &ldquo;as is&rdquo; without warranties of
              any kind, express or implied. Your GEO Report shall not be liable
              for any indirect, incidental, or consequential damages arising
              from your use of the Service. Our total liability for any claim
              related to the Service shall not exceed the amount you paid for the
              report, if any.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-dark mb-3">
              7. Prohibited Use
            </h2>
            <p>You agree not to:</p>
            <ul className="mt-3 list-disc pl-5 space-y-1.5">
              <li>
                Submit false or misleading information when requesting a report.
              </li>
              <li>
                Use the Service to harass, defame, or harm other brands or
                individuals.
              </li>
              <li>
                Attempt to reverse-engineer the scoring methodology or scrape
                the website.
              </li>
              <li>
                Use automated tools to submit bulk requests without permission.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-dark mb-3">
              8. Termination
            </h2>
            <p>
              We reserve the right to refuse service or terminate access to the
              Service at our discretion, including for violations of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-dark mb-3">
              9. Changes to Terms
            </h2>
            <p>
              We may update these Terms from time to time. Changes will be posted
              on this page with an updated revision date. Continued use of the
              Service after changes constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-dark mb-3">
              10. Contact
            </h2>
            <p>
              Questions about these Terms? Contact us at{" "}
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
