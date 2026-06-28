import { ImageResponse } from "next/og"
import { cookies } from "next/headers"
import { siteDefaults } from "@/lib/site-config"
import { getLocaleFromCookieValue, getLocaleCookieName } from "@/lib/locale"

export const runtime = "edge"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  const locale = getLocaleFromCookieValue(cookies().get(getLocaleCookieName())?.value)
  const content =
    locale === "en"
      ? {
          alt: "Full Stack development portfolio",
          title: "Full Stack Developer",
          titleHighlight: "focused on conversion",
          description:
            "Portfolio focused on cases, contractable services, resume and fast contact.",
          tags: ["Context-rich cases", "Clear services", "Resume and contact"],
          availability: "Available for",
          channels: "LinkedIn and Workana",
        }
      : {
          alt: "Portfólio de desenvolvimento full stack",
          title: "Full Stack Developer",
          titleHighlight: "focado em conversão",
          description:
            "Portfólio orientado a cases, serviços contratáveis, currículo e contato rápido.",
          tags: ["Cases com contexto", "Serviços claros", "Currículo e contato"],
          availability: "Disponível para",
          channels: "LinkedIn e Workana",
        }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at top left, rgba(91, 141, 255, 0.40), transparent 34%), radial-gradient(circle at bottom right, rgba(15, 23, 42, 0.92), rgba(2, 6, 23, 1) 72%)",
          color: "#f8fafc",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 40,
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: 36,
            background: "linear-gradient(135deg, rgba(15,23,42,0.82), rgba(15,23,42,0.45))",
            padding: 56,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 820 }}>
            <div
              style={{
                display: "inline-flex",
                width: "fit-content",
                alignItems: "center",
                gap: 12,
                borderRadius: 999,
                border: "1px solid rgba(96, 165, 250, 0.35)",
                background: "rgba(59, 130, 246, 0.12)",
                padding: "12px 18px",
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              {siteDefaults.siteName}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h1
                style={{
                  margin: 0,
                  fontSize: 72,
                  lineHeight: 0.95,
                  letterSpacing: "-0.05em",
                  fontWeight: 800,
                }}
              >
                {content.title}
                <br />
                {content.titleHighlight}
              </h1>
              <p
                style={{
                  margin: 0,
                  fontSize: 30,
                  lineHeight: 1.35,
                  color: "rgba(226,232,240,0.82)",
                  maxWidth: 900,
                }}
              >
                {content.description}
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 20, alignItems: "flex-end", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", maxWidth: 760 }}>
              {content.tags.map((item) => (
                <div
                  key={item}
                  style={{
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(15,23,42,0.68)",
                    padding: "14px 18px",
                    fontSize: 22,
                    color: "#e2e8f0",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>

            <div
              style={{
                borderRadius: 24,
                border: "1px solid rgba(96, 165, 250, 0.35)",
                background: "rgba(59, 130, 246, 0.12)",
                padding: "18px 22px",
                textAlign: "right",
                minWidth: 250,
              }}
            >
              <div style={{ fontSize: 20, color: "rgba(226,232,240,0.72)" }}>{content.availability}</div>
              <div style={{ fontSize: 28, fontWeight: 700, marginTop: 6 }}>{content.channels}</div>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  )
}

export const alt = "Full Stack portfolio / Portfólio de desenvolvimento full stack"
