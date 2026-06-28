import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Projects } from "@/components/portfolio/projects"
import { RouteIntro } from "@/components/portfolio/route-intro"
import { PortfolioRouteShell } from "@/components/portfolio/portfolio-route-shell"
import { createRouteMetadata } from "@/lib/metadata"
import { fetchSiteConfig } from "@/lib/site-config"
import { projectsContent, routeCtaContent } from "@/lib/content"

export async function generateMetadata(): Promise<Metadata> {
  const config = await fetchSiteConfig()

  return createRouteMetadata({
    siteName: config.siteName,
    title: "Projetos",
    description: projectsContent.subtitle,
    path: "/projetos",
  })
}

export default async function ProjectsPage() {
  const config = await fetchSiteConfig()

  return (
    <PortfolioRouteShell siteName={config.siteName}>
      <RouteIntro
        title={projectsContent.title}
        subtitle={projectsContent.subtitle}
        actions={
          <div className="flex flex-wrap gap-3">
            <Button as="a" href={routeCtaContent.projects.primaryHref} size="lg" className="rounded-full">
              {routeCtaContent.projects.primaryLabel}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button as="a" href={routeCtaContent.projects.secondaryHref} variant="outline" size="lg" className="rounded-full">
              {routeCtaContent.projects.secondaryLabel}
            </Button>
          </div>
        }
      />
      <Projects showHeader={false} showActions={false} />
    </PortfolioRouteShell>
  )
}
