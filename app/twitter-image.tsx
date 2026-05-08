import { ImageResponse } from "next/og";
import { ogImageElement, ogImageSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "YourGEOReport · AI Visibility Scorecards & Audits for Ecommerce Brands";
export const size = ogImageSize;
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(ogImageElement(), { ...size });
}
