"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type FormState = "idle" | "submitting" | "success" | "error";

export default function VisibilityForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [brand, setBrand] = useState("");
  const [website, setWebsite] = useState("");
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!brand.trim() || !category.trim() || !email.trim()) return;

    setFormState("submitting");
    setErrorMsg("");

    const { error } = await supabase.from("submissions").insert({
      brand_name: brand.trim(),
      website_url: website.trim() || null,
      product_category: category.trim(),
      email: email.trim(),
    });

    if (error) {
      setErrorMsg("Something went wrong. Please try again.");
      setFormState("error");
      return;
    }

    setFormState("success");
  }

  if (formState === "success") {
    return (
      <div className="bg-white rounded-xl border border-border p-8 shadow-sm text-center">
        <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-6 h-6 text-success"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-dark mb-2">
          Your report will be emailed within 24 hours.
        </h3>
        <p className="text-secondary text-sm">
          We&apos;ll analyze how AI tools respond to queries in your category and
          send you a detailed visibility report.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-border p-8 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-dark mb-6">
        Check your brand&apos;s AI visibility
      </h3>

      <div className="space-y-4">
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
            onChange={(e) => setBrand(e.target.value)}
            placeholder="e.g. VitalGlow"
            className="w-full rounded-lg border border-border px-4 py-2.5 text-sm text-dark placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
          <p className="text-xs text-secondary mt-1">
            Your brand or product name as customers know it
          </p>
        </div>

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
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="e.g. https://yourbrand.com"
            className="w-full rounded-lg border border-border px-4 py-2.5 text-sm text-dark placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
          <p className="text-xs text-secondary mt-1">
            So we can verify your brand details
          </p>
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-dark mb-1.5"
          >
            Product Category
          </label>
          <select
            id="category"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-border px-4 py-2.5 text-sm text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white"
          >
            <option value="" disabled>
              Select a category…
            </option>
            <option value="Arts, Crafts & Sewing">Arts, Crafts & Sewing</option>
            <option value="Automotive">Automotive</option>
            <option value="Baby Products">Baby Products</option>
            <option value="Beauty & Personal Care">Beauty & Personal Care</option>
            <option value="Books">Books</option>
            <option value="Cell Phones & Accessories">Cell Phones & Accessories</option>
            <option value="Clothing, Shoes & Jewelry">Clothing, Shoes & Jewelry</option>
            <option value="Electronics">Electronics</option>
            <option value="Grocery & Gourmet Food">Grocery & Gourmet Food</option>
            <option value="Health & Household">Health & Household</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
            <option value="Industrial & Scientific">Industrial & Scientific</option>
            <option value="Kitchen & Dining">Kitchen & Dining</option>
            <option value="Musical Instruments">Musical Instruments</option>
            <option value="Office Products">Office Products</option>
            <option value="Patio, Lawn & Garden">Patio, Lawn & Garden</option>
            <option value="Pet Supplies">Pet Supplies</option>
            <option value="Software">Software</option>
            <option value="Sports & Outdoors">Sports & Outdoors</option>
            <option value="Tools & Home Improvement">Tools & Home Improvement</option>
            <option value="Toys & Games">Toys & Games</option>
            <option value="Video Games">Video Games</option>
            <option value="Other">Other</option>
          </select>
          <p className="text-xs text-secondary mt-1">
            The Amazon department that best matches your product
          </p>
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
            className="w-full rounded-lg border border-border px-4 py-2.5 text-sm text-dark placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
          <p className="text-xs text-secondary mt-1">
            We&apos;ll send your AI visibility report here
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={formState === "submitting"}
        className="w-full mt-6 bg-primary hover:bg-primary-hover text-white font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {formState === "submitting"
          ? "Analyzing AI visibility..."
          : "Check My AI Visibility"}
      </button>

      {formState === "error" && (
        <p className="text-xs text-red-600 text-center mt-3">{errorMsg}</p>
      )}

      <p className="text-xs text-secondary text-center mt-3">
        Early beta — testing with the first 100 brands.
      </p>
    </form>
  );
}
