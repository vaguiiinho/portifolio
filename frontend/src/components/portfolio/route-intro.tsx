import type { ReactNode } from "react"
import { Container } from "./container"

interface RouteIntroProps {
  eyebrow?: ReactNode
  title: ReactNode
  subtitle: ReactNode
  actions?: ReactNode
  align?: "left" | "center"
}

export function RouteIntro({ eyebrow, title, subtitle, actions, align = "left" }: RouteIntroProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left"

  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(84,130,255,0.16),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.06),_transparent_30%)]" />
      <Container className="relative">
        <div className={`flex max-w-4xl flex-col gap-6 ${alignment}`}>
          {eyebrow}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl text-pretty">
              {subtitle}
            </p>
          </div>
          {actions}
        </div>
      </Container>
    </section>
  )
}
