import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Services } from "@/components/portfolio/services"
import { RouteIntro } from "@/components/portfolio/route-intro"
import { PortfolioRouteShell } from "@/components/portfolio/portfolio-route-shell"
import { createRouteMetadata } from "@/lib/metadata"
import { fetchSiteConfig } from "@/lib/site-config"
import { routeCtaContent, servicesContent } from "@/lib/content"

export async function generateMetadata(): Promise<Metadata> {
  const config = await fetchSiteConfig()

  return createRouteMetadata({
    siteName: config.siteName,
    title: "Serviços",
    description: servicesContent.subtitle,
    path: "/servicos",
  })
}

export default async function ServicesPage() {
  const config = await fetchSiteConfig()

  return (
    <PortfolioRouteShell siteName={config.siteName}>
      <RouteIntro
        title={servicesContent.title}
        subtitle={servicesContent.subtitle}
        actions={
          <div className="flex flex-wrap gap-3">
            <Button as="a" href={routeCtaContent.services.primaryHref} size="lg" className="rounded-full">
              {routeCtaContent.services.primaryLabel}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button as="a" href={routeCtaContent.services.secondaryHref} variant="outline" size="lg" className="rounded-full">
              {routeCtaContent.services.secondaryLabel}
            </Button>
          </div>
        }
      />
      <Services showHeader={false} showActions={false} />
    </PortfolioRouteShell>
  )
}
