import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Contact } from "@/components/portfolio/contact"
import { RouteIntro } from "@/components/portfolio/route-intro"
import { PortfolioRouteShell } from "@/components/portfolio/portfolio-route-shell"
import { createRouteMetadata } from "@/lib/metadata"
import { fetchSiteConfig } from "@/lib/site-config"
import { routeCtaContent } from "@/lib/content"
import { getLocale } from "@/lib/locale-server"
import { getContactContent } from "@/lib/content/localized"

export async function generateMetadata(): Promise<Metadata> {
  const config = await fetchSiteConfig()
  const locale = await getLocale()
  const contactPageContent = getContactContent(locale)

  return createRouteMetadata({
    siteName: config.siteName,
    title: locale === "en" ? "Contact" : "Contato",
    description: contactPageContent.subtitle,
    path: "/contato",
  })
}

export default async function ContactPage() {
  const config = await fetchSiteConfig()
  const locale = await getLocale()
  const contactPageContent = getContactContent(locale)

  return (
    <PortfolioRouteShell siteName={config.siteName} locale={locale} pageMetricKey="page:contact">
      <RouteIntro
        title={contactPageContent.title}
        subtitle={contactPageContent.subtitle}
        actions={
          <div className="flex flex-wrap gap-3">
            <Button
              as="a"
              href={routeCtaContent.contact.primaryHref}
              size="lg"
              className="rounded-full"
              metricKey="cta:contact-resume"
            >
              {locale === "en" ? "View resume" : routeCtaContent.contact.primaryLabel}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              as="a"
              href={routeCtaContent.contact.secondaryHref}
              variant="outline"
              size="lg"
              className="rounded-full"
              metricKey="cta:contact-projects"
            >
              {locale === "en" ? "View projects" : routeCtaContent.contact.secondaryLabel}
            </Button>
          </div>
        }
      />
      <Contact showHeader={false} locale={locale} />
    </PortfolioRouteShell>
  )
}
