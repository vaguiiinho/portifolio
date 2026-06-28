import type { Metadata } from "next"
import { Navbar, Hero, HomeHub, Testimonials, ConversionMetrics, Footer } from "@/components/portfolio"
import { MetricBeacon } from "@/components/portfolio/metric-beacon"
import { fetchSiteConfig } from "@/lib/site-config"
import { getLocale } from "@/lib/locale"
import { createRouteMetadata } from "@/lib/metadata"
import { getHeroContent } from "@/lib/content/localized"

export async function generateMetadata(): Promise<Metadata> {
  const locale = getLocale()
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
  const locale = getLocale()

  return (
    <main className="relative">
      <MetricBeacon eventKey="page:home" />
      <Navbar siteName={config.siteName} locale={locale} />
      <Hero siteName={config.siteName} locale={locale} />
      <HomeHub locale={locale} />
      <Testimonials locale={locale} />
      <ConversionMetrics locale={locale} />
      <Footer siteName={config.siteName} locale={locale} />
    </main>
  )
}
