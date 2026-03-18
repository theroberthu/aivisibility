import type { ReactElement } from "react";

export const ogImageSize = { width: 1200, height: 630 };

export function ogImageElement(): ReactElement {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        backgroundColor: "#0a0a0f",
        color: "#ffffff",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Top label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            fontSize: "14px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#9494a8",
          }}
        >
          AI Visibility Report
        </div>
        <div
          style={{
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            backgroundColor: "#64647a",
          }}
        />
        <div
          style={{
            fontSize: "14px",
            color: "#9494a8",
          }}
        >
          ChatGPT + Claude
        </div>
      </div>

      {/* Main title */}
      <div
        style={{
          fontSize: "64px",
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          marginBottom: "24px",
        }}
      >
        YourGEOReport
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: "28px",
          fontWeight: 400,
          color: "#9494a8",
          lineHeight: 1.4,
          marginBottom: "48px",
          maxWidth: "700px",
        }}
      >
        AI Visibility Reports for Ecommerce Brands
      </div>

      {/* Divider */}
      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "#2a2a3e",
          marginBottom: "32px",
        }}
      />

      {/* Bottom stats */}
      <div
        style={{
          display: "flex",
          gap: "48px",
        }}
      >
        {[
          { value: "2", label: "AI Engines" },
          { value: "20", label: "Prompts Tested" },
          { value: "5+", label: "Competitors" },
          { value: "24h", label: "Delivery" },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <div
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontSize: "12px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#64647a",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Accent bar at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "4px",
          backgroundColor: "#2563EB",
        }}
      />
    </div>
  );
}
