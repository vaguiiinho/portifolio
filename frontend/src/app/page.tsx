import type { Metadata } from "next"
import { Navbar, Hero, HomeHub, Testimonials, ConversionMetrics, Footer } from "@/components/portfolio"
import { MetricBeacon } from "@/components/portfolio/metric-beacon"
import { fetchSiteConfig } from "@/lib/site-config"
import { getLocale } from "@/lib/locale-server"
import { createRouteMetadata } from "@/lib/metadata"
import { getHeroContent } from "@/lib/content/localized"
import { hasServicesContent } from "@/lib/site-content"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const heroContent = getHeroContent(locale)

  return createRouteMetadata({
    title: locale === "en" ? "Home" : "Início",
    description: heroContent.subtitle,
    path: "/",
  })
}

/**
 * Página principal do portfólio
 * Funciona como landing page e porta de entrada para as rotas principais
 */
export default async function HomePage() {
  const config = await fetchSiteConfig()
  const locale = await getLocale()
  const showServices = hasServicesContent(config.servicesContent, locale)

  return (
    <main className="relative">
      <MetricBeacon eventKey="page:home" />
      <Navbar siteName={config.siteName} locale={locale} showServices={showServices} />
      <Hero siteName={config.siteName} locale={locale} showServices={showServices} />
      <HomeHub locale={locale} showServices={showServices} />
      <Testimonials locale={locale} content={config.testimonialsContent} />
      <ConversionMetrics locale={locale} />
      <Footer siteName={config.siteName} locale={locale} />
    </main>
  )
}
