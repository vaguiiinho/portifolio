import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PortfolioRouteShell } from "@/components/portfolio/portfolio-route-shell"
import { RouteIntro } from "@/components/portfolio/route-intro"
import { AdminDashboard } from "@/components/auth/admin-dashboard"
import { createRouteMetadata } from "@/lib/metadata"
import { getLocale } from "@/lib/locale-server"
import { fetchSiteConfig } from "@/lib/site-config"
import { fetchProjects, fetchStats } from "@/lib/api"
import { mapApiProjectToPortfolioProject } from "@/lib/project-mapper"
import { portfolioRoutes } from "@/lib/routes"

export async function generateMetadata(): Promise<Metadata> {
  const config = await fetchSiteConfig()
  const locale = await getLocale()

  return createRouteMetadata({
    siteName: config.siteName,
    title: locale === "en" ? "Admin dashboard" : "Painel administrativo",
    description:
      locale === "en"
        ? "Manage portfolio content and review key metrics from one place."
        : "Gerencie o conteúdo do portfólio e revise métricas-chave em um único lugar.",
    path: "/admin",
  })
}

export default async function AdminPage() {
  const locale = await getLocale()
  const siteConfig = await fetchSiteConfig()
  const [stats, projects] = await Promise.all([fetchStats(), fetchProjects()])

  return (
    <PortfolioRouteShell siteName={siteConfig.siteName} locale={locale} pageMetricKey="page:admin">
      <RouteIntro
        eyebrow={
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/70 px-3 py-1 text-xs font-medium text-muted-foreground">
            {locale === "en" ? "Authenticated area" : "Área autenticada"}
          </div>
        }
        title={locale === "en" ? "Admin dashboard" : "Painel administrativo"}
        subtitle={
          locale === "en"
            ? "A single place to monitor content, inspect traffic and manage the portfolio."
            : "Um único lugar para monitorar conteúdo, inspecionar tráfego e gerenciar o portfólio."
        }
        actions={
          <div className="flex flex-wrap gap-3">
            <Button as="a" href={portfolioRoutes.projects} size="lg" className="rounded-full">
              {locale === "en" ? "Open public projects" : "Abrir projetos públicos"}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button as="a" href={portfolioRoutes.login} variant="outline" size="lg" className="rounded-full">
              {locale === "en" ? "Switch account" : "Trocar conta"}
            </Button>
          </div>
        }
      />

      <AdminDashboard
        locale={locale}
        siteConfig={siteConfig}
        stats={stats}
        projects={projects.map(mapApiProjectToPortfolioProject)}
      />
    </PortfolioRouteShell>
  )
}
