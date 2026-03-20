"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type FormState = "idle" | "submitting" | "error";

const inputClass =
  "w-full rounded-lg border border-border px-4 py-2.5 text-sm text-dark placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors";

export default function VisibilityForm() {
  const router = useRouter();
  const [formState, setFormState] = useState<FormState>("idle");
  const [brand, setBrand] = useState("");
  const [website, setWebsite] = useState("");
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [detecting, setDetecting] = useState(false);

  const userEditedBrand = useRef(false);
  const userEditedCategory = useRef(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortController = useRef<AbortController | null>(null);

  const detectSite = useCallback(async (url: string) => {
    if (abortController.current) abortController.current.abort();
    abortController.current = new AbortController();

    setDetecting(true);
    try {
      const res = await fetch("/api/detect-site", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
        signal: abortController.current.signal,
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data.category && !userEditedCategory.current)
        setCategory(data.category);
      if (data.brand && !userEditedBrand.current) setBrand(data.brand);
    } catch {
      // silently fail — user can fill in manually
    } finally {
      setDetecting(false);
    }
  }, []);

  function handleWebsiteChange(value: string) {
    setWebsite(value);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    const trimmed = value.trim();
    if (!trimmed || (!trimmed.includes(".") && !trimmed.startsWith("http")))
      return;

    debounceTimer.current = setTimeout(() => {
      const url = trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
      detectSite(url);
    }, 800);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!brand.trim() || !category.trim() || !email.trim()) return;

    setFormState("submitting");
    setErrorMsg("");

    const { data, error } = await supabase
      .from("submissions")
      .insert({
        brand_name: brand.trim(),
        website_url: website.trim() || null,
        product_category: category.trim(),
        email: email.trim(),
      })
      .select("id")
      .single();

    if (error || !data) {
      console.error("Supabase insert error:", error?.message, error?.code);
      setErrorMsg("Something went wrong. Please try again.");
      setFormState("error");
      return;
    }

    // Send report email in background (don't block redirect)
    fetch("/api/send-report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.trim(),
        brandName: brand.trim(),
        category: category.trim(),
        reportId: data.id,
      }),
    }).catch(() => {
      // Email send failure shouldn't block the user
    });

    router.push(`/report/${data.id}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface rounded-xl border border-border border-t-2 border-t-accent p-8"
    >
      <h3 className="text-base font-semibold text-dark mb-1">
        Get Your GEO Report
      </h3>
      <p className="text-xs text-muted mb-6">
        AI visibility analysis for your brand and category
      </p>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="website"
            className="block text-sm font-medium text-dark mb-1.5"
          >
            Website URL
          </label>
          <input
            id="website"
            type="url"
            value={website}
            onChange={(e) => handleWebsiteChange(e.target.value)}
            placeholder="https://yourbrand.com"
            className={inputClass}
          />
          <p className="text-xs text-muted mt-1.5">
            {detecting
              ? "Detecting brand and category..."
              : "We\u2019ll try to detect your brand and category"}
          </p>
        </div>

        <div>
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-dark mb-1.5"
          >
            Brand Name
          </label>
          <input
            id="brand"
            type="text"
            required
            value={brand}
            onChange={(e) => {
              userEditedBrand.current = true;
              setBrand(e.target.value);
            }}
            placeholder="e.g. VitalGlow"
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-dark mb-1.5"
          >
            Product Category
            {detecting && (
              <span className="ml-2 text-xs font-normal text-muted animate-pulse">
                detecting...
              </span>
            )}
          </label>
          <select
            id="category"
            required
            value={category}
            onChange={(e) => {
              userEditedCategory.current = true;
              setCategory(e.target.value);
            }}
            className={`${inputClass} bg-surface`}
          >
            <option value="" disabled>
              Select a category…
            </option>
            <option value="Arts, Crafts & Sewing">
              Arts, Crafts &amp; Sewing
            </option>
            <option value="Automotive">Automotive</option>
            <option value="Baby Products">Baby Products</option>
            <option value="Beauty & Personal Care">
              Beauty &amp; Personal Care
            </option>
            <option value="Books">Books</option>
            <option value="Cell Phones & Accessories">
              Cell Phones &amp; Accessories
            </option>
            <option value="Clothing, Shoes & Jewelry">
              Clothing, Shoes &amp; Jewelry
            </option>
            <option value="Electronics">Electronics</option>
            <option value="Grocery & Gourmet Food">
              Grocery &amp; Gourmet Food
            </option>
            <option value="Health & Household">Health &amp; Household</option>
            <option value="Home & Kitchen">Home &amp; Kitchen</option>
            <option value="Industrial & Scientific">
              Industrial &amp; Scientific
            </option>
            <option value="Kitchen & Dining">Kitchen &amp; Dining</option>
            <option value="Musical Instruments">Musical Instruments</option>
            <option value="Office Products">Office Products</option>
            <option value="Patio, Lawn & Garden">
              Patio, Lawn &amp; Garden
            </option>
            <option value="Pet Supplies">Pet Supplies</option>
            <option value="Sports & Outdoors">Sports &amp; Outdoors</option>
            <option value="Tools & Home Improvement">
              Tools &amp; Home Improvement
            </option>
            <option value="Toys & Games">Toys &amp; Games</option>
            <option value="Video Games">Video Games</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-dark mb-1.5"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className={inputClass}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={formState === "submitting"}
        className="w-full mt-6 bg-dark hover:bg-primary text-white font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent/20 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {formState === "submitting" ? (
          <span className="font-mono text-sm">Submitting…</span>
        ) : (
          "Get My GEO Report"
        )}
      </button>

      {formState === "error" && (
        <p className="text-xs text-red-600 text-center mt-3">{errorMsg}</p>
      )}

      <p className="text-xs text-muted text-center mt-3 font-mono">
        Free · No credit card · ChatGPT + Claude
      </p>

      <p className="text-[11px] text-muted/70 text-center mt-4 leading-relaxed">
        Reports are based on sampled buyer-intent prompts and current AI
        responses. Results may vary as AI systems change over time.
      </p>
    </form>
  );
}
