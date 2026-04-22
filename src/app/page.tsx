import { Navbar, Hero, Projects, About, Contact, Footer } from "@/components/portfolio"

export default function Home() {
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
