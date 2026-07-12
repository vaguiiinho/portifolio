import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { About } from "@/components/portfolio/about"
import { RouteIntro } from "@/components/portfolio/route-intro"
import { PortfolioRouteShell } from "@/components/portfolio/portfolio-route-shell"
import { createRouteMetadata } from "@/lib/metadata"
import { fetchSiteConfig } from "@/lib/site-config"
import { routeCtaContent } from "@/lib/content"
import { getLocale } from "@/lib/locale-server"
import { getAboutContent } from "@/lib/content/localized"
import { hasServicesContent } from "@/lib/site-content"

export async function generateMetadata(): Promise<Metadata> {
  const config = await fetchSiteConfig()
  const locale = await getLocale()
  const aboutPageContent = getAboutContent(locale)

  return createRouteMetadata({
    siteName: config.siteName,
    title: locale === "en" ? "About" : "Sobre",
    description: aboutPageContent.subtitle,
    path: "/sobre",
  })
}

export default async function AboutPage() {
  const config = await fetchSiteConfig()
  const locale = await getLocale()
  const aboutPageContent = getAboutContent(locale)

  return (
    <PortfolioRouteShell siteName={config.siteName} locale={locale} pageMetricKey="page:about" showServices={hasServicesContent(config.servicesContent, locale)}>
      <RouteIntro
        title={locale === "en" ? "About the work" : "Sobre o trabalho"}
        subtitle={aboutPageContent.subtitle}
        actions={
          <div className="flex flex-wrap gap-3">
            <Button
              as="a"
              href={routeCtaContent.about.primaryHref}
              size="lg"
              className="rounded-full"
              metricKey="cta:about-resume"
            >
              {locale === "en" ? "View resume" : routeCtaContent.about.primaryLabel}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              as="a"
              href={routeCtaContent.about.secondaryHref}
              variant="outline"
              size="lg"
              className="rounded-full"
              metricKey="cta:about-contact"
            >
              {locale === "en" ? "Talk to me" : routeCtaContent.about.secondaryLabel}
            </Button>
          </div>
        }
      />
      <About siteName={config.siteName} showHeader={false} locale={locale} content={config.aboutBio} />
    </PortfolioRouteShell>
  )
}
