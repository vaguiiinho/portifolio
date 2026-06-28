import { ArrowRight } from "lucide-react"
import { Container } from "./container"
import { SectionHeader } from "./section-header"
import { AppLink } from "@/components/ui/app-link"
import { portfolioRoutes } from "@/lib/routes"
import type { Locale } from "@/lib/locale"

interface HomeHubProps {
  locale: Locale
}

export function HomeHub({ locale }: HomeHubProps) {
  const routes =
    locale === "en"
      ? [
          {
            title: "Services",
            description: "Understand the delivery format and working style I prioritize.",
            href: portfolioRoutes.services,
          },
          {
            title: "Projects",
            description: "See the cases and implementation standard applied to the projects.",
            href: portfolioRoutes.projects,
          },
          {
            title: "About",
            description: "Learn more about the background, technical focus and professional context.",
            href: portfolioRoutes.about,
          },
          {
            title: "Contact",
            description: "Reach out directly to discuss scope and budget.",
            href: portfolioRoutes.contact,
          },
        ]
      : [
          {
            title: "Serviços",
            description: "Entenda o tipo de entrega e o formato de trabalho que eu priorizo.",
            href: portfolioRoutes.services,
          },
          {
            title: "Projetos",
            description: "Veja os cases e o padrão de implementação aplicado nos projetos.",
            href: portfolioRoutes.projects,
          },
          {
            title: "Sobre",
            description: "Saiba mais sobre a trajetória, o foco técnico e o contexto profissional.",
            href: portfolioRoutes.about,
          },
          {
            title: "Contato",
            description: "Entre em contato direto para conversar sobre escopo e orçamento.",
            href: portfolioRoutes.contact,
          },
        ]

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeader
          title={locale === "en" ? "Explore the portfolio" : "Explorar o portfólio"}
          subtitle={
            locale === "en"
              ? "Navigation now lives on dedicated pages. The home page serves as the entry point and overview."
              : "A navegação agora é por páginas dedicadas. A home serve como ponto de entrada e visão geral."
          }
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {routes.map((route) => (
            <AppLink
              key={route.href}
              href={route.href}
              metricKey={`nav:${route.href}`}
              className="group rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="flex h-full flex-col gap-4">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{route.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground text-pretty">
                    {route.description}
                  </p>
                </div>
                <div className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-accent">
                  {locale === "en" ? "Open page" : "Abrir página"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </AppLink>
          ))}
        </div>
      </Container>
    </section>
  )
}
