import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Contact } from "@/components/portfolio/contact"
import { RouteIntro } from "@/components/portfolio/route-intro"
import { PortfolioRouteShell } from "@/components/portfolio/portfolio-route-shell"
import { createRouteMetadata } from "@/lib/metadata"
import { fetchSiteConfig } from "@/lib/site-config"
import { contactContent, routeCtaContent } from "@/lib/content"

export async function generateMetadata(): Promise<Metadata> {
  const config = await fetchSiteConfig()

  return createRouteMetadata({
    siteName: config.siteName,
    title: "Contato",
    description: contactContent.subtitle,
    path: "/contato",
  })
}

export default async function ContactPage() {
  const config = await fetchSiteConfig()

  return (
    <PortfolioRouteShell siteName={config.siteName}>
      <RouteIntro
        title={contactContent.title}
        subtitle={contactContent.subtitle}
        actions={
          <div className="flex flex-wrap gap-3">
            <Button as="a" href={routeCtaContent.contact.primaryHref} size="lg" className="rounded-full">
              {routeCtaContent.contact.primaryLabel}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button as="a" href={routeCtaContent.contact.secondaryHref} variant="outline" size="lg" className="rounded-full">
              {routeCtaContent.contact.secondaryLabel}
            </Button>
          </div>
        }
      />
      <Contact showHeader={false} />
    </PortfolioRouteShell>
  )
}
