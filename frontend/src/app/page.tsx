import { Navbar, Hero, Projects, About, Contact, Footer } from "@/components/portfolio"
import { fetchSiteConfig } from "@/lib/site-config"

/**
 * Página principal do portfólio
 * Renderiza todas as seções em ordem
 */
export default async function HomePage() {
  const config = await fetchSiteConfig()

  return (
    <main className="relative">
      <Navbar siteName={config.siteName} />
      <Hero siteName={config.siteName} />
      <Projects />
      <About siteName={config.siteName} />
      <Contact />
      <Footer siteName={config.siteName} />
    </main>
  )
}
