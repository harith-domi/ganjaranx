import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "GanjaranX — Malaysia's #1 Task-to-Reward Marketplace";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #070c1f 0%, #1b2660 50%, #070c1f 100%)",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        {/* Logo wordmark */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "32px" }}>
          <span style={{ color: "#ffffff", fontSize: 72, fontWeight: 900, letterSpacing: "-2px" }}>
            Ganjaran
          </span>
          <span style={{ color: "#f5a623", fontSize: 72, fontWeight: 900, letterSpacing: "-2px" }}>
            X
          </span>
        </div>

        {/* Tagline */}
        <p
          style={{
            color: "#f5a623",
            fontSize: 22,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "4px",
            marginBottom: "20px",
          }}
        >
          Malaysia&apos;s #1 Task-to-Reward Marketplace
        </p>

        {/* Description */}
        <p
          style={{
            color: "#94a3b8",
            fontSize: 28,
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.5,
          }}
        >
          Complete tasks · Earn Ganjaran Points · Redeem real rewards
        </p>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: "60px",
            marginTop: "48px",
            paddingTop: "32px",
            borderTop: "1px solid rgba(255,255,255,0.15)",
            width: "100%",
            justifyContent: "center",
          }}
        >
          {[
            ["10,000+", "Active Users"],
            ["100 pts = RM 1", "Exchange Rate"],
            ["6", "Reward Verticals"],
          ].map(([val, label]) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
              <span style={{ color: "#f5a623", fontSize: 32, fontWeight: 800 }}>{val}</span>
              <span style={{ color: "#64748b", fontSize: 16 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
