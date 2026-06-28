import type { Metadata } from "next"
import { ArrowDownToLine, ArrowRight, BriefcaseBusiness, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/portfolio/container"
import { Footer } from "@/components/portfolio/footer"
import { Navbar } from "@/components/portfolio/navbar"
import { SectionHeader } from "@/components/portfolio/section-header"
import { portfolioRoutes } from "@/lib/routes"
import { fetchSiteConfig } from "@/lib/site-config"
import { resumeContent, resumePageContent } from "@/lib/content"
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
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/70 px-3 py-1 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-accent" />
              {resumePageContent.heroBadge}
            </div>

            <div className="mt-6 space-y-5">
              <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                {resumeContent.title}
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl text-pretty">
                {resumeContent.subtitle}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button as="a" href={portfolioRoutes.resumePdf} isExternal download size="lg" className="rounded-full">
                <ArrowDownToLine className="h-4 w-4" />
                {resumePageContent.heroActions.downloadLabel}
              </Button>
              <Button as="a" href="#experiencia" variant="outline" size="lg" className="rounded-full">
                Ver experiência
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-24 sm:pb-32">
        <Container>
          <SectionHeader
            className="mb-8"
            align="left"
            title={resumePageContent.sections.summaryTitle}
            subtitle={resumeContent.summary}
          />

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
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
            </div>

            <div className="rounded-3xl border border-border bg-secondary/30 p-8">
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
            </div>
          </div>

          <div id="experiencia" className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <SectionHeader
                align="left"
                title={resumeContent.experienceTitle}
                subtitle={resumePageContent.sections.experienceSubtitle}
              />

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
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                <SectionHeader
                  align="left"
                  title={resumeContent.educationTitle}
                  subtitle={resumePageContent.sections.educationSubtitle}
                />
                <div className="mt-5 space-y-4">
                  {resumeContent.education.map((item) => (
                    <p key={item} className="text-sm leading-6 text-muted-foreground text-pretty">
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-secondary/30 p-8">
                <SectionHeader
                  align="left"
                  title={resumeContent.ctaTitle}
                  subtitle={resumeContent.ctaDescription}
                />
                <div className="mt-6 flex flex-wrap gap-3">
              <Button as="a" href={portfolioRoutes.resumePdf} isExternal download className="rounded-full">
                <ArrowDownToLine className="h-4 w-4" />
                {resumePageContent.ctaActions.downloadLabel}
              </Button>
                  <Button as="a" href={portfolioRoutes.contact} variant="outline" className="rounded-full">
                    {resumePageContent.ctaActions.contactLabel}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer siteName={config.siteName} />
    </main>
  )
}
