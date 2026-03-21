import { ImageResponse } from "next/og";
import { ogImageElement, ogImageSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "YourGEOReport · AI Visibility Reports for Ecommerce Brands";
export const size = ogImageSize;
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(ogImageElement(), { ...size });
}
