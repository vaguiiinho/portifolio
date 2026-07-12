import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Projects } from "@/components/portfolio/projects"
import { RouteIntro } from "@/components/portfolio/route-intro"
import { PortfolioRouteShell } from "@/components/portfolio/portfolio-route-shell"
import { createRouteMetadata } from "@/lib/metadata"
import { fetchSiteConfig } from "@/lib/site-config"
import { routeCtaContent } from "@/lib/content"
import { getLocale } from "@/lib/locale-server"
import { getProjectsContent } from "@/lib/content/localized"
import { hasServicesContent } from "@/lib/site-content"

export async function generateMetadata(): Promise<Metadata> {
  const config = await fetchSiteConfig()
  const locale = await getLocale()
  const projectsPageContent = getProjectsContent(locale)

  return createRouteMetadata({
    siteName: config.siteName,
    title: locale === "en" ? "Projects" : "Projetos",
    description: projectsPageContent.subtitle,
    path: "/projetos",
  })
}

export default async function ProjectsPage() {
  const config = await fetchSiteConfig()
  const locale = await getLocale()
  const projectsPageContent = getProjectsContent(locale)

  return (
    <PortfolioRouteShell siteName={config.siteName} locale={locale} pageMetricKey="page:projects" showServices={hasServicesContent(config.servicesContent, locale)}>
      <RouteIntro
        title={projectsPageContent.title}
        subtitle={projectsPageContent.subtitle}
        actions={
          <div className="flex flex-wrap gap-3">
            <Button
              as="a"
              href={routeCtaContent.projects.primaryHref}
              size="lg"
              className="rounded-full"
              metricKey="cta:projects-contact"
            >
              {locale === "en" ? "Contact me" : routeCtaContent.projects.primaryLabel}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              as="a"
              href={routeCtaContent.projects.secondaryHref}
              variant="outline"
              size="lg"
              className="rounded-full"
              metricKey="cta:projects-resume"
            >
              {locale === "en" ? "View resume" : routeCtaContent.projects.secondaryLabel}
            </Button>
          </div>
        }
      />
      <Projects showHeader={false} showActions={false} locale={locale} />
    </PortfolioRouteShell>
  )
}
