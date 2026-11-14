import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const ogSize = { width: 1200, height: 630 };

/** Shared renderer for opengraph-image and twitter-image. */
export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0f0f0f 0%, #1c1c1c 60%, #301414 100%)",
          color: "#f5f5f5",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#f59e0b",
          }}
        >
          Portfolio
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 800,
            marginTop: 24,
            lineHeight: 1.05,
          }}
        >
          {profile.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            marginTop: 20,
            color: "#e02424",
          }}
        >
          {profile.title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            marginTop: 36,
            color: "#a3a3a3",
            maxWidth: 900,
          }}
        >
          {profile.pitch}
        </div>
      </div>
    ),
    ogSize,
  );
}
