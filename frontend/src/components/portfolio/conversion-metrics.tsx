import { fetchProjects, fetchStats } from "@/lib/api"
import { mapApiProjectToPortfolioProject } from "@/lib/project-mapper"
import { Container } from "./container"
import { SectionHeader } from "./section-header"
import type { Locale } from "@/lib/locale"

function sumEventPrefix(events: Record<string, number>, prefix: string) {
  return Object.entries(events).reduce((total, [key, value]) => {
    return key.startsWith(prefix) ? total + value : total
  }, 0)
}

function getTopProjectEvent(events: Record<string, number>) {
  const entries = Object.entries(events).filter(([key]) => key.startsWith("project:view:"))

  if (entries.length === 0) {
    return null
  }

  return entries.sort((a, b) => b[1] - a[1])[0]
}

interface ConversionMetricsProps {
  locale: Locale
}

export async function ConversionMetrics({ locale }: ConversionMetricsProps) {
  let stats
  let projectTitleById: Record<string, string> = {}

  try {
    const [statsResponse, projectsResponse] = await Promise.all([fetchStats(), fetchProjects()])
    stats = statsResponse
    projectTitleById = Object.fromEntries(
      projectsResponse.map((project) => {
        const mapped = mapApiProjectToPortfolioProject(project)
        return [mapped.id, mapped.title]
      }),
    )
  } catch {
    stats = {
      id: "default",
      projectsCount: 0,
      visitors: 0,
      events: {},
      updatedAt: new Date().toISOString(),
    }
  }

  const pageViews = sumEventPrefix(stats.events, "page:")
  const ctaClicks = sumEventPrefix(stats.events, "cta:")
  const projectViews = sumEventPrefix(stats.events, "project:view:")
  const topProject = getTopProjectEvent(stats.events)
  const title = locale === "en" ? "Conversion metrics" : "Métricas de conversão"
  const subtitle =
    locale === "en"
      ? "A summary of the signals that help understand what draws the most attention in the portfolio."
      : "Resumo dos sinais que ajudam a entender o que mais chama atenção no portfólio."

  const metrics = [
    {
      value: `${pageViews}`,
      label: locale === "en" ? "Page views" : "Visualizações de páginas",
    },
    { value: `${ctaClicks}`, label: locale === "en" ? "CTA clicks" : "Cliques em CTAs" },
    {
      value: `${projectViews}`,
      label: locale === "en" ? "Project opens" : "Aberturas de projetos",
    },
  ]

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHeader
          title={title}
          subtitle={subtitle}
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="text-3xl font-bold tracking-tight">{metric.value}</div>
              <div className="mt-2 text-sm text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-3xl border border-border bg-secondary/30 p-6 text-sm text-muted-foreground">
          {topProject ? (
            <>
              {locale === "en" ? "Most opened project:" : "Projeto mais acionado:"}{" "}
              <span className="font-medium text-foreground">
                {projectTitleById[topProject[0].replace("project:view:", "")] ??
                  topProject[0].replace("project:view:", "")}
              </span>
              {locale === "en" ? " with " : " com "}
              <span className="font-medium text-foreground">{topProject[1]}</span>
              {locale === "en" ? " opens." : " aberturas."}
            </>
          ) : (
            locale === "en"
              ? "There isn't enough data yet to identify the most viewed project."
              : "Ainda não há dados suficientes para identificar o projeto mais acessado."
          )}
        </div>
      </Container>
    </section>
  )
}
