import type { Metadata } from "next"
import { ArrowDownToLine, ArrowRight, BriefcaseBusiness, GraduationCap, Sparkles, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/ui/fade-in"
import { Container } from "@/components/portfolio/container"
import { Footer } from "@/components/portfolio/footer"
import { Navbar } from "@/components/portfolio/navbar"
import { fetchSiteConfig } from "@/lib/site-config"
import { resumeContent } from "@/lib/content"
import { siteDefaults } from "@/lib/site-config"

export async function generateMetadata(): Promise<Metadata> {
  const config = await fetchSiteConfig()
  const siteName = config.siteName || siteDefaults.siteName
  const description = `${resumeContent.summary} ${resumeContent.ctaDescription}`

  return {
    title: `${siteName} | Currículo`,
    description,
    alternates: {
      canonical: `https://${siteDefaults.domain}/curriculo`,
    },
  }
}

export default async function ResumePage() {
  const config = await fetchSiteConfig()

  return (
    <main className="relative">
      <Navbar siteName={config.siteName} />

      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(84,130,255,0.16),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.06),_transparent_30%)]" />
        <Container className="relative">
          <div className="max-w-4xl">
            <FadeIn className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/70 px-3 py-1 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-accent" />
              Currículo para recrutadores e clientes
            </FadeIn>

            <FadeIn delay={0.05} className="mt-6 space-y-5">
              <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                {resumeContent.title}
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl text-pretty">
                {resumeContent.subtitle}
              </p>
            </FadeIn>

            <FadeIn delay={0.1} className="mt-8 flex flex-wrap gap-4">
              <Button as="a" href="/curriculo.pdf" isExternal download size="lg" className="rounded-full">
                <ArrowDownToLine className="h-4 w-4" />
                Baixar PDF
              </Button>
              <Button as="a" href="#experiencia" variant="outline" size="lg" className="rounded-full">
                Ver experiência
                <ArrowRight className="h-4 w-4" />
              </Button>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="pb-24 sm:pb-32">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <FadeIn className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-accent" />
                <h2 className="text-2xl font-semibold tracking-tight">Resumo profissional</h2>
              </div>
              <p className="mt-4 text-base leading-7 text-muted-foreground text-pretty">
                {resumeContent.summary}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {resumeContent.highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-border bg-secondary/30 px-4 py-4 text-sm text-foreground/90"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.05} className="rounded-3xl border border-border bg-secondary/30 p-8">
              <div className="flex items-center gap-3">
                <BriefcaseBusiness className="h-5 w-5 text-accent" />
                <h2 className="text-2xl font-semibold tracking-tight">O que entrego melhor</h2>
              </div>
              <div className="mt-5 space-y-3">
                {resumeContent.skills.map((skill) => (
                  <div key={skill} className="rounded-2xl border border-border bg-card px-4 py-3 text-sm">
                    {skill}
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <div id="experiencia" className="mt-8 grid gap-6 lg:grid-cols-2">
            <FadeIn className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <BriefcaseBusiness className="h-5 w-5 text-accent" />
                <h2 className="text-2xl font-semibold tracking-tight">{resumeContent.experienceTitle}</h2>
              </div>

              <div className="mt-6 space-y-6">
                {resumeContent.experiences.map((experience) => (
                  <article key={`${experience.role}-${experience.period}`} className="space-y-3 border-b border-border pb-6 last:border-b-0 last:pb-0">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-lg font-semibold">{experience.role}</h3>
                      <span className="text-sm text-muted-foreground">{experience.period}</span>
                    </div>
                    <p className="text-sm font-medium text-accent">{experience.company}</p>
                    <p className="text-sm leading-6 text-muted-foreground text-pretty">
                      {experience.description}
                    </p>
                    <ul className="space-y-2">
                      {experience.achievements.map((achievement) => (
                        <li key={achievement} className="flex gap-2 text-sm text-foreground/90">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </FadeIn>

            <div className="space-y-6">
              <FadeIn delay={0.05} className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-accent" />
                  <h2 className="text-2xl font-semibold tracking-tight">{resumeContent.educationTitle}</h2>
                </div>
                <div className="mt-5 space-y-4">
                  {resumeContent.education.map((item) => (
                    <p key={item} className="text-sm leading-6 text-muted-foreground text-pretty">
                      {item}
                    </p>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={0.1} className="rounded-3xl border border-border bg-secondary/30 p-8">
                <h2 className="text-2xl font-semibold tracking-tight">{resumeContent.ctaTitle}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground text-pretty">
                  {resumeContent.ctaDescription}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button as="a" href="/curriculo.pdf" isExternal download className="rounded-full">
                    <ArrowDownToLine className="h-4 w-4" />
                    Baixar PDF
                  </Button>
                  <Button as="a" href="/#contact" variant="outline" className="rounded-full">
                    Falar comigo
                  </Button>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      <Footer siteName={config.siteName} />
    </main>
  )
}
