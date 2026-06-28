import { ImageResponse } from "next/og"
import { siteDefaults } from "@/lib/site-config"

export const runtime = "edge"
export const alt = "Portfólio de desenvolvimento full stack"
export const size = {
  width: 1200,
  height: 600,
}
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 56,
          color: "#f8fafc",
          background:
            "linear-gradient(135deg, rgba(2,6,23,1) 0%, rgba(15,23,42,1) 60%, rgba(37,99,235,0.45) 100%)",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 820 }}>
          <div
            style={{
              display: "inline-flex",
              width: "fit-content",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.06)",
              padding: "10px 16px",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            {siteDefaults.siteName}
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: 66,
              lineHeight: 0.98,
              letterSpacing: "-0.05em",
              fontWeight: 800,
            }}
          >
            Portfólio
            <br />
            com foco em conversão
          </h1>

          <p
            style={{
              margin: 0,
              fontSize: 28,
              lineHeight: 1.35,
              color: "rgba(226,232,240,0.82)",
              maxWidth: 820,
            }}
          >
            Projetos, serviços, currículo e contato em uma vitrine clara para recrutadores e clientes.
          </p>
        </div>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {["Cases", "Serviços", "Currículo", "Contato"].map((item) => (
            <div
              key={item}
              style={{
                borderRadius: 999,
                border: "1px solid rgba(96, 165, 250, 0.28)",
                background: "rgba(59, 130, 246, 0.12)",
                padding: "12px 18px",
                fontSize: 20,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  )
}
