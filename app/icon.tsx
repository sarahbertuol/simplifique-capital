import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          borderRadius: 6,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
          <div style={{ width: 4, height: 11, background: "#9aa8a3" }} />
          <div style={{ width: 4, height: 17, background: "#4f615d" }} />
          <div style={{ width: 4, height: 23, background: "#c9982e" }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
