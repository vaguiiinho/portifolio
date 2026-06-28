import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Services } from "@/components/portfolio/services"
import { Testimonials } from "@/components/portfolio/testimonials"
import { RouteIntro } from "@/components/portfolio/route-intro"
import { PortfolioRouteShell } from "@/components/portfolio/portfolio-route-shell"
import { createRouteMetadata } from "@/lib/metadata"
import { fetchSiteConfig } from "@/lib/site-config"
import { routeCtaContent } from "@/lib/content"
import { getLocale } from "@/lib/locale-server"
import { getServicesContent } from "@/lib/content/localized"

export async function generateMetadata(): Promise<Metadata> {
  const config = await fetchSiteConfig()
  const locale = await getLocale()
  const servicesPageContent = getServicesContent(locale)

  return createRouteMetadata({
    siteName: config.siteName,
    title: locale === "en" ? "Services" : "Serviços",
    description: servicesPageContent.subtitle,
    path: "/servicos",
  })
}

export default async function ServicesPage() {
  const config = await fetchSiteConfig()
  const locale = await getLocale()
  const servicesPageContent = getServicesContent(locale)

  return (
    <PortfolioRouteShell siteName={config.siteName} locale={locale} pageMetricKey="page:services">
      <RouteIntro
        title={servicesPageContent.title}
        subtitle={servicesPageContent.subtitle}
        actions={
          <div className="flex flex-wrap gap-3">
            <Button
              as="a"
              href={routeCtaContent.services.primaryHref}
              size="lg"
              className="rounded-full"
              metricKey="cta:services-contact"
            >
              {locale === "en" ? "Request quote" : routeCtaContent.services.primaryLabel}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              as="a"
              href={routeCtaContent.services.secondaryHref}
              variant="outline"
              size="lg"
              className="rounded-full"
              metricKey="cta:services-projects"
            >
              {locale === "en" ? "View projects" : routeCtaContent.services.secondaryLabel}
            </Button>
          </div>
        }
      />
      <Services showHeader={false} showActions={false} locale={locale} content={config.servicesContent} />
      <Testimonials locale={locale} content={config.testimonialsContent} />
    </PortfolioRouteShell>
  )
}
