import { Navbar, Hero, Projects, About, Contact, Footer } from "@/components/portfolio"

/**
 * Página principal do portfólio
 * Renderiza todas as seções em ordem
 */
export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
