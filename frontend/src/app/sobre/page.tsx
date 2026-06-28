import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { About } from "@/components/portfolio/about"
import { RouteIntro } from "@/components/portfolio/route-intro"
import { PortfolioRouteShell } from "@/components/portfolio/portfolio-route-shell"
import { createRouteMetadata } from "@/lib/metadata"
import { fetchSiteConfig } from "@/lib/site-config"
import { aboutContent, routeCtaContent } from "@/lib/content"

export async function generateMetadata(): Promise<Metadata> {
  const config = await fetchSiteConfig()

  return createRouteMetadata({
    siteName: config.siteName,
    title: "Sobre",
    description: aboutContent.subtitle,
    path: "/sobre",
  })
}

export default async function AboutPage() {
  const config = await fetchSiteConfig()

  return (
    <PortfolioRouteShell siteName={config.siteName}>
      <RouteIntro
        title="Sobre o trabalho"
        subtitle={aboutContent.subtitle}
        actions={
          <div className="flex flex-wrap gap-3">
            <Button as="a" href={routeCtaContent.about.primaryHref} size="lg" className="rounded-full">
              {routeCtaContent.about.primaryLabel}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button as="a" href={routeCtaContent.about.secondaryHref} variant="outline" size="lg" className="rounded-full">
              {routeCtaContent.about.secondaryLabel}
            </Button>
          </div>
        }
      />
      <About siteName={config.siteName} showHeader={false} />
    </PortfolioRouteShell>
  )
}
