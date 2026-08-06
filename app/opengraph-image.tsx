import { ImageResponse } from "next/og";

export const alt = "Simplifique Capital";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f7f3ea",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", gap: 28 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 14 }}>
            <div style={{ width: 28, height: 66, background: "#9aa8a3" }} />
            <div style={{ width: 28, height: 104, background: "#4f615d" }} />
            <div style={{ width: 28, height: 142, background: "#c9982e" }} />
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 800,
              color: "#152420",
            }}
          >
            simplifique&nbsp;<span style={{ color: "#c9982e" }}>capital</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
