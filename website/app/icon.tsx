import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#8DC63E",
        borderRadius: "100%",
      }}
    />,
    {
      ...size,
    },
  );
}
