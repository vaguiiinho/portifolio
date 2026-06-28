import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "./container"
import { MetricBeacon } from "./metric-beacon"
import { SectionHeader } from "./section-header"
import { getProjectsContent } from "@/lib/content/localized"
import { ProjectsGallery } from "./projects-gallery"
import { portfolioRoutes } from "@/lib/routes"
import type { Locale } from "@/lib/locale"

interface ProjectsProps {
  showHeader?: boolean
  showActions?: boolean
  showCreateAction?: boolean
  locale: Locale
}

export function Projects({ showHeader = true, showActions = true, showCreateAction = false, locale }: ProjectsProps) {
  const projectsContent = getProjectsContent(locale)

  return (
    <section id="projects" className="py-24 sm:py-32">
      <MetricBeacon eventKey="section:projects" />
      <Container>
        {(showHeader || showActions) && (
          <div className="mb-12 flex flex-col items-center gap-6 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
            <div className="max-w-2xl">
              {showHeader && (
                <SectionHeader align="left" title={projectsContent.title} subtitle={projectsContent.subtitle} />
              )}
            </div>
            {showActions && (
              <Button as="a" href={portfolioRoutes.contact} className="rounded-full shrink-0">
                {projectsContent.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}

        <ProjectsGallery allowCreate={showCreateAction} locale={locale} />
      </Container>
    </section>
  )
}
