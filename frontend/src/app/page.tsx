import { Navbar, Hero, HomeHub, Footer } from "@/components/portfolio"
import { fetchSiteConfig } from "@/lib/site-config"

/**
 * Página principal do portfólio
 * Funciona como landing page e porta de entrada para as rotas principais
 */
export default async function HomePage() {
  const config = await fetchSiteConfig()

  return (
    <main className="relative">
      <Navbar siteName={config.siteName} />
      <Hero siteName={config.siteName} />
      <HomeHub />
      <Footer siteName={config.siteName} />
    </main>
  )
}
