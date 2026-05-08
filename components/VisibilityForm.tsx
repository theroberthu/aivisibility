"use client";

import { useState, useRef, useCallback } from "react";
import { supabase } from "@/lib/supabase";

type FormState = "idle" | "submitting" | "error" | "success";

const inputClass =
  "w-full rounded-lg border border-border px-4 py-2.5 text-sm text-dark placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors";

export default function VisibilityForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [brand, setBrand] = useState("");
  const [website, setWebsite] = useState("");
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [detecting, setDetecting] = useState(false);
  const [copied, setCopied] = useState(false);

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
      console.error("Supabase insert error:", error?.message, error?.code, error?.details);
      setErrorMsg(
        error?.code === "42501"
          ? "Permission denied. Please check Supabase RLS policies."
          : error?.code === "42P01"
            ? "Table not found. Please check Supabase setup."
            : `Something went wrong (${error?.code || "unknown"}). Please try again.`,
      );
      setFormState("error");
      return;
    }

    // Send report email in background (don't block success state)
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

    setFormState("success");
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText("https://yourgeoreport.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const input = document.createElement("input");
      input.value = "https://yourgeoreport.com";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  // Success state
  if (formState === "success") {
    return (
      <div className="bg-surface rounded-xl border border-border border-t-2 border-t-success p-8 text-center">
        {/* Green checkmark */}
        <div className="mx-auto w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
          <svg className="w-7 h-7 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h3 className="text-lg font-semibold text-dark mb-2">
          You&apos;re in!
        </h3>
        <p className="text-sm text-secondary mb-6">
          Check your inbox within 24 hours.
        </p>

        <div className="border-t border-border pt-5">
          <p className="text-xs text-muted mb-3">
            Know another brand owner who should see this?
          </p>
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium text-dark hover:bg-light-bg transition-colors focus:outline-none focus:ring-2 focus:ring-accent/20"
          >
            <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {copied ? "Copied!" : "Copy link"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface rounded-xl border border-border border-t-2 border-t-accent p-8"
    >
      <h3 className="text-base font-semibold text-dark mb-1">
        Check If AI Recommends Your Brand
      </h3>
      <p className="text-xs text-muted mb-6">
        See which competitors show up instead, across ChatGPT and Claude
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
            type="text"
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
            <optgroup label="Beauty & Personal Care">
              <option value="Beauty & Personal Care">Beauty &amp; Personal Care (General)</option>
              <option value="Skincare">Skincare</option>
              <option value="Haircare">Haircare</option>
              <option value="Makeup & Cosmetics">Makeup &amp; Cosmetics</option>
              <option value="Fragrances">Fragrances</option>
              <option value="Men's Grooming">Men&apos;s Grooming</option>
            </optgroup>
            <optgroup label="Health & Household">
              <option value="Health & Household">Health &amp; Household (General)</option>
              <option value="Vitamins & Supplements">Vitamins &amp; Supplements</option>
              <option value="Protein Powder & Sports Nutrition">Protein Powder &amp; Sports Nutrition</option>
              <option value="Oral Care">Oral Care</option>
              <option value="First Aid & Medical">First Aid &amp; Medical</option>
              <option value="Cleaning Supplies">Cleaning Supplies</option>
            </optgroup>
            <optgroup label="Home & Kitchen">
              <option value="Home & Kitchen">Home &amp; Kitchen (General)</option>
              <option value="Bedding & Mattresses">Bedding &amp; Mattresses</option>
              <option value="Kitchen Appliances">Kitchen Appliances</option>
              <option value="Cookware">Cookware</option>
              <option value="Home Organization">Home Organization</option>
              <option value="Air Purifiers & Humidifiers">Air Purifiers &amp; Humidifiers</option>
            </optgroup>
            <optgroup label="Pet Supplies">
              <option value="Pet Supplies">Pet Supplies (General)</option>
              <option value="Dog Food">Dog Food</option>
              <option value="Cat Food">Cat Food</option>
              <option value="Cat Litter">Cat Litter</option>
              <option value="Pet Grooming">Pet Grooming</option>
              <option value="Pet Toys & Accessories">Pet Toys &amp; Accessories</option>
            </optgroup>
            <optgroup label="Sports & Outdoors">
              <option value="Sports & Outdoors">Sports &amp; Outdoors (General)</option>
              <option value="Running Shoes">Running Shoes</option>
              <option value="Fitness Equipment">Fitness Equipment</option>
              <option value="Camping & Hiking">Camping &amp; Hiking</option>
              <option value="Yoga & Pilates">Yoga &amp; Pilates</option>
            </optgroup>
            <optgroup label="Electronics">
              <option value="Electronics">Electronics (General)</option>
              <option value="Headphones & Earbuds">Headphones &amp; Earbuds</option>
              <option value="Smart Home Devices">Smart Home Devices</option>
              <option value="Laptops & Computers">Laptops &amp; Computers</option>
              <option value="Phone Accessories">Phone Accessories</option>
            </optgroup>
            <optgroup label="Baby Products">
              <option value="Baby Products">Baby Products (General)</option>
              <option value="Diapers & Wipes">Diapers &amp; Wipes</option>
              <option value="Baby Food & Formula">Baby Food &amp; Formula</option>
              <option value="Strollers & Car Seats">Strollers &amp; Car Seats</option>
            </optgroup>
            <optgroup label="Grocery & Gourmet Food">
              <option value="Grocery & Gourmet Food">Grocery &amp; Gourmet Food (General)</option>
              <option value="Coffee & Tea">Coffee &amp; Tea</option>
              <option value="Snacks">Snacks</option>
              <option value="Organic & Natural Foods">Organic &amp; Natural Foods</option>
            </optgroup>
            <optgroup label="Clothing, Shoes & Jewelry">
              <option value="Clothing, Shoes & Jewelry">Clothing, Shoes &amp; Jewelry (General)</option>
              <option value="Athletic Wear">Athletic Wear</option>
              <option value="Watches">Watches</option>
              <option value="Handbags & Wallets">Handbags &amp; Wallets</option>
            </optgroup>
            <optgroup label="More Categories">
              <option value="Arts, Crafts & Sewing">Arts, Crafts &amp; Sewing</option>
              <option value="Automotive">Automotive</option>
              <option value="Books">Books</option>
              <option value="Cell Phones & Accessories">Cell Phones &amp; Accessories</option>
              <option value="Industrial & Scientific">Industrial &amp; Scientific</option>
              <option value="Kitchen & Dining">Kitchen &amp; Dining</option>
              <option value="Musical Instruments">Musical Instruments</option>
              <option value="Office Products">Office Products</option>
              <option value="Patio, Lawn & Garden">Patio, Lawn &amp; Garden</option>
              <option value="Tools & Home Improvement">Tools &amp; Home Improvement</option>
              <option value="Toys & Games">Toys &amp; Games</option>
              <option value="Video Games">Video Games</option>
              <option value="Other">Other</option>
            </optgroup>
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
          "Get My Free Scorecard"
        )}
      </button>

      {formState === "error" && (
        <p className="text-xs text-red-600 text-center mt-3">{errorMsg}</p>
      )}

      <p className="text-xs text-muted text-center mt-3 font-mono">
        Free · No credit card · ChatGPT + Claude
      </p>
      <p className="text-[11px] text-muted/70 text-center mt-2">
        We&apos;ll email your scorecard within 24 hours. No spam, ever.
      </p>

      {/* Built by */}
      <div className="flex items-center gap-3 mt-5 pt-4 border-t border-border-subtle">
        <a href="https://www.linkedin.com/in/theroberthu/" target="_blank" rel="noopener noreferrer">
          <img
            src="/roberthu.PNG"
            alt="Robert Hu"
            className="w-8 h-8 rounded-full object-cover border border-border"
          />
        </a>
        <p className="text-[11px] text-muted leading-snug">
          Built by{" "}
          <a
            href="https://www.linkedin.com/in/theroberthu/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark font-medium hover:text-accent transition-colors"
          >
            Robert Hu
          </a>
          {" "}· E-commerce operator
        </p>
      </div>

      <p className="text-[11px] text-muted/70 text-center mt-4 leading-relaxed">
        We test real buyer-style prompts across ChatGPT and Claude as they
        respond today. Results are a snapshot. AI responses change over time.
      </p>
    </form>
  );
}
