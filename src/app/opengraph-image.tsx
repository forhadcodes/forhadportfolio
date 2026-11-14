import { profile } from "@/data/profile";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = `${profile.name}: ${profile.title}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage();
}
